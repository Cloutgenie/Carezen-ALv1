import React from 'react';
import { Filter } from 'lucide-react';
import type { MedicationFilters } from '../../types/medication';

interface Props {
  filters: MedicationFilters;
  onFilterChange: (filters: MedicationFilters) => void;
}

const MedicationFilters: React.FC<Props> = ({ filters, onFilterChange }) => {
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
          <option value="completed">Completed</option>
          <option value="discontinued">Discontinued</option>
          <option value="on-hold">On Hold</option>
        </select>

        <select
          value={filters.timing}
          onChange={(e) => onFilterChange({ ...filters, timing: e.target.value })}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">All Times</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
          <option value="night">Night</option>
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

export default MedicationFilters;