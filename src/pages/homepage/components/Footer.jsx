import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', path: '/about-contact' },
      { label: 'Pricing', path: '/about-contact' },
      { label: 'API', path: '/about-contact' },
      { label: 'Integrations', path: '/about-contact' }
    ],
    company: [
      { label: 'About Us', path: '/about-contact' },
      { label: 'Careers', path: '/about-contact' },
      { label: 'Press', path: '/about-contact' },
      { label: 'Blog', path: '/about-contact' }
    ],
    resources: [
      { label: 'Help Center', path: '/about-contact' },
      { label: 'Community', path: '/about-contact' },
      { label: 'Guides', path: '/about-contact' },
      { label: 'Webinars', path: '/about-contact' }
    ],
    legal: [
      { label: 'Privacy Policy', path: '/about-contact' },
      { label: 'Terms of Service', path: '/about-contact' },
      { label: 'Cookie Policy', path: '/about-contact' },
      { label: 'GDPR', path: '/about-contact' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com' },
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com' },
    { name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com' }
  ];

  return (
    <footer className="bg-text-primary text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="glass-card bg-white/5 p-8 lg:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-4">
              Stay Updated with HireHub AI
            </h3>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Get the latest insights on AI-powered recruitment, career development tips, and platform updates delivered to your inbox.
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/60"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    iconName="Send"
                    iconPosition="right"
                    className="hover-lift"
                  >
                    Subscribe
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-success">
                <Icon name="CheckCircle" size={24} />
                <span className="text-lg font-medium">Thank you for subscribing!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glass-primary">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <div>
                <span className="text-2xl font-heading font-bold text-gradient">HireHub</span>
                <span className="text-sm font-medium text-white/80 ml-1">AI</span>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              Revolutionizing career connections through AI-powered matching, personalized development, and intelligent insights for job seekers, recruiters, and employers.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover-lift"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-lg font-heading font-bold mb-4 capitalize">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <button
                        onClick={() => navigate(link.path)}
                        className="text-white/80 hover:text-white transition-colors duration-300 text-sm"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-white/60">
              <span>© {currentYear} HireHub AI. All rights reserved.</span>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} />
                <span>SOC 2 Compliant</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-white/60">
                <Icon name="Globe" size={16} />
                <span>Available in 25+ countries</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-white/60">
                <Icon name="Zap" size={16} />
                <span>Powered by AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;