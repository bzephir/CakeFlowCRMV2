import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import VendorModal from '../components/VendorModal';
import { ArrowLeft, Mail, Phone, MapPin, DollarSign, Package, CreditCard as Edit, Trash2, FileText } from 'lucide-react';
import { mockVendors } from '../data/mockVendors';
import { mockIngredients } from '../data/mockIngredients';

const SupplierDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const supplier = mockVendors.find(v => v.id === id);

  if (!supplier) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="text-gray-500 text-lg">Supplier not found</div>
            <button
              onClick={() => navigate('/suppliers')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
            >
              Back to Suppliers
            </button>
          </div>
        </div>
      </div>
    );
  }

  const supplierIngredients = mockIngredients.filter(
    ing => ing.supplierId === id || ing.vendorId === id
  );

  const totalInventoryValue = supplierIngredients.reduce(
    (sum, ing) => sum + ing.purchasePrice * ing.quantityOnHand,
    0
  );

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${supplier.name}"? This action cannot be undone.`)) {
      console.log('Delete supplier:', supplier.id);
      alert(`Supplier "${supplier.name}" has been deleted.`);
      navigate('/suppliers');
    }
  };

  const handleSubmit = (supplierData: any) => {
    console.log('Supplier updated:', supplierData);
    alert(`Supplier "${supplierData.name}" updated successfully!`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate('/suppliers')}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Suppliers
        </button>
      </div>

      <Header title={supplier.name} icon={Package} />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-coral-400 to-coral-500 rounded-full flex items-center justify-center">
                  <Package className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Ingredients</p>
                <p className="text-lg font-semibold text-gray-900">{supplierIngredients.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-mint-400 to-mint-500 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Inventory Value</p>
                <p className="text-lg font-semibold text-gray-900">${totalInventoryValue.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-aqua-400 to-aqua-500 rounded-full flex items-center justify-center">
                  <FileText className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Payment Terms</p>
                <p className="text-lg font-semibold text-gray-900">{supplier.paymentTerms || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            </div>
            <div className="px-6 py-4">
              <dl className="space-y-4">
                {supplier.contactPerson && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Contact Person</dt>
                    <dd className="mt-1 text-sm text-gray-900">{supplier.contactPerson}</dd>
                  </div>
                )}
                {supplier.email && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 flex items-center text-sm text-gray-900">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <a href={`mailto:${supplier.email}`} className="text-coral-600 hover:text-coral-700 hover:underline">
                        {supplier.email}
                      </a>
                    </dd>
                  </div>
                )}
                {supplier.phone && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 flex items-center text-sm text-gray-900">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <a href={`tel:${supplier.phone}`} className="text-coral-600 hover:text-coral-700 hover:underline">
                        {supplier.phone}
                      </a>
                    </dd>
                  </div>
                )}
                {supplier.address && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                    <dd className="mt-1 flex items-start text-sm text-gray-900">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                      <span>
                        {supplier.address}
                        {supplier.city && (
                          <>
                            <br />
                            {supplier.city}
                            {supplier.state && `, ${supplier.state}`}
                            {supplier.zip && ` ${supplier.zip}`}
                          </>
                        )}
                      </span>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Business Details</h3>
            </div>
            <div className="px-6 py-4">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Payment Terms</dt>
                  <dd className="mt-1 text-sm text-gray-900">{supplier.paymentTerms || 'Not specified'}</dd>
                </div>
                {supplier.notes && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Notes</dt>
                    <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{supplier.notes}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(supplier.createdAt).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(supplier.updatedAt).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Ingredients from this Supplier</h3>
          </div>
          <div className="px-6 py-4">
            {supplierIngredients.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ingredient Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Qty on Hand
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Purchase Price
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Value
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {supplierIngredients.map(ing => (
                      <tr key={ing.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Link
                            to="/ingredients"
                            className="text-sm font-medium text-coral-600 hover:text-coral-700 hover:underline"
                          >
                            {ing.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                          {ing.category}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-700">
                          {ing.quantityOnHand} {ing.packageUnit}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-700">
                          ${ing.purchasePrice.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-700">
                          ${(ing.purchasePrice * ing.quantityOnHand).toFixed(2)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-700 capitalize">
                          {ing.location}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No ingredients from this supplier</p>
            )}
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleEdit}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Supplier
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Supplier
          </button>
        </div>
      </div>

      <VendorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        vendor={supplier}
      />
    </div>
  );
};

export default SupplierDetail;
