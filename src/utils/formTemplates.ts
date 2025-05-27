import { FormTemplate } from '../contexts/FormContext';
import { generateId } from './helpers';

export const defaultTemplates: FormTemplate[] = [
  {
    id: 'html-css-quiz',
    name: 'HTML & CSS Quiz',
    description: 'A comprehensive quiz to test HTML and CSS knowledge',
    steps: [{
      id: generateId(),
      title: 'HTML & CSS Knowledge Test',
      description: 'Answer the following questions to test your understanding',
      fields: [
        {
          id: generateId(),
          type: 'text',
          label: 'What does HTML stand for?',
          placeholder: 'Enter your answer',
          required: true,
          step: 0
        },
        {
          id: generateId(),
          type: 'radio',
          label: 'Which HTML tag is used for the largest heading?',
          required: true,
          options: ['<h1>', '<h6>', '<heading>', '<header>'],
          step: 0
        },
        {
          id: generateId(),
          type: 'textarea',
          label: 'Explain the difference between margin and padding in CSS',
          placeholder: 'Describe the difference in detail...',
          required: true,
          validation: {
            minLength: 50,
            maxLength: 300
          },
          step: 0
        },
        {
          id: generateId(),
          type: 'radio',
          label: 'Which CSS property is used to change the text color?',
          required: true,
          options: ['color', 'text-color', 'font-color', 'text-style'],
          step: 0
        },
        {
          id: generateId(),
          type: 'checkbox',
          label: 'Which of the following are valid CSS selectors? (Select all that apply)',
          required: true,
          options: ['#id', '.class', 'element', '*', '::before'],
          step: 0
        },
        {
          id: generateId(),
          type: 'number',
          label: 'How many years of experience do you have with HTML/CSS?',
          placeholder: 'Enter number of years',
          required: true,
          validation: {
            min: 0,
            max: 20
          },
          step: 0
        }
      ]
    }],
    settings: {
      multiStep: false,
      showProgressBar: false,
      allowEdit: true
    }
  },

  {
    id: 'sde-job-application',
    name: 'SDE Job Application',
    description: 'Software Development Engineer job application form',
    steps: [{
      id: generateId(),
      title: 'Job Application',
      description: 'Apply for Software Development Engineer position',
      fields: [
        {
          id: generateId(),
          type: 'text',
          label: 'Full Name',
          placeholder: 'Enter your full name',
          required: true,
          step: 0
        },
        {
          id: generateId(),
          type: 'email',
          label: 'Email Address',
          placeholder: 'your.email@example.com',
          required: true,
          step: 0
        },
        {
          id: generateId(),
          type: 'text',
          label: 'Resume Upload (URL)',
          placeholder: 'https://drive.google.com/your-resume',
          required: true,
          helpText: 'Please provide a public link to your resume',
          step: 0
        },
        {
          id: generateId(),
          type: 'text',
          label: 'Portfolio Link',
          placeholder: 'https://yourportfolio.com',
          required: false,
          helpText: 'Share your portfolio or GitHub profile',
          step: 0
        },
        {
          id: generateId(),
          type: 'select',
          label: 'Experience Level',
          required: true,
          options: ['Fresher (0-1 years)', 'Junior (1-3 years)', 'Mid-level (3-5 years)', 'Senior (5+ years)'],
          step: 0
        },
        {
          id: generateId(),
          type: 'checkbox',
          label: 'Preferred Tech Stack (Select all that apply)',
          required: true,
          options: ['JavaScript/TypeScript', 'React/Vue/Angular', 'Node.js', 'Python', 'Java', 'C++', 'Go', 'Rust'],
          step: 0
        }
      ]
    }],
    settings: {
      multiStep: false,
      showProgressBar: false,
      allowEdit: true
    }
  },

  {
    id: 'course-selection',
    name: '6th Semester Course Selection',
    description: 'Course registration form for 6th semester students',
    steps: [{
      id: generateId(),
      title: 'Course Registration',
      description: 'Select your courses for the 6th semester',
      fields: [
        {
          id: generateId(),
          type: 'text',
          label: 'Student Name',
          placeholder: 'Enter your full name',
          required: true,
          step: 0
        },
        {
          id: generateId(),
          type: 'text',
          label: 'Roll Number',
          placeholder: 'Enter your roll number',
          required: true,
          validation: {
            pattern: '^[0-9]{6,10}$'
          },
          helpText: 'Enter your 6-10 digit roll number',
          step: 0
        },
        {
          id: generateId(),
          type: 'email',
          label: 'Email Address',
          placeholder: 'your.email@university.edu',
          required: true,
          step: 0
        },
        {
          id: generateId(),
          type: 'select',
          label: 'Department',
          required: true,
          options: ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Electrical'],
          step: 0
        },
        {
          id: generateId(),
          type: 'checkbox',
          label: 'Course Selection (Select 4-6 courses)',
          required: true,
          options: ['Advanced Database Systems', 'Machine Learning', 'Software Engineering', 'Computer Networks', 'Distributed Systems', 'Mobile App Development', 'Cloud Computing', 'Cybersecurity'],
          step: 0
        },
        {
          id: generateId(),
          type: 'textarea',
          label: 'Additional Notes',
          placeholder: 'Any special requirements or comments...',
          required: false,
          validation: {
            maxLength: 500
          },
          step: 0
        }
      ]
    }],
    settings: {
      multiStep: false,
      showProgressBar: false,
      allowEdit: true
    }
  },

  {
    id: 'contact-form',
    name: 'Contact Form',
    description: 'A simple contact form for collecting user inquiries',
    steps: [{
      id: generateId(),
      title: 'Contact Information',
      description: 'Please provide your contact details',
      fields: [
        {
          id: generateId(),
          type: 'text',
          label: 'Full Name',
          placeholder: 'Enter your full name',
          required: true,
          step: 0
        },
        {
          id: generateId(),
          type: 'email',
          label: 'Email Address',
          placeholder: 'Enter your email',
          required: true,
          step: 0
        },
        {
          id: generateId(),
          type: 'text',
          label: 'Subject',
          placeholder: 'What is this about?',
          required: true,
          step: 0
        },
        {
          id: generateId(),
          type: 'textarea',
          label: 'Message',
          placeholder: 'Type your message here...',
          required: true,
          validation: {
            minLength: 10,
            maxLength: 500
          },
          step: 0
        }
      ]
    }],
    settings: {
      multiStep: false,
      showProgressBar: false,
      allowEdit: true
    }
  },
  
  {
    id: 'survey-form',
    name: 'Customer Survey',
    description: 'Multi-step customer satisfaction survey',
    steps: [
      {
        id: generateId(),
        title: 'Personal Information',
        description: 'Tell us about yourself',
        fields: [
          {
            id: generateId(),
            type: 'text',
            label: 'Name',
            placeholder: 'Your name',
            required: true,
            step: 0
          },
          {
            id: generateId(),
            type: 'select',
            label: 'Age Group',
            required: true,
            options: ['18-25', '26-35', '36-45', '46-55', '55+'],
            step: 0
          }
        ]
      },
      {
        id: generateId(),
        title: 'Feedback',
        description: 'Rate your experience',
        fields: [
          {
            id: generateId(),
            type: 'radio',
            label: 'Overall Satisfaction',
            required: true,
            options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
            step: 1
          },
          {
            id: generateId(),
            type: 'checkbox',
            label: 'What did you like? (Select all that apply)',
            required: false,
            options: ['Product Quality', 'Customer Service', 'Pricing', 'User Experience', 'Speed'],
            step: 1
          },
          {
            id: generateId(),
            type: 'textarea',
            label: 'Additional Comments',
            placeholder: 'Any additional feedback?',
            required: false,
            step: 1
          }
        ]
      }
    ],
    settings: {
      multiStep: true,
      showProgressBar: true,
      allowEdit: true
    }
  },

  {
    id: 'registration-form',
    name: 'Event Registration',
    description: 'Complete event registration form with validation',
    steps: [{
      id: generateId(),
      title: 'Event Registration',
      description: 'Register for our upcoming event',
      fields: [
        {
          id: generateId(),
          type: 'text',
          label: 'First Name',
          placeholder: 'First name',
          required: true,
          step: 0
        },
        {
          id: generateId(),
          type: 'text',
          label: 'Last Name',
          placeholder: 'Last name',
          required: true,
          step: 0
        },
        {
          id: generateId(),
          type: 'email',
          label: 'Email',
          placeholder: 'your@email.com',
          required: true,
          step: 0
        },
        {
          id: generateId(),
          type: 'text',
          label: 'Phone Number',
          placeholder: '+1 (555) 123-4567',
          required: true,
          validation: {
            pattern: '^[+]?[1-9]?[0-9]{7,15}$'
          },
          step: 0
        },
        {
          id: generateId(),
          type: 'select',
          label: 'Ticket Type',
          required: true,
          options: ['Standard ($50)', 'VIP ($100)', 'Student ($25)'],
          step: 0
        },
        {
          id: generateId(),
          type: 'number',
          label: 'Number of Tickets',
          placeholder: '1',
          required: true,
          validation: {
            min: 1,
            max: 10
          },
          step: 0
        },
        {
          id: generateId(),
          type: 'textarea',
          label: 'Special Requirements',
          placeholder: 'Any dietary restrictions or accessibility needs?',
          required: false,
          step: 0
        }
      ]
    }],
    settings: {
      multiStep: false,
      showProgressBar: false,
      allowEdit: true
    }
  }
];

export const loadTemplate = (templateId: string): FormTemplate | null => {
  const template = defaultTemplates.find(t => t.id === templateId);
  if (!template) return null;

  // Create a deep copy with new IDs to avoid conflicts
  return {
    ...template,
    id: generateId(),
    steps: template.steps.map(step => ({
      ...step,
      id: generateId(),
      fields: step.fields.map(field => ({
        ...field,
        id: generateId()
      }))
    }))
  };
};
