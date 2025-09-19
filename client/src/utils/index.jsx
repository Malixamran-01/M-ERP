export const createPageUrl = (pageName) => {
  const routes = {
    'Dashboard': '/',
    'Students': 'students',
    'Teachers': 'teachers',
    'Guardians': 'guardians',
    'Admissions': 'admissions',
    'Finance': 'finance',
    'Academics': 'academics',
    'HifzProgress': 'hifz-progress',
    'Attendance': 'attendance',
    'Exams': 'exams',
    'Reports': 'reports',
    'DataManagement': 'data-management'
  };
  
  return routes[pageName] || '/';
};
