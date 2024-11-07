import React from 'react';
import { PlusCircle } from 'lucide-react';

const CarePlanHeader: React.FC = () => {
  return (
    <div className="md:flex md:items-center md:justify-between mb-6">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Care Plans
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage resident care plans, goals, and daily activities
        </p>
      </div>
      <div className="mt-4 flex md:ml-4 md:mt-0">
        <button
          type="button"
          className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusCircle className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Create Care Plan
        </button>
      </div>
    </div>
  );
};

export default CarePlanHeader;