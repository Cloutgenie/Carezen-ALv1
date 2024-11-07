import React from 'react';
import {
  format,
  addDays,
  startOfWeek,
  isSameDay,
  parseISO,
  isWithinInterval,
} from 'date-fns';
import { Clock, MapPin, Users } from 'lucide-react';
import type { ScheduleEvent } from '../../types/schedule';

interface Props {
  currentDate: Date;
  onEventClick?: (event: ScheduleEvent) => void;
}

const mockEvents: ScheduleEvent[] = [
  {
    id: '1',
    title: 'Morning Shift',
    type: 'shift',
    start: '2024-03-17T07:00:00Z',
    end: '2024-03-17T15:00:00Z',
    assignedTo: [
      { id: '1', name: 'Sarah Johnson', role: 'nurse' },
      { id: '2', name: 'Michael Chen', role: 'caregiver' },
    ],
    status: 'in-progress',
    location: 'Wing A',
  },
  {
    id: '2',
    title: 'Group Exercise',
    type: 'activity',
    start: '2024-03-17T10:00:00Z',
    end: '2024-03-17T11:00:00Z',
    location: 'Activity Room',
    assignedTo: [{ id: '3', name: 'Emily Davis', role: 'activities-coordinator' }],
    residents: [
      { id: '1', name: 'Eleanor Thompson' },
      { id: '2', name: 'George Martinez' },
    ],
    status: 'scheduled',
  },
];

const typeColors = {
  shift: 'bg-blue-50 border-blue-200 text-blue-700',
  activity: 'bg-green-50 border-green-200 text-green-700',
  appointment: 'bg-purple-50 border-purple-200 text-purple-700',
  maintenance: 'bg-orange-50 border-orange-200 text-orange-700',
};

const WeekView: React.FC<Props> = ({ currentDate, onEventClick }) => {
  const startDate = startOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForDateAndHour = (date: Date, hour: number) => {
    return mockEvents.filter((event) => {
      const eventStart = parseISO(event.start);
      const eventEnd = parseISO(event.end);
      return (
        isSameDay(eventStart, date) &&
        isWithinInterval(new Date(date).setHours(hour), {
          start: eventStart,
          end: eventEnd,
        })
      );
    });
  };

  return (
    <div className="bg-white rounded-lg shadow ring-1 ring-gray-200 overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[auto,repeat(7,1fr)] border-b border-gray-200">
        <div className="py-2 px-4 text-sm font-medium text-gray-500 border-r border-gray-200">
          Time
        </div>
        {weekDays.map((day) => (
          <div
            key={day.toISOString()}
            className={`py-2 px-4 text-sm font-medium text-center border-r border-gray-200 ${
              isSameDay(day, new Date()) ? 'bg-indigo-50' : ''
            }`}
          >
            <div className="text-gray-900">{format(day, 'EEE')}</div>
            <div className="text-gray-500">{format(day, 'd')}</div>
          </div>
        ))}
      </div>

      {/* Time Grid */}
      <div className="grid grid-cols-[auto,repeat(7,1fr)]">
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="py-4 px-4 text-sm text-gray-500 border-r border-gray-200">
              {format(new Date().setHours(hour), 'HH:mm')}
            </div>
            {weekDays.map((day) => {
              const events = getEventsForDateAndHour(day, hour);
              return (
                <div
                  key={`${day.toISOString()}-${hour}`}
                  className={`py-4 px-2 relative min-h-[4rem] border-b border-r border-gray-200 ${
                    isSameDay(day, new Date()) ? 'bg-indigo-50/20' : ''
                  }`}
                >
                  {events.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => onEventClick?.(event)}
                      className={`absolute left-1 right-1 p-2 rounded-lg border ${
                        typeColors[event.type]
                      } hover:shadow-md transition-shadow text-left`}
                      style={{
                        top: '0.25rem',
                      }}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-medium truncate">{event.title}</span>
                      </div>
                      <div className="mt-1 space-y-1 text-xs">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span className="truncate">
                            {format(parseISO(event.start), 'HH:mm')} -{' '}
                            {format(parseISO(event.end), 'HH:mm')}
                          </span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span className="truncate">
                            {event.assignedTo.map((person) => person.name).join(', ')}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeekView;