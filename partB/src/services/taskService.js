const db = require('../db/database');

const getAllTasks = (filters = {}) => {
  let query = 'SELECT * FROM tasks WHERE 1=1';
  const params = [];

  if (filters.priority) {
    query += ' AND priority = ?';
    params.push(filters.priority);
  }
  if (filters.label) {
    query += ' AND label = ?';
    params.push(filters.label);
  }
  if (filters.search) {
    query += ' AND title LIKE ?';
    params.push(`%${filters.search}%`);
  }

  return db.prepare(query).all(...params);
};

const getTaskById = (id) => db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);

const createTask = (task) => {
  const data = {
    title: task.title,
    description: task.description || null,
    due_date: task.due_date || null,
    priority: task.priority || 'medium',
    label: task.label || null
  };
  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, due_date, priority, label)
    VALUES (@title, @description, @due_date, @priority, @label)
  `);
  const result = stmt.run(data);
  return getTaskById(result.lastInsertRowid);
};

const updateTask = (id, task) => {
  const data = {
    title: task.title,
    description: task.description || null,
    due_date: task.due_date || null,
    priority: task.priority || 'medium',
    label: task.label || null,
    completed: task.completed || 0,
    id: id
  };
  const stmt = db.prepare(`
    UPDATE tasks SET title=@title, description=@description,
    due_date=@due_date, priority=@priority, label=@label,
    completed=@completed WHERE id=@id
  `);
  stmt.run(data);
  return getTaskById(id);
};

const deleteTask = (id) => {
  db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  return { message: 'Task deleted' };
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
