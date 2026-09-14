const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const repo = require('../data/repository');
const { JWT_SECRET } = require('../middleware/auth');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await repo.getUserByEmail(email);

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Check if password_hash is literally "password123" (legacy) or a real hash
  const isValid = user.password_hash === password || (user.password_hash.startsWith('$2a$') && bcrypt.compareSync(password, user.password_hash));

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // If user is a member, check and update expiry status
  if (user.role === 'member') {
    const member = await repo.getMemberByUserId(user.id);
    if (member) {
      const today = new Date().toISOString().split('T')[0];
      if (member.membership_end_date < today && member.status !== 'expired') {
        await repo.updateMemberStatus(member.id, 'expired');
      }
    }
  }

  const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

router.get('/me', async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await repo.getUserById(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token' });
  }
});

module.exports = router;
