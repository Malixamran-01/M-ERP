import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePermissions } from '../utils/permissions.jsx';
import { RoleManager, useRoleManager } from '../utils/roleManager.jsx';
import authService from '../services/authService.jsx';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Initialize the auth service
        await authService.initialize();
        
        // Get current user from service
        const currentUser = authService.getCurrentUser();
        const currentToken = authService.getStoredToken();
        
        if (currentUser && currentToken) {
          setUser(currentUser);
          setToken(currentToken);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth state changes
    const unsubscribe = authService.addAuthListener((currentUser, isAuthenticated) => {
      setUser(currentUser);
      setToken(isAuthenticated ? authService.getStoredToken() : null);
    });

    return unsubscribe;
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await authService.login(email, password);
      
      if (result.success) {
        // The auth service will notify listeners, so we don't need to set state here
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
      // The auth service will notify listeners, so we don't need to set state here
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Update user function
  const updateUser = (updatedUser) => {
    authService.updateUser(updatedUser);
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return authService.hasRole(role);
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return authService.hasAnyRole(roles);
  };

  // Check if user has specific permission
  const hasPermission = (permission) => {
    return authService.hasPermission(permission);
  };

  // Check if user has any of the specified permissions
  const hasAnyPermission = (permissions) => {
    return authService.hasAnyPermission(permissions);
  };

  // Get user's role definition
  const getUserRoleDefinition = () => {
    if (!user?.role) return null;
    return RoleManager.getRoleDefinition(user.role);
  };

  // Check if user can assign specific role
  const canAssignRole = (targetRole) => {
    if (!user?.role) return false;
    return RoleManager.canAssignRole(user.role, targetRole);
  };

  // Get roles that user can assign
  const getAssignableRoles = () => {
    if (!user?.role) return [];
    return RoleManager.getAssignableRoles(user.role);
  };

  // Check if user is higher role than target
  const isHigherRole = (targetRole) => {
    if (!user?.role) return false;
    return RoleManager.isHigherRole(user.role, targetRole);
  };

  // Get user's linked students (for guardians)
  const getLinkedStudents = () => {
    return user?.linkedStudents || [];
  };

  // Get user's student ID (for students)
  const getStudentId = () => {
    return user?.studentId || null;
  };

  const value = {
    // State
    user,
    token,
    loading,
    error,
    
    // Actions
    login,
    logout,
    updateUser,
    
    // Role checks
    hasRole,
    hasAnyRole,
    hasPermission,
    hasAnyPermission,
    getUserRoleDefinition,
    canAssignRole,
    getAssignableRoles,
    isHigherRole,
    
    // User-specific data
    getLinkedStudents,
    getStudentId,
    
    // Computed values
    isAuthenticated: authService.isAuthenticated(),
    userRole: user?.role,
    userName: user?.full_name,
    userEmail: user?.email
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Combined hook that provides both auth and permissions
export const useAuthPermissions = () => {
  const auth = useAuth();
  const permissions = usePermissions(auth.userRole);
  const roleManager = useRoleManager(auth.userRole);
  
  return {
    ...auth,
    ...permissions,
    ...roleManager
  };
};

// Higher-order component for protected routes
export const withAuth = (WrappedComponent, requiredRoles = []) => {
  return function AuthWrapper(props) {
    const { user, loading, hasAnyRole } = useAuth();
    
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
        </div>
      );
    }
    
    if (!user) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
            <p className="text-gray-600">Please log in to access this page.</p>
          </div>
        </div>
      );
    }
    
    if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      );
    }
    
    return <WrappedComponent {...props} />;
  };
};
