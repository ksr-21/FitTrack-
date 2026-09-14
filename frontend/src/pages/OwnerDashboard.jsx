import React, { useState, useEffect } from 'react';
import api from '../api/client';
import DashboardLayout from '../components/DashboardLayout';
import MemberModal from '../components/MemberModal';
import MentorModal from '../components/MentorModal';
import PlanModal from '../components/PlanModal';

const OwnerDashboard = () => {
  const [members, setMembers] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState(null);

  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [managingMember, setManagingMember] = useState(null);

  const fetchData = async () => {
    try {
      const [membersRes, mentorsRes] = await Promise.all([
        api.get('/members'),
        api.get('/public/trainers')
      ]);
      setMembers(membersRes.data);
      setMentors(mentorsRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeMember = async (id) => {
    if (!window.confirm('Are you sure you want to remove this member?')) return;
    try {
      await api.delete(`/members/${id}`);
      fetchData();
    } catch (error) {
      console.error('Failed to remove member');
    }
  };

  const handleSaveMember = async (memberData) => {
    try {
      if (memberData.id) {
        await api.put(`/members/${memberData.id}`, memberData);
      } else {
        await api.post('/members', memberData);
      }
      setIsMemberModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Failed to save member', error);
    }
  };

  const handleSaveMentor = async (mentorData) => {
    try {
      if (mentorData.id) {
        await api.put(`/public/trainers/${mentorData.id}`, mentorData);
      } else {
        await api.post('/public/trainers', mentorData);
      }
      setIsMentorModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Failed to save mentor', error);
    }
  };

  if (loading) return <DashboardLayout title="Owner Portal">Loading...</DashboardLayout>;

  const activeMembers = members.filter(m => m.status === 'active');
  const expiredMembers = members.filter(m => m.status === 'expired');

  return (
    <DashboardLayout title="Owner Portal">
      <div className="space-y-12">
        {/* Expired Memberships Section */}
        <section>
          <h2 className="text-2xl font-serif text-brass mb-4 flex items-center">
            Expired Memberships 
            <span className="ml-3 bg-red-900/40 text-red-400 text-xs px-2 py-1 rounded-sm border border-red-500/20">
              {expiredMembers.length} Action Required
            </span>
          </h2>
          {expiredMembers.length === 0 ? (
            <p className="text-muted text-sm italic">No expired memberships.</p>
          ) : (
            <div className="bg-panel border border-hairline divide-y divide-hairline">
              {expiredMembers.map(m => (
                <div key={m.id} className="flex justify-between items-center p-4">
                  <div>
                    <p className="font-medium text-bone">{m.name}</p>
                    <p className="text-sm text-muted">{m.email} | {m.phone}</p>
                    <p className="text-xs text-red-400 mt-1 uppercase tracking-widest">Expired: {m.membership_end_date}</p>
                  </div>
                  <div className="space-x-3">
                    <button 
                      onClick={() => { setEditingMember(m); setIsMemberModalOpen(true); }}
                      className="text-xs uppercase tracking-widest text-muted hover:text-white transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => removeMember(m.id)}
                      className="text-xs uppercase tracking-widest border border-red-900/50 text-red-400 px-4 py-2 hover:bg-red-900/20 transition-colors"
                    >
                      Remove Member
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Active Members Section */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-2xl font-serif text-brass">Active Members</h2>
            <button 
              onClick={() => { setEditingMember(null); setIsMemberModalOpen(true); }}
              className="text-xs uppercase tracking-widest border border-brass text-brass px-4 py-2 hover:bg-brass hover:text-ink transition-colors"
            >
              + Add Member
            </button>
          </div>
          <div className="bg-panel border border-hairline overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-hairline text-muted text-xs uppercase tracking-widest">
                  <th className="p-4 font-normal">Name</th>
                  <th className="p-4 font-normal">Plan</th>
                  <th className="p-4 font-normal">End Date</th>
                  <th className="p-4 font-normal">Mentor</th>
                  <th className="p-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {activeMembers.map(m => (
                  <tr key={m.id} className="border-b border-hairline hover:bg-white/5 transition-colors">
                    <td className="p-4 text-bone">{m.name}</td>
                    <td className="p-4 text-muted">{m.plan_type}</td>
                    <td className="p-4 text-muted">{m.membership_end_date}</td>
                    <td className="p-4 text-muted">{m.mentor_name}</td>
                    <td className="p-4 text-right space-x-4">
                      <button 
                        onClick={() => { setEditingMember(m); setIsMemberModalOpen(true); }}
                        className="text-muted hover:text-white transition-colors text-xs uppercase tracking-widest"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => { setManagingMember(m); setIsPlanModalOpen(true); }}
                        className="text-brass hover:text-white transition-colors text-xs uppercase tracking-widest"
                      >
                        Manage Plans
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Mentors Section */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-2xl font-serif text-brass">Mentors</h2>
            <button 
              onClick={() => { setEditingMentor(null); setIsMentorModalOpen(true); }}
              className="text-xs uppercase tracking-widest border border-brass text-brass px-4 py-2 hover:bg-brass hover:text-ink transition-colors"
            >
              + Add Mentor
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map(mentor => (
              <div key={mentor.id} className="bg-panel border border-hairline p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif text-bone mb-1">{mentor.name}</h3>
                  <p className="text-xs text-brass uppercase tracking-widest mb-3">{mentor.specialty}</p>
                  <p className="text-sm text-muted">{mentor.email}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-hairline text-right">
                  <button 
                    onClick={() => { setEditingMentor(mentor); setIsMentorModalOpen(true); }}
                    className="text-xs uppercase tracking-widest text-muted hover:text-white transition-colors"
                  >
                    Edit Mentor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Modals */}
      <MemberModal 
        isOpen={isMemberModalOpen} 
        onClose={() => setIsMemberModalOpen(false)} 
        onSave={handleSaveMember} 
        member={editingMember}
        mentors={mentors}
      />
      
      <MentorModal 
        isOpen={isMentorModalOpen} 
        onClose={() => setIsMentorModalOpen(false)} 
        onSave={handleSaveMentor} 
        mentor={editingMentor}
      />
      
      <PlanModal 
        isOpen={isPlanModalOpen} 
        onClose={() => setIsPlanModalOpen(false)} 
        member={managingMember}
      />
    </DashboardLayout>
  );
};

export default OwnerDashboard;
