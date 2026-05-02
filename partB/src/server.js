const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));
app.use('/api/tasks', taskRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
