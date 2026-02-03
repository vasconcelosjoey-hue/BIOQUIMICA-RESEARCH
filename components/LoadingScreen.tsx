
import React from 'react';

const LoadingScreen: React.FC = () => {
  // Foto institucional fornecida via Firebase Storage
  const researcherImg = "https://firebasestorage.googleapis.com/v0/b/bioquimica-research.firebasestorage.app/o/Gemini_Generated_Image_9z0axj9z0axj9z0a.png?alt=media&token=c7bca208-998d-4505-a9c8-e5108b10cdf7";

  return (
    <div className="fixed inset-0 z-[999] bg-teal-950 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-600 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-teal-400 blur-[150px] rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Pesquisador em Destaque */}
        <div className="w-32 h-32 md:w-44 md:h-44 mb-12 relative group">
          <div className="absolute inset-[-15px] bg-teal-500/10 blur-3xl rounded-full animate-pulse"></div>
          <div className="relative bg-white p-1.5 w-full h-full rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(45,212,191,0.3)] animate-float overflow-hidden border-2 border-teal-400/30">
            <img 
                src={researcherImg} 
                className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-1000" 
                alt="Researcher Loading" 
            />
          </div>
          {/* ADN Icon Badge */}
          <div className="absolute -bottom-2 -right-2 bg-teal-500 text-white w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-teal-950 flex items-center justify-center shadow-xl">
             <i className="fas fa-dna text-xs md:text-sm animate-dna"></i>
          </div>
        </div>

        {/* Branding Animado */}
        <div className="space-y-2 mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
            BIOQUIMICA <span className="text-teal-400">RESEARCH</span>
          </h1>
          <div className="flex items-center justify-center gap-4">
             <div className="h-px w-8 bg-teal-800"></div>
             <p className="text-[10px] md:text-xs font-bold text-teal-500 uppercase tracking-[0.5em] opacity-80">
                Data Repository v7.0
             </p>
             <div className="h-px w-8 bg-teal-800"></div>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 md:w-80 space-y-4">
          <div className="h-[2px] w-full bg-teal-900 rounded-full overflow-hidden">
            <div className="h-full bg-teal-400 w-1/3 animate-[loading_2.5s_ease-in-out_infinite] origin-left shadow-[0_0_15px_rgba(45,212,191,0.6)]"></div>
          </div>
          <p className="text-[10px] font-black text-teal-600/30 uppercase tracking-[0.3em] animate-pulse">
            Sincronizando Módulos...
          </p>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2">
        <p className="text-[11px] font-black text-white/10 uppercase tracking-[0.5em]">
          POWERED BY <span className="text-teal-500/20">JOI.A.</span>
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
