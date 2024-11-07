import React from 'react';
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

const DayView: React.FC<Props> = ({ currentDate, onEventClick }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="bg-white rounded-lg shadow ring-1 ring-gray-200">
      <div className="grid grid-cols-[auto,1fr] divide-y divide-gray-200">
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="py-4 px-4 text-sm text-gray-500">
              {hour.toString().padStart(2, '0')}:00
            </div>
            <div className="py-4 px-4 relative min-h-[4rem] border-l border-gray-200">
              {mockEvents
                .filter((event) => {
                  const eventHour = new Date(event.start).getHours();
                  return eventHour === hour;
                })
                .map((event) => (
                  <button
                    key={event.id}
                    onClick={() => onEventClick?.(event)}
                    className={`absolute left-4 right-4 p-2 rounded-lg border ${
                      typeColors[event.type]
                    } hover:shadow-md transition-shadow text-left`}
                    style={{
                      top: '0.5rem',
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{event.title}</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>
                          {new Date(event.start).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                          {' - '}
                          {new Date(event.end).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>
                          {event.assignedTo.map((person) => person.name).join(', ')}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DayView;