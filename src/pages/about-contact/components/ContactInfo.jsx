import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ContactInfo = () => {
  const contactMethods = [
    {
      id: 1,
      icon: "MapPin",
      title: "Headquarters",
      details: ["123 Innovation Drive", "San Francisco, CA 94105", "United States"],
      action: {
        type: "map",
        value: "https://www.google.com/maps?q=37.7749,-122.4194&z=14&output=embed"
      }
    },
    {
      id: 2,
      icon: "Phone",
      title: "Phone Support",
      details: ["+1 (555) 123-4567", "Mon-Fri: 9AM-6PM PST", "24/7 Emergency Support"],
      action: {
        type: "tel",
        value: "+15551234567"
      }
    },
    {
      id: 3,
      icon: "Mail",
      title: "Email Support",
      details: ["support@hirehub.ai", "partnerships@hirehub.ai", "press@hirehub.ai"],
      action: {
        type: "mailto",
        value: "support@hirehub.ai"
      }
    }
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: "Linkedin",
      url: "https://linkedin.com/company/hirehub-ai",
      color: "text-blue-600"
    },
    {
      name: "Twitter",
      icon: "Twitter",
      url: "https://twitter.com/hirehub_ai",
      color: "text-blue-400"
    },
    {
      name: "GitHub",
      icon: "Github",
      url: "https://github.com/hirehub-ai",
      color: "text-gray-800"
    },
    {
      name: "YouTube",
      icon: "Youtube",
      url: "https://youtube.com/@hirehub-ai",
      color: "text-red-600"
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM PST" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM PST" },
    { day: "Sunday", hours: "Closed" }
  ];

  const handleContactClick = (action) => {
    if (action.type === "tel") {
      window.open(`tel:${action.value}`, '_self');
    } else if (action.type === "mailto") {
      window.open(`mailto:${action.value}`, '_self');
    } else if (action.type === "map") {
      window.open(action.value, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-secondary-50 to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-4">
            Contact Information
          </h2>
          <p className="text-lg text-text-secondary">
            Multiple ways to reach us - we're here to help
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 hover-lift cursor-pointer"
              onClick={() => handleContactClick(method.action)}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary mb-4">
                <Icon name={method.icon} size={24} color="white" />
              </div>
              
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-3">
                {method.title}
              </h3>
              
              <div className="space-y-1">
                {method.details.map((detail, idx) => (
                  <p key={idx} className="text-text-secondary text-sm">
                    {detail}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Office Hours */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-6"
          >
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary mr-3">
                <Icon name="Clock" size={20} color="white" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-text-primary">
                Office Hours
              </h3>
            </div>
            
            <div className="space-y-3">
              {officeHours.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-white/10 last:border-b-0">
                  <span className="text-text-secondary font-medium">
                    {schedule.day}
                  </span>
                  <span className="text-text-primary font-semibold">
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-success/10 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
                <span className="text-success text-sm font-medium">
                  Currently Open - Response within 2 hours
                </span>
              </div>
            </div>
          </motion.div>

          {/* Social Media & Community */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-6"
          >
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary mr-3">
                <Icon name="Users" size={20} color="white" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-text-primary">
                Connect With Us
              </h3>
            </div>
            
            <p className="text-text-secondary mb-6">
              Follow us on social media for updates, tips, and community discussions.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
                >
                  <Icon 
                    name={social.icon} 
                    size={20} 
                    className={`${social.color} group-hover:scale-110 transition-transform duration-200 mr-3`}
                  />
                  <span className="text-text-primary font-medium">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <div className="flex items-start">
                <Icon name="MessageCircle" size={20} className="text-primary mr-3 mt-0.5" />
                <div>
                  <h4 className="text-primary font-semibold mb-1">
                    Join Our Community
                  </h4>
                  <p className="text-text-secondary text-sm">
                    Connect with other professionals and get exclusive insights in our Discord community.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12"
        >
          <div className="glass-card p-6">
            <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
              Visit Our Office
            </h3>
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="HireHub AI Office Location"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=37.7749,-122.4194&z=14&output=embed"
                className="border-0"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfo;