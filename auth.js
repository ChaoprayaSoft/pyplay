// --- Auth & Google Sheets Sync Utility ---

// ==========================================
// ⚙️ GOOGLE CLOUD INTEGRATION VARIABLES
// ==========================================
// 1. Paste your deployed Google Apps Script Web App URL here:
const GOOGLE_SHEETS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbywkBFnCaI9mXEeh833XTeD8lnqO6rn2Zw9_d9hxvF_nBmVGhy9CM4K-ZMESq7PCZLF/exec";


// 2. Paste your Google OAuth Client ID here:
const GOOGLE_OAUTH_CLIENT_ID = "1049203742621-tce9mr7k2qne7a7b1jn6b6mujlj9fcpu.apps.googleusercontent.com";
// ==========================================

const DEFAULT_AVATARS = ["🐱", "🐶", "🦊", "🦁", "🐯", "🐼", "🐨", "🐸", "🐙", "🦄"];
const DEFAULT_COLORS = ["#3b82f6", "#10b981", "#ef4444", "#f59e0b", "#8b5cf6", "#ec4899"];

const PyPlayAuth = {
    // Current local state
    user: null,
    scriptUrl: localStorage.getItem('pyplay_script_url') || GOOGLE_SHEETS_SCRIPT_URL, // Configured via GOOGLE_SHEETS_SCRIPT_URL above
    googleClientId: localStorage.getItem('pyplay_google_client_id') || GOOGLE_OAUTH_CLIENT_ID, // Configured via GOOGLE_OAUTH_CLIENT_ID above
    toastElement: null,

    showToast(message, isSuccess = false) {
        if (!document.getElementById('pyplay-toast-style')) {
            const style = document.createElement('style');
            style.id = 'pyplay-toast-style';
            style.textContent = `
                .pyplay-toast {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    background: rgba(15, 17, 26, 0.95);
                    border: 1px solid rgba(59, 130, 246, 0.3);
                    color: #fff;
                    padding: 0.75rem 1.25rem;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.875rem;
                    font-weight: 500;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(59, 130, 246, 0.15);
                    z-index: 100000;
                    transform: translateY(100px);
                    opacity: 0;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    pointer-events: none;
                }
                .pyplay-toast.show {
                    transform: translateY(0);
                    opacity: 1;
                }
                .pyplay-toast.success {
                    border-color: rgba(16, 185, 129, 0.4);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(16, 185, 129, 0.15);
                }
                .pyplay-toast .spinner {
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top-color: #3b82f6;
                    border-radius: 50%;
                    animation: pyplay-spin 0.8s linear infinite;
                }
                @keyframes pyplay-spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        if (!this.toastElement) {
            this.toastElement = document.createElement('div');
            this.toastElement.className = 'pyplay-toast';
            document.body.appendChild(this.toastElement);
        }

        if (isSuccess) {
            this.toastElement.classList.add('success');
            this.toastElement.innerHTML = `<span>✅</span> <span>${message}</span>`;
            setTimeout(() => {
                this.toastElement.classList.remove('show');
            }, 2500);
        } else {
            this.toastElement.classList.remove('success');
            this.toastElement.innerHTML = `<div class="spinner"></div> <span>${message}</span>`;
            this.toastElement.classList.add('show');
        }
    },

    hideToast() {
        if (this.toastElement) {
            this.toastElement.classList.remove('show');
        }
    },

    init() {
        this.scriptUrl = localStorage.getItem('pyplay_script_url') || GOOGLE_SHEETS_SCRIPT_URL;
        this.googleClientId = localStorage.getItem('pyplay_google_client_id') || GOOGLE_OAUTH_CLIENT_ID;
        this.loadLocalUser();
        this.createAppHeader();
        this.createLoginModal();
        this.createSettingsModal();
        this.initGoogleAuth();
        
        // Auto-logout after 3 hours of inactivity (10800000 ms)
        setInterval(() => {
            this.checkSessionTimeout();
        }, 60000); // Check every minute
        
        // Update activity timestamp on user interaction
        document.addEventListener('click', () => this.updateActivityTime());
        document.addEventListener('keypress', () => this.updateActivityTime());
    },

    loadLocalUser() {
        const stored = localStorage.getItem('pyplay_user');
        if (stored) {
            this.user = JSON.parse(stored);
            if (this.user && this.user.email) {
                this.user.email = this.user.email.toLowerCase().trim();
            }
            if (typeof this.user.progress === 'string') {
                try {
                    this.user.progress = JSON.parse(this.user.progress);
                } catch(e) {
                    this.user.progress = {};
                }
            }
            if (!this.user.progress || typeof this.user.progress !== 'object') {
                this.user.progress = {};
            }
        }
        
        if (this.checkSessionTimeout()) return; // If session expired, user is wiped
    },

    saveLocalUser(userData) {
        if (userData && userData.email) {
            userData.email = userData.email.toLowerCase().trim();
        }
        this.user = userData;
        localStorage.setItem('pyplay_user', JSON.stringify(userData));
        this.updateActivityTime();
        this.updateHeaderUI();
    },

    updateActivityTime() {
        if (this.user) {
            localStorage.setItem('pyplay_last_activity', Date.now().toString());
        }
    },

    checkSessionTimeout() {
        const lastActivity = localStorage.getItem('pyplay_last_activity');
        if (lastActivity && this.user) {
            const now = Date.now();
            const threeHours = 3 * 60 * 60 * 1000;
            if (now - parseInt(lastActivity) > threeHours) {
                // Session expired
                this.logout(true); // pass true to indicate timeout
                return true;
            }
        }
        return false;
    },

    // --- Google Sheets Sync Methods ---
    async syncFromSheets() {
        if (!this.user || !this.scriptUrl) return;

        this.showToast("Syncing progress from cloud...");

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            const userEmail = String(this.user.email).toLowerCase().trim();
            const response = await fetch(`${this.scriptUrl}?email=${encodeURIComponent(userEmail)}`, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const text = await response.text();
            const trimmed = text.trim();
            if (trimmed.startsWith('<') || trimmed.toLowerCase().startsWith('<!doctype')) {
                throw new Error('Response is HTML instead of JSON — script may need to be redeployed.');
            }
            
            // Apps Script sometimes returns "null" for not-found users — treat as no data
            if (!text || text === 'null') {
                this.hideToast();
                return null;
            }
            const data = JSON.parse(text);

            if (data && data.email) {
                // Safely parse progress
                let parsedProgress = this.user.progress || {};
                try {
                    if (typeof data.progress === 'string' && data.progress.trim()) {
                        parsedProgress = JSON.parse(data.progress);
                    } else if (typeof data.progress === 'object' && data.progress) {
                        parsedProgress = data.progress;
                    }
                } catch (e) {
                    console.warn("Failed to parse progress from Sheets:", e);
                }

                // Update local storage with fresh sheets data
                this.saveLocalUser({
                    ...this.user,
                    name: data.name || this.user.name,
                    avatar: data.avatar || this.user.avatar,
                    color: data.color || this.user.color,
                    role: data.role || this.user.role,
                    progress: parsedProgress
                });
                this.showToast("Progress synced! ☁️", true);
                return data;
            } else {
                this.hideToast();
                return null;
            }
        } catch (e) {
            console.warn("Cloud sync skipped (offline or script unreachable):", e.message);
            this.hideToast();
            throw e; // Rethrow to let login() handle the failure appropriately
        }
    },

    async getAllUsersFromSheets() {
        if (!this.scriptUrl) return [];

        try {
            const response = await fetch(`${this.scriptUrl}?action=get_all_users`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const text = await response.text();
            const trimmed = text.trim();
            if (trimmed.startsWith('<') || trimmed.toLowerCase().startsWith('<!doctype')) {
                throw new Error('Response is HTML instead of JSON — script may need to be redeployed.');
            }
            
            if (!text || text === 'null') return [];
            const data = JSON.parse(text);
            return Array.isArray(data) ? data : [];
        } catch (e) {
            console.warn("getAllUsersFromSheets failed:", e.message);
            throw e; // Re-throw so admin.html's catch block shows the sync error banner
        }
    },

    async getAllLogsFromSheets() {
        if (!this.scriptUrl) return [];

        try {
            const response = await fetch(`${this.scriptUrl}?action=get_all_logs`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const text = await response.text();
            const trimmed = text.trim();
            if (trimmed.startsWith('<') || trimmed.toLowerCase().startsWith('<!doctype')) {
                throw new Error('Response is HTML instead of JSON — script may need to be redeployed.');
            }
            
            if (!text || text === 'null') return [];
            const data = JSON.parse(text);
            return Array.isArray(data) ? data : [];
        } catch (e) {
            console.warn("getAllLogsFromSheets failed:", e.message);
            throw e; // Re-throw so admin.html's catch block shows the sync error banner
        }
    },

    async pushUserToSheets(userData) {
        if (!this.scriptUrl) return;

        this.showToast("Syncing settings to cloud...");

        try {
            await fetch(this.scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify({
                    type: 'user',
                    email: String(userData.email).toLowerCase().trim(),
                    name: userData.name,
                    avatar: userData.avatar,
                    color: userData.color,
                    role: userData.role,
                    progress: userData.progress,
                    lastUpdated: new Date().toISOString()
                })
            });
            this.showToast("Settings synced with cloud!", true);
        } catch (e) {
            console.error("Sheets push failed:", e);
            this.showToast("Sync failed (Offline)", true);
        }
    },

    async logToSheets(email, name, status) {
        if (!this.scriptUrl) return;

        try {
            await fetch(this.scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify({
                    type: 'log',
                    email: email ? String(email).toLowerCase().trim() : "",
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
        email = String(email).toLowerCase().trim();
        const randomAvatar = avatar || DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)];
        const randomColor = DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)];

        let userData = {
            email,
            name,
            avatar: randomAvatar,
            color: randomColor,
            role,
            progress: {
                python: { completed_lessons: [], completed: false },
                opencv: { completed_lessons: [], completed: false },
                cvcapstone: { completed_lessons: [], completed: false },
                arduino: { completed_lessons: [], completed: false },
                datavis: { completed_lessons: [], completed: false },
                dataviscapstone: { completed_lessons: [], completed: false },
                javascript: { completed_lessons: [], completed: false },
                ai: { completed_lessons: [], completed: false },
                robotics: { completed_lessons: [], completed: false },
                linearcontrol: { completed_lessons: [], completed: false },
                processing: { completed_lessons: [], completed: false },
                processingcapstone: { completed_lessons: [], completed: false }
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
                    let restoredProgress = userData.progress || {};
                    try {
                        if (typeof sheetsData.progress === 'string' && sheetsData.progress.trim()) {
                            restoredProgress = JSON.parse(sheetsData.progress);
                        } else if (typeof sheetsData.progress === 'object' && sheetsData.progress) {
                            restoredProgress = sheetsData.progress;
                        }
                    } catch (e) {
                        console.warn("Could not parse sheetsData progress", e);
                    }
                    
                    userData = {
                        email: String(sheetsData.email).toLowerCase().trim(),
                        name: sheetsData.name || name,
                        avatar: sheetsData.avatar || randomAvatar,
                        color: sheetsData.color || randomColor,
                        role: sheetsData.role || role,
                        progress: restoredProgress,
                        lastUpdated: sheetsData.lastUpdated || new Date().toISOString()
                    };
                } else {
                    // New user! Initiate and push newly created data to Sheets
                    await this.pushUserToSheets(userData);
                }
            } catch (err) {
                console.warn("Could not sync with Google Sheets during login.", err);
                // DO NOT push newly created user if sync failed due to network/CORS error,
                // as that would overwrite their cloud data with blank progress.
                // Just log them in locally.
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

    async logout(isTimeout = false) {
        if (this.user) {
            try {
                await this.logToSheets(this.user.email, this.user.name, isTimeout ? "Session Timeout" : "Logged Out");
            } catch(e) {}
        }
        this.user = null;
        localStorage.removeItem('pyplay_user');
        localStorage.removeItem('pyplay_last_activity');
        
        this.updateHeaderUI();
        
        if (isTimeout) {
            this.showToast("Session expired due to inactivity. You have been logged out.");
            setTimeout(() => {
                window.location.href = 'index.html?triggerLogin=true';
            }, 2000);
        } else {
            window.location.href = 'index.html';
        }
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

    getProgress(courseId) {
        if (!this.user || !this.user.progress || !this.user.progress[courseId]) {
            return { completed_lessons: [], completed: false, highest_lesson: 0 };
        }
        return this.user.progress[courseId];
    },

    async updateProgress(courseId, lessonIndex, isCompleted) {
        if (!this.user) return;

        if (!this.user.progress) {
            this.user.progress = {};
        }

        if (!this.user.progress[courseId]) {
            this.user.progress[courseId] = { completed_lessons: [], completed: false, highest_lesson: 0 };
        }

        const courseProgress = this.user.progress[courseId];
        if (isCompleted && !courseProgress.completed_lessons.includes(lessonIndex)) {
            courseProgress.completed_lessons.push(lessonIndex);
        }

        if (isCompleted) {
            courseProgress.highest_lesson = Math.max(courseProgress.highest_lesson || 0, lessonIndex + 1);
        }

        // Check completion based on course total lessons
        let totalLessons = 13; // default for javascript
        if (courseId === 'opencv') totalLessons = 14;
        else if (courseId === 'cvcapstone') totalLessons = 5;
        else if (courseId === 'arduino' || courseId === 'datavis' || courseId === 'robotics' || courseId === 'processing') totalLessons = 10;
        else if (courseId === 'linearcontrol') totalLessons = 11;
        else if (courseId === 'dataviscapstone') totalLessons = 6;
        else if (courseId === 'ai') totalLessons = 12;
        else if (courseId === 'processingcapstone') totalLessons = 7;
        
        if (courseProgress.completed_lessons.length === totalLessons) {
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

    createLoginModal() {
        const modal = document.createElement('div');
        modal.id = 'pyplay-login-modal';
        modal.className = 'pyplay-modal-overlay';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
            display: none; align-items: center; justify-content: center; z-index: 10000;
        `;
        modal.innerHTML = `
            <div class="glass-panel" style="width: 420px; padding: 2.5rem; display:flex; flex-direction:column; gap:1.5rem; text-align:center;">
                <div style="display: flex; justify-content: center;">
                    <img src="image/app_logo.png" alt="PyPlay Logo" style="width: 100px; height: 100px; object-fit: contain; border-radius: 50%;">
                </div>
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

    createSettingsModal() {
        if (document.getElementById('pyplay-settings-modal')) return;

        const modal = document.createElement('div');
        modal.id = 'pyplay-settings-modal';
        modal.className = 'pyplay-modal-overlay';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
            display: none; align-items: center; justify-content: center; z-index: 10000;
        `;
        modal.innerHTML = `
            <div class="glass-panel" style="width: 500px; padding: 2.5rem; display:flex; flex-direction:column; gap:1.5rem; text-align:left;">
                <div style="text-align:center; font-size:3rem;">⚙️</div>
                <div style="text-align:center;">
                    <h3 style="font-size:1.75rem; font-weight:700; color:#fff;">Integration Settings</h3>
                    <p style="font-size:0.875rem; color:var(--text-muted); margin-top:0.25rem;">Configure your Google Sheets and OAuth credentials</p>
                </div>
                
                <div style="display:flex; flex-direction:column; gap:1.25rem;">
                    <div>
                        <label style="font-size:0.8rem; font-weight:700; text-transform:uppercase; color:var(--text-muted);">Google Apps Script Web App URL</label>
                        <input type="text" id="settings-script-url" class="edit-input" style="width:100%; margin-top:0.35rem;" placeholder="https://script.google.com/macros/s/.../exec">
                    </div>
                    <div>
                        <label style="font-size:0.8rem; font-weight:700; text-transform:uppercase; color:var(--text-muted);">Google OAuth Client ID</label>
                        <input type="text" id="settings-client-id" class="edit-input" style="width:100%; margin-top:0.35rem;" placeholder="Client ID string...">
                    </div>
                </div>
                
                <div style="display:flex; gap:1rem; justify-content:flex-end; margin-top:1rem;">
                    <button class="btn btn-outline" onclick="document.getElementById('pyplay-settings-modal').style.display = 'none'">Cancel</button>
                    <button class="btn btn-primary" onclick="PyPlayAuth.saveSettings()">Save Configuration</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    openSettingsModal() {
        this.createSettingsModal();
        document.getElementById('pyplay-settings-modal').style.display = 'flex';
        document.getElementById('settings-script-url').value = this.scriptUrl || '';
        document.getElementById('settings-client-id').value = this.googleClientId || '';
    },

    saveSettings() {
        const scriptUrl = document.getElementById('settings-script-url').value.trim();
        const clientId = document.getElementById('settings-client-id').value.trim();

        if (scriptUrl) {
            localStorage.setItem('pyplay_script_url', scriptUrl);
            this.scriptUrl = scriptUrl;
        } else {
            localStorage.removeItem('pyplay_script_url');
            this.scriptUrl = GOOGLE_SHEETS_SCRIPT_URL;
        }

        if (clientId) {
            localStorage.setItem('pyplay_google_client_id', clientId);
            this.googleClientId = clientId;
        } else {
            localStorage.removeItem('pyplay_google_client_id');
            this.googleClientId = GOOGLE_OAUTH_CLIENT_ID;
        }

        this.showToast("Settings saved successfully!", true);
        document.getElementById('pyplay-settings-modal').style.display = 'none';
        
        setTimeout(() => {
            window.location.reload();
        }, 1000);
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
        const email = document.getElementById('login-email-input').value.trim().toLowerCase();
        if (!name || !email) {
            alert("Please provide both name and email.");
            return;
        }
        if (!email.endsWith('@gmail.com') && !email.endsWith('@googlemail.com')) {
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

// Handle ?triggerLogin=true URL parameter (for pages that redirect unauthenticated users)
window.addEventListener('DOMContentLoaded', () => {
    if (!PyPlayAuth.user) {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('triggerLogin') === 'true') {
            PyPlayAuth.openLoginModal();
        }
    }
});

