import { getRoleById } from '../config/rbac.jsx';

// Utility function for consistent role badge colors across the application
export const getRoleBadgeColor = (role) => {
  console.log('Role badge color requested for:', role); // Debug log
  
  // Handle both old role names and new RBAC role IDs
  const roleMapping = {
    'super_admin': 'role_superadmin',
    'admin': 'role_admin', 
    'teacher': 'role_teacher',
    'guardian': 'role_parent',
    'parent': 'role_parent',
    'student': 'role_student'
  };
  
  const roleId = roleMapping[role] || role;
  const roleConfig = getRoleById(roleId);
  
  if (roleConfig) {
    const color = `!bg-${roleConfig.color}-100 !text-${roleConfig.color}-800 !border-${roleConfig.color}-200`;
    console.log('Returning role color:', color); // Debug log
    return color;
  }
  
  // Fallback for unknown roles
  const fallbackColor = '!bg-slate-100 !text-slate-800 !border-slate-200';
  console.log('Returning fallback color:', fallbackColor); // Debug log
  return fallbackColor;
};

// Get role display name
export const getRoleDisplayName = (role) => {
  // Handle both old role names and new RBAC role IDs
  const roleMapping = {
    'super_admin': 'role_superadmin',
    'admin': 'role_admin', 
    'teacher': 'role_teacher',
    'guardian': 'role_parent',
    'parent': 'role_parent',
    'student': 'role_student'
  };
  
  const roleId = roleMapping[role] || role;
  const roleConfig = getRoleById(roleId);
  
  if (roleConfig) {
    return roleConfig.name;
  }
  
  // Fallback for unknown roles
  return role;
};

// Get role icon
export const getRoleIcon = (role) => {
  // Handle both old role names and new RBAC role IDs
  const roleMapping = {
    'super_admin': 'role_superadmin',
    'admin': 'role_admin', 
    'teacher': 'role_teacher',
    'guardian': 'role_parent',
    'parent': 'role_parent',
    'student': 'role_student'
  };
  
  const roleId = roleMapping[role] || role;
  const roleConfig = getRoleById(roleId);
  
  if (roleConfig) {
    return roleConfig.icon;
  }
  
  // Fallback for unknown roles
  return '👤';
};

// Get day badge color for schedule
export const getDayBadgeColor = (day) => {
  console.log('Day badge color requested for:', day); // Debug log
  const colors = {
    Monday: '!bg-slate-500 !text-white !border-slate-600',
    Tuesday: '!bg-emerald-500 !text-white !border-emerald-600',
    Wednesday: '!bg-purple-500 !text-white !border-purple-600',
    Thursday: '!bg-amber-500 !text-white !border-amber-600',
    Friday: '!bg-rose-500 !text-white !border-rose-600',
    Saturday: '!bg-sky-500 !text-white !border-sky-600',
    Sunday: '!bg-pink-500 !text-white !border-pink-600'
  };
  const color = colors[day] || '!bg-gray-500 !text-white !border-gray-600';
  console.log('Returning color:', color); // Debug log
  return color;
};

// Get status badge color for assignments and other statuses
export const getStatusBadgeColor = (status) => {
  const colors = {
    pending: '!bg-amber-100 !text-amber-800 !border-amber-200',
    in_progress: '!bg-sky-100 !text-sky-800 !border-sky-200',
    completed: '!bg-emerald-100 !text-emerald-800 !border-emerald-200',
    overdue: '!bg-rose-100 !text-rose-800 !border-rose-200',
    active: '!bg-emerald-100 !text-emerald-800 !border-emerald-200',
    inactive: '!bg-slate-100 !text-slate-800 !border-slate-200',
    graduated: '!bg-purple-100 !text-purple-800 !border-purple-200',
    suspended: '!bg-amber-100 !text-amber-800 !border-amber-200'
  };
  return colors[status] || '!bg-slate-100 !text-slate-800 !border-slate-200';
};

// Get button color schemes for consistent design
export const getButtonColors = (variant = 'primary') => {
  const colors = {
    primary: '!bg-emerald-100 !text-emerald-800 !border-emerald-200',
    secondary: 'bg-slate-600 hover:bg-slate-700 text-white',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    warning: 'bg-amber-600 hover:bg-amber-700 text-white',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white',
    info: 'bg-sky-600 hover:bg-sky-700 text-white',
    outline: 'border-emerald-300 text-emerald-700 hover:bg-emerald-50',
    outlineSecondary: 'border-slate-300 text-slate-700 hover:bg-slate-50'
  };
  return colors[variant] || colors.primary;
};

// Get card color schemes
export const getCardColors = (variant = 'default') => {
  const colors = {
    default: 'bg-white border-slate-200',
    primary: 'bg-emerald-50 border-emerald-200',
    secondary: 'bg-slate-50 border-slate-200',
    success: 'bg-emerald-50 border-emerald-200',
    warning: 'bg-amber-50 border-amber-200',
    danger: 'bg-rose-50 border-rose-200',
    info: 'bg-sky-50 border-sky-200'
  };
  return colors[variant] || colors.default;
};
