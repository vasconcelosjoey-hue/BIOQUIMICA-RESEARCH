
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
    <header className="sticky top-0 z-[60] bg-white/95 backdrop-blur-md border-b border-teal-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-3 md:gap-4">
        
        {/* Lado Esquerdo: Hamburger & Logo */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-teal-600 hover:bg-teal-50 rounded-xl transition-all active:scale-95"
            aria-label="Abrir Menu"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars-staggered'} text-xl`}></i>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-11 md:h-11 bg-teal-600 rounded-lg md:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-600/20">
              <i className="fas fa-dna text-base md:text-xl"></i>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xs md:text-base font-black text-teal-950 tracking-tighter leading-none">BIOQUIMICA</h1>
              <p className="text-[7px] md:text-[9px] text-teal-600 font-bold uppercase tracking-[0.2em] mt-0.5">Research</p>
            </div>
          </div>
        </div>

        {/* Busca Central - Expansível */}
        <div className="relative flex-1 group max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-teal-300 text-xs md:text-sm group-focus-within:text-teal-600 transition-colors"></i>
          </div>
          <input
            type="text"
            className="block w-full pl-9 pr-3 py-2 md:py-2.5 bg-teal-50/50 border border-teal-100 rounded-xl text-xs md:text-sm text-teal-950 placeholder-teal-300 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-400 focus:bg-white transition-all shadow-inner"
            placeholder="Pesquisar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <div className="px-4 py-2 bg-teal-950 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
            {collegeCount} Registros
          </div>
        </div>

        {/* Menu Sanduíche (Overlay) */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-[64px] md:top-[80px] z-[55] animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-teal-950/20 backdrop-blur-[2px]" onClick={() => setIsMenuOpen(false)}></div>
            <div className="absolute top-0 left-0 w-full md:w-80 bg-white border-b md:border-r border-teal-100 shadow-2xl p-6 flex flex-col gap-4 animate-in slide-in-from-left duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.2em]">Painel de Controle</span>
                <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md">{collegeCount} Itens</span>
              </div>
              
              <button 
                onClick={() => { onOpenAdd(); setIsMenuOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-4 bg-teal-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-teal-600/20 hover:bg-teal-700 transition-all"
              >
                <span>Cadastrar Instituição</span>
                <i className="fas fa-plus"></i>
              </button>

              <button 
                onClick={() => { onToggleSync(); setIsMenuOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-4 bg-white border border-teal-100 text-teal-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-teal-50 transition-all"
              >
                <span>Sincronizar Dados</span>
                <i className="fas fa-sync-alt"></i>
              </button>

              <div className="mt-4 pt-4 border-t border-teal-50">
                <p className="text-[9px] font-bold text-teal-300 uppercase tracking-widest text-center">Bioquímica Research v3.2</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PremiumHeader;