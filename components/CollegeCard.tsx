
import React from 'react';
import { College } from '../types';

interface CollegeCardProps {
  college: College;
  isChecked: boolean;
  onToggleCheck: (id: string) => void;
}

const CollegeCard: React.FC<CollegeCardProps> = ({ college, isChecked, onToggleCheck }) => {
  return (
    <div className={`group glass-card rounded-2xl md:rounded-3xl p-4 md:p-6 transition-all duration-500 flex flex-col justify-between ${
      isChecked 
      ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500/20' 
      : 'hover:border-teal-200 hover:shadow-xl'
    }`}>
      <div>
        <div className="flex justify-between items-start mb-4 md:mb-5">
          <div className="space-y-1">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-wider ${
              college.type.includes('Federal') ? 'bg-teal-950 text-white' : 'bg-teal-100 text-teal-800'
            }`}>
              {college.type}
            </span>
            <h3 className="text-base md:text-lg font-bold text-teal-950 group-hover:text-teal-700 transition-colors leading-tight line-clamp-2">
              {college.name}
            </h3>
          </div>
          {isChecked && (
            <div className="w-7 h-7 md:w-8 md:h-8 bg-teal-600 text-white rounded-full flex items-center justify-center shadow-lg shrink-0">
              <i className="fas fa-check text-xs"></i>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 md:gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-white rounded-lg md:rounded-xl flex items-center justify-center text-teal-600 border border-teal-100 shadow-sm shrink-0">
              <i className="fas fa-map-marker-alt text-xs"></i>
            </div>
            <div className="min-w-0">
              <p className="text-[8px] font-black text-teal-800/30 uppercase tracking-tighter">Localização</p>
              <p className="text-xs md:text-sm font-semibold text-teal-950 truncate">{college.city} - {college.state}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-white rounded-lg md:rounded-xl flex items-center justify-center text-teal-600 border border-teal-100 shadow-sm shrink-0">
              <i className="fas fa-link text-xs"></i>
            </div>
            <div className="min-w-0">
              <p className="text-[8px] font-black text-teal-800/30 uppercase tracking-tighter">Digital</p>
              <a 
                href={college.website.startsWith('http') ? college.website : `https://${college.website}`} 
                target="_blank" rel="noopener noreferrer" 
                className="text-xs md:text-sm font-semibold text-teal-600 hover:underline block truncate"
              >
                {college.website}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-teal-100/50 flex items-center justify-between gap-4">
        <div className="flex -space-x-2 shrink-0">
           {college.courses.slice(0, 2).map((_, i) => (
             <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-teal-50 flex items-center justify-center">
                <i className="fas fa-microscope text-[8px] text-teal-400"></i>
             </div>
           ))}
        </div>
        
        <button
          onClick={() => onToggleCheck(college.id)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 md:py-2.5 rounded-xl text-[10px] md:text-xs font-black transition-all ${
            isChecked
              ? 'bg-teal-600 text-white shadow-lg'
              : 'bg-white text-teal-700 border border-teal-200 hover:bg-teal-50'
          }`}
        >
          {isChecked ? 'CONCLUÍDO' : 'CHECK'}
        </button>
      </div>
    </div>
  );
};

export default CollegeCard;
