import React, { useState, useEffect } from 'react';

const MentorModal = ({ isOpen, onClose, onSave, mentor }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: 'Strength & Conditioning'
  });

  useEffect(() => {
    if (mentor) {
      setFormData(mentor);
    } else {
      setFormData({
        name: '',
        email: '',
        specialty: 'Strength & Conditioning'
      });
    }
  }, [mentor, isOpen]);

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
        <h2 className="text-2xl font-serif text-brass mb-6">{mentor ? 'Edit Mentor' : 'Add Mentor'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted mb-1">Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-ink border border-hairline text-bone px-3 py-2 text-sm focus:outline-none focus:border-brass" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted mb-1">Email</label>
            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-ink border border-hairline text-bone px-3 py-2 text-sm focus:outline-none focus:border-brass" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-muted mb-1">Specialty</label>
            <input required type="text" name="specialty" value={formData.specialty} onChange={handleChange} className="w-full bg-ink border border-hairline text-bone px-3 py-2 text-sm focus:outline-none focus:border-brass" placeholder="e.g. Strength & Conditioning" />
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-hairline text-xs uppercase tracking-widest text-muted hover:text-white">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-brass text-ink text-xs uppercase tracking-widest hover:bg-opacity-90">{mentor ? 'Save Changes' : 'Add Mentor'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorModal;
