const API_BASE_URL = 'http://localhost:3001/api';

export class DataImporter {
  // Import data from JSON file
  static async importFromFile(entityName, file) {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (!Array.isArray(data)) {
        throw new Error('Data must be an array of records');
      }
      
      const response = await fetch(`${API_BASE_URL}/import/${entityName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to import data');
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error importing data:', error);
      throw error;
    }
  }

  // Export data to JSON file
  static async exportToFile(entityName) {
    try {
      const response = await fetch(`${API_BASE_URL}/export/${entityName}`);
      
      if (!response.ok) {
        throw new Error('Failed to export data');
      }
      
      const data = await response.json();
      
      // Create and download file
      const blob = new Blob([JSON.stringify(data, null, 2)], { 
        type: 'application/json' 
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${entityName}_export_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      return { message: `Exported ${data.length} ${entityName} records` };
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  }

  // Get available entities
  static getAvailableEntities() {
    return [
      { name: 'students', label: 'Students', description: 'Student records' },
      { name: 'teachers', label: 'Teachers', description: 'Teacher records' },
      { name: 'attendance', label: 'Attendance', description: 'Attendance records' },
      { name: 'feepayments', label: 'Fee Payments', description: 'Fee payment records' },
      { name: 'donations', label: 'Donations', description: 'Donation records' },
      { name: 'hifzprogress', label: 'Hifz Progress', description: 'Hifz progress records' }
    ];
  }

  // Validate JSON data structure
  static validateData(data, entityName) {
    if (!Array.isArray(data)) {
      return { valid: false, error: 'Data must be an array of records' };
    }

    if (data.length === 0) {
      return { valid: false, error: 'Data array is empty' };
    }

    // Basic validation based on entity type
    const requiredFields = {
      students: ['student_id', 'first_name', 'last_name', 'class', 'department'],
      teachers: ['employee_id', 'first_name', 'last_name', 'position'],
      attendance: ['student_id', 'student_name', 'class', 'date', 'status'],
      feepayments: ['student_id', 'student_name', 'amount', 'fee_type', 'payment_date', 'month_year'],
      donations: ['donor_name', 'amount', 'donation_type', 'donation_date'],
      hifzprogress: ['student_id', 'student_name', 'surah_name', 'memorization_date', 'revision_status']
    };

    const fields = requiredFields[entityName];
    if (!fields) {
      return { valid: false, error: `Unknown entity type: ${entityName}` };
    }

    for (let i = 0; i < data.length; i++) {
      const record = data[i];
      for (const field of fields) {
        if (!record[field]) {
          return { 
            valid: false, 
            error: `Missing required field '${field}' in record ${i + 1}` 
          };
        }
      }
    }

    return { valid: true };
  }

  // Generate sample data template
  static generateSampleTemplate(entityName) {
    const templates = {
      students: [
        {
          student_id: "STD2024001",
          first_name: "Ahmed",
          last_name: "Hassan",
          date_of_birth: "2010-05-15",
          gender: "male",
          class: "Grade 5",
          department: "hifz",
          admission_date: "2024-01-15",
          student_type: "boarding",
          guardian_name: "Mohammed Hassan",
          guardian_phone: "+1234567890",
          guardian_email: "m.hassan@email.com",
          address: "123 Main Street, City",
          fee_status: "paid",
          hostel_room: "Room 101",
          status: "active"
        }
      ],
      teachers: [
        {
          employee_id: "TCH2024001",
          first_name: "Sheikh",
          last_name: "Abdullah",
          phone: "+1234567892",
          email: "sheikh.abdullah@madrasa.edu",
          position: "head_teacher",
          subjects: ["Quran", "Arabic", "Islamic Studies"],
          classes_assigned: ["Grade 5", "Grade 6"],
          hire_date: "2020-01-15",
          salary: 5000,
          qualifications: "Alim Degree, Hafiz",
          status: "active"
        }
      ],
      attendance: [
        {
          student_id: "STD2024001",
          student_name: "Ahmed Hassan",
          class: "Grade 5",
          date: "2024-01-15",
          status: "present",
          marked_by: "Sheikh Abdullah",
          notes: "On time"
        }
      ],
      feepayments: [
        {
          student_id: "STD2024001",
          student_name: "Ahmed Hassan",
          amount: 500,
          fee_type: "tuition",
          payment_method: "cash",
          payment_date: "2024-01-15",
          month_year: "January 2024",
          receipt_number: "RCP001",
          notes: "Monthly tuition fee",
          status: "completed"
        }
      ],
      donations: [
        {
          donor_name: "Anonymous",
          amount: 1000,
          donation_type: "sadaqah",
          payment_method: "bank_transfer",
          donation_date: "2024-01-10",
          receipt_number: "DON001",
          purpose: "General fund",
          is_recurring: false,
          notes: "Monthly donation"
        }
      ],
      hifzprogress: [
        {
          student_id: "STD2024001",
          student_name: "Ahmed Hassan",
          surah_name: "Al-Fatiha",
          ayah_from: 1,
          ayah_to: 7,
          memorization_date: "2024-01-10",
          revision_status: "excellent",
          teacher_feedback: "Perfect recitation with proper tajweed",
          total_pages_completed: 1,
          verified_by: "Sheikh Abdullah"
        }
      ]
    };

    return templates[entityName] || [];
  }
}






