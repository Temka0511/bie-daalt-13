# ADR-002: Frontend Framework сонголт

## Status
Accepted

## Context
Task tracker-ийн frontend-д framework сонгох шаардлагатай болсон.
React, Vue, эсвэл Vanilla JS гэсэн 3 сонголт байсан.

## Decision
Vanilla HTML/CSS/JS сонгосон.

## Rationale
- Энэ төсөл жижиг — framework overhead шаардлагагүй
- Build step байхгүй → deployment хялбар
- Express-ийн static folder-аас шууд serve хийж болно
- AI-тай ажиллахад энгийн код илүү ойлгомжтой

## Consequences
- Component reuse хязгаарлагдмал
- Том болоход React руу шилжих хэрэгтэй болж болно
