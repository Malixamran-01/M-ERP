const API_BASE_URL = 'http://localhost:3001/api';

export class Attendance {
  static async list(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (filters.date) queryParams.append('date', filters.date);
      if (filters.class) queryParams.append('class', filters.class);
      if (filters.status) queryParams.append('status', filters.status);
      
      const url = `${API_BASE_URL}/attendance${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch attendance records');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching attendance:', error);
      return [];
    }
  }

  static async create(attendanceData) {
    try {
      const response = await fetch(`${API_BASE_URL}/attendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendanceData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create attendance record');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating attendance record:', error);
      throw error;
    }
  }

  static async getByStudent(studentId) {
    try {
      const response = await fetch(`${API_BASE_URL}/attendance/student/${studentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch student attendance');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching student attendance:', error);
      return [];
    }
  }

  static async bulkCreate(bulkData) {
    try {
      const response = await fetch(`${API_BASE_URL}/attendance/bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bulkData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create bulk attendance records');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating bulk attendance records:', error);
      throw error;
    }
  }
}






