// src/components/NewSprintModal.js
import React, { useState, useEffect } from 'react';

const NewSprintModal = ({ isOpen, onClose, onSubmit }) => {
  const [sprintTitle, setSprintTitle] = useState('');
  const [sprintOwner, setSprintOwner] = useState('');
  const [startDate, setStartDate] = useState(''); // Store as yyyy-mm-dd for <input type="date">
  const [endDate, setEndDate] = useState('');   // Store as yyyy-mm-dd for <input type="date">
  const [priority, setPriority] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end >= start) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Inclusive
        setDuration(`${diffDays} day${diffDays !== 1 ? 's' : ''}`);
      } else {
        setDuration('');
      }
    } else {
      setDuration('');
    }
  }, [startDate, endDate]);

  const handleSubmit = (isAddSprintsNext = false) => { // isAddSprintsNext differentiates "Next" from "Add Sprints" if needed later
    if (!sprintTitle || !sprintOwner || !priority || !startDate || !endDate) {
      alert('Please fill in all required fields and select valid dates.');
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) {
        alert('End Date cannot be before Start Date.');
        return;
    }

    onSubmit({
      sprintTitle,
      sprintOwner,
      startDate, // yyyy-mm-dd
      endDate,   // yyyy-mm-dd
      priority,
    });
    // Optionally reset form and close, or let parent handle closing
    // For this example, parent will close.
  };

  const handleFormReset = () => {
    setSprintTitle('');
    setSprintOwner('');
    setStartDate('');
    setEndDate('');
    setPriority('');
    setDuration('');
  };

  useEffect(() => {
    if (isOpen) {
        handleFormReset();
    }
  }, [isOpen]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-semibold text-gray-700">New Sprints</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times fa-lg"></i>
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto pr-2 modal-body-scrollbar"> {/* Added scrollbar class */}
          <div>
            <label htmlFor="sprintTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Sprints Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="sprintTitle"
              value={sprintTitle}
              onChange={(e) => setSprintTitle(e.target.value)}
              placeholder="Enter Project Title"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="sprintOwner" className="block text-sm font-medium text-gray-700 mb-1">
              Sprint Owner <span className="text-red-500">*</span>
            </label>
            <select
              id="sprintOwner"
              value={sprintOwner}
              onChange={(e) => setSprintOwner(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm appearance-none"
            >
              <option value="" disabled>Select Sprint Owner</option>
              <option value="Sohail Ansari">Sohail Ansari</option>
              <option value="Jane Doe">Jane Doe</option>
              <option value="John Smith">John Smith</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div>
              <label htmlFor="sprintStartDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date" // Use date type for better UX
                id="sprintStartDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="sprintEndDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date" // Use date type for better UX
                id="sprintEndDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="sprintDuration" className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 sm:text-sm h-[38px] flex items-center">
                {duration || <span className="text-gray-400 italic">Calculated</span>}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="sprintPriority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              id="sprintPriority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm appearance-none"
            >
              <option value="" disabled>Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end items-center p-4 border-t space-x-3">
          <button
            type="button"
            onClick={() => handleSubmit(false)} // Pass false for "Next"
            className="bg-white text-red-600 border border-red-600 px-6 py-2 rounded-md hover:bg-red-50 text-sm font-medium"
          >
            Next
          </button>
           <button type="button" onClick={() => handleSubmit(true)} // Pass true for "Add Sprints"
                  className="text-red-600 hover:text-red-700 text-sm font-medium">
            Add Sprints
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewSprintModal;