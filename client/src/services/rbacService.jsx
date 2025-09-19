import { v4 as uuidv4 } from 'uuid';

const API_BASE_URL = 'http://localhost:3001/api';

class RBACService {
  // Role Management
  async getRoles() {
    try {
      const response = await fetch(`${API_BASE_URL}/roles`);
      if (!response.ok) throw new Error('Failed to fetch roles');
      return await response.json();
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  }

  async createRole(roleData) {
    try {
      const response = await fetch(`${API_BASE_URL}/roles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: roleData.id || uuidv4(),
          ...roleData
        }),
      });
      if (!response.ok) throw new Error('Failed to create role');
      return await response.json();
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  }

  async updateRole(roleId, roleData) {
    try {
      const response = await fetch(`${API_BASE_URL}/roles/${roleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roleData),
      });
      if (!response.ok) throw new Error('Failed to update role');
      return await response.json();
    } catch (error) {
      console.error('Error updating role:', error);
      throw error;
    }
  }

  async deleteRole(roleId) {
    try {
      const response = await fetch(`${API_BASE_URL}/roles/${roleId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete role');
      return await response.json();
    } catch (error) {
      console.error('Error deleting role:', error);
      throw error;
    }
  }

  async getRole(roleId) {
    try {
      const response = await fetch(`${API_BASE_URL}/roles/${roleId}`);
      if (!response.ok) throw new Error('Failed to fetch role');
      return await response.json();
    } catch (error) {
      console.error('Error fetching role:', error);
      throw error;
    }
  }

  // Permission Management
  async getPermissions(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.action) queryParams.append('action', filters.action);
      if (filters.resource) queryParams.append('resource', filters.resource);
      
      const url = `${API_BASE_URL}/permissions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch permissions');
      return await response.json();
    } catch (error) {
      console.error('Error fetching permissions:', error);
      throw error;
    }
  }

  async createPermission(permissionData) {
    try {
      const response = await fetch(`${API_BASE_URL}/permissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: permissionData.id || uuidv4(),
          ...permissionData
        }),
      });
      if (!response.ok) throw new Error('Failed to create permission');
      return await response.json();
    } catch (error) {
      console.error('Error creating permission:', error);
      throw error;
    }
  }

  async updatePermission(permissionId, permissionData) {
    try {
      const response = await fetch(`${API_BASE_URL}/permissions/${permissionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(permissionData),
      });
      if (!response.ok) throw new Error('Failed to update permission');
      return await response.json();
    } catch (error) {
      console.error('Error updating permission:', error);
      throw error;
    }
  }

  async deletePermission(permissionId) {
    try {
      const response = await fetch(`${API_BASE_URL}/permissions/${permissionId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete permission');
      return await response.json();
    } catch (error) {
      console.error('Error deleting permission:', error);
      throw error;
    }
  }

  // Department Management
  async getDepartments() {
    try {
      const response = await fetch(`${API_BASE_URL}/departments`);
      if (!response.ok) throw new Error('Failed to fetch departments');
      return await response.json();
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw error;
    }
  }

  async createDepartment(departmentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/departments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: departmentData.id || uuidv4(),
          ...departmentData
        }),
      });
      if (!response.ok) throw new Error('Failed to create department');
      return await response.json();
    } catch (error) {
      console.error('Error creating department:', error);
      throw error;
    }
  }

  async updateDepartment(departmentId, departmentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/departments/${departmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(departmentData),
      });
      if (!response.ok) throw new Error('Failed to update department');
      return await response.json();
    } catch (error) {
      console.error('Error updating department:', error);
      throw error;
    }
  }

  async deleteDepartment(departmentId) {
    try {
      const response = await fetch(`${API_BASE_URL}/departments/${departmentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete department');
      return await response.json();
    } catch (error) {
      console.error('Error deleting department:', error);
      throw error;
    }
  }

  // Role-Permission Management
  async getRolePermissions(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (filters.role_id) queryParams.append('role_id', filters.role_id);
      if (filters.permission_id) queryParams.append('permission_id', filters.permission_id);
      
      const url = `${API_BASE_URL}/role-permissions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch role-permissions');
      return await response.json();
    } catch (error) {
      console.error('Error fetching role-permissions:', error);
      throw error;
    }
  }

  async assignPermissionToRole(roleId, permissionId, metadata = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}/role-permissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role_id: roleId,
          permission_id: permissionId,
          ...metadata
        }),
      });
      if (!response.ok) throw new Error('Failed to assign permission to role');
      return await response.json();
    } catch (error) {
      console.error('Error assigning permission to role:', error);
      throw error;
    }
  }

  async removePermissionFromRole(mappingId) {
    try {
      const response = await fetch(`${API_BASE_URL}/role-permissions/${mappingId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to remove permission from role');
      return await response.json();
    } catch (error) {
      console.error('Error removing permission from role:', error);
      throw error;
    }
  }

  // User-Role Management
  async getUserRoles(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (filters.user_id) queryParams.append('user_id', filters.user_id);
      if (filters.role_id) queryParams.append('role_id', filters.role_id);
      
      const url = `${API_BASE_URL}/user-roles${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch user-roles');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user-roles:', error);
      throw error;
    }
  }

  async assignRoleToUser(userId, roleId, metadata = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}/user-roles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          role_id: roleId,
          ...metadata
        }),
      });
      if (!response.ok) throw new Error('Failed to assign role to user');
      return await response.json();
    } catch (error) {
      console.error('Error assigning role to user:', error);
      throw error;
    }
  }

  async removeRoleFromUser(mappingId) {
    try {
      const response = await fetch(`${API_BASE_URL}/user-roles/${mappingId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to remove role from user');
      return await response.json();
    } catch (error) {
      console.error('Error removing role from user:', error);
      throw error;
    }
  }

  // User Permissions (with inheritance)
  async getUserPermissions(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/permissions`);
      if (!response.ok) throw new Error('Failed to fetch user permissions');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user permissions:', error);
      throw error;
    }
  }

  // Bulk Operations
  async updateRolePermissions(roleId, permissionIds) {
    try {
      // Get current role-permission mappings
      const currentMappings = await this.getRolePermissions({ role_id: roleId });
      
      // Remove existing mappings
      for (const mapping of currentMappings) {
        await this.removePermissionFromRole(mapping.id);
      }
      
      // Add new mappings
      const newMappings = [];
      for (const permissionId of permissionIds) {
        const mapping = await this.assignPermissionToRole(roleId, permissionId);
        newMappings.push(mapping);
      }
      
      return newMappings;
    } catch (error) {
      console.error('Error updating role permissions:', error);
      throw error;
    }
  }

  // Utility Methods
  async getRoleWithPermissions(roleId) {
    try {
      const [role, rolePermissions] = await Promise.all([
        this.getRole(roleId),
        this.getRolePermissions({ role_id: roleId })
      ]);
      
      const permissions = await Promise.all(
        rolePermissions.map(rp => this.getPermission(rp.permission_id))
      );
      
      return {
        ...role,
        permissions: permissions.map(p => p.id)
      };
    } catch (error) {
      console.error('Error fetching role with permissions:', error);
      throw error;
    }
  }

  async getPermission(permissionId) {
    try {
      const response = await fetch(`${API_BASE_URL}/permissions/${permissionId}`);
      if (!response.ok) throw new Error('Failed to fetch permission');
      return await response.json();
    } catch (error) {
      console.error('Error fetching permission:', error);
      throw error;
    }
  }

  // Health Check
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) throw new Error('Health check failed');
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }
}

// Create and export singleton instance
const rbacService = new RBACService();
export default rbacService;



