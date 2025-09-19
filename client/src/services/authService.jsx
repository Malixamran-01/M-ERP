// Authentication Service for Madrasa ERP
// Handles persistent authentication state and token management

const TOKEN_KEY = 'madrasa_auth_token';
const USER_KEY = 'madrasa_user_data';
const REFRESH_TOKEN_KEY = 'madrasa_refresh_token';

// Mock user database (replace with real API calls)
const MOCK_USERS = [
  {
    id: '1',
    email: 'superadmin@madrasa.edu',
    password: 'superadmin123',
    full_name: 'Super Admin',
    role: 'super_admin',
    permissions: [
      'dashboard:view',
      'student:view', 'student:create', 'student:edit', 'student:delete', 'student:assign_class', 'student:assign_hostel', 'student:view_fees', 'student:view_attendance', 'student:view_progress', 'student:view_grades',
      'teacher:view', 'teacher:create', 'teacher:edit', 'teacher:delete', 'teacher:assign_subjects', 'teacher:assign_classes',
      'guardian:view', 'guardian:create', 'guardian:edit', 'guardian:delete', 'guardian:link_student',
      'finance:view', 'finance:manage', 'finance:view_reports', 'finance:process_payments', 'finance:manage_donations',
      'attendance:view', 'attendance:mark', 'attendance:bulk_mark', 'attendance:edit',
      'progress:view', 'progress:update', 'hifz:view', 'hifz:update',
      'exam:view', 'exam:create', 'exam:edit', 'exam:delete', 'grade:upload', 'grade:view', 'grade:edit',
      'message:send', 'message:view', 'announcement:create', 'announcement:view',
      'library:view', 'resource:upload', 'resource:manage',
      'transport:view', 'transport:manage',
      'reports:view', 'reports:generate',
      'user:manage', 'role:assign', 'role:manage',
      'data:import', 'data:export', 'data:manage',
      'system:settings', 'system:logs'
    ],
    isActive: true
  },
  {
    id: '2',
    email: 'admin@madrasa.edu',
    password: 'admin123',
    full_name: 'Admin User',
    role: 'admin',
    permissions: [
      'student:view', 'student:create', 'student:edit', 'student:delete',
      'teacher:view', 'teacher:create', 'teacher:edit', 'teacher:delete',
      'finance:view', 'finance:create', 'finance:edit', 'finance:delete',
      'reports:view', 'reports:generate', 'reports:export',
      'data:manage', 'data:import', 'data:export'
    ],
    isActive: true
  },
  {
    id: '3',
    email: 'teacher@madrasa.edu',
    password: 'teacher123',
    full_name: 'Sheikh Abdullah',
    role: 'teacher',
    permissions: [
      'student:view', 'attendance:view', 'attendance:mark', 'attendance:bulk_mark',
      'progress:view', 'progress:update', 'progress:grade',
      'hifz:view', 'hifz:update', 'hifz:verify',
      'exam:view', 'grade:upload', 'grade:view',
      'reports:view', 'reports:generate',
      'message:send', 'message:view'
    ],
    isActive: true
  },
  {
    id: '4',
    email: 'guardian@madrasa.edu',
    password: 'guardian123',
    full_name: 'Mohammed Hassan',
    role: 'guardian',
    permissions: [
      'student:view', 'attendance:view', 'progress:view', 'hifz:view',
      'finance:view', 'reports:view', 'reports:export',
      'message:send', 'message:view'
    ],
    linkedStudents: ['STD2024001', 'STD2024002'],
    isActive: true
  },
  {
    id: '5',
    email: 'student@madrasa.edu',
    password: 'student123',
    full_name: 'Ahmed Hassan',
    role: 'student',
    permissions: [
      'student:view', 'attendance:view', 'progress:view', 'hifz:view',
      'exam:view', 'grade:view', 'library:view', 'message:view',
      'schedule:view', 'assignment:view'
    ],
    studentId: 'STD2024001',
    isActive: true
  }
];

class AuthService {
  constructor() {
    this.isInitialized = false;
    this.currentUser = null;
    this.listeners = [];
  }

  // Initialize the auth service
  async initialize() {
    if (this.isInitialized) return;
    
    try {
      const token = this.getStoredToken();
      if (token) {
        const user = await this.validateToken(token);
        if (user) {
          this.currentUser = user;
          this.notifyListeners();
        } else {
          this.clearStoredAuth();
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      this.clearStoredAuth();
    }
    
    this.isInitialized = true;
  }

  // Login user
  async login(email, password) {
    try {
      // Find user in mock database
      const user = MOCK_USERS.find(u => 
        u.email === email && u.password === password && u.isActive
      );

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Create user object without password
      const { password: _, ...userWithoutPassword } = user;
      
      // Generate tokens
      const token = this.generateToken(userWithoutPassword);
      const refreshToken = this.generateRefreshToken();

      // Store authentication data
      this.storeAuth(token, refreshToken, userWithoutPassword);
      
      // Set current user
      this.currentUser = userWithoutPassword;
      
      // Notify listeners
      this.notifyListeners();

      return {
        success: true,
        user: userWithoutPassword,
        token
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Logout user
  async logout() {
    try {
      // Clear stored authentication
      this.clearStoredAuth();
      
      // Clear current user
      this.currentUser = null;
      
      // Notify listeners
      this.notifyListeners();

      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.currentUser && !!this.getStoredToken();
  }

  // Validate token
  async validateToken(token) {
    try {
      // In a real app, this would validate with the server
      // For now, we'll decode the token and check if it's valid
      const payload = this.decodeToken(token);
      
      if (!payload || payload.exp < Date.now() / 1000) {
        return null;
      }

      // Find user by ID
      const user = MOCK_USERS.find(u => u.id === payload.userId);
      if (!user || !user.isActive) {
        return null;
      }

      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error('Token validation error:', error);
      return null;
    }
  }

  // Refresh token
  async refreshToken() {
    try {
      const refreshToken = this.getStoredRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // In a real app, this would call the server
      // For now, we'll just generate a new token
      const user = this.currentUser;
      if (!user) {
        throw new Error('No current user');
      }

      const newToken = this.generateToken(user);
      this.storeToken(newToken);

      return {
        success: true,
        token: newToken
      };
    } catch (error) {
      console.error('Token refresh error:', error);
      this.logout();
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Token management
  generateToken(user) {
    // Simple token generation (in real app, use JWT)
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    };
    
    return btoa(JSON.stringify(payload));
  }

  generateRefreshToken() {
    // Simple refresh token generation
    return btoa(JSON.stringify({
      type: 'refresh',
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
    }));
  }

  decodeToken(token) {
    try {
      return JSON.parse(atob(token));
    } catch (error) {
      return null;
    }
  }

  // Storage management
  storeAuth(token, refreshToken, user) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  storeToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getStoredToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  getStoredRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  getStoredUser() {
    try {
      const userData = localStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }

  clearStoredAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  // Event listeners
  addAuthListener(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => {
      try {
        listener(this.currentUser, this.isAuthenticated());
      } catch (error) {
        console.error('Auth listener error:', error);
      }
    });
  }

  // Update user data
  updateUser(updatedUser) {
    if (this.currentUser) {
      this.currentUser = { ...this.currentUser, ...updatedUser };
      localStorage.setItem(USER_KEY, JSON.stringify(this.currentUser));
      this.notifyListeners();
    }
  }

  // Check permissions
  hasPermission(permission) {
    if (!this.currentUser) return false;
    if (this.currentUser.role === 'super_admin') return true;
    if (this.currentUser.permissions?.includes('all_permissions')) return true;
    return this.currentUser.permissions?.includes(permission) || false;
  }

  hasAnyPermission(permissions) {
    if (!this.currentUser) return false;
    if (this.currentUser.role === 'super_admin') return true;
    if (this.currentUser.permissions?.includes('all_permissions')) return true;
    return permissions.some(permission => this.hasPermission(permission));
  }

  hasRole(role) {
    return this.currentUser?.role === role;
  }

  hasAnyRole(roles) {
    return roles.includes(this.currentUser?.role);
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService;
