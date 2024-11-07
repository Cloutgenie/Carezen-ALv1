import React from 'react';
import { Filter } from 'lucide-react';
import type { MedicationFilters } from '../../types/medication';

interface Props {
  filters: MedicationFilters;
  onFilterChange: (filters: MedicationFilters) => void;
}

const MedicationInventoryFilters: React.FC<Props> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white px-4 py-3 border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <Filter className="h-5 w-5 text-gray-400" />
        
        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">All Status</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
          <option value="discontinued">Discontinued</option>
        </select>

        <select
          value={filters.type}
          onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">All Types</option>
          <option value="pill">Pills</option>
          <option value="liquid">Liquids</option>
          <option value="injection">Injections</option>
          <option value="topical">Topical</option>
          <option value="other">Other</option>
        </select>

        <select
          value={filters.stock}
          onChange={(e) => onFilterChange({ ...filters, stock: e.target.value })}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">All Stock Levels</option>
          <option value="below-reorder">Below Reorder Point</option>
          <option value="above-reorder">Above Reorder Point</option>
          <option value="critical">Critical Level</option>
        </select>
      </div>
    </div>
  );
};

export default MedicationInventoryFilters;