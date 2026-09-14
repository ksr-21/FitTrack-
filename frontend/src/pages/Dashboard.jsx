import React from 'react';
import { Activity, Users, CreditCard, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, colorClass }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClass} opacity-10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`} />
    <div className="flex items-center justify-between mb-4 relative z-10">
      <div className={`p-3 rounded-xl bg-slate-800 border border-slate-700`}>
        <Icon className={`w-6 h-6 text-slate-300`} />
      </div>
      <span className={`text-sm font-medium px-2 py-1 rounded-full ${change.startsWith('+') ? 'text-neon bg-neon/10' : 'text-rose-500 bg-rose-500/10'}`}>
        {change}
      </span>
    </div>
    <div className="relative z-10">
      <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
      <div className="text-3xl font-bold text-white">{value}</div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Members" 
          value="1,248" 
          change="+12% this month" 
          icon={Users} 
          colorClass="from-blue-500 to-cyan-500" 
        />
        <StatCard 
          title="Active Classes" 
          value="42" 
          change="+3 new" 
          icon={Activity} 
          colorClass="from-primary-500 to-primary-600" 
        />
        <StatCard 
          title="Monthly Revenue" 
          value="$48,250" 
          change="+8.4%" 
          icon={CreditCard} 
          colorClass="from-neon to-emerald-500" 
        />
        <StatCard 
          title="Retention Rate" 
          value="94%" 
          change="-1.2%" 
          icon={TrendingUp} 
          colorClass="from-rose-500 to-orange-500" 
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[400px]">
          <h3 className="text-xl font-bold text-white mb-4">Revenue Overview</h3>
          <div className="flex items-center justify-center h-64 border-2 border-dashed border-slate-800 rounded-xl">
            <span className="text-slate-500 font-medium">Chart visualization will go here</span>
          </div>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[400px]">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-slate-800/50 transition-colors cursor-pointer border border-transparent hover:border-slate-700/50">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">New member joined</p>
                  <p className="text-xs text-slate-500">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
