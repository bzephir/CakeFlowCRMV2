import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Package, Factory } from 'lucide-react';
import Header from '../components/Header';
import ProductionJobForm from '../components/ProductionJobForm';

const CreateProductionJob: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state?.orderId;
  const recipeId = location.state?.recipeId;
  const orderData = location.state?.orderData;

  const handleSubmit = (jobData: any) => {
    console.log('Creating production job:', jobData);

    alert('Production job created successfully!');
    navigate('/production');
  };

  const handleCancel = () => {
    navigate('/production');
  };

  return (
    <div className="p-6">
      <Header title="Create Production Job" icon={Factory} />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <button
            onClick={handleCancel}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Production Jobs
          </button>
        </div>

      {orderData && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Order Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-blue-600">Order:</span>
              <span className="ml-2 font-medium text-blue-900">{orderData.orderNumber}</span>
            </div>
            <div>
              <span className="text-blue-600">Customer:</span>
              <span className="ml-2 font-medium text-blue-900">{orderData.customerName}</span>
            </div>
            <div>
              <span className="text-blue-600">Event Date:</span>
              <span className="ml-2 font-medium text-blue-900">{orderData.eventDate}</span>
            </div>
            <div>
              <span className="text-blue-600">Event Type:</span>
              <span className="ml-2 font-medium text-blue-900">{orderData.eventType}</span>
            </div>
          </div>
        </div>
      )}

      <ProductionJobForm
        orderId={orderId}
        recipeId={recipeId}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      </div>
    </div>
  );
};

export default CreateProductionJob;
