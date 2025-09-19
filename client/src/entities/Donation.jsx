const API_BASE_URL = 'http://localhost:3001/api';

export class Donation {
  static async list() {
    try {
      const response = await fetch(`${API_BASE_URL}/donations`);
      if (!response.ok) {
        throw new Error('Failed to fetch donations');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching donations:', error);
      return [];
    }
  }

  static async create(donationData) {
    try {
      const response = await fetch(`${API_BASE_URL}/donations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create donation');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating donation:', error);
      throw error;
    }
  }
}
