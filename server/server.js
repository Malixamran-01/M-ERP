import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data storage (in-memory for now, can be replaced with file-based storage)
let data = {
  students: [],
  teachers: [],
  attendance: [],
  feePayments: [],
  donations: [],
  hifzProgress: [],
  schedules: [],
  assignments: [],
  users: [],
  // RBAC entities
  roles: [],
  permissions: [],
  departments: [],
  rolePermissions: [],
  userRoles: [],
  // Student dashboard entities
  hostels: [],
  sections: []
};

// Load entity schemas and generate sample data
const loadInitialData = () => {
  try {
    const entitiesPath = path.join(__dirname, 'Entities');
    const entities = ['Student', 'Teacher', 'Attendance', 'FeePayment', 'Donation', 'HifzProgress', 'Schedule', 'Assignment', 'Role', 'Permission', 'Department', 'RolePermission', 'UserRole', 'Hostel', 'Section'];
    const schemas = {};
    
    // Load all entity schemas
    entities.forEach(entity => {
      const filePath = path.join(entitiesPath, `${entity}.json`);
      if (fs.existsSync(filePath)) {
        const schema = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        schemas[entity] = schema;
        console.log(`✅ Loaded ${entity} schema`);
      }
    });
    
    // Generate comprehensive sample data based on schemas
    generateSampleData(schemas);
    
    console.log('🎉 All entity data loaded successfully');
    console.log(`📊 Students: ${data.students.length}`);
    console.log(`👨‍🏫 Teachers: ${data.teachers.length}`);
    console.log(`📅 Attendance Records: ${data.attendance.length}`);
    console.log(`💰 Fee Payments: ${data.feePayments.length}`);
    console.log(`💝 Donations: ${data.donations.length}`);
    console.log(`📖 Hifz Progress: ${data.hifzProgress.length}`);
    console.log(`📅 Schedules: ${data.schedules.length}`);
    console.log(`📝 Assignments: ${data.assignments.length}`);
    console.log(`👥 Roles: ${data.roles.length}`);
    console.log(`🔐 Permissions: ${data.permissions.length}`);
    console.log(`🏢 Departments: ${data.departments.length}`);
    console.log(`🔗 Role-Permission Mappings: ${data.rolePermissions.length}`);
    console.log(`👤 User-Role Mappings: ${data.userRoles.length}`);
  } catch (error) {
    console.error('❌ Error loading initial data:', error);
  }
};

// Generate RBAC sample data
const generateRBACData = () => {
  const now = new Date().toISOString();
  
  // Generate Permissions
  data.permissions = [
    // User Management
    { id: 'view_users', name: 'View Users', description: 'View user accounts and information', category: 'User Management', action: 'read', resource: 'users', created_date: now, updated_date: now, status: 'active' },
    { id: 'add_users', name: 'Add Users', description: 'Create new user accounts', category: 'User Management', action: 'create', resource: 'users', created_date: now, updated_date: now, status: 'active' },
    { id: 'edit_users', name: 'Edit Users', description: 'Modify existing user accounts', category: 'User Management', action: 'update', resource: 'users', created_date: now, updated_date: now, status: 'active' },
    { id: 'delete_users', name: 'Delete Users', description: 'Delete user accounts', category: 'User Management', action: 'delete', resource: 'users', created_date: now, updated_date: now, status: 'active' },
    { id: 'assign_roles', name: 'Assign Roles', description: 'Assign roles to users', category: 'User Management', action: 'assign', resource: 'roles', created_date: now, updated_date: now, status: 'active' },
    
    // Academic Management
    { id: 'view_schedule', name: 'View Schedule', description: 'View class schedules', category: 'Academic Management', action: 'read', resource: 'schedules', created_date: now, updated_date: now, status: 'active' },
    { id: 'add_schedule', name: 'Add Schedule', description: 'Create new class schedules', category: 'Academic Management', action: 'create', resource: 'schedules', created_date: now, updated_date: now, status: 'active' },
    { id: 'edit_schedule', name: 'Edit Schedule', description: 'Modify existing class schedules', category: 'Academic Management', action: 'update', resource: 'schedules', created_date: now, updated_date: now, status: 'active' },
    { id: 'delete_schedule', name: 'Delete Schedule', description: 'Delete class schedules', category: 'Academic Management', action: 'delete', resource: 'schedules', created_date: now, updated_date: now, status: 'active' },
    { id: 'view_assignments', name: 'View Assignments', description: 'View assignments and study materials', category: 'Academic Management', action: 'read', resource: 'assignments', created_date: now, updated_date: now, status: 'active' },
    { id: 'add_assignments', name: 'Add Assignments', description: 'Create new assignments', category: 'Academic Management', action: 'create', resource: 'assignments', created_date: now, updated_date: now, status: 'active' },
    { id: 'edit_assignments', name: 'Edit Assignments', description: 'Modify existing assignments', category: 'Academic Management', action: 'update', resource: 'assignments', created_date: now, updated_date: now, status: 'active' },
    { id: 'delete_assignments', name: 'Delete Assignments', description: 'Delete assignments', category: 'Academic Management', action: 'delete', resource: 'assignments', created_date: now, updated_date: now, status: 'active' },
    { id: 'view_exams', name: 'View Exams', description: 'View exams and assessments', category: 'Academic Management', action: 'read', resource: 'exams', created_date: now, updated_date: now, status: 'active' },
    { id: 'add_exams', name: 'Add Exams', description: 'Create new exams', category: 'Academic Management', action: 'create', resource: 'exams', created_date: now, updated_date: now, status: 'active' },
    { id: 'edit_exams', name: 'Edit Exams', description: 'Modify existing exams', category: 'Academic Management', action: 'update', resource: 'exams', created_date: now, updated_date: now, status: 'active' },
    { id: 'delete_exams', name: 'Delete Exams', description: 'Delete exams', category: 'Academic Management', action: 'delete', resource: 'exams', created_date: now, updated_date: now, status: 'active' },
    { id: 'grade_exams', name: 'Grade Exams', description: 'Grade student exams and assignments', category: 'Academic Management', action: 'manage', resource: 'exams', created_date: now, updated_date: now, status: 'active' },
    
    // Student Management
    { id: 'view_students', name: 'View Students', description: 'View student information', category: 'Student Management', action: 'read', resource: 'students', created_date: now, updated_date: now, status: 'active' },
    { id: 'add_students', name: 'Add Students', description: 'Add new students', category: 'Student Management', action: 'create', resource: 'students', created_date: now, updated_date: now, status: 'active' },
    { id: 'edit_students', name: 'Edit Students', description: 'Edit student information', category: 'Student Management', action: 'update', resource: 'students', created_date: now, updated_date: now, status: 'active' },
    { id: 'delete_students', name: 'Delete Students', description: 'Delete student records', category: 'Student Management', action: 'delete', resource: 'students', created_date: now, updated_date: now, status: 'active' },
    { id: 'view_attendance', name: 'View Attendance', description: 'View attendance records', category: 'Student Management', action: 'read', resource: 'attendance', created_date: now, updated_date: now, status: 'active' },
    { id: 'mark_attendance', name: 'Mark Attendance', description: 'Mark student attendance', category: 'Student Management', action: 'manage', resource: 'attendance', created_date: now, updated_date: now, status: 'active' },
    { id: 'edit_attendance', name: 'Edit Attendance', description: 'Edit attendance records', category: 'Student Management', action: 'update', resource: 'attendance', created_date: now, updated_date: now, status: 'active' },
    { id: 'view_progress', name: 'View Progress', description: 'View student progress', category: 'Student Management', action: 'read', resource: 'progress', created_date: now, updated_date: now, status: 'active' },
    { id: 'update_progress', name: 'Update Progress', description: 'Update student progress', category: 'Student Management', action: 'update', resource: 'progress', created_date: now, updated_date: now, status: 'active' },
    
    // Teacher Management
    { id: 'view_teachers', name: 'View Teachers', description: 'View teacher information', category: 'Teacher Management', action: 'read', resource: 'teachers', created_date: now, updated_date: now, status: 'active' },
    { id: 'add_teachers', name: 'Add Teachers', description: 'Add new teachers', category: 'Teacher Management', action: 'create', resource: 'teachers', created_date: now, updated_date: now, status: 'active' },
    { id: 'edit_teachers', name: 'Edit Teachers', description: 'Edit teacher information', category: 'Teacher Management', action: 'update', resource: 'teachers', created_date: now, updated_date: now, status: 'active' },
    { id: 'delete_teachers', name: 'Delete Teachers', description: 'Delete teacher records', category: 'Teacher Management', action: 'delete', resource: 'teachers', created_date: now, updated_date: now, status: 'active' },
    { id: 'assign_subjects', name: 'Assign Subjects', description: 'Assign subjects to teachers', category: 'Teacher Management', action: 'assign', resource: 'subjects', created_date: now, updated_date: now, status: 'active' },
    { id: 'assign_classes', name: 'Assign Classes', description: 'Assign classes to teachers', category: 'Teacher Management', action: 'assign', resource: 'classes', created_date: now, updated_date: now, status: 'active' },
    
    // Finance Management
    { id: 'view_finances', name: 'View Finances', description: 'View financial records', category: 'Finance Management', action: 'read', resource: 'finances', created_date: now, updated_date: now, status: 'active' },
    { id: 'add_finances', name: 'Add Financial Records', description: 'Add financial records', category: 'Finance Management', action: 'create', resource: 'finances', created_date: now, updated_date: now, status: 'active' },
    { id: 'edit_finances', name: 'Edit Financial Records', description: 'Edit financial records', category: 'Finance Management', action: 'update', resource: 'finances', created_date: now, updated_date: now, status: 'active' },
    { id: 'delete_finances', name: 'Delete Financial Records', description: 'Delete financial records', category: 'Finance Management', action: 'delete', resource: 'finances', created_date: now, updated_date: now, status: 'active' },
    { id: 'view_fees', name: 'View Fees', description: 'View fee information', category: 'Finance Management', action: 'read', resource: 'fees', created_date: now, updated_date: now, status: 'active' },
    { id: 'manage_fees', name: 'Manage Fees', description: 'Manage fee collection', category: 'Finance Management', action: 'manage', resource: 'fees', created_date: now, updated_date: now, status: 'active' },
    { id: 'view_donations', name: 'View Donations', description: 'View donation records', category: 'Finance Management', action: 'read', resource: 'donations', created_date: now, updated_date: now, status: 'active' },
    { id: 'manage_donations', name: 'Manage Donations', description: 'Manage donations', category: 'Finance Management', action: 'manage', resource: 'donations', created_date: now, updated_date: now, status: 'active' },
    
    // Department Management
    { id: 'view_departments', name: 'View Departments', description: 'View department information', category: 'Department Management', action: 'read', resource: 'departments', created_date: now, updated_date: now, status: 'active' },
    { id: 'add_departments', name: 'Add Departments', description: 'Create new departments', category: 'Department Management', action: 'create', resource: 'departments', created_date: now, updated_date: now, status: 'active' },
    { id: 'edit_departments', name: 'Edit Departments', description: 'Edit department information', category: 'Department Management', action: 'update', resource: 'departments', created_date: now, updated_date: now, status: 'active' },
    { id: 'delete_departments', name: 'Delete Departments', description: 'Delete departments', category: 'Department Management', action: 'delete', resource: 'departments', created_date: now, updated_date: now, status: 'active' },
    { id: 'assign_roles_department', name: 'Assign Roles to Departments', description: 'Assign roles to departments', category: 'Department Management', action: 'assign', resource: 'departments', created_date: now, updated_date: now, status: 'active' },
    
    // Role & Permission Management
    { id: 'view_roles', name: 'View Roles', description: 'View role information', category: 'Role & Permission Management', action: 'read', resource: 'roles', created_date: now, updated_date: now, status: 'active' },
    { id: 'add_roles', name: 'Add Roles', description: 'Create new roles', category: 'Role & Permission Management', action: 'create', resource: 'roles', created_date: now, updated_date: now, status: 'active' },
    { id: 'edit_roles', name: 'Edit Roles', description: 'Edit role information', category: 'Role & Permission Management', action: 'update', resource: 'roles', created_date: now, updated_date: now, status: 'active' },
    { id: 'delete_roles', name: 'Delete Roles', description: 'Delete roles', category: 'Role & Permission Management', action: 'delete', resource: 'roles', created_date: now, updated_date: now, status: 'active' },
    { id: 'manage_permissions', name: 'Manage Permissions', description: 'Manage role permissions', category: 'Role & Permission Management', action: 'manage', resource: 'permissions', created_date: now, updated_date: now, status: 'active' },
    
    // Reports & Analytics
    { id: 'view_reports', name: 'View Reports', description: 'View system reports', category: 'Reports & Analytics', action: 'read', resource: 'reports', created_date: now, updated_date: now, status: 'active' },
    { id: 'generate_reports', name: 'Generate Reports', description: 'Generate new reports', category: 'Reports & Analytics', action: 'create', resource: 'reports', created_date: now, updated_date: now, status: 'active' },
    { id: 'export_reports', name: 'Export Reports', description: 'Export reports', category: 'Reports & Analytics', action: 'manage', resource: 'reports', created_date: now, updated_date: now, status: 'active' },
    
    // Data Management
    { id: 'view_data', name: 'View Data', description: 'View system data', category: 'Data Management', action: 'read', resource: 'data', created_date: now, updated_date: now, status: 'active' },
    { id: 'import_data', name: 'Import Data', description: 'Import data into system', category: 'Data Management', action: 'create', resource: 'data', created_date: now, updated_date: now, status: 'active' },
    { id: 'export_data', name: 'Export Data', description: 'Export data from system', category: 'Data Management', action: 'manage', resource: 'data', created_date: now, updated_date: now, status: 'active' },
    { id: 'backup_data', name: 'Backup Data', description: 'Create data backups', category: 'Data Management', action: 'create', resource: 'backups', created_date: now, updated_date: now, status: 'active' },
    { id: 'restore_data', name: 'Restore Data', description: 'Restore data from backups', category: 'Data Management', action: 'manage', resource: 'backups', created_date: now, updated_date: now, status: 'active' },
    
    // Messaging & Notifications
    { id: 'view_messages', name: 'View Messages', description: 'View messages', category: 'Messaging & Notifications', action: 'read', resource: 'messages', created_date: now, updated_date: now, status: 'active' },
    { id: 'send_messages', name: 'Send Messages', description: 'Send messages', category: 'Messaging & Notifications', action: 'create', resource: 'messages', created_date: now, updated_date: now, status: 'active' },
    { id: 'send_notifications', name: 'Send Notifications', description: 'Send notifications', category: 'Messaging & Notifications', action: 'create', resource: 'notifications', created_date: now, updated_date: now, status: 'active' },
    { id: 'receive_notifications', name: 'Receive Notifications', description: 'Receive notifications', category: 'Messaging & Notifications', action: 'read', resource: 'notifications', created_date: now, updated_date: now, status: 'active' },
    { id: 'manage_announcements', name: 'Manage Announcements', description: 'Manage announcements', category: 'Messaging & Notifications', action: 'manage', resource: 'announcements', created_date: now, updated_date: now, status: 'active' },
    
    // System Administration
    { id: 'view_settings', name: 'View System Settings', description: 'View system settings', category: 'System Administration', action: 'read', resource: 'settings', created_date: now, updated_date: now, status: 'active' },
    { id: 'configure_settings', name: 'Configure System Settings', description: 'Configure system settings', category: 'System Administration', action: 'manage', resource: 'settings', created_date: now, updated_date: now, status: 'active' },
    { id: 'view_logs', name: 'View System Logs', description: 'View system logs', category: 'System Administration', action: 'read', resource: 'logs', created_date: now, updated_date: now, status: 'active' },
    { id: 'manage_backups', name: 'Manage Backups', description: 'Manage system backups', category: 'System Administration', action: 'manage', resource: 'backups', created_date: now, updated_date: now, status: 'active' },
    { id: 'system_maintenance', name: 'System Maintenance', description: 'Perform system maintenance', category: 'System Administration', action: 'manage', resource: 'system', created_date: now, updated_date: now, status: 'active' }
  ];

  // Generate Roles
  data.roles = [
    {
      id: 'role_superadmin',
      name: 'SuperAdmin',
      description: 'Full control over all clusters, organizations, departments, and users.',
      color: 'rose',
      isRootRole: true,
      inheritsFrom: [],
      departments: [],
      created_date: now,
      updated_date: now,
      status: 'active'
    },
    {
      id: 'role_admin',
      name: 'Admin',
      description: 'Admin of a cluster or organization. Manages staff, roles, and settings.',
      color: 'slate',
      isRootRole: false,
      inheritsFrom: ['role_teacher', 'role_student', 'role_parent'],
      departments: [],
      created_date: now,
      updated_date: now,
      status: 'active'
    },
    {
      id: 'role_teacher',
      name: 'Teacher',
      description: 'Handles academic content, student performance, and class scheduling.',
      color: 'emerald',
      isRootRole: false,
      inheritsFrom: ['role_student'],
      departments: [],
      created_date: now,
      updated_date: now,
      status: 'active'
    },
    {
      id: 'role_student',
      name: 'Student',
      description: 'Can view their schedule, assignments, exams, and personal progress.',
      color: 'sky',
      isRootRole: false,
      inheritsFrom: [],
      departments: [],
      created_date: now,
      updated_date: now,
      status: 'active'
    },
    {
      id: 'role_parent',
      name: 'Parent',
      description: 'Guardian role for tracking a child\'s progress and financial dues.',
      color: 'amber',
      isRootRole: false,
      inheritsFrom: [],
      departments: [],
      created_date: now,
      updated_date: now,
      status: 'active'
    }
  ];

  // Generate Departments
  data.departments = [
    {
      id: 'dept_arabic_studies',
      name: 'Arabic Studies',
      description: 'Department for Arabic language and literature studies',
      icon: '📚',
      color: '#3B82F6',
      parent_department_id: null,
      head_user_id: null,
      budget: 50000,
      created_date: now,
      updated_date: now,
      status: 'active'
    },
    {
      id: 'dept_science_modern',
      name: 'Science & Modern Studies',
      description: 'Department for science and modern education subjects',
      icon: '🔬',
      color: '#10B981',
      parent_department_id: null,
      head_user_id: null,
      budget: 45000,
      created_date: now,
      updated_date: now,
      status: 'active'
    },
    {
      id: 'dept_hifz_memorization',
      name: 'Hifz & Memorization',
      description: 'Department for Quran memorization and Hifz studies',
      icon: '📖',
      color: '#8B5CF6',
      parent_department_id: null,
      head_user_id: null,
      budget: 60000,
      created_date: now,
      updated_date: now,
      status: 'active'
    },
    {
      id: 'dept_primary_education',
      name: 'Primary Education',
      description: 'Department for primary level education',
      icon: '🎒',
      color: '#F59E0B',
      parent_department_id: null,
      head_user_id: null,
      budget: 40000,
      created_date: now,
      updated_date: now,
      status: 'active'
    }
  ];

  // Generate Role-Permission mappings
  const rolePermissionMappings = {
    'role_superadmin': data.permissions.map(p => p.id), // SuperAdmin has all permissions
    'role_admin': [
      'view_users', 'add_users', 'edit_users', 'delete_users', 'assign_roles',
      'view_roles', 'add_roles', 'edit_roles', 'delete_roles', 'manage_permissions',
      'view_departments', 'add_departments', 'edit_departments', 'delete_departments', 'assign_roles_department',
      'view_finances', 'add_finances', 'edit_finances', 'delete_finances', 'view_fees', 'manage_fees', 'view_donations', 'manage_donations',
      'view_reports', 'generate_reports', 'export_reports',
      'view_settings', 'configure_settings', 'view_logs', 'manage_backups', 'system_maintenance'
    ],
    'role_teacher': [
      'view_schedule', 'add_schedule', 'edit_schedule', 'delete_schedule',
      'view_assignments', 'add_assignments', 'edit_assignments', 'delete_assignments',
      'view_exams', 'add_exams', 'edit_exams', 'delete_exams', 'grade_exams',
      'view_students', 'view_attendance', 'mark_attendance', 'edit_attendance',
      'view_progress', 'update_progress',
      'send_messages', 'send_notifications', 'manage_announcements'
    ],
    'role_student': [
      'view_schedule', 'view_assignments', 'view_exams', 'view_fees', 'view_progress', 'receive_notifications'
    ],
    'role_parent': [
      'view_students', 'view_attendance', 'view_progress', 'view_fees', 'receive_notifications'
    ]
  };

  data.rolePermissions = [];
  Object.entries(rolePermissionMappings).forEach(([roleId, permissionIds]) => {
    permissionIds.forEach(permissionId => {
      data.rolePermissions.push({
        id: uuidv4(),
        role_id: roleId,
        permission_id: permissionId,
        granted_date: now,
        granted_by: null,
        is_inherited: false,
        inherited_from_role_id: null,
        status: 'active'
      });
    });
  });

  // Generate User-Role mappings
  data.userRoles = [
    {
      id: uuidv4(),
      user_id: data.users[0]?.id || 'admin-user-id',
      role_id: 'role_superadmin',
      assigned_date: now,
      assigned_by: null,
      expires_at: null,
      is_primary: true,
      status: 'active'
    },
    {
      id: uuidv4(),
      user_id: data.users[1]?.id || 'teacher-user-id',
      role_id: 'role_teacher',
      assigned_date: now,
      assigned_by: null,
      expires_at: null,
      is_primary: true,
      status: 'active'
    },
    {
      id: uuidv4(),
      user_id: data.users[2]?.id || 'teacher2-user-id',
      role_id: 'role_teacher',
      assigned_date: now,
      assigned_by: null,
      expires_at: null,
      is_primary: true,
      status: 'active'
    }
  ];
};

// Generate comprehensive sample data
const generateSampleData = (schemas) => {
  // Generate Students
  data.students = [
    {
      id: uuidv4(),
      student_id: "STD2024001",
      first_name: "Ahmed",
      last_name: "Hassan",
      date_of_birth: "2010-05-15",
      gender: "male",
      class: "Grade 5",
      department: "hifz",
      admission_date: "2024-01-15",
      student_type: "boarding",
      guardian_name: "Mohammed Hassan",
      guardian_phone: "+1234567890",
      guardian_email: "m.hassan@email.com",
      address: "123 Main Street, City",
      fee_status: "paid",
      hostel_room: "Room 101",
      status: "active",
      created_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024002",
      first_name: "Fatima",
      last_name: "Ali",
      date_of_birth: "2011-08-20",
      gender: "female",
      class: "Grade 4",
      department: "nazira",
      admission_date: "2024-01-20",
      student_type: "day_scholar",
      guardian_name: "Ali Mohammed",
      guardian_phone: "+1234567891",
      guardian_email: "a.mohammed@email.com",
      address: "456 Oak Avenue, City",
      fee_status: "pending",
      status: "active",
      created_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024003",
      first_name: "Omar",
      last_name: "Khan",
      date_of_birth: "2009-12-10",
      gender: "male",
      class: "Grade 6",
      department: "alim",
      admission_date: "2023-09-01",
      student_type: "boarding",
      guardian_name: "Khan Mohammed",
      guardian_phone: "+1234567892",
      guardian_email: "k.mohammed@email.com",
      address: "789 Pine Street, City",
      fee_status: "paid",
      hostel_room: "Room 102",
      status: "active",
      created_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024004",
      first_name: "Aisha",
      last_name: "Ahmed",
      date_of_birth: "2012-03-25",
      gender: "female",
      class: "Grade 3",
      department: "primary",
      admission_date: "2024-02-01",
      student_type: "day_scholar",
      guardian_name: "Ahmed Ibrahim",
      guardian_phone: "+1234567893",
      guardian_email: "a.ibrahim@email.com",
      address: "321 Elm Street, City",
      fee_status: "partial",
      status: "active",
      created_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024005",
      first_name: "Yusuf",
      last_name: "Malik",
      date_of_birth: "2010-11-08",
      gender: "male",
      class: "Grade 5",
      department: "hifz",
      admission_date: "2024-01-10",
      student_type: "boarding",
      guardian_name: "Malik Hassan",
      guardian_phone: "+1234567894",
      guardian_email: "m.hassan2@email.com",
      address: "654 Maple Avenue, City",
      fee_status: "paid",
      hostel_room: "Room 103",
      status: "active",
      created_date: new Date().toISOString()
    }
  ];

  // Generate Teachers
  data.teachers = [
    {
      id: uuidv4(),
      employee_id: "TCH2024001",
      first_name: "Sheikh",
      last_name: "Abdullah",
      phone: "+1234567895",
      email: "sheikh.abdullah@madrasa.edu",
      position: "head_teacher",
      subjects: ["Quran", "Arabic", "Islamic Studies"],
      classes_assigned: ["Grade 5", "Grade 6"],
      hire_date: "2020-01-15",
      salary: 5000,
      qualifications: "Alim Degree, Hafiz",
      status: "active"
    },
    {
      id: uuidv4(),
      employee_id: "TCH2024002",
      first_name: "Ustadha",
      last_name: "Fatima",
      phone: "+1234567896",
      email: "ustadha.fatima@madrasa.edu",
      position: "teacher",
      subjects: ["Quran", "Arabic"],
      classes_assigned: ["Grade 3", "Grade 4"],
      hire_date: "2021-03-01",
      salary: 4000,
      qualifications: "Alimah Degree, Hafiza",
      status: "active"
    },
    {
      id: uuidv4(),
      employee_id: "TCH2024003",
      first_name: "Maulana",
      last_name: "Ibrahim",
      phone: "+1234567897",
      email: "maulana.ibrahim@madrasa.edu",
      position: "senior_teacher",
      subjects: ["Islamic Studies", "Fiqh", "Hadith"],
      classes_assigned: ["Grade 6", "Alim Course"],
      hire_date: "2019-08-15",
      salary: 4500,
      qualifications: "Alim Degree, Specialization in Fiqh",
      status: "active"
    }
  ];

  // Generate Fee Payments
  data.feePayments = [
    {
      id: uuidv4(),
      student_id: "STD2024001",
      student_name: "Ahmed Hassan",
      amount: 500,
      fee_type: "tuition",
      payment_method: "cash",
      payment_date: "2024-01-15",
      month_year: "January 2024",
      receipt_number: "RCP001",
      notes: "Monthly tuition fee",
      status: "completed"
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      student_name: "Ahmed Hassan",
      amount: 200,
      fee_type: "hostel",
      payment_method: "bank_transfer",
      payment_date: "2024-01-15",
      month_year: "January 2024",
      receipt_number: "RCP002",
      notes: "Hostel accommodation fee",
      status: "completed"
    },
    {
      id: uuidv4(),
      student_id: "STD2024002",
      student_name: "Fatima Ali",
      amount: 300,
      fee_type: "tuition",
      payment_method: "cash",
      payment_date: "2024-01-20",
      month_year: "January 2024",
      receipt_number: "RCP003",
      notes: "Monthly tuition fee",
      status: "completed"
    },
    {
      id: uuidv4(),
      student_id: "STD2024003",
      student_name: "Omar Khan",
      amount: 600,
      fee_type: "tuition",
      payment_method: "online",
      payment_date: "2024-01-10",
      month_year: "January 2024",
      receipt_number: "RCP004",
      notes: "Monthly tuition fee",
      status: "completed"
    },
    {
      id: uuidv4(),
      student_id: "STD2024004",
      student_name: "Aisha Ahmed",
      amount: 250,
      fee_type: "tuition",
      payment_method: "cheque",
      payment_date: "2024-02-01",
      month_year: "February 2024",
      receipt_number: "RCP005",
      notes: "Monthly tuition fee",
      status: "completed"
    }
  ];

  // Generate Donations
  data.donations = [
    {
      id: uuidv4(),
      donor_name: "Anonymous",
      amount: 1000,
      donation_type: "sadaqah",
      payment_method: "bank_transfer",
      donation_date: "2024-01-10",
      receipt_number: "DON001",
      purpose: "General fund",
      is_recurring: false,
      notes: "Monthly donation"
    },
    {
      id: uuidv4(),
      donor_name: "Mohammed Ali",
      donor_phone: "+1234567898",
      donor_email: "m.ali@email.com",
      amount: 5000,
      donation_type: "zakat",
      payment_method: "bank_transfer",
      donation_date: "2024-01-15",
      receipt_number: "DON002",
      purpose: "Student scholarship fund",
      is_recurring: true,
      notes: "Annual zakat for student support"
    },
    {
      id: uuidv4(),
      donor_name: "Fatima Khan",
      donor_phone: "+1234567899",
      donor_email: "f.khan@email.com",
      amount: 2000,
      donation_type: "construction",
      payment_method: "cash",
      donation_date: "2024-01-20",
      receipt_number: "DON003",
      purpose: "New classroom construction",
      is_recurring: false,
      notes: "One-time donation for infrastructure"
    },
    {
      id: uuidv4(),
      donor_name: "Abdul Rahman",
      donor_phone: "+1234567900",
      donor_email: "a.rahman@email.com",
      amount: 1500,
      donation_type: "iftar",
      payment_method: "online",
      donation_date: "2024-01-25",
      receipt_number: "DON004",
      purpose: "Ramadan iftar program",
      is_recurring: false,
      notes: "Support for iftar meals during Ramadan"
    }
  ];

  // Generate Attendance Records
  data.attendance = [
    {
      id: uuidv4(),
      student_id: "STD2024001",
      student_name: "Ahmed Hassan",
      class: "Grade 5",
      date: "2024-01-15",
      status: "present",
      marked_by: "Sheikh Abdullah",
      notes: "On time"
    },
    {
      id: uuidv4(),
      student_id: "STD2024002",
      student_name: "Fatima Ali",
      class: "Grade 4",
      date: "2024-01-15",
      status: "present",
      marked_by: "Ustadha Fatima",
      notes: "On time"
    },
    {
      id: uuidv4(),
      student_id: "STD2024003",
      student_name: "Omar Khan",
      class: "Grade 6",
      date: "2024-01-15",
      status: "late",
      marked_by: "Maulana Ibrahim",
      notes: "Arrived 15 minutes late"
    },
    {
      id: uuidv4(),
      student_id: "STD2024004",
      student_name: "Aisha Ahmed",
      class: "Grade 3",
      date: "2024-01-15",
      status: "absent",
      marked_by: "Ustadha Fatima",
      notes: "Sick leave"
    },
    {
      id: uuidv4(),
      student_id: "STD2024005",
      student_name: "Yusuf Malik",
      class: "Grade 5",
      date: "2024-01-15",
      status: "present",
      marked_by: "Sheikh Abdullah",
      notes: "On time"
    }
  ];

  // Generate Hifz Progress
  data.hifzProgress = [
    {
      id: uuidv4(),
      student_id: "STD2024001",
      student_name: "Ahmed Hassan",
      surah_name: "Al-Fatiha",
      ayah_from: 1,
      ayah_to: 7,
      memorization_date: "2024-01-10",
      revision_status: "excellent",
      teacher_feedback: "Perfect recitation with proper tajweed",
      total_pages_completed: 1,
      verified_by: "Sheikh Abdullah"
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      student_name: "Ahmed Hassan",
      surah_name: "Al-Baqarah",
      ayah_from: 1,
      ayah_to: 5,
      memorization_date: "2024-01-20",
      revision_status: "good",
      teacher_feedback: "Good progress, needs more practice on verse 3",
      total_pages_completed: 2,
      verified_by: "Sheikh Abdullah"
    },
    {
      id: uuidv4(),
      student_id: "STD2024005",
      student_name: "Yusuf Malik",
      surah_name: "Al-Fatiha",
      ayah_from: 1,
      ayah_to: 7,
      memorization_date: "2024-01-12",
      revision_status: "excellent",
      teacher_feedback: "Excellent memorization and recitation",
      total_pages_completed: 1,
      verified_by: "Sheikh Abdullah"
    },
    {
      id: uuidv4(),
      student_id: "STD2024005",
      student_name: "Yusuf Malik",
      surah_name: "Al-Baqarah",
      ayah_from: 1,
      ayah_to: 10,
      memorization_date: "2024-01-25",
      revision_status: "good",
      teacher_feedback: "Good progress, continue with next verses",
      total_pages_completed: 2,
      verified_by: "Sheikh Abdullah"
    }
  ];

  // Generate Schedules
  data.schedules = [
    // Ahmed Hassan (STD2024001) - Grade 6 Schedule
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Monday",
      time: "08:00",
      end_time: "08:45",
      subject: "Quran Recitation",
      subject_code: "QUR001",
      teacher_id: "TCH001",
      teacher_name: "Sheikh Abdullah",
      room: "Room A1",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Monday",
      time: "09:00",
      end_time: "09:45",
      subject: "Arabic Grammar",
      subject_code: "ARB001",
      teacher_id: "TCH002",
      teacher_name: "Ustadha Fatima",
      room: "Room A2",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Monday",
      time: "10:00",
      end_time: "10:15",
      subject: "Break",
      subject_code: "BRK001",
      teacher_id: "",
      teacher_name: "",
      room: "Playground",
      duration: 15,
      is_break: true,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Monday",
      time: "10:15",
      end_time: "11:00",
      subject: "Islamic Studies",
      subject_code: "ISL001",
      teacher_id: "TCH003",
      teacher_name: "Maulana Ibrahim",
      room: "Room A3",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Monday",
      time: "11:15",
      end_time: "12:00",
      subject: "Mathematics",
      subject_code: "MATH001",
      teacher_id: "TCH004",
      teacher_name: "Ustadh Omar",
      room: "Room A4",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    // Tuesday Schedule
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Tuesday",
      time: "08:00",
      end_time: "08:45",
      subject: "Hifz (Memorization)",
      subject_code: "HIFZ001",
      teacher_id: "TCH001",
      teacher_name: "Sheikh Abdullah",
      room: "Room A1",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Tuesday",
      time: "09:00",
      end_time: "09:45",
      subject: "Arabic Literature",
      subject_code: "ARB002",
      teacher_id: "TCH002",
      teacher_name: "Ustadha Fatima",
      room: "Room A2",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Tuesday",
      time: "10:00",
      end_time: "10:15",
      subject: "Break",
      subject_code: "BRK001",
      teacher_id: "",
      teacher_name: "",
      room: "Playground",
      duration: 15,
      is_break: true,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Tuesday",
      time: "10:15",
      end_time: "11:00",
      subject: "Fiqh (Islamic Jurisprudence)",
      subject_code: "FIQH001",
      teacher_id: "TCH003",
      teacher_name: "Maulana Ibrahim",
      room: "Room A3",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Tuesday",
      time: "11:15",
      end_time: "12:00",
      subject: "English",
      subject_code: "ENG001",
      teacher_id: "TCH005",
      teacher_name: "Ustadh Hassan",
      room: "Room A5",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    // Wednesday Schedule
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Wednesday",
      time: "08:00",
      end_time: "08:45",
      subject: "Quran Recitation",
      subject_code: "QUR001",
      teacher_id: "TCH001",
      teacher_name: "Sheikh Abdullah",
      room: "Room A1",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Wednesday",
      time: "09:00",
      end_time: "09:45",
      subject: "Hadith Studies",
      subject_code: "HADITH001",
      teacher_id: "TCH003",
      teacher_name: "Maulana Ibrahim",
      room: "Room A3",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Wednesday",
      time: "10:00",
      end_time: "10:15",
      subject: "Break",
      subject_code: "BRK001",
      teacher_id: "",
      teacher_name: "",
      room: "Playground",
      duration: 15,
      is_break: true,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Wednesday",
      time: "10:15",
      end_time: "11:00",
      subject: "Science",
      subject_code: "SCI001",
      teacher_id: "TCH006",
      teacher_name: "Ustadh Khalid",
      room: "Room A6",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Wednesday",
      time: "11:15",
      end_time: "12:00",
      subject: "Physical Education",
      subject_code: "PE001",
      teacher_id: "TCH007",
      teacher_name: "Ustadh Yusuf",
      room: "Playground",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    // Thursday Schedule
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Thursday",
      time: "08:00",
      end_time: "08:45",
      subject: "Hifz (Memorization)",
      subject_code: "HIFZ001",
      teacher_id: "TCH001",
      teacher_name: "Sheikh Abdullah",
      room: "Room A1",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Thursday",
      time: "09:00",
      end_time: "09:45",
      subject: "Arabic Grammar",
      subject_code: "ARB001",
      teacher_id: "TCH002",
      teacher_name: "Ustadha Fatima",
      room: "Room A2",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Thursday",
      time: "10:00",
      end_time: "10:15",
      subject: "Break",
      subject_code: "BRK001",
      teacher_id: "",
      teacher_name: "",
      room: "Playground",
      duration: 15,
      is_break: true,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Thursday",
      time: "10:15",
      end_time: "11:00",
      subject: "Islamic History",
      subject_code: "HIST001",
      teacher_id: "TCH003",
      teacher_name: "Maulana Ibrahim",
      room: "Room A3",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Thursday",
      time: "11:15",
      end_time: "12:00",
      subject: "Mathematics",
      subject_code: "MATH001",
      teacher_id: "TCH004",
      teacher_name: "Ustadh Omar",
      room: "Room A4",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    // Friday Schedule
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Friday",
      time: "08:00",
      end_time: "08:45",
      subject: "Quran Recitation",
      subject_code: "QUR001",
      teacher_id: "TCH001",
      teacher_name: "Sheikh Abdullah",
      room: "Room A1",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Friday",
      time: "09:00",
      end_time: "09:45",
      subject: "Arabic Literature",
      subject_code: "ARB002",
      teacher_id: "TCH002",
      teacher_name: "Ustadha Fatima",
      room: "Room A2",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Friday",
      time: "10:00",
      end_time: "10:15",
      subject: "Break",
      subject_code: "BRK001",
      teacher_id: "",
      teacher_name: "",
      room: "Playground",
      duration: 15,
      is_break: true,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Friday",
      time: "10:15",
      end_time: "11:00",
      subject: "Islamic Studies",
      subject_code: "ISL001",
      teacher_id: "TCH003",
      teacher_name: "Maulana Ibrahim",
      room: "Room A3",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      student_id: "STD2024001",
      class: "Grade 6",
      day: "Friday",
      time: "11:15",
      end_time: "12:00",
      subject: "English",
      subject_code: "ENG001",
      teacher_id: "TCH005",
      teacher_name: "Ustadh Hassan",
      room: "Room A5",
      duration: 45,
      is_break: false,
      is_optional: false,
      semester: "Spring 2024",
      academic_year: "2024-2025",
      status: "active",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    }
  ];

  // Generate Users
  data.users = [
    {
      id: uuidv4(),
      full_name: "Admin User",
      email: "admin@madrasa.edu",
      role: "admin",
      status: "active"
    },
    {
      id: uuidv4(),
      full_name: "Sheikh Abdullah",
      email: "sheikh.abdullah@madrasa.edu",
      role: "teacher",
      status: "active"
    },
    {
      id: uuidv4(),
      full_name: "Ustadha Fatima",
      email: "ustadha.fatima@madrasa.edu",
      role: "teacher",
      status: "active"
    }
  ];

  // Generate RBAC Data
  generateRBACData();

  // Generate Assignments
  data.assignments = [
    {
      id: uuidv4(),
      title: "Quran Recitation Practice",
      description: "Practice reciting Surah Al-Fatiha with proper tajweed rules. Record your recitation and submit the audio file.",
      subject: "Quran",
      subject_code: "QUR001",
      teacher_id: "TCH001",
      teacher_name: "Sheikh Abdullah",
      student_id: "STD2024001",
      class: "Grade 5",
      assigned_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      status: "in_progress",
      file_url: "/files/assignments/quran_recitation.pdf",
      file_name: "Quran Recitation Guidelines.pdf",
      points: 100,
      is_optional: false,
      academic_year: "2024-2025",
      semester: "Fall",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: "Arabic Grammar Exercise",
      description: "Complete the Arabic grammar exercises on page 45-50 of your textbook. Submit handwritten answers.",
      subject: "Arabic",
      subject_code: "ARA001",
      teacher_id: "TCH002",
      teacher_name: "Ustadha Fatima",
      student_id: "STD2024001",
      class: "Grade 5",
      assigned_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
      status: "pending",
      file_url: "/files/assignments/arabic_grammar.pdf",
      file_name: "Arabic Grammar Exercise.pdf",
      points: 80,
      is_optional: false,
      academic_year: "2024-2025",
      semester: "Fall",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: "Islamic History Essay",
      description: "Write a 500-word essay about the life of Prophet Muhammad (PBUH) during his early years in Mecca.",
      subject: "Islamic History",
      subject_code: "HIS001",
      teacher_id: "TCH001",
      teacher_name: "Sheikh Abdullah",
      student_id: "STD2024001",
      class: "Grade 5",
      assigned_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      due_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago (overdue)
      status: "overdue",
      file_url: "/files/assignments/islamic_history_essay.pdf",
      file_name: "Islamic History Essay Guidelines.pdf",
      points: 120,
      is_optional: false,
      academic_year: "2024-2025",
      semester: "Fall",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: "Hifz Memorization Check",
      description: "Memorize and recite Surah Al-Baqarah verses 1-10. Submit audio recording of your recitation.",
      subject: "Hifz",
      subject_code: "HIF001",
      teacher_id: "TCH002",
      teacher_name: "Ustadha Fatima",
      student_id: "STD2024001",
      class: "Grade 5",
      assigned_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
      due_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      status: "completed",
      file_url: "/files/assignments/hifz_check.pdf",
      file_name: "Hifz Memorization Guidelines.pdf",
      submission_url: "/files/submissions/hifz_recitation_ahmed.mp3",
      submission_file_name: "Hifz Recitation - Ahmed.mp3",
      submitted_date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
      grade: 95,
      feedback: "Excellent recitation with proper tajweed. Keep up the good work!",
      points: 100,
      is_optional: false,
      academic_year: "2024-2025",
      semester: "Fall",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: "Math Problem Solving",
      description: "Solve the math problems on pages 30-35. Show all your work and submit the completed worksheet.",
      subject: "Mathematics",
      subject_code: "MATH001",
      teacher_id: "TCH001",
      teacher_name: "Sheikh Abdullah",
      student_id: "STD2024001",
      class: "Grade 5",
      assigned_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      due_date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
      status: "pending",
      file_url: "/files/assignments/math_problems.pdf",
      file_name: "Math Problems Worksheet.pdf",
      points: 90,
      is_optional: false,
      academic_year: "2024-2025",
      semester: "Fall",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    }
  ];

  // Generate Hostels
  data.hostels = [
    {
      id: 'HOSTEL001',
      name: 'Al-Farabi Hostel',
      description: 'Main boys hostel with modern amenities',
      capacity: 200,
      current_occupancy: 150,
      location: 'North Campus',
      amenities: ['WiFi', 'Laundry', 'Study Room', 'Prayer Room', 'Cafeteria'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'HOSTEL002',
      name: 'Al-Khwarizmi Hostel',
      description: 'Secondary boys hostel',
      capacity: 150,
      current_occupancy: 120,
      location: 'South Campus',
      amenities: ['WiFi', 'Laundry', 'Study Room', 'Prayer Room'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'HOSTEL003',
      name: 'Al-Biruni Hostel',
      description: 'Girls hostel with security features',
      capacity: 100,
      current_occupancy: 80,
      location: 'East Campus',
      amenities: ['WiFi', 'Laundry', 'Study Room', 'Prayer Room', 'Security', 'Cafeteria'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  // Generate Sections
  data.sections = [
    {
      id: 'SEC001',
      name: 'CS-A',
      description: 'Computer Science Section A',
      department_id: 'dept_computer_science',
      year: 1,
      capacity: 30,
      current_students: 25,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'SEC002',
      name: 'CS-B',
      description: 'Computer Science Section B',
      department_id: 'dept_computer_science',
      year: 1,
      capacity: 30,
      current_students: 28,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'SEC003',
      name: 'ARB-A',
      description: 'Arabic Studies Section A',
      department_id: 'dept_arabic_studies',
      year: 1,
      capacity: 25,
      current_students: 22,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'SEC004',
      name: 'ISL-A',
      description: 'Islamic Studies Section A',
      department_id: 'dept_islamic_studies',
      year: 1,
      capacity: 20,
      current_students: 18,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
};

// API Routes

// Students
app.get('/api/students', (req, res) => {
  const { sort } = req.query;
  let students = [...data.students];
  
  if (sort) {
    const [field, order] = sort.startsWith('-') ? [sort.slice(1), 'desc'] : [sort, 'asc'];
    students.sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      if (order === 'desc') {
        return bVal > aVal ? 1 : -1;
      }
      return aVal > bVal ? 1 : -1;
    });
  }
  
  res.json(students);
});

app.post('/api/students', (req, res) => {
  const student = {
    id: uuidv4(),
    ...req.body,
    created_date: new Date().toISOString()
  };
  data.students.push(student);
  res.status(201).json(student);
});

app.get('/api/students/:id', (req, res) => {
  const student = data.students.find(s => s.id === req.params.id);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  res.json(student);
});

// Teachers
app.get('/api/teachers', (req, res) => {
  res.json(data.teachers);
});

app.post('/api/teachers', (req, res) => {
  const teacher = {
    id: uuidv4(),
    ...req.body
  };
  data.teachers.push(teacher);
  res.status(201).json(teacher);
});

// Fee Payments
app.get('/api/fee-payments', (req, res) => {
  res.json(data.feePayments);
});

app.post('/api/fee-payments', (req, res) => {
  const payment = {
    id: uuidv4(),
    ...req.body
  };
  data.feePayments.push(payment);
  res.status(201).json(payment);
});

// Donations
app.get('/api/donations', (req, res) => {
  res.json(data.donations);
});

app.post('/api/donations', (req, res) => {
  const donation = {
    id: uuidv4(),
    ...req.body
  };
  data.donations.push(donation);
  res.status(201).json(donation);
});

// Attendance
app.get('/api/attendance', (req, res) => {
  res.json(data.attendance);
});

app.post('/api/attendance', (req, res) => {
  const attendance = {
    id: uuidv4(),
    ...req.body
  };
  data.attendance.push(attendance);
  res.status(201).json(attendance);
});

// Hifz Progress
app.get('/api/hifz-progress', (req, res) => {
  res.json(data.hifzProgress);
});

app.post('/api/hifz-progress', (req, res) => {
  const progress = {
    id: uuidv4(),
    ...req.body
  };
  data.hifzProgress.push(progress);
  res.status(201).json(progress);
});

app.get('/api/hifz-progress/student/:studentId', (req, res) => {
  const studentProgress = data.hifzProgress.filter(progress => 
    progress.student_id === req.params.studentId
  );
  res.json(studentProgress);
});

// Attendance
app.get('/api/attendance', (req, res) => {
  const { date, class: className, status } = req.query;
  let attendance = [...data.attendance];
  
  if (date) {
    attendance = attendance.filter(record => record.date === date);
  }
  if (className) {
    attendance = attendance.filter(record => record.class === className);
  }
  if (status) {
    attendance = attendance.filter(record => record.status === status);
  }
  
  res.json(attendance);
});

app.post('/api/attendance', (req, res) => {
  const attendance = {
    id: uuidv4(),
    ...req.body
  };
  data.attendance.push(attendance);
  res.status(201).json(attendance);
});

app.get('/api/attendance/student/:studentId', (req, res) => {
  const studentAttendance = data.attendance.filter(record => 
    record.student_id === req.params.studentId
  );
  res.json(studentAttendance);
});

// Bulk attendance marking
app.post('/api/attendance/bulk', (req, res) => {
  const { date, class: className, attendanceRecords } = req.body;
  
  const newRecords = attendanceRecords.map(record => ({
    id: uuidv4(),
    date,
    class: className,
    ...record
  }));
  
  data.attendance.push(...newRecords);
  res.status(201).json(newRecords);
});

// Users/Auth
app.get('/api/users/me', (req, res) => {
  // For now, return the first user (admin)
  const user = data.users[0];
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

app.post('/api/users/login', (req, res) => {
  // Simple login simulation
  const { email, password } = req.body;
  const user = data.users.find(u => u.email === email);
  
  if (user) {
    res.json({ user, token: 'mock-jwt-token' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Data Import/Export endpoints
app.post('/api/import/:entity', (req, res) => {
  const { entity } = req.params;
  const { data: importData } = req.body;
  
  try {
    if (!importData || !Array.isArray(importData)) {
      return res.status(400).json({ error: 'Invalid data format. Expected array of records.' });
    }
    
    // Validate and add data
    const validatedData = importData.map(item => ({
      id: uuidv4(),
      ...item,
      created_date: new Date().toISOString()
    }));
    
    // Add to appropriate collection
    switch (entity.toLowerCase()) {
      case 'students':
        data.students.push(...validatedData);
        break;
      case 'teachers':
        data.teachers.push(...validatedData);
        break;
      case 'attendance':
        data.attendance.push(...validatedData);
        break;
      case 'feepayments':
        data.feePayments.push(...validatedData);
        break;
      case 'donations':
        data.donations.push(...validatedData);
        break;
      case 'hifzprogress':
        data.hifzProgress.push(...validatedData);
        break;
      default:
        return res.status(400).json({ error: `Unknown entity: ${entity}` });
    }
    
    res.json({ 
      message: `Successfully imported ${validatedData.length} ${entity} records`,
      count: validatedData.length 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/export/:entity', (req, res) => {
  const { entity } = req.params;
  
  try {
    let exportData = [];
    
    switch (entity.toLowerCase()) {
      case 'students':
        exportData = data.students;
        break;
      case 'teachers':
        exportData = data.teachers;
        break;
      case 'attendance':
        exportData = data.attendance;
        break;
      case 'feepayments':
        exportData = data.feePayments;
        break;
      case 'donations':
        exportData = data.donations;
        break;
      case 'hifzprogress':
        exportData = data.hifzProgress;
        break;
      default:
        return res.status(400).json({ error: `Unknown entity: ${entity}` });
    }
    
    res.json(exportData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Schedule Management
app.get('/api/schedules', (req, res) => {
  const { student_id, day, subject } = req.query;
  let schedules = [...data.schedules];
  
  if (student_id) {
    schedules = schedules.filter(s => s.student_id === student_id);
  }
  if (day) {
    schedules = schedules.filter(s => s.day === day);
  }
  if (subject) {
    schedules = schedules.filter(s => s.subject.toLowerCase().includes(subject.toLowerCase()));
  }
  
  res.json(schedules);
});

app.get('/api/schedules/student/:studentId', (req, res) => {
  const studentSchedules = data.schedules.filter(schedule => 
    schedule.student_id === req.params.studentId && schedule.status === 'active'
  );
  res.json(studentSchedules);
});

app.get('/api/schedules/student/:studentId/today', (req, res) => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySchedules = data.schedules.filter(schedule => 
    schedule.student_id === req.params.studentId && 
    schedule.day === today && 
    schedule.status === 'active'
  );
  res.json(todaySchedules);
});

app.get('/api/schedules/student/:studentId/next', (req, res) => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
  const today = now.toLocaleDateString('en-US', { weekday: 'long' });
  
  const todaySchedules = data.schedules.filter(schedule => 
    schedule.student_id === req.params.studentId && 
    schedule.day === today && 
    schedule.status === 'active' &&
    !schedule.is_break
  );
  
  const nextClass = todaySchedules.find(schedule => schedule.time > currentTime);
  res.json(nextClass || null);
});

app.post('/api/schedules', (req, res) => {
  const schedule = {
    id: uuidv4(),
    ...req.body,
    created_date: new Date().toISOString(),
    updated_date: new Date().toISOString()
  };
  data.schedules.push(schedule);
  res.status(201).json(schedule);
});

app.put('/api/schedules/:id', (req, res) => {
  const index = data.schedules.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Schedule not found' });
  }
  
  data.schedules[index] = {
    ...data.schedules[index],
    ...req.body,
    updated_date: new Date().toISOString()
  };
  res.json(data.schedules[index]);
});

app.delete('/api/schedules/:id', (req, res) => {
  const index = data.schedules.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Schedule not found' });
  }
  
  data.schedules.splice(index, 1);
  res.json({ message: 'Schedule deleted successfully' });
});

// Assignment Management
app.get('/api/assignments', (req, res) => {
  const { student_id, status, subject } = req.query;
  let assignments = [...data.assignments];
  
  if (student_id) {
    assignments = assignments.filter(a => a.student_id === student_id);
  }
  if (status) {
    assignments = assignments.filter(a => a.status === status);
  }
  if (subject) {
    assignments = assignments.filter(a => a.subject.toLowerCase().includes(subject.toLowerCase()));
  }
  
  res.json(assignments);
});

app.get('/api/assignments/student/:studentId', (req, res) => {
  const studentAssignments = data.assignments.filter(assignment => 
    assignment.student_id === req.params.studentId
  );
  res.json(studentAssignments);
});

app.get('/api/assignments/student/:studentId/stats', (req, res) => {
  const studentAssignments = data.assignments.filter(assignment => 
    assignment.student_id === req.params.studentId
  );
  
  const stats = {
    total: studentAssignments.length,
    pending: studentAssignments.filter(a => a.status === 'pending').length,
    in_progress: studentAssignments.filter(a => a.status === 'in_progress').length,
    completed: studentAssignments.filter(a => a.status === 'completed').length,
    overdue: studentAssignments.filter(a => a.status === 'overdue').length
  };
  
  res.json(stats);
});

app.get('/api/assignments/:id', (req, res) => {
  const assignment = data.assignments.find(a => a.id === req.params.id);
  if (!assignment) {
    return res.status(404).json({ error: 'Assignment not found' });
  }
  res.json(assignment);
});

app.post('/api/assignments', (req, res) => {
  const assignment = {
    id: uuidv4(),
    ...req.body,
    created_date: new Date().toISOString(),
    updated_date: new Date().toISOString()
  };
  data.assignments.push(assignment);
  res.status(201).json(assignment);
});

app.put('/api/assignments/:id', (req, res) => {
  const index = data.assignments.findIndex(a => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Assignment not found' });
  }
  
  data.assignments[index] = {
    ...data.assignments[index],
    ...req.body,
    updated_date: new Date().toISOString()
  };
  res.json(data.assignments[index]);
});

app.put('/api/assignments/:id/submit', (req, res) => {
  const index = data.assignments.findIndex(a => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Assignment not found' });
  }
  
  const { submission_url, submission_file_name } = req.body;
  data.assignments[index] = {
    ...data.assignments[index],
    submission_url,
    submission_file_name,
    submitted_date: new Date().toISOString(),
    status: 'completed',
    updated_date: new Date().toISOString()
  };
  res.json(data.assignments[index]);
});

app.delete('/api/assignments/:id', (req, res) => {
  const index = data.assignments.findIndex(a => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Assignment not found' });
  }
  
  data.assignments.splice(index, 1);
  res.json({ message: 'Assignment deleted successfully' });
});

// RBAC API Routes

// Roles
app.get('/api/roles', (req, res) => {
  res.json(data.roles);
});

app.post('/api/roles', (req, res) => {
  const role = {
    id: req.body.id || uuidv4(),
    ...req.body,
    created_date: new Date().toISOString(),
    updated_date: new Date().toISOString()
  };
  data.roles.push(role);
  res.status(201).json(role);
});

app.get('/api/roles/:id', (req, res) => {
  const role = data.roles.find(r => r.id === req.params.id);
  if (!role) {
    return res.status(404).json({ error: 'Role not found' });
  }
  res.json(role);
});

app.put('/api/roles/:id', (req, res) => {
  const index = data.roles.findIndex(r => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Role not found' });
  }
  
  data.roles[index] = {
    ...data.roles[index],
    ...req.body,
    updated_date: new Date().toISOString()
  };
  res.json(data.roles[index]);
});

app.delete('/api/roles/:id', (req, res) => {
  const index = data.roles.findIndex(r => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Role not found' });
  }
  
  const role = data.roles[index];
  if (role.isRootRole) {
    return res.status(400).json({ error: 'Cannot delete root role' });
  }
  
  data.roles.splice(index, 1);
  
  // Remove related role-permission mappings
  data.rolePermissions = data.rolePermissions.filter(rp => rp.role_id !== req.params.id);
  
  // Remove related user-role mappings
  data.userRoles = data.userRoles.filter(ur => ur.role_id !== req.params.id);
  
  res.json({ message: 'Role deleted successfully' });
});

// Permissions
app.get('/api/permissions', (req, res) => {
  const { category, action, resource } = req.query;
  let permissions = [...data.permissions];
  
  if (category) {
    permissions = permissions.filter(p => p.category === category);
  }
  if (action) {
    permissions = permissions.filter(p => p.action === action);
  }
  if (resource) {
    permissions = permissions.filter(p => p.resource === resource);
  }
  
  res.json(permissions);
});

app.post('/api/permissions', (req, res) => {
  const permission = {
    id: req.body.id || uuidv4(),
    ...req.body,
    created_date: new Date().toISOString(),
    updated_date: new Date().toISOString()
  };
  data.permissions.push(permission);
  res.status(201).json(permission);
});

app.get('/api/permissions/:id', (req, res) => {
  const permission = data.permissions.find(p => p.id === req.params.id);
  if (!permission) {
    return res.status(404).json({ error: 'Permission not found' });
  }
  res.json(permission);
});

app.put('/api/permissions/:id', (req, res) => {
  const index = data.permissions.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Permission not found' });
  }
  
  data.permissions[index] = {
    ...data.permissions[index],
    ...req.body,
    updated_date: new Date().toISOString()
  };
  res.json(data.permissions[index]);
});

app.delete('/api/permissions/:id', (req, res) => {
  const index = data.permissions.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Permission not found' });
  }
  
  data.permissions.splice(index, 1);
  
  // Remove related role-permission mappings
  data.rolePermissions = data.rolePermissions.filter(rp => rp.permission_id !== req.params.id);
  
  res.json({ message: 'Permission deleted successfully' });
});

// Departments
app.get('/api/departments', (req, res) => {
  res.json(data.departments);
});

app.post('/api/departments', (req, res) => {
  const department = {
    id: req.body.id || uuidv4(),
    ...req.body,
    created_date: new Date().toISOString(),
    updated_date: new Date().toISOString()
  };
  data.departments.push(department);
  res.status(201).json(department);
});

app.get('/api/departments/:id', (req, res) => {
  const department = data.departments.find(d => d.id === req.params.id);
  if (!department) {
    return res.status(404).json({ error: 'Department not found' });
  }
  res.json(department);
});

app.put('/api/departments/:id', (req, res) => {
  const index = data.departments.findIndex(d => d.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Department not found' });
  }
  
  data.departments[index] = {
    ...data.departments[index],
    ...req.body,
    updated_date: new Date().toISOString()
  };
  res.json(data.departments[index]);
});

app.delete('/api/departments/:id', (req, res) => {
  const index = data.departments.findIndex(d => d.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Department not found' });
  }
  
  data.departments.splice(index, 1);
  res.json({ message: 'Department deleted successfully' });
});

// Role-Permission mappings
app.get('/api/role-permissions', (req, res) => {
  const { role_id, permission_id } = req.query;
  let mappings = [...data.rolePermissions];
  
  if (role_id) {
    mappings = mappings.filter(rp => rp.role_id === role_id);
  }
  if (permission_id) {
    mappings = mappings.filter(rp => rp.permission_id === permission_id);
  }
  
  res.json(mappings);
});

app.post('/api/role-permissions', (req, res) => {
  const { role_id, permission_id } = req.body;
  
  // Check if mapping already exists
  const existing = data.rolePermissions.find(rp => 
    rp.role_id === role_id && rp.permission_id === permission_id
  );
  
  if (existing) {
    return res.status(400).json({ error: 'Role-permission mapping already exists' });
  }
  
  const mapping = {
    id: uuidv4(),
    role_id,
    permission_id,
    granted_date: new Date().toISOString(),
    granted_by: req.body.granted_by || null,
    is_inherited: req.body.is_inherited || false,
    inherited_from_role_id: req.body.inherited_from_role_id || null,
    status: 'active'
  };
  
  data.rolePermissions.push(mapping);
  res.status(201).json(mapping);
});

app.delete('/api/role-permissions/:id', (req, res) => {
  const index = data.rolePermissions.findIndex(rp => rp.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Role-permission mapping not found' });
  }
  
  data.rolePermissions.splice(index, 1);
  res.json({ message: 'Role-permission mapping deleted successfully' });
});

// User-Role mappings
app.get('/api/user-roles', (req, res) => {
  const { user_id, role_id } = req.query;
  let mappings = [...data.userRoles];
  
  if (user_id) {
    mappings = mappings.filter(ur => ur.user_id === user_id);
  }
  if (role_id) {
    mappings = mappings.filter(ur => ur.role_id === role_id);
  }
  
  res.json(mappings);
});

app.post('/api/user-roles', (req, res) => {
  const { user_id, role_id } = req.body;
  
  // Check if mapping already exists
  const existing = data.userRoles.find(ur => 
    ur.user_id === user_id && ur.role_id === role_id
  );
  
  if (existing) {
    return res.status(400).json({ error: 'User-role mapping already exists' });
  }
  
  const mapping = {
    id: uuidv4(),
    user_id,
    role_id,
    assigned_date: new Date().toISOString(),
    assigned_by: req.body.assigned_by || null,
    expires_at: req.body.expires_at || null,
    is_primary: req.body.is_primary || false,
    status: 'active'
  };
  
  data.userRoles.push(mapping);
  res.status(201).json(mapping);
});

app.delete('/api/user-roles/:id', (req, res) => {
  const index = data.userRoles.findIndex(ur => ur.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'User-role mapping not found' });
  }
  
  data.userRoles.splice(index, 1);
  res.json({ message: 'User-role mapping deleted successfully' });
});

// Get user permissions (with inheritance)
app.get('/api/users/:userId/permissions', (req, res) => {
  const { userId } = req.params;
  
  // Get user's roles
  const userRoles = data.userRoles.filter(ur => 
    ur.user_id === userId && ur.status === 'active'
  );
  
  if (userRoles.length === 0) {
    return res.json([]);
  }
  
  const roleIds = userRoles.map(ur => ur.role_id);
  
  // Get permissions for each role (including inherited ones)
  const getAllPermissionsForRole = (roleId, visited = new Set()) => {
    if (visited.has(roleId)) return []; // Prevent circular inheritance
    visited.add(roleId);
    
    const role = data.roles.find(r => r.id === roleId);
    if (!role) return [];
    
    const permissions = [];
    
    // Get direct permissions
    const directPermissions = data.rolePermissions.filter(rp => 
      rp.role_id === roleId && rp.status === 'active'
    );
    permissions.push(...directPermissions.map(rp => rp.permission_id));
    
    // Get inherited permissions
    if (role.inheritsFrom && role.inheritsFrom.length > 0) {
      role.inheritsFrom.forEach(parentRoleId => {
        const inheritedPermissions = getAllPermissionsForRole(parentRoleId, new Set(visited));
        permissions.push(...inheritedPermissions);
      });
    }
    
    return permissions;
  };
  
  const allPermissions = new Set();
  roleIds.forEach(roleId => {
    const rolePermissions = getAllPermissionsForRole(roleId);
    rolePermissions.forEach(permissionId => allPermissions.add(permissionId));
  });
  
  // Get permission details
  const permissionDetails = Array.from(allPermissions).map(permissionId => 
    data.permissions.find(p => p.id === permissionId)
  ).filter(Boolean);
  
  res.json(permissionDetails);
});

// Hostels
app.get('/api/hostels', (req, res) => {
  res.json(data.hostels);
});

app.get('/api/hostels/:id', (req, res) => {
  const hostel = data.hostels.find(h => h.id === req.params.id);
  if (!hostel) {
    return res.status(404).json({ error: 'Hostel not found' });
  }
  res.json(hostel);
});

// Sections
app.get('/api/sections', (req, res) => {
  res.json(data.sections);
});

app.get('/api/sections/:id', (req, res) => {
  const section = data.sections.find(s => s.id === req.params.id);
  if (!section) {
    return res.status(404).json({ error: 'Section not found' });
  }
  res.json(section);
});

// Student Dashboard Data
app.get('/api/student-dashboard/:studentId', (req, res) => {
  const studentId = req.params.studentId;
  
  // Find student data (using mock data for now)
  const studentData = {
    id: studentId,
    name: "Ahmed Hassan",
    roll_number: "2024-CS-001",
    email: "ahmed.hassan@madrasa.edu",
    phone: "+92-300-1234567",
    photo_url: "/api/placeholder/150/150",
    year: 1,
    department: {
      id: "dept_computer_science",
      name: "Computer Science"
    },
    section: {
      id: "SEC001",
      name: "CS-A"
    },
    hostel: {
      id: "HOSTEL001",
      name: "Al-Farabi Hostel"
    },
    room_number: "A-205",
    bed_number: "Bed-2",
    father_name: "Muhammad Hassan",
    guardian_contact: "+92-300-9876543",
    dob: "2005-03-15",
    nationality: "Pakistani",
    address: "House 123, Street 45, Lahore, Pakistan",
    credits: 18,
    attendance_percentage: 85,
    activities: [
      { date: "2024-01-15", action: "Submitted Assignment", status: "completed" },
      { date: "2024-01-14", action: "Attended Class", status: "completed" },
      { date: "2024-01-13", action: "Library Visit", status: "completed" },
      { date: "2024-01-12", action: "Group Study", status: "completed" }
    ],
    attendance_summary: {
      present: 85,
      absent: 10,
      late: 5
    },
    grades: [
      { subject: "Programming Fundamentals", score: 88 },
      { subject: "Mathematics", score: 92 },
      { subject: "English", score: 85 },
      { subject: "Islamic Studies", score: 95 }
    ]
  };
  
  res.json(studentData);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Madrasa ERP Server is running',
    data: {
      students: data.students.length,
      teachers: data.teachers.length,
      attendance: data.attendance.length,
      feePayments: data.feePayments.length,
      donations: data.donations.length,
      hifzProgress: data.hifzProgress.length,
      schedules: data.schedules.length,
      assignments: data.assignments.length,
      users: data.users.length,
      roles: data.roles.length,
      permissions: data.permissions.length,
      departments: data.departments.length,
      rolePermissions: data.rolePermissions.length,
      userRoles: data.userRoles.length,
      hostels: data.hostels.length,
      sections: data.sections.length
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Madrasa ERP Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  loadInitialData();
});
