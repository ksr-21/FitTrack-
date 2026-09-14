const express = require('express');
const repository = require('../data/repository');

const router = express.Router();

router.get('/my-members', (req, res) => {
  const mentor = repository.getMentorByUserId(req.user.id);
  if (!mentor) return res.status(404).json({ error: 'Mentor not found' });
  res.json(repository.getMembersByMentorId(mentor.id));
});

module.exports = router;
