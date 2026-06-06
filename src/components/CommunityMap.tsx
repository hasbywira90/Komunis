import React, { useState } from 'react';
import { MapPin, Plus, Minus, Compass, AlertTriangle, Trees, GraduationCap, X, HelpCircle, Check } from 'lucide-react';
import { MapPin as PinType } from '../types';

interface CommunityMapProps {
  pins: PinType[];
  setPins: React.Dispatch<React.SetStateAction<PinType[]>>;
  onNotification: (msg: string) => void;
  cityName?: string;
  regionName?: string;
}

export default function CommunityMap({ 
  pins, 
  setPins, 
  onNotification, 
  cityName = 'Bandung',
  regionName = 'Kota Bandung'
}: CommunityMapProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedPin, setSelectedPin] = useState<PinType | null>(null);
  const [isAddingPin, setIsAddingPin] = useState<{ x: number; y: number } | null>(null);
  const [newPinName, setNewPinName] = useState('');
  const [newPinType, setNewPinType] = useState<'warning' | 'park' | 'school' | 'other'>('other');
  const [isCenteredPulse, setIsCenteredPulse] = useState(false);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  };

  const handleCenter = () => {
    setIsCenteredPulse(true);
    setTimeout(() => setIsCenteredPulse(false), 2000);
    setZoomLevel(1);
    onNotification(`Map repositioned to your primary region context: ${regionName}.`);
  };

  // Click on map to propose a pin
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedPin) {
      setSelectedPin(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setIsAddingPin({ x, y });
  };

  // Submit newly placed pin
  const handleCreatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPinName.trim() || !isAddingPin) return;

    const newPin: PinType = {
      id: `pin-${Date.now()}`,
      type: newPinType,
      label: newPinName.trim(),
      x: Math.round(isAddingPin.x),
      y: Math.round(isAddingPin.y),
      description: `New civic initiative created directly via live ${cityName} coordinate mapping at [${Math.round(isAddingPin.x)}%, ${Math.round(isAddingPin.y)}%]`
    };

    setPins(prev => [...prev, newPin]);
    onNotification(`Map marker successfully dropped: "${newPinName}" near ${cityName} coordinate.`);
    setNewPinName('');
    setIsAddingPin(null);
  };

  // Get matching icon for pin
  const getPinIcon = (type: PinType['type']) => {
    switch (type) {
      case 'warning': return <AlertTriangle size={14} className="text-red-700 font-bold" />;
      case 'park': return <Trees size={14} className="text-emerald-700 font-bold" />;
      case 'school': return <GraduationCap size={14} className="text-blue-700 font-bold" />;
      default: return <HelpCircle size={14} className="text-indigo-700 font-bold" />;
    }
  };

  // Get matching color scheme for pins
  const getPinColorStyle = (type: PinType['type']) => {
    switch (type) {
      case 'warning': return 'bg-[#FFEBEE] hover:bg-red-100/90 text-red-600 border-red-300 shadow-red-200/55';
      case 'park': return 'bg-[#F1F8E9] hover:bg-green-100/90 text-green-700 border-green-300 shadow-green-200/55';
      case 'school': return 'bg-[#E3F2FD] hover:bg-blue-100/90 text-primary border-blue-300 shadow-blue-200/55';
      default: return 'bg-white hover:bg-slate-50 text-indigo-700 border-indigo-200 shadow-indigo-100/50';
    }
  };

  return (
    <div className="bg-surface-container rounded-lg overflow-hidden shadow-xs flex flex-col h-[520px] border border-outline-variant/40" id="map">
      {/* Map Header bar */}
      <div className="p-5 bg-white flex justify-between items-center border-b border-outline-variant/40">
        <div>
          <h3 className="font-display font-bold text-lg text-on-surface flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            <span>Community Map {cityName}</span>
          </h3>
          <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">Live civic locations in {regionName}</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-primary text-white rounded-md text-[10px] font-bold uppercase tracking-wide">
            {pins.length} Active Solutions
          </span>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="flex-1 relative bg-slate-100 overflow-hidden select-none">
        {/* Map Image Canvas */}
        <div 
          onClick={handleMapClick}
          className="absolute inset-0 transition-transform duration-300 origin-center cursor-crosshair"
          style={{ 
            transform: `scale(${zoomLevel})`,
          }}
        >
          <iframe
            title={`Google Maps ${cityName}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(`${regionName}, Indonesia`)}&z=12&output=embed`}
            className="w-full h-full border-0 pointer-events-none grayscale-[15%] saturate-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />

          {/* Centering Pointer Pulse effect */}
          {isCenteredPulse && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
              <span className="absolute inline-flex h-32 w-32 rounded-full bg-primary/20 animate-ping" />
              <span className="absolute inline-flex h-16 w-16 rounded-full bg-primary/30 animate-pulse" />
              <div className="w-5 h-5 bg-primary border-2 border-white rounded-full shadow-lg" />
            </div>
          )}

          {/* Render Active Pins */}
          {pins.map((pin) => (
            <div 
              key={pin.id}
              className="absolute group z-20"
              style={{ 
                left: `${pin.x}%`, 
                top: `${pin.y}%`,
                transform: 'translate(-50%, -100%)' // Center bottom alignment
              }}
              onClick={(e) => {
                e.stopPropagation(); // Avoid triggering map clicks
                setSelectedPin(pin);
                setIsAddingPin(null);
              }}
            >
              {/* Pulsing indicator background */}
              <span className="absolute -inset-1 rounded-md bg-primary/10 animate-pulse group-hover:scale-110 transition-transform" />

              {/* Pin Note Card */}
              <div className={`
                flex items-center gap-1.5 max-w-32 px-2 py-1.5 rounded-md border shadow-md font-bold text-[9px] uppercase tracking-wide
                cursor-pointer transition-all ${getPinColorStyle(pin.type)}
              `}>
                {getPinIcon(pin.type)}
                <span className="truncate">{pin.label}</span>
              </div>

              {/* Pin Pointer visual stem */}
              <div className="w-1.5 h-1.5 bg-white border-r border-b border-inherit mx-auto rotate-45 -mt-[4px] shadow-xs" 
                style={{ 
                  backgroundColor: pin.type === 'warning' ? '#FFEBEE' : pin.type === 'park' ? '#F1F8E9' : pin.type === 'school' ? '#E3F2FD' : '#FFFFFF',
                  borderColor: pin.type === 'warning' ? '#B71C1C' : pin.type === 'park' ? '#558B2F' : pin.type === 'school' ? '#1565C0' : '#E2E8F0',
                }}
              />
            </div>
          ))}
        </div>

        {/* Informative Toast Overlay on Pin Click */}
        {selectedPin && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 bg-white rounded-lg shadow-xl border border-outline-variant/60 p-4 shrink-0 transition-all font-sans z-35 animate-in slide-in-from-bottom duration-200">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="p-1 px-1.5 font-bold uppercase rounded-md text-[9px] font-display flex items-center gap-1 bg-primary/5 text-primary">
                  {selectedPin.type.toUpperCase()}
                </span>
                <span className="text-[10px] text-on-surface-variant font-bold">Marker Details</span>
              </div>
              <button 
                onClick={() => setSelectedPin(null)}
                className="p-1 rounded-md hover:bg-surface-container bg-surface-container-low text-on-surface-variant"
                aria-label="Close"
              >
                <X size={13} />
              </button>
            </div>
            
            <h4 className="font-display font-bold text-sm text-on-surface mt-2 flex items-center gap-1.5">
              {getPinIcon(selectedPin.type)}
              <span>{selectedPin.label}</span>
            </h4>

            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              {selectedPin.description}
            </p>

            <div className="mt-3 flex items-center justify-between text-[10px] text-on-surface-variant border-t border-outline-variant/30 pt-2.5">
              <span>Coordinates: {cityName} [{selectedPin.x}%, {selectedPin.y}%]</span>
              <button 
                onClick={() => {
                  onNotification(`Volunteered for civic solution marker: ${selectedPin.label}`);
                  setSelectedPin(null);
                }}
                  className="bg-primary hover:bg-primary-container text-white px-2.5 py-1 rounded-md font-bold hover:translate-y-[-1px] transition-all flex items-center gap-1"
              >
                <Check size={10} />
                <span>Support</span>
              </button>
            </div>
          </div>
        )}

        {/* Placing Pin Modal Form */}
        {isAddingPin && (
          <div className="absolute inset-x-4 top-4 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-outline-variant/50 p-4 z-40 animate-in slide-in-from-top-6 duration-200 font-sans">
            <form onSubmit={handleCreatePin}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold font-display text-primary uppercase tracking-wider">
                  Propose Local Marker solution
                </span>
                <button 
                  type="button" 
                  onClick={() => setIsAddingPin(null)}
                  className="p-1 bg-surface-container-low rounded-lg hover:bg-surface-container text-on-surface-variant"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-6">
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: Posko Sampah Mandiri, Reboisasi..."
                    value={newPinName}
                    onChange={(e) => setNewPinName(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-on-surface focus:outline-hidden focus:ring-1 focus:ring-primary focus:bg-white"
                  />
                </div>
                <div className="md:col-span-4 flex items-center gap-1.5">
                  <select 
                    value={newPinType}
                    onChange={(e) => setNewPinType(e.target.value as any)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg py-2 px-2.5 text-on-surface focus:outline-hidden"
                  >
                    <option value="warning">Environment / Flood (Red)</option>
                    <option value="park">Green Space / Eco (Green)</option>
                    <option value="school">Tutoring / Edu (Blue)</option>
                    <option value="other">Public Initiative / Other (Purple)</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-container text-white py-2 px-3 rounded-lg font-bold text-xs hover:translate-y-[-1px] transition-transform cursor-pointer text-center"
                  >
                    Drop Pin
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-on-surface-variant mt-2 italic">
                Placement selected at {cityName} map coordinates: {Math.round(isAddingPin.x)}% Easting, {Math.round(isAddingPin.y)}% Northing.
              </p>
            </form>
          </div>
        )}

        {/* Click to add helper banner */}
        {!isAddingPin && !selectedPin && (
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-xs text-[10px] text-white/90 font-medium py-1 px-3 rounded-full pointer-events-none">
            Tips: Click anywhere on map base to propose a civic action marker!
          </div>
        )}

        {/* Floating Zoom & Location Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-30">
          <button 
            type="button"
            onClick={handleZoomIn}
            className="bg-white text-on-surface hover:text-primary outline-hidden border border-outline-variant/50 p-2.5 rounded-lg shadow-md transition-all active:scale-95"
            title="Sembur Peta Lebih Dekat (Zoom In)"
          >
            <Plus size={16} />
          </button>
          <button 
            type="button"
            onClick={handleZoomOut}
            className="bg-white text-on-surface hover:text-primary outline-hidden border border-outline-variant/50 p-2.5 rounded-lg shadow-md transition-all active:scale-95"
            title="Perkecil Tampilan (Zoom Out)"
          >
            <Minus size={16} />
          </button>
          <button 
            type="button"
            onClick={handleCenter}
            className="bg-primary text-white border-none p-2.5 rounded-lg shadow-lg transition-all active:scale-95 cursor-pointer"
            title="Segarkan ke Koordinat Utama"
          >
            <Compass size={16} className={isCenteredPulse ? "animate-spin" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
}
