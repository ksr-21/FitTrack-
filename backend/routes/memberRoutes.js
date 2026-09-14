const express = require('express');
const repository = require('../data/repository');

const router = express.Router();

router.get('/dashboard', (req, res) => {
  const member = repository.getMemberByUserId(req.user.id);
  if (!member) return res.status(404).json({ error: 'Member not found' });

  // Check expiration
  if (new Date(member.membership_end_date) < new Date()) {
    repository.updateMemberStatus(member.id, 'expired');
    member.status = 'expired';
  }

  if (member.status === 'expired') {
    return res.json({ 
      member, 
      diet_plan: null, 
      workout_routine: null, 
      message: 'Your membership has expired. Please contact the gym to renew.' 
    });
  }

  const diet_plan = repository.getDietPlanByMemberId(member.id);
  const workout_routine = repository.getWorkoutRoutineByMemberId(member.id);

  res.json({ member, diet_plan, workout_routine });
});

module.exports = router;
