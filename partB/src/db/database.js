const Database = require('better-sqlite3');
const db = new Database('tasks.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    due_date TEXT,
    priority TEXT DEFAULT 'medium',
    label TEXT,
    completed INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

module.exports = db;
