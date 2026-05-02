# AI Planning Session — Stack & Architecture

## Session 1: Stack харьцуулалт
**Би:** Task tracker проектод ямар stack ашиглах вэ? 3 сонголт харьцуул.

**AI:** Node+Express+SQLite, Python+Flask+SQLite, Node+Express+MongoDB гурвыг
харьцуулахад Node+Express+SQLite хамгийн тохиромжтой. Шалтгаан: JS full-stack,
SQLite setup хэрэггүй, Express энгийн.

## Session 2: Architecture
**Би:** Task tracker-ийн architecture яаж зохион байгуулах вэ?

**AI:** Layered architecture санал болгосон:
Browser → Express Router → Controller → Service → SQLite
Энэ нь separation of concerns-ийг хангана.

## Session 3: Folder бүтэц
**Би:** Folder бүтцийг яаж зохион байгуулах вэ?

**AI:** src/ дотор routes/, controllers/, services/, db/ гэж хуваахыг санал болгосон.
