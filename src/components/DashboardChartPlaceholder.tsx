// src/components/DashboardChartPlaceholder.tsx
import React from 'react';
import { BarChart2 } from 'lucide-react';

interface Props {
  title: string;
  description?: string;
}

const DashboardChartPlaceholder: React.FC<Props> = ({ title, description }) => (
  <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex flex-col items-center justify-center h-64 hover:shadow-lg transition-shadow">
    <BarChart2 className="w-12 h-12 text-coral-400 mb-2" />
    <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
    <p className="text-gray-500 text-sm text-center">{description || 'Chart coming soon.'}</p>
  </div>
);

export default DashboardChartPlaceholder;