// src/components/KanbanToolbar.js
import React from 'react';

// Props:
// onOpenSprintModal: function to open the NewSprintModal
// onAddTaskToOpen: function to trigger adding a new task (e.g., via prompt or a new task modal)
const KanbanToolbar = ({ onOpenSprintModal, onAddTaskToOpen }) => {
  return (
    <div className="p-4 bg-white border-b flex space-x-3">
      {/* Button as shown in your latest screenshot for Kanban View */}
      <button
        onClick={onAddTaskToOpen}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm font-semibold flex items-center"
      >
        <i className="fas fa-plus mr-2"></i> Add Task to Open
      </button>

      {/* Button to trigger the New Sprint Modal (keeping functionality accessible) */}
      {/* You can decide if this button fits your final design or if the modal is triggered differently */}
      <button
        onClick={onOpenSprintModal}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-semibold flex items-center"
      >
        <i className="fas fa-plus mr-2"></i> Add Sprint
      </button>
      
      {/* 
        If you want to re-introduce parts of the more complex toolbar later, 
        you can add them here or create a different toolbar component for other views.
        For example:
        <div className="flex-grow flex justify-end space-x-2">
            <input type="search" placeholder="Search tasks..." className="px-3 py-2 border rounded-md text-sm" />
        </div>
      */}
    </div>
  );
};

export default KanbanToolbar;