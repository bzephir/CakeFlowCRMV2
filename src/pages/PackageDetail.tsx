import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { ArrowLeft, CreditCard as Edit, DollarSign, Package as PackageIcon, TrendingUp, Info, Users, ChefHat, Box } from 'lucide-react';
import { getPackageById } from '../data/mockPackages';
import type { Package } from '../types/package';

const PackageDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'information' | 'recipes' | 'materials'>('information');

  const pkg = getPackageById(id || '');

  if (!pkg) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <PackageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p>Package not found</p>
          <button
            onClick={() => navigate('/packages')}
            className="mt-4 text-mint-600 hover:text-mint-700"
          >
            Return to Packages
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-mint-100 text-mint-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'archived':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryDisplay = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getMarginColor = (margin: number | undefined) => {
    if (!margin) return 'text-gray-600';
    if (margin < 100) return 'text-red-600';
    if (margin < 150) return 'text-yellow-600';
    if (margin < 200) return 'text-mint-600';
    return 'text-green-600';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleEdit = () => {
    alert(`Edit package: ${pkg.name}`);
  };

  const handleDuplicate = () => {
    alert(`Duplicate package: ${pkg.name}`);
  };

  const recipesCost = pkg.recipes.reduce((sum, recipe) => sum + recipe.costContribution, 0);
  const materialsCost = pkg.materials.reduce((sum, material) => sum + material.totalCost, 0);

  return (
    <div className="flex-1 overflow-hidden">
      <Header title={pkg.name} icon={PackageIcon} />

      <div className="p-6">
        <button
          onClick={() => navigate('/packages')}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Packages
        </button>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200 mb-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-semibold text-gray-900">{pkg.name}</h1>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(pkg.status)}`}>
                {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
              </span>
              {pkg.isTemplate && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Template
                </span>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Package
              </button>
              <button
                onClick={handleDuplicate}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <PackageIcon className="h-4 w-4 mr-2" />
                Duplicate
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'information', name: 'Package Information', icon: Info },
                { id: 'recipes', name: 'Recipes', icon: ChefHat, count: pkg.recipes.length },
                { id: 'materials', name: 'Materials', icon: Box, count: pkg.materials.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center py-3 px-4 font-medium text-sm transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'border-mint-500 text-mint-600 bg-mint-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.name}
                  {tab.count !== undefined && (
                    <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                      activeTab === tab.id
                        ? 'bg-mint-100 text-mint-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className={`p-6 transition-colors ${
            activeTab === 'information' ? 'bg-mint-50/30' :
            activeTab === 'recipes' ? 'bg-mint-50/30' :
            activeTab === 'materials' ? 'bg-mint-50/30' : ''
          }`}>
            {activeTab === 'information' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Package Name</p>
                      <p className="text-sm font-medium text-gray-900">{pkg.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Category</p>
                      <p className="text-sm font-medium text-gray-900">{getCategoryDisplay(pkg.category)}</p>
                    </div>
                    {pkg.servings && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Servings</p>
                        <p className="text-sm font-medium text-gray-900 flex items-center">
                          <Users className="h-4 w-4 mr-1 text-mint-600" />
                          {pkg.servings} servings
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Times Ordered</p>
                      <p className="text-sm font-medium text-gray-900">{pkg.timesOrdered}</p>
                    </div>
                  </div>
                  {pkg.description && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Description</p>
                      <p className="text-sm text-gray-700">{pkg.description}</p>
                    </div>
                  )}
                  {pkg.notes && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Notes</p>
                      <p className="text-sm text-gray-700 italic">{pkg.notes}</p>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Financial Information</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div className="flex items-center">
                        <ChefHat className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-600">Recipes Cost</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(recipesCost)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div className="flex items-center">
                        <Box className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-600">Materials Cost</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(materialsCost)}</span>
                    </div>
                    {pkg.laborCost && pkg.laborCost > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Labor Cost</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(pkg.laborCost)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-base font-semibold text-gray-900">Total Cost</span>
                      <span className="text-base font-semibold text-gray-900">{formatCurrency(pkg.totalCost)}</span>
                    </div>
                    {pkg.basePrice && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Base Price</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(pkg.basePrice)}</span>
                      </div>
                    )}
                    {pkg.sellingPrice && (
                      <>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2 text-mint-600" />
                            <span className="text-sm text-gray-600">Selling Price</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{formatCurrency(pkg.sellingPrice)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-sm text-gray-600">Profit</span>
                          <span className="text-sm font-semibold text-green-600">
                            {formatCurrency(pkg.sellingPrice - pkg.totalCost)}
                          </span>
                        </div>
                        {pkg.profitMargin && (
                          <div className="flex justify-between items-center py-2">
                            <div className="flex items-center">
                              <TrendingUp className="h-4 w-4 mr-2 text-mint-600" />
                              <span className="text-sm text-gray-600">Profit Margin</span>
                            </div>
                            <span className={`text-sm font-semibold ${getMarginColor(pkg.profitMargin)}`}>
                              {pkg.profitMargin.toFixed(1)}%
                            </span>
                          </div>
                        )}
                        {pkg.servings && (
                          <div className="flex justify-between items-center py-2 pt-4 border-t border-gray-200">
                            <span className="text-sm text-gray-600">Cost Per Serving</span>
                            <span className="text-sm font-medium text-gray-900">
                              {formatCurrency(pkg.totalCost / pkg.servings)}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Created</h3>
                    <p className="text-sm font-medium text-gray-900">{formatDate(pkg.createdAt)}</p>
                    <p className="text-xs text-gray-500 mt-1">by {pkg.createdBy}</p>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Last Updated</h3>
                    <p className="text-sm font-medium text-gray-900">{formatDate(pkg.updatedAt)}</p>
                    {pkg.lastOrdered && (
                      <p className="text-xs text-gray-500 mt-2">Last ordered: {formatDate(pkg.lastOrdered)}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'recipes' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recipes ({pkg.recipes.length})
                </h3>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Recipe Name
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Multiplier
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Cost Contribution
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pkg.recipes.map((recipe) => (
                        <tr key={recipe.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <ChefHat className="h-4 w-4 mr-2 text-mint-600" />
                              <span className="text-sm font-medium text-gray-900">{recipe.recipeName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="text-sm text-gray-600">{recipe.quantityMultiplier}x</span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className="text-sm font-medium text-gray-900">
                              {formatCurrency(recipe.costContribution)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-gray-500 italic">
                              {recipe.notes || '-'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={2} className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
                          Total Recipes Cost:
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                          {formatCurrency(recipesCost)}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'materials' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Materials ({pkg.materials.length})
                </h3>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Material Name
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Cost Per Item
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Total Cost
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pkg.materials.map((material) => (
                        <tr key={material.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <Box className="h-4 w-4 mr-2 text-mint-600" />
                              <span className="text-sm font-medium text-gray-900">{material.materialName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="text-sm text-gray-600">{material.quantity}</span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className="text-sm text-gray-600">
                              {formatCurrency(material.costPerItem)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className="text-sm font-medium text-gray-900">
                              {formatCurrency(material.totalCost)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-gray-500 italic">
                              {material.notes || '-'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={3} className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">
                          Total Materials Cost:
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                          {formatCurrency(materialsCost)}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
