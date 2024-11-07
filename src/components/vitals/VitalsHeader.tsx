import React from 'react';
import { PlusCircle, FileSpreadsheet } from 'lucide-react';

interface Props {
  onRecordVitals: () => void;
}

const VitalsHeader: React.FC<Props> = ({ onRecordVitals }) => {
  return (
    <div className="md:flex md:items-center md:justify-between mb-6">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Vitals & Reports
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Monitor resident vital signs and generate health reports
        </p>
      </div>
      <div className="mt-4 flex gap-3 md:ml-4 md:mt-0">
        <button
          type="button"
          className="inline-flex items-center gap-x-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <FileSpreadsheet className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Generate Report
        </button>
        <button
          type="button"
          onClick={onRecordVitals}
          className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusCircle className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Record Vitals
        </button>
      </div>
    </div>
  );
};

export default VitalsHeader;