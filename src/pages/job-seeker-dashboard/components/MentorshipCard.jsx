import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MentorshipCard = ({ onNavigate }) => {
  const [currentMentor, setCurrentMentor] = useState(null);

  const suggestedMentors = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Frontend Architect",
      company: "Google",
      experience: "8+ years",
      expertise: ["React", "TypeScript", "System Design", "Team Leadership"],
      rating: 4.9,
      sessions: 127,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Passionate about helping developers grow their careers in frontend development and system architecture.",
      availability: "Available",
      matchScore: 95,
      price: "$80/hour"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Full Stack Engineering Manager",
      company: "Microsoft",
      experience: "10+ years",
      expertise: ["Node.js", "React", "Cloud Architecture", "Career Growth"],
      rating: 4.8,
      sessions: 89,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Helping engineers transition into leadership roles and build scalable applications.",
      availability: "Available",
      matchScore: 88,
      price: "$90/hour"
    },
    {
      id: 3,
      name: "Emily Johnson",
      title: "Product Engineering Lead",
      company: "Stripe",
      experience: "7+ years",
      expertise: ["Product Development", "React", "API Design", "Mentoring"],
      rating: 4.9,
      sessions: 156,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Focused on product-driven development and helping engineers understand business impact.",
      availability: "Busy",
      matchScore: 92,
      price: "$75/hour"
    }
  ];

  const currentMentorData = {
    id: 1,
    name: "David Kim",
    title: "Senior Software Engineer",
    company: "Netflix",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    nextSession: "Jan 28, 2024 at 2:00 PM",
    totalSessions: 8,
    progress: 75,
    currentGoal: "Prepare for senior developer interviews",
    expertise: ["System Design", "Interview Prep", "Career Growth"]
  };

  const mentorshipStats = {
    totalSessions: 12,
    hoursSpent: 18,
    goalsAchieved: 3,
    skillsImproved: 7
  };

  const upcomingSessions = [
    {
      id: 1,
      mentor: "David Kim",
      topic: "System Design Interview Prep",
      date: "Jan 28, 2024",
      time: "2:00 PM - 3:00 PM",
      type: "Video Call"
    },
    {
      id: 2,
      mentor: "Sarah Chen",
      topic: "React Performance Optimization",
      date: "Jan 30, 2024",
      time: "4:00 PM - 5:00 PM",
      type: "Screen Share"
    }
  ];

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Available': return 'text-success bg-success/10';
      case 'Busy': return 'text-warning bg-warning/10';
      case 'Offline': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-surface';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Mentorship
        </h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Users"
          iconPosition="left"
          onClick={() => onNavigate('/mentorship')}
        >
          Find Mentors
        </Button>
      </div>

      {/* Current Mentor */}
      {currentMentor || currentMentorData ? (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-semibold text-text-primary">
              Current Mentor
            </h4>
            <Button
              variant="ghost"
              size="sm"
              iconName="MessageCircle"
              onClick={() => onNavigate(`/mentor-chat/${currentMentorData.id}`)}
            >
              Message
            </Button>
          </div>

          <div className="flex items-start gap-4 mb-4">
            <div className="relative">
              <Image
                src={currentMentorData.avatar}
                alt={currentMentorData.name}
                className="w-16 h-16 rounded-2xl object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-surface"></div>
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="text-base font-semibold text-text-primary mb-1">
                {currentMentorData.name}
              </h5>
              <p className="text-sm text-text-secondary mb-2">
                {currentMentorData.title} at {currentMentorData.company}
              </p>
              <div className="flex flex-wrap gap-2">
                {currentMentorData.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Current Goal:</span>
              <span className="text-text-primary font-medium">
                {currentMentorData.currentGoal}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Progress:</span>
              <span className="text-primary font-bold">
                {currentMentorData.progress}%
              </span>
            </div>

            <div className="w-full bg-background-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${currentMentorData.progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Next Session:</span>
              <span className="text-text-primary font-medium">
                {currentMentorData.nextSession}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Suggested Mentors */
        <div className="space-y-4">
          <h4 className="text-base font-semibold text-text-primary">
            Suggested Mentors
          </h4>
          
          {suggestedMentors.slice(0, 2).map((mentor) => (
            <div
              key={mentor.id}
              className="glass-card p-6 hover-lift transition-all duration-300 hover:shadow-glow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <Image
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-2xl object-cover"
                  />
                  <div className={`
                    absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface
                    ${mentor.availability === 'Available' ? 'bg-success' : 
                      mentor.availability === 'Busy' ? 'bg-warning' : 'bg-error'}
                  `}></div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h5 className="text-base font-semibold text-text-primary mb-1">
                        {mentor.name}
                      </h5>
                      <p className="text-sm text-text-secondary">
                        {mentor.title} at {mentor.company}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Icon name="Star" size={14} className="text-warning fill-current" />
                        <span className="text-sm font-medium text-text-primary">
                          {mentor.rating}
                        </span>
                      </div>
                      <div className="text-xs text-text-secondary">
                        {mentor.sessions} sessions
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                    {mentor.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {mentor.expertise.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-accent/20 text-accent rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {mentor.expertise.length > 3 && (
                      <span className="px-2 py-1 bg-surface text-text-tertiary rounded-full text-xs">
                        +{mentor.expertise.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${getAvailabilityColor(mentor.availability)}
                      `}>
                        {mentor.availability}
                      </span>
                      <span className="text-text-secondary">
                        {mentor.experience}
                      </span>
                      <span className="text-primary font-semibold">
                        {mentor.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-xs text-success font-medium">
                        {mentor.matchScore}% match
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        iconName="Calendar"
                        onClick={() => onNavigate(`/book-mentor/${mentor.id}`)}
                      >
                        Book
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mentorship Stats */}
      <div className="glass-card p-6">
        <h4 className="text-base font-semibold text-text-primary mb-4">
          Your Mentorship Journey
        </h4>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {mentorshipStats.totalSessions}
            </div>
            <div className="text-xs text-text-secondary">
              Total Sessions
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {mentorshipStats.hoursSpent}
            </div>
            <div className="text-xs text-text-secondary">
              Hours Spent
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning mb-1">
              {mentorshipStats.goalsAchieved}
            </div>
            <div className="text-xs text-text-secondary">
              Goals Achieved
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary mb-1">
              {mentorshipStats.skillsImproved}
            </div>
            <div className="text-xs text-text-secondary">
              Skills Improved
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Sessions */}
      {upcomingSessions.length > 0 && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-semibold text-text-primary">
              Upcoming Sessions
            </h4>
            <Button
              variant="ghost"
              size="sm"
              iconName="Calendar"
              onClick={() => onNavigate('/mentorship-calendar')}
            >
              View Calendar
            </Button>
          </div>

          <div className="space-y-3">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border hover:shadow-glass-secondary transition-all duration-300"
              >
                <div className="flex-1">
                  <h5 className="text-sm font-semibold text-text-primary mb-1">
                    {session.topic}
                  </h5>
                  <p className="text-xs text-text-secondary mb-1">
                    with {session.mentor}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-text-tertiary">
                    <Icon name="Calendar" size={12} />
                    <span>{session.date}</span>
                    <Icon name="Clock" size={12} />
                    <span>{session.time}</span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Video"
                  onClick={() => onNavigate(`/session/${session.id}`)}
                >
                  Join
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center">
        <Button
          variant="primary"
          iconName="Users"
          iconPosition="left"
          onClick={() => onNavigate('/mentorship')}
        >
          Explore Mentorship
        </Button>
      </div>
    </div>
  );
};

export default MentorshipCard;