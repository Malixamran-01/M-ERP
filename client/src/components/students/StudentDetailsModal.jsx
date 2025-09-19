import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx";
import { Badge } from "../ui/badge.jsx";
import { Button } from "../ui/button.jsx";
import { getStatusBadgeColor } from "../../utils/roleColors.jsx";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  GraduationCap,
  Home,
  X
} from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog.jsx";

export default function StudentDetailsModal({ student, onClose }) {
  const getStatusBadge = (status) => {
    return (
      <Badge variant="outline" className={getStatusBadgeColor(status)}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-emerald-900 flex items-center gap-2">
            <User className="w-5 h-5" />
            Student Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-emerald-800 text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-700 font-bold text-lg">
                    {student.first_name?.charAt(0)}{student.last_name?.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-emerald-900">
                    {student.first_name} {student.last_name}
                  </h3>
                  <p className="text-emerald-600">{student.student_id}</p>
                  {getStatusBadge(student.status)}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">
                    <strong>Date of Birth:</strong> {
                      student.date_of_birth 
                        ? format(new Date(student.date_of_birth), 'MMMM d, yyyy')
                        : 'Not provided'
                    }
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">
                    <strong>Gender:</strong> {student.gender?.charAt(0).toUpperCase() + student.gender?.slice(1)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">
                    <strong>Address:</strong> {student.address || 'Not provided'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-emerald-800 text-lg">Academic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">
                    <strong>Department:</strong> {student.department?.charAt(0).toUpperCase() + student.department?.slice(1)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">
                    <strong>Class:</strong> {student.class}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {student.student_type === 'boarding' ? <Home className="w-4 h-4 text-emerald-600" /> : <User className="w-4 h-4 text-emerald-600" />}
                  <span className="text-sm">
                    <strong>Type:</strong> {student.student_type?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">
                    <strong>Admission Date:</strong> {
                      student.admission_date 
                        ? format(new Date(student.admission_date), 'MMMM d, yyyy')
                        : 'Not provided'
                    }
                  </span>
                </div>

                {student.student_type === 'boarding' && student.hostel_room && (
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm">
                      <strong>Hostel Room:</strong> {student.hostel_room}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Guardian Information */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-emerald-800 text-lg">Guardian Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium text-emerald-900">Guardian Name</p>
                    <p className="text-sm text-emerald-600">{student.guardian_name || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium text-emerald-900">Phone</p>
                    <p className="text-sm text-emerald-600">{student.guardian_phone || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium text-emerald-900">Email</p>
                    <p className="text-sm text-emerald-600">{student.guardian_email || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={onClose} variant="outline">
            <X className="w-4 h-4 mr-2" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}