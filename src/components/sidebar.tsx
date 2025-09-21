import { useState } from 'react';
import { Home, Upload, Megaphone, BarChart3, Users, User, Palette } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function Sidebar({ activeSection, onSectionChange, isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'upload', label: 'Upload Product', icon: Upload },
    { id: 'ads', label: 'Create Ad', icon: Megaphone },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className={`
      w-64 bg-gradient-to-b from-purple-600 via-pink-500 to-orange-400 text-white h-screen p-6 
      fixed left-0 top-0 z-50 transform transition-transform duration-300 ease-in-out
      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Palette className="w-8 h-8 mr-3" />
          <h1 className="text-xl font-bold">ArtisanHub</h1>
        </div>
        
        {/* Close button for mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden p-1 rounded-md hover:bg-white/20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start text-left ${
                activeSection === item.id 
                  ? 'bg-white/20 text-white hover:bg-white/30' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}