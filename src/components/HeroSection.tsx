
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-highlight/20 via-transparent to-accent/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            Build Beautiful Forms
            <span className="block text-accent">Without Code</span>
          </h1>
          
          <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto leading-relaxed">
            Create stunning, interactive forms with our drag-and-drop builder. 
            Multi-step forms, custom validation, and real-time responses - all in one platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/builder"
              className="btn-primary text-lg px-8 py-4"
            >
              Start Building Free
            </Link>
            
            <a
              href="#features"
              className="btn-secondary text-lg px-8 py-4"
            >
              Learn More
            </a>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-surface rounded-xl p-8 border border-border shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <AnimatedCounter 
                    target={10000} 
                    suffix="+"
                    className="text-3xl font-bold text-accent mb-2"
                  />
                  <div className="text-text-muted">Forms Created</div>
                </div>
                <div>
                  <AnimatedCounter 
                    target={50} 
                    suffix="+"
                    className="text-3xl font-bold text-accent mb-2"
                  />
                  <div className="text-text-muted">Field Types</div>
                </div>
                <div>
                  <AnimatedCounter 
                    target={99.9} 
                    suffix="%"
                    className="text-3xl font-bold text-accent mb-2"
                  />
                  <div className="text-text-muted">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-text-muted" />
      </div>
    </section>
  );
};

export default HeroSection;
