import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Initialize Mock Data in LocalStorage
const initMockDB = () => {
  if (!localStorage.getItem('mockDB_members')) {
    localStorage.setItem('mockDB_members', JSON.stringify([
      { id: 3, name: 'Member Demo', email: 'member@demo.com', status: 'active', plan_type: 'Pro', mentor_name: 'Mentor Demo', membership_end_date: '2025-01-01' },
      { id: 4, name: 'Expired Demo', email: 'expired@demo.com', status: 'expired', plan_type: 'Basic', mentor_name: 'Mentor Demo', membership_end_date: '2023-01-01' }
    ]));
  }
  if (!localStorage.getItem('mockDB_mentors')) {
    localStorage.setItem('mockDB_mentors', JSON.stringify([
      { id: 2, name: 'Mentor Demo', email: 'mentor@demo.com', specialty: 'Strength' }
    ]));
  }
  if (!localStorage.getItem('mockDB_diets')) {
    localStorage.setItem('mockDB_diets', JSON.stringify({}));
  }
  if (!localStorage.getItem('mockDB_workouts')) {
    localStorage.setItem('mockDB_workouts', JSON.stringify({}));
  }
};
initMockDB();

const getDB = (key) => JSON.parse(localStorage.getItem(key));
const setDB = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// Mock backend responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config.url;
    const method = error.config.method.toLowerCase();
    const data = error.config.data ? JSON.parse(error.config.data) : null;
    
    // --- MENTORS (public/trainers) ---
    if (url === '/public/trainers') {
      const mentors = getDB('mockDB_mentors');
      if (method === 'get') return Promise.resolve({ data: mentors });
      if (method === 'post') {
        const newMentor = { ...data, id: Date.now() };
        setDB('mockDB_mentors', [...mentors, newMentor]);
        return Promise.resolve({ data: newMentor });
      }
    }
    if (url.startsWith('/public/trainers/')) {
      const id = parseInt(url.split('/').pop());
      const mentors = getDB('mockDB_mentors');
      if (method === 'put') {
        const updatedMentors = mentors.map(m => m.id === id ? { ...m, ...data } : m);
        setDB('mockDB_mentors', updatedMentors);
        return Promise.resolve({ data: updatedMentors.find(m => m.id === id) });
      }
    }

    // --- MEMBERS ---
    if (url === '/members') {
      const members = getDB('mockDB_members');
      if (method === 'get') return Promise.resolve({ data: members });
      if (method === 'post') {
        const newMember = { ...data, id: Date.now(), status: data.status || 'active' };
        setDB('mockDB_members', [...members, newMember]);
        return Promise.resolve({ data: newMember });
      }
    }
    
    if (url === '/members/mentor/assigned') {
      const members = getDB('mockDB_members');
      // Just returning all members as assigned for demo purposes
      return Promise.resolve({ data: members });
    }

    if (url.startsWith('/members/') && url !== '/members/mentor/assigned') {
      const id = parseInt(url.split('/').pop());
      const members = getDB('mockDB_members');
      
      if (method === 'get') {
        const member = members.find(m => m.id === id);
        return member ? Promise.resolve({ data: member }) : Promise.reject(error);
      }
      if (method === 'put') {
        const updatedMembers = members.map(m => m.id === id ? { ...m, ...data } : m);
        setDB('mockDB_members', updatedMembers);
        return Promise.resolve({ data: updatedMembers.find(m => m.id === id) });
      }
      if (method === 'delete') {
        setDB('mockDB_members', members.filter(m => m.id !== id));
        return Promise.resolve({ data: { success: true } });
      }
    }

    // --- DIET PLANS ---
    if (url.includes('/diet')) {
      const id = url.split('/')[2];
      const diets = getDB('mockDB_diets');
      if (method === 'get') {
        const defaultDiet = { calories: 2500, meals: '[{"time":"8 AM","meal":"Oats"},{"time":"1 PM","meal":"Chicken & Rice"}]', notes: 'Drink water' };
        return Promise.resolve({ data: diets[id] || defaultDiet });
      }
      if (method === 'put') {
        diets[id] = data;
        setDB('mockDB_diets', diets);
        return Promise.resolve({ data: diets[id] });
      }
    }

    // --- WORKOUT PLANS ---
    if (url.includes('/workouts')) {
      const id = url.split('/')[2];
      const workouts = getDB('mockDB_workouts');
      if (method === 'get') {
        const defaultWorkout = [{ id: 1, day: 'Monday', exercises: '[{"name":"Bench Press","sets":"3","reps":"10"}]' }];
        return Promise.resolve({ data: workouts[id] || defaultWorkout });
      }
      if (method === 'put') {
        workouts[id] = data;
        setDB('mockDB_workouts', workouts);
        return Promise.resolve({ data: workouts[id] });
      }
    }

    return Promise.reject(error);
  }
);

export default api;
