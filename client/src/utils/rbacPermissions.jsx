import { RBAC_CONFIG, getAllPermissionsForRole, getEffectiveRoles } from '../config/rbac.jsx';

// Enhanced permission checking system for RBAC
export class RBACPermissionManager {
  constructor() {
    this.userRoles = [];
    this.userDepartments = [];
  }

  // Set user's roles and departments
  setUserContext(roles, departments = []) {
    this.userRoles = roles || [];
    this.userDepartments = departments || [];
  }

  // Check if user has a specific permission
  hasPermission(permission) {
    if (!this.userRoles || this.userRoles.length === 0) return false;
    
    // Check if any role has the permission
    return this.userRoles.some(roleId => {
      const rolePermissions = getAllPermissionsForRole(roleId);
      return rolePermissions.includes(permission) || rolePermissions.includes("*");
    });
  }

  // Check if user has any of the specified permissions
  hasAnyPermission(permissions) {
    if (!Array.isArray(permissions)) {
      permissions = [permissions];
    }
    return permissions.some(permission => this.hasPermission(permission));
  }

  // Check if user has all of the specified permissions
  hasAllPermissions(permissions) {
    if (!Array.isArray(permissions)) {
      permissions = [permissions];
    }
    return permissions.every(permission => this.hasPermission(permission));
  }

  // Check if user has access to a specific department
  hasDepartmentAccess(departmentId) {
    if (this.userRoles.includes('role_superadmin')) {
      return true; // SuperAdmin has access to all departments
    }
    return this.userDepartments.includes(departmentId);
  }

  // Check if user can perform action on a specific resource
  canPerformAction(action, resource, context = {}) {
    // SuperAdmin can do everything
    if (this.userRoles.includes('role_superadmin')) {
      return true;
    }

    // Check department access if resource belongs to a department
    if (context.departmentId && !this.hasDepartmentAccess(context.departmentId)) {
      return false;
    }

    // Check specific permissions based on action and resource
    const permissionMap = {
      'create': {
        'user': 'manage_users',
        'role': 'manage_roles',
        'department': 'manage_departments',
        'schedule': 'create_schedule',
        'assignment': 'upload_assignments',
        'exam': 'grade_exams'
      },
      'read': {
        'user': 'manage_users',
        'schedule': 'view_schedule',
        'assignment': 'view_assignments',
        'progress': 'view_student_progress',
        'attendance': 'mark_attendance',
        'fees': 'view_fees'
      },
      'update': {
        'user': 'manage_users',
        'schedule': 'create_schedule',
        'assignment': 'upload_assignments',
        'exam': 'grade_exams',
        'attendance': 'mark_attendance'
      },
      'delete': {
        'user': 'manage_users',
        'schedule': 'create_schedule',
        'assignment': 'upload_assignments'
      }
    };

    const requiredPermission = permissionMap[action]?.[resource];
    if (requiredPermission) {
      return this.hasPermission(requiredPermission);
    }

    return false;
  }

  // Get all permissions for current user
  getUserPermissions() {
    let allPermissions = [];
    this.userRoles.forEach(roleId => {
      const rolePermissions = getAllPermissionsForRole(roleId);
      allPermissions = [...allPermissions, ...rolePermissions];
    });
    return [...new Set(allPermissions)];
  }

  // Get effective roles for current user (including inherited)
  getEffectiveUserRoles() {
    return getEffectiveRoles(this.userRoles);
  }

  // Check if user is in a specific role
  hasRole(roleId) {
    return this.userRoles.includes(roleId);
  }

  // Check if user has any of the specified roles
  hasAnyRole(roleIds) {
    if (!Array.isArray(roleIds)) {
      roleIds = [roleIds];
    }
    return roleIds.some(roleId => this.hasRole(roleId));
  }

  // Get user's role hierarchy level (for UI display)
  getRoleHierarchyLevel() {
    if (this.hasRole('role_superadmin')) return 5;
    if (this.hasRole('role_admin')) return 4;
    if (this.hasRole('role_teacher')) return 3;
    if (this.hasRole('role_parent')) return 2;
    if (this.hasRole('role_student')) return 1;
    return 0;
  }

  // Check if user can manage other users
  canManageUsers() {
    return this.hasPermission('manage_users');
  }

  // Check if user can view reports
  canViewReports() {
    return this.hasPermission('view_reports');
  }

  // Check if user can manage finances
  canManageFinances() {
    return this.hasPermission('manage_finances');
  }

  // Check if user can configure settings
  canConfigureSettings() {
    return this.hasPermission('configure_settings');
  }
}

// Create a singleton instance
export const rbacManager = new RBACPermissionManager();

// Helper functions for backward compatibility
export const checkPermission = (userRoles, permission) => {
  return rbacManager.hasPermission(permission);
};

export const checkAnyPermission = (userRoles, permissions) => {
  return rbacManager.hasAnyPermission(permissions);
};

export const checkAllPermissions = (userRoles, permissions) => {
  return rbacManager.hasAllPermissions(permissions);
};

// Department management utilities
export const getDepartmentColor = (departmentId) => {
  const department = RBAC_CONFIG.departments.find(dept => dept.id === departmentId);
  return department ? department.color : '#6B7280';
};

export const getDepartmentIcon = (departmentId) => {
  const department = RBAC_CONFIG.departments.find(dept => dept.id === departmentId);
  return department ? department.icon : '📁';
};

export const getDepartmentName = (departmentId) => {
  const department = RBAC_CONFIG.departments.find(dept => dept.id === departmentId);
  return department ? department.name : 'Unknown Department';
};

// Navigation permission checking
export const canAccessNavigationItem = (navigationItem, userRoles, userDepartments = []) => {
  rbacManager.setUserContext(userRoles, userDepartments);
  
  // Check role requirements
  if (navigationItem.roles && !rbacManager.hasAnyRole(navigationItem.roles)) {
    return false;
  }
  
  // Check permission requirements
  if (navigationItem.permission && !rbacManager.hasPermission(navigationItem.permission)) {
    return false;
  }
  
  // Check department requirements
  if (navigationItem.departments && !navigationItem.departments.some(dept => rbacManager.hasDepartmentAccess(dept))) {
    return false;
  }
  
  return true;
};
