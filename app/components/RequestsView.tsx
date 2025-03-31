"use client";

import { useState } from 'react';
import { format } from 'date-fns';

// Mock data for scheduling requests
const MOCK_REQUESTS = [
  {
    id: '1',
    sender: 'jane.doe@example.com',
    status: 'pending',
    slots: [
      { day: 'Monday', date: '2023-04-03', time: '10:00 AM' },
      { day: 'Tuesday', date: '2023-04-04', time: '2:00 PM' },
      { day: 'Friday', date: '2023-04-07', time: '11:00 AM' },
    ],
  },
  {
    id: '2',
    sender: 'john.smith@example.com',
    status: 'pending',
    slots: [
      { day: 'Wednesday', date: '2023-04-05', time: '9:00 AM' },
      { day: 'Thursday', date: '2023-04-06', time: '4:00 PM' },
    ],
  },
];

export default function RequestsView() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [selectedSlots, setSelectedSlots] = useState<Record<string, string>>({});
  
  const handleAccept = (requestId: string) => {
    if (!selectedSlots[requestId]) {
      alert('Please select a time slot first');
      return;
    }
    
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId
          ? { ...req, status: 'accepted' }
          : req
      )
    );
    
    // In a real app, this would send the data to the backend
    console.log(`Accepted request ${requestId} for time slot: ${selectedSlots[requestId]}`);
    alert('Meeting confirmed! A calendar invite has been sent.');
  };
  
  const handleDecline = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId
          ? { ...req, status: 'declined' }
          : req
      )
    );
    
    // In a real app, this would send the data to the backend
    console.log(`Declined request ${requestId}`);
    alert('Request declined.');
  };
  
  const handleSlotSelect = (requestId: string, slotInfo: string) => {
    setSelectedSlots(prev => ({
      ...prev,
      [requestId]: slotInfo
    }));
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Scheduling Requests</h2>
      
      {requests.length === 0 ? (
        <p className="text-gray-500">No scheduling requests at this time.</p>
      ) : (
        <div className="space-y-6">
          {requests.map(request => (
            <div 
              key={request.id} 
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                  Request from {request.sender}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Status: <span className={`font-medium ${
                    request.status === 'pending' ? 'text-yellow-600' : 
                    request.status === 'accepted' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </p>
              </div>
              
              {request.status === 'pending' ? (
                <>
                  <div className="px-4 py-5 sm:p-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Available Time Slots:</h4>
                    <div className="space-y-2">
                      {request.slots.map((slot, idx) => (
                        <label key={idx} className="flex items-center">
                          <input
                            type="radio"
                            name={`slot-${request.id}`}
                            value={`${slot.day}, ${slot.date}, ${slot.time}`}
                            onChange={() => handleSlotSelect(
                              request.id, 
                              `${slot.day}, ${slot.date}, ${slot.time}`
                            )}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {slot.day}, {slot.date}, {slot.time}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => handleDecline(request.id)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Decline
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAccept(request.id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Accept
                    </button>
                  </div>
                </>
              ) : (
                <div className="px-4 py-5 sm:p-6">
                  <p className="text-sm text-gray-700">
                    {request.status === 'accepted' 
                      ? `Meeting confirmed for: ${selectedSlots[request.id] || 'A selected time'}`
                      : 'This request was declined.'}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 