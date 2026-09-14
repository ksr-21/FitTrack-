import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { motion } from 'framer-motion';

const IMAGES = [
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1567598508481-65985588e295?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=800&auto=format&fit=crop"  
];

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    api.get('/public/trainers')
      .then(res => {
        const parsedTrainers = res.data.map(t => ({
          ...t,
          credentials: t.credentials ? JSON.parse(t.credentials) : []
        }));
        setTrainers(parsedTrainers);
      })
      .catch(err => {
        console.warn("Backend not reachable. Using fallback trainer data.", err);
        setTrainers([
          { id: 'mt1', name: 'Mike Trainer', specialty: 'Weightlifting', bio: 'Experienced weightlifting coach with 10 years of experience.' },
          { id: 'mt2', name: 'Coach Sarah', specialty: 'Hypertrophy & Mobility', bio: 'Expert in muscle isolation and joint longevity. Dedicated to injury prevention.' },
          { id: 'mt3', name: 'Dr. David', specialty: 'Endurance & Biomechanics', bio: 'Triathlete and biomechanics researcher. Focuses on gait analysis and VO2 max training.' },
          { id: 'mt4', name: 'Alex Vance', specialty: 'Calisthenics & Movement', bio: 'Master of bodyweight mechanics. Helps members achieve complete control over their physical form.' },
          { id: 'mt5', name: 'Elena Rostova', specialty: 'Olympic Weightlifting', bio: 'Former national competitor specializing in the snatch and clean & jerk. Demands technical perfection.' },
          { id: 'mt6', name: 'Marcus Thorne', specialty: 'Rehabilitation & Recovery', bio: 'Clinical specialist in sports injury rehabilitation. Ensures you stay healthy while pushing limits.' }
        ]);
      });
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-ink text-bone">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-8 md:px-16 text-center border-b border-hairline">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-brass uppercase tracking-[0.3em] text-xs font-bold mb-4 block border-b border-brass/30 pb-2 inline-block">The Faculty</span>
          <h1 className="text-4xl md:text-6xl font-serif text-bone mb-4 leading-none">Elite <span className="italic text-muted">Mentors.</span></h1>
          <p className="text-muted text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Our faculty consists of industry leaders, researchers, and competitive athletes. We do not hire trainers; we hire mentors who demand excellence.
          </p>
        </motion.div>
      </section>

      {/* Roster Grid */}
      <section className="py-16 px-8 md:px-16 max-w-[100rem] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {trainers.map((trainer, index) => (
            <motion.div 
              key={trainer.id} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (index % 3) * 0.2 }}
              className="group relative h-[600px] overflow-hidden bg-panel border border-hairline cursor-pointer"
            >
              <img 
                src={IMAGES[index % IMAGES.length]} 
                alt={trainer.name} 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />
              
              {/* Default State overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent flex flex-col justify-end p-8 group-hover:opacity-0 transition-opacity duration-500">
                <h3 className="text-3xl font-serif text-bone mb-2">{trainer.name}</h3>
                <p className="text-xs text-brass uppercase tracking-[0.2em]">{trainer.specialty}</p>
              </div>

              {/* Hover State overlay */}
              <div className="absolute inset-0 bg-ink/95 p-10 flex flex-col justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
                <h3 className="text-4xl font-serif text-brass mb-4">{trainer.name}</h3>
                <p className="text-xs text-bone uppercase tracking-[0.2em] mb-8 block border-b border-hairline pb-4">{trainer.specialty}</p>
                <p className="text-muted leading-relaxed font-light text-sm">
                  {trainer.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Trainers;
