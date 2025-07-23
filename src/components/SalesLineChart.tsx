import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Example props type — allows data to be passed from parent/API
type SalesLineChartProps = {
  data?: { label: string; value: number }[];
};

// Dummy data fallback
const defaultData = [
  { label: 'Jan', value: 12000 },
  { label: 'Feb', value: 15000 },
  { label: 'Mar', value: 13000 },
  { label: 'Apr', value: 17000 },
  { label: 'May', value: 22000 },
];

const SalesLineChart: React.FC<SalesLineChartProps> = ({ data = defaultData }) => {
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: 'Sales',
        data: data.map((d) => d.value),
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderColor: '#6366F1',
        tension: 0.3,
        pointRadius: 4,
        fill: true,
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
        ticks: { callback: (v: number) => '$' + v.toLocaleString() },
      },
    },
  };

  return (
    <div className="bg-white rounded-md shadow p-4">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SalesLineChart;
