import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Button } from './ui/button.jsx';
import { Input } from './ui/input.jsx';
import { Label } from './ui/label.jsx';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';
import { Badge } from './ui/badge.jsx';
import { Landmark, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { getRoleBadgeColor } from '../utils/roleColors.jsx';

export default function LoginForm() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (loginError) setLoginError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!formData.email || !formData.password) {
      setLoginError('Please fill in all fields');
      return;
    }

    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate('/');
    } else {
      setLoginError(result.error);
    }
  };

  // Demo accounts for testing
  const demoAccounts = [
    { role: 'Super Admin', roleKey: 'super_admin', email: 'superadmin@madrasa.edu', password: 'superadmin123' },
    { role: 'Admin', roleKey: 'admin', email: 'admin@madrasa.edu', password: 'admin123' },
    { role: 'Teacher', roleKey: 'teacher', email: 'teacher@madrasa.edu', password: 'teacher123' },
    { role: 'Guardian', roleKey: 'guardian', email: 'guardian@madrasa.edu', password: 'guardian123' },
    { role: 'Student', roleKey: 'student', email: 'student@madrasa.edu', password: 'student123' }
  ];

  const fillDemoAccount = (account) => {
    setFormData({
      email: account.email,
      password: account.password
    });
    setLoginError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-emerald-600 p-3 rounded-full">
              <Landmark className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-emerald-900">Madarsa ERP</h1>
          <p className="text-emerald-600 mt-2">Management System</p>
        </div>

        {/* Login Form */}
        <Card className="bg-white/80 backdrop-blur-sm border-emerald-200/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-emerald-900">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="mt-1"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error Display */}
              {(error || loginError) && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error || loginError}</span>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="mt-6 bg-white/60 backdrop-blur-sm border-emerald-200/50">
          <CardHeader>
            <CardTitle className="text-center text-emerald-900 text-lg">Demo Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {demoAccounts.map((account, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-emerald-100 hover:bg-emerald-50 cursor-pointer transition-colors"
                  onClick={() => fillDemoAccount(account)}
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={getRoleBadgeColor(account.roleKey)}>
                      {account.role}
                    </Badge>
                    <span className="text-sm text-gray-600">{account.email}</span>
                  </div>
                  <span className="text-xs text-gray-400">Click to fill</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-sm text-emerald-800">
                <strong>Note:</strong> These are demo accounts for testing different role permissions. 
                Click on any account to auto-fill the login form.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
