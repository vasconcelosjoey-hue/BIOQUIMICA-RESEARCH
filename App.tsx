
import React, { useState, useEffect, useMemo } from 'react';
import { College, AppStats } from './types';
import { INITIAL_COLLEGES } from './data';
import PremiumHeader from './components/PremiumHeader';
import CollegeCard from './components/CollegeCard';
import AddCollegeModal from './components/AddCollegeModal';

const App: React.FC = () => {
  // Persistence with Sync Logic
  const [colleges, setColleges] = useState<College[]>(() => {
    try {
      const saved = localStorage.getItem('bioquimica_repo_v2');
      const savedColleges: College[] = saved ? JSON.parse(saved) : [];
      
      // Merge: Add items from INITIAL_COLLEGES if they don't exist in savedColleges (by Name + City)
      const merged = [...savedColleges];
      INITIAL_COLLEGES.forEach(initial => {
        const exists = merged.some(m => 
          m.name.toLowerCase().trim() === initial.name.toLowerCase().trim() &&
          m.city.toLowerCase().trim() === initial.city.toLowerCase().trim()
        );
        if (!exists) merged.push(initial);
      });

      return merged.length > 0 ? merged : INITIAL_COLLEGES;
    } catch (e) {
      return INITIAL_COLLEGES;
    }
  });

  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('bioquimica_checked_v2');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (e) {
      return new Set();
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-save
  useEffect(() => {
    localStorage.setItem('bioquimica_repo_v2', JSON.stringify(colleges));
  }, [colleges]);

  useEffect(() => {
    localStorage.setItem('bioquimica_checked_v2', JSON.stringify(Array.from(checkedIds)));
  }, [checkedIds]);

  // Sorting and Filtering
  const filteredColleges = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return colleges
      .filter(c => 
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q) ||
        c.courses.some(course => course.toLowerCase().includes(q))
      )
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }, [colleges, searchQuery]);

  const stats: AppStats = useMemo(() => {
    const total = colleges.length;
    const checked = checkedIds.size;
    return {
      total,
      checked,
      percent: total > 0 ? Math.round((checked / total) * 100) : 0
    };
  }, [colleges, checkedIds]);

  const handleToggleCheck = (id: string) => {
    setCheckedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddCollege = (newCol: Omit<College, 'id' | 'createdAt'>): string | null => {
    // Advanced duplicate check (Name + City)
    const isDuplicate = colleges.some(c => 
      c.name.toLowerCase().trim() === newCol.name.toLowerCase().trim() &&
      c.city.toLowerCase().trim() === newCol.city.toLowerCase().trim()
    );

    if (isDuplicate) {
      return 'Esta instituição já está cadastrada nesta cidade.';
    }

    const collegeWithMeta: College = {
      ...newCol,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    };

    setColleges(prev => [...prev, collegeWithMeta]);
    return null; // Success
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-teal-200 selection:text-teal-900">
      <PremiumHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        collegeCount={filteredColleges.length} 
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 sm:px-8">
        {/* Hero & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-4xl sm:text-5xl font-black text-teal-950 tracking-tight mb-4">
              Diretório <span className="text-teal-600">Bioquímica</span>
            </h2>
            <p className="text-lg text-teal-900/60 font-medium max-w-xl leading-relaxed">
              Base de dados nacional consolidada para mapeamento de cursos e instituições de saúde.
            </p>
          </div>

          <div className="glass-card p-6 rounded-[2.5rem] flex flex-col justify-center items-center text-center shadow-xl shadow-teal-900/5">
            <div className="mb-2">
              <span className="text-5xl font-black text-teal-600 leading-none">{stats.percent}%</span>
            </div>
            <p className="text-[10px] font-black text-teal-800 uppercase tracking-[0.3em] mb-4">Progresso Geral</p>
            <div className="w-full h-2 bg-teal-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-teal-700 transition-all duration-1000 ease-out"
                style={{ width: `${stats.percent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex gap-3">
             <div className="px-4 py-2 bg-white border border-teal-100 rounded-2xl flex items-center gap-2 shadow-sm">
                <i className="fas fa-database text-teal-600 text-xs"></i>
                <span className="text-xs font-bold text-teal-900">{stats.total} Instituições</span>
             </div>
             <div className="px-4 py-2 bg-teal-50 border border-teal-200 rounded-2xl flex items-center gap-2 shadow-sm">
                <i className="fas fa-check-circle text-teal-600 text-xs"></i>
                <span className="text-xs font-bold text-teal-900">{stats.checked} Analisadas</span>
             </div>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-teal-600 text-white font-black rounded-2xl hover:bg-teal-700 shadow-2xl shadow-teal-500/20 transition-all transform hover:scale-[1.02] active:scale-95 group"
          >
            <i className="fas fa-plus-circle group-hover:rotate-90 transition-transform"></i>
            CADASTRAR NOVA
          </button>
        </div>

        {/* Grid Results */}
        {filteredColleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-20">
            {filteredColleges.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
                isChecked={checkedIds.has(college.id)}
                onToggleCheck={handleToggleCheck}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-teal-200 border border-dashed border-teal-200">
              <i className="fas fa-microscope text-4xl"></i>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-teal-900">Nenhum resultado</h3>
              <p className="text-teal-600/60 max-w-sm mx-auto">Tente buscar por termos diferentes ou adicione uma nova faculdade ao repositório.</p>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-auto py-12 px-8 bg-teal-950 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-500"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <i className="fas fa-dna text-teal-400 text-xl"></i>
              <span className="text-lg font-black tracking-tighter">BIOQUIMICA RESEARCH</span>
            </div>
            <p className="text-teal-400/50 text-xs font-bold uppercase tracking-widest">Base Nacional de Informação Acadêmica</p>
          </div>
          
          <div className="text-center md:text-right space-y-1">
            <p className="text-sm font-medium opacity-60 italic">&copy; {new Date().getFullYear()} - Sistema Premium</p>
            <div className="flex justify-center md:justify-end gap-3 mt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-teal-900 rounded-xl flex items-center justify-center hover:bg-teal-800 transition-all hover:scale-110 shadow-lg shadow-black/20">
                <i className="fab fa-github text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-teal-900 rounded-xl flex items-center justify-center hover:bg-teal-800 transition-all hover:scale-110 shadow-lg shadow-black/20">
                <i className="fab fa-linkedin-in text-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <AddCollegeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddCollege} 
      />
    </div>
  );
};

export default App;
