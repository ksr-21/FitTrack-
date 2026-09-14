import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { motion } from 'framer-motion';

const About = () => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    api.get('/public/gym-info')
      .then(res => setInfo(res.data))
      .catch(err => {
        console.warn("Backend not reachable. Using fallback gym info.", err);
        setInfo({
          address: "123 Iron Avenue, Muscle City, MC 90210",
          timings: "Mon-Fri: 5am - 11pm | Sat-Sun: 6am - 8pm",
          contact: "hello@fittrack.demo | 555-0199",
          amenities: "Olympic lifting platforms, Turf zone, Sauna, Cold plunge"
        });
      });
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1469&auto=format&fit=crop" 
            alt="Gym Atmosphere" 
            className="w-full h-full object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/80 to-ink"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 max-w-4xl px-8"
        >
          <span className="text-brass uppercase tracking-[0.3em] text-xs font-bold mb-6 block border-b border-brass/30 pb-2 inline-block">The Foundation</span>
          <h1 className="text-5xl md:text-8xl font-serif text-bone mb-8 leading-none">Forged in <br/><span className="italic text-muted">Iron.</span></h1>
          <p className="text-muted text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            We strip away the noise. FitTrack is a sanctuary for those who understand that elite performance requires an uncompromising environment.
          </p>
        </motion.div>
      </section>

      {/* The Story & Values */}
      <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto w-full border-t border-hairline mt-[-1px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-serif text-bone">Our Ethos</h2>
            <p className="text-muted leading-relaxed font-light text-lg">
              FitTrack Gym was founded on a simple principle: serious training requires a serious space. 
              We don't offer gimmicks, juice bars, or neon lights. We offer world-class equipment, elite coaching, and a community of individuals dedicated to the pursuit of excellence.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-hairline">
              <div>
                <h4 className="text-brass font-serif text-xl mb-2">01. Discipline</h4>
                <p className="text-sm text-muted">Showing up when motivation fades.</p>
              </div>
              <div>
                <h4 className="text-brass font-serif text-xl mb-2">02. Integrity</h4>
                <p className="text-sm text-muted">Perfect form over inflated egos.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] w-full bg-panel border border-hairline p-4"
          >
            <img 
              src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop" 
              alt="Gym Detail" 
              className="w-full h-full object-cover grayscale opacity-80"
            />
            {/* Decorative Corner */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-brass z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* The Facility & Amenities */}
      <section className="py-32 px-8 md:px-16 bg-panel border-y border-hairline relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10">
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-serif text-brass mb-8">The Facility</h2>
            <p className="text-muted leading-relaxed font-light mb-12">
              Every piece of equipment has been hand-selected by competitive athletes. From calibrated plates to specialized recovery zones, we do not compromise on the quality of our tools.
            </p>
            <ul className="space-y-6 text-sm text-bone">
              {info.amenities?.split(',').map((amenity, i) => (
                <li key={i} className="flex items-center border-b border-hairline pb-4 group">
                  <span className="text-brass mr-6 group-hover:pl-2 transition-all duration-300">⏐</span> 
                  <span className="tracking-wide">{amenity.trim()}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-2 gap-4 h-[600px]">
            <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop" alt="Equipment 1" className="w-full h-full object-cover grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-500" />
            <div className="grid grid-rows-2 gap-4">
              <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600&auto=format&fit=crop" alt="Equipment 2" className="w-full h-full object-cover grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-500" />
              <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop" alt="Equipment 3" className="w-full h-full object-cover grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Logistics */}
      <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-bone">Operations</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-ink border border-hairline p-10 text-center flex flex-col items-center group"
          >
            <div className="w-12 h-12 rounded-full border border-brass flex items-center justify-center mb-6 group-hover:bg-brass transition-colors duration-300">
              <span className="text-brass group-hover:text-ink font-serif text-xl">L</span>
            </div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted mb-4">Location</h3>
            <p className="text-bone font-serif text-lg leading-relaxed">{info.address}</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-panel border border-hairline p-10 text-center flex flex-col items-center group"
          >
            <div className="w-12 h-12 rounded-full border border-brass flex items-center justify-center mb-6 group-hover:bg-brass transition-colors duration-300">
              <span className="text-brass group-hover:text-ink font-serif text-xl">H</span>
            </div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted mb-4">Hours</h3>
            <p className="text-bone font-serif text-lg leading-relaxed">
              {info.timings?.split('|').map((t, i) => <span key={i} className="block mb-2">{t.trim()}</span>)}
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-ink border border-hairline p-10 text-center flex flex-col items-center group"
          >
            <div className="w-12 h-12 rounded-full border border-brass flex items-center justify-center mb-6 group-hover:bg-brass transition-colors duration-300">
              <span className="text-brass group-hover:text-ink font-serif text-xl">C</span>
            </div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted mb-4">Contact</h3>
            <p className="text-bone font-serif text-lg leading-relaxed">
              {info.contact?.split('|').map((c, i) => <span key={i} className="block mb-2">{c.trim()}</span>)}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
