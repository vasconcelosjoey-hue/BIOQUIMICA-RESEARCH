
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

  // URL da imagem institucional fornecida
  const researcherImg = "https://firebasestorage.googleapis.com/v0/b/bioquimica-research.firebasestorage.app/o/Gemini_Generated_Image_9z0axj9z0axj9z0a.png?alt=media&token=c7bca208-998d-4505-a9c8-e5108b10cdf7";

  return (
    <header className="sticky top-0 z-[60] bg-white/95 backdrop-blur-md border-b border-teal-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-3 md:gap-4">
        
        {/* Lado Esquerdo: Hamburger & Logo com Foto */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-teal-600 hover:bg-teal-50 rounded-xl transition-all active:scale-95"
            aria-label="Abrir Menu"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars-staggered'} text-xl`}></i>
          </button>
          
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-teal-500 rounded-full blur-sm opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-full border-2 border-white ring-1 ring-teal-100 overflow-hidden relative z-10 shadow-sm">
                <img 
                  src={researcherImg} 
                  alt="Researcher" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="hidden xs:flex flex-col">
              <h1 className="text-[10px] md:text-sm font-black text-teal-950 tracking-tighter leading-none">BIOQUIMICA</h1>
              <p className="text-[6px] md:text-[8px] text-teal-600 font-bold uppercase tracking-[0.2em] mt-0.5">Research</p>
            </div>
          </div>
        </div>

        {/* Busca Central - Responsiva */}
        <div className="relative flex-1 group max-w-sm md:max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-teal-300 text-[10px] md:text-sm group-focus-within:text-teal-600 transition-colors"></i>
          </div>
          <input
            type="text"
            className="block w-full pl-8 md:pl-10 pr-3 py-1.5 md:py-2.5 bg-teal-50/50 border border-teal-100 rounded-xl text-[10px] md:text-sm text-teal-950 placeholder-teal-300 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-400 focus:bg-white transition-all shadow-inner"
            placeholder="Pesquisar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status Desktop */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <div className="px-3 py-1.5 md:px-4 md:py-2 bg-teal-950 text-white rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></span>
            {collegeCount} Itens
          </div>
        </div>

        {/* Menu Lateral */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-[64px] md:top-[80px] z-[55] animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-teal-950/20 backdrop-blur-[2px]" onClick={() => setIsMenuOpen(false)}></div>
            <div className="absolute top-0 left-0 w-full md:w-72 bg-white border-b md:border-r border-teal-100 shadow-2xl p-5 flex flex-col gap-4 animate-in slide-in-from-left duration-300">
              <div className="flex items-center gap-3 mb-2 p-3 bg-teal-50 rounded-2xl border border-teal-100">
                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md bg-white p-0.5 border border-teal-200">
                   <img src={researcherImg} className="w-full h-full object-cover rounded-lg" alt="Researcher Menu" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-teal-950 uppercase">Base Bioquímica</p>
                  <p className="text-[8px] font-bold text-teal-500 uppercase tracking-widest">Acesso Gestor</p>
                </div>
              </div>
              
              <button 
                onClick={() => { onOpenAdd(); setIsMenuOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-teal-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-teal-600/20 hover:bg-teal-700 transition-all"
              >
                <span>Novo Registro</span>
                <i className="fas fa-plus"></i>
              </button>

              <button 
                onClick={() => { onToggleSync(); setIsMenuOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-white border border-teal-100 text-teal-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-50 transition-all"
              >
                <span>Backup / Sync</span>
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PremiumHeader;
