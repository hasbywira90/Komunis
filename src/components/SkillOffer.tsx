import React, { useState } from 'react';
import { HeartHandshake, Plus, Check, ChevronDown } from 'lucide-react';

interface SkillOfferProps {
  userSkills: string[];
  setUserSkills: React.Dispatch<React.SetStateAction<string[]>>;
  onListSkillSubmitted: (commitment: string, availability: string) => void;
}

export default function SkillOffer({ userSkills, setUserSkills, onListSkillSubmitted }: SkillOfferProps) {
  const [availableSkills, setAvailableSkills] = useState<string[]>([
    'Coding', 'Design', 'Teaching', 'Legal', 'Marketing'
  ]);
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customSkillInput, setCustomSkillInput] = useState('');
  
  const [timeCommitment, setTimeCommitment] = useState('2 hrs / week');
  const [availability, setAvailability] = useState('Weekends');

  const toggleSkillSelect = (skill: string) => {
    if (userSkills.includes(skill)) {
      // Don't let users unselect all skills
      if (userSkills.length > 1) {
        setUserSkills(prev => prev.filter(s => s !== skill));
      }
    } else {
      setUserSkills(prev => [...prev, skill]);
    }
  };

  const handleCreateCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = customSkillInput.trim();
    if (!formatted) return;

    // Capitalize first letter
    const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    
    if (!availableSkills.includes(capitalized)) {
      setAvailableSkills(prev => [...prev, capitalized]);
    }
    
    // Auto-select it
    if (!userSkills.includes(capitalized)) {
      setUserSkills(prev => [...prev, capitalized]);
    }

    setCustomSkillInput('');
    setIsAddingCustom(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onListSkillSubmitted(timeCommitment, availability);
  };

  return (
    <div className="bg-white rounded-lg p-5 sm:p-6 shadow-xs border border-outline-variant/50 flex flex-col justify-between min-h-[395px] font-sans" id="donation">
      {/* Title */}
      <div>
        <h3 className="font-display font-bold text-lg text-on-surface flex items-center gap-2">
          <HeartHandshake size={18} className="text-primary" />
          <span>Offer a Skill</span>
        </h3>
        <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">Let local squads know where you can lend hands</p>
      </div>

      <div className="space-y-4 my-2">
        {/* Dynamic Tag Cloud */}
        <div className="space-y-2">
          <label className="font-display text-xs font-semibold text-on-surface flex justify-between items-center">
            <span>What can you contribute?</span>
            <span className="text-[10px] text-primary font-bold">Multi-select enabled</span>
          </label>
          
          <div className="flex flex-wrap gap-2 items-center">
            {availableSkills.map((skill) => {
              const isSelected = userSkills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkillSelect(skill)}
                  className={`
                    px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1
                    ${isSelected 
                      ? 'bg-primary text-white shadow-xs font-bold' 
                      : 'bg-surface-container text-on-surface-variant hover:bg-primary/10 hover:text-primary'
                    }
                  `}
                >
                  {isSelected && <Check size={11} />}
                  <span>{skill}</span>
                </button>
              );
            })}

            {/* Custom tags creator */}
            {isAddingCustom ? (
              <form onSubmit={handleCreateCustomSkill} className="inline-flex items-center gap-1">
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. Writing"
                  value={customSkillInput}
                  onChange={(e) => setCustomSkillInput(e.target.value)}
                  className="px-2.5 py-1 text-xs border border-primary text-on-surface outline-hidden rounded-lg max-w-[110px] font-medium"
                />
                <button 
                  type="submit" 
                  className="p-1.5 bg-primary text-white rounded-lg hover:bg-primary-container"
                >
                  <Check size={10} />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingCustom(true)}
                className="p-1.5 rounded-lg border border-dashed border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors cursor-pointer"
                title="Add a custom capability"
              >
                <Plus size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Commitment Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1 relative">
            <label className="font-display text-xs font-semibold text-on-surface-variant block">
              Time Commitment
            </label>
            <div className="relative">
              <select 
                value={timeCommitment}
                onChange={(e) => setTimeCommitment(e.target.value)}
                className="w-full bg-surface-container border-none rounded-lg text-xs py-2.5 pl-3.5 pr-8 text-on-surface font-semibold appearance-none outline-hidden cursor-pointer"
              >
                <option>2 hrs / week</option>
                <option>4 hrs / week</option>
                <option>8 hrs / week</option>
                <option>One-time project</option>
              </select>
              <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1 relative">
            <label className="font-display text-xs font-semibold text-on-surface-variant block">
              Availability
            </label>
            <div className="relative">
              <select 
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full bg-surface-container border-none rounded-lg text-xs py-2.5 pl-3.5 pr-8 text-on-surface font-semibold appearance-none outline-hidden cursor-pointer"
              >
                <option>Weekends</option>
                <option>Weeknights</option>
                <option>Flexible</option>
              </select>
              <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Trigger Button */}
      <button 
        type="button"
        onClick={handleSubmit}
        className="w-full bg-primary hover:bg-primary-container text-white font-bold text-sm py-3 rounded-lg shadow-lg shadow-primary/20 hover:translate-y-[-1px] transition-transform cursor-pointer mt-4"
      >
        List My Skill Set
      </button>
    </div>
  );
}
