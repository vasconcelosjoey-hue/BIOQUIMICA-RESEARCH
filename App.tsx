
import React, { useState, useEffect, useMemo } from 'react';
import { College, AppStats } from './types';
import { INITIAL_COLLEGES } from './data';
import PremiumHeader from './components/PremiumHeader';
import CollegeCard from './components/CollegeCard';
import AddCollegeModal from './components/AddCollegeModal';

const App: React.FC = () => {
  // Persistence and Unique Consolidation
  const [colleges, setColleges] = useState<College[]>(() => {
    try {
      const saved = localStorage.getItem('bioquimica_repo_v2');
      let savedColleges: College[] = saved ? JSON.parse(saved) : [];
      
      // Combine saved with initial, ensuring no duplicates (Name + City)
      const registry = new Map<string, College>();
      
      // Load initial first (as baseline)
      INITIAL_COLLEGES.forEach(c => registry.set(`${c.name.toLowerCase().trim()}|${c.city.toLowerCase().trim()}`, c));
      
      // Overwrite with saved (user additions or modifications)
      savedColleges.forEach(c => registry.set(`${c.name.toLowerCase().trim()}|${c.city.toLowerCase().trim()}`, c));

      return Array.from(registry.values());
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

  // UI States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSphere, setSelectedSphere] = useState<'Todos' | 'Pública' | 'Privada'>('Todos');
  const [selectedState, setSelectedState] = useState<string>('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSync, setShowSync] = useState(false);
  const [syncKey, setSyncKey] = useState('');

  // Auto-save whenever data changes
  useEffect(() => {
    localStorage.setItem('bioquimica_repo_v2', JSON.stringify(colleges));
  }, [colleges]);

  useEffect(() => {
    localStorage.setItem('bioquimica_checked_v2', JSON.stringify(Array.from(checkedIds)));
  }, [checkedIds]);

  // Derived options for filters
  const uniqueStates = useMemo(() => {
    const states = Array.from(new Set(colleges.map(c => c.state))).sort();
    return ['Todos', ...states];
  }, [colleges]);

  // Comprehensive Filtering & Alpha Sorting
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
        const sphereType = c.type.toLowerCase();
        if (selectedSphere === 'Pública') {
          matchesSphere = sphereType.includes('federal') || sphereType.includes('estadual') || sphereType.includes('municipal') || sphereType.includes('pública');
        } else if (selectedSphere === 'Privada') {
          matchesSphere = sphereType.includes('privada') || sphereType.includes('comunitária');
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
    alert('Chave de Sincronização copiada! Use esta chave em outro navegador ou aparelho para restaurar seus Checks.');
  };

  const handleImportProgress = () => {
    try {
      const decoded = atob(syncKey);
      const importedIds = JSON.parse(decoded);
      if (Array.isArray(importedIds)) {
        setCheckedIds(new Set(importedIds));
        alert('Progresso sincronizado! ' + importedIds.length + ' itens marcados.');
        setShowSync(false);
        setSyncKey('');
      }
    } catch (e) {
      alert('Chave inválida ou corrompida.');
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
        {/* Progress & Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-extrabold text-teal-950 tracking-tight mb-2">
              BIOQUIMICA <span className="text-teal-600">RESEARCH</span>
            </h2>
            <p className="text-teal-900/60 font-medium">
              Consolidação nacional de dados acadêmicos. Mais de 80 registros mapeados e ordenados.
            </p>
            
            <div className="mt-6 flex flex-wrap gap-4">
               <button 
                 onClick={handleExportProgress}
                 className="px-4 py-2 bg-white border border-teal-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-teal-600 hover:bg-teal-50 transition-all shadow-sm flex items-center gap-2"
               >
                 <i className="fas fa-key"></i> Gerar Chave de Sync
               </button>
               <button 
                 onClick={() => setShowSync(!showSync)}
                 className="px-4 py-2 bg-white border border-teal-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-teal-600 hover:bg-teal-50 transition-all shadow-sm flex items-center gap-2"
               >
                 <i className="fas fa-file-import"></i> Restaurar Progresso
               </button>
            </div>
            {showSync && (
              <div className="mt-4 flex gap-2 animate-in slide-in-from-top duration-300">
                <input 
                  type="text" 
                  placeholder="Cole aqui a chave de sincronização..."
                  className="flex-1 px-4 py-3 bg-white border border-teal-200 rounded-xl text-xs focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                  value={syncKey}
                  onChange={(e) => setSyncKey(e.target.value)}
                />
                <button 
                  onClick={handleImportProgress} 
                  className="px-6 py-3 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-700 shadow-lg shadow-teal-500/20"
                >
                  Restaurar
                </button>
              </div>
            )}
          </div>

          <div className="glass-card p-6 rounded-[2.5rem] flex flex-col justify-center shadow-xl shadow-teal-900/5 border border-white">
             <div className="flex justify-between items-end mb-3">
                <span className="text-[10px] font-black text-teal-800 uppercase tracking-[0.2em]">Pesquisado</span>
                <span className="text-3xl font-black text-teal-600">{stats.percent}%</span>
             </div>
             <div className="w-full h-2 bg-teal-50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 to-teal-700 transition-all duration-1000"
                  style={{ width: `${stats.percent}%` }}
                ></div>
             </div>
             <p className="mt-4 text-[10px] font-bold text-teal-400 uppercase tracking-widest">
               {stats.checked} de {stats.total} Instituições analisadas
             </p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="glass-card rounded-[2rem] p-6 mb-10 border border-teal-100 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Sphere Filter */}
            <div className="flex-1 w-full">
               <label className="block text-[10px] font-black text-teal-800/40 uppercase tracking-widest mb-3 ml-1">Esfera Administrativa</label>
               <div className="flex bg-teal-50/80 p-1 rounded-2xl border border-teal-100/50">
                  {['Todos', 'Pública', 'Privada'].map(sphere => (
                    <button
                      key={sphere}
                      onClick={() => setSelectedSphere(sphere as any)}
                      className={`flex-1 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                        selectedSphere === sphere 
                        ? 'bg-white text-teal-600 shadow-md border border-teal-100' 
                        : 'text-teal-400 hover:text-teal-600'
                      }`}
                    >
                      {sphere}
                    </button>
                  ))}
               </div>
            </div>

            {/* State Selector */}
            <div className="w-full md:w-72">
               <label className="block text-[10px] font-black text-teal-800/40 uppercase tracking-widest mb-3 ml-1">Filtrar por UF</label>
               <div className="relative group">
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-white border border-teal-100 rounded-2xl px-5 py-3.5 text-xs font-bold text-teal-900 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-400 outline-none appearance-none cursor-pointer group-hover:bg-teal-50/30 transition-all"
                  >
                    {uniqueStates.map(st => (
                      <option key={st} value={st}>{st === 'Todos' ? 'Todos os Estados' : `Estado: ${st}`}</option>
                    ))}
                  </select>
                  <i className="fas fa-location-dot absolute right-5 top-1/2 -translate-y-1/2 text-teal-400 pointer-events-none text-xs"></i>
               </div>
            </div>

            {/* Actions */}
            <div className="flex items-end shrink-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="h-14 px-10 bg-teal-950 text-white font-black rounded-2xl hover:bg-teal-900 shadow-2xl shadow-teal-950/20 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center gap-3"
              >
                <i className="fas fa-plus-circle text-lg"></i> CADASTRAR
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center gap-6 mb-8">
           <div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal-200 to-transparent opacity-50"></div>
           <div className="flex flex-col items-center">
             <span className="text-[10px] font-black text-teal-950 uppercase tracking-[0.5em] mb-1">Listagem Geral</span>
             <span className="text-[9px] font-bold text-teal-400 uppercase tracking-[0.2em]">{filteredColleges.length} Registros Ordenados</span>
           </div>
           <div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal-200 to-transparent opacity-50"></div>
        </div>

        {/* List Grid */}
        {filteredColleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-24">
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
          <div className="py-32 text-center">
             <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mx-auto mb-8 border border-teal-50 shadow-inner relative">
                <i className="fas fa-flask text-teal-100 text-5xl"></i>
                <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                   <i className="fas fa-search text-teal-600/30 text-2xl"></i>
                </div>
             </div>
             <h3 className="text-2xl font-black text-teal-950 mb-3 tracking-tight">Nenhuma correspondência encontrada</h3>
             <p className="text-teal-600/60 text-sm max-w-sm mx-auto font-medium">
               Refine sua pesquisa ou altere os filtros de estado e categoria administrativa.
             </p>
          </div>
        )}
      </main>

      <footer className="py-16 bg-white border-t border-teal-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center mb-12">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white text-xs shadow-lg shadow-teal-500/20">
                   <i className="fas fa-dna"></i>
                </div>
                <span className="text-lg font-black text-teal-950 tracking-tighter uppercase">Bioquimica Research</span>
              </div>
              <p className="text-[10px] text-teal-400 font-black uppercase tracking-widest leading-relaxed">
                Mapeamento Institucional e Acadêmico • Brasil 2026
              </p>
            </div>
            
            <div className="flex justify-center gap-8">
               <div className="text-center">
                  <p className="text-[10px] font-black text-teal-950 uppercase tracking-widest mb-1">{stats.total}</p>
                  <p className="text-[8px] font-bold text-teal-400 uppercase tracking-widest">Total</p>
               </div>
               <div className="text-center">
                  <p className="text-[10px] font-black text-teal-950 uppercase tracking-widest mb-1">{stats.checked}</p>
                  <p className="text-[8px] font-bold text-teal-400 uppercase tracking-widest">Concluídos</p>
               </div>
               <div className="text-center">
                  <p className="text-[10px] font-black text-teal-950 uppercase tracking-widest mb-1">{stats.total - stats.checked}</p>
                  <p className="text-[8px] font-bold text-teal-400 uppercase tracking-widest">Pendentes</p>
               </div>
            </div>

            <div className="flex justify-center md:justify-end gap-5">
               <div className="px-5 py-2.5 bg-teal-50 rounded-xl text-[10px] font-black text-teal-700 uppercase tracking-widest border border-teal-100">
                 Database v2.0
               </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-teal-50/50 flex flex-col items-center gap-2">
            <p className="text-[11px] font-black text-teal-950/40 uppercase tracking-[0.3em]">
              POWERED BY <span className="text-teal-600">JOI.A.</span>
            </p>
            <p className="text-[9px] font-bold text-teal-300 uppercase tracking-[0.15em]">
              todos direitos reservados © 2026
            </p>
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
