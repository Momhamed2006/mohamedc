import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'whatsapp';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-rose-400 hover:bg-rose-500 text-white shadow-md shadow-rose-200 focus:ring-rose-300",
    secondary: "bg-sky-400 hover:bg-sky-500 text-white shadow-md shadow-sky-200 focus:ring-sky-300",
    danger: "bg-red-400 hover:bg-red-500 text-white focus:ring-red-300",
    outline: "border-2 border-rose-200 bg-transparent text-rose-500 hover:bg-rose-50 focus:ring-rose-200",
    whatsapp: "bg-[#25D366] hover:bg-[#128C7E] text-white shadow-md focus:ring-green-400"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};