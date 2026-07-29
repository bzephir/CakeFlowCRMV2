import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import VendorModal from '../components/VendorModal';
import { Plus, Search, Truck, Mail, Phone, MapPin, DollarSign, Package, CreditCard as Edit, Trash2, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { mockVendors } from '../data/mockVendors';
import { mockIngredients } from '../data/mockIngredients';

const Suppliers: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<any>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredSuppliers = useMemo(() => {
    return mockVendors.filter(supplier =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSuppliers = filteredSuppliers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedId(null);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
    setExpandedId(null);
  };

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const getIngredientCount = (supplierId: string) => {
    return mockIngredients.filter(ing => ing.supplierId === supplierId || ing.vendorId === supplierId).length;
  };

  const getInventoryValue = (supplierId: string) => {
    const supplierIngredients = mockIngredients.filter(
      ing => ing.supplierId === supplierId || ing.vendorId === supplierId
    );
    return supplierIngredients.reduce(
      (sum, ing) => sum + ing.purchasePrice * ing.quantityOnHand,
      0
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEdit = (supplier: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleDelete = (supplier: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${supplier.name}"? This action cannot be undone.`)) {
      console.log('Delete supplier:', supplier.id);
      alert(`Supplier "${supplier.name}" has been deleted.`);
    }
  };

  const handleViewDetails = (supplierId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/suppliers/${supplierId}`);
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

        <div className="bg-gray-50 rounded-t-lg border border-gray-200 border-b-0">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex-1">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Name</span>
              </div>
              <div className="w-40 text-left">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</span>
              </div>
              <div className="w-48 text-left">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</span>
              </div>
              <div className="w-32 text-left">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</span>
              </div>
              <div className="w-28 text-left">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">City</span>
              </div>
              <div className="w-28 text-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Terms</span>
              </div>
              <div className="w-24 text-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Ingredients</span>
              </div>
            </div>
            <div className="w-10">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider"></span>
            </div>
          </div>
        </div>

        <div className="space-y-0">
          {paginatedSuppliers.map((supplier) => {
            const isExpanded = expandedId === supplier.id;
            const ingredientCount = getIngredientCount(supplier.id);
            const inventoryValue = getInventoryValue(supplier.id);

            return (
              <div key={supplier.id} className="bg-white border-l border-r border-b border-gray-200 shadow-sm overflow-hidden hover:bg-gray-50 transition-colors">
                <div
                  className="flex items-center justify-between px-4 py-2 cursor-pointer"
                  onClick={() => toggleExpand(supplier.id)}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{supplier.name}</h3>
                    </div>
                    <div className="w-40 text-left">
                      <span className="text-sm text-gray-700">{supplier.contactPerson || '-'}</span>
                    </div>
                    <div className="w-48 text-left">
                      <span className="text-sm text-gray-700 truncate block">{supplier.email || '-'}</span>
                    </div>
                    <div className="w-32 text-left">
                      <span className="text-sm text-gray-700">{supplier.phone || '-'}</span>
                    </div>
                    <div className="w-28 text-left">
                      <span className="text-sm text-gray-700">{supplier.city || '-'}</span>
                    </div>
                    <div className="w-28 text-center">
                      <span className="text-sm text-gray-700">{supplier.paymentTerms || '-'}</span>
                    </div>
                    <div className="w-24 text-center">
                      <span className="text-sm font-medium text-gray-900">{ingredientCount}</span>
                    </div>
                  </div>
                  <div className="w-10 flex justify-center">
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Contact Information</h4>
                        <dl className="space-y-1.5">
                          {supplier.contactPerson && (
                            <div>
                              <dt className="text-xs text-gray-500">Contact Person</dt>
                              <dd className="text-sm text-gray-900">{supplier.contactPerson}</dd>
                            </div>
                          )}
                          {supplier.email && (
                            <div>
                              <dt className="text-xs text-gray-500">Email</dt>
                              <dd className="text-sm text-gray-900">
                                <a href={`mailto:${supplier.email}`} className="text-coral-600 hover:text-coral-700 hover:underline">
                                  {supplier.email}
                                </a>
                              </dd>
                            </div>
                          )}
                          {supplier.phone && (
                            <div>
                              <dt className="text-xs text-gray-500">Phone</dt>
                              <dd className="text-sm text-gray-900">
                                <a href={`tel:${supplier.phone}`} className="text-coral-600 hover:text-coral-700 hover:underline">
                                  {supplier.phone}
                                </a>
                              </dd>
                            </div>
                          )}
                          {supplier.address && (
                            <div>
                              <dt className="text-xs text-gray-500">Address</dt>
                              <dd className="text-sm text-gray-900">
                                {supplier.address}
                                {supplier.city && (
                                  <>
                                    <br />
                                    {supplier.city}
                                    {supplier.state && `, ${supplier.state}`}
                                    {supplier.zip && ` ${supplier.zip}`}
                                  </>
                                )}
                              </dd>
                            </div>
                          )}
                        </dl>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Business Details</h4>
                        <dl className="space-y-1.5">
                          <div>
                            <dt className="text-xs text-gray-500">Payment Terms</dt>
                            <dd className="text-sm text-gray-900">{supplier.paymentTerms || 'Not specified'}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Created</dt>
                            <dd className="text-sm text-gray-900">{new Date(supplier.createdAt).toLocaleDateString()}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Last Updated</dt>
                            <dd className="text-sm text-gray-900">{new Date(supplier.updatedAt).toLocaleDateString()}</dd>
                          </div>
                          {supplier.notes && (
                            <div>
                              <dt className="text-xs text-gray-500">Notes</dt>
                              <dd className="text-sm text-gray-900">{supplier.notes}</dd>
                            </div>
                          )}
                        </dl>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Inventory Summary</h4>
                        <dl className="space-y-1.5">
                          <div>
                            <dt className="text-xs text-gray-500">Total Ingredients</dt>
                            <dd className="text-sm text-gray-900">{ingredientCount}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Total Inventory Value</dt>
                            <dd className="text-sm text-gray-900">${inventoryValue.toFixed(2)}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div className="mt-3 flex space-x-2">
                      <button
                        onClick={(e) => handleViewDetails(supplier.id, e)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <Eye className="h-4 w-4 mr-1.5" />
                        View Full Details
                      </button>
                      <button
                        onClick={(e) => handleEdit(supplier, e)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <Edit className="h-4 w-4 mr-1.5" />
                        Edit Supplier
                      </button>
                      <button
                        onClick={(e) => handleDelete(supplier, e)}
                        className="inline-flex items-center px-3 py-1.5 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-4 w-4 mr-1.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredSuppliers.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
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

        {filteredSuppliers.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredSuppliers.length)} of {filteredSuppliers.length} suppliers
                </span>
                <div className="flex items-center space-x-2">
                  <label htmlFor="itemsPerPage" className="text-sm text-gray-700">
                    Show:
                  </label>
                  <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                    className="block w-20 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Previous
                </button>

                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        currentPage === page
                          ? 'bg-coral-500 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
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
