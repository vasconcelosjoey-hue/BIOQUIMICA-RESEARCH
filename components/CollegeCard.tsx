
import React from 'react';
import { College } from '../types';

interface CollegeCardProps {
  college: College;
  isChecked: boolean;
  onToggleCheck: (id: string) => void;
}

const CollegeCard: React.FC<CollegeCardProps> = ({ college, isChecked, onToggleCheck }) => {
  return (
    <div className={`group glass-card rounded-[2rem] p-5 md:p-6 transition-all duration-500 flex flex-col h-full border-2 ${
      isChecked 
      ? 'border-teal-500 bg-teal-50/50' 
      : 'border-transparent hover:border-teal-200 shadow-sm hover:shadow-xl'
    }`}>
      <div className="flex-1">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="flex flex-col gap-2 min-w-0">
            <span className={`inline-flex self-start items-center px-2 py-0.5 rounded-lg text-[8px] md:text-[9px] font-extrabold uppercase tracking-widest ${
              college.type.toLowerCase().includes('federal') || college.type.toLowerCase().includes('estadual')
              ? 'bg-teal-950 text-white' 
              : 'bg-teal-100 text-teal-800'
            }`}>
              {college.type}
            </span>
            <h3 className="text-sm md:text-base lg:text-lg font-black text-teal-950 group-hover:text-teal-700 transition-colors leading-tight word-break-all">
              {college.name}
            </h3>
          </div>
          <div className="shrink-0">
            {isChecked ? (
              <div className="w-8 h-8 md:w-10 md:h-10 bg-teal-600 text-white rounded-2xl flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                <i className="fas fa-check-double text-xs md:text-sm"></i>
              </div>
            ) : (
              <div className="w-8 h-8 md:w-10 md:h-10 bg-teal-50 text-teal-200 rounded-2xl flex items-center justify-center border border-teal-100">
                <i className="fas fa-microscope text-xs md:text-sm"></i>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-teal-600 border border-teal-100 shadow-sm shrink-0">
              <i className="fas fa-location-dot text-[10px]"></i>
            </div>
            <div className="min-w-0 pt-1">
              <p className="text-[8px] font-black text-teal-800/40 uppercase tracking-widest mb-0.5">Localização</p>
              <p className="text-xs md:text-sm font-bold text-teal-900 leading-tight">
                {college.city}, {college.state}
              </p>
            </div>
          </div>

          {college.phone && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-teal-600 border border-teal-100 shadow-sm shrink-0">
                <i className="fas fa-phone text-[10px]"></i>
              </div>
              <div className="min-w-0 pt-1">
                <p className="text-[8px] font-black text-teal-800/40 uppercase tracking-widest mb-0.5">Contato</p>
                <p className="text-xs md:text-sm font-bold text-teal-900 leading-tight">{college.phone}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-teal-600 border border-teal-100 shadow-sm shrink-0">
              <i className="fas fa-globe text-[10px]"></i>
            </div>
            <div className="min-w-0 pt-1">
              <p className="text-[8px] font-black text-teal-800/40 uppercase tracking-widest mb-0.5">Website</p>
              <a 
                href={college.website.startsWith('http') ? college.website : `https://${college.website}`} 
                target="_blank" rel="noopener noreferrer" 
                className="text-xs md:text-sm font-bold text-teal-600 hover:text-teal-800 transition-colors word-break-all block underline decoration-teal-100 underline-offset-2"
              >
                {college.website}
              </a>
            </div>
          </div>
          
          <div className="pt-2">
            <p className="text-[8px] font-black text-teal-800/40 uppercase tracking-widest mb-2">Cursos Disponíveis</p>
            <div className="flex flex-wrap gap-1.5">
              {college.courses.map((course, idx) => (
                <span key={idx} className="px-2 py-1 bg-teal-50 text-teal-700 text-[9px] font-bold rounded-md border border-teal-100/50">
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-5 border-t border-teal-100/50">
        <button
          onClick={() => onToggleCheck(college.id)}
          className={`w-full flex items-center justify-center gap-3 py-3 md:py-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-all transform active:scale-95 shadow-lg ${
            isChecked
              ? 'bg-teal-600 text-white shadow-teal-600/30'
              : 'bg-white text-teal-700 border border-teal-200 hover:bg-teal-50 shadow-teal-900/5'
          }`}
        >
          {isChecked ? (
            <>
              <i className="fas fa-check-circle"></i>
              <span>PESQUISA CONCLUÍDA</span>
            </>
          ) : (
            <>
              <i className="fas fa-circle-check"></i>
              <span>MARCAR COMO PESQUISADO</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CollegeCard;