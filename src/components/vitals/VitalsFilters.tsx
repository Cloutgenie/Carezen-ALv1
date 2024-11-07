import React from 'react';
import { Filter } from 'lucide-react';
import type { VitalsFilters } from '../../types/vitals';

interface Props {
  filters: VitalsFilters;
  onFilterChange: (filters: VitalsFilters) => void;
}

const VitalsFilters: React.FC<Props> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white px-4 py-3 border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <select
          value={filters.type}
          onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">All Types</option>
          <option value="blood-pressure">Blood Pressure</option>
          <option value="heart-rate">Heart Rate</option>
          <option value="temperature">Temperature</option>
          <option value="blood-sugar">Blood Sugar</option>
          <option value="weight">Weight</option>
          <option value="oxygen">Oxygen Saturation</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">All Status</option>
          <option value="normal">Normal</option>
          <option value="attention">Needs Attention</option>
          <option value="critical">Critical</option>
        </select>

        <select
          value={filters.resident}
          onChange={(e) => onFilterChange({ ...filters, resident: e.target.value })}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">All Residents</option>
          <option value="1">Eleanor Thompson</option>
          <option value="2">George Martinez</option>
        </select>
      </div>
    </div>
  );
};

export default VitalsFilters;