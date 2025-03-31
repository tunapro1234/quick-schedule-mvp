"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types for our schedule items
interface ScheduleEvent {
  id: string;
  title: string;
  day: number;
  start: number;
  end: number;
  confirmed: boolean;
  createdAt?: Date;
}

interface Request {
  id: string;
  sender: string;
  recipient: string;
  status: 'pending' | 'accepted' | 'declined';
  slots: {
    day: string;
    date: string;
    time: string;
    dayIndex?: number;
    hourIndex?: number;
  }[];
  selectedSlot?: string;
  createdAt?: Date;
}

interface ScheduleContextType {
  events: ScheduleEvent[];
  requests: Request[];
  addEvent: (event: Omit<ScheduleEvent, 'id'>) => void;
  updateEvent: (id: string, update: Partial<ScheduleEvent>) => void;
  removeEvent: (id: string) => void;
  addRequest: (request: Omit<Request, 'id'>) => void;
  updateRequest: (id: string, update: Partial<Request>) => void;
  removeRequest: (id: string) => void;
  isClient: boolean;
}

// Initial mock data for events
const initialEvents: ScheduleEvent[] = [
  { id: '1', title: 'Team Meeting', day: 0, start: 10, end: 11, confirmed: true },
  { id: '2', title: 'Project Review', day: 1, start: 14, end: 15, confirmed: true },
  { id: '3', title: 'Client Call', day: 2, start: 11, end: 12, confirmed: true },
  { id: '4', title: 'Lunch with Alex', day: 3, start: 12, end: 13, confirmed: false },
  { id: '5', title: 'Product Demo', day: 4, start: 15, end: 16, confirmed: true },
];

// Initial mock data for requests
const initialRequests: Request[] = [
  {
    id: '1',
    sender: 'jane.doe@example.com',
    recipient: 'user@example.com',
    status: 'pending',
    slots: [
      { day: 'Monday', date: '2023-04-03', time: '10:00 AM', dayIndex: 0, hourIndex: 10 },
      { day: 'Tuesday', date: '2023-04-04', time: '2:00 PM', dayIndex: 1, hourIndex: 14 },
      { day: 'Friday', date: '2023-04-07', time: '11:00 AM', dayIndex: 4, hourIndex: 11 },
    ],
  },
  {
    id: '2',
    sender: 'john.smith@example.com',
    recipient: 'user@example.com',
    status: 'pending',
    slots: [
      { day: 'Wednesday', date: '2023-04-05', time: '9:00 AM', dayIndex: 2, hourIndex: 9 },
      { day: 'Thursday', date: '2023-04-06', time: '4:00 PM', dayIndex: 3, hourIndex: 16 },
    ],
  },
];

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  
  // Initialize state from localStorage if available, otherwise use initial data
  const [events, setEvents] = useState<ScheduleEvent[]>(initialEvents);
  const [requests, setRequests] = useState<Request[]>(initialRequests);

  // Set isClient true after component mounts
  useEffect(() => {
    setIsClient(true);
    
    // Now that we're on the client, we can load from localStorage
    const savedEvents = localStorage.getItem('quickSchedule_events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
    
    const savedRequests = localStorage.getItem('quickSchedule_requests');
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    }
  }, []);

  // Save to localStorage when state changes (only on client)
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('quickSchedule_events', JSON.stringify(events, (key, value) => {
        // Handle Date objects during JSON serialization
        if (key === 'createdAt' && value instanceof Date) {
          return value.toISOString();
        }
        return value;
      }));
    }
  }, [events, isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('quickSchedule_requests', JSON.stringify(requests, (key, value) => {
        // Handle Date objects during JSON serialization
        if (key === 'createdAt' && value instanceof Date) {
          return value.toISOString();
        }
        return value;
      }));
    }
  }, [requests, isClient]);

  // Event management functions
  const addEvent = (event: Omit<ScheduleEvent, 'id'>) => {
    const newEvent = {
      ...event,
      id: `event-${Date.now()}`,
      createdAt: new Date(),
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const updateEvent = (id: string, update: Partial<ScheduleEvent>) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, ...update } : event))
    );
  };

  const removeEvent = (id: string) => {
    // Find the event to be removed
    const eventToRemove = events.find(event => event.id === id);
    
    if (eventToRemove) {
      // First, remove the event
      setEvents((prev) => prev.filter((event) => event.id !== id));
      
      // Then, find any accepted requests that might be associated with this event (matching day/time slot)
      // This will help keep the system consistent if a user deletes an event that was from an accepted request
      setRequests((prev) => 
        prev.map((request) => {
          // Check if this is an accepted request with a slot that matches the removed event
          if (request.status === 'accepted' && request.selectedSlot) {
            const matchingSlot = request.slots.find(
              slot => 
                slot.dayIndex === eventToRemove.day && 
                slot.hourIndex === eventToRemove.start
            );
            
            // If there's a matching slot, mark the request as declined
            if (matchingSlot) {
              return { ...request, status: 'declined' };
            }
          }
          
          return request;
        })
      );
    } else {
      // If event wasn't found, just remove it from the events array
      setEvents((prev) => prev.filter((event) => event.id !== id));
    }
  };

  // Request management functions
  const addRequest = (request: Omit<Request, 'id'>) => {
    const newRequest = {
      ...request,
      id: `request-${Date.now()}`,
      createdAt: new Date(),
    };
    setRequests((prev) => [...prev, newRequest]);
  };

  const updateRequest = (id: string, update: Partial<Request>) => {
    setRequests((prev) =>
      prev.map((request) => {
        if (request.id === id) {
          // If request is being accepted and has a selectedSlot
          if (update.status === 'accepted' && (request.selectedSlot || update.selectedSlot)) {
            const slotInfo = request.slots.find(
              (slot) => `${slot.day}, ${slot.date}, ${slot.time}` === (update.selectedSlot || request.selectedSlot)
            );
            
            if (slotInfo && slotInfo.dayIndex !== undefined && slotInfo.hourIndex !== undefined) {
              // Look for existing pending event with this sender and slot
              const pendingEvent = events.find(event => 
                event.day === slotInfo.dayIndex && 
                event.start === slotInfo.hourIndex && 
                !event.confirmed && 
                event.title.includes(request.sender)
              );
              
              // Add an event for the accepted meeting
              // If there's a pending event, update it to confirmed
              // Otherwise create a new confirmed event
              if (pendingEvent) {
                updateEvent(pendingEvent.id, { confirmed: true });
              } else {
                addEvent({
                  title: `Meeting with ${request.sender}`,
                  day: slotInfo.dayIndex,
                  start: slotInfo.hourIndex,
                  end: slotInfo.hourIndex + 1, // 1 hour meeting by default
                  confirmed: true
                });
              }
            }
          }
          
          return { ...request, ...update };
        }
        return request;
      })
    );
  };

  const removeRequest = (id: string) => {
    setRequests((prev) => prev.filter((request) => request.id !== id));
  };

  return (
    <ScheduleContext.Provider
      value={{
        events,
        requests,
        addEvent,
        updateEvent,
        removeEvent,
        addRequest,
        updateRequest,
        removeRequest,
        isClient
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
} 