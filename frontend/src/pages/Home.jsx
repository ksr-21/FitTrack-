import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const Home = () => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" 
            alt="Gym Background" 
            className="w-full h-full object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center">
          <motion.div 
            className="w-full md:w-2/3"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span variants={fadeUp} className="text-brass uppercase tracking-[0.3em] text-xs font-bold mb-6 block">
              Elite Conditioning
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-8xl leading-[1.1] mb-8 font-serif">
              Strength in <br/><span className="italic text-brass/90">Stillness.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted text-lg md:text-xl max-w-lg leading-relaxed mb-12">
              A premium boutique training club dedicated to holistic human performance. We build resilient bodies and disciplined minds.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link 
                to="/login" 
                className="inline-block bg-brass text-ink px-10 py-5 uppercase tracking-[0.2em] text-sm font-medium hover:bg-bone transition-colors duration-300"
              >
                Join the Club
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-8 md:px-16 bg-panel border-y border-hairline">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-serif mb-8 text-brass"
          >
            The Iron Standard
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-muted leading-relaxed font-light"
          >
            "We believe that physical mastery is the prerequisite for mental clarity. 
            FitTrack provides an uncompromising environment for those who demand the best of themselves."
          </motion.p>
        </div>
      </section>

      {/* Programs Overview Section */}
      <section className="py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3 flex flex-col justify-center">
            <h2 className="text-4xl font-serif text-bone mb-6">Our Disciplines</h2>
            <p className="text-muted leading-relaxed mb-8">
              Whether you are an absolute beginner or a competitive athlete, our carefully structured programming ensures continuous progression and zero plateaus.
            </p>
            <Link to="/trainers" className="text-brass uppercase tracking-[0.2em] text-xs font-bold border-b border-brass pb-1 self-start hover:text-bone transition-colors">
              Meet the Mentors
            </Link>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { name: "Hypertrophy", desc: "Scientific approach to building lean muscle mass.", icon: "Ⅰ" },
              { name: "Strength", desc: "Powerlifting and heavy compound mastery.", icon: "Ⅱ" },
              { name: "Endurance", desc: "High-intensity interval training for stamina.", icon: "Ⅲ" },
              { name: "Mobility", desc: "Active recovery, yoga, and joint health.", icon: "Ⅳ" }
            ].map((program, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 border border-hairline bg-panel hover:bg-brass/5 transition-colors duration-300"
              >
                <div className="text-brass font-serif text-2xl mb-4">{program.icon}</div>
                <h3 className="text-xl font-serif text-bone mb-2">{program.name}</h3>
                <p className="text-sm text-muted">{program.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Preview */}
      <section className="py-24 px-8 md:px-16 bg-panel border-y border-hairline">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Olympic Lifting", img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop" },
            { title: "Recovery Sauna", img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop" },
            { title: "Turf Zone", img: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-pointer relative overflow-hidden h-[400px]"
            >
              <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent flex items-end p-8">
                <h3 className="text-2xl font-serif text-bone group-hover:text-brass transition-colors duration-300">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-8 md:px-16 bg-ink relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-panel opacity-50 transform translate-x-1/3 -skew-x-12 z-0"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 md:w-1/2">
            <span className="text-brass uppercase tracking-[0.2em] text-xs font-bold mb-4 block border-b border-brass/30 pb-2 inline-block">The Proof</span>
            <h2 className="text-4xl md:text-6xl font-serif text-bone leading-tight">Alumni <br/><span className="italic text-muted">Results.</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {[
              { 
                quote: "FitTrack didn't just change my body, it changed my entire mindset. The mentors demand excellence, and you learn to demand it of yourself.", 
                author: "James T.", 
                achievement: "Dropped 12% Body Fat"
              },
              { 
                quote: "The facility is unmatched. It's the only gym I've been to where everyone is there to put in serious work. The energy is contagious.", 
                author: "Sarah W.", 
                achievement: "Competitive Powerlifter"
              },
              { 
                quote: "Six months in the Pro Elite program completely transformed my life. Having a dedicated mentor analyzing my diet and lifts is worth every penny.", 
                author: "Marcus L.", 
                achievement: "Added 40lbs to Deadlift"
              }
            ].map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group relative"
              >
                {/* Large decorative quote mark */}
                <div className="absolute -top-10 -left-6 text-8xl font-serif text-brass/10 group-hover:text-brass/20 transition-colors duration-500 select-none z-0">
                  "
                </div>
                
                <div className="relative z-10 pt-4 border-t border-hairline group-hover:border-brass/50 transition-colors duration-500">
                  <p className="text-muted leading-relaxed mb-8 font-light text-lg">
                    {testimonial.quote}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-panel border border-hairline flex items-center justify-center text-brass font-serif text-xl">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-serif text-bone mb-1">{testimonial.author}</p>
                      <p className="text-xs uppercase tracking-[0.1em] text-brass">{testimonial.achievement}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section className="py-24 px-8 md:px-16 bg-panel border-t border-hairline">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-brass mb-4">Select Your Tier</h2>
            <p className="text-muted">Simple pricing. No hidden fees.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              whileHover={{ y: -5 }}
              className="border border-hairline p-10 flex flex-col bg-ink"
            >
              <h3 className="text-2xl font-serif text-bone mb-2">Standard</h3>
              <p className="text-brass text-3xl font-serif mb-8">$150<span className="text-sm text-muted font-sans font-light">/mo</span></p>
              <ul className="space-y-4 text-muted text-sm mb-12 flex-1">
                <li className="flex items-center">⏐ Full facility access</li>
                <li className="flex items-center">⏐ Group classes</li>
                <li className="flex items-center opacity-50">⏐ No personal mentor</li>
              </ul>
              <button className="w-full border border-hairline py-4 uppercase tracking-widest text-xs hover:bg-bone hover:text-ink transition-colors">
                Select Standard
              </button>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="border border-brass bg-brass/5 p-10 flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-brass border border-brass/30 px-2 py-1">Popular</div>
              <h3 className="text-2xl font-serif text-bone mb-2">Pro Elite</h3>
              <p className="text-brass text-3xl font-serif mb-8">$290<span className="text-sm text-muted font-sans font-light">/mo</span></p>
              <ul className="space-y-4 text-muted text-sm mb-12 flex-1">
                <li className="flex items-center text-bone">⏐ Full facility access</li>
                <li className="flex items-center text-bone">⏐ Unlimited classes</li>
                <li className="flex items-center text-brass font-medium">⏐ Dedicated Mentor</li>
                <li className="flex items-center text-brass font-medium">⏐ Custom Diet & Workout Plans</li>
              </ul>
              <button className="w-full bg-brass text-ink py-4 uppercase tracking-widest text-xs font-medium hover:bg-bone transition-colors">
                Select Pro
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
