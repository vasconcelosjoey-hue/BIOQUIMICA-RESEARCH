
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[999] bg-teal-950 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-400 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Ícone DNA Animado */}
        <div className="w-24 h-24 mb-10 relative">
          <div className="absolute inset-0 bg-teal-500/20 blur-2xl rounded-full animate-pulse"></div>
          <div className="relative bg-teal-600 w-full h-full rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-teal-500/40 animate-float">
            <i className="fas fa-dna text-4xl animate-dna"></i>
          </div>
        </div>

        {/* Branding */}
        <div className="space-y-1 mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
            BIOQUIMICA <span className="text-teal-400">RESEARCH</span>
          </h1>
          <p className="text-[10px] md:text-xs font-bold text-teal-500 uppercase tracking-[0.4em] opacity-80">
            National Data Repository
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-80 space-y-4">
          <div className="h-[2px] w-full bg-teal-900 rounded-full overflow-hidden">
            <div className="h-full bg-teal-400 w-1/2 animate-[loading_2s_ease-in-out_infinite] origin-left shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>
          </div>
          <p className="text-[10px] font-black text-teal-500/40 uppercase tracking-widest animate-pulse">
            Sincronizando banco de dados...
          </p>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2">
        <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em]">
          POWERED BY <span className="text-teal-500/40">JOI.A.</span>
        </p>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(1); }
          100% { transform: scaleX(0); transform-origin: right; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
