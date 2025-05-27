
import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      content: "OneForm has revolutionized how we collect customer feedback. The multi-step forms are incredible!",
      avatar: "SJ"
    },
    {
      name: "Mike Chen", 
      role: "Product Manager",
      content: "The drag-and-drop builder is so intuitive. We created complex forms in minutes, not hours.",
      avatar: "MC"
    },
    {
      name: "Emily Davis",
      role: "UX Designer", 
      content: "Beautiful forms that actually convert. The validation system is exactly what we needed.",
      avatar: "ED"
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Join thousands of professionals who trust OneForm for their form building needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-primary rounded-xl p-8 border border-border"
            >
              <p className="text-text-primary mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-text-primary">
                    {testimonial.name}
                  </div>
                  <div className="text-text-muted text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
