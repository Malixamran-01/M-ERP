// Comprehensive RBAC Configuration for Madrasa ERP
export const RBAC_CONFIG = {
  roles: [
    {
      name: "SuperAdmin",
      id: "role_superadmin",
      description: "Full control over all clusters, organizations, departments, and users.",
      permissions: ["*"], 
      isRootRole: true,
      color: "rose"
    },
    {
      name: "Admin",
      id: "role_admin",
      description: "Admin of a cluster or organization. Manages staff, roles, and settings.",
      inheritsFrom: ["role_teacher", "role_student", "role_parent"],
      permissions: [
        "view_users", "add_users", "edit_users", "delete_users", "assign_roles",
        "view_roles", "add_roles", "edit_roles", "delete_roles", "manage_permissions",
        "view_departments", "add_departments", "edit_departments", "delete_departments", "assign_roles_department",
        "view_finances", "add_finances", "edit_finances", "delete_finances", "view_fees", "manage_fees", "view_donations", "manage_donations",
        "view_reports", "generate_reports", "export_reports",
        "view_settings", "configure_settings", "view_logs", "manage_backups", "system_maintenance"
      ],
      color: "slate"
    },
    {
      name: "Teacher",
      id: "role_teacher",
      description: "Handles academic content, student performance, and class scheduling.",
      inheritsFrom: ["role_student"],
      permissions: [
        "view_schedule", "add_schedule", "edit_schedule", "delete_schedule",
        "view_assignments", "add_assignments", "edit_assignments", "delete_assignments",
        "view_exams", "add_exams", "edit_exams", "delete_exams", "grade_exams",
        "view_students", "view_attendance", "mark_attendance", "edit_attendance",
        "view_progress", "update_progress",
        "send_messages", "send_notifications", "manage_announcements"
      ],
      color: "emerald"
    },
    {
      name: "Student",
      id: "role_student",
      description: "Can view their schedule, assignments, exams, and personal progress.",
      permissions: [
        "view_schedule",
        "view_assignments",
        "view_exams",
        "view_fees",
        "view_progress",
        "receive_notifications"
      ],
      color: "sky"
    },
    {
      name: "Parent",
      id: "role_parent",
      description: "Guardian role for tracking a child's progress and financial dues.",
      permissions: [
        "view_students",
        "view_attendance",
        "view_progress",
        "view_fees",
        "receive_notifications"
      ],
      color: "amber"
    }
  ],
  
  departments: [
    {
      id: "dept_arabic",
      name: "Arabic Studies",
      color: "#1D4ED8",
      description: "Covers Quran, Hadith, and Arabic language studies.",
      rolesAllowed: ["role_teacher", "role_student"],
      icon: "📖"
    },
    {
      id: "dept_science",
      name: "Science & Modern Studies",
      color: "#059669",
      description: "Mathematics, Science, and modern subjects.",
      rolesAllowed: ["role_teacher", "role_student"],
      icon: "🔬"
    },
    {
      id: "dept_hifz",
      name: "Hifz & Memorization",
      color: "#7C3AED",
      description: "Quran memorization and recitation studies.",
      rolesAllowed: ["role_teacher", "role_student"],
      icon: "📿"
    },
    {
      id: "dept_primary",
      name: "Primary Education",
      color: "#DC2626",
      description: "Basic education for young students.",
      rolesAllowed: ["role_teacher", "role_student"],
      icon: "🎒"
    }
  ],

  permissions: {
    // User Management
    "view_users": "View user accounts and information",
    "add_users": "Create new user accounts",
    "edit_users": "Modify existing user accounts",
    "delete_users": "Delete user accounts",
    "assign_roles": "Assign roles to users",
    
    // Academic Management
    "view_schedule": "View class schedules",
    "add_schedule": "Create new class schedules",
    "edit_schedule": "Modify existing class schedules",
    "delete_schedule": "Delete class schedules",
    "view_assignments": "View assignments and study materials",
    "add_assignments": "Create new assignments",
    "edit_assignments": "Modify existing assignments",
    "delete_assignments": "Delete assignments",
    "view_exams": "View exams and assessments",
    "add_exams": "Create new exams",
    "edit_exams": "Modify existing exams",
    "delete_exams": "Delete exams",
    "grade_exams": "Grade student exams and assignments",
    
    // Student Management
    "view_students": "View student information",
    "add_students": "Add new students",
    "edit_students": "Edit student information",
    "delete_students": "Delete student records",
    "view_attendance": "View attendance records",
    "mark_attendance": "Mark student attendance",
    "edit_attendance": "Edit attendance records",
    "view_progress": "View student progress",
    "update_progress": "Update student progress",
    
    // Teacher Management
    "view_teachers": "View teacher information",
    "add_teachers": "Add new teachers",
    "edit_teachers": "Edit teacher information",
    "delete_teachers": "Delete teacher records",
    "assign_subjects": "Assign subjects to teachers",
    "assign_classes": "Assign classes to teachers",
    
    // Guardian Management
    "view_guardians": "View guardian information",
    "add_guardians": "Add new guardians",
    "edit_guardians": "Edit guardian information",
    "delete_guardians": "Delete guardian records",
    "link_students": "Link students to guardians",
    
    // Finance Management
    "view_finances": "View financial records",
    "add_finances": "Add financial records",
    "edit_finances": "Edit financial records",
    "delete_finances": "Delete financial records",
    "view_fees": "View fee information",
    "manage_fees": "Manage fee collection",
    "view_donations": "View donation records",
    "manage_donations": "Manage donations",
    
    // Department Management
    "view_departments": "View department information",
    "add_departments": "Create new departments",
    "edit_departments": "Edit department information",
    "delete_departments": "Delete departments",
    "assign_roles_department": "Assign roles to departments",
    
    // Role & Permission Management
    "view_roles": "View role information",
    "add_roles": "Create new roles",
    "edit_roles": "Edit role information",
    "delete_roles": "Delete roles",
    "manage_permissions": "Manage role permissions",
    
    // Reports & Analytics
    "view_reports": "View system reports",
    "generate_reports": "Generate new reports",
    "export_reports": "Export reports",
    
    // Data Management
    "view_data": "View system data",
    "import_data": "Import data into system",
    "export_data": "Export data from system",
    "backup_data": "Create data backups",
    "restore_data": "Restore data from backups",
    
    // Messaging & Notifications
    "view_messages": "View messages",
    "send_messages": "Send messages",
    "send_notifications": "Send notifications",
    "receive_notifications": "Receive notifications",
    "manage_announcements": "Manage announcements",
    
    // System Administration
    "view_settings": "View system settings",
    "configure_settings": "Configure system settings",
    "view_logs": "View system logs",
    "manage_backups": "Manage system backups",
    "system_maintenance": "Perform system maintenance"
  },

  rules: {
    inheritance: {
      enabled: true,
      logic: "Bottom-Up Ready",
      example: "Teacher inherits Student permissions, Admin inherits Teacher & Student, etc."
    },
    superAdmin: {
      rootUser: "cluster_creator",
      allPermissions: true
    },
    customization: {
      allowRoleCreation: true,
      allowDepartmentCreation: true,
      separateDepartmentVsRole: true
    }
  }
};

// Helper function to get role by ID
export const getRoleById = (roleId) => {
  return RBAC_CONFIG.roles.find(role => role.id === roleId);
};

// Helper function to get department by ID
export const getDepartmentById = (deptId) => {
  return RBAC_CONFIG.departments.find(dept => dept.id === deptId);
};

// Helper function to get all permissions for a role (including inherited)
export const getAllPermissionsForRole = (roleId) => {
  const role = getRoleById(roleId);
  if (!role) return [];
  
  // SuperAdmin has all permissions
  if (role.isRootRole) {
    return Object.keys(RBAC_CONFIG.permissions);
  }
  
  let permissions = [...role.permissions];
  
  // Add inherited permissions
  if (role.inheritsFrom) {
    role.inheritsFrom.forEach(inheritedRoleId => {
      const inheritedPermissions = getAllPermissionsForRole(inheritedRoleId);
      permissions = [...permissions, ...inheritedPermissions];
    });
  }
  
  // Remove duplicates
  return [...new Set(permissions)];
};

// Helper function to check if user has permission
export const hasPermission = (userRoles, permission) => {
  if (!userRoles || userRoles.length === 0) return false;
  
  // Check if any role has the permission
  return userRoles.some(roleId => {
    const rolePermissions = getAllPermissionsForRole(roleId);
    return rolePermissions.includes(permission) || rolePermissions.includes("*");
  });
};

// Helper function to get user's effective roles (including inherited)
export const getEffectiveRoles = (userRoles) => {
  if (!userRoles || userRoles.length === 0) return [];
  
  let effectiveRoles = [...userRoles];
  
  userRoles.forEach(roleId => {
    const role = getRoleById(roleId);
    if (role && role.inheritsFrom) {
      effectiveRoles = [...effectiveRoles, ...role.inheritsFrom];
    }
  });
  
  return [...new Set(effectiveRoles)];
};
