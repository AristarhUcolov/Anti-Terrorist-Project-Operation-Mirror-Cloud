// Authentication and Authorization module

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.accessLevels = {
            'guest': 0,
            'analyst': 1,
            'operator': 2,
            'admin': 3
        };
        
        // Mock users database
        this.users = [
            {
                id: 1,
                username: 'analyst',
                password: 'analyst123',
                name: 'Data Analyst',
                role: 'analyst',
                avatar: 'analyst',
                lastLogin: null
            },
            {
                id: 2,
                username: 'operator',
                password: 'operator123',
                name: 'Security Operator',
                role: 'operator',
                avatar: 'operator',
                lastLogin: null
            },
            {
                id: 3,
                username: 'admin',
                password: 'admin123',
                name: 'System Admin',
                role: 'admin',
                avatar: 'admin',
                lastLogin: null
            }
        ];
    }
    
    // Login method
    login(username, password) {
        return new Promise((resolve, reject) => {
            // Simulate API call delay
            setTimeout(() => {
                const user = this.users.find(u => u.username === username && u.password === password);
                
                if (user) {
                    this.currentUser = user;
                    user.lastLogin = new Date();
                    localStorage.setItem('terrorWatchUser', JSON.stringify(user));
                    resolve(user);
                } else {
                    reject(new Error('Invalid username or password'));
                }
            }, 800);
        });
    }
    
    // Logout method
    logout() {
        this.currentUser = null;
        localStorage.removeItem('terrorWatchUser');
        return Promise.resolve();
    }
    
    // Check if user is authenticated
    isAuthenticated() {
        return !!this.currentUser;
    }
    
    // Check user role
    hasRole(role) {
        if (!this.currentUser) return false;
        return this.accessLevels[this.currentUser.role] >= this.accessLevels[role];
    }
    
    // Get current user
    getUser() {
        return this.currentUser;
    }
    
    // Initialize from localStorage
    init() {
        const storedUser = localStorage.getItem('terrorWatchUser');
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
        }
    }
    
    // Password reset (mock)
    requestPasswordReset(email) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, message: 'If an account exists with this email, a reset link has been sent' });
            }, 1000);
        });
    }
    
    // Update user profile
    updateProfile(updates) {
        return new Promise((resolve, reject) => {
            if (!this.currentUser) {
                reject(new Error('Not authenticated'));
                return;
            }
            
            setTimeout(() => {
                const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
                if (userIndex === -1) {
                    reject(new Error('User not found'));
                    return;
                }
                
                this.users[userIndex] = { ...this.users[userIndex], ...updates };
                this.currentUser = this.users[userIndex];
                localStorage.setItem('terrorWatchUser', JSON.stringify(this.currentUser));
                
                resolve(this.currentUser);
            }, 500);
        });
    }
}

// Create auth instance
const auth = new AuthSystem();

// Initialize from storage
auth.init();

// Export for use in other modules
export default auth;