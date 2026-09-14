import React, { useState, useEffect } from 'react';

const MemberModal = ({ isOpen, onClose, onSave, member, mentors }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'active',
    plan_type: 'Basic',
    mentor_name: '',
    membership_end_date: ''
  });

  useEffect(() => {
    if (member) {
      setFormData(member);
    } else {
      setFormData({
        name: '',
        email: '',
        status: 'active',
        plan_type: 'Basic',
        mentor_name: mentors.length > 0 ? mentors[0].name : '',
        membership_end_date: new Date().toISOString().split('T')[0]
      });
    }
  }, [member, mentors, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-panel border border-hairline p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted hover:text-white">&times;</button>
        <h2 className="text-2xl font-serif text-brass mb-6">{member ? 'Edit Member' : 'Add Member'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted mb-1">Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-ink border border-hairline text-bone px-3 py-2 text-sm focus:outline-none focus:border-brass" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted mb-1">Email</label>
            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-ink border border-hairline text-bone px-3 py-2 text-sm focus:outline-none focus:border-brass" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-ink border border-hairline text-bone px-3 py-2 text-sm focus:outline-none focus:border-brass">
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted mb-1">Plan Type</label>
              <select name="plan_type" value={formData.plan_type} onChange={handleChange} className="w-full bg-ink border border-hairline text-bone px-3 py-2 text-sm focus:outline-none focus:border-brass">
                <option value="Basic">Basic</option>
                <option value="Pro">Pro</option>
                <option value="Elite">Elite</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted mb-1">Mentor</label>
            <select name="mentor_name" value={formData.mentor_name} onChange={handleChange} className="w-full bg-ink border border-hairline text-bone px-3 py-2 text-sm focus:outline-none focus:border-brass">
              {mentors.map(m => (
                <option key={m.id} value={m.name}>{m.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted mb-1">End Date</label>
            <input required type="date" name="membership_end_date" value={formData.membership_end_date} onChange={handleChange} className="w-full bg-ink border border-hairline text-bone px-3 py-2 text-sm focus:outline-none focus:border-brass" />
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-hairline text-xs uppercase tracking-widest text-muted hover:text-white">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-brass text-ink text-xs uppercase tracking-widest hover:bg-opacity-90">{member ? 'Save Changes' : 'Add Member'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberModal;
