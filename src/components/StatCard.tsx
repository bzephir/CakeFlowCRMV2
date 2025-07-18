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
    <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow h-40">
      <div className="p-4 h-full flex flex-col justify-between">
        <div className="flex flex-col items-center text-center">
          <div className="flex-shrink-0">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${colorClasses[color]} mb-3`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-xs font-medium text-gray-500 mb-2 leading-tight">{title}</p>
            <p className="text-xl font-bold text-gray-900 tracking-tight mb-1">{value}</p>
          </div>
        </div>
        {change && (
          <div className="text-center">
            <p className={`text-xs font-medium ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
              {changeType === 'increase' ? '+' : ''}{change}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;