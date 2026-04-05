import React from "react";

interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "brand" | "slate" | "white";
  fullHeight?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ 
  className = "", 
  size = "md", 
  variant = "brand",
  fullHeight = false
}) => {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4"
  };

  const variantClasses = {
    brand: "border-slate-100 border-t-red-600",
    slate: "border-slate-100 border-t-slate-900",
    white: "border-white/20 border-t-white"
  };

  const ringStyles = `${sizeClasses[size]} ${variantClasses[variant]} rounded-full animate-spin`;
  const containerStyles = `flex items-center justify-center ${fullHeight ? "h-full min-h-[200px]" : ""} ${className}`;

  return (
    <div className={containerStyles}>
      <div className="relative">
        <div className={ringStyles}></div>
        <div className={`absolute inset-0 flex items-center justify-center`}>
            <div className={`
                ${size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : "w-3 h-3"} 
                rounded-full bg-red-600 animate-pulse
            `}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
