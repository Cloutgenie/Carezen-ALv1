import React, { useState } from 'react';
import StaffHeader from '../components/staff/StaffHeader';
import StaffFilters from '../components/staff/StaffFilters';
import StaffList from '../components/staff/StaffList';
import type { StaffFilters as StaffFiltersType } from '../types/staff';

const StaffPage: React.FC = () => {
  const [filters, setFilters] = useState<StaffFiltersType>({});

  return (
    <div className="space-y-6">
      <StaffHeader />
      <StaffFilters filters={filters} onFilterChange={setFilters} />
      <StaffList />
    </div>
  );
};

export default StaffPage;