import React from 'react';

function SkeletonTable() {
  const rows = 10; // Number of skeleton rows

  return (
    <div className="p-5">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr>
              <th className="px-6 py-3 font-medium text-left text-gray-600 border-b">Column 1</th>
              <th className="px-6 py-3 font-medium text-left text-gray-600 border-b">Column 2</th>
              <th className="px-6 py-3 font-medium text-left text-gray-600 border-b">Column 3</th>
              <th className="px-6 py-3 font-medium text-left text-gray-600 border-b">Column 4</th>
              <th className="px-6 py-3 font-medium text-left text-gray-600 border-b">Column 5</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-300 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-300 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-300 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-300 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-300 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SkeletonTable;
