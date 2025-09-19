import React, { useState, createContext, useContext } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({ children, className = '', ...props }) => {
  const { isOpen } = useContext(SidebarContext);
  
  return (
    <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed left-0 top-0 z-40 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none ${className}`} {...props}>
      {children}
    </div>
  );
};

export const SidebarHeader = ({ children, className = '', ...props }) => (
  <div className={`border-b border-gray-200 ${className}`} {...props}>
    {children}
  </div>
);

export const SidebarContent = ({ children, className = '', ...props }) => (
  <div className={`flex-1 overflow-y-auto ${className}`} {...props}>
    {children}
  </div>
);

export const SidebarFooter = ({ children, className = '', ...props }) => (
  <div className={`border-t border-gray-200 ${className}`} {...props}>
    {children}
  </div>
);

export const SidebarGroup = ({ children, className = '', ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

export const SidebarGroupLabel = ({ children, className = '', ...props }) => (
  <div className={`mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 ${className}`} {...props}>
    {children}
  </div>
);

export const SidebarGroupContent = ({ children, className = '', ...props }) => (
  <div className={`space-y-1 ${className}`} {...props}>
    {children}
  </div>
);

export const SidebarMenu = ({ children, className = '', ...props }) => (
  <nav className={`space-y-1 ${className}`} {...props}>
    {children}
  </nav>
);

export const SidebarMenuItem = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

export const SidebarMenuButton = ({ children, asChild = false, className = '', ...props }) => {
  if (asChild) {
    return <div className={className} {...props}>{children}</div>;
  }
  
  return (
    <button className={`w-full text-left ${className}`} {...props}>
      {children}
    </button>
  );
};

export const SidebarTrigger = ({ className = '', ...props }) => {
  const { setIsOpen } = useContext(SidebarContext);
  
  return (
    <button
      className={`p-2 rounded-md hover:bg-gray-100 lg:hidden ${className}`}
      onClick={() => setIsOpen(prev => !prev)}
      {...props}
    >
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
};






