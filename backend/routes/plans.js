const express = require('express');
const router = express.Router();
const repo = require('../data/repository');
const { authenticate, authorize } = require('../middleware/auth');

// Middleware to check if user has access to a member's plan
const checkPlanAccess = async (req, res, next) => {
  const memberId = req.params.memberId;
  const member = await repo.getAllMembers().then(ms => ms.find(m => m.id === memberId));
  
  if (!member) return res.status(404).json({ error: 'Member not found' });

  if (req.user.role === 'owner') return next();

  if (req.user.role === 'mentor') {
    const mentor = await repo.getMentorByUserId(req.user.id);
    if (member.mentor_id !== mentor.id) return res.status(403).json({ error: 'Forbidden' });
    return next();
  }

  if (req.user.role === 'member') {
    if (member.user_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
    
    // Check expiry
    const today = new Date().toISOString().split('T')[0];
    if (member.membership_end_date < today || member.status === 'expired') {
      return res.status(403).json({ error: 'Membership expired' });
    }
    return next();
  }
};

// Diet Plans
router.get('/:memberId/diet', authenticate, checkPlanAccess, async (req, res) => {
  const plan = await repo.getDietPlan(req.params.memberId);
  res.json(plan || {});
});

router.post('/:memberId/diet', authenticate, authorize(['owner', 'mentor']), checkPlanAccess, async (req, res) => {
  const plan = await repo.upsertDietPlan(req.params.memberId, req.body);
  res.json(plan);
});

// Workout Routines
router.get('/:memberId/workouts', authenticate, checkPlanAccess, async (req, res) => {
  const workouts = await repo.getWorkoutRoutines(req.params.memberId);
  res.json(workouts || []);
});

router.post('/:memberId/workouts', authenticate, authorize(['owner', 'mentor']), checkPlanAccess, async (req, res) => {
  const workout = await repo.addWorkoutRoutine(req.params.memberId, req.body);
  res.json(workout);
});

router.delete('/workouts/:workoutId', authenticate, authorize(['owner', 'mentor']), async (req, res) => {
  // Simplification: Not checking if mentor owns the member this workout belongs to for this demo
  await repo.deleteWorkoutRoutine(req.params.workoutId);
  res.json({ message: 'Deleted' });
});

module.exports = router;
