import React from 'react';
import { Filter } from 'lucide-react';
import type { StaffFilters } from '../../types/staff';

interface Props {
  filters: StaffFilters;
  onFilterChange: (filters: StaffFilters) => void;
}

const StaffFilters: React.FC<Props> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white px-4 py-3 border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <select
          value={filters.role}
          onChange={(e) => onFilterChange({ ...filters, role: e.target.value })}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">All Roles</option>
          <option value="nurse">Nurse</option>
          <option value="caregiver">Caregiver</option>
          <option value="maintenance">Maintenance</option>
          <option value="kitchen">Kitchen Staff</option>
        </select>

        <select
          value={filters.department}
          onChange={(e) => onFilterChange({ ...filters, department: e.target.value })}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">All Departments</option>
          <option value="medical">Medical</option>
          <option value="residential">Residential Care</option>
          <option value="facilities">Facilities</option>
          <option value="kitchen">Kitchen</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="on-leave">On Leave</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
};

export default StaffFilters;