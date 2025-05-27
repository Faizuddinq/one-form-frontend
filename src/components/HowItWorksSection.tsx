
import React from 'react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Choose Template",
      description: "Start with a pre-built template or create from scratch"
    },
    {
      number: "02", 
      title: "Customize Fields",
      description: "Drag and drop fields, configure validation and styling"
    },
    {
      number: "03",
      title: "Share & Collect",
      description: "Publish your form and start collecting responses instantly"
    }
  ];

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            How It Works
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Create professional forms in minutes with our simple 3-step process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="bg-accent text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-text-primary">
                {step.title}
              </h3>
              <p className="text-text-muted">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border transform -translate-x-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
