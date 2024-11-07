import React, { useState } from 'react';
import { X, Clock, MapPin, Users, Calendar } from 'lucide-react';
import type { ScheduleEvent } from '../../types/schedule';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: Omit<ScheduleEvent, 'id'>) => void;
  initialEvent?: ScheduleEvent;
}

const CreateEventModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, initialEvent }) => {
  const [form, setForm] = useState({
    title: initialEvent?.title || '',
    type: initialEvent?.type || 'shift',
    start: initialEvent?.start || '',
    end: initialEvent?.end || '',
    location: initialEvent?.location || '',
    assignedStaff: initialEvent?.assignedTo.map(staff => staff.id) || [],
    residents: initialEvent?.residents?.map(resident => resident.id) || [],
    notes: initialEvent?.notes || '',
    recurrence: initialEvent?.recurrence || null,
  });

  const mockStaff = [
    { id: '1', name: 'Sarah Johnson', role: 'nurse' },
    { id: '2', name: 'Michael Chen', role: 'caregiver' },
    { id: '3', name: 'Emily Davis', role: 'activities-coordinator' },
  ];

  const mockResidents = [
    { id: '1', name: 'Eleanor Thompson' },
    { id: '2', name: 'George Martinez' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const event: Omit<ScheduleEvent, 'id'> = {
      title: form.title,
      type: form.type as ScheduleEvent['type'],
      start: form.start,
      end: form.end,
      location: form.location,
      assignedTo: mockStaff.filter(staff => form.assignedStaff.includes(staff.id)),
      residents: form.residents.length > 0 
        ? mockResidents.filter(resident => form.residents.includes(resident.id))
        : undefined,
      status: 'scheduled',
      notes: form.notes || undefined,
      recurrence: form.recurrence || undefined,
    };

    onSubmit(event);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
              <h3 className="text-xl font-semibold leading-6 text-gray-900">
                {initialEvent ? 'Edit Event' : 'Create New Event'}
              </h3>
              
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Event Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Event Type
                  </label>
                  <select
                    id="type"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as ScheduleEvent['type'] })}
                    required
                    className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="shift">Staff Shift</option>
                    <option value="activity">Activity</option>
                    <option value="appointment">Appointment</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="start" className="block text-sm font-medium text-gray-700">
                      Start Time
                    </label>
                    <input
                      type="datetime-local"
                      id="start"
                      value={form.start}
                      onChange={(e) => setForm({ ...form, start: e.target.value })}
                      required
                      className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div>
                    <label htmlFor="end" className="block text-sm font-medium text-gray-700">
                      End Time
                    </label>
                    <input
                      type="datetime-local"
                      id="end"
                      value={form.end}
                      onChange={(e) => setForm({ ...form, end: e.target.value })}
                      required
                      className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Assigned Staff
                  </label>
                  <div className="mt-1 space-y-2">
                    {mockStaff.map((staff) => (
                      <label key={staff.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={form.assignedStaff.includes(staff.id)}
                          onChange={(e) => {
                            const newStaff = e.target.checked
                              ? [...form.assignedStaff, staff.id]
                              : form.assignedStaff.filter(id => id !== staff.id);
                            setForm({ ...form, assignedStaff: newStaff });
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <span className="ml-2 text-sm text-gray-900">
                          {staff.name} ({staff.role})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {form.type === 'activity' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Residents
                    </label>
                    <div className="mt-1 space-y-2">
                      {mockResidents.map((resident) => (
                        <label key={resident.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={form.residents.includes(resident.id)}
                            onChange={(e) => {
                              const newResidents = e.target.checked
                                ? [...form.residents, resident.id]
                                : form.residents.filter(id => id !== resident.id);
                              setForm({ ...form, residents: newResidents });
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <span className="ml-2 text-sm text-gray-900">
                            {resident.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Recurrence
                  </label>
                  <div className="mt-2">
                    <select
                      value={form.recurrence?.frequency || ''}
                      onChange={(e) => {
                        if (!e.target.value) {
                          setForm({ ...form, recurrence: null });
                        } else {
                          setForm({
                            ...form,
                            recurrence: {
                              frequency: e.target.value as 'daily' | 'weekly' | 'monthly',
                              endDate: form.recurrence?.endDate || '',
                            },
                          });
                        }
                      }}
                      className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="">No Recurrence</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {initialEvent ? 'Update Event' : 'Create Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;