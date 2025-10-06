import React, { useState } from 'react';
import Header from '../components/Header';
import VendorModal from '../components/VendorModal';
import { Plus, Search, Truck, Mail, Phone, MapPin, DollarSign, Package, CreditCard as Edit, Trash2 } from 'lucide-react';
import { mockVendors } from '../data/mockVendors';
import { mockIngredients } from '../data/mockIngredients';

const Suppliers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<any>(null);

  const filteredSuppliers = mockVendors.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIngredientCount = (supplierId: string) => {
    return mockIngredients.filter(ing => ing.supplierId === supplierId || ing.vendorId === supplierId).length;
  };

  const handleEdit = (supplier: any) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleDelete = (supplier: any) => {
    if (window.confirm(`Are you sure you want to delete "${supplier.name}"? This action cannot be undone.`)) {
      console.log('Delete supplier:', supplier.id);
      alert(`Supplier "${supplier.name}" has been deleted.`);
    }
  };

  const handleSubmit = (supplierData: any) => {
    console.log('Supplier saved:', supplierData);
    alert(`Supplier "${supplierData.name}" saved successfully!`);
    setEditingSupplier(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingSupplier(null);
  };

  return (
    <div className="p-6">
      <Header title="Suppliers" icon={Truck} />

      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full sm:w-96 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-coral-400 to-coral-500 rounded-full flex items-center justify-center">
                  <Truck className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Suppliers</p>
                <p className="text-lg font-semibold text-gray-900">{mockVendors.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-mint-400 to-mint-500 rounded-full flex items-center justify-center">
                  <Package className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Active Ingredients</p>
                <p className="text-lg font-semibold text-gray-900">{mockIngredients.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-aqua-400 to-aqua-500 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Avg Payment Terms</p>
                <p className="text-lg font-semibold text-gray-900">Net 30</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => {
            const ingredientCount = getIngredientCount(supplier.id);

            return (
              <div key={supplier.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
                      {supplier.contactPerson && (
                        <p className="text-sm text-gray-600 mt-1">{supplier.contactPerson}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-coral-400 to-pink-400 rounded-full flex items-center justify-center">
                        <Truck className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {supplier.email && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <a href={`mailto:${supplier.email}`} className="hover:text-coral-600 transition-colors">
                          {supplier.email}
                        </a>
                      </div>
                    )}
                    {supplier.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <a href={`tel:${supplier.phone}`} className="hover:text-coral-600 transition-colors">
                          {supplier.phone}
                        </a>
                      </div>
                    )}
                    {supplier.address && (
                      <div className="flex items-start text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                        <span>
                          {supplier.address}
                          {supplier.city && `, ${supplier.city}`}
                          {supplier.state && `, ${supplier.state}`}
                          {supplier.zip && ` ${supplier.zip}`}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Payment Terms</p>
                        <p className="text-sm font-medium text-gray-900">
                          {supplier.paymentTerms || 'Not specified'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Ingredients</p>
                        <p className="text-sm font-medium text-gray-900">{ingredientCount}</p>
                      </div>
                    </div>

                    {supplier.notes && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">Notes</p>
                        <p className="text-sm text-gray-700 line-clamp-2">{supplier.notes}</p>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(supplier)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <Edit className="h-4 w-4 mr-1.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(supplier)}
                        className="inline-flex items-center px-3 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredSuppliers.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-lg border border-gray-200">
              <Truck className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="text-gray-500 text-lg">No suppliers found</div>
              <div className="text-gray-400 text-sm mt-2">
                {searchTerm
                  ? 'Try adjusting your search criteria'
                  : 'Get started by adding your first supplier'}
              </div>
            </div>
          )}
        </div>
      </div>

      <VendorModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        vendor={editingSupplier}
      />
    </div>
  );
};

export default Suppliers;
