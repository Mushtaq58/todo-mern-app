import React from 'react';

function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks yet. Add one to get started!</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-content">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task._id, task.completed)}
                className="task-checkbox"
              />
              <div className="task-details">
                <span className="task-text">{task.text}</span>
                <span className="task-datetime">
                  📅 {task.date} ⏰ {task.time}
                </span>
              </div>
            </div>
            <button
              onClick={() => onDeleteTask(task._id)}
              className="btn-delete"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;