const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const repository = require('../data/repository');
const { JWT_SECRET } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = repository.getUserByEmail(email);

  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password.' });
  }

  // Demo password 'password123'
  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid email or password.' });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
});

module.exports = router;
