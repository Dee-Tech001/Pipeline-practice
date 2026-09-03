const express = require('express');

const app = express();
app.use(express.json());

// In-memory "tasks" store, just enough logic to make tests meaningful
let tasks = [
  { id: 1, title: 'Set up Jenkins', done: true },
  { id: 2, title: 'Wire up Docker Hub push', done: false },
];

app.get('/', (req, res) => {
  res.json({ message: 'Jenkins practice API is running' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'title is required' });
  }
  const newTask = { id: tasks.length + 1, title, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.patch('/tasks/:id/done', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'task not found' });
  }
  task.done = true;
  res.status(200).json(task);
});

// Only start the server if run directly (not when imported by tests)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
