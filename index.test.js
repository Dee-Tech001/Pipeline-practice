const request = require('supertest');
const app = require('./index');

describe('GET /', () => {
  it('returns a welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Jenkins Practice API');
  });
});

describe('GET /health', () => {
  it('returns ok status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /tasks', () => {
  it('returns a list of tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});

describe('POST /tasks', () => {
  it('creates a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual('Test Task');
  });

  it('rejects a task with no title', async () => {
    const res = await request(app).post('/tasks').send({});
    expect(res.statusCode).toEqual(400);
  });
});

describe('PATCH /tasks/:id/done', () => {
  it('marks an existing task as done', async () => {
    const res = await request(app).patch('/tasks/1/done');
    expect(res.statusCode).toEqual(200);
    expect(res.body.done).toEqual(true);
  });

  it('404s for a missing task', async () => {
    const res = await request(app).patch('/tasks/999/done');
    expect(res.statusCode).toEqual(404);
  });
});