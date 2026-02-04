
import React, { useState } from 'react';

interface PremiumHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  collegeCount: number;
  onOpenAdd: () => void;
  onToggleSync: () => void;
  onShare: () => void;
}

const PremiumHeader: React.FC<PremiumHeaderProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  collegeCount, 
  onOpenAdd, 
  onToggleSync,
  onShare
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const researcherImg = "https://firebasestorage.googleapis.com/v0/b/bioquimica-research.firebasestorage.app/o/Gemini_Generated_Image_9z0axj9z0axj9z0a.png?alt=media&token=c7bca208-998d-4505-a9c8-e5108b10cdf7";

  return (
    <header className="sticky top-0 z-[60] bg-white/95 backdrop-blur-md border-b border-teal-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-3 md:gap-4">
        
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-teal-600 hover:bg-teal-50 rounded-xl transition-all active:scale-95"
            aria-label="Abrir Menu"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars-staggered'} text-xl`}></i>
          </button>
          
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-full border-2 border-white ring-1 ring-teal-100 overflow-hidden relative z-10 shadow-sm">
              <img src={researcherImg} alt="Researcher" className="w-full h-full object-cover" />
            </div>
            <div className="hidden xs:flex flex-col">
              <h1 className="text-[10px] md:text-sm font-black text-teal-950 tracking-tighter leading-none">BIOQUIMICA</h1>
              <p className="text-[6px] md:text-[8px] text-teal-600 font-bold uppercase tracking-[0.2em] mt-0.5">Research</p>
            </div>
          </div>
        </div>

        <div className="relative flex-1 group max-w-sm md:max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-teal-300 text-[10px] md:text-sm"></i>
          </div>
          <input
            type="text"
            className="block w-full pl-8 md:pl-10 pr-3 py-1.5 md:py-2.5 bg-teal-50/50 border border-teal-100 rounded-xl text-[10px] md:text-sm text-teal-950 placeholder-teal-300 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-400 focus:bg-white transition-all shadow-inner"
            placeholder="Pesquisar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* BOTÃO COMPARTILHAR PREMIUM */}
          <button 
            onClick={onShare}
            className="w-10 h-10 md:w-12 md:h-12 bg-teal-50 text-teal-600 rounded-xl border border-teal-100 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all active:scale-90 shadow-sm"
            title="Compartilhar Link de Pesquisa"
          >
            <i className="fas fa-share-nodes text-xs md:text-sm"></i>
          </button>

          <div className="hidden sm:flex px-3 py-1.5 md:px-4 md:py-2 bg-teal-950 text-white rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-lg items-center gap-2">
            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></span>
            {collegeCount} Itens
          </div>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 top-[64px] md:top-[80px] z-[55]">
            <div className="absolute inset-0 bg-teal-950/20 backdrop-blur-[2px]" onClick={() => setIsMenuOpen(false)}></div>
            <div className="absolute top-0 left-0 w-full md:w-72 bg-white border-b md:border-r border-teal-100 shadow-2xl p-5 flex flex-col gap-4">
              <button 
                onClick={() => { onOpenAdd(); setIsMenuOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-teal-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest"
              >
                <span>Novo Registro</span>
                <i className="fas fa-plus"></i>
              </button>
              <button 
                onClick={() => { onShare(); setIsMenuOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-teal-50 text-teal-700 rounded-xl font-black text-[10px] uppercase tracking-widest"
              >
                <span>Compartilhar Link</span>
                <i className="fas fa-link"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PremiumHeader;
