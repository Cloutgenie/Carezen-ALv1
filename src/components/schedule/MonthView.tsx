import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isToday,
  isSameDay,
  parseISO,
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

const MonthView: React.FC<Props> = ({ currentDate, onEventClick }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getEventsForDay = (day: Date) => {
    return mockEvents.filter((event) =>
      isSameDay(parseISO(event.start), day)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow ring-1 ring-gray-200">
      {/* Calendar Header */}
      <div className="grid grid-cols-7 gap-px border-b border-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="py-2 text-sm font-medium text-gray-900 text-center bg-gray-50"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px">
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);

          return (
            <div
              key={day.toISOString()}
              className={`min-h-[8rem] p-2 relative ${
                !isCurrentMonth ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              {/* Date Display */}
              <time
                dateTime={format(day, 'yyyy-MM-dd')}
                className={`ml-auto flex h-6 w-6 items-center justify-center rounded-full ${
                  isCurrentDay
                    ? 'bg-indigo-600 font-semibold text-white'
                    : 'text-gray-900'
                }`}
              >
                {format(day, 'd')}
              </time>

              {/* Events List */}
              <div className="space-y-1 mt-2">
                {dayEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => onEventClick?.(event)}
                    className={`w-full p-1.5 text-xs rounded-md ${
                      typeColors[event.type]
                    } hover:shadow-md transition-shadow text-left group`}
                  >
                    <div className="font-medium truncate">{event.title}</div>
                    <div className="flex items-center gap-1 opacity-75 group-hover:opacity-100">
                      <Clock className="h-3 w-3" />
                      <span className="truncate">
                        {format(parseISO(event.start), 'HH:mm')} -{' '}
                        {format(parseISO(event.end), 'HH:mm')}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1 opacity-75 group-hover:opacity-100">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 opacity-75 group-hover:opacity-100">
                      <Users className="h-3 w-3" />
                      <span className="truncate">
                        {event.assignedTo.map((person) => person.name).join(', ')}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* More Events Indicator */}
              {dayEvents.length > 3 && (
                <button className="mt-1 text-xs text-gray-500 hover:text-gray-700">
                  +{dayEvents.length - 3} more
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;