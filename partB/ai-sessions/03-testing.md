# AI Session 03 — Unit Tests

## Огноо: 2026-05-02

## Зорилго
Jest + Supertest ашиглан 10+ unit test бичих

## Яриа (товч)

**Би:** Task API-д Jest + Supertest ашиглан unit test бич.

**AI:** 10 test бичсэн:
- CREATE: happy path, missing title, default priority
- READ: get all, get by id, 404
- FILTER: priority filter, search
- UPDATE: task шинэчлэх
- DELETE: task устгах

**Би:** npm test ажиллуулсан — 10/10 pass.

## Security анхаарал
AI-н бичсэн test-үүд real database ашигласан.
Test тус бүр бие биенд нөлөөлж болзошгүй байсан.
→ Анхаарал: Production-д test database тусдаа байх ёстой.

## Үр дүн
- 10/10 test pass
- CRUD бүрэн тестлэгдсэн
