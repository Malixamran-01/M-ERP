import React, { useState, useRef, useEffect } from 'react';

export const Select = ({ children, value, onValueChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleValueChange = (newValue) => {
    console.log('Select handleValueChange called with:', newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={selectRef} {...props}>
      {React.Children.map(children, child => 
        React.cloneElement(child, { 
          isOpen, 
          setIsOpen, 
          value, 
          onValueChange: handleValueChange 
        })
      )}
    </div>
  );
};

export const SelectTrigger = ({ children, className = '', isOpen, setIsOpen, ...props }) => (
  <button
    type="button"
    className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    onClick={() => setIsOpen(!isOpen)}
    {...props}
  >
    {children}
  </button>
);

export const SelectValue = ({ placeholder, value, children }) => {
  console.log('SelectValue rendered with value:', value, 'placeholder:', placeholder);
  if (children) {
    return children;
  }
  return <span className="text-muted-foreground">{value || placeholder}</span>;
};

export const SelectContent = ({ children, className = '', isOpen, ...props }) => {
  if (!isOpen) return null;
  
  return (
    <div
      className={`absolute top-full z-[9999] mt-1 w-full rounded-md border bg-white p-1 text-gray-900 shadow-lg ${className}`}
      style={{ minWidth: '200px' }}
      {...props}
    >
      {children}
    </div>
  );
};

export const SelectItem = ({ children, value, onValueChange, setIsOpen, className = '', ...props }) => (
  <div
    className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 px-3 text-sm hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('SelectItem clicked:', value);
      if (onValueChange) {
        onValueChange(value);
      }
    }}
    {...props}
  >
    {children}
  </div>
);



