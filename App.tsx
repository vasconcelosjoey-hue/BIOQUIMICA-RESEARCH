
import React, { useState, useEffect, useMemo } from 'react';
import { College, AppStats } from './types';
import { INITIAL_COLLEGES } from './data';
import PremiumHeader from './components/PremiumHeader';
import CollegeCard from './components/CollegeCard';
import AddCollegeModal from './components/AddCollegeModal';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // URL da imagem do pesquisador
  const researcherImg = "https://images.unsplash.com/photo-1532187875302-1df92329971d?auto=format&fit=crop&q=80&w=400&h=400";

  // Persistência robusta
  const [colleges, setColleges] = useState<College[]>(() => {
    try {
      const saved = localStorage.getItem('bioquimica_repo_v6');
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
      const saved = localStorage.getItem('bioquimica_checked_v6');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (e) {
      return new Set();
    }
  });

  // Estados de UI
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSphere, setSelectedSphere] = useState<'Todos' | 'Pública' | 'Privada'>('Todos');
  const [selectedState, setSelectedState] = useState<string>('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSync, setShowSync] = useState(false);
  const [syncKey, setSyncKey] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('bioquimica_repo_v6', JSON.stringify(colleges));
  }, [colleges]);

  useEffect(() => {
    localStorage.setItem('bioquimica_checked_v6', JSON.stringify(Array.from(checkedIds)));
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
    return { total, checked, percent: total > 0 ? Math.round((checked / total) * 100) : 0 };
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
    alert('Chave de Sincronização copiada!');
  };

  const handleImportProgress = () => {
    try {
      const decoded = atob(syncKey);
      const importedIds = JSON.parse(decoded);
      if (Array.isArray(importedIds)) {
        setCheckedIds(new Set(importedIds));
        alert('Progresso restaurado!');
        setShowSync(false);
        setSyncKey('');
      }
    } catch (e) { alert('Chave inválida.'); }
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex flex-col selection:bg-teal-200 selection:text-teal-900 bg-[#F8FAFA] animate-in fade-in duration-1000">
      <PremiumHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        collegeCount={filteredColleges.length}
        onOpenAdd={() => setIsModalOpen(true)}
        onToggleSync={() => setShowSync(!showSync)}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 md:py-12 sm:px-6 lg:px-8">
        
        {showSync && (
          <div className="mb-8 glass-card rounded-3xl p-6 border-2 border-teal-500/20 animate-in slide-in-from-top duration-500">
             <div className="flex flex-col md:flex-row items-center gap-4">
               <div className="flex-1 w-full">
                 <p className="text-[10px] font-black text-teal-800 uppercase tracking-widest mb-2 ml-1">Chave de Restauração</p>
                 <input 
                    type="text" 
                    placeholder="Cole seu código aqui..."
                    className="w-full px-4 py-3 bg-white border border-teal-100 rounded-2xl text-xs md:text-sm outline-none focus:ring-4 focus:ring-teal-500/10 transition-all font-mono"
                    value={syncKey}
                    onChange={(e) => setSyncKey(e.target.value)}
                  />
               </div>
                <div className="flex gap-2 w-full md:w-auto md:pt-6">
                  <button onClick={handleImportProgress} className="flex-1 md:px-8 py-3.5 bg-teal-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-teal-600/20 active:scale-95 transition-all">Restaurar</button>
                  <button onClick={handleExportProgress} className="flex-1 md:px-8 py-3.5 bg-white border border-teal-100 text-teal-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-teal-50 active:scale-95 transition-all">Exportar</button>
                </div>
             </div>
          </div>
        )}

        {/* Hero & Progresso com a Foto do Pesquisador */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-10 md:mb-16 items-center lg:items-start text-center lg:text-left">
          
          {/* Foto Principal Personalizada */}
          <div className="shrink-0 relative group">
            <div className="absolute -inset-4 bg-teal-600/10 rounded-full blur-2xl group-hover:bg-teal-600/20 transition-all duration-700"></div>
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-[6px] border-white shadow-[0_20px_50px_rgba(13,148,136,0.15)] overflow-hidden relative z-10 transform group-hover:scale-[1.03] transition-transform duration-500">
              <img 
                src={researcherImg} 
                alt="Lead Researcher Bioquimica" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badge de Verificado */}
            <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 z-20 w-8 h-8 md:w-10 md:h-10 bg-teal-600 text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <i className="fas fa-certificate text-[10px] md:text-xs"></i>
            </div>
          </div>

          <div className="flex-1 space-y-4 pt-2">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-teal-950 tracking-tight leading-[1.1]">
              BIOQUIMICA <span className="text-teal-600 italic">RESEARCH</span>
            </h2>
            <p className="text-teal-900/60 font-medium text-sm md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Diretório consolidado de instituições brasileiras para pesquisadores e estudantes de biociências. Dados sincronizados em tempo real sob gestão especializada.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-4">
              <span className="px-3 py-1 bg-teal-50 text-teal-700 text-[10px] font-black uppercase rounded-full border border-teal-100">Atualizado 2026</span>
              <span className="px-3 py-1 bg-teal-950 text-white text-[10px] font-black uppercase rounded-full">Database Premium</span>
            </div>
          </div>

          <div className="w-full lg:w-[350px] shrink-0 mt-6 lg:mt-0">
            <div className="glass-card p-6 md:p-8 rounded-[2.5rem] shadow-2xl shadow-teal-900/5 border border-white/50 relative overflow-hidden group">
               <div className="relative z-10">
                 <div className="flex justify-between items-end mb-4">
                    <span className="text-[10px] font-black text-teal-800 uppercase tracking-[0.2em]">Sua Pesquisa</span>
                    <span className="text-3xl md:text-4xl font-black text-teal-600 tabular-nums">{stats.percent}%</span>
                 </div>
                 <div className="w-full h-3 bg-teal-50 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-gradient-to-r from-teal-500 via-teal-600 to-teal-800 transition-all duration-1000 ease-out" style={{ width: `${stats.percent}%` }}></div>
                 </div>
                 <div className="mt-5 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                   <span className="text-teal-400">{stats.checked} Concluídos</span>
                   <span className="text-teal-900/30">{stats.total} Total</span>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Filtros Inteligentes */}
        <div className="glass-card rounded-[2rem] p-5 md:p-8 mb-10 md:mb-14 border border-teal-100 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-stretch md:items-end">
            
            <div className="flex-1 space-y-3">
               <label className="block text-[10px] font-black text-teal-800/40 uppercase tracking-[0.2em] ml-1">Esfera Administrativa</label>
               <div className="flex bg-teal-50/80 p-1.5 rounded-2xl border border-teal-100/50 shadow-inner">
                  {['Todos', 'Pública', 'Privada'].map(sphere => (
                    <button
                      key={sphere}
                      onClick={() => setSelectedSphere(sphere as any)}
                      className={`flex-1 px-3 py-3 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${
                        selectedSphere === sphere ? 'bg-white text-teal-600 shadow-lg' : 'text-teal-400 hover:text-teal-600'
                      }`}
                    >
                      {sphere}
                    </button>
                  ))}
               </div>
            </div>

            <div className="w-full md:w-72 space-y-3">
               <label className="block text-[10px] font-black text-teal-800/40 uppercase tracking-[0.2em] ml-1">Região (UF)</label>
               <div className="relative group">
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-white border-2 border-teal-50 rounded-2xl px-5 py-3.5 text-xs font-black text-teal-900 focus:border-teal-400 outline-none appearance-none cursor-pointer transition-all"
                  >
                    {uniqueStates.map(st => (
                      <option key={st} value={st}>{st === 'Todos' ? 'Todos os Estados' : `Estado: ${st}`}</option>
                    ))}
                  </select>
                  <i className="fas fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-teal-300 pointer-events-none text-xs transition-colors"></i>
               </div>
            </div>

            <div className="hidden md:flex items-end shrink-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="h-[52px] px-10 bg-teal-950 text-white font-black rounded-2xl hover:bg-teal-900 shadow-2xl transition-all flex items-center gap-3"
              >
                <i className="fas fa-plus-circle"></i>
                <span className="text-xs uppercase tracking-widest">Adicionar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Listagem de Resultados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-24">
          {filteredColleges.map((college) => (
            <CollegeCard
              key={college.id}
              college={college}
              isChecked={checkedIds.has(college.id)}
              onToggleCheck={handleToggleCheck}
            />
          ))}
        </div>
      </main>

      {/* Footer Personalizado */}
      <footer className="pt-20 pb-10 bg-white border-t border-teal-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg">
                   <img src={researcherImg} className="w-full h-full object-cover" alt="Research Logo" />
                </div>
                <span className="text-xl font-black text-teal-950 uppercase tracking-tighter">Bioquimica Research</span>
              </div>
              <p className="text-xs text-teal-500 font-semibold pr-4 leading-relaxed">
                Repositório de informações acadêmicas com foco em bioquímica e biociências no Brasil.
              </p>
            </div>

            <div>
              <h4 className="text-[11px] font-black text-teal-950 uppercase tracking-[0.3em] mb-8 relative inline-block">
                Plataforma
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-teal-600 rounded-full"></span>
              </h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-xs font-bold text-teal-400 hover:text-teal-950 transition-colors uppercase tracking-widest">Sobre</a></li>
                <li><a href="#" className="text-xs font-bold text-teal-400 hover:text-teal-950 transition-colors uppercase tracking-widest">MEC Docs</a></li>
                <li><a href="#" className="text-xs font-bold text-teal-400 hover:text-teal-950 transition-colors uppercase tracking-widest">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-black text-teal-950 uppercase tracking-[0.3em] mb-8 relative inline-block">
                Regiões
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-teal-600 rounded-full"></span>
              </h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-4">
                {['SP', 'MG', 'RJ', 'PR', 'AM', 'BA'].map(reg => (
                  <li key={reg}><a href="#" onClick={() => {setSearchQuery(reg); window.scrollTo({top: 0, behavior: 'smooth'});}} className="text-[10px] font-bold text-teal-400 hover:text-teal-950 transition-colors uppercase tracking-widest">{reg}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-black text-teal-950 uppercase tracking-[0.3em] mb-8 relative inline-block">
                Sistema
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-teal-600 rounded-full"></span>
              </h4>
              <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100 flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-teal-600 shadow-sm"><i className="fas fa-database"></i></div>
                  <div>
                    <p className="text-[9px] font-black text-teal-950 uppercase">Versão</p>
                    <p className="text-[11px] font-bold text-teal-600">v6.1.0 Premium</p>
                  </div>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-teal-50 flex flex-col items-center gap-6">
            <p className="text-[12px] font-black text-teal-950/30 uppercase tracking-[0.4em]">
              POWERED BY <span className="text-teal-600/60">JOI.A.</span>
            </p>
            <p className="text-[10px] font-bold text-teal-300 uppercase tracking-[0.2em] text-center">
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
          if (isDuplicate) return 'Esta instituição já consta no banco de dados.';
          const collegeWithMeta: College = { ...newCol, id: crypto.randomUUID(), createdAt: Date.now() };
          setColleges(prev => [...prev, collegeWithMeta]);
          return null;
        }} 
      />
    </div>
  );
};

export default App;
