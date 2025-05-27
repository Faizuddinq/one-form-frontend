
import React from 'react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Start Building Today
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Begin with our free plan and upgrade as your needs grow.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface rounded-xl p-8 border border-border">
            <h3 className="text-2xl font-bold mb-4 text-text-primary">Free</h3>
            <div className="text-4xl font-bold text-accent mb-6">$0<span className="text-lg text-text-muted">/month</span></div>
            <ul className="space-y-3 mb-8">
              <li className="text-text-primary">✓ Up to 5 forms</li>
              <li className="text-text-primary">✓ 100 responses/month</li>
              <li className="text-text-primary">✓ Basic templates</li>
              <li className="text-text-primary">✓ Email notifications</li>
            </ul>
            <Link to="/builder" className="btn-secondary w-full text-center block">
              Get Started Free
            </Link>
          </div>

          <div className="bg-surface rounded-xl p-8 border-2 border-accent relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-4 text-text-primary">Pro</h3>
            <div className="text-4xl font-bold text-accent mb-6">$29<span className="text-lg text-text-muted">/month</span></div>
            <ul className="space-y-3 mb-8">
              <li className="text-text-primary">✓ Unlimited forms</li>
              <li className="text-text-primary">✓ Unlimited responses</li>
              <li className="text-text-primary">✓ Advanced templates</li>
              <li className="text-text-primary">✓ Custom branding</li>
              <li className="text-text-primary">✓ Analytics & exports</li>
              <li className="text-text-primary">✓ Priority support</li>
            </ul>
            <Link to="/builder" className="btn-primary w-full text-center block">
              Start Pro Trial
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
