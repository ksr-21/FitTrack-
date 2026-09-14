import React, { useState, useEffect } from 'react';
import api from '../api/client';

const PlanModal = ({ isOpen, onClose, member }) => {
  const [activeTab, setActiveTab] = useState('diet'); // 'diet' or 'workout'
  const [dietPlan, setDietPlan] = useState({ calories: '', meals: '[]', notes: '' });
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen && member) {
      const fetchPlans = async () => {
        setLoading(true);
        try {
          const [dietRes, workoutRes] = await Promise.all([
            api.get(`/plans/${member.id}/diet`),
            api.get(`/plans/${member.id}/workouts`)
          ]);
          setDietPlan(dietRes.data);
          setWorkoutPlan(workoutRes.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchPlans();
    }
  }, [isOpen, member]);

  if (!isOpen) return null;

  const handleDietChange = (e) => {
    const { name, value } = e.target;
    setDietPlan(prev => ({ ...prev, [name]: value }));
  };

  const handleWorkoutChange = (e) => {
    const value = e.target.value;
    try {
      // Just update it as a raw string temporarily while editing, then parse on save if it's valid JSON. 
      // But for simplicity, we'll store it as parsed if it's valid, else we'll keep the text state somewhere.
      // Actually, standardizing on text editing for workouts since it's an array of complex objects.
      setWorkoutText(value);
    } catch(err) {}
  };

  const [workoutText, setWorkoutText] = useState('');
  useEffect(() => {
    if (workoutPlan) {
      setWorkoutText(JSON.stringify(workoutPlan, null, 2));
    }
  }, [workoutPlan]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (activeTab === 'diet') {
        await api.put(`/plans/${member.id}/diet`, dietPlan);
      } else {
        const parsedWorkout = JSON.parse(workoutText);
        await api.put(`/plans/${member.id}/workouts`, parsedWorkout);
        setWorkoutPlan(parsedWorkout);
      }
      onClose();
    } catch (error) {
      alert('Failed to save. Make sure your JSON format is correct.');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-panel border border-hairline p-8 max-w-2xl w-full relative h-[80vh] flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted hover:text-white">&times;</button>
        <h2 className="text-2xl font-serif text-brass mb-2">Manage Plans: {member.name}</h2>
        
        <div className="flex space-x-6 border-b border-hairline mb-6">
          <button 
            className={`pb-2 text-sm uppercase tracking-widest ${activeTab === 'diet' ? 'text-brass border-b-2 border-brass' : 'text-muted hover:text-bone'}`}
            onClick={() => setActiveTab('diet')}
          >
            Diet Plan
          </button>
          <button 
            className={`pb-2 text-sm uppercase tracking-widest ${activeTab === 'workout' ? 'text-brass border-b-2 border-brass' : 'text-muted hover:text-bone'}`}
            onClick={() => setActiveTab('workout')}
          >
            Workout Plan
          </button>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center text-muted">Loading plans...</div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-2">
            {activeTab === 'diet' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted mb-1">Target Calories</label>
                  <input type="number" name="calories" value={dietPlan.calories} onChange={handleDietChange} className="w-full bg-ink border border-hairline text-bone px-3 py-2 text-sm focus:outline-none focus:border-brass" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted mb-1">Meals (JSON Array)</label>
                  <textarea name="meals" value={dietPlan.meals} onChange={handleDietChange} rows={6} className="w-full bg-ink border border-hairline text-bone px-3 py-2 text-sm font-mono focus:outline-none focus:border-brass" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted mb-1">Notes</label>
                  <textarea name="notes" value={dietPlan.notes} onChange={handleDietChange} rows={3} className="w-full bg-ink border border-hairline text-bone px-3 py-2 text-sm focus:outline-none focus:border-brass" />
                </div>
              </div>
            ) : (
              <div className="space-y-4 h-full flex flex-col">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted mb-1">Workout Routine (JSON Array)</label>
                  <p className="text-xs text-muted mb-2">Edit the raw JSON to update the workouts. Example format: <br/><code>[{'{"id": 1, "day": "Monday", "exercises": "[{\\"name\\":\\"Squat\\",\\"sets\\":\\"3\\",\\"reps\\":\\"10\\"}]"}'}]</code></p>
                </div>
                <textarea 
                  value={workoutText} 
                  onChange={handleWorkoutChange} 
                  className="flex-1 w-full bg-ink border border-hairline text-bone px-3 py-2 text-sm font-mono focus:outline-none focus:border-brass" 
                />
              </div>
            )}
          </div>
        )}

        <div className="pt-6 mt-auto flex justify-end space-x-3 border-t border-hairline">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-hairline text-xs uppercase tracking-widest text-muted hover:text-white">Cancel</button>
          <button type="button" onClick={handleSave} disabled={saving} className="px-4 py-2 bg-brass text-ink text-xs uppercase tracking-widest hover:bg-opacity-90 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanModal;
