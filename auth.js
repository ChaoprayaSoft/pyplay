// --- Auth & Google Sheets Sync Utility ---

const DEFAULT_AVATARS = ["🐱", "🐶", "🦊", "🦁", "🐯", "🐼", "🐨", "🐸", "🐙", "🦄"];
const DEFAULT_COLORS = ["#3b82f6", "#10b981", "#ef4444", "#f59e0b", "#8b5cf6", "#ec4899"];

const PyPlayAuth = {
    // Current local state
    user: null,
    scriptUrl: localStorage.getItem('pyplay_gs_url') || '', // Google Apps Script URL
    googleClientId: localStorage.getItem('pyplay_google_client_id') || '103949829472-placeholder.apps.googleusercontent.com',

    init() {
        this.loadLocalUser();
        this.createAppHeader();
        this.createSettingsModal();
        this.createLoginModal();
        this.initGoogleAuth();
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
    async login(email, name, role = "Learner", avatar = null) {
        const randomAvatar = avatar || DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)];
        const randomColor = DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)];
        
        let userData = {
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

        // Try to fetch existing profile from Google Sheets if scriptUrl is configured
        if (this.scriptUrl) {
            try {
                // Set temporary user object so syncFromSheets has access to the email for fetching
                this.user = { email, name }; 
                const sheetsData = await this.syncFromSheets();
                if (sheetsData && sheetsData.email) {
                    // Existing user found! Restore their profile and progress
                    userData = {
                        email: sheetsData.email,
                        name: sheetsData.name || name,
                        avatar: sheetsData.avatar || randomAvatar,
                        color: sheetsData.color || randomColor,
                        role: sheetsData.role || role,
                        progress: typeof sheetsData.progress === 'string' ? JSON.parse(sheetsData.progress) : (sheetsData.progress || userData.progress),
                        lastUpdated: sheetsData.lastUpdated || new Date().toISOString()
                    };
                } else {
                    // New user! Initiate and push newly created data to Sheets
                    await this.pushUserToSheets(userData);
                }
            } catch (err) {
                console.warn("Could not sync with Google Sheets during login, falling back to local initial setup.", err);
                // Fallback to pushing newly created user
                await this.pushUserToSheets(userData);
            }
        } else {
            // Push locally if no scriptUrl is set yet
            await this.pushUserToSheets(userData);
        }

        this.saveLocalUser(userData);
        await this.logToSheets(email, userData.name, "Logged In");
        
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

        // Clean existing right controls to prevent duplication!
        const existingAuth = header.querySelector('.header-auth-controls');
        if (existingAuth) {
            existingAuth.remove();
        }
        
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

            // Add settings cog (ONLY FOR ADMIN ACCESS)
            if (this.user.role === 'Admin') {
                const settingsBtn = document.createElement('button');
                settingsBtn.className = 'btn btn-outline';
                settingsBtn.innerHTML = '⚙️';
                settingsBtn.title = "Configure Google Sheets Sync";
                settingsBtn.onclick = () => this.openSettingsModal();
                profileDiv.appendChild(settingsBtn);
            }
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
                <h3 style="font-size:1.5rem; font-weight:700;">⚙️ Sync & Auth Settings</h3>
                <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.4;">
                    Configure your platform cloud integrations below.
                </p>
                <div style="display:flex; flex-direction:column; gap:1rem;">
                    <div style="display:flex; flex-direction:column; gap:0.35rem;">
                        <label style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--text-muted);">Script Web App URL</label>
                        <input type="text" id="pyplay-gs-url-input" placeholder="https://script.google.com/macros/s/.../exec" style="background:rgba(0,0,0,0.3); border:1px solid var(--panel-border); color:white; border-radius:8px; padding:0.75rem; font-family:var(--font-ui); font-size:0.9rem; outline:none; width: 100%;" value="${this.scriptUrl}">
                    </div>
                    <div style="display:flex; flex-direction:column; gap:0.35rem;">
                        <label style="font-size:0.75rem; font-weight:600; text-transform:uppercase; color:var(--text-muted);">Google Client ID (OAuth)</label>
                        <input type="text" id="pyplay-google-client-id-input" placeholder="Client ID from Google Cloud Console" style="background:rgba(0,0,0,0.3); border:1px solid var(--panel-border); color:white; border-radius:8px; padding:0.75rem; font-family:var(--font-ui); font-size:0.9rem; outline:none; width: 100%;" value="${this.googleClientId}">
                    </div>
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
            <div class="glass-panel" style="width: 420px; padding: 2.5rem; display:flex; flex-direction:column; gap:1.5rem; text-align:center;">
                <div style="font-size:3rem;">🐍</div>
                <div>
                    <h3 style="font-size:1.75rem; font-weight:700; color:#fff;">Sign In with Google</h3>
                    <p style="font-size:0.875rem; color:var(--text-muted); margin-top:0.25rem;">Sign in with your Google Account to access PyPlay</p>
                </div>
                
                <!-- Google API Button Container -->
                <div style="display:flex; flex-direction:column; gap:0.5rem; align-items:center; margin-top:1rem; margin-bottom:1rem;">
                    <div id="google-signin-btn-api" style="width:100%; display:flex; justify-content:center;"></div>
                </div>
                
                <button class="btn btn-clear" onclick="document.getElementById('pyplay-login-modal').style.display = 'none'" style="align-self:center; font-size:0.8rem;">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
    },

    openLoginModal() {
        document.getElementById('pyplay-login-modal').style.display = 'flex';
        // Render Google API button
        this.initGoogleAuth();
    },

    openSettingsModal() {
        document.getElementById('pyplay-settings-modal').style.display = 'flex';
    },

    saveSettingsUrl() {
        const valUrl = document.getElementById('pyplay-gs-url-input').value.trim();
        const valClientId = document.getElementById('pyplay-google-client-id-input').value.trim();
        
        this.setScriptUrl(valUrl);
        
        this.googleClientId = valClientId;
        localStorage.setItem('pyplay_google_client_id', valClientId);
        
        // Re-initialize Google Auth with new Client ID
        this.initGoogleAuth();
        
        document.getElementById('pyplay-settings-modal').style.display = 'none';
        alert("Sync & Auth settings saved successfully! 🚀");
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

    initGoogleAuth() {
        // Load the script dynamically if not present
        if (!document.querySelector('script[src*="accounts.google.com/gsi/client"]')) {
            const script = document.createElement('script');
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;
            script.onload = () => this.setupGoogleButton();
            document.head.appendChild(script);
        } else {
            this.setupGoogleButton();
        }
    },

    setupGoogleButton() {
        if (typeof google === 'undefined') return;
        
        try {
            google.accounts.id.initialize({
                client_id: this.googleClientId,
                callback: (res) => this.handleGoogleCredentialResponse(res)
            });
            
            const btnContainer = document.getElementById("google-signin-btn-api");
            if (btnContainer) {
                btnContainer.innerHTML = ''; // Clean container
                google.accounts.id.renderButton(btnContainer, {
                    theme: "filled_blue",
                    size: "large",
                    shape: "pill",
                    width: 340
                });
            }
        } catch (e) {
            console.error("Failed to setup Google button", e);
        }
    },

    handleGoogleCredentialResponse(response) {
        try {
            const base64Url = response.credential.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const payload = JSON.parse(jsonPayload);
            
            const realEmail = payload.email;
            const realName = payload.name;
            const realAvatar = DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)]; // Custom cute avatar assigned
            
            this.login(realEmail, realName, 'Learner', realAvatar);
            document.getElementById('pyplay-login-modal').style.display = 'none';
        } catch (e) {
            console.error("Failed to parse Google OAuth credential", e);
            alert("Failed to authenticate with Google API.");
        }
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
