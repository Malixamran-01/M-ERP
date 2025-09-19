// Using built-in fetch (Node.js 18+)

const API_BASE_URL = 'http://localhost:3001/api';

async function testImport() {
  try {
    console.log('🧪 Testing data import functionality...\n');

    // Test data
    const testStudent = {
      student_id: "STD2024006",
      first_name: "Hassan",
      last_name: "Mohammed",
      date_of_birth: "2011-07-12",
      gender: "male",
      class: "Grade 4",
      department: "hifz",
      admission_date: "2024-02-15",
      student_type: "boarding",
      guardian_name: "Mohammed Ali",
      guardian_phone: "+1234567901",
      guardian_email: "m.ali@email.com",
      address: "987 Cedar Street, City",
      fee_status: "paid",
      hostel_room: "Room 104",
      status: "active"
    };

    // Test import
    console.log('📥 Importing test student...');
    const importResponse = await fetch(`${API_BASE_URL}/import/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [testStudent] }),
    });

    if (importResponse.ok) {
      const importResult = await importResponse.json();
      console.log('✅ Import successful:', importResult.message);
    } else {
      const error = await importResponse.json();
      console.log('❌ Import failed:', error.error);
    }

    // Test export
    console.log('\n📤 Testing export...');
    const exportResponse = await fetch(`${API_BASE_URL}/export/students`);
    
    if (exportResponse.ok) {
      const exportData = await exportResponse.json();
      console.log(`✅ Export successful: ${exportData.length} students exported`);
    } else {
      console.log('❌ Export failed');
    }

    // Test health check
    console.log('\n🏥 Testing health check...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Health check passed');
      console.log('📊 Current data counts:', healthData.data);
    } else {
      console.log('❌ Health check failed');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testImport();
