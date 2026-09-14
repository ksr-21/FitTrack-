import React from 'react';
import { Calendar as CalendarIcon, Clock, Users, Plus } from 'lucide-react';

const ClassCard = ({ title, instructor, time, duration, participants, maxParticipants, colorClass }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors group">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-105 transition-transform`}>
        <CalendarIcon className="w-6 h-6 text-white" />
      </div>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
        Today
      </span>
    </div>
    
    <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
    <p className="text-sm text-slate-400 mb-4">with {instructor}</p>
    
    <div className="grid grid-cols-2 gap-3 mb-4">
      <div className="flex items-center space-x-2 text-slate-300 text-sm">
        <Clock className="w-4 h-4 text-slate-500" />
        <span>{time} ({duration})</span>
      </div>
      <div className="flex items-center space-x-2 text-slate-300 text-sm">
        <Users className="w-4 h-4 text-slate-500" />
        <span>{participants}/{maxParticipants}</span>
      </div>
    </div>
    
    <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2">
      <div 
        className={`h-1.5 rounded-full bg-gradient-to-r ${colorClass}`} 
        style={{ width: `${(participants / maxParticipants) * 100}%` }}
      ></div>
    </div>
    <div className="text-xs text-slate-500 text-right">
      {maxParticipants - participants} spots left
    </div>
  </div>
);

const Classes = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-slate-300">Upcoming Classes</h2>
        <button className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-primary-600 text-white hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/20 font-medium text-sm">
          <Plus className="w-4 h-4" />
          <span>New Class</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <ClassCard 
          title="HIIT Power" 
          instructor="Sarah Jenkins" 
          time="08:00 AM" 
          duration="45m" 
          participants={18} 
          maxParticipants={20}
          colorClass="from-rose-500 to-orange-500"
        />
        <ClassCard 
          title="Yoga Core" 
          instructor="David Chen" 
          time="10:00 AM" 
          duration="60m" 
          participants={12} 
          maxParticipants={15}
          colorClass="from-blue-500 to-cyan-500"
        />
        <ClassCard 
          title="CrossFit WOD" 
          instructor="Mike Roberts" 
          time="05:30 PM" 
          duration="60m" 
          participants={20} 
          maxParticipants={20}
          colorClass="from-primary-500 to-primary-600"
        />
        <ClassCard 
          title="Spinning" 
          instructor="Emma Watson" 
          time="07:00 PM" 
          duration="45m" 
          participants={10} 
          maxParticipants={25}
          colorClass="from-neon to-emerald-500"
        />
      </div>
    </div>
  );
};

export default Classes;
