const store = require('./store');
const { v4: uuidv4 } = require('uuid');

// Simulating async DB queries
const delay = (ms = 50) => new Promise(res => setTimeout(res, ms));

const repository = {
  // --- USER OPERATIONS ---
  async getUserByEmail(email) {
    await delay();
    return store.users.find(u => u.email === email);
  },
  
  async getUserById(id) {
    await delay();
    return store.users.find(u => u.id === id);
  },

  async createUser(userData) {
    await delay();
    const newUser = { id: uuidv4(), ...userData };
    store.users.push(newUser);
    return newUser;
  },

  async deleteUser(id) {
    await delay();
    store.users = store.users.filter(u => u.id !== id);
    return true;
  },

  // --- MEMBER OPERATIONS ---
  async getMemberByUserId(userId) {
    await delay();
    return store.members.find(m => m.user_id === userId);
  },

  async getAllMembers() {
    await delay();
    // Join with user data
    return store.members.map(m => {
      const user = store.users.find(u => u.id === m.user_id);
      const mentor = store.mentors.find(mt => mt.id === m.mentor_id);
      const mentorUser = mentor ? store.users.find(u => u.id === mentor.user_id) : null;
      
      return {
        ...m,
        name: user ? user.name : 'Unknown',
        email: user ? user.email : 'Unknown',
        phone: user ? user.phone : 'Unknown',
        mentor_name: mentorUser ? mentorUser.name : 'Unassigned'
      };
    });
  },

  async updateMemberStatus(memberId, status) {
    await delay();
    const member = store.members.find(m => m.id === memberId);
    if (member) member.status = status;
    return member;
  },

  async deleteMember(memberId) {
    await delay();
    const member = store.members.find(m => m.id === memberId);
    if (member) {
      store.members = store.members.filter(m => m.id !== memberId);
      // Clean up dependencies
      store.diet_plans = store.diet_plans.filter(dp => dp.member_id !== memberId);
      store.workout_routines = store.workout_routines.filter(wr => wr.member_id !== memberId);
      // Delete user
      store.users = store.users.filter(u => u.id !== member.user_id);
    }
    return true;
  },

  async assignMentor(memberId, mentorId) {
    await delay();
    const member = store.members.find(m => m.id === memberId);
    if (member) member.mentor_id = mentorId;
    return member;
  },

  // --- MENTOR OPERATIONS ---
  async getAllMentors() {
    await delay();
    return store.mentors.map(m => {
      const user = store.users.find(u => u.id === m.user_id);
      return {
        ...m,
        name: user ? user.name : 'Unknown',
        email: user ? user.email : 'Unknown',
        phone: user ? user.phone : 'Unknown'
      };
    });
  },

  async getMentorByUserId(userId) {
    await delay();
    return store.mentors.find(m => m.user_id === userId);
  },

  async getAssignedMembers(mentorId) {
    await delay();
    return store.members.filter(m => m.mentor_id === mentorId).map(m => {
      const user = store.users.find(u => u.id === m.user_id);
      return {
        ...m,
        name: user ? user.name : 'Unknown',
        email: user ? user.email : 'Unknown',
        phone: user ? user.phone : 'Unknown'
      };
    });
  },

  // --- PLANS & ROUTINES ---
  async getDietPlan(memberId) {
    await delay();
    return store.diet_plans.find(dp => dp.member_id === memberId);
  },

  async upsertDietPlan(memberId, planData) {
    await delay();
    let plan = store.diet_plans.find(dp => dp.member_id === memberId);
    if (plan) {
      Object.assign(plan, planData, { updated_at: new Date().toISOString() });
    } else {
      plan = { id: uuidv4(), member_id: memberId, ...planData, updated_at: new Date().toISOString() };
      store.diet_plans.push(plan);
    }
    return plan;
  },

  async getWorkoutRoutines(memberId) {
    await delay();
    return store.workout_routines.filter(wr => wr.member_id === memberId);
  },

  async addWorkoutRoutine(memberId, routineData) {
    await delay();
    const routine = { id: uuidv4(), member_id: memberId, ...routineData, updated_at: new Date().toISOString() };
    store.workout_routines.push(routine);
    return routine;
  },

  async deleteWorkoutRoutine(routineId) {
    await delay();
    store.workout_routines = store.workout_routines.filter(wr => wr.id !== routineId);
    return true;
  },

  // --- GYM INFO ---
  async getGymInfo() {
    await delay();
    return store.gym_info;
  },
  
  async updateGymInfo(info) {
    await delay();
    Object.assign(store.gym_info, info);
    return store.gym_info;
  }
};

module.exports = repository;
