const API_BASE_URL = 'http://localhost:3001/api';

export class Student {
  static async list(sort = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/students${sort ? `?sort=${sort}` : ''}`);
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching students:', error);
      return [];
    }
  }

  static async create(studentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create student');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`);
      if (!response.ok) {
        throw new Error('Student not found');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  }

  static async update(id, studentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update student');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete student');
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  }
}
