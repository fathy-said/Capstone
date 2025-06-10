import React, { useState } from 'react';

const StudentDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<string>("Weekly");

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Task Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Task Completed</h2>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '53%' }}></div>
            </div>
            <p className="text-gray-600 my-2">53% completed</p>
            
            <div className="border-t border-gray-200 mt-6 pt-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Start Date:</p>
                  <p>20 Nov</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-sm">End Date:</p>
                  <p>20 Nov</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Task Assigned</h2>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-700 h-2 rounded-full" style={{ width: '14%' }}></div>
            </div>
            <p className="text-gray-600 my-2">14% completed</p>
            
            <div className="border-t border-gray-200 mt-6 pt-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Start Date:</p>
                  <p>20 Nov</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-sm">End Date:</p>
                  <p>20 Nov</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Task Pending to Assign</h2>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '33%' }}></div>
            </div>
            <p className="text-gray-600 my-2">33% completed</p>
            
            <div className="border-t border-gray-200 mt-6 pt-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Start Date:</p>
                  <p>20 Nov</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-sm">End Date:</p>
                  <p>20 Nov</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tasks Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-medium text-gray-700">Tasks</h2>
            <div className="relative">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-full py-2 px-6 pr-8 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="h-80 relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-gray-500 py-4">
              <span className="text-sm">100</span>
              <span className="text-sm">70</span>
              <span className="text-sm">60</span>
              <span className="text-sm">40</span>
              <span className="text-sm">20</span>
            </div>
            
            {/* Chart area */}
            <div className="ml-10 h-full relative">
              {/* Horizontal grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-t border-gray-100 w-full h-0"></div>
                ))}
              </div>
              
              {/* Chart visualization */}
              <div className="absolute inset-0">
                <div className="w-full h-full bg-blue-50 relative">
                  {/* Blue line chart - adjusted to match the screenshot */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 33">
                      <path 
                        d="M0,33 L0,25 C10,25 20,20 30,15 C40,10 50,5 60,3 C70,1 80,0 90,0 L100,0 L100,33 Z" 
                        fill="#EBF5FF"
                      />
                      <path 
                        d="M0,25 C10,25 20,20 30,15 C40,10 50,5 60,3 C70,1 80,0 90,0 L100,0" 
                        fill="none" 
                        stroke="#3B82F6" 
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                  
                  {/* Highlight point */}
                  <div className="absolute top-1/4 right-1/4 transform -translate-y-1/2">
                    <div className="relative">
                      <div className="w-5 h-5 rounded-full bg-white border-2 border-orange-400 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                      </div>
                      <div className="absolute top-5 left-1/2 h-32 w-0.5 bg-orange-400 transform -translate-x-1/2"></div>
                      <div className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <span className="text-blue-600 font-medium">72 task</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* X-axis labels */}
              <div className="absolute bottom-[-25px] left-0 right-0 flex justify-between text-gray-500 text-sm">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 