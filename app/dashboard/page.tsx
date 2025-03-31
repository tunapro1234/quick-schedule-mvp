"use client";

import { Tabs } from '../components/Tabs';
import PlannerView from '../components/PlannerView';
import RequestsView from '../components/RequestsView';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Schedule Management</h1>
              <Tabs 
                tabs={[
                  { 
                    id: 'planner', 
                    label: 'Planning',
                    content: <PlannerView />
                  },
                  { 
                    id: 'requests', 
                    label: 'Requests',
                    content: <RequestsView />
                  }
                ]} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 