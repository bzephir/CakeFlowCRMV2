import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: LucideIcon;
  color: 'coral' | 'aqua' | 'mint' | 'pink';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon: Icon, color }) => {
  const colorClasses = {
    coral: 'bg-gradient-to-r from-coral-400 to-coral-500',
    aqua: 'bg-gradient-to-r from-aqua-400 to-aqua-500',
    mint: 'bg-gradient-to-r from-mint-400 to-mint-500',
    pink: 'bg-gradient-to-r from-pink-400 to-pink-500',
  };

  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow h-48">
      {/* Colored Header with Icon */}
      <div className={`${colorClasses[color]} px-4 py-6 flex items-center justify-center`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      
      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between h-32">
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
        </div>
        {change && (
          <div className="text-center mt-auto">
            <p className={`text-sm font-semibold ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
              {changeType === 'increase' ? '+' : ''}{change}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;