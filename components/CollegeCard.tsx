
import React from 'react';
import { College } from '../types';

interface CollegeCardProps {
  college: College;
  isChecked: boolean;
  onToggleCheck: (id: string) => void;
}

const CollegeCard: React.FC<CollegeCardProps> = ({ college, isChecked, onToggleCheck }) => {
  return (
    <div className={`group glass-card rounded-3xl p-6 transition-all duration-500 ${
      isChecked 
      ? 'border-teal-500 bg-teal-50/40 ring-1 ring-teal-500/20' 
      : 'hover:border-teal-200 hover:shadow-xl hover:-translate-y-1'
    }`}>
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 uppercase tracking-wider">
            {college.type}
          </span>
          <h3 className="text-xl font-bold text-teal-950 group-hover:text-teal-700 transition-colors leading-tight">
            {college.name}
          </h3>
        </div>
        {isChecked && (
          <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <i className="fas fa-check"></i>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-teal-600 border border-teal-100 shadow-sm">
            <i className="fas fa-map-location-dot text-sm"></i>
          </div>
          <div>
            <p className="text-[10px] font-black text-teal-800/40 uppercase tracking-tighter">Localização</p>
            <p className="text-sm font-semibold text-teal-950">{college.city} - {college.state}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-teal-600 border border-teal-100 shadow-sm">
            <i className="fas fa-link text-sm"></i>
          </div>
          <div>
            <p className="text-[10px] font-black text-teal-800/40 uppercase tracking-tighter">Digital</p>
            <a 
              href={college.website.startsWith('http') ? college.website : `https://${college.website}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm font-semibold text-teal-600 hover:text-teal-800 hover:underline"
            >
              Portal Oficial
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-teal-600 border border-teal-100 shadow-sm">
            <i className="fas fa-phone-volume text-sm"></i>
          </div>
          <div>
            <p className="text-[10px] font-black text-teal-800/40 uppercase tracking-tighter">Telefone</p>
            <p className="text-sm font-semibold text-teal-950">{college.phone || 'N/A'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-teal-600 border border-teal-100 shadow-sm">
            <i className="fas fa-microscope text-sm"></i>
          </div>
          <div>
            <p className="text-[10px] font-black text-teal-800/40 uppercase tracking-tighter">Área</p>
            <p className="text-sm font-semibold text-teal-950 truncate max-w-[140px]" title={college.courses.join(', ')}>
              {college.courses[0]}...
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-teal-100/50 flex items-center justify-between">
        <div className="flex -space-x-2">
           {college.courses.slice(0, 3).map((_, i) => (
             <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-teal-200 flex items-center justify-center">
                <i className="fas fa-dna text-[8px] text-teal-700"></i>
             </div>
           ))}
           {college.courses.length > 3 && (
             <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-500">
               +{college.courses.length - 3}
             </div>
           )}
        </div>
        
        <button
          onClick={() => onToggleCheck(college.id)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            isChecked
              ? 'bg-teal-600 text-white shadow-lg shadow-teal-200 check-active'
              : 'bg-white text-teal-700 border border-teal-200 hover:bg-teal-50 active:scale-95'
          }`}
        >
          {isChecked ? (
            <><i className="fas fa-check-double"></i> PESQUISADO</>
          ) : (
            <><i className="far fa-circle"></i> CHECK</>
          )}
        </button>
      </div>
    </div>
  );
};

export default CollegeCard;
