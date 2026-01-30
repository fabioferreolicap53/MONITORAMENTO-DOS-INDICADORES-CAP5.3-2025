import React from 'react';
import { UnitData, Indicator } from '../types';
import { Trophy, Medal, ExternalLink, TrendingUp, Target } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, YAxis } from 'recharts';

interface HighlightCardProps {
  units: UnitData[];
  indicator: Indicator;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ units, indicator }) => {
  const top3 = units.slice(0, 3);
  const topUnit = top3[0];
  const isSemestral = indicator.periodicidade === 'Semestral';
  const isQuadrimestral = indicator.periodicidade === 'QUADRIMESTRAL';

  // Calculate average based on periodicidade
  const calculateMetrics = (u: UnitData) => {
    let rawSlice: (number | null)[] = [];
    if (isSemestral) {
      rawSlice = u.values.slice(6, 12);
    } else if (isQuadrimestral) {
      rawSlice = u.values.slice(8, 12);
    } else {
      rawSlice = u.values.slice(0, 12);
    }
    const relevantSlice = rawSlice.filter((v): v is number => v !== null);

    const avgScore = relevantSlice.length > 0 ? relevantSlice.reduce((sum, val) => sum + val, 0) / relevantSlice.length : 0;

    // Growth: Dec vs start of period (ignore if null)
    let startIndex = 0;
    if (isSemestral) startIndex = 6;
    else if (isQuadrimestral) startIndex = 8;

    const startVal = u.values[startIndex] ?? 0;
    const endVal = u.values[11] ?? 0;
    const growth = endVal - (startVal as number);

    const yearlyValues = u.values.filter((v): v is number => v !== null);
    const avgYear = yearlyValues.length > 0 ? yearlyValues.reduce((a, b) => a + b, 0) / yearlyValues.length : 0;

    return { avgScore, growth, avgYear, relevantSlice: rawSlice.map(v => v ?? 0) };
  };

  const mainMetrics = calculateMetrics(topUnit);
  const chartData = mainMetrics.relevantSlice.map((val, idx) => {
    let i = idx;
    if (isSemestral) i += 6;
    else if (isQuadrimestral) i += 8;
    return { i, val };
  });

  return (
    <section className="bg-primary text-white rounded-xl shadow-xl p-6 flex flex-col relative overflow-hidden h-full border border-white/10">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-10 pointer-events-none">
        <svg width="240" height="240" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      <div className="flex-1 flex flex-col justify-between gap-3">
        {/* Main 1st Place Highlight */}
        <div>
          <div className="flex items-center gap-2 mb-2 text-yellow-200 uppercase text-[10px] font-black tracking-widest">
            <div className="bg-yellow-500 p-1 rounded-md shadow-[0_0_15px_rgba(234,179,8,0.5)]">
              <Trophy size={16} className="text-white" />
            </div>
            <span className="drop-shadow-md">LÍDER DO TERRITÓRIO</span>
            <span className="text-[9px] bg-yellow-500 text-white px-2 py-0.5 rounded-full border border-white/20 ml-auto font-black shadow-lg">1º LUGAR</span>
          </div>

          <h4 className="text-4xl font-black mb-1 tracking-tighter truncate drop-shadow-lg text-white">{topUnit.name}</h4>

          <div className="bg-gradient-to-br from-white/20 to-white/5 p-4 rounded-2xl backdrop-blur-md border border-white/20 relative overflow-hidden group transition-all hover:bg-white/15 mt-3 shadow-2xl ring-1 ring-white/10">
            <div className="flex justify-between items-start mb-2">
              <div className="text-[10px] text-yellow-100 uppercase font-black tracking-wider opacity-90">Média Performance</div>
              <div className="text-[10px] text-green-300 font-black flex items-center bg-green-500/20 px-2 py-1 rounded-full border border-green-500/30">
                <TrendingUp size={10} className="mr-1" /> +{mainMetrics.growth.toFixed(2)}pp
              </div>
            </div>

            <div className="text-5xl font-black mb-2 tracking-tighter text-white">{mainMetrics.avgScore.toFixed(2).replace('.', ',')}%</div>

            <div className="h-20 mt-2 -mx-2 opacity-90 group-hover:opacity-100 transition-opacity">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <Line type="monotone" dataKey="val" stroke="#facc15" strokeWidth={4} dot={false} />
                  <YAxis domain={[0, 100]} hide />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 2nd and 3rd Places */}
        <div className="space-y-3.5">
          <h5 className="text-[9px] text-blue-300 uppercase font-black tracking-[0.2em] mb-4 border-b border-white/10 pb-2">SEGURADORES DE PERFORMANCE</h5>

          {top3.slice(1).map((u, idx) => {
            const metrics = calculateMetrics(u);
            const isSecond = idx === 0;

            const tierStyles = isSecond
              ? {
                bg: 'bg-gradient-to-r from-slate-400/20 to-transparent',
                border: 'border-slate-400/30',
                iconBg: 'bg-slate-400/30 text-slate-100',
                bar: 'bg-slate-200',
                text: 'text-white',
                subtext: 'text-slate-300',
                shadow: 'shadow-lg',
                opacity: 'opacity-100',
                scale: 'scale-100'
              }
              : {
                bg: 'bg-gradient-to-r from-orange-800/10 to-transparent',
                border: 'border-orange-800/20',
                iconBg: 'bg-orange-800/20 text-orange-200/70',
                bar: 'bg-orange-600/60',
                text: 'text-white/80',
                subtext: 'text-orange-300/60',
                shadow: 'shadow-sm',
                opacity: 'opacity-80',
                scale: 'scale-95'
              };

            return (
              <div
                key={u.id}
                className={`
                  p-4 rounded-xl border flex items-center gap-4 group/entry transition-all duration-300
                  ${tierStyles.bg} ${tierStyles.border} ${tierStyles.shadow} ${tierStyles.opacity} ${tierStyles.scale}
                  hover:bg-white/10 hover:opacity-100 hover:scale-[1.02]
                `}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border border-white/10 font-black ${tierStyles.iconBg}`}>
                  {isSecond ? <Medal size={20} /> : <Medal size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[11px] font-black uppercase truncate ${tierStyles.text}`}>{u.name}</span>
                    <span className={`text-[11px] font-black ${tierStyles.text}`}>{metrics.avgScore.toFixed(1).replace('.', ',')}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${tierStyles.bar}`}
                      style={{ width: `${metrics.avgScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1.5 items-center">
                    <span className={`text-[9px] uppercase font-bold tracking-tighter ${tierStyles.subtext}`}>{isSecond ? '2º LUGAR' : '3º LUGAR'}</span>
                    <span className="text-[9px] text-green-400 font-black flex items-center gap-1">
                      <TrendingUp size={10} /> +{metrics.growth.toFixed(1)}pp
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        <div className="text-[9px] text-blue-300/60 uppercase tracking-widest font-bold text-center border-t border-white/5 pt-3 flex flex-col gap-1">
          <span>ANÁLISE DE DADOS CAP5.3 • {top3.length} MELHORES UNIDADES</span>
          <span className="normal-case font-medium opacity-80 text-[8px]">* Ranking baseado na {indicator.periodicidade === 'Semestral' ? 'média dos últimos 6 meses' : indicator.periodicidade === 'QUADRIMESTRAL' ? 'média do 3º quadrimestre' : 'média mensal acumulada'} de 2025.</span>
        </div>
      </div>
    </section>
  );
};

export default HighlightCard;