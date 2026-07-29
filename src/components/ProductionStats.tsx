import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardData {
  label: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
}

interface ProductionStatsProps {
  stats: StatCardData[];
}

const ProductionStats: React.FC<ProductionStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 bg-gradient-to-r ${stat.gradient} rounded-full flex items-center justify-center`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductionStats;
