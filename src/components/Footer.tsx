
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold text-text-primary">OneForm</span>
            </Link>
            <p className="text-text-muted mb-4">
              The most powerful form builder for modern teams.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/builder" className="text-text-muted hover:text-accent transition-colors">Form Builder</Link></li>
              <li><a href="#features" className="text-text-muted hover:text-accent transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-text-muted hover:text-accent transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-text-muted hover:text-accent transition-colors">Documentation</a></li>
              <li><a href="#" className="text-text-muted hover:text-accent transition-colors">Help Center</a></li>
              <li><a href="#" className="text-text-muted hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-text-muted hover:text-accent transition-colors">About</a></li>
              <li><a href="#" className="text-text-muted hover:text-accent transition-colors">Blog</a></li>
              <li><a href="#" className="text-text-muted hover:text-accent transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-text-muted">
            © 2025 OneForm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
