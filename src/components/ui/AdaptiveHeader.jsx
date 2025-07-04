import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import NotificationBadge from './NotificationBadge';
import RoleBasedMenu from './RoleBasedMenu';

const AdaptiveHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status and user data
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    const savedLanguage = localStorage.getItem('language') || 'en';
    
    setCurrentLanguage(savedLanguage);
    setIsAuthenticated(!!authToken);
    
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/homepage');
    closeMenu();
  };

  const isAuthPage = location.pathname === '/authentication-portal';

  const Logo = () => (
    <div 
      className="flex items-center space-x-2 cursor-pointer group"
      onClick={() => handleNavigation(isAuthenticated ? '/job-seeker-dashboard' : '/homepage')}
    >
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glass-primary group-hover:shadow-glow transition-all duration-300">
          <Icon name="Zap" size={20} color="white" className="group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-heading font-bold text-gradient">HireHub</span>
        <span className="text-xs font-medium text-text-secondary -mt-1">AI</span>
      </div>
    </div>
  );

  const PublicNavigation = () => (
    <nav className="hidden md:flex items-center space-x-8">
      <button
        onClick={() => handleNavigation('/about-contact')}
        className="text-text-secondary hover:text-primary transition-colors duration-300 font-medium"
      >
        About & Contact
      </button>
    </nav>
  );

  const AuthenticatedNavigation = () => (
    <nav className="hidden md:flex items-center space-x-6">
      <button
        onClick={() => handleNavigation('/job-seeker-dashboard')}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
          location.pathname === '/job-seeker-dashboard' ?'bg-primary/10 text-primary border border-primary/20' :'text-text-secondary hover:text-primary hover:bg-primary/5'
        }`}
      >
        Dashboard
      </button>
      <NotificationBadge 
        count={3} 
        onClick={() => handleNavigation('/notifications-center')}
        isActive={location.pathname === '/notifications-center'}
      />
    </nav>
  );

  const MobileMenu = () => (
    <div className={`fixed inset-0 z-1100 transition-all duration-300 ${isMenuOpen ? 'visible' : 'invisible'}`}>
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeMenu}
      />
      <div className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] glass-card border-l border-white/20 transition-transform duration-300 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Logo />
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => handleNavigation('/about-contact')}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition-colors duration-200 flex items-center space-x-3"
                  >
                    <Icon name="Info" size={18} />
                    <span>About & Contact</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavigation('/job-seeker-dashboard')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                      location.pathname === '/job-seeker-dashboard' ?'bg-primary/20 text-primary' :'hover:bg-white/10'
                    }`}
                  >
                    <Icon name="LayoutDashboard" size={18} />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => handleNavigation('/notifications-center')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center justify-between ${
                      location.pathname === '/notifications-center'
                        ? 'bg-primary/20 text-primary' :'hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="Bell" size={18} />
                      <span>Notifications</span>
                    </div>
                    <NotificationBadge count={3} size="sm" />
                  </button>
                  <button
                    onClick={() => handleNavigation('/job-seeker-onboarding-wizard')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                      location.pathname === '/job-seeker-onboarding-wizard' ?'bg-primary/20 text-primary' :'hover:bg-white/10'
                    }`}
                  >
                    <Icon name="UserPlus" size={18} />
                    <span>Complete Profile</span>
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div className="p-6 border-t border-white/10">
            {!isAuthenticated ? (
              <Button
                variant="primary"
                onClick={() => handleNavigation('/authentication-portal')}
                className="w-full"
                iconName="LogIn"
                iconPosition="right"
              >
                Sign In
              </Button>
            ) : (
              <div className="space-y-4">
                <RoleBasedMenu user={user} onNavigate={handleNavigation} />
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full"
                  iconName="LogOut"
                  iconPosition="right"
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (isAuthPage) {
    return (
      <header className="sticky top-0 z-1000 glass-card border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <Logo />
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-1000 glass-card border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
            
            {!isAuthenticated ? <PublicNavigation /> : <AuthenticatedNavigation />}
            
            <div className="flex items-center space-x-4">
              {!isAuthenticated ? (
                <div className="hidden md:flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    onClick={() => handleNavigation('/authentication-portal')}
                    size="sm"
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleNavigation('/authentication-portal')}
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Get Started
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <RoleBasedMenu user={user} onNavigate={handleNavigation} />
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    size="sm"
                    iconName="LogOut"
                    iconPosition="right"
                  >
                    Sign Out
                  </Button>
                </div>
              )}
              
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <MobileMenu />
    </>
  );
};

export default AdaptiveHeader;