import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MonitoringView from './views/MonitoringView';
import { INDICATORS } from './constants';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [activeView, setActiveView] = React.useState(() => {
    const saved = localStorage.getItem('activeView');
    return saved !== null ? saved : 'monitoring';
  });

  React.useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  React.useEffect(() => {
    localStorage.setItem('activeView', activeView);
  }, [activeView]);

  const currentIndicator = INDICATORS.find(ind => ind.id === activeView) || INDICATORS[0];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary/20 flex overflow-x-hidden">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out flex flex-col min-w-0 h-screen overflow-hidden ${sidebarOpen ? 'md:pl-60 pl-14' : 'pl-14'}`}
      >
        <Header indicator={currentIndicator} />

        <main className="w-full mx-auto p-2 sm:p-3 md:p-4 pb-0 flex-1 min-h-0">
          <MonitoringView indicator={currentIndicator} />
        </main>

        <footer className="w-full mx-auto p-2 text-center text-slate-400 text-[10px] shrink-0 border-t border-slate-100 bg-white/50 backdrop-blur-sm">
          <p>&copy; 2025 MONITORAMENTO CAP5.3 - Painel Administrativo.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;