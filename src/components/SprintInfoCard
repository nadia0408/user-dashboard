import React from 'react';

const SprintInfoCard = ({ sprint }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
          sprint.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {sprint.status}
        </span>
        <div className="flex items-center space-x-2 text-gray-600">
          <i className="fas fa-play cursor-pointer hover:text-black"></i>
          <i className="far fa-circle cursor-pointer hover:text-black"></i> {/* Using far for empty circle */}
        </div>
      </div>
      <h3 className="text-sm font-bold text-gray-800 mb-1">{sprint.sprintName}</h3>
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="text-sm text-gray-700">{sprint.assignee}</p>
          <p className="text-xs text-gray-500">
            {sprint.startDate} <span className="mx-1">to</span> {sprint.endDate}
          </p>
        </div>
        <span className="text-sm font-medium text-gray-800">{sprint.priority}</span>
      </div>
      {sprint.timeLeft && (
        <div className="flex items-center text-xs text-green-600">
          <i className="far fa-clock mr-1"></i>
          <span>{sprint.timeLeft}</span>
        </div>
      )}
    </div>
  );
};

export default SprintInfoCard;