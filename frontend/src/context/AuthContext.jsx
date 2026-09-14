import React, { createContext, useState, useEffect, useContext } from 'react';
// import api from '../api/client'; // Disabled for frontend-only mode

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const MOCK_USERS = {
  'owner@demo.com': { id: 1, email: 'owner@demo.com', role: 'owner', name: 'Owner Demo' },
  'mentor@demo.com': { id: 2, email: 'mentor@demo.com', role: 'mentor', name: 'Mentor Demo' },
  'member@demo.com': { id: 3, email: 'member@demo.com', role: 'member', name: 'Member Demo' },
  'expired@demo.com': { id: 4, email: 'expired@demo.com', role: 'member', name: 'Expired Demo', status: 'expired' }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const storedMockUser = localStorage.getItem('mockUser');
      if (token && storedMockUser) {
        try {
          // const res = await api.get('/auth/me');
          setUser(JSON.parse(storedMockUser));
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('mockUser');
        }
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('mockUser');
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    // const res = await api.post('/auth/login', { email, password });
    
    // Frontend only mock login
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const cleanEmail = email?.trim().toLowerCase();
        const cleanPassword = password?.trim();

        if (cleanPassword !== 'password123') {
          return reject({ response: { data: { error: 'Invalid email or password.' } } });
        }
        
        const mockUser = MOCK_USERS[cleanEmail];
        if (!mockUser) {
          return reject({ response: { data: { error: 'Invalid email or password.' } } });
        }

        const mockToken = `mock_token_${mockUser.id}`;
        localStorage.setItem('token', mockToken);
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
        setUser(mockUser);
        resolve(mockUser);
      }, 500); // simulate network delay
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('mockUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
