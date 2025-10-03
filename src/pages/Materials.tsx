import React from 'react';
import Header from '../components/Header';
import { Package } from 'lucide-react';

const Materials: React.FC = () => {
  return (
    <div className="p-6">
      <Header title="Materials Inventory" icon={Package} />
      <div className="p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Materials Module</h2>
          <p className="text-gray-600">Materials management coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Materials;
