import React from 'react';
import { Indicator } from '../types';
import { BarChart3 } from 'lucide-react';

interface HeaderProps {
  indicator: Indicator;
}

const Header: React.FC<HeaderProps> = ({ indicator }) => {
  return (
    <header className="bg-primary text-white py-2 px-6 shadow-lg sticky top-0 z-50">
      <div className="w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-start md:items-center gap-3 mb-1">
            <h1 className="text-lg md:text-xl font-bold uppercase tracking-tight leading-tight">
              {indicator.label}
            </h1>
          </div>
          <p className="text-blue-200 text-sm flex items-center gap-2">
            <BarChart3 size={16} />
            Painel de Performance - Visão Geral
          </p>
        </div>

        <div className="flex items-center gap-x-12 min-w-fit">
          <div className="text-center">
            <div className="text-blue-300 text-[10px] uppercase tracking-widest mb-0.5 opacity-80">Periodicidade</div>
            <div className="font-black text-sm uppercase">{indicator.periodicidade}</div>
          </div>
          <div className="text-center">
            <div className="text-blue-300 text-[10px] uppercase tracking-widest mb-0.5 opacity-80">Meta 2025</div>
            <div className="font-black text-sm uppercase">{indicator.meta}</div>
          </div>
          <div className="text-center">
            <div className="text-blue-300 text-[10px] uppercase tracking-widest mb-0.5 opacity-80">Fonte</div>
            <div className="font-black text-[11px] uppercase">{indicator.fonte}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;