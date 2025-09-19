import React, { useState, useEffect } from 'react';
import { useAuthPermissions } from '../contexts/AuthContext';
import { 
  User, 
  Home, 
  Phone, 
  Calendar, 
  MapPin, 
  GraduationCap, 
  Clock,
  TrendingUp,
  Award,
  BookOpen,
  Users,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';

const StudentDashboard = () => {
  const { user } = useAuthPermissions();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Rich mock data for visualization and UI design
      const mockStudentData = {
        id: "STU001",
        name: "Ahmed Hassan Al-Rashid",
        roll_number: "2024-CS-001",
        email: "ahmed.hassan@madrasa.edu",
        phone: "+9114029327862",
        photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        year: 1,
        department: {
          id: "Ifta_Department",
          name: "Darul IFTA"
        },
        section: {
          id: "ifta_1",
          name: "IFTA-C"
        },
        hostel: {
          id: "HOSTEL001",
          name: "Al-Farabi Hostel",
          location: "North Campus, Block A"
        },
        room_number: "A-205",
        bed_number: "Bed-2 (Lower)",
        father_name: "Muhammad Hassan Al-Rashid",
        guardian_contact: "+9114029327711",
        dob: "2005-03-15",
        nationality: "Indian",
        address: "House 123, Street 45, Aminabad, Lucknow, Uttar Pradesh, India",
        credits: 18,
        attendance_percentage: 87,
        activities: [
          { 
            date: "2024-01-20", 
            action: "Submitted Programming Assignment", 
            status: "completed",
            time: "14:30",
            subject: "Programming Fundamentals"
          },
          { 
            date: "2024-01-19", 
            action: "Attended Islamic Studies Class", 
            status: "completed",
            time: "09:00",
            subject: "Islamic Studies"
          },
          { 
            date: "2024-01-18", 
            action: "Library Study Session", 
            status: "completed",
            time: "16:00",
            subject: "Mathematics"
          },
          { 
            date: "2024-01-17", 
            action: "Group Study with Classmates", 
            status: "completed",
            time: "19:00",
            subject: "English Literature"
          },
          { 
            date: "2024-01-16", 
            action: "Prayer Time at Masjid", 
            status: "completed",
            time: "12:30",
            subject: "Spiritual Development"
          },
          { 
            date: "2024-01-15", 
            action: "Sports Activity", 
            status: "completed",
            time: "17:00",
            subject: "Physical Education"
          }
        ],
        attendance_summary: {
          present: 87,
          absent: 8,
          late: 5
        },
        grades: [
          { 
            subject: "Programming Fundamentals", 
            score: 88, 
            grade: "A-",
            teacher: "Dr. Muhammad Ali",
            lastUpdated: "2024-01-15"
          },
          { 
            subject: "Mathematics", 
            score: 92, 
            grade: "A",
            teacher: "Prof. Ahmed Khan",
            lastUpdated: "2024-01-12"
          },
          { 
            subject: "English Literature", 
            score: 85, 
            grade: "B+",
            teacher: "Ms. Fatima Sheikh",
            lastUpdated: "2024-01-10"
          },
          { 
            subject: "Islamic Studies", 
            score: 95, 
            grade: "A+",
            teacher: "Maulana Ibrahim",
            lastUpdated: "2024-01-18"
          },
          { 
            subject: "Arabic Language", 
            score: 90, 
            grade: "A-",
            teacher: "Ustadha Aisha",
            lastUpdated: "2024-01-14"
          },
          { 
            subject: "Quran Recitation", 
            score: 93, 
            grade: "A",
            teacher: "Qari Abdullah",
            lastUpdated: "2024-01-16"
          }
        ],
        upcomingEvents: [
          {
            date: "2024-01-25",
            title: "Midterm Exam - Programming",
            time: "09:00",
            type: "exam",
            subject: "Programming Fundamentals"
          },
          {
            date: "2024-01-28",
            title: "Assignment Due - Mathematics",
            time: "23:59",
            type: "assignment",
            subject: "Mathematics"
          },
          {
            date: "2024-02-01",
            title: "Islamic Studies Presentation",
            time: "10:00",
            type: "presentation",
            subject: "Islamic Studies"
          }
        ],
        recentAnnouncements: [
          {
            id: "ANN001",
            title: "Library Extended Hours",
            message: "Library will remain open until 10 PM during exam period",
            date: "2024-01-20",
            priority: "medium"
          },
          {
            id: "ANN002",
            title: "Prayer Time Schedule Update",
            message: "New prayer times for winter season have been updated",
            date: "2024-01-19",
            priority: "high"
          },
          {
            id: "ANN003",
            title: "Sports Day Registration",
            message: "Register for annual sports day events by January 30th",
            date: "2024-01-18",
            priority: "low"
          }
        ],
        financialInfo: {
          totalFees: 50000,
          paidFees: 45000,
          remainingFees: 5000,
          nextDueDate: "2024-02-15",
          paymentHistory: [
            { date: "2024-01-01", amount: 25000, status: "paid" },
            { date: "2023-12-01", amount: 20000, status: "paid" }
          ]
        },
        academicProgress: {
          currentSemester: "Spring 2024",
          totalCredits: 18,
          completedCredits: 12,
          gpa: 3.7,
          rank: 5,
          totalStudents: 30
        }
      };
      
      setStudentData(mockStudentData);
    } catch (err) {
      console.error('Error loading student data:', err);
      setError('Failed to load student data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-emerald-600 text-lg">Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 text-rose-600">⚠️</div>
              <span className="text-rose-800 font-medium">Error</span>
            </div>
            <p className="text-rose-700 mb-4">{error}</p>
            <Button 
              onClick={loadStudentData}
              variant="outline"
              size="sm"
              className="!text-emerald-700 !border-emerald-300 hover:!bg-emerald-50"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No student data found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Home className="w-8 h-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-emerald-900">Student Dashboard</h1>
          </div>
          <p className="text-emerald-600">Welcome back, {studentData.name}!</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile and Personal Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <User className="w-5 h-5" />
                  Student Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                      {studentData.photo_url ? (
                        <img 
                          src={studentData.photo_url} 
                          alt={studentData.name}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-emerald-600" />
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{studentData.year}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{studentData.name}</h2>
                      <Badge className="!bg-emerald-100 !text-emerald-800 !border-emerald-200">
                        {studentData.roll_number}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm text-gray-600">Year {studentData.year}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm text-gray-600">{studentData.department.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm text-gray-600">{studentData.section.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm text-gray-600">{studentData.credits} Credits</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hostel & Room Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <Home className="w-5 h-5" />
                  Hostel & Room Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                    <Home className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-600">Hostel</p>
                      <p className="font-medium">{studentData.hostel.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                    <div className="w-5 h-5 text-emerald-600">🏠</div>
                    <div>
                      <p className="text-sm text-gray-600">Room</p>
                      <p className="font-medium">{studentData.room_number}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                    <div className="w-5 h-5 text-emerald-600">🛏️</div>
                    <div>
                      <p className="text-sm text-gray-600">Bed</p>
                      <p className="font-medium">{studentData.bed_number}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-gray-600">Father's Name:</span>
                      <span className="font-medium">{studentData.father_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-gray-600">Guardian Contact:</span>
                      <span className="font-medium">{studentData.guardian_contact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-gray-600">Date of Birth:</span>
                      <span className="font-medium">{new Date(studentData.dob).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 text-emerald-600">🌍</div>
                      <span className="text-sm text-gray-600">Nationality:</span>
                      <span className="font-medium">{studentData.nationality}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600 mt-1" />
                      <div>
                        <span className="text-sm text-gray-600">Address:</span>
                        <p className="font-medium text-sm">{studentData.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <DollarSign className="w-5 h-5" />
                  Financial Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">
                      INR {studentData.financialInfo.totalFees.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Fees</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      INR {studentData.financialInfo.paidFees.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Paid Amount</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-600">
                      INR {studentData.financialInfo.remainingFees.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Remaining</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Next Due Date:</span>
                    <span className="font-medium">{new Date(studentData.financialInfo.nextDueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <TrendingUp className="w-5 h-5" />
                  Academic Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Current Semester:</span>
                      <span className="font-medium">{studentData.academicProgress.currentSemester}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">GPA:</span>
                      <Badge className="!bg-emerald-100 !text-emerald-800 !border-emerald-200">
                        {studentData.academicProgress.gpa}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Class Rank:</span>
                      <span className="font-medium">{studentData.academicProgress.rank} of {studentData.academicProgress.totalStudents}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Credits Progress</span>
                        <span className="text-sm font-medium">
                          {studentData.academicProgress.completedCredits}/{studentData.academicProgress.totalCredits}
                        </span>
                      </div>
                      <Progress 
                        value={(studentData.academicProgress.completedCredits / studentData.academicProgress.totalCredits) * 100} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats and Activity */}
          <div className="space-y-6">
            {/* Academic Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <TrendingUp className="w-5 h-5" />
                  Academic Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">Year {studentData.year}</div>
                  <div className="text-sm text-gray-600">Current Year</div>
                </div>
                
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">{studentData.credits}</div>
                  <div className="text-sm text-gray-600">Credits Earned</div>
                </div>
                
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Attendance</span>
                    <span className="text-sm font-medium">{studentData.attendance_percentage}%</span>
                  </div>
                  <Progress value={studentData.attendance_percentage} className="h-2" />
                </div>
              </CardContent>
            </Card>


            {/* Attendance Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <TrendingUp className="w-5 h-5" />
                  Attendance Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm">Present</span>
                    </div>
                    <span className="text-sm font-medium">{studentData.attendance_summary.present}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                      <span className="text-sm">Absent</span>
                    </div>
                    <span className="text-sm font-medium">{studentData.attendance_summary.absent}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      <span className="text-sm">Late</span>
                    </div>
                    <span className="text-sm font-medium">{studentData.attendance_summary.late}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grades Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <Award className="w-5 h-5" />
                  Grades Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentData.grades.map((grade, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{grade.subject}</span>
                        <div className="flex items-center gap-2">
                          <Badge className="!bg-emerald-100 !text-emerald-800 !border-emerald-200">
                            {grade.score}%
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {grade.grade}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Teacher: {grade.teacher} • Updated: {new Date(grade.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <Calendar className="w-5 h-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentData.upcomingEvents.map((event, index) => (
                    <div key={index} className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{event.title}</span>
                        <span className="text-xs text-gray-500">{event.time}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {event.subject} • {new Date(event.date).toLocaleDateString()}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs mt-1 ${
                          event.type === 'exam' ? 'border-red-300 text-red-700' :
                          event.type === 'assignment' ? 'border-blue-300 text-blue-700' :
                          'border-green-300 text-green-700'
                        }`}
                      >
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;