const express = require('express');
const repository = require('../data/repository');

const router = express.Router();

router.get('/info', (req, res) => {
  res.json(repository.getGymInfo());
});

router.get('/trainers', (req, res) => {
  res.json(repository.getMentors());
});

module.exports = router;
