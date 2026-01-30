import React, { useState } from 'react';
import Heatmap from '../components/Heatmap';
import RankingList from '../components/RankingList';
import HighlightCard from '../components/HighlightCard';
import { INDICATORS } from '../constants';
import { ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { Indicator } from '../types';

interface MonitoringViewProps {
    indicator: Indicator;
}

const MonitoringView: React.FC<MonitoringViewProps> = ({ indicator }) => {
    const [showBottom, setShowBottom] = useState(false);

    // Dynamic average calculation based on periodicidade
    // Semestral: Jul-Dec (indices 6-11)
    // MENSAL: All year (indices 0-11)
    // Dynamic average calculation based on periodicidade
    // Semestral: Jul-Dec (indices 6-11)
    // MENSAL: All year (indices 0-11)
    const getPerformanceValue = (values: (number | null)[]) => {
        let rawSlice: (number | null)[] = [];
        if (indicator.periodicidade === 'Semestral') {
            rawSlice = values.slice(6, 12);
        } else if (indicator.periodicidade === 'QUADRIMESTRAL') {
            rawSlice = values.slice(8, 12); // Sep-Dec
        } else {
            rawSlice = values.slice(0, 12);
        }
        const relevantValues = rawSlice.filter((v): v is number => v !== null);
        return relevantValues.length > 0 ? relevantValues.reduce((sum, val) => sum + val, 0) / relevantValues.length : 0;
    };

    const sortedByPerf = [...indicator.data].sort((a, b) => {
        const avgA = getPerformanceValue(a.values);
        const avgB = getPerformanceValue(b.values);
        return avgB - avgA;
    });
    const topUnit = sortedByPerf[0];

    return (
        <div className="flex flex-col h-full min-h-0 overflow-hidden">
            {/* Main Content Area - Swaps between Heatmap and Details */}
            <div className="flex-1 min-h-0 flex flex-col transition-all duration-500">
                {!showBottom ? (
                    /* First View: Heatmap takes focus */
                    <div className="flex-1 min-h-0 animate-in fade-in zoom-in-95 duration-500">
                        <Heatmap data={indicator.data} />
                    </div>
                ) : (
                    /* Expanded View: Details take focus */
                    <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6 animate-in slide-in-from-bottom-8 duration-500 items-stretch">
                        {/* Ranking List - Stretch to fill height */}
                        <div className="lg:col-span-2 flex flex-col min-h-0">
                            <RankingList data={sortedByPerf} indicator={indicator} />
                        </div>

                        {/* Highlight Card - Stretch to fill height */}
                        <div className="lg:col-span-1 flex flex-col min-h-0">
                            <HighlightCard units={sortedByPerf} indicator={indicator} />
                        </div>
                    </div>
                )}
            </div>

            {/* Transition/Toggle Control - Fixed at bottom */}
            <div className="flex flex-col items-center pt-3 md:pt-4 shrink-0">
                <div className="w-full h-px bg-slate-200 mb-3 md:mb-4 opacity-50" />
                <button
                    onClick={() => setShowBottom(!showBottom)}
                    className="flex items-center gap-2 md:gap-3 bg-primary text-white border-2 border-white/20 px-4 sm:px-8 md:px-12 py-2 md:py-3 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-[0.1em] md:tracking-[0.2em] shadow-2xl hover:bg-primary-light hover:scale-105 transition-all active:scale-95 group"
                >
                    <Layers size={16} className={`md:w-[18px] md:h-[18px] ${showBottom ? 'animate-pulse' : ''}`} />
                    <span className="hidden sm:inline">{showBottom ? 'Voltar para o Mapa de Calor' : 'Ver Ranking e Unidade em Destaque'}</span>
                    <span className="sm:hidden">{showBottom ? 'Mapa' : 'Ranking'}</span>
                    <div className={`transition-transform duration-500 ${showBottom ? 'rotate-180' : ''}`}>
                        <ChevronDown size={18} className="md:w-[20px] md:h-[20px]" />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default MonitoringView;
