const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all tasks for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// Create new task
router.post('/', auth, async (req, res) => {
  try {
    const { text, date, time } = req.body;
    
    console.log('Creating task with data:', { text, date, time, userId: req.userId }); // Debug log
    
    const task = new Task({
      user: req.userId,
      text,
      date,
      time
    });

    await task.save();
    console.log('Task saved successfully:', task); // Debug log
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task - Full error:', error); // Better error logging
    console.error('Error message:', error.message); // Error message
    console.error('Error stack:', error.stack); // Stack trace
    res.status(500).json({ error: 'Error creating task' });
  }
});

// Update task (toggle completion or edit text)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;

    const task = await Task.findOne({ _id: id, user: req.userId });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (text !== undefined) task.text = text;
    if (completed !== undefined) task.completed = completed;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findOneAndDelete({ _id: id, user: req.userId });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
});

module.exports = router;