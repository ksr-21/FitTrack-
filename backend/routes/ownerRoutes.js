const express = require('express');
const repository = require('../data/repository');

const router = express.Router();

router.get('/members', (req, res) => {
  res.json(repository.getMembers());
});

router.get('/expired-members', (req, res) => {
  res.json(repository.getExpiredMembers());
});

router.delete('/members/:id', (req, res) => {
  repository.removeMember(req.params.id);
  res.json({ message: 'Member removed' });
});

router.get('/mentors', (req, res) => {
  res.json(repository.getMentors());
});

module.exports = router;
