const API_BASE_URL = 'http://localhost:3001/api';

export class User {
  static async me() {
    try {
      const response = await fetch(`${API_BASE_URL}/users/me`);
      if (!response.ok) {
        throw new Error('User not authenticated');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  static async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      return data.user;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  static async logout() {
    localStorage.removeItem('token');
  }

  static isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
