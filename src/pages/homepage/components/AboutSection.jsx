import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AboutSection = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      id: 1,
      name: "Alex Thompson",
      role: "CEO & Co-Founder",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      expertise: "AI & Machine Learning"
    },
    {
      id: 2,
      name: "Maria Garcia",
      role: "CTO & Co-Founder",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      expertise: "Product Development"
    },
    {
      id: 3,
      name: "James Wilson",
      role: "Head of AI Research",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      expertise: "Data Science"
    },
    {
      id: 4,
      name: "Sophie Chen",
      role: "VP of Design",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      expertise: "User Experience"
    }
  ];

  const values = [
    {
      icon: 'Target',
      title: 'Innovation',
      description: 'Pushing the boundaries of AI technology to create smarter career solutions.'
    },
    {
      icon: 'Users',
      title: 'Inclusivity',
      description: 'Building a platform that serves everyone, regardless of background or experience.'
    },
    {
      icon: 'Shield',
      title: 'Trust',
      description: 'Maintaining the highest standards of privacy, security, and ethical AI practices.'
    },
    {
      icon: 'Zap',
      title: 'Impact',
      description: 'Creating meaningful connections that transform careers and build stronger teams.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Statement */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary mb-6">
            Revolutionizing Career Connections
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg text-text-secondary leading-relaxed">
              At HireHub AI, we believe that finding the right career opportunity or the perfect candidate shouldn't be left to chance. Our mission is to harness the power of artificial intelligence to create meaningful connections that transform careers and build stronger organizations.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              We're not just another job board – we're your intelligent career partner, providing personalized guidance, skill development, and data-driven insights to help you achieve your professional goals.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <div
              key={index}
              className="glass-card p-6 text-center hover-lift transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glass-primary">
                <Icon name={value.icon} size={24} color="white" />
              </div>
              <h3 className="text-lg font-heading font-bold text-text-primary mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Team Preview */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary mb-4">
              Meet Our Team
            </h3>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Passionate professionals dedicated to transforming the future of work through innovative technology and human-centered design.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="glass-card p-6 text-center hover-lift hover-glow transition-all duration-300 group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative inline-block mb-4">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white/20 shadow-glass-primary group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-surface flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" />
                  </div>
                </div>
                <h4 className="text-lg font-heading font-bold text-text-primary mb-1">
                  {member.name}
                </h4>
                <p className="text-sm text-primary font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-xs text-text-secondary">
                  {member.expertise}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="glass-card p-8 lg:p-12 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Years of Innovation', value: '5+', icon: 'Calendar' },
              { label: 'AI Models Trained', value: '50+', icon: 'Brain' },
              { label: 'Success Stories', value: '10K+', icon: 'Award' },
              { label: 'Global Reach', value: '25+', icon: 'Globe', suffix: 'Countries' }
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="flex justify-center">
                  <Icon name={stat.icon} size={32} className="text-primary" />
                </div>
                <div className="text-3xl font-bold text-text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-text-secondary">
                  {stat.label}
                  {stat.suffix && <span className="block text-xs">{stat.suffix}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-heading font-bold text-text-primary mb-4">
            Ready to Transform Your Career Journey?
          </h3>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already discovered the power of AI-driven career development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/authentication-portal')}
              iconName="Rocket"
              iconPosition="right"
              className="hover-lift"
            >
              Get Started Today
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/about-contact')}
              iconName="MessageCircle"
              iconPosition="left"
              className="hover-lift"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;