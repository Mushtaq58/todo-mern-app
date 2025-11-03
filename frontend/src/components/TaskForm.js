import React, { useState } from 'react';

function TaskForm({ onTaskAdded }) {
  const [taskData, setTaskData] = useState({
    text: '',
    date: '',
    time: ''
  });

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskData.text.trim() && taskData.date && taskData.time) {
      onTaskAdded(taskData);
      setTaskData({ text: '', date: '', time: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="text"
        placeholder="Task name..."
        value={taskData.text}
        onChange={handleChange}
        className="task-input"
        required
      />
      <input
        type="date"
        name="date"
        value={taskData.date}
        onChange={handleChange}
        className="task-date"
        required
      />
      <input
        type="time"
        name="time"
        value={taskData.time}
        onChange={handleChange}
        className="task-time"
        required
      />
      <button type="submit" className="btn-add">Add Task</button>
    </form>
  );
}

export default TaskForm;