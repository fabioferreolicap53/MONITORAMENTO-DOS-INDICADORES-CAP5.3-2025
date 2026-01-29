import React, { useState } from 'react';
import { UnitData, Month, PerformanceLevel } from '../types';
import { MONTHS } from '../constants';
import { Grid, Star } from 'lucide-react';

interface HeatmapProps {
  data: UnitData[];
}

const getPerformanceLevel = (value: number | null): PerformanceLevel | 'NONE' => {
  if (value === null) return 'NONE';
  if (value < 50) return PerformanceLevel.LOW;
  if (value <= 80) return PerformanceLevel.MEDIUM;
  return PerformanceLevel.HIGH;
};

const getCellColor = (value: number | null, isPinned: boolean) => {
  if (value === null) return 'bg-slate-50 text-slate-300 italic';
  const level = getPerformanceLevel(value);
  if (level === 'NONE') return 'bg-slate-50 text-slate-300 italic';

  switch (level) {
    case PerformanceLevel.LOW:
      return 'bg-red-100 text-red-800';
    case PerformanceLevel.MEDIUM:
      return 'bg-yellow-100 text-yellow-800';
    case PerformanceLevel.HIGH:
      return 'bg-green-200 text-green-900';
  }
};

const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string | number | null>(null);

  const toggleHighlight = (id: string | number) => {
    setSelectedUnitId(selectedUnitId === id ? null : id);
  };
  return (
    <section id="heatmap-section" className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-3 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 bg-gradient-to-r from-slate-50 to-white">
        <h2 className="font-black flex items-center gap-2 text-slate-800">
          <Grid size={24} className="text-primary" />
          <span className="text-xl tracking-tight uppercase tracking-tight">MAPA DE CALOR DE DESEMPENHO 2025 (TODAS AS UNIDADES)</span>
        </h2>
        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <span>Baixo (&lt;50%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <span>Médio (50-80%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            <span>Alto (&gt;80%)</span>
          </div>
        </div>
      </div>

      <div className="relative flex-1 min-h-0 overflow-x-auto custom-scrollbar">
        <div className="h-full overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse table-fixed min-w-[1200px]">
            <thead className="sticky top-0 z-30 shadow-sm">
              <tr className="bg-primary text-[13px] font-black text-white uppercase tracking-wider">
                <th className="p-3 border-r border-white/10 sticky left-0 bg-primary z-40 w-48 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  № / Unidade
                </th>
                {MONTHS.map((month) => (
                  <th key={month.short} className="p-3 text-center w-20 border-r border-white/10">
                    {month.short}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[13px] font-medium">
              {data.map((unit, index) => (
                <tr
                  key={unit.id}
                  className={`
                    border-b border-slate-50 group transition-all duration-300 relative
                    ${unit.isPinned ? 'sticky top-[37px] z-20 shadow-md ring-2 ring-primary ring-inset' : ''}
                    ${selectedUnitId === unit.id ? 'bg-primary/15 ring-2 ring-primary z-10 shadow-xl scale-[1.002]' : 'hover:bg-slate-50'}
                  `}
                >
                  <td className={`
                    p-3 border-r border-slate-300 sticky left-0 z-10 text-sm shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]
                    ${unit.isPinned ? 'bg-blue-50 text-primary font-black' : (selectedUnitId === unit.id ? 'bg-blue-50 text-primary font-black' : 'bg-white text-slate-800 font-bold')}
                  `}>
                    {/* Selected Indicator Bar */}
                    {selectedUnitId === unit.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary animate-in slide-in-from-left-2 duration-300" />
                    )}
                    <div
                      className="flex items-center gap-2 cursor-pointer select-none group/unit"
                      onClick={() => toggleHighlight(unit.id)}
                    >
                      <span className={`
                        text-[10px] px-2 py-0.5 rounded font-bold transition-transform group-hover/unit:scale-110
                        ${unit.isPinned ? 'bg-primary text-white' : (selectedUnitId === unit.id ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600')}
                      `}>
                        {unit.isPinned ? unit.id : index}
                      </span>
                      <span className={`uppercase tracking-tight transition-colors ${selectedUnitId === unit.id ? 'text-primary font-black' : 'group-hover/unit:text-primary font-bold'}`}>
                        {unit.name}
                      </span>
                      {unit.isPinned && <Star size={12} fill="currentColor" className="text-primary ml-auto" />}
                    </div>
                  </td>
                  {unit.values.map((val, mIndex) => {
                    // Alternate background intensity for variety/visual checking like in image
                    // This is purely for aesthetic matching of the specific sample image provided
                    let colorClass = getCellColor(val, unit.isPinned);
                    // Simulate the visual variance in the image (some greens are darker)
                    if (val > 90) colorClass = 'bg-green-300 text-green-950 font-semibold';

                    return (
                      <td
                        key={mIndex}
                        className={`
                          p-2 text-center border-r border-white/50 transition-all duration-300 cursor-default
                          ${selectedUnitId === unit.id ? 'ring-1 ring-primary min-w-[100px] bg-opacity-70 font-black text-sm' : 'hover:scale-105 hover:z-10 hover:shadow-lg'}
                          ${colorClass}
                        `}
                      >
                        <span className={selectedUnitId === unit.id ? 'drop-shadow-sm' : ''}>
                          {val !== null ? `${val.toFixed(2).replace('.', ',')}%` : 'NA'}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-2 px-4 bg-slate-50 text-[10px] text-slate-400 italic flex justify-between border-t border-slate-100">
        <span>* Use o scroll lateral para os meses e o vertical para percorrer todas as unidades.</span>
        <span className="font-bold text-primary">CAP5.3 FIXO NO TOPO</span>
      </div>
    </section>
  );
};

export default Heatmap;