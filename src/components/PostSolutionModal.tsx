import React, { useState } from 'react';
import { X, Send, Pin, MapIcon } from 'lucide-react';
import { CategoryType, StickyNote, MapPin } from '../types';

interface PostSolutionModalProps {
  onClose: () => void;
  onSubmit: (newNote: StickyNote, newPin: MapPin) => void;
}

export default function PostSolutionModal({ onClose, onSubmit }: PostSolutionModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryType>('ENVIRONMENT');
  
  // Custom slider coordinate placement picker
  const [xCoord, setXCoord] = useState(50);
  const [yCoord, setYCoord] = useState(50);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const id = `user-sol-${Date.now()}`;
    
    // Choose appropriate styling based on category
    let bgColor = '#FFEBEE';
    let textColor = '#880E4F';
    let tagBg = '#FFCDD2';
    let tagText = '#B71C1C';
    let pinColor = '#E53935';

    if (category === 'EDUCATION') {
      bgColor = '#E3F2FD';
      textColor = '#0D47A1';
      tagBg = '#BBDEFB';
      tagText = '#1565C0';
      pinColor = '#1E88E5';
    } else if (category === 'INFRASTRUCTURE') {
      bgColor = '#F1F8E9';
      textColor = '#33691E';
      tagBg = '#DCEDC8';
      tagText = '#558B2F';
      pinColor = '#43A047';
    } else if (category === 'SOCIAL') {
      bgColor = '#FFF3E0';
      textColor = '#E65100';
      tagBg = '#FFE0B2';
      tagText = '#EF6C00';
      pinColor = '#FB8C00';
    }

    // Gentle random tilt angles for tactile sticky note feel
    const randomRotation = parseFloat((Math.random() * 4 - 2).toFixed(1));

    const newNote: StickyNote = {
      id,
      category,
      title: title.trim(),
      description: description.trim(),
      comments: 0,
      views: '1',
      bgColor,
      textColor,
      tagBg,
      tagText,
      rotation: randomRotation === 0 ? 1 : randomRotation,
      pinColor,
      dateCreated: new Date().toISOString()
    };

    const newPin: MapPin = {
      id: `pin-${id}`,
      type: category === 'ENVIRONMENT' ? 'warning' : category === 'EDUCATION' ? 'school' : category === 'INFRASTRUCTURE' ? 'park' : 'other',
      label: title.trim().substring(0, 15) + (title.trim().length > 15 ? '...' : ''),
      x: xCoord,
      y: yCoord,
      description: `${description.trim()} - Bandung coordinate drop marker set by user.`
    };

    onSubmit(newNote, newPin);
  };

  return (
    <div className="fixed inset-0 bg-neutral-950/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-lg shadow-2xl border border-outline-variant overflow-hidden transform transition-all duration-300 font-sans my-8">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-outline-variant/45 flex justify-between items-center bg-surface">
          <div>
            <h3 className="font-display font-bold text-base text-on-surface flex items-center gap-2">
              <Pin size={18} className="text-primary rotate-45" />
              <span>Post a Community Solution</span>
            </h3>
            <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">Assemble a new initiative card on whiteboard and Bandung map</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-surface-container bg-white border border-outline-variant/30 text-on-surface-variant transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Form content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="font-display text-xs font-semibold text-on-surface block">
              Solution Title / Initiative Name
            </label>
            <input 
              type="text"
              required
              maxLength={36}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Mangrove Planting Muara Baru, Solar street light"
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-hidden focus:ring-2 focus:ring-primary focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-display text-xs font-semibold text-on-surface-variant block">
                Category
              </label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg text-xs py-3 px-3 text-on-surface font-semibold appearance-none outline-hidden cursor-pointer"
              >
                <option value="ENVIRONMENT">Environment</option>
                <option value="EDUCATION">Education</option>
                <option value="INFRASTRUCTURE">Infrastructure</option>
                <option value="SOCIAL">Social Program</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-display text-xs font-semibold text-on-surface-variant block">
                Deployment Anchor
              </label>
              <div className="flex items-center gap-2 py-2 px-3 bg-primary/5 rounded-lg border border-primary/20 text-xs text-primary font-bold min-h-[42px]">
                <MapIcon size={14} />
                <span>Bandung City Mapping</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-display text-xs font-semibold text-on-surface block">
              Strategic Description
            </label>
            <textarea 
              rows={3}
              required
              maxLength={220}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain briefly. Provide context: Who is it for? Where are you meeting? Do you need tools, food, or coding expertise?"
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-hidden focus:ring-2 focus:ring-primary focus:bg-white transition-all resize-none"
            />
          </div>

          {/* Coordinate placement builder */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3.5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-on-surface font-display flex items-center gap-1.5">
                <MapIcon size={14} className="text-primary" /> Anchor coordinates on Bandung map
              </span>
              <span className="text-[10px] text-primary font-bold bg-primary/5 py-0.5 px-2 rounded-md">
                X: {xCoord}% | Y: {yCoord}%
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-on-surface-variant font-bold uppercase">
                  <span>Bandung Barat</span>
                  <span>Bandung Timur</span>
                </div>
                <input 
                  type="range" 
                  min="15" 
                  max="85"
                  value={xCoord}
                  onChange={(e) => setXCoord(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-on-surface-variant font-bold uppercase">
                  <span>Bandung Utara</span>
                  <span>Bandung Selatan</span>
                </div>
                <input 
                  type="range" 
                  min="15" 
                  max="85"
                  value={yCoord}
                  onChange={(e) => setYCoord(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
            <p className="text-[10px] text-on-surface-variant/70 italic">
              Slide values to designate where your pin aligns. Visual drop marker instantly translates onto the main map.
            </p>
          </div>

          {/* Actions button */}
          <div className="flex gap-2.5 pt-2">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 border border-slate-300 hover:bg-slate-50 text-on-surface font-semibold text-xs py-3 rounded-lg transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-[2] bg-primary hover:bg-primary-container text-white font-bold text-xs py-3 rounded-lg shadow-lg shadow-primary/20 hover:translate-y-[-1px] transition-transform flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send size={13} />
              <span>Broadcast Solutions</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
