import React from 'react';
import { X, Clock, MapPin, Users, Calendar, AlertCircle } from 'lucide-react';
import type { ScheduleEvent } from '../../types/schedule';

interface Props {
  event: ScheduleEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<Props> = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) return null;

  const statusColors = {
    scheduled: 'bg-gray-50 text-gray-700 ring-gray-600/20',
    'in-progress': 'bg-green-50 text-green-700 ring-green-600/20',
    completed: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    cancelled: 'bg-red-50 text-red-700 ring-red-600/20',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose} />

        {/* Modal panel */}
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold leading-6 text-gray-900" id="modal-title">
                  {event.title}
                </h3>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                    statusColors[event.status]
                  }`}
                >
                  {event.status}
                </span>
              </div>
              
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span>
                    {new Date(event.start).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-5 w-5 text-gray-400" />
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
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span>{event.location}</span>
                  </div>
                )}

                <div className="flex items-start gap-2 text-gray-600">
                  <Users className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">Assigned Staff:</p>
                    <ul className="mt-1 space-y-1">
                      {event.assignedTo.map((person) => (
                        <li key={person.id} className="flex items-center gap-2">
                          <span>{person.name}</span>
                          <span className="text-sm text-gray-500">({person.role})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {event.residents && event.residents.length > 0 && (
                  <div className="flex items-start gap-2 text-gray-600">
                    <Users className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium">Residents:</p>
                      <ul className="mt-1 space-y-1">
                        {event.residents.map((resident) => (
                          <li key={resident.id}>{resident.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {event.notes && (
                  <div className="flex items-start gap-2 text-gray-600">
                    <AlertCircle className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium">Notes:</p>
                      <p className="mt-1">{event.notes}</p>
                    </div>
                  </div>
                )}

                {event.recurrence && (
                  <div className="flex items-start gap-2 text-gray-600">
                    <Calendar className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium">Recurrence:</p>
                      <p className="mt-1">
                        {event.recurrence.frequency.charAt(0).toUpperCase() +
                          event.recurrence.frequency.slice(1)}
                        {event.recurrence.endDate &&
                          ` until ${new Date(event.recurrence.endDate).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;