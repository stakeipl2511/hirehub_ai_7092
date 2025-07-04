import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const FAQSection = () => {
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default
  const [searchTerm, setSearchTerm] = useState('');

  const faqData = [
    {
      id: 0,
      category: "Getting Started",
      question: "How does HireHub AI's job matching work?",
      answer: `Our AI-powered matching system analyzes your skills, experience, career goals, and preferences to connect you with relevant opportunities. The algorithm considers factors like:\n\n• Technical skills and proficiency levels\n• Industry experience and domain knowledge\n• Career trajectory and growth aspirations\n• Location preferences and remote work options\n• Company culture fit and values alignment\n\nThe more you interact with the platform, the smarter our recommendations become.`
    },
    {
      id: 1,
      category: "Account & Privacy",
      question: "Is my personal information secure on HireHub AI?",
      answer: `Absolutely. We implement enterprise-grade security measures including:\n\n• End-to-end encryption for all data transmission\n• SOC 2 Type II compliance for data handling\n• GDPR compliance for European users\n• Regular security audits and penetration testing\n• Granular privacy controls for profile visibility\n\nYou have complete control over what information is shared with employers and can enable anonymous browsing at any time.`
    },
    {
      id: 2,
      category: "Job Seekers",
      question: "What makes HireHub AI different from other job platforms?",
      answer: `HireHub AI goes beyond traditional job boards by offering:\n\n• AI-powered skill gap analysis and learning recommendations\n• Personalized mentorship matching with industry experts\n• Real-time market insights and salary benchmarking\n• Anonymous profile browsing to avoid current employer detection\n• Automated application tracking and interview scheduling\n• Career path visualization and goal setting tools\n\nWe focus on long-term career development, not just immediate job placement.`
    },
    {
      id: 3,
      category: "Employers",
      question: "How can employers benefit from HireHub AI?",
      answer: `Employers gain access to:\n\n• Pre-screened candidates matched by AI algorithms\n• Diversity and inclusion analytics for hiring practices\n• Automated candidate sourcing and outreach\n• Interview scheduling and coordination tools\n• Comprehensive candidate assessment reports\n• Hiring pipeline analytics and optimization insights\n\nOur platform reduces time-to-hire by 60% while improving candidate quality and diversity.`
    },
    {
      id: 4,
      category: "Pricing",
      question: "What are the pricing plans for different user types?",
      answer: `We offer flexible pricing for all user types:\n\n**Job Seekers:**\n• Basic: Free (job search, basic matching)\n• Premium: $19/month (advanced features, mentorship)\n• Pro: $39/month (career coaching, priority support)\n\n**Employers:**\n• Starter: $99/month (up to 5 active jobs)\n• Growth: $299/month (unlimited jobs, advanced analytics)\n• Enterprise: Custom pricing (dedicated support, API access)\n\nAll plans include a 14-day free trial with full feature access.`
    },
    {
      id: 5,
      category: "Technical Support",
      question: "How do I get help if I encounter technical issues?",
      answer: `We provide multiple support channels:\n\n• 24/7 live chat support through the platform\n• Email support with response within 4 hours\n• Comprehensive help center with video tutorials\n• Community forum for peer-to-peer assistance\n• Dedicated account managers for enterprise clients\n• Phone support for premium and enterprise users\n\nOur technical team is available around the clock to ensure smooth platform operation.`
    },
    {
      id: 6,
      category: "Features",
      question: "Can I use HireHub AI on mobile devices?",
      answer: `Yes! HireHub AI is fully optimized for mobile use:\n\n• Responsive web application works on all devices\n• Native iOS and Android apps (coming Q2 2024)\n• Push notifications for job matches and messages\n• Offline capability for viewing saved jobs and profiles\n• Mobile-optimized application and interview processes\n• Touch-friendly interface with gesture navigation\n\nYour experience remains consistent across all devices with real-time synchronization.`
    },
    {
      id: 7,
      category: "Integration",
      question: "Does HireHub AI integrate with other HR tools?",
      answer: `We offer extensive integration capabilities:\n\n• ATS integration (Workday, BambooHR, Greenhouse)\n• Calendar sync (Google Calendar, Outlook, Apple Calendar)\n• Communication tools (Slack, Microsoft Teams, Zoom)\n• Background check services (Checkr, Sterling)\n• Assessment platforms (HackerRank, Codility)\n• HRIS systems for seamless data flow\n\nOur API allows custom integrations for enterprise clients with specific requirements.`
    }
  ];

  const filteredFAQs = faqData.filter(
    item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const categories = [...new Set(faqData.map(item => item.category))];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            Find answers to common questions about HireHub AI
          </p>

          <div className="relative max-w-md mx-auto">
            <Input
              type="search"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12"
            />
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-tertiary"
            />
          </div>
        </motion.div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="text-text-tertiary mx-auto mb-4" />
              <p className="text-text-secondary">
                No FAQs found matching your search. Try different keywords.
              </p>
            </div>
          ) : (
            filteredFAQs.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.id * 0.1 }}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-text-primary">
                      {item.question}
                    </h3>
                  </div>
                  <Icon
                    name="ChevronDown"
                    size={20}
                    className={`text-text-secondary transition-transform duration-200 ${
                      openItems.has(item.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openItems.has(item.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 border-t border-white/10">
                        <div className="pt-4 text-text-secondary leading-relaxed whitespace-pre-line">
                          {item.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;