import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillsAssessmentStep = ({ data, onUpdate, onNext, onPrev }) => {
  const [skillRatings, setSkillRatings] = useState(data.skillRatings || {});
  const [selectedSkills, setSelectedSkills] = useState(data.selectedSkills || []);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState(data.quizAnswers || {});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const skillCategories = [
    {
      name: 'Technical Skills',
      icon: 'Code',
      skills: [
        { id: 'javascript', name: 'JavaScript', level: 'Beginner' },
        { id: 'python', name: 'Python', level: 'Intermediate' },
        { id: 'react', name: 'React', level: 'Advanced' },
        { id: 'nodejs', name: 'Node.js', level: 'Intermediate' },
        { id: 'sql', name: 'SQL', level: 'Beginner' },
        { id: 'aws', name: 'AWS', level: 'Advanced' },
        { id: 'docker', name: 'Docker', level: 'Intermediate' },
        { id: 'git', name: 'Git', level: 'Beginner' }
      ]
    },
    {
      name: 'Soft Skills',
      icon: 'Users',
      skills: [
        { id: 'communication', name: 'Communication', level: 'Advanced' },
        { id: 'leadership', name: 'Leadership', level: 'Intermediate' },
        { id: 'teamwork', name: 'Teamwork', level: 'Advanced' },
        { id: 'problem-solving', name: 'Problem Solving', level: 'Intermediate' },
        { id: 'time-management', name: 'Time Management', level: 'Beginner' },
        { id: 'adaptability', name: 'Adaptability', level: 'Advanced' },
        { id: 'creativity', name: 'Creativity', level: 'Intermediate' },
        { id: 'critical-thinking', name: 'Critical Thinking', level: 'Beginner' }
      ]
    },
    {
      name: 'Industry Knowledge',
      icon: 'BookOpen',
      skills: [
        { id: 'project-management', name: 'Project Management', level: 'Intermediate' },
        { id: 'data-analysis', name: 'Data Analysis', level: 'Advanced' },
        { id: 'digital-marketing', name: 'Digital Marketing', level: 'Beginner' },
        { id: 'ux-design', name: 'UX Design', level: 'Intermediate' },
        { id: 'business-strategy', name: 'Business Strategy', level: 'Advanced' },
        { id: 'financial-analysis', name: 'Financial Analysis', level: 'Beginner' },
        { id: 'content-writing', name: 'Content Writing', level: 'Intermediate' },
        { id: 'sales', name: 'Sales', level: 'Advanced' }
      ]
    }
  ];

  const quizQuestions = {
    javascript: [
      {
        question: "What is the correct way to declare a variable in JavaScript?",
        options: ["var x = 5;", "variable x = 5;", "v x = 5;", "declare x = 5;"],
        correct: 0
      },
      {
        question: "Which method is used to add an element to the end of an array?",
        options: ["push()", "add()", "append()", "insert()"],
        correct: 0
      }
    ],
    communication: [
      {
        question: "What is the most important aspect of effective communication?",
        options: ["Speaking loudly", "Active listening", "Using complex words", "Talking fast"],
        correct: 1
      },
      {
        question: "How should you handle disagreements in a team meeting?",
        options: ["Avoid the topic", "Listen to all perspectives", "Impose your view", "Leave the meeting"],
        correct: 1
      }
    ]
  };

  const handleSkillRating = (skillId, rating) => {
    setSkillRatings(prev => ({
      ...prev,
      [skillId]: rating
    }));
  };

  const toggleSkillSelection = (skillId) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(prev => prev.filter(id => id !== skillId));
    } else if (selectedSkills.length < 10) {
      setSelectedSkills(prev => [...prev, skillId]);
    }
  };

  const startQuiz = (skillId) => {
    if (quizQuestions[skillId]) {
      setCurrentQuiz({
        skillId,
        questions: quizQuestions[skillId],
        currentQuestion: 0,
        answers: []
      });
    }
  };

  const handleQuizAnswer = (answerIndex) => {
    const updatedQuiz = {
      ...currentQuiz,
      answers: [...currentQuiz.answers, answerIndex]
    };

    if (updatedQuiz.currentQuestion < updatedQuiz.questions.length - 1) {
      setCurrentQuiz({
        ...updatedQuiz,
        currentQuestion: updatedQuiz.currentQuestion + 1
      });
    } else {
      // Quiz completed
      const score = updatedQuiz.answers.reduce((acc, answer, index) => {
        return acc + (answer === updatedQuiz.questions[index].correct ? 1 : 0);
      }, 0);
      
      const percentage = (score / updatedQuiz.questions.length) * 100;
      
      setQuizAnswers(prev => ({
        ...prev,
        [updatedQuiz.skillId]: {
          score,
          total: updatedQuiz.questions.length,
          percentage
        }
      }));
      
      setShowQuizResults(true);
      setTimeout(() => {
        setCurrentQuiz(null);
        setShowQuizResults(false);
      }, 3000);
    }
  };

  const getSkillLevel = (rating) => {
    if (rating <= 2) return { level: 'Beginner', color: 'text-warning' };
    if (rating <= 4) return { level: 'Intermediate', color: 'text-primary' };
    return { level: 'Advanced', color: 'text-success' };
  };

  const handleNext = () => {
    const stepData = {
      skillRatings,
      selectedSkills,
      quizAnswers
    };
    onUpdate(stepData);
    onNext();
  };

  const isValid = selectedSkills.length >= 5 && Object.keys(skillRatings).length >= 5;

  if (currentQuiz && !showQuizResults) {
    const currentQuestion = currentQuiz.questions[currentQuiz.currentQuestion];
    
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-text-primary">
            Skill Assessment Quiz
          </h3>
          <p className="text-text-secondary">
            Question {currentQuiz.currentQuestion + 1} of {currentQuiz.questions.length}
          </p>
        </div>

        <div className="glass-card p-6 space-y-6">
          <div className="w-full bg-background-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuiz.currentQuestion + 1) / currentQuiz.questions.length) * 100}%` }}
            />
          </div>

          <h4 className="text-lg font-medium text-text-primary">
            {currentQuestion.question}
          </h4>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleQuizAnswer(index)}
                className="w-full p-4 text-left rounded-xl border-2 border-border bg-surface hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center">
                    <span className="text-sm font-medium">{String.fromCharCode(65 + index)}</span>
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showQuizResults) {
    const lastQuizResult = Object.values(quizAnswers).pop();
    
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="glass-card p-8 space-y-4">
          <div className="w-16 h-16 mx-auto bg-success/20 rounded-full flex items-center justify-center">
            <Icon name="Award" size={32} className="text-success" />
          </div>
          
          <h3 className="text-2xl font-bold text-text-primary">
            Quiz Completed!
          </h3>
          
          <p className="text-text-secondary">
            You scored {lastQuizResult?.score} out of {lastQuizResult?.total} questions
          </p>
          
          <div className="text-3xl font-bold text-success">
            {lastQuizResult?.percentage}%
          </div>
          
          <div className="animate-bounce">
            🎉
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl lg:text-3xl font-heading font-bold text-gradient">
          Skills Assessment
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Rate your skills and take quick assessments to help us understand your expertise level and recommend suitable opportunities.
        </p>
      </div>

      {skillCategories.map((category) => (
        <div key={category.name} className="space-y-4">
          <div className="flex items-center space-x-2">
            <Icon name={category.icon} size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-text-primary">
              {category.name}
            </h3>
          </div>

          <div className="grid gap-4">
            {category.skills.map((skill) => {
              const rating = skillRatings[skill.id] || 0;
              const skillLevelInfo = getSkillLevel(rating);
              const isSelected = selectedSkills.includes(skill.id);
              const hasQuiz = quizQuestions[skill.id];
              const quizResult = quizAnswers[skill.id];

              return (
                <div
                  key={skill.id}
                  className={`
                    glass-card p-4 border transition-all duration-300
                    ${isSelected ? 'border-primary bg-primary/5' : 'border-white/20'}
                  `}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleSkillSelection(skill.id)}
                        className={`
                          w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
                          ${isSelected 
                            ? 'bg-primary border-primary' :'border-border hover:border-primary/50'
                          }
                          ${selectedSkills.length >= 10 && !isSelected 
                            ? 'opacity-50 cursor-not-allowed' :''
                          }
                        `}
                        disabled={selectedSkills.length >= 10 && !isSelected}
                      >
                        {isSelected && <Icon name="Check" size={12} className="text-white" />}
                      </button>
                      
                      <div>
                        <span className="font-medium text-text-primary">{skill.name}</span>
                        {rating > 0 && (
                          <span className={`ml-2 text-sm ${skillLevelInfo.color}`}>
                            {skillLevelInfo.level}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {hasQuiz && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startQuiz(skill.id)}
                          iconName="Play"
                          iconPosition="left"
                          disabled={!isSelected}
                        >
                          {quizResult ? `${quizResult.percentage}%` : 'Quiz'}
                        </Button>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Rate your skill level</span>
                        <span className="text-primary font-medium">{rating}/5</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleSkillRating(skill.id, star)}
                            className={`
                              w-8 h-8 rounded-full transition-all duration-200
                              ${star <= rating 
                                ? 'bg-primary text-white' :'bg-background-secondary hover:bg-primary/20'
                              }
                            `}
                          >
                            <Icon 
                              name="Star" 
                              size={16} 
                              className={star <= rating ? 'fill-current' : ''} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="glass-card p-4 bg-primary/5 border-primary/20">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Selection Summary</span>
        </div>
        <p className="text-sm text-text-secondary">
          Selected {selectedSkills.length} of 10 skills • Rated {Object.keys(skillRatings).length} skills
        </p>
        {selectedSkills.length < 5 && (
          <p className="text-sm text-warning mt-1">
            Please select at least 5 skills to continue
          </p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={onPrev}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Previous
        </Button>
        
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!isValid}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SkillsAssessmentStep;