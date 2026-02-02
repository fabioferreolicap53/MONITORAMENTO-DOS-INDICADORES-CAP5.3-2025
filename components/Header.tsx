import React from 'react';
import { Indicator } from '../types';
import { BarChart3 } from 'lucide-react';

interface HeaderProps {
  indicator: Indicator;
}

const Header: React.FC<HeaderProps> = ({ indicator }) => {
  return (
    <header className="bg-primary text-white py-2 px-3 sm:px-4 md:px-6 shadow-lg sticky top-0 z-50">
      <div className="w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-6">
        <div className="w-full md:w-auto">
          <div className="flex items-start md:items-center gap-2 mb-1">
            <h1 className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold uppercase tracking-tight leading-tight line-clamp-2">
              {indicator.label}
            </h1>
          </div>
          <p className="text-blue-200 text-[10px] sm:text-xs md:text-sm flex items-center gap-1.5">
            <BarChart3 size={14} className="shrink-0" />
            <span className="hidden sm:inline">Painel de Performance - Visão Geral</span>
            <span className="sm:hidden">Performance</span>
          </p>
        </div>

        <div className="flex items-center gap-x-3 sm:gap-x-6 md:gap-x-12 w-full md:w-auto justify-between md:justify-end">
          <div className="text-center">
            <div className="text-blue-300 text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-wider mb-0.5 opacity-80">Periodicidade</div>
            <div className="font-black text-[10px] sm:text-xs md:text-sm uppercase">{indicator.periodicidade}</div>
          </div>
          <div className="text-center">
            <div className="text-blue-300 text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-wider mb-0.5 opacity-80">Meta 2025</div>
            <div className="font-black text-[10px] sm:text-xs md:text-sm uppercase">{indicator.meta}</div>
          </div>
          <div className="text-center">
            <div className="text-blue-300 text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-wider mb-0.5 opacity-80">Fonte</div>
            <div className="font-black text-[9px] sm:text-[10px] md:text-[11px] uppercase">{indicator.fonte}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;