import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent/10 rounded-full blur-lg"
          animate={{
            x: [-50, 20, -50],
            y: [-50, 30, -50],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient mb-6">
            About HireHub AI
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing recruitment through artificial intelligence, connecting talent with opportunity in ways never before possible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid md:grid-cols-2 gap-8 mt-12"
        >
          <div className="glass-card p-8 hover-lift">
            <h3 className="text-2xl font-heading font-semibold text-primary mb-4">
              Our Mission
            </h3>
            <p className="text-text-secondary leading-relaxed">
              To democratize access to career opportunities by leveraging AI technology that matches talent with the right roles, fostering professional growth and organizational success through intelligent recruitment solutions.
            </p>
          </div>
          
          <div className="glass-card p-8 hover-lift">
            <h3 className="text-2xl font-heading font-semibold text-primary mb-4">
              Our Vision
            </h3>
            <p className="text-text-secondary leading-relaxed">
              To create a world where every professional finds their ideal career path and every organization discovers the perfect talent, powered by ethical AI that understands human potential beyond traditional metrics.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;