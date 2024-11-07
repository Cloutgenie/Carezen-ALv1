import React, { useState } from 'react';
import ScheduleHeader from '../components/schedule/ScheduleHeader';
import ScheduleFilters from '../components/schedule/ScheduleFilters';
import ScheduleGrid from '../components/schedule/ScheduleGrid';
import WeekView from '../components/schedule/WeekView';
import MonthView from '../components/schedule/MonthView';
import EventModal from '../components/schedule/EventModal';
import type { ScheduleFilters as ScheduleFiltersType, ScheduleEvent } from '../types/schedule';

const SchedulePage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('week');
  const [filters, setFilters] = useState<ScheduleFiltersType>({});
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);

  const handleEventClick = (event: ScheduleEvent) => {
    setSelectedEvent(event);
  };

  return (
    <div className="space-y-6">
      <ScheduleHeader
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      <ScheduleFilters filters={filters} onFilterChange={setFilters} />
      {currentView === 'day' && <ScheduleGrid onEventClick={handleEventClick} />}
      {currentView === 'week' && (
        <WeekView currentDate={currentDate} onEventClick={handleEventClick} />
      )}
      {currentView === 'month' && (
        <MonthView currentDate={currentDate} onEventClick={handleEventClick} />
      )}
      <EventModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

export default SchedulePage;