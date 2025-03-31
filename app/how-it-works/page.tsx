"use client";

import Header from '../components/Header';

export default function HowItWorks() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">How QuickSchedule Works</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Effortless Scheduling Between Two People
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              QuickSchedule simplifies the process of finding mutually available times between two busy individuals.
            </p>
          </div>

          <div className="mt-20">
            <dl className="space-y-16">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <span className="text-lg font-bold">1</span>
                  </div>
                  <p className="ml-16 text-xl leading-6 font-medium text-gray-900">Connect Your Calendar</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  <p>
                    QuickSchedule synchronizes with your Google Calendar to automatically import your existing commitments and busy periods.
                    This ensures that you never double-book yourself or propose times when you're already busy.
                  </p>
                  <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                      alt="Calendar integration illustration" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <span className="text-lg font-bold">2</span>
                  </div>
                  <p className="ml-16 text-xl leading-6 font-medium text-gray-900">Find Overlapping Availability</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  <p>
                    When you need to schedule a meeting with someone, QuickSchedule compares both of your calendars to identify times when you're both available.
                    This eliminates the back-and-forth of suggesting times that won't work.
                  </p>
                  <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                      alt="Overlapping availability illustration" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <span className="text-lg font-bold">3</span>
                  </div>
                  <p className="ml-16 text-xl leading-6 font-medium text-gray-900">Choose Preferred Times</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  <p>
                    From the overlapping availability, select your preferred time slots. You can choose multiple options to give flexibility.
                    These selected times will be sent to the other person for confirmation.
                  </p>
                  <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1583521214690-73421a1829a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                      alt="Selecting preferred times illustration" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <span className="text-lg font-bold">4</span>
                  </div>
                  <p className="ml-16 text-xl leading-6 font-medium text-gray-900">Confirm and Schedule</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  <p>
                    The recipient will receive your proposed times and can select the one that works best for them.
                    Once confirmed, the meeting is automatically added to both of your calendars with all the relevant details.
                  </p>
                  <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1557568192-2fafc8b5198c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                      alt="Calendar confirmation illustration" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-16 flex justify-center">
            <a 
              href="/dashboard" 
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
            >
              Try It Now
            </a>
          </div>
        </div>
      </div>
    </main>
  );
} 