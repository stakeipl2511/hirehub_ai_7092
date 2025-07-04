import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ValuesSection = () => {
  const values = [
    {
      id: 1,
      icon: "Heart",
      title: "Human-Centered AI",
      description: "We believe technology should enhance human potential, not replace it. Our AI solutions are designed to understand and amplify the unique qualities that make each person valuable."
    },
    {
      id: 2,
      icon: "Shield",
      title: "Privacy & Trust",
      description: "Your data is sacred. We implement industry-leading security measures and transparent practices to ensure your personal information remains protected and under your control."
    },
    {
      id: 3,
      icon: "Users",
      title: "Inclusive Opportunity",
      description: "We're committed to breaking down barriers in hiring. Our platform actively works to eliminate bias and create equal opportunities for all professionals, regardless of background."
    },
    {
      id: 4,
      icon: "Lightbulb",
      title: "Continuous Innovation",
      description: "The future of work is evolving rapidly. We stay ahead of trends, continuously improving our technology to meet the changing needs of job seekers and employers."
    },
    {
      id: 5,
      icon: "Target",
      title: "Results-Driven",
      description: "Success is measured by the meaningful connections we create. Every feature we build is designed to deliver tangible value and positive outcomes for our users."
    },
    {
      id: 6,
      icon: "Globe",
      title: "Global Impact",
      description: "We envision a world where geographical boundaries don't limit career opportunities. Our platform connects talent and opportunity across borders and cultures."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-accent-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            The principles that guide every decision we make and every feature we build.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {values.map((value) => (
            <motion.div
              key={value.id}
              variants={itemVariants}
              className="group"
            >
              <div className="glass-card p-8 h-full hover-lift transition-all duration-300 hover:shadow-glass-primary">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon 
                    name={value.icon} 
                    size={24} 
                    color="white" 
                    className="group-hover:animate-pulse"
                  />
                </div>
                
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-4 group-hover:text-primary transition-colors duration-300">
                  {value.title}
                </h3>
                
                <p className="text-text-secondary leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValuesSection;