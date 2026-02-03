
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
      const saved = localStorage.getItem('bioquimica_repo_v3');
      let savedColleges: College[] = saved ? JSON.parse(saved) : [];
      const registry = new Map<string, College>();
      INITIAL_COLLEGES.forEach(c => registry.set(`${c.name.toLowerCase().trim()}|${c.city.toLowerCase().trim()}`, c));
      savedColleges.forEach(c => registry.set(`${c.name.toLowerCase().trim()}|${c.city.toLowerCase().trim()}`, c));
      return Array.from(registry.values());
    } catch (e) {
      return INITIAL_COLLEGES;
    }
  });

  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('bioquimica_checked_v3');
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

  useEffect(() => {
    localStorage.setItem('bioquimica_repo_v3', JSON.stringify(colleges));
  }, [colleges]);

  useEffect(() => {
    localStorage.setItem('bioquimica_checked_v3', JSON.stringify(Array.from(checkedIds)));
  }, [checkedIds]);

  const uniqueStates = useMemo(() => {
    const states = Array.from(new Set(colleges.map(c => c.state))).sort();
    return ['Todos', ...states];
  }, [colleges]);

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
    alert('Chave de Sync copiada!');
  };

  const handleImportProgress = () => {
    try {
      const decoded = atob(syncKey);
      const importedIds = JSON.parse(decoded);
      if (Array.isArray(importedIds)) {
        setCheckedIds(new Set(importedIds));
        alert('Sincronizado!');
        setShowSync(false);
        setSyncKey('');
      }
    } catch (e) { alert('Erro na chave.'); }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-teal-200 selection:text-teal-900 bg-[#F8FAFA]">
      <PremiumHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        collegeCount={filteredColleges.length}
        onOpenAdd={() => setIsModalOpen(true)}
        onToggleSync={() => setShowSync(!showSync)}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 md:py-10 sm:px-8">
        
        {/* Sync Panel Mobile-First */}
        {showSync && (
          <div className="mb-8 glass-card rounded-2xl md:rounded-3xl p-4 md:p-6 border border-teal-200 animate-in slide-in-from-top duration-300">
             <div className="flex flex-col md:flex-row items-center gap-4">
               <input 
                  type="text" 
                  placeholder="Cole sua chave aqui..."
                  className="w-full flex-1 px-4 py-3 bg-white border border-teal-200 rounded-xl text-xs md:text-sm outline-none"
                  value={syncKey}
                  onChange={(e) => setSyncKey(e.target.value)}
                />
                <div className="flex gap-2 w-full md:w-auto">
                  <button onClick={handleImportProgress} className="flex-1 md:px-6 py-3 bg-teal-600 text-white rounded-xl text-xs font-bold shadow-lg">Restaurar</button>
                  <button onClick={handleExportProgress} className="flex-1 md:px-6 py-3 bg-white border border-teal-100 text-teal-600 rounded-xl text-xs font-bold">Exportar</button>
                </div>
             </div>
          </div>
        )}

        {/* Hero & Stats - Vertical on Mobile */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8 md:mb-12">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-teal-950 tracking-tight mb-3">
              BIOQUIMICA <span className="text-teal-600 italic">RESEARCH</span>
            </h2>
            <p className="text-teal-900/60 font-medium text-sm md:text-base max-w-2xl mx-auto lg:mx-0">
              O maior ecossistema de dados acadêmicos em biociências do país. Dados consolidados e atualizados para 2026.
            </p>
          </div>

          <div className="w-full lg:w-[350px] shrink-0">
            <div className="glass-card p-5 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl shadow-teal-900/5 border border-white">
               <div className="flex justify-between items-end mb-3">
                  <span className="text-[9px] font-black text-teal-800 uppercase tracking-widest">Análise de Dados</span>
                  <span className="text-2xl md:text-3xl font-black text-teal-600">{stats.percent}%</span>
               </div>
               <div className="w-full h-2 bg-teal-50 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-500 to-teal-700 transition-all duration-1000" style={{ width: `${stats.percent}%` }}></div>
               </div>
               <p className="mt-3 text-[9px] font-bold text-teal-400 uppercase tracking-[0.2em]">
                 {stats.checked} de {stats.total} Pesquisas concluídas
               </p>
            </div>
          </div>
        </div>

        {/* Responsive Filter Toolbar */}
        <div className="glass-card rounded-2xl md:rounded-[2rem] p-4 md:p-6 mb-8 md:mb-10 border border-teal-100 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch md:items-center">
            
            <div className="flex-1">
               <label className="block text-[9px] font-black text-teal-800/40 uppercase tracking-widest mb-2 md:mb-3 ml-1">Esfera Administrativa</label>
               <div className="flex bg-teal-50/80 p-1 rounded-xl md:rounded-2xl border border-teal-100/50">
                  {['Todos', 'Pública', 'Privada'].map(sphere => (
                    <button
                      key={sphere}
                      onClick={() => setSelectedSphere(sphere as any)}
                      className={`flex-1 px-2 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold transition-all ${
                        selectedSphere === sphere ? 'bg-white text-teal-600 shadow-md' : 'text-teal-400'
                      }`}
                    >
                      {sphere}
                    </button>
                  ))}
               </div>
            </div>

            <div className="w-full md:w-64">
               <label className="block text-[9px] font-black text-teal-800/40 uppercase tracking-widest mb-2 md:mb-3 ml-1">Região (UF)</label>
               <div className="relative">
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-white border border-teal-100 rounded-xl md:rounded-2xl px-4 py-2.5 md:py-3.5 text-xs font-bold text-teal-900 focus:ring-4 focus:ring-teal-500/10 outline-none appearance-none cursor-pointer"
                  >
                    {uniqueStates.map(st => (
                      <option key={st} value={st}>{st === 'Todos' ? 'Todos os Estados' : `UF: ${st}`}</option>
                    ))}
                  </select>
                  <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-teal-300 pointer-events-none text-[10px]"></i>
               </div>
            </div>

            <div className="hidden md:flex items-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="h-14 px-8 bg-teal-950 text-white font-black rounded-2xl hover:bg-teal-900 transition-all flex items-center gap-2"
              >
                <i className="fas fa-plus"></i> NOVO
              </button>
            </div>
          </div>
        </div>

        {/* Grid Results - Responsive Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-20">
          {filteredColleges.map((college) => (
            <CollegeCard
              key={college.id}
              college={college}
              isChecked={checkedIds.has(college.id)}
              onToggleCheck={handleToggleCheck}
            />
          ))}
          {filteredColleges.length === 0 && (
            <div className="col-span-full py-20 text-center opacity-40">
               <i className="fas fa-search text-5xl mb-4"></i>
               <p className="font-bold uppercase tracking-widest text-xs">Nenhuma correspondência</p>
            </div>
          )}
        </div>
      </main>

      {/* Multinvel Responsive Footer */}
      <footer className="pt-16 pb-8 bg-white border-t border-teal-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            
            {/* Col 1: Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white text-xs">
                   <i className="fas fa-dna"></i>
                </div>
                <span className="text-lg font-black text-teal-950 uppercase tracking-tighter">Bioquimica Research</span>
              </div>
              <p className="text-xs text-teal-400 leading-relaxed font-medium">
                Monitoramento e diretório de instituições de ensino superior com foco em biotecnologia e saúde no território nacional.
              </p>
            </div>

            {/* Col 2: Navigation Menus */}
            <div>
              <h4 className="text-[10px] font-black text-teal-950 uppercase tracking-[0.2em] mb-4">Acesso Rápido</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs text-teal-400 hover:text-teal-600 transition-colors">Sobre o Diretório</a></li>
                <li><a href="#" className="text-xs text-teal-400 hover:text-teal-600 transition-colors">Normativas MEC</a></li>
                <li><a href="#" className="text-xs text-teal-400 hover:text-teal-600 transition-colors">Prazos de Inscrição</a></li>
              </ul>
            </div>

            {/* Col 3: Filter Presets Menu */}
            <div>
              <h4 className="text-[10px] font-black text-teal-950 uppercase tracking-[0.2em] mb-4">Regiões Ativas</h4>
              <ul className="grid grid-cols-2 gap-2">
                {['São Paulo', 'Minas Gerais', 'Paraná', 'Bahia', 'Amazonas', 'Ceará'].map(reg => (
                  <li key={reg}><a href="#" onClick={() => setSearchQuery(reg)} className="text-[11px] text-teal-400 hover:text-teal-600 truncate">{reg}</a></li>
                ))}
              </ul>
            </div>

            {/* Col 4: Sync & Status Menu */}
            <div>
              <h4 className="text-[10px] font-black text-teal-950 uppercase tracking-[0.2em] mb-4">Sistema</h4>
              <div className="space-y-3">
                 <div className="flex items-center gap-3 px-3 py-2 bg-teal-50 rounded-lg">
                    <i className="fas fa-database text-teal-600 text-[10px]"></i>
                    <span className="text-[10px] font-bold text-teal-800">DATABASE v3.1</span>
                 </div>
                 <div className="flex items-center gap-3 px-3 py-2 bg-teal-950 rounded-lg text-white">
                    <i className="fas fa-shield-halved text-[10px]"></i>
                    <span className="text-[10px] font-bold">DADOS SEGUROS</span>
                 </div>
              </div>
            </div>
          </div>
          
          {/* Final Bottom Bar */}
          <div className="pt-8 border-t border-teal-50 flex flex-col items-center gap-4">
            <div className="flex gap-6">
              <a href="#" className="text-teal-200 hover:text-teal-600 transition-colors"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-teal-200 hover:text-teal-600 transition-colors"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="text-teal-200 hover:text-teal-600 transition-colors"><i className="fab fa-github"></i></a>
            </div>
            <div className="text-center">
              <p className="text-[11px] font-black text-teal-950/30 uppercase tracking-[0.3em] mb-1">
                POWERED BY <span className="text-teal-600/50">JOI.A.</span>
              </p>
              <p className="text-[9px] font-bold text-teal-300 uppercase tracking-widest">
                todos direitos reservados © 2026
              </p>
            </div>
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
          if (isDuplicate) return 'Esta instituição já existe nesta cidade.';
          const collegeWithMeta: College = { ...newCol, id: crypto.randomUUID(), createdAt: Date.now() };
          setColleges(prev => [...prev, collegeWithMeta]);
          return null;
        }} 
      />
    </div>
  );
};

export default App;
