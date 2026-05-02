# AI Session 01 — Task CRUD Feature

## Огноо: 2026-05-02

## Зорилго
Task CRUD API үүсгэх — Express + SQLite ашиглан

## Яриа (товч)

**Би:** Task tracker-т CRUD API хэрэгтэй. Express + SQLite ашигла.

**AI:** Layered architecture санал болгосон:
- routes/ → controllers/ → services/ → db/
- better-sqlite3 ашиглах (sync API, хялбар)

**Би:** createTask функц бичиж өг.

**AI:** @-parameter syntax ашигласан INSERT query бичсэн.
Гэхдээ description field-ийг заавал шаардсан нь алдаа байсан.

## Hallucination жишээ
AI-н бичсэн createTask функц нь `@description` параметрийг
заавал шаардсан тул description өгөөгүй үед алдаа гарсан.
→ Засвар: `description: task.description || null` гэж default утга өгсөн.

## Үр дүн
- GET, POST, PUT, DELETE endpoint-ууд ажиллаж байна
- Filter by priority, search by title ажиллаж байна
