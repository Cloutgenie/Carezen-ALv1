import React, { useState } from 'react';
import ResidentHeader from '../components/residents/ResidentHeader';
import ResidentFilters from '../components/residents/ResidentFilters';
import ResidentList from '../components/residents/ResidentList';
import type { ResidentFilters as ResidentFiltersType } from '../types/resident';

const ResidentPage: React.FC = () => {
  const [filters, setFilters] = useState<ResidentFiltersType>({});

  return (
    <div className="space-y-6">
      <ResidentHeader />
      <ResidentFilters filters={filters} onFilterChange={setFilters} />
      <ResidentList />
    </div>
  );
};

export default ResidentPage;