
import React from 'react';
import { AppRoute } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeRoute: AppRoute;
  setRoute: (route: AppRoute) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeRoute, setRoute }) => {
  const navItems = [
    { id: AppRoute.HOME, label: '探索', icon: 'explore' },
    { id: AppRoute.IDENTIFY, label: '識別', icon: 'qr_code_scanner' },
    { id: AppRoute.ENCYCLOPEDIA, label: '百科', icon: 'menu_book' },
    { id: AppRoute.PROFILE, label: '我的', icon: 'person' },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {children}
      </main>
      
      <nav className="fixed bottom-0 w-full bg-white/90 dark:bg-card-dark/95 backdrop-blur-lg border-t border-gray-100 dark:border-white/5 z-50 pb-6 pt-2 px-6 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setRoute(item.id)}
              className="flex flex-col items-center justify-center gap-1 group w-14"
            >
              <div className={`w-12 h-8 rounded-full flex items-center justify-center transition-colors ${
                activeRoute === item.id ? 'bg-primary/20' : 'bg-transparent group-hover:bg-gray-100 dark:group-hover:bg-white/5'
              }`}>
                <span className={`material-symbols-outlined text-[24px] ${
                  activeRoute === item.id ? 'text-primary-content dark:text-primary fill-1' : 'text-text-sub-light dark:text-text-sub-dark group-hover:text-primary'
                }`} style={{ fontVariationSettings: activeRoute === item.id ? "'FILL' 1" : "" }}>
                  {item.icon}
                </span>
              </div>
              <span className={`text-[10px] font-bold ${
                activeRoute === item.id ? 'text-primary-content dark:text-primary' : 'text-text-sub-light dark:text-text-sub-dark group-hover:text-primary'
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
