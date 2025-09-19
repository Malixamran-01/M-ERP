const API_BASE_URL = 'http://localhost:3001/api';

export class HifzProgress {
  static async list() {
    try {
      const response = await fetch(`${API_BASE_URL}/hifz-progress`);
      if (!response.ok) {
        throw new Error('Failed to fetch Hifz progress records');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching Hifz progress:', error);
      return [];
    }
  }

  static async create(progressData) {
    try {
      const response = await fetch(`${API_BASE_URL}/hifz-progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progressData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create Hifz progress record');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating Hifz progress record:', error);
      throw error;
    }
  }

  static async getByStudent(studentId) {
    try {
      const response = await fetch(`${API_BASE_URL}/hifz-progress/student/${studentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch student Hifz progress');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching student Hifz progress:', error);
      return [];
    }
  }

  static async update(id, progressData) {
    try {
      const response = await fetch(`${API_BASE_URL}/hifz-progress/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progressData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update Hifz progress record');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating Hifz progress record:', error);
      throw error;
    }
  }
}






