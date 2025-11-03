import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import './Dashboard.css';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchTasks();
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskAdded = async (taskData) => {
    try {
      console.log('Sending task data:', taskData); // Debug log
      const response = await createTask(taskData);
      console.log('Task created:', response.data); // Debug log
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
      console.error('Error details:', error.response?.data); // More details
    }
  };

  const handleToggleComplete = async (taskId, currentStatus) => {
    try {
      await updateTask(taskId, { completed: !currentStatus });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>My To-Do List</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}!</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>
      <div className="dashboard-content">
        <TaskForm onTaskAdded={handleTaskAdded} />
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
}

export default Dashboard;