const request = require('supertest');
const app = require('./index');

describe('GET /', () => {
  it('returns a welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Jenkins practice API is running');
  });
});

describe('GET /health', () => {
  it('returns ok status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /tasks', () => {
  it('returns a list of tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('POST /tasks', () => {
  it('creates a new task', async () => {
    const res = await request(app).post('/tasks').send({ title: 'Add tests' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Add tests');
    expect(res.body.done).toBe(false);
  });

  it('rejects a task with no title', async () => {
    const res = await request(app).post('/tasks').send({});
    expect(res.statusCode).toBe(400);
  });
});

describe('PATCH /tasks/:id/done', () => {
  it('marks an existing task as done', async () => {
    const res = await request(app).patch('/tasks/1/done');
    expect(res.statusCode).toBe(200);
    expect(res.body.done).toBe(true);
  });

  it('404s for a missing task', async () => {
    const res = await request(app).patch('/tasks/999/done');
    expect(res.statusCode).toBe(404);
  });
});
