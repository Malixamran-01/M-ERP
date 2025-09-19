# Madrasa ERP Management System - Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Authentication & Authorization](#authentication--authorization)
4. [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
5. [State Management](#state-management)
6. [API Endpoints](#api-endpoints)
7. [Database Schema](#database-schema)
8. [UI Components](#ui-components)
9. [Feature Implementation History](#feature-implementation-history)
10. [Development Guidelines](#development-guidelines)

---

## 🏗️ Project Overview

**Madrasa ERP Management System** is a comprehensive educational management platform designed specifically for Islamic educational institutions (Madrasas). The system provides role-based access control, student management, teacher management, financial tracking, and academic progress monitoring.

### Key Features
- **Multi-role Authentication System** (Super Admin, Admin, Teacher, Guardian, Student)
- **Student Management** (Admissions, Enrollment, Academic Records)
- **Teacher Management** (Subject Assignment, Class Management)
- **Financial Management** (Fee Collection, Donations, Reports)
- **Academic Tracking** (Hifz Progress, Attendance, Exams)
- **Guardian Portal** (Child Progress Monitoring)
- **Data Import/Export** (JSON-based data management)
- **Responsive UI** (Modern, Islamic-themed design)

---

## 🏛️ Architecture

### Technology Stack
- **Frontend**: React.js 18 + Vite
- **Backend**: Express.js (JSON-based)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router DOM v6
- **State Management**: Custom Context API + Local Storage

### Project Structure
```
MadarsaERP/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Auth, etc.)
│   │   ├── entities/       # API interaction classes
│   │   ├── pages/          # Page components
│   │   ├── services/       # Business logic services
│   │   ├── utils/          # Utility functions
│   │   └── App.jsx         # Main application
│   └── package.json
├── server/                 # Express backend
│   ├── Entities/           # JSON schema definitions
│   ├── data/              # Sample data files
│   ├── server.js          # Main server file
│   └── importData.js      # Data import utility
└── DOCUMENTATION.md       # This file
```

---

## 🔐 Authentication & Authorization

### Authentication Service (`authService.jsx`)

**Purpose**: Centralized authentication management with persistent state.

**Key Features**:
- Token-based authentication
- Persistent login sessions
- Automatic token validation
- Role-based permission checking
- Event-driven state updates

**Implementation**:
```javascript
class AuthService {
  // Core methods
  async login(email, password)
  async logout()
  getCurrentUser()
  isAuthenticated()
  hasPermission(permission)
  hasRole(role)
  
  // State management
  addAuthListener(callback)
  updateUser(updatedUser)
  
  // Token management
  generateToken(user)
  validateToken(token)
  refreshToken()
}
```

**Storage Keys**:
- `madrasa_auth_token`: JWT token
- `madrasa_user_data`: User information
- `madrasa_refresh_token`: Refresh token

### Demo Accounts
| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| Super Admin | superadmin@madrasa.edu | superadmin123 | All permissions |
| Admin | admin@madrasa.edu | admin123 | Admin-level permissions |
| Teacher | teacher@madrasa.edu | teacher123 | Teaching permissions |
| Guardian | guardian@madrasa.edu | guardian123 | Guardian permissions |
| Student | student@madrasa.edu | student123 | Student permissions |

---

## 👥 Role-Based Access Control (RBAC)

### Permission System

**Permission Format**: `resource:action` (e.g., `student:view`, `finance:manage`)

**Core Permissions**:
```javascript
const PERMISSIONS = {
  // Dashboard
  DASHBOARD_VIEW: 'dashboard:view',
  
  // Student Management
  STUDENT_VIEW: 'student:view',
  STUDENT_CREATE: 'student:create',
  STUDENT_EDIT: 'student:edit',
  STUDENT_DELETE: 'student:delete',
  STUDENT_ASSIGN_CLASS: 'student:assign_class',
  STUDENT_ASSIGN_HOSTEL: 'student:assign_hostel',
  STUDENT_VIEW_FEES: 'student:view_fees',
  STUDENT_VIEW_ATTENDANCE: 'student:view_attendance',
  STUDENT_VIEW_PROGRESS: 'student:view_progress',
  STUDENT_VIEW_GRADES: 'student:view_grades',

  // Teacher Management
  TEACHER_VIEW: 'teacher:view',
  TEACHER_CREATE: 'teacher:create',
  TEACHER_EDIT: 'teacher:edit',
  TEACHER_DELETE: 'teacher:delete',
  TEACHER_ASSIGN_SUBJECTS: 'teacher:assign_subjects',
  TEACHER_ASSIGN_CLASSES: 'teacher:assign_classes',

  // Guardian Management
  GUARDIAN_VIEW: 'guardian:view',
  GUARDIAN_CREATE: 'guardian:create',
  GUARDIAN_EDIT: 'guardian:edit',
  GUARDIAN_DELETE: 'guardian:delete',
  GUARDIAN_LINK_STUDENT: 'guardian:link_student',

  // Finance Management
  FINANCE_VIEW: 'finance:view',
  FINANCE_MANAGE: 'finance:manage',
  FINANCE_VIEW_REPORTS: 'finance:view_reports',
  FINANCE_PROCESS_PAYMENTS: 'finance:process_payments',
  FINANCE_MANAGE_DONATIONS: 'finance:manage_donations',

  // Attendance Tracking
  ATTENDANCE_VIEW: 'attendance:view',
  ATTENDANCE_MARK: 'attendance:mark',
  ATTENDANCE_BULK_MARK: 'attendance:bulk_mark',
  ATTENDANCE_EDIT: 'attendance:edit',

  // Academic Progress & Hifz Tracking
  PROGRESS_VIEW: 'progress:view',
  PROGRESS_UPDATE: 'progress:update',
  HIFZ_VIEW: 'hifz:view',
  HIFZ_UPDATE: 'hifz:update',

  // Exam & Grading
  EXAM_VIEW: 'exam:view',
  EXAM_CREATE: 'exam:create',
  EXAM_EDIT: 'exam:edit',
  EXAM_DELETE: 'exam:delete',
  GRADE_UPLOAD: 'grade:upload',
  GRADE_VIEW: 'grade:view',
  GRADE_EDIT: 'grade:edit',

  // Messaging & Announcements
  MESSAGE_SEND: 'message:send',
  MESSAGE_VIEW: 'message:view',
  ANNOUNCEMENT_CREATE: 'announcement:create',
  ANNOUNCEMENT_VIEW: 'announcement:view',

  // Library & Resources
  LIBRARY_VIEW: 'library:view',
  RESOURCE_UPLOAD: 'resource:upload',
  RESOURCE_MANAGE: 'resource:manage',

  // Transport Management
  TRANSPORT_VIEW: 'transport:view',
  TRANSPORT_MANAGE: 'transport:manage',

  // Reports & Analytics
  REPORTS_VIEW: 'reports:view',
  REPORTS_GENERATE: 'reports:generate',

  // System Management
  USER_MANAGE: 'user:manage',
  ROLE_ASSIGN: 'role:assign',
  ROLE_MANAGE: 'role:manage',
  DATA_IMPORT: 'data:import',
  DATA_EXPORT: 'data:export',
  DATA_MANAGE: 'data:manage',
  SYSTEM_SETTINGS: 'system:settings',
  SYSTEM_LOGS: 'system:logs'
};
```

### Role Hierarchy

**Super Admin** (Highest Authority)
- All permissions
- System administration
- User and role management
- Data import/export
- System settings

**Admin** (Institutional Management)
- Student, teacher, guardian management
- Financial management
- Academic oversight
- Report generation
- Data management

**Teacher** (Academic Staff)
- Student progress tracking
- Attendance management
- Grade management
- Hifz progress tracking
- Limited reporting

**Guardian** (Parent/Guardian)
- View child's progress
- View attendance
- View academic records
- Communication with teachers
- Fee payment viewing

**Student** (Self-Service)
- View own progress
- View own attendance
- View own grades
- View academic calendar
- Limited messaging

### Route Protection

**Route Guard Component** (`RouteGuard.jsx`):
```javascript
<RouteGuard requiredRoles={['super_admin', 'admin']}>
  <ProtectedComponent />
</RouteGuard>
```

**Navigation Filtering**:
- Dynamic sidebar based on user permissions
- Role-based menu items
- Permission-based UI element visibility

---

## 🔄 State Management

### Authentication Context (`AuthContext.jsx`)

**Purpose**: Global authentication state management.

**State**:
```javascript
{
  user: UserObject | null,
  token: string | null,
  loading: boolean,
  error: string | null,
  isAuthenticated: boolean
}
```

**Methods**:
```javascript
{
  login: (email, password) => Promise<Result>,
  logout: () => Promise<void>,
  updateUser: (userData) => void,
  hasPermission: (permission) => boolean,
  hasRole: (role) => boolean,
  hasAnyRole: (roles) => boolean
}
```

### State Persistence

**Local Storage Keys**:
- `madrasa_auth_token`: Authentication token
- `madrasa_user_data`: User profile data
- `madrasa_refresh_token`: Token refresh data
- `madrasa_state_*`: Application state data

**State Manager** (`stateManager.jsx`):
- Centralized state management
- Persistent state storage
- Event-driven updates
- State synchronization

---

## 🌐 API Endpoints

### Base URL: `http://localhost:3001/api`

### Student Management
```
GET    /students              # List all students
POST   /students              # Create new student
GET    /students/:id          # Get student by ID
PUT    /students/:id          # Update student
DELETE /students/:id          # Delete student
```

### Teacher Management
```
GET    /teachers              # List all teachers
POST   /teachers              # Create new teacher
GET    /teachers/:id          # Get teacher by ID
PUT    /teachers/:id          # Update teacher
DELETE /teachers/:id          # Delete teacher
```

### Attendance Management
```
GET    /attendance            # List attendance records
POST   /attendance            # Create attendance record
POST   /attendance/bulk       # Bulk attendance marking
GET    /attendance/student/:id # Student attendance history
```

### Hifz Progress
```
GET    /hifz-progress         # List all Hifz progress
POST   /hifz-progress         # Create Hifz progress record
GET    /hifz-progress/student/:id # Student Hifz progress
```

### Financial Management
```
GET    /fee-payments          # List fee payments
POST   /fee-payments          # Create fee payment
GET    /donations             # List donations
POST   /donations             # Create donation
```

### Data Management
```
POST   /import/:entity        # Import entity data
GET    /export/:entity        # Export entity data
GET    /health                # System health check
```

### RBAC Management
```
# Roles
GET    /api/roles             # List all roles
POST   /api/roles             # Create new role
GET    /api/roles/:id         # Get role by ID
PUT    /api/roles/:id         # Update role
DELETE /api/roles/:id         # Delete role

# Permissions
GET    /api/permissions       # List all permissions (with filtering)
POST   /api/permissions       # Create new permission
GET    /api/permissions/:id   # Get permission by ID
PUT    /api/permissions/:id   # Update permission
DELETE /api/permissions/:id   # Delete permission

# Departments
GET    /api/departments       # List all departments
POST   /api/departments       # Create new department
GET    /api/departments/:id   # Get department by ID
PUT    /api/departments/:id   # Update department
DELETE /api/departments/:id   # Delete department

# Role-Permission Management
GET    /api/role-permissions  # List role-permission mappings
POST   /api/role-permissions  # Assign permission to role
DELETE /api/role-permissions/:id # Remove permission from role

# User-Role Management
GET    /api/user-roles        # List user-role mappings
POST   /api/user-roles        # Assign role to user
DELETE /api/user-roles/:id    # Remove role from user

# User Permissions (with Inheritance)
GET    /api/users/:userId/permissions # Get user's effective permissions
```

---

## 🗄️ Database Schema

### Entity Definitions (JSON Schema)

#### Student Entity
```json
{
  "name": "Student",
  "type": "object",
  "properties": {
    "student_id": { "type": "string", "description": "Unique student ID" },
    "first_name": { "type": "string", "description": "Student's first name" },
    "last_name": { "type": "string", "description": "Student's last name" },
    "date_of_birth": { "type": "string", "format": "date" },
    "gender": { "type": "string", "enum": ["male", "female"] },
    "class": { "type": "string", "description": "Current class/grade" },
    "department": { "type": "string", "enum": ["hifz", "nazira", "alim", "primary"] },
    "admission_date": { "type": "string", "format": "date" },
    "student_type": { "type": "string", "enum": ["boarding", "day_scholar"] },
    "guardian_name": { "type": "string" },
    "guardian_phone": { "type": "string" },
    "guardian_email": { "type": "string", "format": "email" },
    "address": { "type": "string" },
    "fee_status": { "type": "string", "enum": ["paid", "partial", "pending", "overdue"] },
    "hostel_room": { "type": "string" },
    "status": { "type": "string", "enum": ["active", "inactive", "graduated", "withdrawn"] }
  },
  "required": ["first_name", "last_name", "student_id", "class", "department"]
}
```

#### Teacher Entity
```json
{
  "name": "Teacher",
  "type": "object",
  "properties": {
    "teacher_id": { "type": "string", "description": "Unique teacher ID" },
    "first_name": { "type": "string" },
    "last_name": { "type": "string" },
    "email": { "type": "string", "format": "email" },
    "phone": { "type": "string" },
    "qualification": { "type": "string" },
    "specialization": { "type": "string" },
    "joining_date": { "type": "string", "format": "date" },
    "salary": { "type": "number" },
    "status": { "type": "string", "enum": ["active", "inactive", "resigned"] },
    "assigned_classes": { "type": "array", "items": { "type": "string" } },
    "assigned_subjects": { "type": "array", "items": { "type": "string" } }
  },
  "required": ["first_name", "last_name", "teacher_id", "email"]
}
```

#### Attendance Entity
```json
{
  "name": "Attendance",
  "type": "object",
  "properties": {
    "student_id": { "type": "string" },
    "date": { "type": "string", "format": "date" },
    "status": { "type": "string", "enum": ["present", "absent", "late", "excused"] },
    "class": { "type": "string" },
    "remarks": { "type": "string" }
  },
  "required": ["student_id", "date", "status", "class"]
}
```

#### Hifz Progress Entity
```json
{
  "name": "HifzProgress",
  "type": "object",
  "properties": {
    "student_id": { "type": "string" },
    "surah_name": { "type": "string" },
    "verses_completed": { "type": "number" },
    "total_verses": { "type": "number" },
    "completion_percentage": { "type": "number" },
    "last_reviewed": { "type": "string", "format": "date" },
    "teacher_notes": { "type": "string" },
    "status": { "type": "string", "enum": ["in_progress", "completed", "reviewed"] }
  },
  "required": ["student_id", "surah_name", "verses_completed", "total_verses"]
}
```

#### Fee Payment Entity
```json
{
  "name": "FeePayment",
  "type": "object",
  "properties": {
    "student_id": { "type": "string" },
    "amount": { "type": "number" },
    "payment_date": { "type": "string", "format": "date" },
    "payment_method": { "type": "string", "enum": ["cash", "bank_transfer", "cheque", "online"] },
    "receipt_number": { "type": "string" },
    "month": { "type": "string" },
    "year": { "type": "number" },
    "status": { "type": "string", "enum": ["paid", "pending", "overdue"] },
    "remarks": { "type": "string" }
  },
  "required": ["student_id", "amount", "payment_date", "payment_method"]
}
```

#### Donation Entity
```json
{
  "name": "Donation",
  "type": "object",
  "properties": {
    "donor_name": { "type": "string" },
    "donor_email": { "type": "string", "format": "email" },
    "donor_phone": { "type": "string" },
    "amount": { "type": "number" },
    "donation_date": { "type": "string", "format": "date" },
    "donation_type": { "type": "string", "enum": ["general", "zakat", "sadaqah", "sponsorship"] },
    "payment_method": { "type": "string", "enum": ["cash", "bank_transfer", "cheque", "online"] },
    "purpose": { "type": "string" },
    "status": { "type": "string", "enum": ["received", "pending", "cancelled"] },
    "receipt_number": { "type": "string" }
  },
  "required": ["donor_name", "amount", "donation_date", "donation_type"]
}
```

#### Role Entity (RBAC)
```json
{
  "name": "Role",
  "type": "object",
  "properties": {
    "id": { "type": "string", "description": "Unique role identifier" },
    "name": { "type": "string", "description": "Human-readable role name" },
    "description": { "type": "string", "description": "Role description" },
    "color": { "type": "string", "description": "Role color for UI display" },
    "isRootRole": { "type": "boolean", "default": false, "description": "Whether this is a root role" },
    "inheritsFrom": { "type": "array", "default": [], "description": "Array of role IDs this role inherits from" },
    "departments": { "type": "array", "default": [], "description": "Array of department IDs this role has access to" },
    "created_date": { "type": "string", "description": "Role creation timestamp" },
    "updated_date": { "type": "string", "description": "Role last update timestamp" },
    "status": { "type": "string", "default": "active", "enum": ["active", "inactive", "archived"] }
  },
  "required": ["id", "name", "color", "created_date", "updated_date"]
}
```

#### Permission Entity (RBAC)
```json
{
  "name": "Permission",
  "type": "object",
  "properties": {
    "id": { "type": "string", "description": "Unique permission identifier" },
    "name": { "type": "string", "description": "Human-readable permission name" },
    "description": { "type": "string", "description": "Permission description" },
    "category": { "type": "string", "description": "Permission category" },
    "action": { "type": "string", "enum": ["create", "read", "update", "delete", "manage", "view", "assign"] },
    "resource": { "type": "string", "description": "Resource this permission applies to" },
    "created_date": { "type": "string", "description": "Permission creation timestamp" },
    "updated_date": { "type": "string", "description": "Permission last update timestamp" },
    "status": { "type": "string", "default": "active", "enum": ["active", "inactive", "deprecated"] }
  },
  "required": ["id", "name", "category", "action", "resource", "created_date", "updated_date"]
}
```

#### Department Entity (RBAC)
```json
{
  "name": "Department",
  "type": "object",
  "properties": {
    "id": { "type": "string", "description": "Unique department identifier" },
    "name": { "type": "string", "description": "Department name" },
    "description": { "type": "string", "description": "Department description" },
    "icon": { "type": "string", "description": "Department icon (emoji or icon name)" },
    "color": { "type": "string", "description": "Department color for UI display" },
    "parent_department_id": { "type": "string", "description": "Parent department ID for hierarchical structure" },
    "head_user_id": { "type": "string", "description": "User ID of department head" },
    "budget": { "type": "number", "description": "Department budget" },
    "created_date": { "type": "string", "description": "Department creation timestamp" },
    "updated_date": { "type": "string", "description": "Department last update timestamp" },
    "status": { "type": "string", "default": "active", "enum": ["active", "inactive", "archived"] }
  },
  "required": ["id", "name", "color", "created_date", "updated_date"]
}
```

#### Role-Permission Relationship (RBAC)
```json
{
  "name": "RolePermission",
  "type": "object",
  "properties": {
    "id": { "type": "string", "description": "Unique relationship identifier" },
    "role_id": { "type": "string", "description": "Role ID" },
    "permission_id": { "type": "string", "description": "Permission ID" },
    "granted_date": { "type": "string", "description": "When this permission was granted to the role" },
    "granted_by": { "type": "string", "description": "User ID who granted this permission" },
    "is_inherited": { "type": "boolean", "default": false, "description": "Whether this permission is inherited" },
    "inherited_from_role_id": { "type": "string", "description": "Role ID this permission was inherited from" },
    "status": { "type": "string", "default": "active", "enum": ["active", "revoked"] }
  },
  "required": ["id", "role_id", "permission_id", "granted_date"],
  "unique_constraints": ["role_id", "permission_id"]
}
```

#### User-Role Relationship (RBAC)
```json
{
  "name": "UserRole",
  "type": "object",
  "properties": {
    "id": { "type": "string", "description": "Unique relationship identifier" },
    "user_id": { "type": "string", "description": "User ID" },
    "role_id": { "type": "string", "description": "Role ID" },
    "assigned_date": { "type": "string", "description": "When this role was assigned to the user" },
    "assigned_by": { "type": "string", "description": "User ID who assigned this role" },
    "expires_at": { "type": "string", "description": "Role expiration date (optional)" },
    "is_primary": { "type": "boolean", "default": false, "description": "Whether this is the user's primary role" },
    "status": { "type": "string", "default": "active", "enum": ["active", "suspended", "revoked"] }
  },
  "required": ["id", "user_id", "role_id", "assigned_date"],
  "unique_constraints": ["user_id", "role_id"]
}
```

---

## 🎨 UI Components

### Component Library

**Base Components** (`components/ui/`):
- `Button.jsx` - Styled button component
- `Card.jsx` - Card container component
- `Input.jsx` - Form input component
- `Badge.jsx` - Status badge component
- `Table.jsx` - Data table component
- `Dialog.jsx` - Modal dialog component
- `Select.jsx` - Dropdown select component
- `Tabs.jsx` - Tab navigation component
- `Sidebar.jsx` - Navigation sidebar component

**Feature Components**:
- `LoginForm.jsx` - Authentication form
- `RouteGuard.jsx` - Route protection component
- `PermissionGate.jsx` - Permission-based rendering

### Design System

**Color Palette**:
- Primary: Emerald (Islamic green theme)
- Secondary: Teal
- Accent: Light green
- Background: Gradient from emerald-50 to teal-50

**Typography**:
- Headings: Bold, emerald-900
- Body: Medium weight, emerald-700
- Labels: Semibold, emerald-800

**Layout**:
- Responsive design
- Mobile-first approach
- Sidebar navigation
- Card-based content areas

---

## 📚 Feature Implementation History

### Phase 1: Project Setup & Basic Structure
**Date**: Initial Setup
**Features Added**:
- React + Vite project setup
- Express.js server with JSON-based data
- Basic routing structure
- Tailwind CSS styling
- Entity schema definitions

### Phase 2: Authentication System
**Date**: Authentication Implementation
**Features Added**:
- Mock authentication service
- Login form component
- Basic user management
- Session handling
- Route protection

### Phase 3: Role-Based Access Control (RBAC)
**Date**: RBAC Implementation
**Features Added**:
- Comprehensive permission system
- Role hierarchy definition
- Permission-based UI filtering
- Route guards with role requirements
- Navigation filtering based on permissions

### Phase 4: State Management Enhancement
**Date**: State Management Implementation
**Features Added**:
- Persistent authentication state
- Custom authentication service
- State persistence across page refreshes
- Event-driven state updates
- Token management system

### Phase 5: Data Management
**Date**: Data Management Implementation
**Features Added**:
- JSON-based data storage
- Sample data generation
- Data import/export functionality
- Entity management classes
- API endpoint implementation

### Phase 6: UI/UX Improvements
**Date**: UI Enhancement
**Features Added**:
- Islamic-themed design
- Responsive layout
- Modern component library
- Loading states
- Error handling
- User feedback systems

### Phase 7: Super Admin Fix
**Date**: Permission Bug Fix
**Features Added**:
- Fixed super admin permissions
- Enhanced permission checking logic
- Complete permission set for super admin
- Improved navigation filtering

### Phase 8: State Management Enhancement
**Date**: September 16, 2025
**Features Added**:
- **Persistent Authentication State**: Implemented robust state management that survives page refreshes
- **Enhanced Authentication Service**: Created comprehensive auth service with token management
- **Route Protection System**: Implemented RouteGuard component for secure navigation
- **Automatic Login Prevention**: Removed automatic admin login, requiring explicit authentication
- **Role-Based State Preservation**: User roles and permissions maintained across sessions
- **Event-Driven State Updates**: Real-time state synchronization across components

**Technical Details**:
- Created `authService.jsx` with persistent token management
- Implemented localStorage-based state persistence
- Added automatic token validation and refresh
- Created RouteGuard component for route protection
- Enhanced AuthContext with proper state management
- Fixed React Router nested routes structure

**API Changes**:
- Enhanced authentication endpoints with proper token handling
- Added token validation and refresh mechanisms
- Improved error handling for authentication failures

### Phase 9: Comprehensive Documentation System
**Date**: September 16, 2025
**Features Added**:
- **Complete Technical Documentation**: Created comprehensive DOCUMENTATION.md with all system details
- **Automated Documentation Maintenance**: Built script-based documentation updater
- **Project README**: Created detailed README.md with quick start guide
- **Feature Implementation History**: Documented all phases and implementations
- **API Documentation**: Complete endpoint documentation with examples
- **Database Schema Documentation**: Detailed entity definitions and relationships
- **Development Guidelines**: Coding standards and best practices
- **Version Control System**: Automated version tracking and changelog generation

**Technical Details**:
- Created `DOCUMENTATION.md` with 690+ lines of comprehensive documentation
- Built `scripts/update-docs.js` for automated documentation maintenance
- Implemented CLI interface for documentation updates
- Added version control and changelog generation
- Created structured documentation with table of contents
- Documented all authentication, RBAC, and state management systems

**Documentation Features**:
- Project overview and architecture details
- Complete API endpoint documentation
- Database schema with JSON definitions
- UI component library documentation
- Feature implementation timeline
- Development and deployment guidelines
- Future enhancement roadmap

### Phase 10: Student Schedule Dashboard
**Date**: September 16, 2025
**Features Added**:
- **Student Schedule Module**: Complete schedule viewing system for students
- **Weekly Timetable**: Interactive weekly schedule with day and subject filters
- **Today's Classes Card**: Real-time display of current day's classes
- **Next Class Highlight**: Upcoming class with countdown timer
- **Subject Hours Distribution**: Pie chart showing weekly hours per subject
- **Weekly Workload Overview**: Bar chart displaying classes per day
- **Mobile-Optimized View**: Swipe navigation between days on mobile
- **Schedule Data Management**: Complete CRUD API for schedule management
- **Calendar Integration**: Download timetable and sync with external calendars

**Technical Details**:
- Created `Schedule.json` entity schema with comprehensive schedule properties
- Implemented schedule API endpoints (`/api/schedules/*`) with filtering and student-specific queries
- Built `Schedule.jsx` entity class with data processing and utility methods
- Created `StudentDashboard.jsx` with responsive design and interactive charts
- Added schedule data generation with realistic weekly timetable for Grade 6 student
- Implemented mobile-first design with swipe navigation and touch-friendly interface
- Added Recharts integration for data visualization (pie and bar charts)
- Created schedule filtering system (day and subject filters)
- Implemented time-based calculations for next class and countdown timers

**API Changes**:
- Added `/api/schedules` - List all schedules with filtering
- Added `/api/schedules/student/:studentId` - Get student's complete schedule
- Added `/api/schedules/student/:studentId/today` - Get today's classes
- Added `/api/schedules/student/:studentId/next` - Get next upcoming class
- Added schedule CRUD operations (POST, PUT, DELETE) for admin/teacher management
- Enhanced health check endpoint to include schedule data count

**UI/UX Features**:
- Islamic-themed design with emerald color scheme
- Responsive layout optimized for mobile and desktop
- Interactive charts with hover tooltips and legends
- Real-time data updates and loading states
- Touch-friendly mobile navigation with swipe gestures
- Accessible design with proper contrast and keyboard navigation
- Quick actions for downloading timetable and calendar sync

### Phase 11: Student Dashboard Role-Based Fix
**Date**: September 16, 2025
**Features Added**:
- **Role-Based Dashboard Routing**: Students now see student-specific dashboard instead of admin dashboard
- **Student Dashboard Integration**: Main dashboard component now redirects students to StudentDashboard
- **Proper Role Detection**: Dashboard component uses auth context to determine user role
- **Student-Specific Content**: Students see schedule-focused dashboard with their timetable

**Technical Details**:
- Modified main Dashboard component to check user role from auth context
- Added conditional rendering to show StudentDashboard for student role
- Removed duplicate user loading logic in favor of auth context
- Fixed dashboard routing to prevent students from seeing admin statistics
- Ensured proper role-based content display

**Bug Fixes**:
- Fixed issue where students were seeing admin dashboard content
- Resolved role-based dashboard display problems
- Ensured students see appropriate schedule-focused interface

### Phase 12: Academics Navigation Structure
**Date**: September 16, 2025
**Features Added**:
- **Nested Navigation Structure**: Created Academics parent tab with sub-items
- **My Schedule Sub-Tab**: Moved schedule from main navigation to Academics > My Schedule
- **Improved Navigation UX**: Better organization of academic-related features
- **Role-Based Sub-Navigation**: Sub-items respect user permissions and roles

**Technical Details**:
- Updated navigation structure to support nested items with `subItems` property
- Modified sidebar rendering logic to handle parent-child navigation relationships
- Updated routing from `/schedule` to `/academics/schedule`
- Restored main Dashboard component to show admin content for non-students
- Enhanced navigation filtering to include sub-item permission checks

**Navigation Structure**:
- **Academics** (Parent)
  - **Hifz Progress** - Available to all roles
  - **My Schedule** - Student-only sub-tab
- **Dashboard** - Shows admin statistics (not student schedule)
- **Other tabs** - Remain as top-level navigation items

**UI/UX Improvements**:
- Parent items display as section headers with icons
- Sub-items are indented and styled differently
- Proper hover states and active highlighting for nested navigation
- Consistent permission-based filtering for both parent and child items

### Phase 13: Assignment Progress Module
**Date**: September 16, 2025
**Features Added**:
- **Assignment Entity Schema**: Complete assignment data structure with status tracking
- **Assignment API Endpoints**: Full CRUD operations for assignment management
- **Assignment Progress Dashboard**: Student-focused assignment tracking interface
- **Assignment Navigation**: Added Assignment Progress sub-tab under Academics
- **Assignment Status Management**: Pending, In Progress, Completed, Overdue statuses
- **Assignment File Management**: Download and upload functionality for assignments
- **Assignment Analytics**: Charts and statistics for assignment progress

**Technical Details**:
- Created `Assignment.json` entity schema with comprehensive assignment properties
- Implemented assignment API endpoints (`/api/assignments/*`) with filtering and student-specific queries
- Built `Assignment.jsx` entity class with data processing and utility methods
- Created `AssignmentProgress.jsx` dashboard with responsive design and interactive charts
- Added assignment sample data with realistic academic assignments for Grade 5 student
- Implemented assignment status tracking and deadline management
- Added assignment filtering system (status and subject filters)
- Created assignment submission and download functionality

**API Endpoints**:
- Added `/api/assignments` - List all assignments with filtering
- Added `/api/assignments/student/:studentId` - Get student's assignments
- Added `/api/assignments/student/:studentId/stats` - Get assignment statistics
- Added assignment CRUD operations (GET, POST, PUT, DELETE) for management
- Added `/api/assignments/:id/submit` - Submit assignment with file upload
- Enhanced health check endpoint to include assignment data count

**UI/UX Features**:
- Islamic-themed design with emerald color scheme
- Responsive layout optimized for mobile and desktop
- Interactive charts (pie chart for status distribution, line chart for timeline)
- Real-time data updates and loading states
- Assignment status badges with color coding
- File download and upload functionality
- Assignment filtering and search capabilities
- Quick actions for bulk operations
- Deadline tracking with visual indicators

---

## 🛠️ Development Guidelines

### Code Standards
- **JavaScript**: ES6+ features, async/await
- **React**: Functional components with hooks
- **Styling**: Tailwind CSS utility classes
- **File Naming**: PascalCase for components, camelCase for utilities
- **Comments**: JSDoc for functions, inline comments for complex logic

### Git Workflow
- **Main Branch**: `main` (production-ready code)
- **Feature Branches**: `feature/feature-name`
- **Commit Messages**: Conventional commits format
- **Pull Requests**: Required for all changes

### Testing Strategy
- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: API endpoint testing
- **E2E Tests**: User workflow testing
- **Manual Testing**: Role-based access verification

### Deployment
- **Frontend**: Vite build to static files
- **Backend**: Node.js server with PM2
- **Environment**: Development, Staging, Production
- **Configuration**: Environment variables for API URLs

### Performance Optimization
- **Code Splitting**: Route-based lazy loading
- **Bundle Optimization**: Vite build optimization
- **Caching**: Local storage for user data
- **API Optimization**: Efficient data fetching

---

## 🔮 Future Enhancements

### Planned Features
1. **Real Database Integration** (PostgreSQL/MongoDB)
2. **Advanced Reporting System** (PDF generation, charts)
3. **Messaging System** (Teacher-Parent communication)
4. **Mobile App** (React Native)
5. **Advanced Analytics** (Student performance tracking)
6. **Multi-language Support** (Arabic, English, Urdu)
7. **Calendar Integration** (Academic calendar, events)
8. **Library Management** (Book tracking, borrowing)
9. **Transport Management** (Bus routes, tracking)
10. **Advanced Security** (2FA, audit logs)

### Technical Improvements
1. **API Documentation** (Swagger/OpenAPI)
2. **Automated Testing** (CI/CD pipeline)
3. **Performance Monitoring** (Error tracking, analytics)
4. **Backup System** (Automated data backup)
5. **Scalability** (Microservices architecture)

---

## 📞 Support & Maintenance

### Documentation Updates
This documentation should be updated with each new feature implementation, including:
- Feature description and purpose
- Technical implementation details
- API changes and new endpoints
- Database schema modifications
- UI/UX changes
- Configuration updates

### Phase 14: Complete RBAC Database System Implementation
**Date**: September 17, 2025
**Features Added**:
- **Full Database Integration**: Complete RBAC system with real database operations, not just frontend demos
- **Entity-Based Architecture**: Proper database entities for roles, permissions, departments, and relationships
- **RESTful API Endpoints**: Complete CRUD operations for all RBAC entities
- **Role Inheritance System**: Automatic permission inheritance with visual indicators
- **Admin Console**: Full-featured role and permission management interface
- **Granular Permission System**: 69 specific permissions across 11 categories
- **Department Management**: Complete department CRUD with hierarchical structure
- **User-Role Assignments**: Many-to-many relationship management
- **Permission Inheritance**: Visual inheritance indicators and automatic permission calculation

**Technical Implementation**:

#### **Backend Database Entities**:

**1. Role Entity (`server/Entities/Role.json`)**:
```json
{
  "id": "role_superadmin",
  "name": "SuperAdmin", 
  "description": "Full control over all clusters, organizations, departments, and users.",
  "color": "rose",
  "isRootRole": true,
  "inheritsFrom": [],
  "departments": [],
  "status": "active"
}
```

**2. Permission Entity (`server/Entities/Permission.json`)**:
```json
{
  "id": "view_users",
  "name": "View Users",
  "description": "View user accounts and information", 
  "category": "User Management",
  "action": "read",
  "resource": "users",
  "status": "active"
}
```

**3. Department Entity (`server/Entities/Department.json`)**:
```json
{
  "id": "dept_arabic_studies",
  "name": "Arabic Studies",
  "description": "Department for Arabic language and literature studies",
  "icon": "📚",
  "color": "#3B82F6",
  "parent_department_id": null,
  "budget": 50000,
  "status": "active"
}
```

**4. Role-Permission Relationship (`server/Entities/RolePermission.json`)**:
```json
{
  "id": "uuid",
  "role_id": "role_teacher",
  "permission_id": "view_students", 
  "granted_date": "2025-09-17T10:52:11.711Z",
  "is_inherited": false,
  "status": "active"
}
```

**5. User-Role Relationship (`server/Entities/UserRole.json`)**:
```json
{
  "id": "uuid",
  "user_id": "user_id",
  "role_id": "role_teacher",
  "assigned_date": "2025-09-17T10:52:11.711Z",
  "is_primary": true,
  "status": "active"
}
```

#### **RESTful API Endpoints**:

**Role Management**:
```
GET    /api/roles              # List all roles
POST   /api/roles              # Create new role
GET    /api/roles/:id          # Get role by ID
PUT    /api/roles/:id          # Update role
DELETE /api/roles/:id          # Delete role
```

**Permission Management**:
```
GET    /api/permissions        # List all permissions (with filtering)
POST   /api/permissions        # Create new permission
GET    /api/permissions/:id    # Get permission by ID
PUT    /api/permissions/:id    # Update permission
DELETE /api/permissions/:id    # Delete permission
```

**Department Management**:
```
GET    /api/departments        # List all departments
POST   /api/departments        # Create new department
GET    /api/departments/:id    # Get department by ID
PUT    /api/departments/:id    # Update department
DELETE /api/departments/:id    # Delete department
```

**Role-Permission Management**:
```
GET    /api/role-permissions   # List role-permission mappings
POST   /api/role-permissions   # Assign permission to role
DELETE /api/role-permissions/:id # Remove permission from role
```

**User-Role Management**:
```
GET    /api/user-roles         # List user-role mappings
POST   /api/user-roles         # Assign role to user
DELETE /api/user-roles/:id     # Remove role from user
```

**User Permissions (with Inheritance)**:
```
GET    /api/users/:userId/permissions # Get user's effective permissions
```

#### **Frontend API Service (`services/rbacService.jsx`)**:
- **Complete CRUD Operations**: All RBAC entities with full CRUD support
- **Bulk Operations**: Role-permission management with bulk updates
- **Error Handling**: Comprehensive error handling and loading states
- **Singleton Pattern**: Consistent API service instance
- **Permission Inheritance**: Automatic permission calculation with inheritance

#### **Admin Console (`pages/AdminConsole.jsx`)**:
- **Real API Integration**: No more hardcoded data, all operations use real API
- **Dynamic Permission Categories**: Permissions loaded from database and grouped by category
- **Role Inheritance UI**: Visual inheritance indicators with amber badges for inherited permissions
- **Color Palette**: 21-color palette for role differentiation
- **Loading States**: Spinner and error handling for all operations
- **Permission Management**: Granular permission toggles with inheritance protection

**Database Initialization**:

**Default Roles (5)**:
| Role ID | Name | Color | Inherits From | Description |
|---------|------|-------|---------------|-------------|
| `role_superadmin` | SuperAdmin | rose | None | Full control over all clusters, organizations, departments, and users |
| `role_admin` | Admin | slate | Teacher, Student, Parent | Admin of a cluster or organization. Manages staff, roles, and settings |
| `role_teacher` | Teacher | emerald | Student | Handles academic content, student performance, and class scheduling |
| `role_student` | Student | sky | None | Can view their schedule, assignments, exams, and personal progress |
| `role_parent` | Parent | amber | None | Guardian role for tracking a child's progress and financial dues |

**Default Departments (4)**:
| Department ID | Name | Icon | Color | Budget | Description |
|---------------|------|------|-------|--------|-------------|
| `dept_arabic_studies` | Arabic Studies | 📚 | #3B82F6 | $50,000 | Department for Arabic language and literature studies |
| `dept_science_modern` | Science & Modern Studies | 🔬 | #10B981 | $45,000 | Department for science and modern education subjects |
| `dept_hifz_memorization` | Hifz & Memorization | 📖 | #8B5CF6 | $60,000 | Department for Quran memorization and Hifz studies |
| `dept_primary_education` | Primary Education | 🎒 | #F59E0B | $40,000 | Department for primary level education |

**Permission Categories (69 Permissions)**:

**1. User Management (5 permissions)**:
- `view_users`, `add_users`, `edit_users`, `delete_users`, `assign_roles`

**2. Academic Management (13 permissions)**:
- `view_schedule`, `add_schedule`, `edit_schedule`, `delete_schedule`
- `view_assignments`, `add_assignments`, `edit_assignments`, `delete_assignments`
- `view_exams`, `add_exams`, `edit_exams`, `delete_exams`, `grade_exams`

**3. Student Management (9 permissions)**:
- `view_students`, `add_students`, `edit_students`, `delete_students`
- `view_attendance`, `mark_attendance`, `edit_attendance`
- `view_progress`, `update_progress`

**4. Teacher Management (6 permissions)**:
- `view_teachers`, `add_teachers`, `edit_teachers`, `delete_teachers`
- `assign_subjects`, `assign_classes`

**5. Finance Management (8 permissions)**:
- `view_finances`, `add_finances`, `edit_finances`, `delete_finances`
- `view_fees`, `manage_fees`, `view_donations`, `manage_donations`

**6. Department Management (5 permissions)**:
- `view_departments`, `add_departments`, `edit_departments`, `delete_departments`
- `assign_roles_department`

**7. Role & Permission Management (5 permissions)**:
- `view_roles`, `add_roles`, `edit_roles`, `delete_roles`, `manage_permissions`

**8. Reports & Analytics (3 permissions)**:
- `view_reports`, `generate_reports`, `export_reports`

**9. Data Management (5 permissions)**:
- `view_data`, `import_data`, `export_data`, `backup_data`, `restore_data`

**10. Messaging & Notifications (5 permissions)**:
- `view_messages`, `send_messages`, `send_notifications`, `receive_notifications`, `manage_announcements`

**11. System Administration (5 permissions)**:
- `view_settings`, `configure_settings`, `view_logs`, `manage_backups`, `system_maintenance`

**Role-Permission Mappings (133 mappings)**:
- **SuperAdmin**: All 69 permissions
- **Admin**: 25 permissions (inherits from Teacher, Student, Parent)
- **Teacher**: 15 permissions (inherits from Student)
- **Student**: 6 permissions
- **Parent**: 5 permissions

**User-Role Mappings (3 mappings)**:
- Admin user → SuperAdmin role
- Teacher users → Teacher role

**Key Features**:

**1. Role Inheritance System**:
```javascript
// Automatic permission inheritance with visual indicators
const getAllPermissionsForRole = (role, allRoles) => {
  const permissions = new Set(role.permissions || []);
  
  // Add inherited permissions recursively
  if (role.inheritsFrom && role.inheritsFrom.length > 0) {
    role.inheritsFrom.forEach(parentRoleId => {
      const parentRole = allRoles.find(r => r.id === parentRoleId);
      if (parentRole) {
        const parentPermissions = getAllPermissionsForRole(parentRole, allRoles);
        parentPermissions.forEach(permission => permissions.add(permission));
      }
    });
  }
  
  return Array.from(permissions);
};
```

**2. Visual Inheritance Indicators**:
- **Inherited Permissions**: Amber badges with "Inherited" label
- **Direct Permissions**: Green badges, toggleable
- **Disabled Toggles**: Inherited permissions cannot be removed
- **Permission Summary**: Shows count and list of inherited permissions

**3. Color Palette System**:
- **21 Color Options**: rose, slate, emerald, sky, amber, blue, green, purple, orange, red, yellow, pink, indigo, cyan, teal, lime, gray, zinc, neutral, stone, slate
- **Role Differentiation**: Visual role identification through colors
- **Consistent Theming**: Unified color system across all components

**4. Real Database Operations**:
- **No Hardcoded Data**: All operations use real API calls
- **Persistent Storage**: Changes are saved to database
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Relationship Management**: Proper many-to-many relationship handling

**5. Admin Console Features**:
- **Role Management**: Create, edit, delete roles with inheritance
- **Permission Management**: Granular permission assignment with visual indicators
- **Department Management**: Complete department CRUD operations
- **User-Role Assignment**: Assign multiple roles to users
- **Loading States**: Spinner and error handling for all operations
- **Error Recovery**: Retry functionality for failed operations

**Server Status**:
```
✅ Server Running: http://localhost:3001
✅ RBAC Data Loaded:
   - 5 Roles
   - 69 Permissions  
   - 4 Departments
   - 133 Role-Permission Mappings
   - 3 User-Role Mappings
```

**Security Features**:
- **Principle of Least Privilege**: Users only get permissions they need
- **Role Inheritance**: Automatic permission inheritance reduces errors
- **Root Role Protection**: SuperAdmin role cannot be deleted
- **Permission Validation**: Server-side permission checking
- **Audit Trail Ready**: System designed for future audit logging

**RBAC System Architecture**:

#### **File Structure**:
```
MadarsaERP/
├── server/
│   ├── Entities/
│   │   ├── Role.json            # Role entity schema
│   │   ├── Permission.json      # Permission entity schema
│   │   ├── Department.json      # Department entity schema
│   │   ├── RolePermission.json  # Role-Permission relationship
│   │   └── UserRole.json        # User-Role relationship
│   └── server.js                # Enhanced with RBAC API endpoints
└── client/src/
    ├── services/
    │   └── rbacService.jsx      # RBAC API service
    ├── pages/
    │   └── AdminConsole.jsx     # RBAC management interface
    ├── config/
    │   └── rbac.jsx             # Core RBAC configuration
    ├── utils/
    │   ├── rbacPermissions.jsx  # Permission management system
    │   └── roleColors.jsx       # Role-based color system
    └── contexts/
        └── RBACAuthContext.jsx  # Enhanced authentication context
```

#### **Usage Examples**:

**API Service Usage**:
```javascript
import rbacService from '../services/rbacService.jsx';

// Get all roles
const roles = await rbacService.getRoles();

// Create new role
const newRole = await rbacService.createRole({
  id: 'role_custom',
  name: 'Custom Role',
  description: 'Custom role description',
  color: 'blue',
  inheritsFrom: ['role_student']
});

// Update role permissions
await rbacService.updateRolePermissions('role_teacher', [
  'view_students', 'add_students', 'edit_students'
]);

// Get user permissions with inheritance
const userPermissions = await rbacService.getUserPermissions('user_id');
```

**Admin Console Usage**:
```javascript
// Role creation with inheritance
const role = {
  id: 'role_senior_teacher',
  name: 'Senior Teacher',
  description: 'Senior teacher with additional permissions',
  color: 'purple',
  inheritsFrom: ['role_teacher'], // Inherits all teacher permissions
  permissions: ['manage_assignments', 'grade_exams'] // Additional permissions
};

// Permission management with visual indicators
const isInherited = isPermissionInherited('view_students'); // true if inherited
const inheritedPermissions = getInheritedPermissions(); // Array of inherited permissions
```

**Database Operations**:
```javascript
// Role-Permission relationship
const rolePermission = {
  role_id: 'role_teacher',
  permission_id: 'view_students',
  granted_date: new Date().toISOString(),
  is_inherited: false,
  status: 'active'
};

// User-Role assignment
const userRole = {
  user_id: 'user_123',
  role_id: 'role_teacher',
  assigned_date: new Date().toISOString(),
  is_primary: true,
  status: 'active'
};
```

**Permission Inheritance Logic**:
```javascript
// Automatic permission calculation
const getAllPermissionsForRole = (role, allRoles) => {
  const permissions = new Set(role.permissions || []);
  
  // Add inherited permissions recursively
  if (role.inheritsFrom && role.inheritsFrom.length > 0) {
    role.inheritsFrom.forEach(parentRoleId => {
      const parentRole = allRoles.find(r => r.id === parentRoleId);
      if (parentRole) {
        const parentPermissions = getAllPermissionsForRole(parentRole, allRoles);
        parentPermissions.forEach(permission => permissions.add(permission));
      }
    });
  }
  
  return Array.from(permissions);
};
```

**Migration from Hardcoded System**:
- **Real Database**: All RBAC data now stored in database, not hardcoded
- **API Integration**: AdminConsole uses real API calls instead of local state
- **Persistent Changes**: All role/permission changes are saved to database
- **Production Ready**: System ready for production deployment with real database

### Version History
- **v1.0.0**: Initial release with basic functionality
- **v1.1.0**: Enhanced authentication and RBAC
- **v1.2.0**: State management improvements
- **v1.3.0**: Data management features
- **v1.4.0**: UI/UX enhancements
- **v1.5.0**: Super admin permission fixes
- **v1.6.0**: Persistent state management and route protection
- **v1.7.0**: Comprehensive documentation system
- **v1.8.0**: Student Schedule Dashboard with interactive timetable
- **v1.9.0**: Student Dashboard role-based fix and proper routing
- **v1.10.0**: Academics navigation structure with nested sub-tabs
- **v1.11.0**: Assignment Progress module with full CRUD operations
- **v1.12.0**: UI Color Scheme Overhaul for improved accessibility and aesthetics
- **v1.13.0**: Comprehensive RBAC System Implementation with role hierarchy and department-based access control
- **v1.14.0**: Complete RBAC Database System Implementation with real database operations, entity-based architecture, and full CRUD functionality

---

*Last Updated: September 17, 2025*
*Version: 1.14.0*
*Maintainer: Development Team*
