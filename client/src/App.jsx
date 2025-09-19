import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Layout from './layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Students from './pages/Students.jsx';
import DataManagement from './pages/DataManagement.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import AssignmentProgress from './pages/AssignmentProgress.jsx';
import AdminConsole from './pages/AdminConsole.jsx';
import LoginForm from './components/LoginForm.jsx';
import RouteGuard from './components/RouteGuard.jsx';

// Create simple components for coming soon pages
const TeachersPage = () => <div className="p-8"><h1 className="text-2xl font-bold">Teachers - Coming Soon</h1></div>;
const GuardiansPage = () => <div className="p-8"><h1 className="text-2xl font-bold">Guardians - Coming Soon</h1></div>;
const AdmissionsPage = () => <div className="p-8"><h1 className="text-2xl font-bold">Admissions - Coming Soon</h1></div>;
const FinancePage = () => <div className="p-8"><h1 className="text-2xl font-bold">Finance - Coming Soon</h1></div>;
const AcademicsPage = () => <div className="p-8"><h1 className="text-2xl font-bold">Academics - Coming Soon</h1></div>;
const HifzProgressPage = () => <div className="p-8"><h1 className="text-2xl font-bold">Hifz Progress - Coming Soon</h1></div>;
const AttendancePage = () => <div className="p-8"><h1 className="text-2xl font-bold">Attendance - Coming Soon</h1></div>;
const ExamsPage = () => <div className="p-8"><h1 className="text-2xl font-bold">Exams - Coming Soon</h1></div>;
const ReportsPage = () => <div className="p-8"><h1 className="text-2xl font-bold">Reports - Coming Soon</h1></div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Layout />}>
            <Route index element={
              <RouteGuard>
                <Dashboard />
              </RouteGuard>
            } />
            <Route path="academics/schedule" element={
              <RouteGuard requiredRoles={['student']}>
                <StudentDashboard />
              </RouteGuard>
            } />
            <Route path="academics/assignments" element={
              <RouteGuard requiredRoles={['student']}>
                <AssignmentProgress />
              </RouteGuard>
            } />
            <Route path="students" element={
              <RouteGuard requiredRoles={['super_admin', 'admin', 'teacher']}>
                <Students />
              </RouteGuard>
            } />
            <Route path="teachers" element={
              <RouteGuard requiredRoles={['super_admin', 'admin']}>
                <TeachersPage />
              </RouteGuard>
            } />
            <Route path="guardians" element={
              <RouteGuard requiredRoles={['super_admin', 'admin']}>
                <GuardiansPage />
              </RouteGuard>
            } />
            <Route path="admissions" element={
              <RouteGuard requiredRoles={['super_admin', 'admin']}>
                <AdmissionsPage />
              </RouteGuard>
            } />
            <Route path="finance" element={
              <RouteGuard requiredRoles={['super_admin', 'admin']}>
                <FinancePage />
              </RouteGuard>
            } />
            <Route path="academics" element={
              <RouteGuard requiredRoles={['super_admin', 'admin', 'teacher']}>
                <AcademicsPage />
              </RouteGuard>
            } />
            <Route path="hifz-progress" element={
              <RouteGuard requiredRoles={['super_admin', 'admin', 'teacher', 'guardian', 'student']}>
                <HifzProgressPage />
              </RouteGuard>
            } />
            <Route path="attendance" element={
              <RouteGuard requiredRoles={['super_admin', 'admin', 'teacher']}>
                <AttendancePage />
              </RouteGuard>
            } />
            <Route path="exams" element={
              <RouteGuard requiredRoles={['super_admin', 'admin', 'teacher']}>
                <ExamsPage />
              </RouteGuard>
            } />
            <Route path="reports" element={
              <RouteGuard requiredRoles={['super_admin', 'admin', 'teacher']}>
                <ReportsPage />
              </RouteGuard>
            } />
            <Route path="data-management" element={
              <RouteGuard requiredRoles={['super_admin', 'admin']}>
                <DataManagement />
              </RouteGuard>
            } />
            <Route path="admin-console" element={
              <RouteGuard requiredRoles={['super_admin']}>
                <AdminConsole />
              </RouteGuard>
            } />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
