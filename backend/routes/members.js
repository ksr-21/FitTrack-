const express = require('express');
const router = express.Router();
const repo = require('../data/repository');
const { authenticate, authorize } = require('../middleware/auth');

// Get all members (Owner only)
router.get('/', authenticate, authorize('owner'), async (req, res) => {
  const members = await repo.getAllMembers();
  
  // Also perform expiry check here just to be safe
  const today = new Date().toISOString().split('T')[0];
  let updated = false;
  for (const m of members) {
    if (m.membership_end_date < today && m.status !== 'expired') {
      await repo.updateMemberStatus(m.id, 'expired');
      m.status = 'expired';
      updated = true;
    }
  }
  
  res.json(members);
});

// Delete a member (Owner only)
router.delete('/:id', authenticate, authorize('owner'), async (req, res) => {
  const success = await repo.deleteMember(req.params.id);
  if (success) {
    res.json({ message: 'Member deleted successfully' });
  } else {
    res.status(404).json({ error: 'Member not found' });
  }
});

// Assign a mentor to a member (Owner only)
router.post('/:id/assign-mentor', authenticate, authorize('owner'), async (req, res) => {
  const { mentor_id } = req.body;
  const member = await repo.assignMentor(req.params.id, mentor_id);
  res.json(member);
});

// Get member details (Member can get own, Mentor can get assigned, Owner can get any)
router.get('/:id', authenticate, async (req, res) => {
  const member = await repo.getMemberByUserId(req.params.id) || await repo.getAllMembers().then(ms => ms.find(m => m.id === req.params.id));
  
  if (!member) return res.status(404).json({ error: 'Member not found' });

  if (req.user.role === 'member' && req.user.id !== member.user_id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (req.user.role === 'mentor' && member.mentor_id !== (await repo.getMentorByUserId(req.user.id)).id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  res.json(member);
});

// Mentor gets their assigned members
router.get('/mentor/assigned', authenticate, authorize('mentor'), async (req, res) => {
  const mentor = await repo.getMentorByUserId(req.user.id);
  if (!mentor) return res.status(404).json({ error: 'Mentor profile not found' });
  
  const members = await repo.getAssignedMembers(mentor.id);
  res.json(members);
});

module.exports = router;
