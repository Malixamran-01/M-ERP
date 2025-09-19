import React, { createContext, useContext, useState, useEffect } from 'react';
import { rbacManager } from '../utils/rbacPermissions.jsx';
import { RBAC_CONFIG } from '../config/rbac.jsx';
import authService from '../services/authService.jsx';

// Create RBAC Auth Context
const RBACAuthContext = createContext();

// RBAC Auth Provider Component
export const RBACAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [userDepartments, setUserDepartments] = useState([]);

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
          
          // Extract roles and departments from user
          const roles = currentUser.roles || [];
          const departments = currentUser.departments || [];
          
          setUserRoles(roles);
          setUserDepartments(departments);
          
          // Update RBAC manager context
          rbacManager.setUserContext(roles, departments);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await authService.login(email, password);
      
      if (result.success) {
        const { user: loggedInUser, token: authToken } = result;
        
        setUser(loggedInUser);
        setToken(authToken);
        
        // Extract roles and departments
        const roles = loggedInUser.roles || [];
        const departments = loggedInUser.departments || [];
        
        setUserRoles(roles);
        setUserDepartments(departments);
        
        // Update RBAC manager context
        rbacManager.setUserContext(roles, departments);
        
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    setUserRoles([]);
    setUserDepartments([]);
    rbacManager.setUserContext([], []);
    setError(null);
  };

  // Permission checking functions
  const hasPermission = (permission) => {
    return rbacManager.hasPermission(permission);
  };

  const hasAnyPermission = (permissions) => {
    return rbacManager.hasAnyPermission(permissions);
  };

  const hasAllPermissions = (permissions) => {
    return rbacManager.hasAllPermissions(permissions);
  };

  const hasRole = (roleId) => {
    return rbacManager.hasRole(roleId);
  };

  const hasAnyRole = (roleIds) => {
    return rbacManager.hasAnyRole(roleIds);
  };

  const hasDepartmentAccess = (departmentId) => {
    return rbacManager.hasDepartmentAccess(departmentId);
  };

  const canPerformAction = (action, resource, context = {}) => {
    return rbacManager.canPerformAction(action, resource, context);
  };

  // Get user's effective roles (including inherited)
  const getEffectiveRoles = () => {
    return rbacManager.getEffectiveUserRoles();
  };

  // Get user's permissions
  const getUserPermissions = () => {
    return rbacManager.getUserPermissions();
  };

  // Get user's role hierarchy level
  const getRoleHierarchyLevel = () => {
    return rbacManager.getRoleHierarchyLevel();
  };

  // Get student ID for student users
  const getStudentId = () => {
    if (user && hasRole('role_student')) {
      return user.studentId || user.id;
    }
    return null;
  };

  // Get teacher ID for teacher users
  const getTeacherId = () => {
    if (user && hasRole('role_teacher')) {
      return user.teacherId || user.id;
    }
    return null;
  };

  // Get parent ID for parent users
  const getParentId = () => {
    if (user && hasRole('role_parent')) {
      return user.parentId || user.id;
    }
    return null;
  };

  // Check if user can manage other users
  const canManageUsers = () => {
    return rbacManager.canManageUsers();
  };

  // Check if user can view reports
  const canViewReports = () => {
    return rbacManager.canViewReports();
  };

  // Check if user can manage finances
  const canManageFinances = () => {
    return rbacManager.canManageFinances();
  };

  // Check if user can configure settings
  const canConfigureSettings = () => {
    return rbacManager.canConfigureSettings();
  };

  // Get user's primary role (highest in hierarchy)
  const getPrimaryRole = () => {
    if (hasRole('role_superadmin')) return 'role_superadmin';
    if (hasRole('role_admin')) return 'role_admin';
    if (hasRole('role_teacher')) return 'role_teacher';
    if (hasRole('role_parent')) return 'role_parent';
    if (hasRole('role_student')) return 'role_student';
    return null;
  };

  // Get user's role display name
  const getRoleDisplayName = () => {
    const primaryRole = getPrimaryRole();
    if (primaryRole) {
      const roleConfig = RBAC_CONFIG.roles.find(role => role.id === primaryRole);
      return roleConfig ? roleConfig.name : primaryRole;
    }
    return 'Unknown';
  };

  // Get user's role color
  const getRoleColor = () => {
    const primaryRole = getPrimaryRole();
    if (primaryRole) {
      const roleConfig = RBAC_CONFIG.roles.find(role => role.id === primaryRole);
      return roleConfig ? roleConfig.color : 'slate';
    }
    return 'slate';
  };

  // Get user's role icon
  const getRoleIcon = () => {
    const primaryRole = getPrimaryRole();
    if (primaryRole) {
      const roleConfig = RBAC_CONFIG.roles.find(role => role.id === primaryRole);
      return roleConfig ? roleConfig.icon : '👤';
    }
    return '👤';
  };

  // Context value
  const value = {
    // Auth state
    user,
    token,
    loading,
    error,
    userRoles,
    userDepartments,
    
    // Auth actions
    login,
    logout,
    
    // Permission checking
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,
    hasDepartmentAccess,
    canPerformAction,
    
    // User info
    getEffectiveRoles,
    getUserPermissions,
    getRoleHierarchyLevel,
    getStudentId,
    getTeacherId,
    getParentId,
    
    // Role info
    getPrimaryRole,
    getRoleDisplayName,
    getRoleColor,
    getRoleIcon,
    
    // Specific permissions
    canManageUsers,
    canViewReports,
    canManageFinances,
    canConfigureSettings,
    
    // Legacy compatibility
    userRole: getPrimaryRole(), // For backward compatibility
    isAuthenticated: !!user && !!token
  };

  return (
    <RBACAuthContext.Provider value={value}>
      {children}
    </RBACAuthContext.Provider>
  );
};

// Hook to use RBAC Auth Context
export const useRBACAuth = () => {
  const context = useContext(RBACAuthContext);
  if (!context) {
    throw new Error('useRBACAuth must be used within an RBACAuthProvider');
  }
  return context;
};

// Legacy compatibility hook
export const useAuth = () => {
  return useRBACAuth();
};

// Legacy compatibility hook
export const useAuthPermissions = () => {
  return useRBACAuth();
};



