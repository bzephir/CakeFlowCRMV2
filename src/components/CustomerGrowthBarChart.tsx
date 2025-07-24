// src/components/CustomerGrowthBarChart.tsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type CustomerGrowthBarChartProps = {
  data?: { label: string; value: number }[];
};

const defaultData = [
  { label: 'Jan', value: 12 },
  { label: 'Feb', value: 18 },
  { label: 'Mar', value: 22 },
  { label: 'Apr', value: 25 },
  { label: 'May', value: 30 },
];

const CustomerGrowthBarChart: React.FC<CustomerGrowthBarChartProps> = ({ data = defaultData }) => {
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: 'Customer Growth',
        data: data.map((d) => d.value),
        backgroundColor: '#6366F1', // indigo-500
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 5 },
      },
    },
  };

  return (
    <div className="bg-white rounded-md shadow p-4">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CustomerGrowthBarChart;
