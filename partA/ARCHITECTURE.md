# Architecture

## Mermaid Diagram

```mermaid
graph TD
    A[Browser - HTML/CSS/JS] -->|HTTP REST| B[Express Server]
    B --> C[Task Router]
    C --> D[Task Controller]
    D --> E[Task Service]
    E --> F[(SQLite Database)]
```

## Modules
- **server.js** — Express app, middleware
- **routes/tasks.js** — REST endpoints
- **controllers/taskController.js** — request/response logic
- **services/taskService.js** — business logic
- **db/database.js** — SQLite connection
