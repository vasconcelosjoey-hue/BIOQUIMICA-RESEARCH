
import React, { useState } from 'react';

interface PremiumHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  collegeCount: number;
  onOpenAdd: () => void;
  onToggleSync: () => void;
}

const PremiumHeader: React.FC<PremiumHeaderProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  collegeCount, 
  onOpenAdd, 
  onToggleSync 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-teal-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
        
        {/* Mobile: Hamburger & Logo */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-teal-600 hover:bg-teal-50 rounded-xl transition-colors"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 md:w-11 md:h-11 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-200/50">
              <i className="fas fa-flask-vial text-lg md:text-xl"></i>
            </div>
            <div className="hidden xs:block">
              <h1 className="text-sm md:text-lg font-black text-teal-950 tracking-tighter leading-none">BIOQUIMICA</h1>
              <p className="text-[8px] md:text-[9px] text-teal-600 font-bold uppercase tracking-[0.1em] mt-0.5">Research</p>
            </div>
          </div>
        </div>

        {/* Search Bar - Responsive width */}
        <div className="relative flex-1 group max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
            <i className="fas fa-search text-teal-300 text-xs md:text-sm group-focus-within:text-teal-600 transition-colors"></i>
          </div>
          <input
            type="text"
            className="block w-full pl-9 md:pl-11 pr-3 py-2 md:py-3 bg-teal-50/50 border border-teal-100 rounded-xl md:rounded-2xl text-xs md:text-sm text-teal-950 placeholder-teal-300 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-400 focus:bg-white transition-all"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-950 text-white rounded-xl shadow-lg">
            <span className="text-sm font-bold">{collegeCount}</span>
            <span className="text-[8px] font-bold uppercase tracking-wider opacity-60">Resultados</span>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-teal-100 shadow-xl animate-in slide-in-from-top duration-300 md:hidden overflow-hidden">
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between px-2 mb-4">
                 <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Menu de Sistema</span>
                 <span className="text-[10px] font-black text-teal-700 bg-teal-50 px-2 py-1 rounded-md">{collegeCount} Itens</span>
              </div>
              <button 
                onClick={() => { onOpenAdd(); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 bg-teal-600 text-white rounded-xl font-bold text-sm"
              >
                <i className="fas fa-plus-circle"></i> Cadastrar Nova
              </button>
              <button 
                onClick={() => { onToggleSync(); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-teal-100 text-teal-600 rounded-xl font-bold text-sm"
              >
                <i className="fas fa-sync"></i> Sincronização / Sync
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PremiumHeader;
