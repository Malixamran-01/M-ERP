import React, { useState, useEffect } from 'react';
import { useAuthPermissions } from '../contexts/AuthContext.jsx';
import rbacService from '../services/rbacService.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog.jsx';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { Textarea } from '../components/ui/textarea.jsx';
import { HeadlessSelect } from '../components/ui/headless-select.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.jsx';
import { 
  Settings, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Copy, 
  Trash2, 
  Users, 
  Shield, 
  Building2,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

export default function AdminConsole() {
  const { hasRole, userRole } = useAuthPermissions();
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is SuperAdmin
  if (!hasRole('super_admin')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-rose-800 mb-2">Access Denied</h2>
            <p className="text-rose-600">You need SuperAdmin privileges to access this console.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [rolesData, departmentsData, permissionsData, rolePermissionsData] = await Promise.all([
        rbacService.getRoles(),
        rbacService.getDepartments(),
        rbacService.getPermissions(),
        rbacService.getRolePermissions()
      ]);
      
      // Map permissions to roles
      const rolesWithPermissions = rolesData.map(role => {
        const rolePermissions = rolePermissionsData
          .filter(rp => rp.role_id === role.id)
          .map(rp => rp.permission_id);
        
        return {
          ...role,
          permissions: rolePermissions
        };
      });
      
      setRoles(rolesWithPermissions);
      setDepartments(departmentsData);
      setPermissions(permissionsData);
    } catch (err) {
      console.error('Error loading RBAC data:', err);
      setError('Failed to load RBAC data. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRole = () => {
    setEditingRole({
      id: '',
      name: '',
      description: '',
      permissions: [],
      inheritsFrom: [],
      color: 'slate',
      departments: []
    });
    setIsCreateModalOpen(true);
  };

  const handleEditRole = (role) => {
    setEditingRole({ ...role });
    setIsEditModalOpen(true);
  };

  const handleDuplicateRole = (role) => {
    setEditingRole({
      ...role,
      id: `${role.id}_copy`,
      name: `${role.name} (Copy)`,
      color: role.color // Keep the same color
    });
    setIsCreateModalOpen(true);
  };

  const handleDeleteRole = async (role) => {
    if (window.confirm(`Are you sure you want to delete the role "${role.name}"?`)) {
      try {
        setLoading(true);
        setError(null);
        
        await rbacService.deleteRole(role.id);
        setRoles(roles.filter(r => r.id !== role.id));
      } catch (err) {
        console.error('Error deleting role:', err);
        setError('Failed to delete role. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Function to get all permissions for a role including inherited ones
  const getAllPermissionsForRole = (role, allRoles) => {
    const permissions = new Set(role.permissions || []);
    
    // Add inherited permissions
    if (role.inheritsFrom && role.inheritsFrom.length > 0) {
      role.inheritsFrom.forEach(parentRoleId => {
        const parentRole = allRoles.find(r => r.id === parentRoleId);
        if (parentRole) {
          // Recursively get parent permissions (handles multiple levels of inheritance)
          const parentPermissions = getAllPermissionsForRole(parentRole, allRoles);
          parentPermissions.forEach(permission => permissions.add(permission));
        }
      });
    }
    
    return Array.from(permissions);
  };

  const handleSaveRole = async () => {
    if (!editingRole.id || !editingRole.name) {
      setError('Role ID and name are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Apply inheritance logic - merge inherited permissions with role's own permissions
      const allRoles = [...roles, editingRole]; // Include the current role being edited
      const finalRole = {
        ...editingRole,
        permissions: getAllPermissionsForRole(editingRole, allRoles)
      };
      
      console.log('Saving role with inherited permissions:', finalRole);
      
      let savedRole;
      if (isCreateModalOpen) {
        savedRole = await rbacService.createRole(finalRole);
        setRoles([...roles, savedRole]);
      } else {
        savedRole = await rbacService.updateRole(finalRole.id, finalRole);
        setRoles(roles.map(r => r.id === savedRole.id ? savedRole : r));
      }

      // Update role-permission mappings
      if (finalRole.permissions && finalRole.permissions.length > 0) {
        await rbacService.updateRolePermissions(finalRole.id, finalRole.permissions);
      }

      setIsEditModalOpen(false);
      setIsCreateModalOpen(false);
      setEditingRole(null);
    } catch (err) {
      console.error('Error saving role:', err);
      setError('Failed to save role. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadgeColor = (color) => {
    return `!bg-${color}-100 !text-${color}-800 !border-${color}-200`;
  };

  const getPermissionBadgeColor = (permission) => {
    const colors = {
      // User Management
      'view_users': 'bg-sky-100 text-sky-800',
      'add_users': 'bg-emerald-100 text-emerald-800',
      'edit_users': 'bg-amber-100 text-amber-800',
      'delete_users': 'bg-rose-100 text-rose-800',
      'assign_roles': 'bg-purple-100 text-purple-800',
      
      // Academic Management
      'view_schedule': 'bg-sky-100 text-sky-800',
      'add_schedule': 'bg-emerald-100 text-emerald-800',
      'edit_schedule': 'bg-amber-100 text-amber-800',
      'delete_schedule': 'bg-rose-100 text-rose-800',
      'view_assignments': 'bg-sky-100 text-sky-800',
      'add_assignments': 'bg-emerald-100 text-emerald-800',
      'edit_assignments': 'bg-amber-100 text-amber-800',
      'delete_assignments': 'bg-rose-100 text-rose-800',
      'view_exams': 'bg-sky-100 text-sky-800',
      'add_exams': 'bg-emerald-100 text-emerald-800',
      'edit_exams': 'bg-amber-100 text-amber-800',
      'delete_exams': 'bg-rose-100 text-rose-800',
      'grade_exams': 'bg-indigo-100 text-indigo-800',
      
      // Student Management
      'view_students': 'bg-sky-100 text-sky-800',
      'add_students': 'bg-emerald-100 text-emerald-800',
      'edit_students': 'bg-amber-100 text-amber-800',
      'delete_students': 'bg-rose-100 text-rose-800',
      'view_attendance': 'bg-sky-100 text-sky-800',
      'mark_attendance': 'bg-emerald-100 text-emerald-800',
      'edit_attendance': 'bg-amber-100 text-amber-800',
      'view_progress': 'bg-sky-100 text-sky-800',
      'update_progress': 'bg-amber-100 text-amber-800',
      
      // Teacher Management
      'view_teachers': 'bg-sky-100 text-sky-800',
      'add_teachers': 'bg-emerald-100 text-emerald-800',
      'edit_teachers': 'bg-amber-100 text-amber-800',
      'delete_teachers': 'bg-rose-100 text-rose-800',
      'assign_subjects': 'bg-purple-100 text-purple-800',
      'assign_classes': 'bg-purple-100 text-purple-800',
      
      // Guardian Management
      'view_guardians': 'bg-sky-100 text-sky-800',
      'add_guardians': 'bg-emerald-100 text-emerald-800',
      'edit_guardians': 'bg-amber-100 text-amber-800',
      'delete_guardians': 'bg-rose-100 text-rose-800',
      'link_students': 'bg-purple-100 text-purple-800',
      
      // Finance Management
      'view_finances': 'bg-sky-100 text-sky-800',
      'add_finances': 'bg-emerald-100 text-emerald-800',
      'edit_finances': 'bg-amber-100 text-amber-800',
      'delete_finances': 'bg-rose-100 text-rose-800',
      'view_fees': 'bg-sky-100 text-sky-800',
      'manage_fees': 'bg-purple-100 text-purple-800',
      'view_donations': 'bg-sky-100 text-sky-800',
      'manage_donations': 'bg-purple-100 text-purple-800',
      
      // Department Management
      'view_departments': 'bg-sky-100 text-sky-800',
      'add_departments': 'bg-emerald-100 text-emerald-800',
      'edit_departments': 'bg-amber-100 text-amber-800',
      'delete_departments': 'bg-rose-100 text-rose-800',
      'assign_roles_department': 'bg-purple-100 text-purple-800',
      
      // Role & Permission Management
      'view_roles': 'bg-sky-100 text-sky-800',
      'add_roles': 'bg-emerald-100 text-emerald-800',
      'edit_roles': 'bg-amber-100 text-amber-800',
      'delete_roles': 'bg-rose-100 text-rose-800',
      'manage_permissions': 'bg-purple-100 text-purple-800',
      
      // Reports & Analytics
      'view_reports': 'bg-sky-100 text-sky-800',
      'generate_reports': 'bg-emerald-100 text-emerald-800',
      'export_reports': 'bg-amber-100 text-amber-800',
      
      // Data Management
      'view_data': 'bg-sky-100 text-sky-800',
      'import_data': 'bg-emerald-100 text-emerald-800',
      'export_data': 'bg-amber-100 text-amber-800',
      'backup_data': 'bg-purple-100 text-purple-800',
      'restore_data': 'bg-rose-100 text-rose-800',
      
      // Messaging & Notifications
      'view_messages': 'bg-sky-100 text-sky-800',
      'send_messages': 'bg-emerald-100 text-emerald-800',
      'send_notifications': 'bg-emerald-100 text-emerald-800',
      'receive_notifications': 'bg-sky-100 text-sky-800',
      'manage_announcements': 'bg-purple-100 text-purple-800',
      
      // System Administration
      'view_settings': 'bg-sky-100 text-sky-800',
      'configure_settings': 'bg-purple-100 text-purple-800',
      'view_logs': 'bg-sky-100 text-sky-800',
      'manage_backups': 'bg-purple-100 text-purple-800',
      'system_maintenance': 'bg-rose-100 text-rose-800'
    };
    return colors[permission] || 'bg-slate-100 text-slate-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-emerald-900">Admin Console</h1>
          </div>
          <p className="text-emerald-600">Manage roles, permissions, and system configuration</p>
          
          {error && (
            <div className="mt-4 p-4 bg-rose-50 border border-rose-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600" />
                <span className="text-rose-800 font-medium">Error</span>
              </div>
              <p className="text-rose-700 mt-1">{error}</p>
              <Button 
                onClick={loadData}
                variant="outline"
                size="sm"
                className="mt-2 !text-emerald-700 !border-emerald-300 hover:!bg-emerald-50"
              >
                Retry
              </Button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="roles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          {/* Roles & Permissions Tab */}
          <TabsContent value="roles" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-emerald-800">Roles & Permissions</CardTitle>
                    <p className="text-sm text-emerald-600 mt-1">Manage all roles across the cluster</p>
                  </div>
                  <Button 
                    onClick={handleCreateRole}
                    className="!bg-emerald-600 !text-white hover:!bg-emerald-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Role
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                      <p className="text-emerald-600">Loading roles...</p>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Role Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Assigned Users</TableHead>
                          <TableHead>Departments</TableHead>
                          <TableHead>Permissions</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {roles.map((role) => (
                        <TableRow key={role.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg bg-${role.color}-500 flex items-center justify-center`}>
                                <div className="w-4 h-4 bg-white rounded-full"></div>
                              </div>
                              <div>
                                <div className="font-medium">{role.name}</div>
                                <Badge className={getRoleBadgeColor(role.color)}>
                                  {role.id}
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm text-gray-600 max-w-xs">
                              {role.description}
                            </p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">0 users</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {role.departments?.map((deptId) => {
                                const dept = departments.find(d => d.id === deptId);
                                return dept ? (
                                  <Badge key={deptId} variant="outline" className="text-xs">
                                    {dept.name}
                                  </Badge>
                                ) : null;
                              }) || <span className="text-sm text-gray-500">All</span>}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {(role.permissions || []).slice(0, 3).map((permission) => (
                                <Badge 
                                  key={permission} 
                                  variant="outline" 
                                  className={`text-xs ${getPermissionBadgeColor(permission)}`}
                                >
                                  {permission.replace('_', ' ')}
                                </Badge>
                              ))}
                              {(role.permissions || []).length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{(role.permissions || []).length - 3} more
                                </Badge>
                              )}
                              {(!role.permissions || role.permissions.length === 0) && (
                                <span className="text-sm text-gray-500">No permissions</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditRole(role)}
                                className="!text-emerald-600 !border-emerald-300 hover:!bg-emerald-50"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDuplicateRole(role)}
                                className="!text-emerald-600 !border-emerald-300 hover:!bg-emerald-50"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              {!role.isRootRole && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteRole(role)}
                                  className="!text-emerald-600 !border-emerald-300 hover:!bg-emerald-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-emerald-800">Departments</CardTitle>
                    <p className="text-sm text-emerald-600 mt-1">Manage organizational departments</p>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Department
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {departments.map((dept) => (
                    <Card key={dept.id} className="border-l-4" style={{ borderLeftColor: dept.color }}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{dept.icon}</span>
                          <div>
                            <h3 className="font-semibold">{dept.name}</h3>
                            <p className="text-sm text-gray-600">{dept.id}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{dept.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {roles.filter(role => role.departments?.includes(dept.id)).length} roles allowed
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-emerald-800">User Management</CardTitle>
                    <p className="text-sm text-emerald-600 mt-1">Manage user accounts and role assignments</p>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>User management interface coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Role Modal */}
        <Dialog open={isEditModalOpen || isCreateModalOpen} onOpenChange={(open) => {
          if (!open) {
            setIsEditModalOpen(false);
            setIsCreateModalOpen(false);
            setEditingRole(null);
          }
        }}>
          <DialogContent>
            <DialogHeader className="flex-shrink-0">
              <DialogTitle>
                {isCreateModalOpen ? 'Create New Role' : 'Edit Role Permissions'}
              </DialogTitle>
            </DialogHeader>
            
            {editingRole && (
              <EditRoleModal 
                role={editingRole}
                setRole={setEditingRole}
                onSave={handleSaveRole}
                onClose={() => {
                  setIsEditModalOpen(false);
                  setIsCreateModalOpen(false);
                  setEditingRole(null);
                }}
                departments={departments}
                roles={roles}
                permissions={permissions}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// Edit Role Modal Component
function EditRoleModal({ role, setRole, onSave, onClose, departments, roles, permissions }) {
  // Debug logging
  console.log('EditRoleModal - roles:', roles);
  console.log('EditRoleModal - role:', role);

  // Group permissions by category
  const permissionCategories = permissions.reduce((acc, permission) => {
    const category = permission.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      id: permission.id,
      label: permission.name,
      modes: [permission.action.charAt(0).toUpperCase() + permission.action.slice(1)]
    });
    return acc;
  }, {});

  const permissionCategoriesArray = Object.entries(permissionCategories).map(([category, permissions]) => ({
    category,
    permissions
  }));

  const handlePermissionToggle = (permissionId) => {
    const currentPermissions = role.permissions || [];
    if (currentPermissions.includes(permissionId)) {
      setRole({
        ...role,
        permissions: currentPermissions.filter(p => p !== permissionId)
      });
    } else {
      setRole({
        ...role,
        permissions: [...currentPermissions, permissionId]
      });
    }
  };

  const handleDepartmentToggle = (departmentId) => {
    const currentDepartments = role.departments || [];
    if (currentDepartments.includes(departmentId)) {
      setRole({
        ...role,
        departments: currentDepartments.filter(d => d !== departmentId)
      });
    } else {
      setRole({
        ...role,
        departments: [...currentDepartments, departmentId]
      });
    }
  };

  // Function to check if a permission is inherited
  const isPermissionInherited = (permissionId) => {
    if (!role.inheritsFrom || role.inheritsFrom.length === 0) return false;
    
    return role.inheritsFrom.some(parentRoleId => {
      const parentRole = roles.find(r => r.id === parentRoleId);
      return parentRole && parentRole.permissions && parentRole.permissions.includes(permissionId);
    });
  };

  // Function to get all inherited permissions
  const getInheritedPermissions = () => {
    if (!role.inheritsFrom || role.inheritsFrom.length === 0) return [];
    
    const inheritedPermissions = new Set();
    role.inheritsFrom.forEach(parentRoleId => {
      const parentRole = roles.find(r => r.id === parentRoleId);
      if (parentRole && parentRole.permissions) {
        parentRole.permissions.forEach(permission => inheritedPermissions.add(permission));
      }
    });
    
    return Array.from(inheritedPermissions);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Tabs defaultValue="general" className="flex flex-col flex-1 min-h-0">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="hierarchy">Hierarchy</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="flex-1 overflow-y-auto space-y-4 min-h-0">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="roleName">Role Name</Label>
              <Input
                id="roleName"
                value={role.name}
                onChange={(e) => setRole({ ...role, name: e.target.value })}
                placeholder="Enter role name"
              />
            </div>
            <div>
              <Label htmlFor="roleId">Role ID</Label>
              <Input
                id="roleId"
                value={role.id}
                onChange={(e) => setRole({ ...role, id: e.target.value })}
                placeholder="role_id"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={role.description}
              onChange={(e) => setRole({ ...role, description: e.target.value })}
              placeholder="Enter role description"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="color">Role Color</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[
                { name: 'Rose', value: 'rose', bg: 'bg-rose-500', text: 'text-rose-500' },
                { name: 'Slate', value: 'slate', bg: 'bg-slate-500', text: 'text-slate-500' },
                { name: 'Emerald', value: 'emerald', bg: 'bg-emerald-500', text: 'text-emerald-500' },
                { name: 'Amber', value: 'amber', bg: 'bg-amber-500', text: 'text-amber-500' },
                { name: 'Sky', value: 'sky', bg: 'bg-sky-500', text: 'text-sky-500' },
                { name: 'Purple', value: 'purple', bg: 'bg-purple-500', text: 'text-purple-500' },
                { name: 'Lime', value: 'lime', bg: 'bg-lime-500', text: 'text-lime-500' },
                { name: 'Pink', value: 'pink', bg: 'bg-pink-500', text: 'text-pink-500' },
                { name: 'Red', value: 'red', bg: 'bg-red-500', text: 'text-red-500' },
                { name: 'Orange', value: 'orange', bg: 'bg-orange-500', text: 'text-orange-500' },
                { name: 'Yellow', value: 'yellow', bg: 'bg-yellow-500', text: 'text-yellow-500' },
                { name: 'Green', value: 'green', bg: 'bg-green-500', text: 'text-green-500' },
                { name: 'Teal', value: 'teal', bg: 'bg-teal-500', text: 'text-teal-500' },
                { name: 'Cyan', value: 'cyan', bg: 'bg-cyan-500', text: 'text-cyan-500' },
                { name: 'Blue', value: 'blue', bg: 'bg-blue-500', text: 'text-blue-500' },
                { name: 'Violet', value: 'violet', bg: 'bg-violet-500', text: 'text-violet-500' },
                { name: 'Fuchsia', value: 'fuchsia', bg: 'bg-fuchsia-500', text: 'text-fuchsia-500' },
                { name: 'Gray', value: 'gray', bg: 'bg-gray-500', text: 'text-gray-500' },
                { name: 'Zinc', value: 'zinc', bg: 'bg-zinc-500', text: 'text-zinc-500' },
                { name: 'Neutral', value: 'neutral', bg: 'bg-neutral-500', text: 'text-neutral-500' },
                { name: 'Stone', value: 'stone', bg: 'bg-stone-500', text: 'text-stone-500' }
              ].map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setRole({ ...role, color: color.value })}
                  className={`relative w-12 h-12 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    role.color === color.value 
                      ? 'border-gray-900 shadow-lg' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  title={color.name}
                >
                  <div className={`w-full h-full rounded-md ${color.bg} flex items-center justify-center`}>
                    {role.color === color.value && (
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-gray-900" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Selected: <span className="font-medium capitalize">{role.color}</span>
            </p>
          </div>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="flex-1 overflow-y-auto space-y-4 min-h-0">
          <div className="space-y-6">
            {permissionCategoriesArray.map((category) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.permissions.map((permission) => (
                      <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{permission.label}</div>
                          <div className="text-sm text-gray-500">{permission.id}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {permission.modes.map((mode) => (
                            <Badge 
                              key={mode}
                              variant={role.permissions?.includes(permission.id) ? "default" : "outline"}
                              className={`text-xs ${
                                isPermissionInherited(permission.id) 
                                  ? 'bg-amber-100 text-amber-800 border-amber-200' 
                                  : ''
                              }`}
                            >
                              {mode}
                            </Badge>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePermissionToggle(permission.id)}
                            disabled={isPermissionInherited(permission.id)}
                            title={isPermissionInherited(permission.id) ? "This permission is inherited and cannot be removed" : ""}
                            className="!text-emerald-600 !border-emerald-300 hover:!bg-emerald-50"
                          >
                            {role.permissions?.includes(permission.id) ? (
                              <CheckCircle className={`w-4 h-4 ${
                                isPermissionInherited(permission.id) 
                                  ? 'text-amber-600' 
                                  : 'text-emerald-600'
                              }`} />
                            ) : (
                              <XCircle className="w-4 h-4 text-gray-400" />
                            )}
                          </Button>
                          {isPermissionInherited(permission.id) && (
                            <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                              Inherited
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Departments Tab */}
        <TabsContent value="departments" className="flex-1 overflow-y-auto space-y-4 min-h-0">
          <div className="space-y-3">
            <p className="text-sm text-gray-600">Select which departments this role has access to.</p>
            {departments.map((dept) => (
              <div key={dept.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{dept.icon}</span>
                  <div>
                    <div className="font-medium">{dept.name}</div>
                    <div className="text-sm text-gray-500">{dept.description}</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDepartmentToggle(dept.id)}
                  className="!text-emerald-600 !border-emerald-300 hover:!bg-emerald-50"
                >
                  {role.departments?.includes(dept.id) ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-gray-400" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Hierarchy Tab */}
        <TabsContent value="hierarchy" className="flex-1 overflow-y-auto space-y-4 min-h-0">
          <div className="space-y-4">
            <div>
              <Label htmlFor="inheritsFrom">Inherits From</Label>
              <HeadlessSelect
                value={role.inheritsFrom?.[0] || ''}
                onChange={(value) => {
                  console.log('Inheritance changed to:', value);
                  console.log('Current role before update:', role);
                  const updatedRole = { ...role, inheritsFrom: value ? [value] : [] };
                  console.log('Updated role:', updatedRole);
                  setRole(updatedRole);
                }}
                options={roles && roles.length > 0 ? 
                  roles.filter(r => r.id !== role.id).map((r) => ({
                    value: r.id,
                    label: r.name,
                    icon: `bg-${r.color}-500`
                  })) : []
                }
                placeholder="Select role to inherit from"
                className="mt-1"
              />
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-800">Role Inheritance</span>
              </div>
              <p className="text-sm text-amber-700 mb-3">
                When a role inherits from another role, it automatically gets all permissions from the parent role. 
                This creates a hierarchy where higher-level roles have more permissions.
              </p>
              
              {role.inheritsFrom && role.inheritsFrom.length > 0 && (
                <div className="mt-3">
                  <div className="text-sm font-medium text-amber-800 mb-2">
                    Inherited Permissions ({getInheritedPermissions().length}):
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {getInheritedPermissions().slice(0, 10).map((permission) => (
                      <Badge 
                        key={permission} 
                        variant="outline" 
                        className="text-xs bg-amber-100 text-amber-800 border-amber-200"
                      >
                        {permission.replace('_', ' ')}
                      </Badge>
                    ))}
                    {getInheritedPermissions().length > 10 && (
                      <Badge variant="outline" className="text-xs">
                        +{getInheritedPermissions().length - 10} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3 pt-4 border-t mt-4 flex-shrink-0">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onSave} className="!bg-emerald-600 !text-white hover:!bg-emerald-700">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
