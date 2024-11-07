import React from 'react';
import { AlertTriangle, Package, Pill, RefreshCcw, Calendar } from 'lucide-react';
import type { Medication } from '../../types/medication';

const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Lisinopril',
    type: 'pill',
    strength: '10',
    unit: 'mg',
    instructions: 'Take one tablet daily with water',
    sideEffects: ['Dizziness', 'Cough', 'Headache'],
    interactions: ['NSAIDs', 'Potassium supplements'],
    stock: 145,
    reorderPoint: 50,
    supplier: 'PharmaCare Inc.',
    lastRefill: '2024-03-01',
    nextRefill: '2024-04-01',
    status: 'in-stock',
  },
  {
    id: '2',
    name: 'Metformin',
    type: 'pill',
    strength: '500',
    unit: 'mg',
    instructions: 'Take with meals twice daily',
    sideEffects: ['Nausea', 'Diarrhea', 'Loss of appetite'],
    interactions: ['Alcohol', 'Contrast dyes'],
    stock: 42,
    reorderPoint: 50,
    supplier: 'MediSource Ltd.',
    lastRefill: '2024-03-15',
    nextRefill: '2024-04-15',
    status: 'low-stock',
  },
];

const statusColors = {
  'in-stock': 'bg-green-50 text-green-700 ring-green-600/20',
  'low-stock': 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  'out-of-stock': 'bg-red-50 text-red-700 ring-red-600/20',
  'discontinued': 'bg-gray-50 text-gray-700 ring-gray-600/20',
};

const MedicationInventoryList: React.FC = () => {
  return (
    <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
      {mockMedications.map((medication) => (
        <div key={medication.id} className="p-6 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-gray-900">
                  {medication.name}
                </h3>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                    statusColors[medication.status]
                  }`}
                >
                  {medication.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {medication.strength} {medication.unit} - {medication.type}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Update Stock
              </button>
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Order Refill
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Current Stock</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {medication.stock} units
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Reorder Point</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {medication.reorderPoint} units
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <RefreshCcw className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Last Refill</p>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(medication.lastRefill).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Next Refill</p>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(medication.nextRefill).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="text-sm font-medium text-gray-900">Side Effects</h4>
              <ul className="mt-2 space-y-1">
                {medication.sideEffects.map((effect) => (
                  <li key={effect} className="text-sm text-gray-500">
                    • {effect}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="text-sm font-medium text-gray-900">Interactions</h4>
              <ul className="mt-2 space-y-1">
                {medication.interactions.map((interaction) => (
                  <li key={interaction} className="text-sm text-gray-500">
                    • {interaction}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900">Instructions</h4>
            <p className="mt-1 text-sm text-gray-500">{medication.instructions}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MedicationInventoryList;