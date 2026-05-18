// --- Auth & Google Sheets Sync Utility ---

const DEFAULT_AVATARS = ["🐱", "🐶", "🦊", "🦁", "🐯", "🐼", "🐨", "🐸", "🐙", "🦄"];
const DEFAULT_COLORS = ["#3b82f6", "#10b981", "#ef4444", "#f59e0b", "#8b5cf6", "#ec4899"];

const PyPlayAuth = {
    // Current local state
    user: null,
    scriptUrl: localStorage.getItem('pyplay_gs_url') || '', // Google Apps Script URL

    init() {
        this.loadLocalUser();
        this.createAppHeader();
        this.createSettingsModal();
        this.createLoginModal();
    },

    loadLocalUser() {
        const stored = localStorage.getItem('pyplay_user');
        if (stored) {
            this.user = JSON.parse(stored);
            if (typeof this.user.progress === 'string') {
                this.user.progress = JSON.parse(this.user.progress);
            }
        }
    },

    saveLocalUser(userData) {
        this.user = userData;
        localStorage.setItem('pyplay_user', JSON.stringify(userData));
        this.updateHeaderUI();
    },

    // --- Google Sheets Sync Methods ---
    async syncFromSheets() {
        if (!this.user || !this.scriptUrl) return;
        
        return new Promise((resolve) => {
            const callbackName = 'pyplay_jsonp_' + Math.round(Math.random() * 1000000);
            window[callbackName] = (data) => {
                delete window[callbackName];
                document.getElementById(callbackName)?.remove();
                
                if (data) {
                    // Update local storage with fresh sheets data
                    this.saveLocalUser({
                        ...this.user,
                        name: data.name || this.user.name,
                        avatar: data.avatar || this.user.avatar,
                        color: data.color || this.user.color,
                        role: data.role || this.user.role,
                        progress: typeof data.progress === 'string' ? JSON.parse(data.progress) : (data.progress || this.user.progress)
                    });
                }
                resolve(data);
            };

            const script = document.createElement('script');
            script.id = callbackName;
            script.src = `${this.scriptUrl}?email=${encodeURIComponent(this.user.email)}&callback=${callbackName}`;
            document.body.appendChild(script);
        });
    },

    async getAllUsersFromSheets() {
        if (!this.scriptUrl) return [];

        return new Promise((resolve) => {
            const callbackName = 'pyplay_jsonp_all_' + Math.round(Math.random() * 1000000);
            window[callbackName] = (data) => {
                delete window[callbackName];
                document.getElementById(callbackName)?.remove();
                resolve(data || []);
            };

            const script = document.createElement('script');
            script.id = callbackName;
            script.src = `${this.scriptUrl}?action=get_all_users&callback=${callbackName}`;
            document.body.appendChild(script);
        });
    },

    async pushUserToSheets(userData) {
        if (!this.scriptUrl) return;
        
        try {
            await fetch(this.scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'user',
                    email: userData.email,
                    name: userData.name,
                    avatar: userData.avatar,
                    color: userData.color,
                    role: userData.role,
                    progress: userData.progress,
                    lastUpdated: new Date().toISOString()
                })
            });
        } catch (e) {
            console.error("Sheets push failed:", e);
        }
    },

    async logToSheets(email, name, status) {
        if (!this.scriptUrl) return;

        try {
            await fetch(this.scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'log',
                    email: email,
                    name: name,
                    status: status,
                    timestamp: new Date().toISOString()
                })
            });
        } catch (e) {
            console.error("Sheets logging failed:", e);
        }
    },

    // --- Actions ---
    async login(email, name, role = "Learner") {
        const randomAvatar = DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)];
        const randomColor = DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)];
        
        const userData = {
            email,
            name,
            avatar: randomAvatar,
            color: randomColor,
            role,
            progress: {
                python: {
                    completed_lessons: [],
                    completed: false
                }
            },
            lastUpdated: new Date().toISOString()
        };

        this.saveLocalUser(userData);
        await this.pushUserToSheets(userData);
        await this.logToSheets(email, name, "Logged In");
        
        // Refresh page or redirect
        window.location.reload();
    },

    async logout() {
        if (this.user) {
            await this.logToSheets(this.user.email, this.user.name, "Logged Out");
        }
        localStorage.removeItem('pyplay_user');
        this.user = null;
        window.location.href = 'index.html';
    },

    async updateProfile(avatar, color, name) {
        if (!this.user) return;
        
        this.user.avatar = avatar;
        this.user.color = color;
        if (name) this.user.name = name;
        this.user.lastUpdated = new Date().toISOString();

        this.saveLocalUser(this.user);
        await this.pushUserToSheets(this.user);
        await this.logToSheets(this.user.email, this.user.name, `Updated profile: Avatar ${avatar}, Color ${color}`);
    },

    async updateProgress(courseId, lessonIndex, isCompleted) {
        if (!this.user) return;

        if (!this.user.progress[courseId]) {
            this.user.progress[courseId] = { completed_lessons: [], completed: false };
        }

        const courseProgress = this.user.progress[courseId];
        if (isCompleted && !courseProgress.completed_lessons.includes(lessonIndex)) {
            courseProgress.completed_lessons.push(lessonIndex);
        }

        // 13 lessons total for Python
        if (courseProgress.completed_lessons.length === 13) {
            courseProgress.completed = true;
        }

        this.user.lastUpdated = new Date().toISOString();
        this.saveLocalUser(this.user);
        
        await this.pushUserToSheets(this.user);
        
        const logMsg = isCompleted 
            ? `Completed Lesson ${lessonIndex + 1} of ${courseId}`
            : `Attempted Lesson ${lessonIndex + 1} of ${courseId}`;
            
        await this.logToSheets(this.user.email, this.user.name, logMsg);
        
        if (courseProgress.completed) {
            await this.logToSheets(this.user.email, this.user.name, `Obtained Badge: ${courseId.toUpperCase()} GRADUATE`);
        }
    },

    setScriptUrl(url) {
        this.scriptUrl = url;
        localStorage.setItem('pyplay_gs_url', url);
        window.location.reload();
    },

    // --- UI Templates ---
    createAppHeader() {
        const header = document.querySelector('header');
        if (!header) return;

        // Clean existing right controls
        const controls = header.querySelector('.controls') || document.createElement('div');
        controls.className = 'controls';
        
        const profileDiv = document.createElement('div');
        profileDiv.className = 'header-auth-controls';
        profileDiv.style.display = 'flex';
        profileDiv.style.alignItems = 'center';
        profileDiv.style.gap = '1rem';

        if (this.user) {
            // Apply custom theme color dynamically
            document.documentElement.style.setProperty('--accent-primary', this.user.color);
            
            profileDiv.innerHTML = `
                <div class="user-status-widget" onclick="window.location.href='dashboard.html'" style="cursor:pointer; display:flex; align-items:center; gap:0.5rem; background: rgba(255,255,255,0.05); padding: 0.5rem 1rem; border-radius: 99px;">
                    <span class="user-avatar" style="font-size: 1.5rem; cursor:pointer;" title="Click to edit nickname" onclick="event.stopPropagation(); PyPlayAuth.editNicknamePrompt();">${this.user.avatar}</span>
                    <span class="user-name" style="font-weight:600; font-size:0.9rem;">${this.user.name}</span>
                    <span class="user-role badge" style="font-size: 0.7rem; background:${this.user.role === 'Admin' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)'}; color:${this.user.role === 'Admin' ? '#fca5a5' : '#93c5fd'};">${this.user.role}</span>
                </div>
                <a href="dashboard.html" class="btn btn-outline" style="border-color: rgba(59, 130, 246, 0.4); color: #93c5fd;">📊 Dashboard</a>
                ${this.user.role === 'Admin' ? `<a href="admin.html" class="btn btn-outline" style="border-color: rgba(239, 68, 68, 0.4); color: #fca5a5;">🛡️ Admin</a>` : ''}
                <button class="btn btn-outline" onclick="PyPlayAuth.logout()">Log Out</button>
            `;

            // Add settings cog (BOTH ADMIN AND LEARNER ACCESS)
            const settingsBtn = document.createElement('button');
            settingsBtn.className = 'btn btn-outline';
            settingsBtn.innerHTML = '⚙️';
            settingsBtn.title = "Configure Google Sheets Sync";
            settingsBtn.onclick = () => this.openSettingsModal();
            profileDiv.appendChild(settingsBtn);
        } else {
            profileDiv.innerHTML = `
                <button class="btn btn-outline" onclick="PyPlayAuth.openLoginModal()">Join Now</button>
                <button class="btn btn-primary" onclick="PyPlayAuth.tryDemo()">Try Demo</button>
            `;
        }

        // Put profile controls inside header
        const currentBtnControls = header.querySelector('.controls');
        if (currentBtnControls) {
            header.insertBefore(profileDiv, currentBtnControls);
        } else {
            header.appendChild(profileDiv);
        }
    },

    createSettingsModal() {
        const modal = document.createElement('div');
        modal.id = 'pyplay-settings-modal';
        modal.className = 'pyplay-modal-overlay hidden';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
            display: none; align-items: center; justify-content: center; z-index: 10000;
        `;
        modal.innerHTML = `
            <div class="glass-panel" style="width: 450px; padding: 2rem; display:flex; flex-direction:column; gap:1.5rem;">
                <h3 style="font-size:1.5rem; font-weight:700;">⚙️ Sync Settings</h3>
                <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.4;">
                    Paste your deployed <strong>Google Apps Script Web App URL</strong> below to automatically sync user profiles, progress logs, and badges to Google Sheets.
                </p>
                <div style="display:flex; flex-direction:column; gap:0.5rem;">
                    <label style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--text-muted);">Script Web App URL</label>
                    <input type="text" id="pyplay-gs-url-input" placeholder="https://script.google.com/macros/s/.../exec" style="background:rgba(0,0,0,0.3); border:1px solid var(--panel-border); color:white; border-radius:8px; padding:0.75rem; font-family:var(--font-ui); font-size:0.9rem; outline:none; width: 100%;" value="${this.scriptUrl}">
                </div>
                <div style="display:flex; gap:1rem; margin-top:1rem;">
                    <button class="btn btn-outline" onclick="document.getElementById('pyplay-settings-modal').style.display = 'none'" style="flex:1; justify-content:center;">Cancel</button>
                    <button class="btn btn-primary" onclick="PyPlayAuth.saveSettingsUrl()" style="flex:1; justify-content:center;">Save & Sync</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    createLoginModal() {
        const modal = document.createElement('div');
        modal.id = 'pyplay-login-modal';
        modal.className = 'pyplay-modal-overlay hidden';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
            display: none; align-items: center; justify-content: center; z-index: 10000;
        `;
        modal.innerHTML = `
            <div class="glass-panel" style="width: 420px; padding: 2.2rem; display:flex; flex-direction:column; gap:1.25rem; text-align:center;">
                <div style="font-size:2.5rem;">🐍</div>
                <div>
                    <h3 style="font-size:1.5rem; font-weight:700; color:#fff;">Sign In with Gmail</h3>
                    <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.25rem;">Choose an account or register a new one</p>
                </div>
                
                <!-- Quick Selection Cards -->
                <div style="display:flex; flex-direction:column; gap:0.5rem; text-align:left;">
                    <span style="font-size:0.75rem; font-weight:600; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.05em;">Quick Selector (For Demo)</span>
                    <div onclick="PyPlayAuth.login('alex.learner@gmail.com', 'Alex Learner', 'Learner')" class="account-card" style="cursor:pointer; display:flex; align-items:center; gap:0.75rem; background:rgba(255,255,255,0.03); border:1px solid var(--panel-border); padding:0.5rem 0.75rem; border-radius:10px; transition:all 0.2s ease;">
                        <div style="font-size:1.2rem; background:rgba(59,130,246,0.1); width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; color:#60a5fa;">🐱</div>
                        <div style="display:flex; flex-direction:column;">
                            <span style="font-weight:600; font-size:0.85rem; color:#fff;">Alex Learner</span>
                            <span style="font-size:0.7rem; color:var(--text-muted);">alex.learner@gmail.com</span>
                        </div>
                    </div>
                    <div onclick="PyPlayAuth.login('admin.boss@gmail.com', 'Admin Boss', 'Admin')" class="account-card" style="cursor:pointer; display:flex; align-items:center; gap:0.75rem; background:rgba(255,255,255,0.03); border:1px solid var(--panel-border); padding:0.5rem 0.75rem; border-radius:10px; transition:all 0.2s ease;">
                        <div style="font-size:1.2rem; background:rgba(239,68,68,0.1); width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; color:#fca5a5;">🦊</div>
                        <div style="display:flex; flex-direction:column;">
                            <span style="font-weight:600; font-size:0.85rem; color:#fff;">Admin Boss (Admin)</span>
                            <span style="font-size:0.7rem; color:var(--text-muted);">admin.boss@gmail.com</span>
                        </div>
                    </div>
                </div>

                <div style="border-top: 1px solid var(--panel-border); margin: 0.25rem 0; position:relative; text-align:center;">
                    <span style="position:absolute; top:-10px; left:50%; transform:translateX(-50%); background:#181c2b; padding:0 0.5rem; font-size:0.65rem; color:var(--text-muted); font-weight:700; text-transform:uppercase; letter-spacing:0.05em;">Or Join with Custom Account</span>
                </div>

                <!-- Custom Real Gmail Form -->
                <div style="display:flex; flex-direction:column; gap:0.75rem; text-align:left; margin-top:0.25rem;">
                    <div style="display:flex; flex-direction:column; gap:0.25rem;">
                        <label style="font-size:0.7rem; font-weight:600; color:var(--text-muted);">Your Name</label>
                        <input type="text" id="login-name-input" placeholder="e.g. John Doe" style="background:rgba(0,0,0,0.3); border:1px solid var(--panel-border); color:white; border-radius:8px; padding:0.5rem 0.75rem; font-family:var(--font-ui); font-size:0.85rem; outline:none;">
                    </div>
                    <div style="display:flex; flex-direction:column; gap:0.25rem;">
                        <label style="font-size:0.7rem; font-weight:600; color:var(--text-muted);">Gmail Address</label>
                        <input type="email" id="login-email-input" placeholder="e.g. john@gmail.com" style="background:rgba(0,0,0,0.3); border:1px solid var(--panel-border); color:white; border-radius:8px; padding:0.5rem 0.75rem; font-family:var(--font-ui); font-size:0.85rem; outline:none;">
                    </div>
                </div>

                <button class="btn btn-primary" onclick="PyPlayAuth.handleEmailLogin()" style="justify-content:center; width:100%; padding:0.6rem; font-size:0.9rem; border-radius:8px; display:flex; align-items:center; gap:0.5rem; font-weight:700; cursor:pointer;">
                    <svg width="16" height="16" viewBox="0 0 24 24" style="display:block;">
                        <path fill="#ffffff" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.77-2.43 3.63v3.02h3.92c2.29-2.11 3.56-5.22 3.56-8.9z"/>
                        <path fill="#ffffff" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.92-3.04c-1.08.72-2.48 1.16-4.01 1.16-3.09 0-5.72-2.08-6.66-4.88H1.31v3.14C3.29 22.39 7.37 24 12 24z"/>
                        <path fill="#ffffff" d="M5.34 14.33c-.24-.72-.38-1.49-.38-2.33s.14-1.61.38-2.33V6.53H1.31C.48 8.18 0 10.03 0 12s.48 3.82 1.31 5.47l4.03-3.14z"/>
                        <path fill="#ffffff" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.37 0 3.29 1.61 1.31 4.75l4.03 3.14c.94-2.8 3.57-4.88 6.66-4.88z"/>
                    </svg>
                    Sign In with Gmail
                </button>
                
                <button class="btn btn-clear" onclick="document.getElementById('pyplay-login-modal').style.display = 'none'" style="align-self:center; font-size:0.75rem; margin-top:0.25rem;">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
    },

    openLoginModal() {
        document.getElementById('pyplay-login-modal').style.display = 'flex';
    },

    openSettingsModal() {
        document.getElementById('pyplay-settings-modal').style.display = 'flex';
    },

    saveSettingsUrl() {
        const val = document.getElementById('pyplay-gs-url-input').value.trim();
        this.setScriptUrl(val);
    },

    async editNicknamePrompt() {
        if (!this.user) return;
        const newName = prompt("Enter your new nickname:", this.user.name);
        if (newName && newName.trim()) {
            await this.updateProfile(this.user.avatar, this.user.color, newName.trim());
            window.location.reload();
        }
    },

    handleEmailLogin() {
        const name = document.getElementById('login-name-input').value.trim();
        const email = document.getElementById('login-email-input').value.trim();
        if (!name || !email) {
            alert("Please provide both name and email.");
            return;
        }
        if (!email.toLowerCase().endsWith('@gmail.com') && !email.toLowerCase().endsWith('@googlemail.com')) {
            alert("Please enter a valid @gmail.com address.");
            return;
        }
        this.login(email, name);
    },

    tryDemo() {
        this.login("learner.student@gmail.com", "Alex Learner", "Learner");
    },

    tryAdminDemo() {
        this.login("admin.boss@gmail.com", "Admin Boss", "Admin");
    },

    updateHeaderUI() {
        this.createAppHeader();
    }
};

// Initialize
PyPlayAuth.init();

// Sync automatically at open page if user is logged in
window.addEventListener('DOMContentLoaded', async () => {
    if (PyPlayAuth.user) {
        await PyPlayAuth.syncFromSheets();
    }
});
