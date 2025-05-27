
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../contexts/FormContext';
import { Menu, Sun } from 'lucide-react';

const Header = () => {
  const { state, dispatch } = useForm();

  return (
    <header className="bg-surface border-b fixed z-[9999] w-full border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-2xl font-bold text-text-primary">OneForm</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-text-primary hover:text-accent transition-colors">
              Home
            </Link>
            <Link to="/builder" className="text-text-primary hover:text-accent transition-colors">
              Builder
            </Link>
            <a href="#features" className="text-text-primary hover:text-accent transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-text-primary hover:text-accent transition-colors">
              Pricing
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
              className="p-2 rounded-lg hover:bg-border transition-colors"
              aria-label="Toggle theme"
            >
              <Sun className="w-5 h-5 text-text-primary" />
            </button>
            
            <Link
              to="/builder"
              className="btn-primary"
            >
              Get Started
            </Link>

            <button className="md:hidden p-2 rounded-lg hover:bg-border transition-colors">
              <Menu className="w-5 h-5 text-text-primary" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
