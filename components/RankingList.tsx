import React from 'react';
import { UnitData, Indicator } from '../types';
import { Trophy, Info, Briefcase } from 'lucide-react';

interface RankingListProps {
  data: UnitData[];
  indicator: Indicator;
}

const RankingList: React.FC<RankingListProps> = ({ data, indicator }) => {
  // Dynamic slice based on periodicidade
  const calculateMetrics = (u: UnitData) => {
    const isSemestral = indicator.periodicidade === 'Semestral';
    const isQuadrimestral = indicator.periodicidade === 'QUADRIMESTRAL';

    let rawSlice: (number | null)[] = [];
    if (isSemestral) {
      rawSlice = u.values.slice(6, 12);
    } else if (isQuadrimestral) {
      rawSlice = u.values.slice(8, 12);
    } else {
      rawSlice = u.values.slice(0, 12);
    }
    const filteredSlice = rawSlice.filter((v): v is number => v !== null);

    // Calculate average
    const avg = filteredSlice.length > 0 ? filteredSlice.reduce((sum, val) => sum + val, 0) / filteredSlice.length : 0;

    // Growth: Dec vs start of period (ignore if null)
    let startIndex = 0;
    if (isSemestral) startIndex = 6;
    else if (isQuadrimestral) startIndex = 8;

    const startVal = u.values[startIndex] ?? 0; // Use 0 if null for growth calculation
    const endVal = filteredSlice.length > 0 ? filteredSlice[filteredSlice.length - 1] : 0; // Last value in the slice
    const growth = startVal !== 0 ? ((endVal - startVal) / startVal) * 100 : 0;

    return {
      slice: filteredSlice,
      avg,
      growth,
      startVal,
      endVal,
    };
  };

  // Sort by average of relevant slice descending
  const sortedData = [...data].sort((a, b) => {
    const metricsA = calculateMetrics(a);
    const metricsB = calculateMetrics(b);
    return metricsB.avg - metricsA.avg;
  });

  // Show all units in the list
  const displayData = sortedData;

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">
      <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex justify-between items-center mb-1">
          <h2 className="font-black flex items-center gap-2 text-slate-800">
            <Trophy size={24} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xl tracking-tight uppercase">Ranking de Desempenho 2025</span>
          </h2>
          <span className="text-xs text-slate-400 hidden sm:block font-medium">Arraste para ver a lista completa</span>
        </div>
        <div className="mt-3 bg-slate-50 border border-slate-200/60 rounded-lg p-3 relative overflow-hidden group hover:border-primary/30 transition-colors">
          <div className="flex items-start gap-2 relative z-10">
            <div className="bg-primary/10 p-1 rounded-md shrink-0">
              <Info size={14} className="text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest flex items-center gap-1.5">
                Critério de Avaliação
                <span className="h-px flex-1 bg-slate-200"></span>
              </p>
              <p className="text-[10px] text-slate-600 leading-normal font-medium italic">
                {indicator.criterio}
                A ordenação prioriza o maior percentual médio alcançado.
              </p>
            </div>
          </div>
          {/* Subtle background pattern/decoration */}
          <div className="absolute top-0 right-0 p-1 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <Briefcase size={40} />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
        {displayData.map((unit, index) => {
          const { avg: value } = calculateMetrics(unit);
          const rank = index + 1;
          const isPinned = unit.isPinned;

          return (
            <div key={unit.id} className="group hover:bg-slate-50/50 transition-all duration-200 rounded-lg px-2 py-1">
              <div className="flex items-center gap-4 mb-2">
                <span className="w-8 text-base font-black text-slate-400">
                  {rank.toString().padStart(2, '0')}
                </span>
                <span className="normal-case font-medium opacity-80 text-[8px]">* Ranking baseado na {indicator.periodicidade === 'Semestral' ? 'média dos últimos 6 meses' : indicator.periodicidade === 'QUADRIMESTRAL' ? 'média do 3º quadrimestre' : 'média mensal acumulada'} de 2025.</span>
                <span className="flex-1 font-black text-base text-slate-900 uppercase tracking-tight">
                  {unit.name}
                </span>
                <span className="text-lg font-black text-slate-900 tabular-nums">
                  {value.toFixed(2).replace('.', ',')}%
                </span>
              </div>

              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden mb-4 shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          );
        })}

        <div className="pt-1 pb-0.5 text-center text-[10px] text-slate-400 border-t border-slate-50">
          Visualizando {displayData.length} de {data.length} unidades
        </div>
      </div>
    </section>
  );
};

export default RankingList;