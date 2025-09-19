import React from 'react';

export const Badge = ({ children, className = '', variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-primary hover:bg-primary/80 text-primary-foreground',
    secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
    destructive: 'bg-destructive hover:bg-destructive/80 text-destructive-foreground',
    outline: 'text-foreground border border-input'
  };
  
  // Check if custom colors are being applied (contains bg- and text- classes)
  const hasCustomColors = className.includes('bg-') && className.includes('text-');
  
  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
        hasCustomColors ? '' : variants[variant]
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};






