import React from 'react';
import TaskCard from './TaskCard';
import SprintInfoCard from './SprintInfoCard';

const headerColors = {
  activeSprint: 'bg-green-500', // Not directly a tag, but for consistency
  open: 'bg-red-100 text-red-700 border border-red-300',
  inProgress: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
  overdue: 'bg-red-500 text-white',
};

const KanbanColumn = ({ column, tasks, onDragOver, onDrop, onDragStart, isFirstColumn }) => {
  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
      className="bg-gray-100 p-3 rounded-lg min-h-[calc(100vh-250px)] flex flex-col" // Adjusted min-height
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          {!isFirstColumn && (
            <button className="text-gray-500 hover:text-black mr-2">
              <i className="fas fa-arrow-left"></i>
            </button>
          )}
          <h3 className={`text-sm font-semibold px-2 py-1 rounded ${headerColors[column.id] || 'bg-gray-200 text-gray-800'}`}>
            {column.taskCount !== undefined ? `${column.taskCount} ${column.name}` : column.name}
          </h3>
        </div>
        {/* Placeholder for column actions like ... */}
      </div>

      {isFirstColumn && column.sprintInfo && (
        <SprintInfoCard sprint={column.sprintInfo} />
      )}
      
      <div className="flex-grow space-y-0 overflow-y-auto pr-1"> {/* Added pr-1 for scrollbar space */}
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onDragStart={onDragStart} columnId={column.id} />
        ))}
        {tasks.length === 0 && isFirstColumn && (
          <div className="flex-grow flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 text-center text-gray-500">
            Drag from respective statuses and drop your tasks here.
          </div>
        )}
         {tasks.length === 0 && !isFirstColumn && (
          <div className="flex-grow flex items-center justify-center text-center text-gray-400 text-sm p-4">
            No tasks in this column.
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;