const API_BASE_URL = 'http://localhost:3001/api';

export class Teacher {
  static async list() {
    try {
      const response = await fetch(`${API_BASE_URL}/teachers`);
      if (!response.ok) {
        throw new Error('Failed to fetch teachers');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching teachers:', error);
      return [];
    }
  }

  static async create(teacherData) {
    try {
      const response = await fetch(`${API_BASE_URL}/teachers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacherData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create teacher');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating teacher:', error);
      throw error;
    }
  }
}
