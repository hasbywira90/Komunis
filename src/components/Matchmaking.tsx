import React from 'react';
import { Sparkles, CheckCircle2, UserPlus } from 'lucide-react';
import { MatchmakingItem } from '../types';

interface MatchmakingProps {
  items: MatchmakingItem[];
  setItems: React.Dispatch<React.SetStateAction<MatchmakingItem[]>>;
  userSkills: string[];
  onNotification: (msg: string) => void;
  onIncrementVolunteers: () => void;
}

export default function Matchmaking({ 
  items, 
  setItems, 
  userSkills, 
  onNotification,
  onIncrementVolunteers
}: MatchmakingProps) {

  // Dynamic matching algorithm: recalculates matching score based on user's active skill tag matching!
  const getDynamicMatchPercentage = (item: MatchmakingItem): number => {
    // If user lists exact required skill, map high match (92-98)
    const hasExactSkill = userSkills.some(skill => skill.toLowerCase() === item.requiredSkill.toLowerCase());
    
    if (hasExactSkill) {
      return item.matchPercentage >= 90 ? item.matchPercentage : 94;
    } else {
      // Scale down matches slightly if skill isn't list active
      return Math.max(item.matchPercentage - 25, 45);
    }
  };

  // Recalculates items matching, and sorts them by match percentage descending!
  const processedItems = items.map(item => {
    const recalculatedPercentage = getDynamicMatchPercentage(item);
    let term = item.matchTerm;
    
    // Update matching term message dynamically
    const hasSkill = userSkills.some(s => s.toLowerCase() === item.requiredSkill.toLowerCase());
    if (hasSkill) {
      term = `Excellent Match for your active skill: ${item.requiredSkill}`;
    } else {
      term = `Requires: ${item.requiredSkill} (Add skill to rank up)`;
    }

    return {
      ...item,
      matchPercentage: recalculatedPercentage,
      matchTerm: term
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  const handleJoinGroup = (item: MatchmakingItem) => {
    setItems(prev => prev.map(i => {
      if (i.id === item.id) {
        const nextStatus = !i.joined;
        if (nextStatus) {
          onNotification(`Successfully joined "${item.title}"! You are now connected to their discussion stream.`);
          onIncrementVolunteers(); // Boost stats
        } else {
          onNotification(`Withdrew from "${item.title}".`);
        }
        return { 
          ...i, 
          joined: nextStatus,
          members: nextStatus ? i.members + 1 : i.members - 1
        };
      }
      return i;
    }));
  };

  return (
    <div className="space-y-4 flex flex-col justify-between" id="matchmaking">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-lg text-on-surface flex items-center gap-2">
            <Sparkles size={18} className="text-primary animate-pulse-slow" />
            <span>AI Matchmaking</span>
          </h3>
          <p className="text-[11px] text-on-surface-variant font-medium">Recommending squads matching your leader skill sets</p>
        </div>
        <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-full">
          Auto-update
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 max-h-[395px] overflow-y-auto pr-1">
        {processedItems.map((item) => {
          // Circumference for stroke calculation (28 radius -> 2 * PI * 28 ≈ 175.9)
          const strokeCircumference = 2 * Math.PI * 26;
          const strokeOffset = strokeCircumference - (item.matchPercentage / 100) * strokeCircumference;

          return (
            <div 
              key={item.id} 
              className={`
                bg-white rounded-lg p-4 shadow-xs border border-outline-variant/50 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-md transition-all duration-300 relative overflow-hidden group
                ${item.joined ? 'border-primary/40 bg-linear-to-r from-white to-primary/5' : ''}
              `}
            >
              {/* Highlight ribbon for top match */}
              {item.matchPercentage >= 90 && !item.joined && (
                <div className="absolute top-0 right-0 w-24 h-[3px] bg-primary group-hover:scale-x-110 transition-transform" />
              )}

              {/* Progress Circle Ring indicator */}
              <div className="relative shrink-0 flex items-center justify-center">
                <svg className="w-14 h-14 transform -rotate-90">
                  <circle 
                    className="text-surface-container" 
                    cx="28" 
                    cy="28" 
                    fill="transparent" 
                    r="24" 
                    stroke="currentColor" 
                    strokeWidth="3.5" 
                  />
                  <circle 
                    className={`${item.joined ? 'text-primary' : 'text-primary-container'} transition-all duration-1000`} 
                    cx="28" 
                    cy="28" 
                    fill="transparent" 
                    r="24" 
                    stroke="currentColor" 
                    strokeDasharray={strokeCircumference.toFixed(1)} 
                    strokeDashoffset={strokeOffset.toFixed(1)} 
                    strokeWidth="3.5" 
                  />
                </svg>
                <span className="absolute inset-x-0 text-center font-display font-black text-xs text-on-surface">
                  {item.matchPercentage}%
                </span>
              </div>

              {/* Match Information and badge tags */}
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-bold text-sm text-on-surface line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-[11px] font-sans text-on-surface-variant font-medium mt-0.5 max-w-[280px]">
                  {item.matchTerm}
                </p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant rounded-md text-[8px] font-extrabold uppercase tracking-wide">
                    {item.category}
                  </span>
                  <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant rounded-md text-[8px] font-extrabold uppercase tracking-wide">
                    {item.members} Members
                  </span>
                </div>
              </div>

              {/* Interactive Join buttons */}
              <button 
                onClick={() => handleJoinGroup(item)}
                className={`
                  w-full sm:w-auto px-4 py-2 rounded-lg font-display text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 shrink-0
                  ${item.joined 
                    ? 'bg-primary text-white shadow-xs' 
                    : 'bg-primary/5 text-primary hover:bg-primary hover:text-white'
                  }
                `}
              >
                {item.joined ? (
                  <>
                    <CheckCircle2 size={13} />
                    <span>Joined</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={13} />
                    <span>Join</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
