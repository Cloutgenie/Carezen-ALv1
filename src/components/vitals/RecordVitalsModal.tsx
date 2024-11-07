import React, { useState } from 'react';
import { X, Activity, User, AlertCircle } from 'lucide-react';
import type { VitalRecord } from '../../types/vitals';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (record: Omit<VitalRecord, 'id'>) => void;
}

const RecordVitalsModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    residentId: '',
    type: 'blood-pressure',
    value: '',
    notes: '',
  });

  const getUnit = () => {
    switch (form.type) {
      case 'blood-pressure':
        return 'mmHg';
      case 'heart-rate':
        return 'BPM';
      case 'temperature':
        return '°F';
      case 'blood-sugar':
        return 'mg/dL';
      case 'weight':
        return 'lbs';
      case 'oxygen':
        return '%';
      default:
        return '';
    }
  };

  const getPlaceholder = () => {
    switch (form.type) {
      case 'blood-pressure':
        return '120/80';
      case 'heart-rate':
        return '72';
      case 'temperature':
        return '98.6';
      case 'blood-sugar':
        return '100';
      case 'weight':
        return '150';
      case 'oxygen':
        return '98';
      default:
        return '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const mockUser = {
      id: '1',
      name: 'Sarah Johnson',
      role: 'nurse',
    };

    const record: Omit<VitalRecord, 'id'> = {
      residentId: form.residentId,
      residentName: form.residentId === '1' ? 'Eleanor Thompson' : 'George Martinez',
      timestamp: new Date().toISOString(),
      type: form.type as VitalRecord['type'],
      value: form.value,
      unit: getUnit(),
      recordedBy: mockUser,
      notes: form.notes,
      status: 'normal', // This should be calculated based on value ranges
    };

    onSubmit(record);
    onClose();
    setForm({
      residentId: '',
      type: 'blood-pressure',
      value: '',
      notes: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
              <Activity className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
              <h3 className="text-xl font-semibold leading-6 text-gray-900">
                Record Vital Signs
              </h3>
              
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                  <label htmlFor="resident" className="block text-sm font-medium text-gray-700">
                    Resident
                  </label>
                  <select
                    id="resident"
                    value={form.residentId}
                    onChange={(e) => setForm({ ...form, residentId: e.target.value })}
                    required
                    className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select Resident</option>
                    <option value="1">Eleanor Thompson</option>
                    <option value="2">George Martinez</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Vital Sign Type
                  </label>
                  <select
                    id="type"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    required
                    className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="blood-pressure">Blood Pressure</option>
                    <option value="heart-rate">Heart Rate</option>
                    <option value="temperature">Temperature</option>
                    <option value="blood-sugar">Blood Sugar</option>
                    <option value="weight">Weight</option>
                    <option value="oxygen">Oxygen Saturation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                    Value
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      id="value"
                      value={form.value}
                      onChange={(e) => setForm({ ...form, value: e.target.value })}
                      required
                      placeholder={getPlaceholder()}
                      className="block w-full rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                      {getUnit()}
                    </span>
                  </div>
                </div>

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
                    Record Vital Signs
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

export default RecordVitalsModal;