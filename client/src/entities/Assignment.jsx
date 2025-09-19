export class Assignment {
  static async list(query = {}) {
    const queryString = new URLSearchParams(query).toString();
    const response = await fetch(`/api/assignments?${queryString}`);
    return response.json();
  }

  static async get(id) {
    const response = await fetch(`/api/assignments/${id}`);
    return response.json();
  }

  static async getStudentAssignments(studentId) {
    const response = await fetch(`/api/assignments/student/${studentId}`);
    return response.json();
  }

  static async getStudentStats(studentId) {
    const response = await fetch(`/api/assignments/student/${studentId}/stats`);
    return response.json();
  }

  static async create(data) {
    const response = await fetch('/api/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  static async update(id, data) {
    const response = await fetch(`/api/assignments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  static async submit(id, submissionData) {
    const response = await fetch(`/api/assignments/${id}/submit`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData),
    });
    return response.json();
  }

  static async delete(id) {
    const response = await fetch(`/api/assignments/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  }

  // Utility methods
  static getStatusColor(status) {
    const colors = {
      pending: 'amber',
      in_progress: 'blue',
      completed: 'emerald',
      overdue: 'red'
    };
    return colors[status] || 'gray';
  }

  static getStatusLabel(status) {
    const labels = {
      pending: 'Pending',
      in_progress: 'In Progress',
      completed: 'Completed',
      overdue: 'Overdue'
    };
    return labels[status] || status;
  }

  static isOverdue(dueDate) {
    return new Date(dueDate) < new Date();
  }

  static getDaysUntilDue(dueDate) {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  static formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  static formatDateTime(dateString) {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
