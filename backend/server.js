const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const publicRoutes = require('./routes/public');
const membersRoutes = require('./routes/members');
const plansRoutes = require('./routes/plans');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/members', membersRoutes);
app.use('/api/plans', plansRoutes);

app.get('/', (req, res) => {
  res.send('FitTrack Gym API is running');
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
