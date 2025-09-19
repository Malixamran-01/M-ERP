// Enhanced RBAC Permission System for Madrasa ERP

// Define all available permissions
export const PERMISSIONS = {
  // Dashboard
  DASHBOARD_VIEW: 'dashboard:view',
  
  // Student Management
  STUDENT_VIEW: 'student:view',
  STUDENT_CREATE: 'student:create',
  STUDENT_EDIT: 'student:edit',
  STUDENT_DELETE: 'student:delete',
  STUDENT_ASSIGN_CLASS: 'student:assign_class',
  STUDENT_ASSIGN_HOSTEL: 'student:assign_hostel',
  
  // Teacher Management
  TEACHER_VIEW: 'teacher:view',
  TEACHER_CREATE: 'teacher:create',
  TEACHER_EDIT: 'teacher:edit',
  TEACHER_DELETE: 'teacher:delete',
  TEACHER_ASSIGN_CLASS: 'teacher:assign_class',
  
  // Guardian Management
  GUARDIAN_VIEW: 'guardian:view',
  GUARDIAN_CREATE: 'guardian:create',
  GUARDIAN_EDIT: 'guardian:edit',
  GUARDIAN_LINK_CHILD: 'guardian:link_child',
  
  // Attendance
  ATTENDANCE_VIEW: 'attendance:view',
  ATTENDANCE_MARK: 'attendance:mark',
  ATTENDANCE_EDIT: 'attendance:edit',
  ATTENDANCE_BULK_MARK: 'attendance:bulk_mark',
  
  // Academic Progress
  PROGRESS_VIEW: 'progress:view',
  PROGRESS_UPDATE: 'progress:update',
  PROGRESS_GRADE: 'progress:grade',
  
  // Hifz Tracking
  HIFZ_VIEW: 'hifz:view',
  HIFZ_UPDATE: 'hifz:update',
  HIFZ_VERIFY: 'hifz:verify',
  
  // Finance Management
  FINANCE_VIEW: 'finance:view',
  FINANCE_CREATE: 'finance:create',
  FINANCE_EDIT: 'finance:edit',
  FINANCE_DELETE: 'finance:delete',
  FEE_COLLECT: 'fee:collect',
  DONATION_MANAGE: 'donation:manage',
  
  // Exam & Grading
  EXAM_VIEW: 'exam:view',
  EXAM_CREATE: 'exam:create',
  EXAM_EDIT: 'exam:edit',
  EXAM_DELETE: 'exam:delete',
  GRADE_UPLOAD: 'grade:upload',
  GRADE_VIEW: 'grade:view',
  
  // Reports & Analytics
  REPORTS_VIEW: 'reports:view',
  REPORTS_GENERATE: 'reports:generate',
  REPORTS_EXPORT: 'reports:export',
  
  // Messaging
  MESSAGE_SEND: 'message:send',
  MESSAGE_VIEW: 'message:view',
  ANNOUNCEMENT_CREATE: 'announcement:create',
  
  // Library & Resources
  LIBRARY_VIEW: 'library:view',
  LIBRARY_MANAGE: 'library:manage',
  RESOURCE_UPLOAD: 'resource:upload',
  
  // Transport
  TRANSPORT_VIEW: 'transport:view',
  TRANSPORT_MANAGE: 'transport:manage',
  ROUTE_ASSIGN: 'route:assign',
  
  // Hostel Management
  HOSTEL_VIEW: 'hostel:view',
  HOSTEL_MANAGE: 'hostel:manage',
  ROOM_ASSIGN: 'room:assign',
  
  // User & Role Management
  USER_VIEW: 'user:view',
  USER_CREATE: 'user:create',
  USER_EDIT: 'user:edit',
  USER_DELETE: 'user:delete',
  ROLE_ASSIGN: 'role:assign',
  ROLE_CREATE: 'role:create',
  ROLE_EDIT: 'role:edit',
  
  // Data Management
  DATA_IMPORT: 'data:import',
  DATA_EXPORT: 'data:export',
  DATA_MANAGE: 'data:manage',
  
  // System Administration
  SYSTEM_CONFIG: 'system:config',
  SYSTEM_SETTINGS: 'system:settings',
  SYSTEM_BACKUP: 'system:backup',
  SYSTEM_LOGS: 'system:logs'
};

// Define role permissions
export const ROLE_PERMISSIONS = {
  super_admin: [
    // Super admin has all permissions
    ...Object.values(PERMISSIONS)
  ],
  
  admin: [
    // Dashboard
    PERMISSIONS.DASHBOARD_VIEW,
    
    // Student Management
    PERMISSIONS.STUDENT_VIEW,
    PERMISSIONS.STUDENT_CREATE,
    PERMISSIONS.STUDENT_EDIT,
    PERMISSIONS.STUDENT_DELETE,
    PERMISSIONS.STUDENT_ASSIGN_CLASS,
    PERMISSIONS.STUDENT_ASSIGN_HOSTEL,
    
    // Teacher Management
    PERMISSIONS.TEACHER_VIEW,
    PERMISSIONS.TEACHER_CREATE,
    PERMISSIONS.TEACHER_EDIT,
    PERMISSIONS.TEACHER_DELETE,
    PERMISSIONS.TEACHER_ASSIGN_CLASS,
    
    // Guardian Management
    PERMISSIONS.GUARDIAN_VIEW,
    PERMISSIONS.GUARDIAN_CREATE,
    PERMISSIONS.GUARDIAN_EDIT,
    PERMISSIONS.GUARDIAN_LINK_CHILD,
    
    // Attendance
    PERMISSIONS.ATTENDANCE_VIEW,
    PERMISSIONS.ATTENDANCE_MARK,
    PERMISSIONS.ATTENDANCE_EDIT,
    PERMISSIONS.ATTENDANCE_BULK_MARK,
    
    // Academic Progress
    PERMISSIONS.PROGRESS_VIEW,
    PERMISSIONS.PROGRESS_UPDATE,
    PERMISSIONS.PROGRESS_GRADE,
    
    // Hifz Tracking
    PERMISSIONS.HIFZ_VIEW,
    PERMISSIONS.HIFZ_UPDATE,
    PERMISSIONS.HIFZ_VERIFY,
    
    // Finance Management
    PERMISSIONS.FINANCE_VIEW,
    PERMISSIONS.FINANCE_CREATE,
    PERMISSIONS.FINANCE_EDIT,
    PERMISSIONS.FINANCE_DELETE,
    PERMISSIONS.FEE_COLLECT,
    PERMISSIONS.DONATION_MANAGE,
    
    // Exam & Grading
    PERMISSIONS.EXAM_VIEW,
    PERMISSIONS.EXAM_CREATE,
    PERMISSIONS.EXAM_EDIT,
    PERMISSIONS.EXAM_DELETE,
    PERMISSIONS.GRADE_UPLOAD,
    PERMISSIONS.GRADE_VIEW,
    
    // Reports & Analytics
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_GENERATE,
    PERMISSIONS.REPORTS_EXPORT,
    
    // Messaging
    PERMISSIONS.MESSAGE_SEND,
    PERMISSIONS.MESSAGE_VIEW,
    PERMISSIONS.ANNOUNCEMENT_CREATE,
    
    // Library & Resources
    PERMISSIONS.LIBRARY_VIEW,
    PERMISSIONS.LIBRARY_MANAGE,
    PERMISSIONS.RESOURCE_UPLOAD,
    
    // Transport
    PERMISSIONS.TRANSPORT_VIEW,
    PERMISSIONS.TRANSPORT_MANAGE,
    PERMISSIONS.ROUTE_ASSIGN,
    
    // Hostel Management
    PERMISSIONS.HOSTEL_VIEW,
    PERMISSIONS.HOSTEL_MANAGE,
    PERMISSIONS.ROOM_ASSIGN,
    
    // User & Role Management
    PERMISSIONS.USER_VIEW,
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_EDIT,
    PERMISSIONS.ROLE_ASSIGN,
    
    // Data Management
    PERMISSIONS.DATA_IMPORT,
    PERMISSIONS.DATA_EXPORT,
    PERMISSIONS.DATA_MANAGE
  ],
  
  teacher: [
    // Dashboard
    PERMISSIONS.DASHBOARD_VIEW,
    
    // Student Management (limited to their classes)
    PERMISSIONS.STUDENT_VIEW,
    
    // Attendance
    PERMISSIONS.ATTENDANCE_VIEW,
    PERMISSIONS.ATTENDANCE_MARK,
    PERMISSIONS.ATTENDANCE_BULK_MARK,
    
    // Academic Progress
    PERMISSIONS.PROGRESS_VIEW,
    PERMISSIONS.PROGRESS_UPDATE,
    PERMISSIONS.PROGRESS_GRADE,
    
    // Hifz Tracking
    PERMISSIONS.HIFZ_VIEW,
    PERMISSIONS.HIFZ_UPDATE,
    PERMISSIONS.HIFZ_VERIFY,
    
    // Exam & Grading
    PERMISSIONS.EXAM_VIEW,
    PERMISSIONS.GRADE_UPLOAD,
    PERMISSIONS.GRADE_VIEW,
    
    // Reports (limited)
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_GENERATE,
    
    // Messaging
    PERMISSIONS.MESSAGE_SEND,
    PERMISSIONS.MESSAGE_VIEW,
    
    // Library & Resources
    PERMISSIONS.LIBRARY_VIEW,
    PERMISSIONS.RESOURCE_UPLOAD
  ],
  
  guardian: [
    // Dashboard
    PERMISSIONS.DASHBOARD_VIEW,
    
    // Student Management (read-only for their children)
    PERMISSIONS.STUDENT_VIEW,
    
    // Attendance (view only)
    PERMISSIONS.ATTENDANCE_VIEW,
    
    // Academic Progress (view only)
    PERMISSIONS.PROGRESS_VIEW,
    
    // Hifz Tracking (view only)
    PERMISSIONS.HIFZ_VIEW,
    
    // Finance (view fee status only)
    PERMISSIONS.FINANCE_VIEW,
    
    // Reports (download only)
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_EXPORT,
    
    // Messaging
    PERMISSIONS.MESSAGE_SEND,
    PERMISSIONS.MESSAGE_VIEW
  ],
  
  student: [
    // Dashboard
    PERMISSIONS.DASHBOARD_VIEW,
    
    // Student Management (own record only)
    PERMISSIONS.STUDENT_VIEW,
    
    // Attendance (own record only)
    PERMISSIONS.ATTENDANCE_VIEW,
    
    // Academic Progress (own record only)
    PERMISSIONS.PROGRESS_VIEW,
    
    // Hifz Tracking (own record only)
    PERMISSIONS.HIFZ_VIEW,
    
    // Exam & Grading (own grades only)
    PERMISSIONS.EXAM_VIEW,
    PERMISSIONS.GRADE_VIEW,
    
    // Library & Resources
    PERMISSIONS.LIBRARY_VIEW,
    
    // Messaging (receive only)
    PERMISSIONS.MESSAGE_VIEW
  ]
};

// Permission checking utilities
export class PermissionManager {
  static hasPermission(userRole, permission) {
    if (!userRole || !permission) return false;
    
    const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
    return rolePermissions.includes(permission);
  }
  
  static hasAnyPermission(userRole, permissions) {
    if (!userRole || !permissions || !Array.isArray(permissions)) return false;
    
    return permissions.some(permission => this.hasPermission(userRole, permission));
  }
  
  static hasAllPermissions(userRole, permissions) {
    if (!userRole || !permissions || !Array.isArray(permissions)) return false;
    
    return permissions.every(permission => this.hasPermission(userRole, permission));
  }
  
  static getRolePermissions(userRole) {
    return ROLE_PERMISSIONS[userRole] || [];
  }
  
  static canAccessModule(userRole, moduleName) {
    const modulePermissions = {
      'students': [PERMISSIONS.STUDENT_VIEW],
      'teachers': [PERMISSIONS.TEACHER_VIEW],
      'attendance': [PERMISSIONS.ATTENDANCE_VIEW],
      'finance': [PERMISSIONS.FINANCE_VIEW],
      'academics': [PERMISSIONS.PROGRESS_VIEW],
      'hifz-progress': [PERMISSIONS.HIFZ_VIEW],
      'reports': [PERMISSIONS.REPORTS_VIEW],
      'data-management': [PERMISSIONS.DATA_MANAGE],
      'guardians': [PERMISSIONS.GUARDIAN_VIEW],
      'exams': [PERMISSIONS.EXAM_VIEW],
      'library': [PERMISSIONS.LIBRARY_VIEW],
      'transport': [PERMISSIONS.TRANSPORT_VIEW],
      'hostel': [PERMISSIONS.HOSTEL_VIEW],
      'messaging': [PERMISSIONS.MESSAGE_VIEW]
    };
    
    const requiredPermissions = modulePermissions[moduleName] || [];
    return this.hasAnyPermission(userRole, requiredPermissions);
  }
}

// React hook for permission checking
export const usePermissions = (userRole) => {
  const hasPermission = (permission) => {
    return PermissionManager.hasPermission(userRole, permission);
  };
  
  const hasAnyPermission = (permissions) => {
    return PermissionManager.hasAnyPermission(userRole, permissions);
  };
  
  const hasAllPermissions = (permissions) => {
    return PermissionManager.hasAllPermissions(userRole, permissions);
  };
  
  const canAccessModule = (moduleName) => {
    return PermissionManager.canAccessModule(userRole, moduleName);
  };
  
  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccessModule,
    userRole,
    permissions: PermissionManager.getRolePermissions(userRole)
  };
};

// Higher-order component for permission-based rendering
export const withPermissions = (WrappedComponent, requiredPermissions) => {
  return function PermissionWrapper(props) {
    const { userRole } = props;
    
    if (!userRole) {
      return null;
    }
    
    const hasRequiredPermissions = PermissionManager.hasAnyPermission(
      userRole, 
      Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions]
    );
    
    if (!hasRequiredPermissions) {
      return null;
    }
    
    return <WrappedComponent {...props} />;
  };
};

// Component for conditional rendering based on permissions
export const PermissionGate = ({ 
  userRole, 
  permission, 
  permissions, 
  children, 
  fallback = null,
  requireAll = false 
}) => {
  if (!userRole) {
    return fallback;
  }
  
  let hasPermission = false;
  
  if (permission) {
    hasPermission = PermissionManager.hasPermission(userRole, permission);
  } else if (permissions) {
    hasPermission = requireAll 
      ? PermissionManager.hasAllPermissions(userRole, permissions)
      : PermissionManager.hasAnyPermission(userRole, permissions);
  }
  
  return hasPermission ? children : fallback;
};
