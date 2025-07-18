// src/components/DashboardChartPlaceholder.tsx
import React from 'react';
import { BarChart2 } from 'lucide-react';

interface Props {
  title: string;
  description?: string;
}

const DashboardChartPlaceholder: React.FC<Props> = ({ title, description }) => (
  <div className="rounded-lg bg-gray-50 border border-dashed border-gray-200 shadow-sm p-6 flex flex-col items-center justify-center h-64">
    <BarChart2 className="w-10 h-10 text-gray-300 mb-2" />
    <h3 className="font-semibold text-gray-700 mb-1">{title}</h3>
    <p className="text-gray-400 text-sm text-center">{description || 'Chart coming soon.'}</p>
  </div>
);

export default DashboardChartPlaceholder;
