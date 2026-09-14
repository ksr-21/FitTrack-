import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

const DashboardLayout = ({ title, children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-ink text-bone font-sans flex flex-col">
      <header className="border-b border-hairline py-4 px-8 flex justify-between items-center bg-panel sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-serif text-brass">{title}</h1>
          <p className="text-xs text-muted uppercase tracking-widest mt-1">
            Logged in as {user?.name} ({user?.role})
          </p>
        </div>
        <button 
          onClick={logout}
          className="flex items-center space-x-2 text-sm uppercase tracking-widest text-muted hover:text-brass transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </header>
      
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
