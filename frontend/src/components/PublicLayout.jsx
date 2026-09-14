import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-ink text-bone flex flex-col font-sans">
      <header className="border-b border-hairline py-6 px-8 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight text-brass font-serif">FitTrack</Link>
        <nav className="hidden md:flex space-x-8 text-sm uppercase tracking-widest text-muted">
          <Link to="/" className="hover:text-brass transition-colors">Home</Link>
          <Link to="/about" className="hover:text-brass transition-colors">About</Link>
          <Link to="/trainers" className="hover:text-brass transition-colors">Trainers</Link>
        </nav>
        <Link 
          to="/login" 
          className="text-xs uppercase tracking-widest border border-hairline px-6 py-2.5 hover:bg-bone hover:text-ink transition-colors"
        >
          Member Portal
        </Link>
      </header>
      
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="border-t border-hairline bg-ink pt-20 pb-10 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <Link to="/" className="text-4xl font-bold tracking-tight text-brass font-serif block mb-6">FitTrack.</Link>
              <p className="text-muted text-sm leading-relaxed max-w-sm font-light">
                A premium boutique training club dedicated to holistic human performance. We build resilient bodies and disciplined minds.
              </p>
            </div>
            
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-bone mb-6 border-b border-hairline pb-2 inline-block">Navigation</h4>
              <ul className="space-y-4 text-sm text-muted">
                <li><Link to="/" className="hover:text-brass transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-brass transition-colors">The Club</Link></li>
                <li><Link to="/trainers" className="hover:text-brass transition-colors">Mentors</Link></li>
                <li><Link to="/login" className="hover:text-brass transition-colors">Member Portal</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-bone mb-6 border-b border-hairline pb-2 inline-block">Connect</h4>
              <ul className="space-y-4 text-sm text-muted">
                <li><a href="#" className="hover:text-brass transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-brass transition-colors">Twitter</a></li>
                <li className="pt-4 text-xs font-serif text-bone">hello@fittrack.demo</li>
                <li className="text-xs font-serif text-bone">123 Iron Avenue, MC 90210</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-hairline pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted">
            <p>&copy; 2026 FitTrack Gym. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-bone transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-bone transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
