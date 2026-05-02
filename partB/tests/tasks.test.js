const request = require('supertest');
const app = require('../src/server');

describe('Task API', () => {

  // CREATE tests
  test('POST /api/tasks — task үүсгэх', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test task', priority: 'high' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test task');
    expect(res.body.id).toBeDefined();
  });

  test('POST /api/tasks — title байхгүй бол алдаа', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ priority: 'high' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('POST /api/tasks — default priority medium байх', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'No priority task' });
    expect(res.statusCode).toBe(201);
    expect(res.body.priority).toBe('medium');
  });

  // READ tests
  test('GET /api/tasks — бүх task авах', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/tasks/:id — тодорхой task авах', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'Get by ID test' });
    const res = await request(app).get(`/api/tasks/${created.body.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(created.body.id);
  });

  test('GET /api/tasks/:id — байхгүй task 404', async () => {
    const res = await request(app).get('/api/tasks/99999');
    expect(res.statusCode).toBe(404);
  });

  // FILTER tests
  test('GET /api/tasks?priority=high — filter ажиллах', async () => {
    const res = await request(app).get('/api/tasks?priority=high');
    expect(res.statusCode).toBe(200);
    res.body.forEach(task => expect(task.priority).toBe('high'));
  });

  test('GET /api/tasks?search= — search ажиллах', async () => {
    await request(app).post('/api/tasks').send({ title: 'Searchable task' });
    const res = await request(app).get('/api/tasks?search=Searchable');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // UPDATE test
  test('PUT /api/tasks/:id — task шинэчлэх', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'Update me' });
    const res = await request(app)
      .put(`/api/tasks/${created.body.id}`)
      .send({ title: 'Updated', priority: 'low', completed: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated');
  });

  // DELETE test
  test('DELETE /api/tasks/:id — task устгах', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'Delete me' });
    const res = await request(app).delete(`/api/tasks/${created.body.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task deleted');
  });

});
