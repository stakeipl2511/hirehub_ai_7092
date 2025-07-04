import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Former VP of Engineering at Google with 15+ years in AI and machine learning. Passionate about using technology to solve real-world problems in recruitment and career development.",
      expertise: ["AI Strategy", "Product Vision", "Team Leadership"],
      social: {
        linkedin: "https://linkedin.com/in/sarahchen",
        twitter: "https://twitter.com/sarahchen"
      }
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "PhD in Computer Science from MIT, former Principal Engineer at Microsoft. Expert in natural language processing and recommendation systems with 20+ patents in AI technology.",
      expertise: ["Machine Learning", "System Architecture", "Data Science"],
      social: {
        linkedin: "https://linkedin.com/in/marcusrodriguez",
        github: "https://github.com/marcusrodriguez"
      }
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Head of Product",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Former Product Manager at LinkedIn with deep expertise in user experience design and product strategy. Led the development of LinkedIn\'s talent matching algorithms.",
      expertise: ["Product Strategy", "UX Design", "User Research"],
      social: {
        linkedin: "https://linkedin.com/in/emilywatson",
        twitter: "https://twitter.com/emilywatson"
      }
    },
    {
      id: 4,
      name: "David Kim",
      role: "Head of Engineering",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Senior Software Engineer with 12+ years at Amazon and Netflix. Specializes in scalable systems and has built platforms serving millions of users worldwide.",
      expertise: ["Full-Stack Development", "Cloud Architecture", "DevOps"],
      social: {
        linkedin: "https://linkedin.com/in/davidkim",
        github: "https://github.com/davidkim"
      }
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Head of HR & Culture",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      bio: "20+ years in human resources and organizational development. Former Director of People Operations at Spotify, passionate about creating inclusive workplace cultures.",
      expertise: ["Talent Acquisition", "Culture Building", "Diversity & Inclusion"],
      social: {
        linkedin: "https://linkedin.com/in/lisathompson",
        twitter: "https://twitter.com/lisathompson"
      }
    },
    {
      id: 6,
      name: "Alex Johnson",
      role: "Head of Marketing",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      bio: "Growth marketing expert with experience at Uber and Airbnb. Specializes in data-driven marketing strategies and building strong brand communities.",
      expertise: ["Growth Marketing", "Brand Strategy", "Community Building"],
      social: {
        linkedin: "https://linkedin.com/in/alexjohnson",
        twitter: "https://twitter.com/alexjohnson"
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Passionate professionals dedicated to transforming the future of recruitment through innovative AI solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="group"
            >
              <div className="glass-card p-6 hover-lift cursor-pointer transition-all duration-300 hover:shadow-glass-primary">
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-success rounded-full border-2 border-surface flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium text-sm">
                    {member.role}
                  </p>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                  {member.bio}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {member.expertise.slice(0, 2).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.expertise.length > 2 && (
                    <span className="px-2 py-1 bg-accent/10 text-accent-600 text-xs rounded-full">
                      +{member.expertise.length - 2} more
                    </span>
                  )}
                </div>

                <div className="flex justify-center space-x-3">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-primary/10 transition-colors duration-200"
                    >
                      <Icon name="Linkedin" size={16} className="text-primary" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-primary/10 transition-colors duration-200"
                    >
                      <Icon name="Twitter" size={16} className="text-primary" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-primary/10 transition-colors duration-200"
                    >
                      <Icon name="Github" size={16} className="text-primary" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;