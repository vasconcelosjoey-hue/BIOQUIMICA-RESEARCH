
import React, { useState, useEffect, useMemo } from 'react';
import { College, AppStats } from './types';
import { INITIAL_COLLEGES } from './data';
import PremiumHeader from './components/PremiumHeader';
import CollegeCard from './components/CollegeCard';
import AddCollegeModal from './components/AddCollegeModal';

const App: React.FC = () => {
  // Persistence with Sync logic
  const [colleges, setColleges] = useState<College[]>(() => {
    try {
      const saved = localStorage.getItem('bioquimica_repo_v2');
      let currentColleges: College[] = saved ? JSON.parse(saved) : [];
      
      const merged = [...currentColleges];
      INITIAL_COLLEGES.forEach(initial => {
        const isDuplicate = merged.some(m => 
          m.name.toLowerCase().trim() === initial.name.toLowerCase().trim() &&
          m.city.toLowerCase().trim() === initial.city.toLowerCase().trim()
        );
        if (!isDuplicate) merged.push(initial);
      });
      return merged;
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

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSphere, setSelectedSphere] = useState<'Todos' | 'Pública' | 'Privada'>('Todos');
  const [selectedState, setSelectedState] = useState<string>('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSync, setShowSync] = useState(false);
  const [syncKey, setSyncKey] = useState('');

  // Auto-save
  useEffect(() => {
    localStorage.setItem('bioquimica_repo_v2', JSON.stringify(colleges));
  }, [colleges]);

  useEffect(() => {
    localStorage.setItem('bioquimica_checked_v2', JSON.stringify(Array.from(checkedIds)));
  }, [checkedIds]);

  // Options
  const uniqueStates = useMemo(() => {
    const states = Array.from(new Set(colleges.map(c => c.state))).sort();
    return ['Todos', ...states];
  }, [colleges]);

  // Advanced Filtering
  const filteredColleges = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return colleges
      .filter(c => {
        const matchesSearch = 
          c.name.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.state.toLowerCase().includes(q) ||
          c.courses.some(course => course.toLowerCase().includes(q));
        
        let matchesSphere = true;
        if (selectedSphere === 'Pública') {
          matchesSphere = ['Federal', 'Estadual', 'Municipal'].includes(c.type);
        } else if (selectedSphere === 'Privada') {
          matchesSphere = c.type.includes('Privada') || c.type === 'Comunitária';
        }

        const matchesState = selectedState === 'Todos' || c.state === selectedState;

        return matchesSearch && matchesSphere && matchesState;
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }, [colleges, searchQuery, selectedSphere, selectedState]);

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

  const handleExportProgress = () => {
    const data = JSON.stringify(Array.from(checkedIds));
    const encoded = btoa(data);
    navigator.clipboard.writeText(encoded);
    alert('Chave de Sincronização copiada! Use esta chave em outro aparelho para restaurar seu progresso.');
  };

  const handleImportProgress = () => {
    try {
      const decoded = atob(syncKey);
      const importedIds = JSON.parse(decoded);
      if (Array.isArray(importedIds)) {
        setCheckedIds(new Set(importedIds));
        alert('Progresso sincronizado com sucesso!');
        setShowSync(false);
        setSyncKey('');
      }
    } catch (e) {
      alert('Chave de sincronização inválida.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-teal-200 selection:text-teal-900">
      <PremiumHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        collegeCount={filteredColleges.length} 
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 sm:px-8">
        {/* Sync & Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-black text-teal-950 tracking-tight mb-2">
              Diretório <span className="text-teal-600">Bioquímica Research</span>
            </h2>
            <p className="text-teal-900/60 font-medium">
              Gestão inteligente de dados acadêmicos e monitoramento de interiorização da saúde.
            </p>
            <div className="mt-4 flex gap-4">
               <button 
                 onClick={handleExportProgress}
                 className="text-[10px] font-black uppercase tracking-widest text-teal-600 hover:text-teal-800 flex items-center gap-2"
               >
                 <i className="fas fa-copy"></i> Copiar Chave de Sincronização
               </button>
               <button 
                 onClick={() => setShowSync(!showSync)}
                 className="text-[10px] font-black uppercase tracking-widest text-teal-600 hover:text-teal-800 flex items-center gap-2"
               >
                 <i className="fas fa-sync"></i> Importar de outro aparelho
               </button>
            </div>
            {showSync && (
              <div className="mt-4 flex gap-2 animate-in slide-in-from-top duration-300">
                <input 
                  type="text" 
                  placeholder="Cole aqui a chave de outro aparelho..."
                  className="flex-1 px-4 py-2 bg-white border border-teal-100 rounded-xl text-xs focus:ring-2 focus:ring-teal-500/20 outline-none"
                  value={syncKey}
                  onChange={(e) => setSyncKey(e.target.value)}
                />
                <button onClick={handleImportProgress} className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold">Importar</button>
              </div>
            )}
          </div>

          <div className="glass-card p-5 rounded-[2rem] flex flex-col justify-center shadow-xl shadow-teal-900/5">
             <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-black text-teal-800 uppercase tracking-widest">Progresso de Análise</span>
                <span className="text-2xl font-black text-teal-600">{stats.percent}%</span>
             </div>
             <div className="w-full h-1.5 bg-teal-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-600 transition-all duration-1000"
                  style={{ width: `${stats.percent}%` }}
                ></div>
             </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="glass-card rounded-3xl p-6 mb-8 border border-teal-100 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Sphere Filter */}
            <div className="flex-1">
               <label className="block text-[10px] font-black text-teal-800/40 uppercase tracking-widest mb-3">Esfera Administrativa</label>
               <div className="flex bg-teal-50/50 p-1 rounded-2xl border border-teal-100/50">
                  {['Todos', 'Pública', 'Privada'].map(sphere => (
                    <button
                      key={sphere}
                      onClick={() => setSelectedSphere(sphere as any)}
                      className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        selectedSphere === sphere 
                        ? 'bg-white text-teal-600 shadow-sm border border-teal-100' 
                        : 'text-teal-400 hover:text-teal-600'
                      }`}
                    >
                      {sphere}
                    </button>
                  ))}
               </div>
            </div>

            {/* State Selector */}
            <div className="w-full md:w-64">
               <label className="block text-[10px] font-black text-teal-800/40 uppercase tracking-widest mb-3">Filtro por UF</label>
               <div className="relative">
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-white border border-teal-100 rounded-xl px-4 py-3 text-xs font-bold text-teal-900 focus:ring-2 focus:ring-teal-500/20 outline-none appearance-none cursor-pointer"
                  >
                    {uniqueStates.map(st => (
                      <option key={st} value={st}>{st === 'Todos' ? 'Todos os Estados' : st}</option>
                    ))}
                  </select>
                  <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-teal-400 pointer-events-none text-[10px]"></i>
               </div>
            </div>

            {/* Actions */}
            <div className="flex items-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="h-12 px-8 bg-teal-600 text-white font-black rounded-xl hover:bg-teal-700 shadow-xl shadow-teal-500/20 transition-all transform active:scale-95 flex items-center gap-3"
              >
                <i className="fas fa-plus"></i> NOVA ENTRADA
              </button>
            </div>
          </div>
        </div>

        {/* List Info */}
        <div className="flex items-center gap-4 mb-6">
           <div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal-100 to-transparent"></div>
           <span className="text-[10px] font-black text-teal-900/40 uppercase tracking-[0.4em]">
             EXIBINDO {filteredColleges.length} AMOSTRAS
           </span>
           <div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal-100 to-transparent"></div>
        </div>

        {/* Results Grid */}
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
          <div className="py-24 text-center">
             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 border border-teal-50 shadow-sm relative">
                <i className="fas fa-microscope text-teal-100 text-4xl"></i>
                <i className="fas fa-search text-teal-600 text-lg absolute bottom-4 right-4"></i>
             </div>
             <h3 className="text-2xl font-bold text-teal-900 mb-2">Sem resultados para estes filtros</h3>
             <p className="text-teal-600/60 text-sm max-w-sm mx-auto">Tente redefinir a categoria administrativa ou o estado para encontrar instituições.</p>
          </div>
        )}
      </main>

      <footer className="py-12 bg-white border-t border-teal-50">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <i className="fas fa-dna text-teal-600"></i>
              <span className="text-base font-black text-teal-950 tracking-tighter uppercase">Bioquimica Research</span>
            </div>
            <p className="text-[10px] text-teal-400 font-bold uppercase tracking-widest">Tecnologia, Ciência e Monitoramento Acadêmico</p>
          </div>
          <div className="flex gap-4">
             <div className="px-4 py-2 bg-teal-50 rounded-lg text-[10px] font-black text-teal-600 uppercase">Versão 2026.1</div>
          </div>
        </div>
      </footer>

      <AddCollegeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={(newCol) => {
          const isDuplicate = colleges.some(c => 
            c.name.toLowerCase().trim() === newCol.name.toLowerCase().trim() &&
            c.city.toLowerCase().trim() === newCol.city.toLowerCase().trim()
          );

          if (isDuplicate) return 'Esta instituição já está cadastrada nesta cidade.';

          const collegeWithMeta: College = {
            ...newCol,
            id: crypto.randomUUID(),
            createdAt: Date.now()
          };

          setColleges(prev => [...prev, collegeWithMeta]);
          return null;
        }} 
      />
    </div>
  );
};

export default App;
