import React from 'react';
import { PlusCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onViewChange: (view: 'day' | 'week' | 'month') => void;
  currentView: 'day' | 'week' | 'month';
}

const ScheduleHeader: React.FC<Props> = ({
  currentDate,
  onDateChange,
  onViewChange,
  currentView,
}) => {
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (currentView === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    onDateChange(newDate);
  };

  return (
    <div className="md:flex md:items-center md:justify-between mb-6">
      <div className="min-w-0 flex-1">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Schedule
          </h2>
          <div className="ml-6 flex items-center gap-2">
            <button
              onClick={() => navigateDate('prev')}
              className="rounded-full p-1.5 text-gray-400 hover:text-gray-500"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDateChange(new Date())}
              className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Today
            </button>
            <button
              onClick={() => navigateDate('next')}
              className="rounded-full p-1.5 text-gray-400 hover:text-gray-500"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="text-lg font-semibold text-gray-900">
              {currentDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
                ...(currentView === 'day' && { day: 'numeric' }),
              })}
            </span>
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Manage staff shifts, resident activities, and facility events
        </p>
      </div>
      <div className="mt-4 flex items-center gap-4 md:ml-4 md:mt-0">
        <div className="flex rounded-lg shadow-sm">
          {(['day', 'week', 'month'] as const).map((view) => (
            <button
              key={view}
              onClick={() => onViewChange(view)}
              className={`relative inline-flex items-center px-3 py-2 text-sm font-semibold ${
                currentView === view
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              } ${
                view === 'day'
                  ? 'rounded-l-lg'
                  : view === 'month'
                  ? 'rounded-r-lg'
                  : ''
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusCircle className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Add Event
        </button>
      </div>
    </div>
  );
};

export default ScheduleHeader;