import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'option';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative font-bold rounded-2xl transition-all duration-200 transform active:scale-95 shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1";
  
  const variants = {
    primary: "bg-indigo-500 hover:bg-indigo-400 text-white border-b-indigo-700",
    secondary: "bg-fuchsia-500 hover:bg-fuchsia-400 text-white border-b-fuchsia-700",
    danger: "bg-rose-500 hover:bg-rose-400 text-white border-b-rose-700",
    success: "bg-emerald-500 hover:bg-emerald-400 text-white border-b-emerald-700",
    option: "bg-slate-800 hover:bg-slate-700 text-cyan-300 border-2 border-slate-600 hover:border-cyan-400 text-2xl py-6"
  };

  const widthClass = fullWidth ? "w-full" : "px-8 py-3";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};