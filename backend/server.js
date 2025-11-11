require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const moodRoutes = require('./routes/moods');

const app = express();
app.use(express.json());

const allowedOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: allowedOrigin }));

// basic health
app.get('/', (req, res) => res.json({ ok: true }));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/moods', moodRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Mongo connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Mongo connection error', err);
  process.exit(1);
});
