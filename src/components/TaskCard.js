import React from 'react';

const TaskCard = ({ task, onDragStart, columnId }) => {
  if (!task) return null;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id, columnId)}
      className="bg-white p-3 rounded-md shadow-sm border border-gray-200 mb-3 cursor-grab active:cursor-grabbing"
    >
      <div className="flex justify-between items-start mb-1">
        <span className="text-xs font-semibold text-blue-600">{task.taskId}</span>
        {/* Placeholder for menu or other actions */}
      </div>
      <p className="text-sm font-medium text-gray-800 mb-2">{task.title}</p>
      
      {task.milestone && (
        <div className="flex items-center text-xs text-gray-600 mb-1">
          <i className="fas fa-flag mr-2 text-red-500"></i>
          <span>{task.milestone}</span>
        </div>
      )}

      {task.assignee && (
        <div className="flex items-center text-xs text-gray-600 mb-1">
          <i className="fas fa-user mr-2 text-gray-500"></i>
          <span>{task.assignee}</span>
        </div>
      )}

      {task.estimatedTime && (
        <div className="flex items-center text-xs text-gray-600 mb-2">
          <i className="fas fa-clock mr-2 text-green-500"></i>
          <span>{task.estimatedTime}</span>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-2 mt-2">
        <div className="flex items-center space-x-2">
          {typeof task.attachments === 'number' && <span><i className="fas fa-paperclip"></i> {task.attachments}</span>}
          {typeof task.links === 'number' && <span><i className="fas fa-link"></i> {task.links}</span>}
          {task.priorityAlert && <span className="text-red-500"><i className="fas fa-exclamation-triangle"></i></span>}
          {task.subTasks && <span><i className="fas fa-tasks"></i> {task.subTasks}</span>} {/* Using tasks icon as placeholder for tg1 */}
          {typeof task.comments === 'number' && <span><i className="fas fa-comment-dots"></i> {task.comments}</span>}
        </div>
        <div className="flex items-center space-x-1">
          {task.dueDate && <span className="text-red-500"><i className="fas fa-history mr-1"></i>{task.dueDate}</span>}
          {task.assigneeAvatar && (
            <div className="w-5 h-5 bg-green-500 text-white text-xs flex items-center justify-center rounded-full font-bold">
              {task.assigneeAvatar}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;