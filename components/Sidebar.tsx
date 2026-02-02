import React, { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    BarChart2,
    LayoutDashboard,
    History,
    Settings,
    Baby,
    Search
} from 'lucide-react';
import { sortMenuItems } from '../utils/sorting';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    activeView: string;
    setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, activeView, setActiveView }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Sidebar behavior: effectively open if explicitly toggled OR hovered while collapsed
    const isExpanded = isOpen || isHovered;

    const menuItems = sortMenuItems([
        { id: 'monitoring', label: '1.3 - PERCENTUAL DE CRIANÇAS COM ATÉ 6 MESES EM ALEITAMENTO MATERNO EXCLUSIVO', number: '1.3' },
        { id: 'indicator-1.5', label: '1.5 - PROPORÇÃO DE CRIANÇAS ENTRE 12 E 24 MESES COM PELO MENOS 1 REGISTRO PARAMETRIZADO DE AVALIAÇÃO DO DESENVOLVIMENTO PSICOMOTOR AOS 24 MESES DE VIDA', number: '1.5' },
        { id: 'modal', label: 'MODAL', number: 'M' },
        { id: 'indicator-4.3', label: '4.3 - PROPORÇÃO DE GESTANTES COM ATENDIMENTO ODONTOLÓGICO REALIZADO NOS ÚLTIMOS 12 MESES', number: '4.3' },
        { id: 'indicator-4.5', label: '4.5 - PROPORÇÃO DE PACIENTES TABAGISTAS QUE PASSARAM POR ATENDIMENTO ODONTOLÓGICO INDIVIDUAL, GRUPO OU ATIVIDADE COLETIVA NOS ÚLTIMOS 12 MESES', number: '4.5' },
        { id: 'indicator-3.5', label: '3.5 - PROPORÇÃO DE PESSOAS COM HIPERTENSÃO, QUE TIVERAM CONSULTA E PRESSÃO ARTERIAL AFERIDA NO SEMESTRE', number: '3.5' },
        { id: 'indicator-3.10', label: '3.10 - PERCENTUAL DE MULHERES ENTRE 25 E 64 ANOS COM COLPOCITOLÓGICO REGISTRADO NOS 3 ANOS', number: '3.10' },
        { id: 'indicator-1.7', label: '1.7 - PERCENTUAL DE CRIANÇAS COM 7 OU MAIS CONSULTAS DE PUERICULTURA REALIZADAS NO PRIMEIRO ANO DE VIDA', number: '1.7' },
        { id: 'indicator-1.12', label: '1.12 - PERCENTUAL DE GESTANTES COM PELO MENOS 7 CONSULTAS PRÉ-NATAL (PN) REALIZADAS, SENDO A 1ª ATÉ A 12ª SEMANA DE GESTAÇÃO', number: '1.12' },
        { id: 'indicator-3.2', label: '3.2 - PROPORÇÃO DE PESSOAS COM DIABETES, COM HBA1C < OU = 8% NOS ÚLTIMOS 6 MESES', number: '3.2' },
        { id: 'indicator-3.3', label: '3.3 - PERCENTUAL DE PESSOAS COM DIABETES COM PELO MENOS 01 REGISTRO ANUAL DE AVALIAÇÃO DOS PÉS', number: '3.3' },
    ]);

    const filteredItems = menuItems.filter(item =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.number.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <aside
            onMouseEnter={() => !isOpen && window.innerWidth >= 768 && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                fixed left-0 top-0 h-screen bg-primary text-blue-100 transition-all duration-300 ease-in-out z-[100]
                ${isExpanded && (isOpen || window.innerWidth >= 768) ? 'w-60' : 'w-14'}
                border-r border-white/10 shadow-[4px_0_24px_rgba(0,0,0,0.15)]
                flex flex-col
            `}
        >
            {/* Sidebar Header / Logo */}
            <div className="flex flex-col border-b border-white/10 shrink-0">
                <div className="flex items-center h-16 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg shrink-0">
                            <BarChart2 className="text-white" size={20} />
                        </div>
                        {isExpanded && (
                            <div className="flex flex-col animate-in slide-in-from-left-2 duration-300">
                                <span className="font-black text-white text-sm tracking-tighter uppercase">Indicadores</span>
                                <span className="text-[10px] text-blue-200 font-bold tracking-widest uppercase">CAP 5.3</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Search Bar - Only visible when expanded */}
                {isExpanded && (
                    <div className="px-3 pb-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="relative group/search">
                            <Search
                                size={14}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 group-focus-within/search:text-white transition-colors"
                            />
                            <input
                                type="text"
                                placeholder="BUSCAR INDICADOR..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/10 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-[10px] font-bold text-white placeholder:text-blue-300/50 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/15 transition-all uppercase"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Items */}
            <nav className="p-2 space-y-1 flex-1 overflow-y-auto min-h-0" style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent'
            }}>
                {filteredItems.map((item) => {
                    const isActive = activeView === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveView(item.id)}
                            className={`
                                w-full flex items-center gap-3 p-2.5 rounded-xl transition-all group relative
                                ${isActive ? 'bg-white/20 text-white shadow-lg' : 'hover:bg-white/10 text-blue-100/70'}
                                ${!isExpanded && 'justify-center'}
                            `}
                            title={!isExpanded ? item.label : ''}
                        >
                            {isExpanded ? (
                                <div className="flex items-start gap-3 w-full">
                                    <span className="font-black text-xs bg-white/20 px-1.5 py-0.5 rounded text-white mt-0.5">
                                        {item.number}
                                    </span>
                                    <span className="font-bold text-[11px] leading-tight text-left uppercase break-words animate-in fade-in slide-in-from-left-1 duration-300">
                                        {item.label}
                                    </span>
                                </div>
                            ) : (
                                <span className="font-black text-sm text-white">
                                    {item.number}
                                </span>
                            )}

                            {/* Tooltip for collapsed state */}
                            {!isExpanded && (
                                <div className="absolute left-full ml-4 px-3 py-2 bg-primary-light text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-normal w-48 font-bold z-50 shadow-xl border border-white/10 leading-tight">
                                    {item.label}
                                </div>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Toggle Button */}
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                    setIsHovered(false); // Reset hover state on click
                }}
                className={`
                    absolute bottom-6 -right-4 w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center 
                    border-4 border-primary shadow-xl hover:scale-110 transition-all z-[110]
                    ${isOpen ? 'rotate-0' : 'rotate-0'}
                `}
            >
                {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>

            {/* Footer / User Profile */}
            <div className={`shrink-0 w-full p-2 border-t border-white/10 overflow-hidden bg-white/5 transition-all duration-300`}>
                <div className={`flex items-center gap-2 ${!isExpanded && 'justify-center h-full'}`}>
                    <div className="w-9 h-9 rounded-full bg-white/10 shrink-0 border-2 border-white/20 flex flex-col items-center justify-center font-black text-white leading-none shadow-inner group-hover:bg-white/20 transition-colors">
                        <span className="text-[8px]">CAP</span>
                        <span className="text-xs">5.3</span>
                    </div>
                    {isExpanded && (
                        <div className="flex flex-col overflow-hidden animate-in fade-in slide-in-from-left-2 duration-300">
                            <span className="text-sm font-black text-white truncate text-ellipsis">Gestor CAP 5.3</span>
                            <span className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">Administrador</span>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
