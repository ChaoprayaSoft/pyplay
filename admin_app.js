/**
 * PyPlay Academy - Admin Dashboard Logic
 */

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Authorization Check
    if (!PyPlayAuth.user) {
        window.location.href = 'index.html';
        return;
    }

    if (PyPlayAuth.user.role !== 'Admin') {
        alert("Unauthorized access. Admin privileges required.");
        window.location.href = 'dashboard.html';
        return;
    }

    // 2. State setup
    const UI = {
        syncIndicator: document.getElementById('sync-indicator'),
        syncText: document.getElementById('sync-text'),
        btnRefresh: document.getElementById('btn-refresh-data'),
        
        statTotalUsers: document.getElementById('stat-total-users'),
        statActiveToday: document.getElementById('stat-active-today'),
        statTotalLogs: document.getElementById('stat-total-logs'),
        statTotalBadges: document.getElementById('stat-total-badges'),
        statTotalCompletions: document.getElementById('stat-total-completions'),

        tableBody: document.getElementById('users-table-body'),
        searchInput: document.getElementById('search-users'),
        filterCourse: document.getElementById('filter-course'),
        filterRole: document.getElementById('filter-role')
    };

    let allUsers = [];
    let allLogs = [];

    // Course configuration constants
    const COURSE_TOTALS = {
        python: 13,
        opencv: 14,
        cvcapstone: 5,
        arduino: 10,
        datavis: 10,
        dataviscapstone: 6,
        javascript: 13,
        ai: 12,
        robotics: 10,
        linearcontrol: 11,
        processing: 10,
        processingcapstone: 7
    };

    const BADGE_ICONS = {
        python: '🏆',
        opencv: '📷',
        cvcapstone: '👁️',
        arduino: '🤖',
        datavis: '📊',
        dataviscapstone: '📈',
        javascript: '🟨',
        ai: '🧠',
        robotics: '🦾',
        processing: '🎨',
        processingcapstone: '🎩'
    };

    // 3. Data Fetching
    async function loadData() {
        setSyncStatus('syncing', 'Fetching data...');
        
        try {
            const [usersData, logsData] = await Promise.all([
                PyPlayAuth.getAllUsersFromSheets(),
                PyPlayAuth.getAllLogsFromSheets()
            ]);

            allUsers = usersData.map(u => {
                // Ensure progress is parsed properly
                if (typeof u.progress === 'string') {
                    try {
                        u.progress = JSON.parse(u.progress);
                    } catch (e) {
                        u.progress = {};
                    }
                }
                return u;
            });
            
            allLogs = logsData;

            processStatistics();
            renderTable();

            const timeString = new Date().toLocaleTimeString();
            setSyncStatus('success', `Last synced: ${timeString}`);
        } catch (error) {
            console.error("Admin data fetch error:", error);
            setSyncStatus('error', 'Sync failed. Check connection.');
            UI.tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: var(--error);">Failed to load data. Script may need redeployment or you are offline.</td></tr>`;
        }
    }

    function setSyncStatus(status, text) {
        UI.syncIndicator.className = `sync-indicator ${status}`;
        UI.syncText.textContent = text;
    }

    // 4. Data Processing
    function processStatistics() {
        // Total Users
        UI.statTotalUsers.textContent = allUsers.length;

        // Total Logs
        UI.statTotalLogs.textContent = allLogs.length;

        // Active Today
        const todayStr = new Date().toISOString().split('T')[0];
        const uniqueActiveEmailsToday = new Set();
        
        allLogs.forEach(log => {
            if (log.timestamp && log.timestamp.startsWith(todayStr)) {
                uniqueActiveEmailsToday.add(log.email);
            }
        });
        UI.statActiveToday.textContent = uniqueActiveEmailsToday.size;

        // Total Completions & Badges
        let badgesAwarded = 0;
        let courseCompletions = 0;

        allUsers.forEach(user => {
            if (user.progress) {
                Object.values(user.progress).forEach(courseProgress => {
                    if (courseProgress && courseProgress.completed) {
                        courseCompletions++;
                        badgesAwarded++; // 1 badge per completed course
                    }
                });
            }
        });

        UI.statTotalBadges.textContent = badgesAwarded;
        UI.statTotalCompletions.textContent = courseCompletions;
    }

    // 5. Table Rendering & Filtering
    function renderTable() {
        const searchTerm = UI.searchInput.value.toLowerCase();
        const courseFilter = UI.filterCourse.value;
        const roleFilter = UI.filterRole.value;

        // Filter Users
        const filteredUsers = allUsers.filter(user => {
            // Search
            const nameMatch = (user.name || '').toLowerCase().includes(searchTerm);
            const emailMatch = (user.email || '').toLowerCase().includes(searchTerm);
            if (!nameMatch && !emailMatch) return false;

            // Role Filter
            if (roleFilter !== 'all' && user.role !== roleFilter) return false;

            // Course Filter
            if (courseFilter !== 'all') {
                const prog = user.progress && user.progress[courseFilter];
                if (!prog || !prog.completed) return false;
            }

            return true;
        });

        // Sort by Last Updated DESC
        filteredUsers.sort((a, b) => {
            return new Date(b.lastUpdated || 0) - new Date(a.lastUpdated || 0);
        });

        if (filteredUsers.length === 0) {
            UI.tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No users found matching filters.</td></tr>`;
            return;
        }

        UI.tableBody.innerHTML = filteredUsers.map(user => {
            const roleColor = user.role === 'Admin' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)';
            const roleTextColor = user.role === 'Admin' ? '#fca5a5' : '#93c5fd';
            const progress = user.progress || {};

            // Build Progress Bars
            const progressHtml = ['python', 'opencv', 'cvcapstone', 'arduino', 'datavis', 'dataviscapstone', 'javascript', 'ai', 'robotics', 'linearcontrol', 'processing', 'processingcapstone'].map(courseId => {
                const p = progress[courseId];
                const total = COURSE_TOTALS[courseId];
                const completedCount = p && p.completed_lessons ? p.completed_lessons.length : 0;
                const percent = (completedCount / total) * 100;
                const isCompleted = p && p.completed;
                const fillClass = isCompleted ? 'course-progress-fill completed' : 'course-progress-fill';
                
                let label = courseId.substring(0,2).toUpperCase();
                if (courseId === 'robotics') label = 'ROB';
                if (courseId === 'linearcontrol') label = 'CTRL';
                if (courseId === 'processing') label = 'PROC';
                if (courseId === 'processingcapstone') label = 'PCAP';
                if (courseId === 'dataviscapstone') label = 'DVC';

                return `
                    <div title="${courseId.toUpperCase()}: ${completedCount}/${total}" style="display:inline-block; text-align:center; margin-right:4px;">
                        <div style="font-size:0.6rem; color:var(--text-muted);">${label}</div>
                        <div class="course-progress-bar">
                            <div class="${fillClass}" style="width: ${percent}%;"></div>
                        </div>
                    </div>
                `;
            }).join('');

            // Build Badges
            let badgesHtml = '';
            Object.keys(COURSE_TOTALS).forEach(courseId => {
                if (progress[courseId] && progress[courseId].completed) {
                    badgesHtml += `<span class="badge-icon-small" title="${courseId} Graduate">${BADGE_ICONS[courseId]}</span>`;
                }
            });
            if (!badgesHtml) badgesHtml = `<span style="color:var(--text-muted); font-size:0.8rem;">None</span>`;

            // Format Date
            const dateStr = user.lastUpdated ? new Date(user.lastUpdated).toLocaleDateString() : 'N/A';

            return `
                <tr>
                    <td>
                        <div class="user-cell">
                            <div class="user-avatar-small" style="border: 2px solid ${user.color || '#3b82f6'};">${user.avatar || '🐱'}</div>
                            <div>
                                <div style="font-weight: 600; color: #fff;">${user.name}</div>
                                <div style="font-size: 0.8rem; color: var(--text-muted);">${user.email}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge" style="background: ${roleColor}; color: ${roleTextColor}; font-size: 0.7rem;">${user.role || 'Learner'}</span>
                    </td>
                    <td>
                        ${progressHtml}
                    </td>
                    <td>
                        <div class="badge-list">${badgesHtml}</div>
                    </td>
                    <td style="color: var(--text-muted); font-size:0.85rem;">
                        ${dateStr}
                    </td>
                </tr>
            `;
        }).join('');
    }

    // 6. Event Listeners
    UI.btnRefresh.addEventListener('click', loadData);
    UI.searchInput.addEventListener('input', renderTable);
    UI.filterCourse.addEventListener('change', renderTable);
    UI.filterRole.addEventListener('change', renderTable);

    // Initial Load
    loadData();
});
