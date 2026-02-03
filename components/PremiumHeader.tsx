
import React from 'react';

interface PremiumHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  collegeCount: number;
}

const PremiumHeader: React.FC<PremiumHeaderProps> = ({ searchQuery, setSearchQuery, collegeCount }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-teal-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-6">
        {/* Logo Section */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-200/50 transform transition hover:rotate-6">
            <i className="fas fa-flask-vial text-2xl"></i>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-extrabold text-teal-950 tracking-tight leading-none">BIOQUIMICA</h1>
            <p className="text-[10px] text-teal-600 font-bold uppercase tracking-[0.2em] mt-1">Research Center</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-2xl group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <i className="fas fa-search text-teal-400 group-focus-within:text-teal-600 transition-colors"></i>
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 bg-teal-50/50 border border-teal-100 rounded-2xl text-teal-950 placeholder-teal-300 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-400 focus:bg-white transition-all sm:text-sm"
            placeholder="Pesquise por nome, curso, cidade ou UF..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-teal-300 hover:text-teal-600 transition-colors"
            >
              <i className="fas fa-times-circle"></i>
            </button>
          )}
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 px-4 py-2 bg-teal-950 text-white rounded-2xl shadow-lg shrink-0">
          <span className="text-lg font-bold">{collegeCount}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Encontradas</span>
        </div>
      </div>
    </header>
  );
};

export default PremiumHeader;
