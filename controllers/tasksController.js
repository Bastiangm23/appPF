let tasks = [];
let nextId = 1;

exports.getAll = (req, res) => {
  res.json(tasks);
};

exports.getById = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(task);
};

exports.create = (req, res) => {
  const task = { id: nextId++, title: req.body.title };
  tasks.push(task);
  res.status(201).json(task);
};

exports.update = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
  task.title = req.body.title;
  res.json(task);
};

exports.delete = (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Tarea no encontrada' });
  tasks.splice(index, 1);
  res.status(204).send();
};
