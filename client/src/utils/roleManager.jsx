// Role Management System for Madrasa ERP

import { PERMISSIONS, ROLE_PERMISSIONS } from './permissions.jsx';

// Default role definitions with descriptions and hierarchy
export const ROLE_DEFINITIONS = {
  super_admin: {
    name: 'Super Admin',
    description: 'Cluster creator and ultimate controller with all permissions',
    level: 100,
    color: '#dc2626', // red
    icon: '👑',
    isSystem: true,
    canAssignRoles: ['admin', 'teacher', 'guardian', 'student'],
    permissions: ROLE_PERMISSIONS.super_admin
  },
  
  admin: {
    name: 'Admin',
    description: 'Madrasa admin with management control over staff, students, finances, and academics',
    level: 90,
    color: '#ea580c', // orange
    icon: '👨‍💼',
    isSystem: true,
    canAssignRoles: ['teacher', 'guardian', 'student'],
    permissions: ROLE_PERMISSIONS.admin
  },
  
  teacher: {
    name: 'Teacher',
    description: 'Teachers with access to their class, attendance, exams, and communication',
    level: 70,
    color: '#059669', // emerald
    icon: '👨‍🏫',
    isSystem: true,
    canAssignRoles: [],
    permissions: ROLE_PERMISSIONS.teacher
  },
  
  guardian: {
    name: 'Guardian',
    description: 'Parents/Guardians with read-only access to their child\'s academic, attendance, hifz, and finance records',
    level: 50,
    color: '#7c3aed', // violet
    icon: '👨‍👩‍👧‍👦',
    isSystem: true,
    canAssignRoles: [],
    permissions: ROLE_PERMISSIONS.guardian
  },
  
  student: {
    name: 'Student',
    description: 'Students with access to their timetable, results, attendance, and assignments',
    level: 30,
    color: '#2563eb', // blue
    icon: '🎓',
    isSystem: true,
    canAssignRoles: [],
    permissions: ROLE_PERMISSIONS.student
  }
};

// Custom role templates
export const CUSTOM_ROLE_TEMPLATES = {
  admission_manager: {
    name: 'Admission Manager',
    description: 'Manages student admissions and enrollment',
    permissions: [
      PERMISSIONS.STUDENT_VIEW,
      PERMISSIONS.STUDENT_CREATE,
      PERMISSIONS.STUDENT_EDIT,
      PERMISSIONS.STUDENT_ASSIGN_CLASS,
      PERMISSIONS.STUDENT_ASSIGN_HOSTEL,
      PERMISSIONS.GUARDIAN_VIEW,
      PERMISSIONS.GUARDIAN_CREATE,
      PERMISSIONS.GUARDIAN_EDIT,
      PERMISSIONS.GUARDIAN_LINK_CHILD,
      PERMISSIONS.FINANCE_VIEW,
      PERMISSIONS.REPORTS_VIEW,
      PERMISSIONS.REPORTS_GENERATE
    ]
  },
  
  finance_manager: {
    name: 'Finance Manager',
    description: 'Manages financial operations and fee collection',
    permissions: [
      PERMISSIONS.FINANCE_VIEW,
      PERMISSIONS.FINANCE_CREATE,
      PERMISSIONS.FINANCE_EDIT,
      PERMISSIONS.FEE_COLLECT,
      PERMISSIONS.DONATION_MANAGE,
      PERMISSIONS.STUDENT_VIEW,
      PERMISSIONS.REPORTS_VIEW,
      PERMISSIONS.REPORTS_GENERATE,
      PERMISSIONS.REPORTS_EXPORT
    ]
  },
  
  hostel_manager: {
    name: 'Hostel Manager',
    description: 'Manages hostel operations and room assignments',
    permissions: [
      PERMISSIONS.HOSTEL_VIEW,
      PERMISSIONS.HOSTEL_MANAGE,
      PERMISSIONS.ROOM_ASSIGN,
      PERMISSIONS.STUDENT_VIEW,
      PERMISSIONS.STUDENT_EDIT,
      PERMISSIONS.ATTENDANCE_VIEW,
      PERMISSIONS.REPORTS_VIEW
    ]
  },
  
  transport_manager: {
    name: 'Transport Manager',
    description: 'Manages transport operations and route assignments',
    permissions: [
      PERMISSIONS.TRANSPORT_VIEW,
      PERMISSIONS.TRANSPORT_MANAGE,
      PERMISSIONS.ROUTE_ASSIGN,
      PERMISSIONS.STUDENT_VIEW,
      PERMISSIONS.REPORTS_VIEW
    ]
  },
  
  librarian: {
    name: 'Librarian',
    description: 'Manages library resources and book circulation',
    permissions: [
      PERMISSIONS.LIBRARY_VIEW,
      PERMISSIONS.LIBRARY_MANAGE,
      PERMISSIONS.RESOURCE_UPLOAD,
      PERMISSIONS.STUDENT_VIEW,
      PERMISSIONS.REPORTS_VIEW
    ]
  },
  
  exam_coordinator: {
    name: 'Exam Coordinator',
    description: 'Manages exams and grading processes',
    permissions: [
      PERMISSIONS.EXAM_VIEW,
      PERMISSIONS.EXAM_CREATE,
      PERMISSIONS.EXAM_EDIT,
      PERMISSIONS.EXAM_DELETE,
      PERMISSIONS.GRADE_UPLOAD,
      PERMISSIONS.GRADE_VIEW,
      PERMISSIONS.STUDENT_VIEW,
      PERMISSIONS.REPORTS_VIEW,
      PERMISSIONS.REPORTS_GENERATE
    ]
  }
};

// Permission categories for role creation UI
export const PERMISSION_CATEGORIES = {
  'Student Management': [
    PERMISSIONS.STUDENT_VIEW,
    PERMISSIONS.STUDENT_CREATE,
    PERMISSIONS.STUDENT_EDIT,
    PERMISSIONS.STUDENT_DELETE,
    PERMISSIONS.STUDENT_ASSIGN_CLASS,
    PERMISSIONS.STUDENT_ASSIGN_HOSTEL
  ],
  
  'Teacher Management': [
    PERMISSIONS.TEACHER_VIEW,
    PERMISSIONS.TEACHER_CREATE,
    PERMISSIONS.TEACHER_EDIT,
    PERMISSIONS.TEACHER_DELETE,
    PERMISSIONS.TEACHER_ASSIGN_CLASS
  ],
  
  'Guardian Management': [
    PERMISSIONS.GUARDIAN_VIEW,
    PERMISSIONS.GUARDIAN_CREATE,
    PERMISSIONS.GUARDIAN_EDIT,
    PERMISSIONS.GUARDIAN_LINK_CHILD
  ],
  
  'Attendance': [
    PERMISSIONS.ATTENDANCE_VIEW,
    PERMISSIONS.ATTENDANCE_MARK,
    PERMISSIONS.ATTENDANCE_EDIT,
    PERMISSIONS.ATTENDANCE_BULK_MARK
  ],
  
  'Academic Progress': [
    PERMISSIONS.PROGRESS_VIEW,
    PERMISSIONS.PROGRESS_UPDATE,
    PERMISSIONS.PROGRESS_GRADE
  ],
  
  'Hifz Tracking': [
    PERMISSIONS.HIFZ_VIEW,
    PERMISSIONS.HIFZ_UPDATE,
    PERMISSIONS.HIFZ_VERIFY
  ],
  
  'Finance Management': [
    PERMISSIONS.FINANCE_VIEW,
    PERMISSIONS.FINANCE_CREATE,
    PERMISSIONS.FINANCE_EDIT,
    PERMISSIONS.FINANCE_DELETE,
    PERMISSIONS.FEE_COLLECT,
    PERMISSIONS.DONATION_MANAGE
  ],
  
  'Exam & Grading': [
    PERMISSIONS.EXAM_VIEW,
    PERMISSIONS.EXAM_CREATE,
    PERMISSIONS.EXAM_EDIT,
    PERMISSIONS.EXAM_DELETE,
    PERMISSIONS.GRADE_UPLOAD,
    PERMISSIONS.GRADE_VIEW
  ],
  
  'Reports & Analytics': [
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_GENERATE,
    PERMISSIONS.REPORTS_EXPORT
  ],
  
  'Messaging': [
    PERMISSIONS.MESSAGE_SEND,
    PERMISSIONS.MESSAGE_VIEW,
    PERMISSIONS.ANNOUNCEMENT_CREATE
  ],
  
  'Library & Resources': [
    PERMISSIONS.LIBRARY_VIEW,
    PERMISSIONS.LIBRARY_MANAGE,
    PERMISSIONS.RESOURCE_UPLOAD
  ],
  
  'Transport': [
    PERMISSIONS.TRANSPORT_VIEW,
    PERMISSIONS.TRANSPORT_MANAGE,
    PERMISSIONS.ROUTE_ASSIGN
  ],
  
  'Hostel Management': [
    PERMISSIONS.HOSTEL_VIEW,
    PERMISSIONS.HOSTEL_MANAGE,
    PERMISSIONS.ROOM_ASSIGN
  ],
  
  'User & Role Management': [
    PERMISSIONS.USER_VIEW,
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_EDIT,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.ROLE_ASSIGN,
    PERMISSIONS.ROLE_CREATE,
    PERMISSIONS.ROLE_EDIT
  ],
  
  'Data Management': [
    PERMISSIONS.DATA_IMPORT,
    PERMISSIONS.DATA_EXPORT,
    PERMISSIONS.DATA_MANAGE
  ],
  
  'System Administration': [
    PERMISSIONS.SYSTEM_CONFIG,
    PERMISSIONS.SYSTEM_BACKUP,
    PERMISSIONS.SYSTEM_LOGS
  ]
};

// Role Manager Class
export class RoleManager {
  static getRoleDefinition(roleKey) {
    return ROLE_DEFINITIONS[roleKey] || null;
  }
  
  static getAllRoles() {
    return Object.keys(ROLE_DEFINITIONS);
  }
  
  static getSystemRoles() {
    return Object.keys(ROLE_DEFINITIONS).filter(role => ROLE_DEFINITIONS[role].isSystem);
  }
  
  static getCustomRoles() {
    return Object.keys(ROLE_DEFINITIONS).filter(role => !ROLE_DEFINITIONS[role].isSystem);
  }
  
  static canAssignRole(assignerRole, targetRole) {
    const assignerDef = this.getRoleDefinition(assignerRole);
    if (!assignerDef) return false;
    
    return assignerDef.canAssignRoles.includes(targetRole);
  }
  
  static getAssignableRoles(userRole) {
    const roleDef = this.getRoleDefinition(userRole);
    if (!roleDef) return [];
    
    return roleDef.canAssignRoles;
  }
  
  static getRoleLevel(roleKey) {
    const roleDef = this.getRoleDefinition(roleKey);
    return roleDef ? roleDef.level : 0;
  }
  
  static isHigherRole(role1, role2) {
    return this.getRoleLevel(role1) > this.getRoleLevel(role2);
  }
  
  static createCustomRole(roleKey, roleData) {
    if (ROLE_DEFINITIONS[roleKey]) {
      throw new Error(`Role ${roleKey} already exists`);
    }
    
    ROLE_DEFINITIONS[roleKey] = {
      ...roleData,
      isSystem: false,
      level: 60 // Default level for custom roles
    };
    
    return roleData;
  }
  
  static updateCustomRole(roleKey, roleData) {
    if (!ROLE_DEFINITIONS[roleKey] || ROLE_DEFINITIONS[roleKey].isSystem) {
      throw new Error(`Cannot update system role ${roleKey}`);
    }
    
    ROLE_DEFINITIONS[roleKey] = {
      ...ROLE_DEFINITIONS[roleKey],
      ...roleData
    };
    
    return ROLE_DEFINITIONS[roleKey];
  }
  
  static deleteCustomRole(roleKey) {
    if (!ROLE_DEFINITIONS[roleKey] || ROLE_DEFINITIONS[roleKey].isSystem) {
      throw new Error(`Cannot delete system role ${roleKey}`);
    }
    
    delete ROLE_DEFINITIONS[roleKey];
    return true;
  }
  
  static getRoleHierarchy() {
    return Object.entries(ROLE_DEFINITIONS)
      .sort(([,a], [,b]) => b.level - a.level)
      .map(([key, def]) => ({
        key,
        ...def
      }));
  }
  
  static getPermissionDescription(permission) {
    const descriptions = {
      [PERMISSIONS.STUDENT_VIEW]: 'View student records',
      [PERMISSIONS.STUDENT_CREATE]: 'Create new student records',
      [PERMISSIONS.STUDENT_EDIT]: 'Edit student records',
      [PERMISSIONS.STUDENT_DELETE]: 'Delete student records',
      [PERMISSIONS.STUDENT_ASSIGN_CLASS]: 'Assign students to classes',
      [PERMISSIONS.STUDENT_ASSIGN_HOSTEL]: 'Assign students to hostel rooms',
      
      [PERMISSIONS.TEACHER_VIEW]: 'View teacher records',
      [PERMISSIONS.TEACHER_CREATE]: 'Create new teacher records',
      [PERMISSIONS.TEACHER_EDIT]: 'Edit teacher records',
      [PERMISSIONS.TEACHER_DELETE]: 'Delete teacher records',
      [PERMISSIONS.TEACHER_ASSIGN_CLASS]: 'Assign teachers to classes',
      
      [PERMISSIONS.ATTENDANCE_VIEW]: 'View attendance records',
      [PERMISSIONS.ATTENDANCE_MARK]: 'Mark individual attendance',
      [PERMISSIONS.ATTENDANCE_EDIT]: 'Edit attendance records',
      [PERMISSIONS.ATTENDANCE_BULK_MARK]: 'Mark bulk attendance',
      
      [PERMISSIONS.FINANCE_VIEW]: 'View financial records',
      [PERMISSIONS.FINANCE_CREATE]: 'Create financial records',
      [PERMISSIONS.FINANCE_EDIT]: 'Edit financial records',
      [PERMISSIONS.FINANCE_DELETE]: 'Delete financial records',
      [PERMISSIONS.FEE_COLLECT]: 'Collect fees',
      [PERMISSIONS.DONATION_MANAGE]: 'Manage donations',
      
      [PERMISSIONS.REPORTS_VIEW]: 'View reports',
      [PERMISSIONS.REPORTS_GENERATE]: 'Generate reports',
      [PERMISSIONS.REPORTS_EXPORT]: 'Export reports',
      
      [PERMISSIONS.MESSAGE_SEND]: 'Send messages',
      [PERMISSIONS.MESSAGE_VIEW]: 'View messages',
      [PERMISSIONS.ANNOUNCEMENT_CREATE]: 'Create announcements',
      
      [PERMISSIONS.DATA_IMPORT]: 'Import data',
      [PERMISSIONS.DATA_EXPORT]: 'Export data',
      [PERMISSIONS.DATA_MANAGE]: 'Manage data'
    };
    
    return descriptions[permission] || permission;
  }
}

// React hook for role management
export const useRoleManager = (userRole) => {
  const canAssignRole = (targetRole) => {
    return RoleManager.canAssignRole(userRole, targetRole);
  };
  
  const getAssignableRoles = () => {
    return RoleManager.getAssignableRoles(userRole);
  };
  
  const isHigherRole = (targetRole) => {
    return RoleManager.isHigherRole(userRole, targetRole);
  };
  
  const getRoleDefinition = (roleKey) => {
    return RoleManager.getRoleDefinition(roleKey);
  };
  
  return {
    canAssignRole,
    getAssignableRoles,
    isHigherRole,
    getRoleDefinition,
    userRole,
    userRoleDef: RoleManager.getRoleDefinition(userRole)
  };
};






