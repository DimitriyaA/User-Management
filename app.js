const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Сервиране на статични файлове от папката "frontend"
app.use(express.static(path.join(__dirname, 'frontend')));

app.use(cors());
app.use(express.json());

// API рутове
app.use('/api/users', userRoutes);

// Основен рут за API, може да го оставиш или махнеш
app.get('/', (req, res) => {
  res.send('User Management API is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
