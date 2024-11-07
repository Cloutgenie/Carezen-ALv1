import React from 'react';
import { Calendar, Target, Activity, AlertCircle } from 'lucide-react';
import type { CarePlan } from '../../types/carePlan';

const mockCarePlans: CarePlan[] = [
  {
    id: '1',
    residentId: '1',
    residentName: 'Eleanor Thompson',
    startDate: '2024-01-15',
    reviewDate: '2024-04-15',
    status: 'active',
    careLevel: 'moderate',
    goals: [
      {
        id: 'g1',
        category: 'physical',
        description: 'Improve mobility with daily walking exercises',
        status: 'in-progress',
        targetDate: '2024-06-15',
      },
      {
        id: 'g2',
        category: 'social',
        description: 'Participate in group activities twice weekly',
        status: 'achieved',
        targetDate: '2024-03-30',
      },
    ],
    activities: [
      {
        id: 'a1',
        name: 'Morning Walk',
        frequency: 'Daily',
        assignedTo: ['Sarah Johnson'],
        notes: 'Use walking aid, monitor breathing',
      },
    ],
    medications: [
      {
        id: 'm1',
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        instructions: 'Take with food',
        startDate: '2024-01-15',
      },
    ],
    dietaryRequirements: ['Low sodium', 'Diabetic diet'],
    specialInstructions: ['Monitor blood pressure daily', 'Check blood sugar before meals'],
  },
];

const statusColors = {
  active: 'bg-green-50 text-green-700 ring-green-600/20',
  'pending-review': 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  archived: 'bg-gray-50 text-gray-700 ring-gray-600/20',
};

const CarePlanList: React.FC = () => {
  return (
    <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
      {mockCarePlans.map((plan) => (
        <div key={plan.id} className="p-6 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{plan.residentName}</h3>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                    statusColors[plan.status]
                  }`}
                >
                  {plan.status}
                </span>
                <span className="text-sm text-gray-500">Care Level: {plan.careLevel}</span>
              </div>
            </div>
            <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
              View Details
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span>Review due: {new Date(plan.reviewDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Target className="h-5 w-5 text-gray-400" />
              <span>{plan.goals.length} Goals</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Activity className="h-5 w-5 text-gray-400" />
              <span>{plan.activities.length} Activities</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <AlertCircle className="h-5 w-5 text-gray-400" />
              <span>{plan.specialInstructions.length} Special Instructions</span>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900">Current Goals</h4>
            <div className="mt-2 flow-root">
              <ul role="list" className="-mb-8">
                {plan.goals.map((goal, goalIdx) => (
                  <li key={goal.id}>
                    <div className="relative pb-8">
                      {goalIdx !== plan.goals.length - 1 ? (
                        <span
                          className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span
                            className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                              goal.status === 'achieved'
                                ? 'bg-green-500'
                                : goal.status === 'in-progress'
                                ? 'bg-blue-500'
                                : 'bg-gray-500'
                            }`}
                          >
                            <Check className="h-5 w-5 text-white" aria-hidden="true" />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-500">{goal.description}</p>
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            <time dateTime={goal.targetDate}>
                              Target: {new Date(goal.targetDate).toLocaleDateString()}
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarePlanList;