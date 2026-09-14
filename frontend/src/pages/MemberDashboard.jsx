import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';

const MemberDashboard = () => {
  const { user } = useAuth();
  const [memberInfo, setMemberInfo] = useState(null);
  const [diet, setDiet] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const memberRes = await api.get(`/members/${user.id}`);
        const mInfo = memberRes.data;
        setMemberInfo(mInfo);

        if (mInfo.status === 'active') {
          const [dietRes, workoutRes] = await Promise.all([
            api.get(`/plans/${mInfo.id}/diet`),
            api.get(`/plans/${mInfo.id}/workouts`)
          ]);
          setDiet(dietRes.data);
          setWorkouts(workoutRes.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMemberData();
  }, [user.id]);

  if (loading) return <DashboardLayout title="Member Portal">Loading...</DashboardLayout>;

  if (!memberInfo) return <DashboardLayout title="Member Portal">Member data not found.</DashboardLayout>;

  // Check for expired membership
  if (memberInfo.status === 'expired') {
    return (
      <DashboardLayout title="Member Portal">
        <div className="bg-red-900/10 border border-red-500/20 p-8 text-center max-w-2xl mx-auto mt-12">
          <h2 className="text-2xl font-serif text-red-400 mb-4">Membership Expired</h2>
          <p className="text-muted mb-6">
            Your membership ended on {memberInfo.membership_end_date}. 
            Please contact the gym to renew your subscription and regain access to your training plans.
          </p>
          <a href="mailto:hello@fittrack.demo" className="inline-block border border-hairline px-6 py-2 text-xs uppercase tracking-widest hover:bg-bone hover:text-ink transition-colors">
            Contact Support
          </a>
        </div>
      </DashboardLayout>
    );
  }

  // Active Member View
  return (
    <DashboardLayout title="Member Portal">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Personal Info & Diet */}
        <div className="lg:col-span-1 space-y-12">
          <section>
            <h3 className="text-xs uppercase tracking-widest text-muted mb-4 border-b border-hairline pb-2">Status</h3>
            <p className="text-sm mb-1"><span className="text-muted">Plan:</span> {memberInfo.plan_type}</p>
            <p className="text-sm mb-1"><span className="text-muted">Mentor:</span> {memberInfo.mentor_name}</p>
            <p className="text-sm"><span className="text-muted">Valid until:</span> {memberInfo.membership_end_date}</p>
          </section>

          <section>
            <h3 className="text-xs uppercase tracking-widest text-muted mb-4 border-b border-hairline pb-2">Diet Plan</h3>
            {diet && diet.meals ? (
              <div className="bg-panel border border-hairline p-6">
                <div className="flex justify-between items-end mb-4 border-b border-hairline pb-4">
                  <span className="text-brass font-serif text-2xl">{diet.calories} kcal</span>
                </div>
                <div className="space-y-4">
                  {JSON.parse(diet.meals).map((m, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-xs text-brass uppercase tracking-widest mb-1">{m.time}</span>
                      <span className="text-sm text-bone">{m.meal}</span>
                    </div>
                  ))}
                </div>
                {diet.notes && (
                  <p className="mt-6 text-xs text-muted italic border-t border-hairline pt-4">
                    Notes: {diet.notes}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-muted text-sm italic">No diet plan assigned yet.</p>
            )}
          </section>
        </div>

        {/* Right Column: Workouts */}
        <div className="lg:col-span-2">
          <h3 className="text-xs uppercase tracking-widest text-muted mb-4 border-b border-hairline pb-2">Training Routine</h3>
          {workouts.length === 0 ? (
            <p className="text-muted text-sm italic">No routines assigned yet.</p>
          ) : (
            <div className="space-y-6">
              {workouts.map(w => (
                <div key={w.id} className="bg-panel border border-hairline p-6">
                  <h4 className="text-xl font-serif text-brass mb-6">{w.day}</h4>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-xs uppercase tracking-widest text-muted border-b border-hairline">
                        <th className="pb-3 font-normal">Exercise</th>
                        <th className="pb-3 font-normal">Sets</th>
                        <th className="pb-3 font-normal">Reps</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {JSON.parse(w.exercises).map((ex, i) => (
                        <tr key={i} className="border-b border-hairline/50 last:border-0">
                          <td className="py-3 text-bone">{ex.name}</td>
                          <td className="py-3 text-muted">{ex.sets}</td>
                          <td className="py-3 text-muted">{ex.reps}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {w.notes && (
                    <p className="mt-4 text-xs text-muted italic">Notes: {w.notes}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MemberDashboard;
