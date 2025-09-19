
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./src/utils/index.js";
import { User } from "./src/entities/User.js";
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
  Heart
} from "lucide-react";
import { Button } from "./src/components/ui/button.jsx";
import { Badge } from "./src/components/ui/badge.jsx";
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
} from "./src/components/ui/sidebar.jsx";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home,
    roles: ["admin", "teacher", "student", "manager"]
  },
  {
    title: "Students",
    url: createPageUrl("Students"),
    icon: Users,
    roles: ["admin", "teacher", "manager"]
  },
  {
    title: "Admissions",
    url: createPageUrl("Admissions"),
    icon: UserCheck,
    roles: ["admin", "manager"]
  },
  {
    title: "Finance",
    url: createPageUrl("Finance"),
    icon: DollarSign,
    roles: ["admin", "manager"]
  },
  {
    title: "Academics",
    url: createPageUrl("Academics"),
    icon: GraduationCap,
    roles: ["admin", "teacher", "manager"]
  },
  {
    title: "Hifz Progress",
    url: createPageUrl("HifzProgress"),
    icon: BookOpen,
    roles: ["admin", "teacher", "student", "manager"]
  },
  {
    title: "Reports",
    url: createPageUrl("Reports"),
    icon: BarChart3,
    roles: ["admin", "manager"]
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      console.log("User not authenticated");
    }
    setLoading(false);
  };

  const getUserRole = () => {
    if (!user) return "student";
    return user.role || "student";
  };

  const filteredNavigation = navigationItems.filter(item => 
    item.roles.includes(getUserRole())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Landmark className="w-8 h-8 text-emerald-600" /> {/* Changed icon */}
          </div>
          <p className="text-emerald-600 font-medium">Loading Madrasa ERP...</p>
        </div>
      </div>
    );
  }

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
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-emerald-100/80 hover:text-emerald-800 transition-all duration-200 rounded-lg mb-1 group ${
                          location.pathname === item.url ? 'bg-emerald-100 text-emerald-800 shadow-sm' : 'text-emerald-700'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
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
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                      {getUserRole()}
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
                    {user.full_name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-emerald-900 text-sm truncate">
                    {user.full_name || 'User'}
                  </p>
                  <p className="text-xs text-emerald-600 truncate">{user.email}</p>
                </div>
              </div>
            ) : (
              <Button 
                onClick={() => User.login()}
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
                <h1 className="text-xl font-bold text-emerald-900">Madrasa ERP</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto bg-gradient-to-br from-emerald-50/50 to-teal-50/50">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
