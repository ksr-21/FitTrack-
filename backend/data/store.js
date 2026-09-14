// In-memory data store for FitTrack Gym
// Shaped like future DB tables

const store = {
  users: [
    { id: 'u1', name: 'Admin Owner', email: 'owner@demo.com', password_hash: 'password123', role: 'owner', phone: '555-0100' },
    { id: 'u2', name: 'Mentor Max', email: 'mentor@demo.com', password_hash: 'password123', role: 'mentor', phone: '555-0101' },
    { id: 'u6', name: 'Coach Sarah', email: 'sarah@demo.com', password_hash: 'password123', role: 'mentor', phone: '555-0106' },
    { id: 'u7', name: 'Dr. David', email: 'david@demo.com', password_hash: 'password123', role: 'mentor', phone: '555-0107' },
    { id: 'u3', name: 'Active Member', email: 'member@demo.com', password_hash: 'password123', role: 'member', phone: '555-0102' },
    { id: 'u4', name: 'Expired Member', email: 'expired@demo.com', password_hash: 'password123', role: 'member', phone: '555-0103' },
    { id: 'u5', name: 'Newbie Member', email: 'new@demo.com', password_hash: 'password123', role: 'member', phone: '555-0104' },
  ],
  members: [
    { id: 'm1', user_id: 'u3', mentor_id: 'mt1', join_date: '2026-01-15', plan_type: 'Pro', membership_end_date: '2026-12-31', status: 'active' },
    { id: 'm2', user_id: 'u4', mentor_id: 'mt1', join_date: '2025-06-01', plan_type: 'Basic', membership_end_date: '2026-06-01', status: 'expired' },
    { id: 'm3', user_id: 'u5', mentor_id: null, join_date: '2026-09-01', plan_type: 'Pro', membership_end_date: '2027-09-01', status: 'active' },
  ],
  mentors: [
    { id: 'mt1', user_id: 'u2', specialty: 'Strength & Conditioning', bio: 'Former competitive powerlifter with 10 years coaching experience.', credentials: JSON.stringify(['NSCA-CSCS', 'USA Weightlifting Level 2', 'B.S. Kinesiology']) },
    { id: 'mt2', user_id: 'u6', specialty: 'Hypertrophy & Mobility', bio: 'Expert in muscle isolation and joint longevity. Dedicated to injury prevention.', credentials: JSON.stringify(['ACSM Certified Physiologist', 'FMS Level 2', 'Precision Nutrition L1']) },
    { id: 'mt3', user_id: 'u7', specialty: 'Endurance & Biomechanics', bio: 'Triathlete and biomechanics researcher. Focuses on gait analysis and VO2 max training.', credentials: JSON.stringify(['Ph.D. Biomechanics', 'Ironman Certified Coach', 'NASM-PES']) },
  ],
  diet_plans: [
    { id: 'dp1', member_id: 'm1', meals: JSON.stringify([{ time: '8:00 AM', meal: 'Oatmeal & 4 Eggs' }, { time: '1:00 PM', meal: 'Chicken Breast & Rice' }]), calories: 2500, notes: 'High protein focus.', updated_at: '2026-09-10' },
  ],
  workout_routines: [
    { id: 'wr1', member_id: 'm1', day: 'Monday', exercises: JSON.stringify([{ name: 'Squats', sets: 4, reps: '8-10' }, { name: 'Leg Press', sets: 3, reps: 12 }]), notes: 'Focus on form.', updated_at: '2026-09-10' },
  ],
  gym_info: {
    id: 'g1',
    name: 'FitTrack Gym',
    address: '123 Iron Avenue, Muscle City, MC 90210',
    timings: 'Mon-Fri: 5am - 11pm | Sat-Sun: 6am - 8pm',
    contact: 'hello@fittrack.demo | 555-0199',
    amenities: 'Olympic lifting platforms, Turf zone, Sauna, Cold plunge'
  }
};

module.exports = store;
