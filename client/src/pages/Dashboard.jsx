import React, { useState, useEffect } from "react";
import { Student, Teacher, FeePayment, Donation, User } from "../entities/all.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { 
  Users, 
  GraduationCap, 
  DollarSign, 
  Heart, 
  UserPlus,
  BookOpen,
  TrendingUp,
  Calendar,
  Clock,
  Bell,
  MapPin
} from "lucide-react";
import { format } from "date-fns";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

import StatsCard from "../components/dashboard/StatsCard.jsx";
import StudentDashboard from "./StudentDashboard.jsx";

export default function Dashboard() {
  const { user: authUser, userRole, hasRole } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    monthlyFees: 0,
    totalDonations: 0
  });
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState({
    departmentData: [],
    feeData: [],
    donationData: []
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const currentUser = await User.me();
      setUser(currentUser);

      const [students, teachers, feePayments, donations] = await Promise.all([
        Student.list(),
        Teacher.list(),
        FeePayment.list(),
        Donation.list()
      ]);

      // Calculate current month fees
      const currentMonth = format(new Date(), 'MMMM yyyy');
      const monthlyFees = feePayments
        .filter(payment => payment.month_year === currentMonth)
        .reduce((sum, payment) => sum + (payment.amount || 0), 0);

      setStats({
        totalStudents: students.length,
        totalTeachers: teachers.length,
        monthlyFees: monthlyFees,
        totalDonations: donations.reduce((sum, donation) => sum + (donation.amount || 0), 0)
      });

      // Chart data
      const departmentCounts = students.reduce((acc, student) => {
        acc[student.department] = (acc[student.department] || 0) + 1;
        return acc;
      }, {});

      const departmentData = Object.entries(departmentCounts).map(([name, value]) => ({
        name: name.replace('_', ' ').toUpperCase(),
        value
      }));

      const feeTypeData = feePayments.reduce((acc, payment) => {
        acc[payment.fee_type] = (acc[payment.fee_type] || 0) + payment.amount;
        return acc;
      }, {});

      const feeData = Object.entries(feeTypeData).map(([name, amount]) => ({
        name: name.replace('_', ' ').toUpperCase(),
        amount
      }));

      setChartData({
        departmentData,
        feeData,
        donationData: donations.slice(0, 6).map(donation => ({
          date: format(new Date(donation.donation_date), 'MMM d'),
          amount: donation.amount
        }))
      });

    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  const COLORS = ['#059669', '#0891b2', '#7c3aed', '#d97706', '#dc2626', '#4b5563'];

  // Show Student Dashboard for students
  if (hasRole('student')) {
    return <StudentDashboard />;
  }

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-900 mb-2">
            As-salamu alaykum, {user?.full_name || 'Admin'}
          </h1>
          <p className="text-emerald-600">
            Welcome to your Madarsa management dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Total Students" 
            value={stats.totalStudents}
            icon={Users}
            bgColor="bg-emerald-500"
            trend="12 new this month"
            trendType="up"
          />
          <StatsCard 
            title="Total Teachers" 
            value={stats.totalTeachers}
            icon={GraduationCap}
            bgColor="bg-teal-500"
            trend="All active"
          />
          <StatsCard 
            title="Monthly Fees" 
            value={`$${stats.monthlyFees.toLocaleString()}`}
            icon={DollarSign}
            bgColor="bg-sky-500"
            trend="8% increase"
            trendType="up"
          />
          <StatsCard 
            title="Total Donations" 
            value={`$${stats.totalDonations.toLocaleString()}`}
            icon={Heart}
            bgColor="bg-purple-500"
            trend="MashaAllah"
          />
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Department Distribution */}
          <Card className="bg-white/60 backdrop-blur-sm border-emerald-200/50">
            <CardHeader>
              <CardTitle className="text-emerald-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Students by Department
              </CardTitle>
            </CardHeader>
            <CardContent>
              {chartData.departmentData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData.departmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-64 flex items-center justify-center text-emerald-600">
                  No data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Fee Collection */}
          <Card className="bg-white/60 backdrop-blur-sm border-emerald-200/50">
            <CardHeader>
              <CardTitle className="text-emerald-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Fee Collection by Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              {chartData.feeData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData.feeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                    <XAxis dataKey="name" stroke="#059669" />
                    <YAxis stroke="#059669" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #10b981',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-64 flex items-center justify-center text-emerald-600">
                  No data available
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Donations */}
        <Card className="bg-white/60 backdrop-blur-sm border-emerald-200/50">
          <CardHeader>
            <CardTitle className="text-emerald-900 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Recent Donations Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.donationData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData.donationData}>
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
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 6 }}
                    activeDot={{ r: 8, fill: '#059669' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-emerald-600">
                No donation data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}