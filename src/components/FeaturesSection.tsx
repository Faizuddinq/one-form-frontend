
import React from 'react';
import { LayoutDashboard, Menu, ToggleLeft } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <LayoutDashboard className="w-8 h-8" />,
      title: "Drag & Drop Builder",
      description: "Intuitive visual form builder with real-time preview. Add, remove, and reorder fields with simple drag gestures."
    },
    {
      icon: <Menu className="w-8 h-8" />,
      title: "Multi-Step Forms",
      description: "Create complex multi-step forms with progress indicators, conditional logic, and step validation."
    },
    {
      icon: <ToggleLeft className="w-8 h-8" />,
      title: "Advanced Validation",
      description: "Custom validation rules, pattern matching, required fields, and real-time error feedback."
    }
  ];

  return (
    <section id="features" className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Powerful Features for Modern Forms
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Everything you need to create professional forms that convert and engage your users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-primary rounded-xl p-8 border border-border hover:border-highlight/50 transition-all duration-300 group"
            >
              <div className="text-accent mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-text-primary">
                {feature.title}
              </h3>
              <p className="text-text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
