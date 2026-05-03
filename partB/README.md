# Personal Task Tracker — Backend

## Тайлбар
Node.js + Express + SQLite ашигласан task tracker REST API.

## Суулгах
## Ажиллуулах
## Тест
## API Endpoints
| Method | URL | Тайлбар |
|--------|-----|---------|
| GET | /api/tasks | Бүх task авах |
| GET | /api/tasks/:id | Нэг task авах |
| POST | /api/tasks | Task үүсгэх |
| PUT | /api/tasks/:id | Task шинэчлэх |
| DELETE | /api/tasks/:id | Task устгах |

## Filter ба Search
- GET /api/tasks?priority=high
- GET /api/tasks?label=сургууль
- GET /api/tasks?search=keyword
