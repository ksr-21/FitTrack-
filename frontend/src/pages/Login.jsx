import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      if (user.role === 'owner') navigate('/owner');
      else if (user.role === 'mentor') navigate('/mentor');
      else navigate('/member');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-panel border border-hairline rounded-sm p-8">
        <h1 className="text-3xl text-bone mb-2">Sign In</h1>
        <p className="text-muted mb-8 text-sm">Access your FitTrack dashboard</p>
        
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-sm mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-muted mb-1 uppercase tracking-wider text-xs">Email</label>
            <input 
              type="email" 
              className="w-full bg-ink border border-hairline text-bone px-4 py-3 rounded-sm focus:outline-none focus:border-brass transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="member@demo.com"
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1 uppercase tracking-wider text-xs">Password</label>
            <input 
              type="password" 
              className="w-full bg-ink border border-hairline text-bone px-4 py-3 rounded-sm focus:outline-none focus:border-brass transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="password123"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-brass text-ink font-medium px-4 py-3 rounded-sm hover:bg-opacity-90 transition-opacity uppercase tracking-wider text-sm mt-4"
          >
            Enter Portal
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-hairline text-center">
          <p className="text-muted text-xs">
            Demo Accounts (pwd: password123):<br/>
            owner@demo.com | mentor@demo.com<br/>
            member@demo.com | expired@demo.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
