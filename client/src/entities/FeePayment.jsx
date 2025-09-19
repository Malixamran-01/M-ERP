const API_BASE_URL = 'http://localhost:3001/api';

export class FeePayment {
  static async list() {
    try {
      const response = await fetch(`${API_BASE_URL}/fee-payments`);
      if (!response.ok) {
        throw new Error('Failed to fetch fee payments');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching fee payments:', error);
      return [];
    }
  }

  static async create(paymentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/fee-payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create fee payment');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating fee payment:', error);
      throw error;
    }
  }
}
