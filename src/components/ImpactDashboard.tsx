import React, { useState } from 'react';
import { BarChart3, Calendar, Download, FileText, TrendingUp } from 'lucide-react';
import { SocialImpactStats, ChartData } from '../types';

interface ImpactDashboardProps {
  stats: SocialImpactStats;
  chartData: ChartData[];
  onNotification: (msg: string) => void;
}

export default function ImpactDashboard({ stats, chartData, onNotification }: ImpactDashboardProps) {
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [hoveredDonutIndex, setHoveredDonutIndex] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedMonthRange, setSelectedMonthRange] = useState('First Half');

  // Trigger Excel/PDF Export Mock
  const handleExportReport = () => {
    setIsExporting(true);
    onNotification("Preparing civic impact dossier: 'SUSI-Impact-Report-2026.pdf'.");
    setTimeout(() => {
      setIsExporting(false);
      onNotification("Dossier generated successfully. Downloading to your device...");
      
      // Simulate file download
      const element = document.createElement("a");
      const file = new Blob([`Suara Solusi Indonesia - Impact Dashboard Summary\n\nActive Volunteers: ${stats.activeVolunteers}\nSkill Donations: ${stats.skillDonations}\nProjects Completed: ${stats.projectsDone}\nTotal Hours: ${stats.totalHours}\nSolutions Solved: ${stats.solutionsSolved}\nGenerated Live: ${new Date().toLocaleDateString()}`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "SUSI_Community_Social_Impact_Report.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1500);
  };

  // Convert raw stats values to readable k format
  const formatK = (val: number): string => {
    if (val >= 1000) {
      return (val / 1000).toFixed(1) + 'k';
    }
    return val.toString();
  };

  const donutCategories = [
    { label: 'Environment', value: '45%', count: 203, color: 'bg-primary', stroke: '#3525cd', strokeDashoffset: '0' },
    { label: 'Education', value: '30%', count: 135, color: 'bg-orange-400', stroke: '#ff9800', strokeDashoffset: '169.5' }, // offsets for stroke-dasharray="376.8" (45% environment ≈ 169.5 offset)
    { label: 'Others', value: '25%', count: 112, color: 'bg-slate-300', stroke: '#d1d5db', strokeDashoffset: '282.6' }     // 75% offset (45%+30%=75% of 376.8 ≈ 282.6 offset)
  ];

  return (
    <section className="bg-surface-container-low rounded-lg p-5 md:p-7 space-y-6 border border-outline-variant/50 font-sans" id="dashboard">
      {/* Dashboard Top bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="font-display font-bold text-xl text-on-surface flex items-center gap-2">
            <BarChart3 size={20} className="text-primary" />
            <span>Your Social Impact</span>
          </h3>
          <p className="text-xs text-on-surface-variant font-medium">Real-time contribution metrics of SUSI Community network</p>
        </div>

        {/* Filters and export button */}
        <div className="flex gap-2.5 w-full sm:w-auto">
          <div className="relative shrink-0 flex-1 sm:flex-none">
            <select 
              value={selectedMonthRange}
              onChange={(e) => {
                setSelectedMonthRange(e.target.value);
                onNotification(`Impact charts filtered to timeframe: ${e.target.value}`);
              }}
              className="w-full bg-white hover:bg-slate-50 transition-colors text-xs py-2 px-3.5 pr-8 rounded-lg border border-outline-variant/60 font-semibold text-on-surface appearance-none outline-hidden cursor-pointer"
            >
              <option value="First Half">Monthly (Jan - Jun)</option>
              <option value="Second Half" disabled>Q3 Outlook (Jul - Sep)</option>
            </select>
            <Calendar size={13} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
          </div>

          <button 
            type="button"
            onClick={handleExportReport}
            disabled={isExporting}
            className="bg-primary hover:bg-primary-container disabled:bg-primary/60 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            {isExporting ? (
              <>
                <FileText size={13} className="animate-pulse" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download size={13} />
                <span>Export Report</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* KPI Stats widgets grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white p-4 rounded-lg border border-outline-variant/45 text-center space-y-1 hover:shadow-xs transition-shadow">
          <span className="text-primary font-display font-black text-2xl block">
            {formatK(stats.activeVolunteers)}
          </span>
          <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Active Volunteers</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-outline-variant/45 text-center space-y-1 hover:shadow-xs transition-shadow">
          <span className="text-primary font-display font-black text-2xl block">
            {formatK(stats.skillDonations)}
          </span>
          <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Skill Donations</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-outline-variant/45 text-center space-y-1 hover:shadow-xs transition-shadow">
          <span className="text-primary font-display font-black text-2xl block">
            {stats.projectsDone}
          </span>
          <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Projects Completed</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-outline-variant/45 text-center space-y-1 hover:shadow-xs transition-shadow">
          <span className="text-primary font-display font-black text-2xl block">
            {formatK(stats.totalHours)}
          </span>
          <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Total Impact Hours</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-outline-variant/45 text-center space-y-1 hover:shadow-xs transition-shadow">
          <span className="text-primary font-display font-black text-2xl block">
            {stats.solutionsSolved}
          </span>
          <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Solutions Sourced</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-outline-variant/45 text-center space-y-1 hover:shadow-xs transition-shadow">
          <span className="text-primary font-display font-black text-2xl block">
            {stats.peopleReached}
          </span>
          <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">People Reached</span>
        </div>
      </div>

      {/* Interactive Charts Section: Columns Bar + Donut Ring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Bar Chart: Contribution hours */}
        <div className="lg:col-span-2 bg-white p-5 rounded-lg border border-outline-variant/45 space-y-4 relative">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-display font-bold text-sm text-on-surface">Contribution Hours Over Time</h4>
              <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">Summed participant hours within active solutions</p>
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant px-2 py-0.5 bg-surface-container rounded-md">
              Last 6 Months
            </span>
          </div>

          <div className="relative h-44 flex items-end justify-between gap-3 px-2 pt-6">
            {/* Tooltip display */}
            {hoveredBarIndex !== null && (
              <div className="absolute top-1 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] font-bold py-1 px-3 rounded-md shadow-md animate-in fade-in duration-100 flex items-center gap-1.5 z-10">
                <TrendingUp size={11} className="text-primary-container" />
                <span>
                  {chartData[hoveredBarIndex].month}: <b>{chartData[hoveredBarIndex].hours.toLocaleString()} jam</b> kontribusi
                </span>
              </div>
            )}

            {/* Render Bars using reactive div styles */}
            {chartData.map((data, index) => {
              // Calculate percent compared to max hours (9800)
              const heightPercent = `${(data.hours / 9800) * 100}%`;
              const isHovered = hoveredBarIndex === index;

              return (
                <div 
                  key={data.month}
                  className="flex-1 flex flex-col justify-end h-full group"
                  onMouseEnter={() => setHoveredBarIndex(index)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                >
                  {/* Visual column core with animations */}
                  <div className="w-full bg-primary/10 rounded-t-md h-full relative cursor-pointer overflow-hidden">
                    <div 
                      className={`
                        absolute inset-x-0 bottom-0 bg-primary rounded-t-md transition-all duration-500 origin-bottom
                        ${isHovered ? 'bg-primary-container h-full scale-[1.02]' : 'h-full'}
                      `}
                      style={{ height: heightPercent }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Month labels footer */}
          <div className="flex justify-between text-[11px] font-semibold text-on-surface-variant px-2 uppercase tracking-wide">
            {chartData.map((data) => (
              <span key={data.month}>{data.month}</span>
            ))}
          </div>
        </div>

        {/* SVG Donut Chart: Project Category spread */}
        <div className="bg-white p-5 rounded-lg border border-outline-variant/45 space-y-4">
          <div>
            <h4 className="font-display font-bold text-sm text-on-surface">Project Distribution</h4>
            <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">Categorized community-centered programs</p>
          </div>

          {/* Donut graphic */}
          <div className="relative w-36 h-36 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              <circle 
                cx="72" 
                cy="72" 
                fill="transparent" 
                r="56" 
                stroke="#f0ecf9" 
                strokeWidth="15" 
              />
              
              {/* Environment Circle slice (45% of 351.8 circumference ≈ 158.3 length) */}
              <circle 
                cx="72" 
                cy="72" 
                fill="transparent" 
                r="56" 
                stroke="#3525cd" 
                strokeWidth="15" 
                strokeDasharray="351.8"
                strokeDashoffset={hoveredDonutIndex === 0 ? '165' : '158.3'}
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredDonutIndex(0)}
                onMouseLeave={() => setHoveredDonutIndex(null)}
              />

              {/* Education Circle slice (30% of 351.8 ≈ 105.5 length) */}
              <circle 
                cx="72" 
                cy="72" 
                fill="transparent" 
                r="56" 
                stroke="#ff9800" 
                strokeWidth="15" 
                strokeDasharray="351.8 351.8"
                strokeDashoffset={hoveredDonutIndex === 1 ? '269' : '263.8'} // 351.8 - 45% offset (158.3) - 30% length (105.5) = 88.0 offset
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredDonutIndex(1)}
                onMouseLeave={() => setHoveredDonutIndex(null)}
              />

              {/* Others Circle slice (25% of 351.8 ≈ 88 length) */}
              <circle 
                cx="72" 
                cy="72" 
                fill="transparent" 
                r="56" 
                stroke="#d1d5db" 
                strokeWidth={hoveredDonutIndex === 2 ? '17' : '15'} 
                strokeDasharray="351.8"
                strokeDashoffset="351.8" 
                className="transition-all duration-300 cursor-pointer opacity-30"
              />
            </svg>

            {/* Centered statistics indicator */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-display font-black text-xl text-on-surface">
                {stats.projectsDone}
              </span>
              <span className="text-[9px] uppercase text-on-surface-variant font-bold tracking-wider">
                Total Projects
              </span>
            </div>
          </div>

          {/* Color definitions index list */}
          <div className="space-y-2 text-xs pt-2">
            {donutCategories.map((cat, idx) => {
              const isHovered = hoveredDonutIndex === idx;
              return (
                <div 
                  key={cat.label} 
                  className={`
                    flex items-center gap-2.5 p-1 rounded-lg transition-colors
                    ${isHovered ? 'bg-slate-50' : ''}
                  `}
                  onMouseEnter={() => setHoveredDonutIndex(idx)}
                  onMouseLeave={() => setHoveredDonutIndex(null)}
                >
                  <div className={`w-3 h-3 rounded-md shrink-0 ${cat.color}`} />
                  <span className="flex-1 font-medium text-on-surface-variant">{cat.label}</span>
                  <span className="font-bold text-on-surface text-[11px] bg-slate-100 py-0.5 px-2 rounded-md">
                    {cat.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
