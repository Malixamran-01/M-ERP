import React, { useState, useEffect } from "react";
import { Assignment } from "../entities/Assignment.jsx";
import { useAuthPermissions } from "../contexts/AuthContext.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.jsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.jsx";
import { getStatusBadgeColor } from "../utils/roleColors.jsx";
import { 
  FileText, 
  Download, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Calendar,
  BookOpen,
  User,
  TrendingUp,
  Filter
} from "lucide-react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, differenceInDays, isAfter, isBefore } from 'date-fns';

export default function AssignmentProgress() {
  const { user, userRole, getStudentId } = useAuthPermissions();
  const [assignments, setAssignments] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    in_progress: 0,
    completed: 0,
    overdue: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');

  useEffect(() => {
    loadAssignments();
  }, [user]);

  const loadAssignments = async () => {
    const studentId = getStudentId();
    console.log('Loading assignments for student ID:', studentId);
    if (!studentId) {
      console.log('No student ID found');
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    try {
      console.log('Fetching assignment data...');
      const [assignmentsData, statsData] = await Promise.all([
        Assignment.getStudentAssignments(studentId),
        Assignment.getStudentStats(studentId)
      ]);
      
      console.log('Assignment data received:', assignmentsData);
      console.log('Stats data received:', statsData);
      
      setAssignments(assignmentsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading assignments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const statusMatch = statusFilter === 'all' || assignment.status === statusFilter;
    const subjectMatch = subjectFilter === 'all' || assignment.subject === subjectFilter;
    return statusMatch && subjectMatch;
  });


  const getStatusIcon = (status) => {
    const icons = {
      pending: Clock,
      in_progress: TrendingUp,
      completed: CheckCircle,
      overdue: AlertCircle
    };
    return icons[status] || Clock;
  };

  const getDaysUntilDue = (dueDate) => {
    const days = differenceInDays(new Date(dueDate), new Date());
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Due today';
    if (days === 1) return 'Due tomorrow';
    return `${days} days left`;
  };

  const handleDownload = (assignment) => {
    // Simulate file download
    console.log('Downloading assignment:', assignment.title);
    // In real implementation, this would trigger actual file download
  };

  const handleSubmit = (assignment) => {
    // Simulate file upload
    console.log('Submitting assignment:', assignment.title);
    // In real implementation, this would open file upload dialog
  };

  const handleStatusUpdate = async (assignmentId, newStatus) => {
    try {
      await Assignment.update(assignmentId, { status: newStatus });
      loadAssignments(); // Reload data
    } catch (error) {
      console.error('Error updating assignment status:', error);
    }
  };

  // Chart data
  const pieChartData = [
    { name: 'Pending', value: stats.pending, color: '#d97706' },
    { name: 'In Progress', value: stats.in_progress, color: '#2563eb' },
    { name: 'Completed', value: stats.completed, color: '#059669' },
    { name: 'Overdue', value: stats.overdue, color: '#dc2626' }
  ];

  const timelineData = assignments
    .filter(a => a.due_date)
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
    .slice(0, 10)
    .map(assignment => ({
      date: format(new Date(assignment.due_date), 'MMM dd'),
      assignments: 1,
      title: assignment.title
    }));

  const uniqueSubjects = [...new Set(assignments.map(a => a.subject))];

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-emerald-600">Loading assignments...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-900 mb-2">
            Assignment Progress
          </h1>
          <p className="text-emerald-600">
            Track and manage your academic assignments
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/60 backdrop-blur-sm border-emerald-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600">Pending</p>
                  <p className="text-2xl font-bold text-emerald-900">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-emerald-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600">In Progress</p>
                  <p className="text-2xl font-bold text-emerald-900">{stats.in_progress}</p>
                </div>
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-sky-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-emerald-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600">Completed</p>
                  <p className="text-2xl font-bold text-emerald-900">{stats.completed}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-emerald-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600">Overdue</p>
                  <p className="text-2xl font-bold text-emerald-900">{stats.overdue}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-600" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {uniqueSubjects.map(subject => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Assignment Completion Status */}
          <Card className="bg-white/60 backdrop-blur-sm border-emerald-200/50">
            <CardHeader>
              <CardTitle className="text-emerald-900 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Assignment Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Assignments Timeline */}
          <Card className="bg-white/60 backdrop-blur-sm border-emerald-200/50">
            <CardHeader>
              <CardTitle className="text-emerald-900 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                  <XAxis dataKey="date" stroke="#059669" />
                  <YAxis stroke="#059669" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #10b981',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="assignments" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Assignments Table */}
        <Card className="bg-white/60 backdrop-blur-sm border-emerald-200/50">
          <CardHeader>
            <CardTitle className="text-emerald-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Assignments List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Assigned Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.map((assignment) => {
                  const StatusIcon = getStatusIcon(assignment.status);
                  return (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.title}</TableCell>
                      <TableCell>{assignment.subject}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <User className="w-4 h-4 text-emerald-600" />
                        {assignment.teacher_name}
                      </TableCell>
                      <TableCell>{Assignment.formatDate(assignment.assigned_date)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{Assignment.formatDate(assignment.due_date)}</span>
                          <span className="text-xs text-emerald-600">
                            {getDaysUntilDue(assignment.due_date)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getStatusBadgeColor(assignment.status)} flex items-center gap-1 w-fit`}>
                          <StatusIcon className="w-3 h-3" />
                          {Assignment.getStatusLabel(assignment.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {assignment.file_url && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownload(assignment)}
                              className="text-emerald-700 border-emerald-300 hover:bg-emerald-50"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          )}
                          {assignment.status !== 'completed' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSubmit(assignment)}
                              className="text-sky-700 border-sky-300 hover:bg-sky-50"
                            >
                              <Upload className="w-4 h-4 mr-1" />
                              Submit
                            </Button>
                          )}
                          {assignment.status === 'pending' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(assignment.id, 'in_progress')}
                              className="text-sky-700 border-sky-300 hover:bg-sky-50"
                            >
                              Start
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Download All Pending
          </Button>
          <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
            <Upload className="w-4 h-4 mr-2" />
            Submit Assignment
          </Button>
          <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark As Completed
          </Button>
        </div>
      </div>
    </div>
  );
}
