// src/components/KanbanBoard.js
import React, { useState, useEffect } from 'react';
import KanbanToolbar from './KanbanToolbar';
import KanbanColumn from './KanbanColumn';
import NewSprintModal from './NewSprintModal'; 

// initialSprintInfoDefault, initialColumns, parseInputDate, formatDateForDisplay, calculateTimeLeft
// ... (Keep these helper constants and functions as they were in the previous version) ...
const initialSprintInfoDefault = {
  status: 'Active',
  sprintName: 'S1 Sprint 1',
  assignee: 'Sohail Ansari',
  priority: 'High',
  startDate: '15/01/2025',
  endDate: '15/01/2025',
  timeLeft: '07d : 168h : 00m : 00s',
};

const initialColumns = {
  activeSprint: {
    id: 'activeSprint',
    name: 'Active Sprint',
    sprintInfo: { ...initialSprintInfoDefault },
    tasks: [
        // Example task already in active sprint from your image
        { id: 'task-kb-sprint-1', taskId: 'P4-T88', title: 'to code', milestone: 'New Milestone', assignee: 'Unassigned', assigneeAvatar: 'N/A', estimatedTime: '0h : 00', dueDate: 'Not set', attachments: 0, links: 0, priorityAlert: false, subTasks: '0/0', comments: 0 }
    ],
  },
  open: {
    id: 'open',
    name: 'Open',
    taskCount: 1, 
    tasks: [
      { id: 'task-1', taskId: 'P9-T1', title: 'Task 5 in Progress', milestone: 'Milestone 3', assignee: 'Bob Wilson', assigneeAvatar: 'BW', estimatedTime: '1h : 00', dueDate: '30 Nov', attachments: 1, links: 0, priorityAlert: true, subTasks: '0/1', comments: 0 },
    ],
  },
  inProgress: {
    id: 'inProgress',
    name: 'In Progress',
    taskCount: 2, 
    tasks: [
      { id: 'task-2', taskId: 'P3-T42', title: 'open', milestone: 'New Milestone', assignee: 'Unassigned', assigneeAvatar: 'N/A', estimatedTime: '0h : 00', dueDate: 'Not set', attachments: 0, links: 0, priorityAlert: false, subTasks: '0/0', comments: 0 },
      { id: 'task-kb-react-1', taskId: 'P2-T1', title: 'Task 3 from Open', milestone: 'Milestone 3', assignee: 'Bob Wilson', assigneeAvatar: 'AT', estimatedTime: '1h : 00', dueDate: '30 Nov', attachments: 1, links: 1, priorityAlert: false, subTasks: '1/1', comments: 1 },
    ],
  },
  overdue: {
    id: 'overdue',
    name: 'Overdue',
    taskCount: 1, 
    tasks: [
      { id: 'task-3', taskId: 'P1-T1', title: 'Task 1 - Overdue', milestone: 'Milestone 1', assignee: 'Abdul Ghaffar', assigneeAvatar: 'AG', estimatedTime: '30m : 00', dueDate: '30 Nov', attachments: 1, links: 1, priorityAlert: false, subTasks: '1/2', comments: 1 },
    ],
  },
};

const parseInputDate = (dateStr) => { 
  if (!dateStr) return null;
  return new Date(dateStr);
};

const formatDateForDisplay = (dateObj) => { 
  if (!dateObj) return 'N/A';
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

const calculateTimeLeft = (endDateStr_yyyy_mm_dd) => { 
  const endDate = parseInputDate(endDateStr_yyyy_mm_dd);
  if (!endDate) return 'N/A';
  const now = new Date();
  endDate.setHours(23, 59, 59, 999); 
  let diff = endDate.getTime() - now.getTime();
  if (diff < 0) return 'Ended';
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  let hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  let mins = Math.floor(diff / (1000 * 60));
  return `${String(days).padStart(2,'0')}d : ${String(hours).padStart(2,'0')}h : ${String(mins).padStart(2,'0')}m`;
};


const KanbanBoard = () => {
  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem('kanban-data-react');
    if (savedColumns) {
      const parsed = JSON.parse(savedColumns);
      Object.keys(parsed).forEach(colId => {
        if (parsed[colId].tasks && parsed[colId].name !== 'Active Sprint') {
          parsed[colId].taskCount = parsed[colId].tasks.length;
        }
         // Initialize sprintInfo if it's missing for activeSprint (e.g. old localStorage data)
        if (colId === 'activeSprint' && !parsed[colId].sprintInfo) {
            parsed[colId].sprintInfo = { ...initialSprintInfoDefault };
        }
      });
      return parsed;
    }
    const initialized = JSON.parse(JSON.stringify(initialColumns));
    Object.keys(initialized).forEach(colId => {
        if (initialized[colId].tasks && initialized[colId].name !== 'Active Sprint') {
            initialized[colId].taskCount = initialized[colId].tasks.length;
        }
    });
    return initialized;
  });

  const [isSprintModalOpen, setIsSprintModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('kanban-data-react', JSON.stringify(columns));
  }, [columns]);

  const handleDragStart = (e, taskId, originColumnId) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('originColumnId', originColumnId);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const originColumnId = e.dataTransfer.getData('originColumnId');
    if (!taskId || originColumnId === targetColumnId) return;

    let taskToMove;
    const newColumnsData = { ...columns };
    newColumnsData[originColumnId] = {
      ...newColumnsData[originColumnId],
      tasks: newColumnsData[originColumnId].tasks.filter(task => {
        if (task.id === taskId) { taskToMove = task; return false; }
        return true;
      }),
    };
    if (newColumnsData[originColumnId].name !== 'Active Sprint') {
      newColumnsData[originColumnId].taskCount = newColumnsData[originColumnId].tasks.length;
    }
    if (taskToMove) {
      newColumnsData[targetColumnId] = {
        ...newColumnsData[targetColumnId],
        tasks: [...newColumnsData[targetColumnId].tasks, taskToMove],
      };
      if (newColumnsData[targetColumnId].name !== 'Active Sprint') {
        newColumnsData[targetColumnId].taskCount = newColumnsData[targetColumnId].tasks.length;
      }
    }
    setColumns(newColumnsData);
  };
  
  const addNewTaskToOpenHandler = () => { // Renamed to avoid conflict with prop name
    const title = prompt("Enter new task title for 'Open' column:");
    if (!title || title.trim() === "") return;
    const newTask = {
      id: `task-${Date.now()}`, taskId: `P${Math.floor(Math.random() * 10)}-T${Math.floor(Math.random() * 100)}`,
      title: title.trim(), milestone: 'New Milestone', assignee: 'Unassigned', assigneeAvatar: 'N/A',
      estimatedTime: '0h : 00', dueDate: 'N/A', attachments: 0, links: 0,
      priorityAlert: false, subTasks: '0/0', comments: 0,
    };
    setColumns(prev => {
      const updatedOpenColumn = { ...prev.open, tasks: [...prev.open.tasks, newTask] };
      updatedOpenColumn.taskCount = updatedOpenColumn.tasks.length; // Update count
      return { ...prev, open: updatedOpenColumn };
    });
  };

  const handleOpenSprintModal = () => setIsSprintModalOpen(true);
  const handleCloseSprintModal = () => setIsSprintModalOpen(false);

  const handleSprintSubmit = (sprintData) => {
    setColumns(prevColumns => {
      const newSprintInfo = {
        status: 'Active',
        sprintName: sprintData.sprintTitle,
        assignee: sprintData.sprintOwner,
        priority: sprintData.priority,
        startDate: formatDateForDisplay(parseInputDate(sprintData.startDate)),
        endDate: formatDateForDisplay(parseInputDate(sprintData.endDate)),
        _endDateRaw: sprintData.endDate, 
        timeLeft: calculateTimeLeft(sprintData.endDate)
      };
      return {
        ...prevColumns,
        activeSprint: {
          ...prevColumns.activeSprint,
          sprintInfo: newSprintInfo,
        }
      };
    });
    handleCloseSprintModal();
  };
  
  useEffect(() => {
    // Ensure sprintInfo is always present for activeSprint column
    if (columns.activeSprint && !columns.activeSprint.sprintInfo) {
        setColumns(prev => ({
            ...prev,
            activeSprint: {
                ...prev.activeSprint,
                sprintInfo: { ...initialSprintInfoDefault }
            }
        }));
    }
    // Recalculate timeLeft if _endDateRaw exists
    else if (columns.activeSprint?.sprintInfo?._endDateRaw) {
        const newTimeLeft = calculateTimeLeft(columns.activeSprint.sprintInfo._endDateRaw);
        if (newTimeLeft !== columns.activeSprint.sprintInfo.timeLeft) {
            setColumns(prev => ({
                ...prev,
                activeSprint: {
                    ...prev.activeSprint,
                    sprintInfo: {
                        ...prev.activeSprint.sprintInfo,
                        timeLeft: newTimeLeft
                    }
                }
            }));
        }
    }
  }, [columns.activeSprint?.sprintInfo?._endDateRaw, columns.activeSprint]); // Added columns.activeSprint dependency

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <KanbanToolbar 
        onOpenSprintModal={handleOpenSprintModal}
        onAddTaskToOpen={addNewTaskToOpenHandler} // Pass the handler
      />
      <div className="flex-grow p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
        {/* Ensure columns.activeSprint.sprintInfo is available before rendering SprintInfoCard in KanbanColumn */}
        {Object.values(columns).map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={column.tasks}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
            isFirstColumn={column.id === 'activeSprint'}
          />
        ))}
      </div>
      <NewSprintModal
        isOpen={isSprintModalOpen}
        onClose={handleCloseSprintModal}
        onSubmit={handleSprintSubmit}
      />
    </div>
  );
};

export default KanbanBoard;