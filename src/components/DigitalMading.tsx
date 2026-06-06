import React, { useState } from 'react';
import { Pin, MessageSquare, ThumbsUp, Plus, Eye } from 'lucide-react';
import { StickyNote, CategoryType } from '../types';

interface DigitalMadingProps {
  stickyNotes: StickyNote[];
  setStickyNotes: React.Dispatch<React.SetStateAction<StickyNote[]>>;
  onPostClick: () => void;
  searchQuery: string;
  onOpenTopic: (noteId: string) => void;
}

export default function DigitalMading({ stickyNotes, setStickyNotes, onPostClick, searchQuery, onOpenTopic }: DigitalMadingProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'ALL'>('ALL');
  const [lovedNotes, setLovedNotes] = useState<Record<string, boolean>>({});

  const categories: (CategoryType | 'ALL')[] = ['ALL', 'ENVIRONMENT', 'EDUCATION', 'INFRASTRUCTURE', 'SOCIAL'];

  // Handle upvoting/loving notes
  const handleLoveNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLovedNotes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter notes by category AND search query
  const filteredNotes = stickyNotes.filter(note => {
    const matchesCategory = selectedCategory === 'ALL' || note.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getPinColor = (category: CategoryType) => {
    switch (category) {
      case 'ENVIRONMENT': return 'text-red-600';
      case 'EDUCATION': return 'text-blue-600';
      case 'INFRASTRUCTURE': return 'text-emerald-600';
      case 'SOCIAL': return 'text-amber-500';
    }
  };

  const handleOpenTopic = (note: StickyNote) => {
    setStickyNotes(prev => prev.map(n => {
      if (n.id === note.id) {
        let viewNum = parseFloat(n.views);
        if (n.views.includes('k')) {
          viewNum = (viewNum * 1000) + 1;
          return { ...n, views: (viewNum / 1000).toFixed(2) + 'k' };
        } else {
          viewNum = viewNum + 1;
          return { ...n, views: Math.floor(viewNum).toString() };
        }
      }
      return n;
    }));
    onOpenTopic(note.id);
  };

  return (
    <div className="bg-surface-container rounded-lg overflow-hidden shadow-xs flex flex-col h-[520px] border border-outline-variant/40" id="forum">
      {/* Mading Header */}
      <div className="p-5 bg-white flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-outline-variant/40">
        <div>
          <h3 className="font-display font-bold text-lg text-on-surface flex items-center gap-2">
            <Pin size={18} className="text-primary -rotate-45" />
            <span>Digital Mading</span>
              <span className="text-xs py-0.5 px-2 bg-primary/10 text-primary font-semibold rounded-md hidden sm:inline">
              Civic Exchange
            </span>
          </h3>
          <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">Suara Solusi Indonesia Bulletin Board</p>
        </div>

        {/* Categories togglers */}
        <div className="flex flex-wrap gap-1.5 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase transition-all duration-200
                ${selectedCategory === cat 
                  ? 'bg-primary text-white shadow-xs' 
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }
              `}
            >
              {cat === 'ALL' ? 'ALL' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Corkboard Grid */}
      <div className="mading-texture flex-1 p-6 relative overflow-y-auto">
        {filteredNotes.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-white/70 backdrop-blur-xs">
            <div className="p-3 bg-primary/5 rounded-full mb-3">
              <Pin size={24} className="text-primary/60 rotate-12" />
            </div>
            <p className="font-display font-bold text-sm text-on-surface">No ideas posted here yet!</p>
            <p className="text-[11px] text-on-surface-variant max-w-xs mt-1">
              {searchQuery ? `No matches found for "${searchQuery}".` : 'Be the pioneer by planting an idea onto our digital whiteboard.'}
            </p>
            <button
              onClick={onPostClick}
            className="mt-4 flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-md hover:translate-y-[-1px] transition-transform"
            >
              <Plus size={14} />
              <span>Stick Note</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start content-start">
            {filteredNotes.map((note) => {
              const isLoved = lovesNote(note.id);
              function lovesNote(id: string) {
                return !!lovedNotes[id];
              }

              return (
                <div
                  key={note.id}
                  onClick={() => handleOpenTopic(note)}
                  className="sticky-note group p-4 shadow-sm rounded-sm border-b-2 border-neutral-300 flex flex-col gap-3 cursor-pointer select-none bg-linear-to-b relative min-h-[190px]"
                  style={{
                    backgroundColor: note.bgColor,
                    transform: `rotate(${note.rotation}deg)`,
                  }}
                >
                  {/* Decorative Pin */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 drop-shadow-md z-10 transition-transform group-hover:scale-110">
                    <Pin size={18} fill={note.pinColor} className={getPinColor(note.category)} style={{ transform: 'rotate(15deg)' }} />
                  </div>

                  {/* Note Label Category Badge */}
                  <span 
                    className="px-2 py-0.5 text-[9px] font-bold self-start uppercase rounded-md tracking-wide"
                    style={{ backgroundColor: note.tagBg, color: note.tagText }}
                  >
                    {note.category}
                  </span>

                  {/* Title & Description of Idea */}
                  <h4 className="font-display font-bold text-sm text-neutral-900 group-hover:text-primary transition-colors leading-snug">
                    {note.title}
                  </h4>
                  <p className="text-xs text-neutral-700/95 leading-relaxed font-sans line-clamp-3">
                    {note.description}
                  </p>

                  {/* Actions Bar Footer with views and upvotes */}
                  <div className="flex justify-between items-center mt-3 border-t border-black/10 pt-2.5 text-[10px] font-semibold text-neutral-600">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="flex items-center gap-1 hover:text-black transition-colors" title="Klik untuk berkomentar">
                        <MessageSquare size={12} />
                        {note.comments}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Eye size={12} />
                        {note.views}
                      </span>
                    </div>

                    <button 
                      onClick={(e) => handleLoveNote(note.id, e)}
                      className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full transition-all ${
                        isLoved 
                          ? 'bg-red-500/10 text-red-600 scale-105' 
                          : 'hover:bg-black/5 text-neutral-500'
                      }`}
                      title={isLoved ? "Liked!" : "Love this solution"}
                    >
                      <ThumbsUp size={11} fill={isLoved ? "currentColor" : "none"} />
                      <span>{isLoved ? "Voiced" : "Voice"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
