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
    coral: 'from-coral-400 to-coral-500',
    aqua: 'from-aqua-400 to-aqua-500',
    mint: 'from-mint-400 to-mint-500',
    pink: 'from-pink-400 to-pink-500',
  };

  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]}`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
            <p className="text-2xl font-semibold text-gray-900 tracking-tight">{value}</p>
            {change && (
              <p className={`text-sm font-medium ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                {changeType === 'increase' ? '+' : ''}{change}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;