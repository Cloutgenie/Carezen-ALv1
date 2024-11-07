import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Users,
  Building2,
  UserRound,
  Calendar,
  ClipboardList,
  Pills,
  Activity,
  Settings,
} from 'lucide-react';
import type { NavigationItem } from '../../types';

const navigation: NavigationItem[] = [
  { name: 'Staff Management', path: '/staff', icon: Users },
  { name: 'Facility Management', path: '/facility', icon: Building2 },
  { name: 'Resident Management', path: '/residents', icon: UserRound },
  { name: 'Schedule', path: '/schedule', icon: Calendar },
  { name: 'Care Plans', path: '/care-plans', icon: ClipboardList },
  { name: 'Medications', path: '/medications', icon: Pills },
  { name: 'Vitals & Reports', path: '/vitals', icon: Activity },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 border-r border-gray-200">
        <div className="flex h-16 shrink-0 items-center">
          <span className="text-2xl font-semibold text-indigo-600">Carezen</span>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                          isActive
                            ? 'bg-gray-50 text-indigo-600'
                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                        }`}
                      >
                        <item.icon
                          className={`h-6 w-6 shrink-0 ${
                            isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'
                          }`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}