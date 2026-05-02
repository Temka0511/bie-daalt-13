# AI Usage Report — Personal Task Tracker

## Ерөнхий тойм
Энэ бие даалтад Claude AI-г үндсэн хөгжүүлэлтийн туслах хэрэгслэл болгон ашигласан.
Spec → Generate → Review → Integrate workflow-г дагасан.

---

## 1. Юуг AI хийсэн, юуг өөрөө хийсэн?

### AI хийсэн зүйлс:
- **Архитектур:** Layered architecture (routes/controllers/services/db) санал болгосон
- **Код үүсгэлт:** taskService.js, taskController.js, routes/tasks.js бүрэн үүсгэсэн
- **Frontend:** HTML/CSS/JS single-page UI үүсгэсэн
- **Unit tests:** 10 Jest + Supertest test бичсэн
- **Документ:** CLAUDE.md, ADR-001, ADR-002 бүтэц санал болгосон
- **Slash commands:** 5 custom command бичсэн

### Өөрөө хийсэн зүйлс:
- **Сэдэв сонголт:** Personal Task Tracker сонгосон шалтгааныг өөрөө шийдсэн
- **Stack баталгаажуулалт:** AI санал болгосон stack-ийг өөрөө судалж баталгаажуулсан
- **Алдаа засвар:** description field алдааг өөрөө олж засварласан
- **Git workflow:** Commit message бүрийг өөрөө бичсэн
- **Review:** AI үүсгэсэн кодыг бүрэн уншиж шалгасан
- **Encoding асуудал:** Монгол текст encoding асуудлыг өөрөө судалсан

---

## 2. Hallucination жишээ

### Жишээ 1: description field заавал шаардах
AI-н анхны createTask функц нь дараах байдалтай байсан:

```javascript
const createTask = (task) => {
  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, due_date, priority, label)
    VALUES (@title, @description, @due_date, @priority, @label)
  `);
  const result = stmt.run(task);
  return getTaskById(result.lastInsertRowid);
};
```

Энд `task` объектыг шууд `stmt.run(task)`-д дамжуулсан тул
description өгөөгүй үед `Missing named parameter "@description"` алдаа гарсан.
AI нь better-sqlite3-ийн @-parameter syntax-г буруу ойлгосон.

**Яаж олсон:** curl-аар POST хийхэд алдаа гарсан тул console-д шалгасан.

**Засвар:**
```javascript
const data = {
  title: task.title,
  description: task.description || null,
  due_date: task.due_date || null,
  priority: task.priority || 'medium',
  label: task.label || null
};
stmt.run(data);
```

### Жишээ 2: Test isolation асуудал
AI-н бичсэн unit test-үүд бүгд нэг database ашигласан.
Тест тус бүр өмнөх тестийн үлдэгдэл өгөгдөлд найдаж байсан.
Жишээ нь: GET /api/tasks?search=Searchable тест нь
өмнөх CREATE тест ажилласан байхыг шаардаж байсан.

**Яаж олсон:** Тест дарааллыг өөрчилсөн үед зарим тест fail болсон.

**Засвар анхаарал:** Production дээр beforeEach/afterEach ашиглан
test database цэвэрлэх хэрэгтэй. Энэ бие даалтад цаг хүрэлцээгүй тул
тест дараалал тогтмол байлгасан.

---

## 3. Security/License анхаарал

### Security жишээ: SQL Injection эрсдэл
AI-н анхны getAllTasks функцад filter хийхдээ дараах байдалтай байсан:

```javascript
// АЮУЛТАЙ — AI анхны санал
if (filters.search) {
  query += ` AND title LIKE '%${filters.search}%'`;
}
```

Энэ нь SQL injection-д өртөмтгий! Хэрэглэгч `filters.search`-д
`' OR '1'='1` гэж оруулбал бүх өгөгдлийг авч болно.

**Яаж олсон:** OWASP Top 10 жагсаалтыг санасан тул шалгасан.

**Засвар:** Parameterized query ашигласан:
```javascript
if (filters.search) {
  query += ' AND title LIKE ?';
  params.push(`%${filters.search}%`);
}
```
better-sqlite3 нь `.all(...params)` syntax-аар parameterized query дэмждэг.

### License анхаарал
better-sqlite3 нь MIT license-тэй — commercial use зөвшөөрөгдсөн.
Express, Jest, Supertest бүгд MIT — аюулгүй.

---

## 4. Юуг AI-аар хурдан хийсэн?

- **Boilerplate код:** Express server, route, controller бүтцийг
  10 минутад үүсгэсэн. Өөрөө хийвэл 1-2 цаг зарцуулна.
- **Unit test:** 10 test-ийг нэг дор үүсгэсэн — supertest syntax мэдэхгүй байсан ч
  AI шууд зөв жишээ өгсөн.
- **HTML/CSS UI:** Single-page UI-г хурдан үүсгэсэн.
  CSS styling-д маш их цаг хэмнэсэн.
- **Документ:** CLAUDE.md, ADR format-ыг AI санал болгосон тул
  бүтцийг хайхад цаг зарцуулаагүй.

---

## 5. Юуг AI-аар удаан хийсэн?

- **Алдаа засвар:** AI үүсгэсэн кодын алдааг олоход өөрөө debug хийх
  шаардлагатай болсон. description field алдаа олоход хэдэн минут зарцуулсан.
- **Encoding асуудал:** Монгол текст encoding асуудлыг AI тайлбарласан ч
  яг яаж засах нь тодорхой биш байсан.
- **Context алдагдал:** AI шинэ session эхлэх бүрт өмнөх context
  мартдаг тул дахин тайлбарлах шаардлагатай болсон.
- **Over-engineering:** AI заримдaa хэт нарийн архитектур санал болгодог —
  жижиг төсөлд хэрэггүй abstraction layer нэмэхийг хүссэн.

---

## 6. Skill atrophy эрсдэлийг яаж зохицуулсан?

AI-гүйгээр өөрийн ойлголтыг шалгах хэд хэдэн арга хэмжээ авсан:

- **Кодыг уншиж ойлгох:** AI үүсгэсэн кодын мөр бүрийг уншиж,
  ойлгоогүй хэсгийг тайлбарлуулсан.
- **Гараар дахин бичих:** taskService.js-ийн зарим функцийг
  AI-гүйгээр дахин бичиж туршсан.
- **Debug өөрөө хийх:** Алдаа гарах бүрт эхлээд өөрөө шалгаж,
  дараа нь AI-аас асуусан.
- **Commit message өөрөө:** Бүх commit message-ийг өөрөө бичсэн —
  AI зөвхөн format санал болгосон.

Цаашид: AI байхгүй нөхцөлд Express + SQLite CRUD API өөрөө бичих
дасгал хийх шаардлагатай гэдгийг ойлгосон.

---

## Дүгнэлт

AI нь хурдан prototype, boilerplate, test үүсгэхэд маш үр дүнтэй.
Гэхдээ "verify, don't trust" зарчим чухал — AI үүсгэсэн бүх кодыг
шалгаж, ойлгож, баталгаажуулах хариуцлага хөгжүүлэгчид байна.
Энэ туршлага AI-г хэрэгсэл болгон ашиглах, түүнд бүрэн найдахгүй байх
тэнцвэрийг олоход тусалсан.
