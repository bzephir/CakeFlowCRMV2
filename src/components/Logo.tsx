import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <svg
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Abstract cake layers with modern geometric design */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      
      {/* Bottom layer - largest circle with subtle cut */}
      <path
        d="M8 28 C8 24, 12 20, 20 20 C28 20, 32 24, 32 28 C32 30, 30 32, 28 32 L12 32 C10 32, 8 30, 8 28 Z"
        fill="url(#logoGradient)"
        opacity="0.9"
      />
      
      {/* Middle layer - medium ellipse */}
      <path
        d="M10 22 C10 19, 13 16, 20 16 C27 16, 30 19, 30 22 C30 24, 28 25, 26 25 L14 25 C12 25, 10 24, 10 22 Z"
        fill="url(#logoGradient)"
        opacity="0.95"
      />
      
      {/* Top layer - smallest circle */}
      <path
        d="M12 16 C12 14, 15 12, 20 12 C25 12, 28 14, 28 16 C28 17.5, 26 18, 24 18 L16 18 C14 18, 12 17.5, 12 16 Z"
        fill="currentColor"
      />
      
      {/* Abstract decorative elements - modern dots/accents */}
      <circle cx="22" cy="14" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="18" cy="13" r="1" fill="currentColor" opacity="0.4" />
      <circle cx="25" cy="23" r="1" fill="currentColor" opacity="0.3" />
      
      {/* Flowing accent line */}
      <path
        d="M15 8 Q20 6, 25 8 Q28 10, 26 12"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Logo;