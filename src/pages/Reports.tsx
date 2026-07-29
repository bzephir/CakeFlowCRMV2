import React, { useState } from 'react';
import { DollarSign, ShoppingBag, Users, BarChart3 } from 'lucide-react'; // Ensure BarChart3 is imported
import StatCard from '../components/StatCard';
import SalesLineChart from '../components/SalesLineChart';
import CustomerGrowthBarChart from '../components/CustomerGrowthBarChart';
import Header from '../components/Header'; // Ensure Header is imported

import {
  summaryStats,
  mockSalesReportData,
  mockOrderSummary,
  mockCustomerGrowth,
} from '../data/mockData';

const Reports: React.FC = () => {
  // State for filters and tab navigation
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [reportType, setReportType] = useState<'sales' | 'orders' | 'customers'>('sales');
  const [productCategory, setProductCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'salesOverview' | 'orderSummary' | 'customerGrowth'>(
    'salesOverview'
  );

  // States for loading/error/empty
  const [isLoading] = useState(false);
  const [isError] = useState(false);
  const [isEmpty] = useState(false);

  return (
    <div className="p-6">
      {/* Page Header */}
      <Header title="Reports" icon={BarChart3} /> {/* Pass BarChart3 as the icon prop */}
          {/* Filter section */}
      <div className="bg-white p-4 border rounded-md shadow-sm mb-8 flex flex-wrap gap-4">
        <input
          type="date"
          className="border rounded px-3 py-2 text-sm"
          value={startDate ?? ''}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border rounded px-3 py-2 text-sm"
          value={endDate ?? ''}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2 text-sm"
          value={reportType}
          onChange={(e) => setReportType(e.target.value as any)}
        >
          <option value="sales">Sales</option>
          <option value="orders">Orders</option>
          <option value="customers">Customers</option>
        </select>
        <select
          className="border rounded px-3 py-2 text-sm"
          value={productCategory ?? ''}
          onChange={(e) => setProductCategory(e.target.value === '' ? null : e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="cakes">Cakes</option>
          <option value="treats">Treats</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Sales"
          value={summaryStats.totalSales}
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Total Orders"
          value={summaryStats.totalOrders.toString()}
          icon={ShoppingBag}
          color="blue"
        />
        <StatCard
          title="Total Customers"
          value={summaryStats.totalCustomers.toString()}
          icon={Users}
          color="purple"
        />
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`flex items-center py-3 px-4 font-medium text-sm transition-all border-b-2 ${
                activeTab === 'salesOverview'
                  ? 'border-coral-500 text-coral-600 bg-coral-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('salesOverview')}
            >
              Sales Overview
            </button>
            <button
              className={`flex items-center py-3 px-4 font-medium text-sm transition-all border-b-2 ${
                activeTab === 'orderSummary'
                  ? 'border-coral-500 text-coral-600 bg-coral-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('orderSummary')}
            >
              Order Summary
            </button>
            <button
              className={`flex items-center py-3 px-4 font-medium text-sm transition-all border-b-2 ${
                activeTab === 'customerGrowth'
                  ? 'border-coral-500 text-coral-600 bg-coral-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('customerGrowth')}
            >
              Customer Growth
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className={`p-6 transition-colors min-h-[200px] ${
          activeTab === 'salesOverview' ? 'bg-coral-50/30' :
          activeTab === 'orderSummary' ? 'bg-coral-50/30' :
          activeTab === 'customerGrowth' ? 'bg-coral-50/30' : ''
        }`}>
        {isLoading ? (
          <div className="text-gray-400 text-center py-10">Loading...</div>
        ) : isError ? (
          <div className="text-red-500 text-center py-10">Error loading reports.</div>
        ) : isEmpty ? (
          <div className="text-gray-400 text-center py-10">No data available for selected filters.</div>
        ) : (
          <>
            {activeTab === 'salesOverview' && (
                <SalesLineChart data={mockSalesReportData} />
            )}
            {activeTab === 'orderSummary' && (
              <div className="overflow-x-auto">
                <table className="table-auto w-full text-sm">
                  <thead className="bg-gray-50 text-left text-gray-600 font-medium">
                    <tr>
                      <th className="px-4 py-2">Order ID</th>
                      <th className="px-4 py-2">Customer</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Total</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrderSummary.map((order) => (
                      <tr key={order.id} className="border-t text-gray-700">
                        <td className="px-4 py-2">{order.id}</td>
                        <td className="px-4 py-2">{order.customer}</td>
                        <td className="px-4 py-2">{order.date}</td>
                        <td className="px-4 py-2">{order.total}</td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 rounded bg-gray-100 text-xs">{order.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
  {activeTab === 'customerGrowth' && (
                <CustomerGrowthBarChart data={mockCustomerGrowth} />   
            )}
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
