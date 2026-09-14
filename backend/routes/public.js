const express = require('express');
const router = express.Router();
const repo = require('../data/repository');

// Public route to get gym info
router.get('/gym-info', async (req, res) => {
  const info = await repo.getGymInfo();
  res.json(info);
});

// Public route to get mentors
router.get('/trainers', async (req, res) => {
  const mentors = await repo.getAllMentors();
  res.json(mentors);
});

module.exports = router;
