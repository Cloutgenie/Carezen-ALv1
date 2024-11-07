import React from 'react';
import { FileText, Calendar, User, Tag, Download, Eye } from 'lucide-react';
import type { Report } from '../../types/vitals';

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Monthly Health Assessment - March 2024',
    type: 'monthly',
    dateRange: {
      start: '2024-03-01',
      end: '2024-03-31',
    },
    status: 'completed',
    createdBy: {
      id: '1',
      name: 'Sarah Johnson',
      role: 'nurse',
    },
    createdAt: '2024-03-01T08:00:00Z',
    lastModified: '2024-03-31T16:00:00Z',
    sections: [
      {
        title: 'Vital Signs Summary',
        content: 'Overall stable vital signs across all residents with notable improvements in blood pressure management.',
      },
      {
        title: 'Health Incidents',
        content: 'Two minor incidents reported and addressed promptly with appropriate follow-up care provided.',
      },
      {
        title: 'Medication Compliance',
        content: '98% medication compliance rate achieved across all residents.',
      },
    ],
    tags: ['monthly-review', 'health-assessment', 'vital-signs'],
  },
  {
    id: '2',
    title: 'Weekly Wellness Report - Week 12',
    type: 'weekly',
    dateRange: {
      start: '2024-03-18',
      end: '2024-03-24',
    },
    status: 'draft',
    createdBy: {
      id: '2',
      name: 'Michael Chen',
      role: 'nurse',
    },
    createdAt: '2024-03-24T14:00:00Z',
    lastModified: '2024-03-24T14:30:00Z',
    sections: [
      {
        title: 'Weekly Overview',
        content: 'Detailed analysis of resident health trends and wellness activities.',
      },
      {
        title: 'Activity Participation',
        content: 'Strong engagement in group exercises and social activities.',
      },
    ],
    tags: ['weekly-review', 'wellness', 'activities'],
  },
  {
    id: '3',
    title: 'Incident Report - Fall Prevention',
    type: 'incident',
    dateRange: {
      start: '2024-03-20',
      end: '2024-03-20',
    },
    status: 'completed',
    createdBy: {
      id: '1',
      name: 'Sarah Johnson',
      role: 'nurse',
    },
    createdAt: '2024-03-20T09:15:00Z',
    lastModified: '2024-03-20T15:30:00Z',
    sections: [
      {
        title: 'Incident Description',
        content: 'Comprehensive review of recent fall prevention measures and their effectiveness.',
      },
      {
        title: 'Action Items',
        content: 'Implementation of new safety protocols and staff training requirements.',
      },
    ],
    tags: ['incident', 'safety', 'fall-prevention'],
  },
];

const statusColors = {
  draft: 'bg-gray-50 text-gray-700 ring-gray-600/20',
  completed: 'bg-green-50 text-green-700 ring-green-600/20',
  archived: 'bg-blue-50 text-blue-700 ring-blue-600/20',
};

const typeColors = {
  daily: 'text-purple-700 bg-purple-50',
  weekly: 'text-blue-700 bg-blue-50',
  monthly: 'text-green-700 bg-green-50',
  incident: 'text-red-700 bg-red-50',
  custom: 'text-gray-700 bg-gray-50',
};

const ReportsList: React.FC = () => {
  return (
    <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
      {mockReports.map((report) => (
        <div key={report.id} className="p-6 hover:bg-gray-50 transition duration-150">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${typeColors[report.type]}`}>
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {report.type.charAt(0).toUpperCase() + report.type.slice(1)} Report
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      statusColors[report.status]
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <Eye className="h-4 w-4" />
                Preview
              </button>
              <button className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span>
                {new Date(report.dateRange.start).toLocaleDateString()} -{' '}
                {new Date(report.dateRange.end).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <User className="h-5 w-5 text-gray-400" />
              <span>
                Created by {report.createdBy.name} • Last modified{' '}
                {new Date(report.lastModified).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Tag className="h-5 w-5 text-gray-400" />
              <div className="flex flex-wrap gap-1">
                {report.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {report.sections.length > 0 && (
            <div className="mt-4">
              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Report Sections</h4>
                <div className="space-y-3">
                  {report.sections.map((section) => (
                    <div key={section.title} className="text-sm">
                      <span className="font-medium text-gray-900">{section.title}</span>
                      <p className="mt-1 text-gray-500 line-clamp-2">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReportsList;