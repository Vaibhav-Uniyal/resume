'use client';

import { useState } from 'react';

interface ResumeFormProps {
  onSubmit: (data: any) => void;
}

export default function ResumeForm({ onSubmit }: ResumeFormProps) {
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
    },
    summary: '',
    experience: [{
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    }],
    education: [{
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: '',
    }],
    skills: '',
  });

  const handleChange = (section: string, field: string, value: string, index?: number) => {
    setFormData(prev => {
      if (index !== undefined && Array.isArray(prev[section])) {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
      }
      if (typeof prev[section] === 'object' && !Array.isArray(prev[section])) {
        return {
          ...prev,
          [section]: { ...prev[section], [field]: value }
        };
      }
      return { ...prev, [section]: value };
    });
  };

  const addItem = (section: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], section === 'experience' ? {
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
      } : {
        degree: '',
        school: '',
        location: '',
        graduationDate: '',
        gpa: '',
      }]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="input-field"
            value={formData.personalInfo.name}
            onChange={(e) => handleChange('personalInfo', 'name', e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={formData.personalInfo.email}
            onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone"
            className="input-field"
            value={formData.personalInfo.phone}
            onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="input-field"
            value={formData.personalInfo.location}
            onChange={(e) => handleChange('personalInfo', 'location', e.target.value)}
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            className="input-field col-span-2"
            value={formData.personalInfo.linkedin}
            onChange={(e) => handleChange('personalInfo', 'linkedin', e.target.value)}
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Professional Summary</h2>
        <textarea
          placeholder="Write a brief professional summary..."
          className="input-field h-32"
          value={formData.summary}
          onChange={(e) => handleChange('summary', '', e.target.value)}
        />
      </div>

      {/* Work Experience */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
        {formData.experience.map((exp, index) => (
          <div key={index} className="mb-6 p-4 border rounded">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Job Title"
                className="input-field"
                value={exp.title}
                onChange={(e) => handleChange('experience', 'title', e.target.value, index)}
              />
              <input
                type="text"
                placeholder="Company"
                className="input-field"
                value={exp.company}
                onChange={(e) => handleChange('experience', 'company', e.target.value, index)}
              />
              <input
                type="text"
                placeholder="Location"
                className="input-field"
                value={exp.location}
                onChange={(e) => handleChange('experience', 'location', e.target.value, index)}
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="month"
                  placeholder="Start Date"
                  className="input-field"
                  value={exp.startDate}
                  onChange={(e) => handleChange('experience', 'startDate', e.target.value, index)}
                />
                <input
                  type="month"
                  placeholder="End Date"
                  className="input-field"
                  value={exp.endDate}
                  onChange={(e) => handleChange('experience', 'endDate', e.target.value, index)}
                />
              </div>
              <textarea
                placeholder="Job Description"
                className="input-field col-span-2 h-32"
                value={exp.description}
                onChange={(e) => handleChange('experience', 'description', e.target.value, index)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addItem('experience')}
          className="btn-secondary"
        >
          Add Experience
        </button>
      </div>

      {/* Education */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        {formData.education.map((edu, index) => (
          <div key={index} className="mb-6 p-4 border rounded">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Degree"
                className="input-field"
                value={edu.degree}
                onChange={(e) => handleChange('education', 'degree', e.target.value, index)}
              />
              <input
                type="text"
                placeholder="School"
                className="input-field"
                value={edu.school}
                onChange={(e) => handleChange('education', 'school', e.target.value, index)}
              />
              <input
                type="text"
                placeholder="Location"
                className="input-field"
                value={edu.location}
                onChange={(e) => handleChange('education', 'location', e.target.value, index)}
              />
              <input
                type="month"
                placeholder="Graduation Date"
                className="input-field"
                value={edu.graduationDate}
                onChange={(e) => handleChange('education', 'graduationDate', e.target.value, index)}
              />
              <input
                type="text"
                placeholder="GPA (optional)"
                className="input-field"
                value={edu.gpa}
                onChange={(e) => handleChange('education', 'gpa', e.target.value, index)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addItem('education')}
          className="btn-secondary"
        >
          Add Education
        </button>
      </div>

      {/* Skills */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <textarea
          placeholder="Enter your skills (separated by commas)"
          className="input-field h-32"
          value={formData.skills}
          onChange={(e) => handleChange('skills', '', e.target.value)}
        />
      </div>

      <button type="submit" className="btn-primary w-full">
        Generate Resume
      </button>
    </form>
  );
} 