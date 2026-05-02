# ADR-001: Stack Selection

## Status
Accepted

## Context
Personal Task Tracker проектод тохирох stack сонгох шаардлагатай болсон.
3 сонголтыг харьцуулсан: Node+Express+SQLite, Python+Flask+SQLite, Node+Express+MongoDB.

## Decision
Node.js + Express + SQLite stack сонгосон.

## Rationale
- JavaScript-ийг frontend болон backend хоёуланд ашиглах боломжтой
- SQLite нь setup шаардахгүй, файл дээр суурилсан
- Express нь энгийн бөгөөд баримт бичиг маш сайн
- AI (Claude) энэ stack-д хамгийн сайн дэмжлэг үзүүлдэг

## Consequences
- node_modules/ хэмжээ том байж болно
- Production-д PostgreSQL руу шилжихэд refactor хэрэгтэй болж болно
