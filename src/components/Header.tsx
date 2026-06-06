import React, { useState } from 'react';
import { Search, Bell, Grid, Menu, Sparkles, Info, X } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notifications: string[];
  clearNotifications: () => void;
}

export default function Header({ 
  setSidebarOpen, 
  searchQuery, 
  setSearchQuery, 
  notifications,
  clearNotifications
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-30 flex justify-between items-center gap-3 px-4 sm:px-6 h-16 bg-white/95 backdrop-blur-md border-b border-outline-variant/50 shadow-xs">
      {/* Mobile Menu Trigger & Brand Title */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <span className="font-display text-base sm:text-xl font-bold text-primary md:hidden whitespace-nowrap">SUSI Community</span>
      </div>

      {/* Center Search Bar */}
      <div className="hidden sm:flex items-center gap-3 flex-1 max-w-xl mx-2 md:mx-12">
        <div className="relative w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search civic solutions, locations, skills..."
            className="w-full pl-11 pr-12 py-2 bg-surface-container/70 rounded-lg border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary focus:bg-white transition-all font-sans text-sm text-on-surface placeholder:text-on-surface-variant/70 outline-hidden"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant hover:text-primary"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Right Side: Quick Actions, Notification, Avatar */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Help ground info */}
        <span className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-primary/5 text-primary text-xs font-semibold rounded-lg">
          <Sparkles size={13} className="animate-pulse" />
          <span>Active Leader Panel</span>
        </span>

        {/* Notifications and Badges popup */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-all relative"
            aria-label="Toggle notifications"
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-red-600 text-[9px] text-white font-bold flex items-center justify-center rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-[min(20rem,calc(100vw-2rem))] bg-white rounded-lg shadow-xl border border-outline-variant z-50 overflow-hidden transform origin-top-right transition-all">
              <div className="p-4 border-b border-outline-variant/50 bg-surface flex justify-between items-center">
                <span className="font-display font-medium text-sm text-on-surface flex items-center gap-1.5">
                  <Bell size={15} className="text-primary" /> Notifications
                </span>
                {notifications.length > 0 && (
                  <button 
                    onClick={clearNotifications}
                    className="text-xs text-primary font-bold hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-outline-variant/30">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-on-surface-variant/70 text-xs flex flex-col items-center gap-2">
                    <Info size={24} className="text-primary/40" />
                    <span>No new notices today. Be the first to post a community solution!</span>
                  </div>
                ) : (
                  notifications.map((notif, index) => (
                    <div key={index} className="p-3.5 hover:bg-surface-container/30 transition-colors text-xs flex gap-2 w-full">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span className="text-on-surface-variant leading-relaxed">{notif}</span>
                    </div>
                  ))
                )}
              </div>
              <div className="p-3 bg-surface text-center border-t border-outline-variant/30">
                <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                  SUSI Community Hub - Live Bandung
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Dashboard Apps menu popup toggle */}
        <button 
          className="p-2.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant hidden sm:block transition-all"
          onClick={() => {
            alert("Sistem dashboard Suara Solusi Indonesia aktif dan terkoneksi ke jaringan Kota Bandung.");
          }}
          title="System Connection Info"
        >
          <Grid size={18} />
        </button>

        {/* Quick Vertical Divider */}
        <div className="hidden sm:block h-6 w-[1px] bg-outline-variant/40 mx-1" />

        {/* Dynamic User Profile indicator */}
        <div className="flex items-center gap-2 bg-surface p-1 sm:pr-3 rounded-lg border border-outline-variant/40">
          <div className="w-8 h-8 rounded-md overflow-hidden border border-primary shrink-0">
            <img 
              alt="Leader headshot avatar" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd3mWGg8Eh2rPAdC1VRF9uVKHWOAChWLGyV4h2NcMjv6qKKd4lb6RARMSrrHxN_mY48rHCq6yYMQdAe0-nSqSdSvm4CXYJguiwmTXyrRc5SLJ-5geGTVBwr6IcHfeTcyt_tqeBAkj-o75MAa4K5LeAgOwG2UUtZu_nLIswNHE_VEqNg5SZ7dleu76ecBfd3ZbtK4E5OOvTEC-Q4VXpcjff9JscvlJOFhW88Ru89XbbhEjpJuqIi337IQil9onVMBBbu8cc4PfLpNo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="font-display font-bold text-xs text-on-surface">Agung</span>
            <span className="text-[9px] font-medium text-primary uppercase tracking-wider">Community Lead</span>
          </div>
        </div>
      </div>
    </header>
  );
}
