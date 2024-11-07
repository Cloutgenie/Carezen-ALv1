import React from 'react';
import { Filter } from 'lucide-react';
import type { CarePlanFilters } from '../../types/carePlan';

interface Props {
  filters: CarePlanFilters;
  onFilterChange: (filters: CarePlanFilters) => void;
}

const CarePlanFilters: React.FC<Props> = ({ filters, onFilterChange }) => {
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
          <option value="active">Active</option>
          <option value="pending-review">Pending Review</option>
          <option value="archived">Archived</option>
        </select>

        <select
          value={filters.careLevel}
          onChange={(e) => onFilterChange({ ...filters, careLevel: e.target.value })}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">All Care Levels</option>
          <option value="independent">Independent</option>
          <option value="minimal">Minimal</option>
          <option value="moderate">Moderate</option>
          <option value="extensive">Extensive</option>
          <option value="total">Total</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.reviewDue}
            onChange={(e) => onFilterChange({ ...filters, reviewDue: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <span className="text-sm text-gray-900">Review Due</span>
        </label>
      </div>
    </div>
  );
};

export default CarePlanFilters;