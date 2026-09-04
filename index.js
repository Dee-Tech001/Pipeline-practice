const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory tasks store
let tasks = [
  { id: 1, title: 'Set up Jenkins Pipeline', done: true },
  { id: 2, title: 'Push Docker Image to Hub', done: true },
  { id: 3, title: 'Add Visual Web Frontend', done: false }
];

// 1. Serve HTML Webpage at Root (/)
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

// 3. API Endpoints (JSON)
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
