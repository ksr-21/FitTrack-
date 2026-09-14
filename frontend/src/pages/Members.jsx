import React from 'react';
import { Search, Filter, MoreVertical, Plus } from 'lucide-react';

const Members = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search members..." 
            className="w-full sm:w-80 bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-slate-500"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors font-medium text-sm">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-primary-600 text-white hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/20 font-medium text-sm">
            <Plus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500 text-sm">
              <th className="pb-3 font-medium">Member</th>
              <th className="pb-3 font-medium">Plan</th>
              <th className="pb-3 font-medium">Join Date</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors group">
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?img=${i+20}`} alt="avatar" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-200">John Doe {i}</div>
                      <div className="text-slate-500 text-xs">john.doe{i}@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-slate-400">Pro Membership</td>
                <td className="py-4 text-slate-400">Sep 12, 2026</td>
                <td className="py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neon/10 text-neon border border-neon/20">
                    Active
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
