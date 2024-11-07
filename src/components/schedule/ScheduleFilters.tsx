import React from 'react';
import { Filter } from 'lucide-react';
import type { ScheduleFilters } from '../../types/schedule';

interface Props {
  filters: ScheduleFilters;
  onFilterChange: (filters: ScheduleFilters) => void;
}

const ScheduleFilters: React.FC<Props> = ({ filters, onFilterChange }) => {
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
          <option value="shift">Staff Shifts</option>
          <option value="activity">Activities</option>
          <option value="appointment">Appointments</option>
          <option value="maintenance">Maintenance</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">All Status</option>
          <option value="scheduled">Scheduled</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={filters.assignedTo}
          onChange={(e) => onFilterChange({ ...filters, assignedTo: e.target.value })}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">All Staff</option>
          <option value="1">Sarah Johnson</option>
          <option value="2">Michael Chen</option>
        </select>
      </div>
    </div>
  );
};

export default ScheduleFilters;