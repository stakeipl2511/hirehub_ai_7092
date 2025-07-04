import React, { useEffect, useState } from 'react';

const ConfettiAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleShowConfetti = () => {
      setIsVisible(true);
      generateParticles();
      
      setTimeout(() => {
        setIsVisible(false);
        setParticles([]);
      }, 3000);
    };

    window.addEventListener('showConfetti', handleShowConfetti);
    return () => window.removeEventListener('showConfetti', handleShowConfetti);
  }, []);

  const generateParticles = () => {
    const newParticles = [];
    const colors = ['#a78bfa', '#fbcfe8', '#e0e7ff', '#fcd34d', '#34d399'];
    
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 4,
        speedY: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }
    
    setParticles(newParticles);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            transform: `rotate(${particle.rotation}deg)`,
            animation: `confetti-fall 3s linear forwards, confetti-spin 1s linear infinite`
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes confetti-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ConfettiAnimation;