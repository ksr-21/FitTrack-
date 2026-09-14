import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import PublicLayout from './components/PublicLayout';
import Home from './pages/Home';
import About from './pages/About';
import Trainers from './pages/Trainers';
import Login from './pages/Login';

import OwnerDashboard from './pages/OwnerDashboard';
import MentorDashboard from './pages/MentorDashboard';
import MemberDashboard from './pages/MemberDashboard';

// Protected Route wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="h-screen bg-ink text-brass flex items-center justify-center font-serif text-xl">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to their respective dashboard if they try to access wrong route
    if (user.role === 'owner') return <Navigate to="/owner" replace />;
    if (user.role === 'mentor') return <Navigate to="/mentor" replace />;
    return <Navigate to="/member" replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="trainers" element={<Trainers />} />
      </Route>
      
      <Route path="/login" element={<Login />} />

      <Route path="/owner/*" element={
        <ProtectedRoute allowedRoles={['owner']}>
          <OwnerDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/mentor/*" element={
        <ProtectedRoute allowedRoles={['mentor']}>
          <MentorDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/member/*" element={
        <ProtectedRoute allowedRoles={['member']}>
          <MemberDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
