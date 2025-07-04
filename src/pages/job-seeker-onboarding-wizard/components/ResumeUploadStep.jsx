import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResumeUploadStep = ({ data, onUpdate, onNext, onPrev }) => {
  const [uploadedFile, setUploadedFile] = useState(data.resumeFile || null);
  const [extractedSkills, setExtractedSkills] = useState(data.extractedSkills || []);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Mock AI skill extraction
  const mockExtractedSkills = [
    { skill: 'JavaScript', confidence: 95, category: 'Technical' },
    { skill: 'React', confidence: 90, category: 'Technical' },
    { skill: 'Node.js', confidence: 85, category: 'Technical' },
    { skill: 'Project Management', confidence: 80, category: 'Soft Skills' },
    { skill: 'Team Leadership', confidence: 75, category: 'Soft Skills' },
    { skill: 'Problem Solving', confidence: 88, category: 'Soft Skills' },
    { skill: 'SQL', confidence: 70, category: 'Technical' },
    { skill: 'AWS', confidence: 65, category: 'Technical' },
    { skill: 'Communication', confidence: 92, category: 'Soft Skills' },
    { skill: 'Agile Methodology', confidence: 78, category: 'Process' }
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF or Word document');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploadedFile(file);
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      setExtractedSkills(mockExtractedSkills);
      setIsProcessing(false);
    }, 3000);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setExtractedSkills([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleSkillConfirmation = (index) => {
    setExtractedSkills(prev => 
      prev.map((skill, i) => 
        i === index ? { ...skill, confirmed: !skill.confirmed } : skill
      )
    );
  };

  const handleNext = () => {
    const stepData = {
      resumeFile: uploadedFile,
      extractedSkills: extractedSkills.filter(skill => skill.confirmed !== false)
    };
    onUpdate(stepData);
    onNext();
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-error';
  };

  const getConfidenceLabel = (confidence) => {
    if (confidence >= 80) return 'High';
    if (confidence >= 60) return 'Medium';
    return 'Low';
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl lg:text-3xl font-heading font-bold text-gradient">
          Upload Your Resume
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Upload your resume and let our AI extract your skills and experience to create a comprehensive profile.
        </p>
      </div>

      {/* File Upload Area */}
      <div className="space-y-6">
        {!uploadedFile ? (
          <div
            className={`
              relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
              ${dragActive 
                ? 'border-primary bg-primary/10 scale-105' :'border-border hover:border-primary/50 hover:bg-primary/5'
              }
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                <Icon name="Upload" size={32} className="text-primary" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Drop your resume here
                </h3>
                <p className="text-text-secondary mb-4">
                  or click to browse files
                </p>
                
                <Button variant="primary" size="sm">
                  Choose File
                </Button>
              </div>
              
              <div className="text-sm text-text-secondary">
                <p>Supported formats: PDF, DOC, DOCX</p>
                <p>Maximum file size: 5MB</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={24} className="text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{uploadedFile.name}</h3>
                  <p className="text-sm text-text-secondary">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                iconName="X"
              >
                Remove
              </Button>
            </div>
            
            {isProcessing && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin">
                    <Icon name="Loader2" size={16} className="text-primary" />
                  </div>
                  <span className="text-sm text-primary">Processing resume with AI...</span>
                </div>
                <div className="w-full bg-background-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full animate-pulse w-3/4"></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Extracted Skills */}
      {extractedSkills.length > 0 && !isProcessing && (
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-text-primary">
              AI-Extracted Skills
            </h3>
            <span className="text-sm text-text-secondary">
              (Review and confirm)
            </span>
          </div>

          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-success font-medium">
                {extractedSkills.length} skills detected
              </span>
            </div>

            <div className="grid gap-3">
              {extractedSkills.map((skill, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center justify-between p-3 rounded-lg border transition-all duration-300
                    ${skill.confirmed !== false 
                      ? 'border-primary/20 bg-primary/5' :'border-border bg-background-secondary opacity-60'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleSkillConfirmation(index)}
                      className={`
                        w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
                        ${skill.confirmed !== false 
                          ? 'bg-primary border-primary' :'border-border hover:border-primary/50'
                        }
                      `}
                    >
                      {skill.confirmed !== false && (
                        <Icon name="Check" size={12} className="text-white" />
                      )}
                    </button>
                    
                    <div>
                      <span className="font-medium text-text-primary">{skill.skill}</span>
                      <span className="ml-2 text-xs text-text-secondary">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${getConfidenceColor(skill.confidence)}`}>
                      {getConfidenceLabel(skill.confidence)}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {skill.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Info" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">AI Analysis Complete</span>
              </div>
              <p className="text-sm text-text-secondary">
                Review the extracted skills and uncheck any that don't accurately represent your expertise. 
                You can add more skills in the next step.
              </p>
            </div>
          </div>
        </div>
      )}

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
          disabled={!uploadedFile}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ResumeUploadStep;