import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import type { MasterIngredient, MeasurementUnit } from '../types/ingredient';
import { convertUnit, calculatePriceForQuantity } from '../types/ingredient';

interface MeasurementConverterProps {
  ingredients: MasterIngredient[];
}

const MeasurementConverter: React.FC<MeasurementConverterProps> = ({ ingredients }) => {
  const [selectedIngredientId, setSelectedIngredientId] = useState('');
  const [inputQuantity, setInputQuantity] = useState<number>(1);
  const [inputUnit, setInputUnit] = useState<MeasurementUnit>('cup');

  const units: MeasurementUnit[] = ['g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'cup', 'lb', 'oz', 'gal'];

  const selectedIngredient = ingredients.find(ing => ing.id === selectedIngredientId);

  const conversions = selectedIngredient ? units.map(unit => {
    const convertedQuantity = convertUnit(inputQuantity, inputUnit, unit);
    if (convertedQuantity === null) return null;

    const price = calculatePriceForQuantity(
      selectedIngredient.costPerUnit,
      convertedQuantity,
      unit,
      selectedIngredient.baseUnit
    );

    return {
      unit,
      quantity: convertedQuantity,
      price
    };
  }).filter(Boolean) : [];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex items-center mb-4">
        <Calculator className="h-5 w-5 text-coral-500 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Measurement Converter</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Ingredient
          </label>
          <select
            value={selectedIngredientId}
            onChange={(e) => setSelectedIngredientId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
          >
            <option value="">Choose an ingredient...</option>
            {ingredients.map(ing => (
              <option key={ing.id} value={ing.id}>{ing.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            step="0.01"
            value={inputQuantity}
            onChange={(e) => setInputQuantity(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unit
          </label>
          <select
            value={inputUnit}
            onChange={(e) => setInputUnit(e.target.value as MeasurementUnit)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
          >
            {units.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedIngredient && conversions.length > 0 ? (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Conversion Results</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {conversions.map((conv: any) => (
                <div key={conv.unit} className="text-center">
                  <div className="text-xs text-gray-500 mb-1">{conv.unit}</div>
                  <div className="text-sm font-medium text-gray-900">
                    {conv.quantity.toFixed(3)} {conv.unit}
                  </div>
                  <div className="text-xs text-coral-600 mt-1">
                    ${conv.price.toFixed(4)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Cost per {selectedIngredient.baseUnit}:
                </span>
                <span className="text-sm font-medium text-gray-900">
                  ${selectedIngredient.costPerUnit.toFixed(4)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 text-sm">
          {selectedIngredientId ? 'No conversions available for this ingredient' : 'Select an ingredient to see price conversions'}
        </div>
      )}
    </div>
  );
};

export default MeasurementConverter;
