import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { createPageUrl } from "./utils/index.jsx";
import { User } from "./entities/User.jsx";
import { useAuthPermissions } from "./contexts/AuthContext.jsx";
import { PermissionGate } from "./utils/permissions.jsx";
import {
  GraduationCap,
  Users,
  DollarSign,
  BookOpen,
  Home,
  UserCheck,
  BarChart3,
  Settings,
  Menu,
  X,
  Landmark, // Changed from Mosque to Landmark
  Heart,
  Database,
  Calendar,
  FileText
} from "lucide-react";
import { Button } from "./components/ui/button.jsx";
import { Badge } from "./components/ui/badge.jsx";
import { getRoleBadgeColor } from "./utils/roleColors.jsx";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar.jsx";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home,
    permission: "dashboard:view",
    roles: ["super_admin", "admin", "teacher", "guardian", "student"]
  },
  {
    title: "Students",
    url: createPageUrl("Students"),
    icon: Users,
    permission: "student:view",
    roles: ["super_admin", "admin", "teacher"]
  },
  {
    title: "Teachers",
    url: createPageUrl("Teachers"),
    icon: Users,
    permission: "teacher:view",
    roles: ["super_admin", "admin"]
  },
  {
    title: "Guardians",
    url: createPageUrl("Guardians"),
    icon: UserCheck,
    permission: "guardian:view",
    roles: ["super_admin", "admin"]
  },
  {
    title: "Admissions",
    url: createPageUrl("Admissions"),
    icon: UserCheck,
    permission: "student:create",
    roles: ["super_admin", "admin"]
  },
  {
    title: "Finance",
    url: createPageUrl("Finance"),
    icon: DollarSign,
    permission: "finance:view",
    roles: ["super_admin", "admin"]
  },
  {
    title: "Academics",
    url: "#", // Add a placeholder URL
    icon: GraduationCap,
    permission: "progress:view",
    roles: ["super_admin", "admin", "teacher", "student"],
    subItems: [
      {
        title: "Hifz Progress",
        url: createPageUrl("HifzProgress"),
        icon: BookOpen,
        permission: "hifz:view",
        roles: ["super_admin", "admin", "teacher", "guardian", "student"]
      },
      {
        title: "My Schedule",
        url: "academics/schedule",
        icon: Calendar,
        permission: "schedule:view",
        roles: ["student"]
      },
      {
        title: "Assignment Progress",
        url: "academics/assignments",
        icon: FileText,
        permission: "assignment:view",
        roles: ["student"]
      }
    ]
  },
  {
    title: "Attendance",
    url: createPageUrl("Attendance"),
    icon: Users,
    permission: "attendance:view",
    roles: ["super_admin", "admin", "teacher"]
  },
  {
    title: "Exams",
    url: createPageUrl("Exams"),
    icon: BookOpen,
    permission: "exam:view",
    roles: ["super_admin", "admin", "teacher"]
  },
  {
    title: "Reports",
    url: createPageUrl("Reports"),
    icon: BarChart3,
    permission: "reports:view",
    roles: ["super_admin", "admin", "teacher"]
  },
  {
    title: "Data Management",
    url: createPageUrl("DataManagement"),
    icon: Database,
    permission: "data:manage",
    roles: ["super_admin", "admin"]
  },
  {
    title: "Admin Console",
    url: "admin-console",
    icon: Settings,
    permission: "system:settings",
    roles: ["super_admin"]
  }
];

export default function Layout() {
  const location = useLocation();
  const { user, loading, logout, userRole, userName, userEmail, getUserRoleDefinition, isAuthenticated, hasPermission } = useAuthPermissions();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Landmark className="w-8 h-8 text-emerald-600" />
          </div>
          <p className="text-emerald-600 font-medium">Loading Madrasa ERP...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }

  // Filter navigation items based on user permissions
  const getFilteredNavigationItems = () => {
    if (!user || !userRole) return [];
    
    return navigationItems.filter(item => {
      // For items with sub-items, always show the parent if user has the role
      if (item.subItems) {
        return item.roles.includes(userRole);
      }
      
      // For regular items, check permission and role
      if (item.permission) {
        if (!hasPermission(item.permission)) return false;
      }
      
      return item.roles.includes(userRole);
    });
  };

  const filteredNavigation = getFilteredNavigationItems();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-emerald-50 to-teal-50">
        <style>
          {`
            :root {
              --primary: 16 185 129;
              --primary-foreground: 255 255 255;
              --secondary: 6 78 59;
              --secondary-foreground: 255 255 255;
              --accent: 167 243 208;
              --accent-foreground: 6 78 59;
            }
          `}
        </style>
        
        <Sidebar className="border-r border-emerald-200/50 bg-white/90 backdrop-blur-sm">
          <SidebarHeader className="border-b border-emerald-200/50 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <Landmark className="w-6 h-6 text-white" /> {/* Changed icon */}
              </div>
              <div>
                <h2 className="font-bold text-emerald-900 text-lg">Madrasa ERP</h2>
                <p className="text-xs text-emerald-600 font-medium">
                  {user ? `Welcome, ${user.full_name}` : 'Educational Management'}
                </p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-emerald-700 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
                <Heart className="w-3 h-3" />
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {filteredNavigation.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      {item.subItems ? (
                        // Parent item with sub-items
                        <div className="mb-2">
                          <div className="flex items-center gap-3 px-4 py-3 text-emerald-700 font-medium cursor-default">
                            <item.icon className="w-5 h-5" />
                            <span>{item.title}</span>
                          </div>
                          <div className="ml-6 space-y-1">
                            {item.subItems
                              .filter(subItem => subItem.roles.includes(userRole))
                              .map((subItem) => (
                                <SidebarMenuButton 
                                  key={subItem.title}
                                  asChild 
                                  className={`hover:bg-emerald-100/80 hover:text-emerald-900 transition-all duration-200 rounded-lg group ${
                                    location.pathname === `/${subItem.url}` ? 'bg-emerald-100 text-emerald-900 shadow-sm' : 'text-emerald-700'
                                  }`}
                                >
                                  <Link to={subItem.url} className="flex items-center gap-3 px-4 py-2">
                                    <subItem.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                    <span className="text-sm font-medium">{subItem.title}</span>
                                  </Link>
                                </SidebarMenuButton>
                              ))}
                          </div>
                        </div>
                      ) : (
                        // Regular item without sub-items
                        <SidebarMenuButton 
                          asChild 
                          className={`hover:bg-emerald-100/80 hover:text-emerald-900 transition-all duration-200 rounded-lg mb-1 group ${
                            location.pathname === `/${item.url}` || (item.url === '/' && location.pathname === '/') ? 'bg-emerald-100 text-emerald-900 shadow-sm' : 'text-emerald-700'
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                            <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                            <span className="font-medium">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-6">
              <SidebarGroupLabel className="text-xs font-semibold text-emerald-700 uppercase tracking-wider px-3 py-2">
                Quick Info
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-3 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-emerald-600">Role:</span>
                    <Badge variant="outline" className={getRoleBadgeColor(userRole)}>
                      {userRole || 'student'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-emerald-600">Status:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-emerald-700 font-medium">Active</span>
                    </div>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-emerald-200/50 p-4">
            {user ? (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50/50">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {userName?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-emerald-900 text-sm truncate">
                    {userName || 'User'}
                  </p>
                  <p className="text-xs text-emerald-600 truncate">{userEmail}</p>
                </div>
                <Button
                  onClick={logout}
                  variant="ghost"
                  size="sm"
                  className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => window.location.href = '/login'}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg"
              >
                Sign In
              </Button>
            )}
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200/50 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-emerald-100 p-2 rounded-lg transition-colors duration-200" />
              <div className="flex items-center gap-2">
                <Landmark className="w-6 h-6 text-emerald-600" /> {/* Changed icon */}
                <h1 className="text-xl font-bold text-emerald-900">Madarsa ERP</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto bg-gradient-to-br from-emerald-50/50 to-teal-50/50">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}