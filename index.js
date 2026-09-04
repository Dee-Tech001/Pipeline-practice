const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory tasks data
let tasks = [
  { id: 1, title: 'Set up Jenkins Pipeline', done: true },
  { id: 2, title: 'Push Docker Image to Hub', done: true },
  { id: 3, title: 'Add Visual Web Frontend', done: true }
];

// 1. Root Route - Visual Dashboard (HTML)
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Jenkins Practice Dashboard</title>
      <style>
        body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
        .card { background: #1e293b; padding: 2rem; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); max-width: 450px; width: 100%; text-align: center; border: 1px solid #334155; }
        h1 { color: #38bdf8; margin-bottom: 0.5rem; font-size: 1.5rem; }
        .status { display: inline-block; background: #22c55e; color: #052e16; font-weight: bold; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; margin-bottom: 1.5rem; }
        ul { list-style: none; padding: 0; text-align: left; }
        li { background: #334155; padding: 0.75rem; border-radius: 6px; margin-bottom: 0.5rem; display: flex; justify-content: space-between; font-size: 0.9rem; }
        .done { text-decoration: line-through; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🚀 Jenkins Practice API</h1>
        <div class="status">● System Operational</div>
        <h3>Live Tasks:</h3>
        <ul>
          ${tasks.map(t => `<li class="${t.done ? 'done' : ''}"><span>${t.title}</span><span>${t.done ? '✓' : '⏳'}</span></li>`).join('')}
        </ul>
      </div>
    </body>
    </html>
  `);
});

// 2. Health Endpoint (JSON)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 3. Get Tasks Endpoint (JSON)
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// 4. Create Task Endpoint (JSON)
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTask = { id: tasks.length + 1, title, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 5. Complete Task Endpoint (JSON)
app.patch('/tasks/:id/done', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  task.done = true;
  res.json(task);
});

// ONLY start listening if this file is run directly (node index.js)
// Prevents Jest from opening an unclosed server handle during tests
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;