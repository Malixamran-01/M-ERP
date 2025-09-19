import React, { useState, useEffect } from "react";
import { Student } from "../entities/Student.jsx";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.jsx";
import { getStatusBadgeColor, getButtonColors } from "../utils/roleColors.jsx";
import { 
  Search, 
  Plus, 
  Filter, 
  Users,
  Eye,
  Edit,
  UserCheck,
  Home
} from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.jsx";

import AddStudentForm from "../components/students/AddStudentsForm.jsx";
import StudentDetailsModal from "../components/students/StudentDetailsModal.jsx";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, departmentFilter, statusFilter]);

  const loadStudents = async () => {
    setIsLoading(true);
    try {
      const data = await Student.list("-created_date");
      setStudents(data);
    } catch (error) {
      console.error("Error loading students:", error);
    }
    setIsLoading(false);
  };

  const filterStudents = () => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter(student => 
        `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (departmentFilter !== "all") {
      filtered = filtered.filter(student => student.department === departmentFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(student => student.status === statusFilter);
    }

    setFilteredStudents(filtered);
  };

  const getStatusBadge = (status) => {
    return (
      <Badge variant="outline" className={`${getStatusBadgeColor(status)} border`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getDepartmentBadge = (department) => {
    const variants = {
      hifz: "bg-purple-100 text-purple-800 border-purple-200",
      nazira: "bg-slate-100 text-slate-800 border-slate-200",
      alim: "bg-teal-100 text-teal-800 border-teal-200",
      primary: "bg-orange-100 text-orange-800 border-orange-200"
    };
    
    return (
      <Badge className={`${variants[department]} border`}>
        {department?.charAt(0).toUpperCase() + department?.slice(1)}
      </Badge>
    );
  };

  const getTypeIcon = (type) => {
    return type === 'boarding' ? <Home className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />;
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900 flex items-center gap-2">
              <Users className="w-8 h-8" />
              Students Management
            </h1>
            <p className="text-emerald-600 mt-1">Manage student enrollment and information</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className={`${getButtonColors('primary')} shadow-lg`}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Student
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-white/60 backdrop-blur-sm border-emerald-200/50">
          <CardHeader>
            <CardTitle className="text-emerald-900 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
                <Input
                  placeholder="Search by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="hifz">Hifz</SelectItem>
                  <SelectItem value="nazira">Nazira</SelectItem>
                  <SelectItem value="alim">Alim</SelectItem>
                  <SelectItem value="primary">Primary</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="graduated">Graduated</SelectItem>
                  <SelectItem value="withdrawn">Withdrawn</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-emerald-600 flex items-center">
                Showing {filteredStudents.length} of {students.length} students
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card className="bg-white/60 backdrop-blur-sm border-emerald-200/50 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-emerald-900">All Students</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-emerald-50/50">
                  <TableRow>
                    <TableHead>Student Info</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Admission Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array(5).fill(0).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell colSpan={7}>
                          <div className="flex items-center space-x-4 animate-pulse">
                            <div className="rounded-full bg-emerald-200 h-10 w-10"></div>
                            <div className="space-y-2">
                              <div className="h-4 bg-emerald-200 rounded w-32"></div>
                              <div className="h-3 bg-emerald-200 rounded w-24"></div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="text-emerald-600">
                          {searchTerm || departmentFilter !== "all" || statusFilter !== "all" 
                            ? "No students found matching your filters"
                            : "No students enrolled yet"
                          }
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id} className="hover:bg-emerald-50/50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                              <span className="text-emerald-700 font-semibold">
                                {student.first_name?.charAt(0)}{student.last_name?.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-emerald-900">
                                {student.first_name} {student.last_name}
                              </p>
                              <p className="text-sm text-emerald-600">{student.student_id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getDepartmentBadge(student.department)}</TableCell>
                        <TableCell className="font-medium">{student.class}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getTypeIcon(student.student_type)}
                            <span className="capitalize text-sm">
                              {student.student_type?.replace('_', ' ')}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(student.status)}</TableCell>
                        <TableCell>
                          {student.admission_date && format(new Date(student.admission_date), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedStudent(student)}
                            className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Student Modal */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-emerald-900">Add New Student</DialogTitle>
          </DialogHeader>
          <AddStudentForm 
            onSuccess={() => {
              setShowAddForm(false);
              loadStudents();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Student Details Modal */}
      {selectedStudent && (
        <StudentDetailsModal 
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}