import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtext?: string;
  color: 'coral' | 'aqua' | 'mint' | 'pink' | 'gray';
  onClick?: () => void;
  isActive?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  icon: Icon,
  label,
  value,
  subtext,
  color,
  onClick,
  isActive = false,
}) => {
  const colorClasses = {
    coral: {
      bg: 'bg-gradient-to-br from-coral-50 to-coral-100',
      icon: 'text-coral-600',
      border: 'border-coral-300',
      activeBg: 'from-coral-100 to-coral-200',
      activeBorder: 'border-coral-500',
    },
    aqua: {
      bg: 'bg-gradient-to-br from-aqua-50 to-aqua-100',
      icon: 'text-aqua-600',
      border: 'border-aqua-300',
      activeBg: 'from-aqua-100 to-aqua-200',
      activeBorder: 'border-aqua-500',
    },
    mint: {
      bg: 'bg-gradient-to-br from-mint-50 to-mint-100',
      icon: 'text-mint-600',
      border: 'border-mint-300',
      activeBg: 'from-mint-100 to-mint-200',
      activeBorder: 'border-mint-500',
    },
    pink: {
      bg: 'bg-gradient-to-br from-pink-50 to-pink-100',
      icon: 'text-pink-600',
      border: 'border-pink-300',
      activeBg: 'from-pink-100 to-pink-200',
      activeBorder: 'border-pink-500',
    },
    gray: {
      bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
      icon: 'text-gray-600',
      border: 'border-gray-300',
      activeBg: 'from-gray-100 to-gray-200',
      activeBorder: 'border-gray-500',
    },
  };

  const colors = colorClasses[color];
  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-lg border-2 transition-all duration-200
        ${isActive ? `${colors.activeBg} ${colors.activeBorder} shadow-md` : `${colors.bg} ${colors.border} shadow-sm`}
        ${isClickable ? 'cursor-pointer hover:shadow-lg hover:scale-105 transform' : ''}
        p-4
      `}
      role={isClickable ? 'button' : 'presentation'}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => e.key === 'Enter' && onClick?.() : undefined}
      aria-pressed={isActive}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">
            {label}
          </p>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {value}
          </p>
          {subtext && (
            <p className="text-xs text-gray-500">
              {subtext}
            </p>
          )}
        </div>
        <div className={`${colors.icon} transition-transform ${isActive ? 'scale-110' : ''}`}>
          <Icon className="h-8 w-8" />
        </div>
      </div>
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50" />
      )}
    </div>
  );
};

export default SummaryCard;
