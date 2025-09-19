// Schedule Entity Class for Madrasa ERP
// Handles API interactions for student schedules

export class Schedule {
  // Get all schedules with optional filters
  static async list(query = {}) {
    const queryString = new URLSearchParams(query).toString();
    const response = await fetch(`/api/schedules?${queryString}`);
    return response.json();
  }

  // Get schedule by ID
  static async get(id) {
    const response = await fetch(`/api/schedules/${id}`);
    if (!response.ok) {
      throw new Error('Schedule not found');
    }
    return response.json();
  }

  // Get schedules for a specific student
  static async getStudentSchedules(studentId) {
    const response = await fetch(`/api/schedules/student/${studentId}`);
    return response.json();
  }

  // Get today's schedule for a student
  static async getTodaySchedule(studentId) {
    const response = await fetch(`/api/schedules/student/${studentId}/today`);
    return response.json();
  }

  // Get next class for a student
  static async getNextClass(studentId) {
    const response = await fetch(`/api/schedules/student/${studentId}/next`);
    return response.json();
  }

  // Create new schedule (admin/teacher only)
  static async create(data) {
    const response = await fetch('/api/schedules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  // Update schedule (admin/teacher only)
  static async update(id, data) {
    const response = await fetch(`/api/schedules/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  // Delete schedule (admin/teacher only)
  static async delete(id) {
    const response = await fetch(`/api/schedules/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  }

  // Get weekly schedule organized by day
  static async getWeeklySchedule(studentId) {
    const schedules = await this.getStudentSchedules(studentId);
    
    // Organize by day
    const weeklySchedule = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    };

    schedules.forEach(schedule => {
      if (weeklySchedule[schedule.day]) {
        weeklySchedule[schedule.day].push(schedule);
      }
    });

    // Sort each day by time
    Object.keys(weeklySchedule).forEach(day => {
      weeklySchedule[day].sort((a, b) => a.time.localeCompare(b.time));
    });

    return weeklySchedule;
  }

  // Get subject hours distribution
  static async getSubjectHoursDistribution(studentId) {
    const schedules = await this.getStudentSchedules(studentId);
    
    const subjectHours = {};
    schedules.forEach(schedule => {
      if (!schedule.is_break) {
        const subject = schedule.subject;
        if (!subjectHours[subject]) {
          subjectHours[subject] = 0;
        }
        subjectHours[subject] += schedule.duration / 60; // Convert minutes to hours
      }
    });

    return Object.entries(subjectHours).map(([subject, hours]) => ({
      subject,
      hours: Math.round(hours * 10) / 10 // Round to 1 decimal place
    }));
  }

  // Get daily workload overview
  static async getDailyWorkload(studentId) {
    const weeklySchedule = await this.getWeeklySchedule(studentId);
    
    const dailyWorkload = Object.entries(weeklySchedule).map(([day, schedules]) => {
      const totalHours = schedules
        .filter(schedule => !schedule.is_break)
        .reduce((total, schedule) => total + (schedule.duration / 60), 0);
      
      return {
        day,
        hours: Math.round(totalHours * 10) / 10
      };
    });

    return dailyWorkload;
  }

  // Get unique subjects for a student
  static async getStudentSubjects(studentId) {
    const schedules = await this.getStudentSchedules(studentId);
    const subjects = [...new Set(schedules.map(s => s.subject).filter(s => s && !s.includes('Break')))];
    return subjects.sort();
  }

  // Format time for display
  static formatTime(time) {
    return time; // Already in HH:MM format
  }

  // Get time until next class
  static getTimeUntilNext(nextClass) {
    if (!nextClass) return null;
    
    const now = new Date();
    const [hours, minutes] = nextClass.time.split(':').map(Number);
    const nextClassTime = new Date();
    nextClassTime.setHours(hours, minutes, 0, 0);
    
    const diffMs = nextClassTime - now;
    if (diffMs <= 0) return null;
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    } else {
      return `${diffMinutes}m`;
    }
  }
}






