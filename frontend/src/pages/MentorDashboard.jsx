import React, { useState, useEffect } from 'react';
import api from '../api/client';
import DashboardLayout from '../components/DashboardLayout';

const MentorDashboard = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssigned = async () => {
      try {
        const res = await api.get('/members/mentor/assigned');
        setMembers(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssigned();
  }, []);

  if (loading) return <DashboardLayout title="Mentor Portal">Loading...</DashboardLayout>;

  return (
    <DashboardLayout title="Mentor Portal">
      <h2 className="text-2xl font-serif text-brass mb-6">Your Assigned Members</h2>
      {members.length === 0 ? (
        <p className="text-muted italic">You have no assigned members currently.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map(m => (
            <div key={m.id} className="bg-panel border border-hairline p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-serif text-bone">{m.name}</h3>
                  <span className={`text-xs px-2 py-1 uppercase tracking-widest border ${m.status === 'active' ? 'border-brass text-brass' : 'border-red-500/50 text-red-400'}`}>
                    {m.status}
                  </span>
                </div>
                <p className="text-sm text-muted mb-2">Email: {m.email}</p>
                <p className="text-sm text-muted mb-6">Plan: {m.plan_type}</p>
              </div>
              
              <div className="flex space-x-4 border-t border-hairline pt-4 mt-auto">
                <button 
                  className="flex-1 border border-hairline py-2 text-xs uppercase tracking-widest text-muted hover:bg-bone hover:text-ink transition-colors disabled:opacity-50"
                  disabled={m.status === 'expired'}
                >
                  Edit Diet
                </button>
                <button 
                  className="flex-1 border border-hairline py-2 text-xs uppercase tracking-widest text-muted hover:bg-bone hover:text-ink transition-colors disabled:opacity-50"
                  disabled={m.status === 'expired'}
                >
                  Edit Workout
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MentorDashboard;
