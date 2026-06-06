import React from 'react';
import { 
  Home, 
  MessageSquare, 
  Map, 
  Rocket, 
  HeartHandshake, 
  Sparkles, 
  Users, 
  BarChart3, 
  User, 
  Settings,
  ShieldCheck,
  LogIn,
  X,
  Plus
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onPostClick: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen, onPostClick }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'forum', label: 'Forum Discussion', icon: MessageSquare },
    { id: 'map', label: 'Community Map', icon: Map },
    { id: 'projects', label: 'Projects', icon: Rocket },
    { id: 'donation', label: 'Skill Donation', icon: HeartHandshake },
    { id: 'matchmaking', label: 'Matchmaking', icon: Sparkles },
    { id: 'communities', label: 'Communities', icon: Users },
    { id: 'dashboard', label: 'Impact Dashboard', icon: BarChart3 },
  ];

  const bottomItems = [
    { id: 'admin', label: 'Admin Dashboard', icon: ShieldCheck },
    { id: 'login', label: 'Login', icon: LogIn },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleItemClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav className={`
        fixed left-0 top-0 h-full w-64 z-50 flex flex-col pt-4 pb-5 bg-white border-r border-outline-variant
        transition-transform duration-300 ease-in-out md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header & Close (mobile) */}
        <div className="flex items-center justify-between px-5 mb-6 mt-3">
          <div>
            <h2 className="font-display text-xl font-extrabold text-primary">SUSI Community</h2>
            <p className="font-sans text-xs font-semibold text-on-surface-variant">Impact Platform</p>
          </div>
          <button 
            className="md:hidden p-1.5 hover:bg-surface-container-high rounded-lg text-on-surface-variant"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items list */}
        <div className="flex flex-col gap-0.5 flex-1 overflow-y-auto px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg font-display text-sm font-semibold transition-all duration-200 text-left w-full border-l-4
                  ${isActive 
                    ? 'bg-primary/10 text-primary border-primary font-bold' 
                    : 'border-transparent text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                  }
                `}
              >
                <Icon size={18} className={isActive ? 'text-primary' : 'text-on-surface-variant'} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="border-t border-outline-variant/30 my-4 mx-3" />

          {/* New Mobile action inside Menu */}
          <div className="px-3 py-1 md:hidden">
            <button
              onClick={() => {
                setIsOpen(false);
                onPostClick();
              }}
              className="w-full bg-primary text-white py-3 rounded-lg font-display text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:bg-primary-container transition-all"
            >
              <Plus size={16} />
              <span>Post a Solution</span>
            </button>
          </div>
        </div>

        {/* Bottom utility items */}
        <div className="flex flex-col gap-0.5 px-2 mt-auto">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg font-display text-sm font-semibold transition-all duration-200 text-left w-full border-l-4
                  ${isActive 
                    ? 'bg-primary/10 text-primary border-primary font-bold' 
                    : 'border-transparent text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                  }
                `}
              >
                <Icon size={18} className={isActive ? 'text-primary' : 'text-on-surface-variant'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
