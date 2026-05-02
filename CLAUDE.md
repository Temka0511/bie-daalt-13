# CLAUDE.md — Personal Task Tracker

## Project Overview
Personal task tracker with CRUD, due dates, priority, labels, and search/filter.

## Tech Stack
- Backend: Node.js + Express
- Database: SQLite (better-sqlite3)
- Frontend: Vanilla HTML/CSS/JS
- Testing: Jest

## Build Commands
```bash
cd partB
npm install
npm run dev
npm test
```

## Code Conventions
- camelCase for variables and functions
- RESTful routes: /api/tasks, /api/tasks/:id
- Always return { error: "message" } on failure
- Conventional Commits: feat, fix, docs, test, refactor, chore

## No-Go Zones
- Do NOT use eval()
- Do NOT store secrets in code
- Do NOT commit node_modules/
- Do NOT delete tests/
