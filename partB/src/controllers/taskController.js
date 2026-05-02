const taskService = require('../services/taskService');

const getAllTasks = (req, res) => {
  try {
    const tasks = taskService.getAllTasks(req.query);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTask = (req, res) => {
  const task = taskService.getTaskById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
};

const createTask = (req, res) => {
  try {
    if (!req.body.title) return res.status(400).json({ error: 'Title is required' });
    const task = taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTask = (req, res) => {
  try {
    const task = taskService.updateTask(req.params.id, req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = (req, res) => {
  try {
    res.json(taskService.deleteTask(req.params.id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };
