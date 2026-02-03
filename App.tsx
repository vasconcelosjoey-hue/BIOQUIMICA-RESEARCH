
import React, { useState, useEffect, useMemo } from 'react';
import { College, AppStats } from './types';
import { INITIAL_COLLEGES } from './data';
import PremiumHeader from './components/PremiumHeader';
import CollegeCard from './components/CollegeCard';
import AddCollegeModal from './components/AddCollegeModal';

const App: React.FC = () => {
  // Persistência robusta
  const [colleges, setColleges] = useState<College[]>(() => {
    try {
      const saved = localStorage.getItem('bioquimica_repo_v4');
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
      const saved = localStorage.getItem('bioquimica_checked_v4');
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
    localStorage.setItem('bioquimica_repo_v4', JSON.stringify(colleges));
  }, [colleges]);

  useEffect(() => {
    localStorage.setItem('bioquimica_checked_v4', JSON.stringify(Array.from(checkedIds)));
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
    alert('Chave de Sincronização copiada para a área de transferência!');
  };

  const handleImportProgress = () => {
    try {
      const decoded = atob(syncKey);
      const importedIds = JSON.parse(decoded);
      if (Array.isArray(importedIds)) {
        setCheckedIds(new Set(importedIds));
        alert('Progresso restaurado com sucesso!');
        setShowSync(false);
        setSyncKey('');
      }
    } catch (e) { alert('Chave de sincronização inválida.'); }
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

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 md:py-12 sm:px-6 lg:px-8">
        
        {/* Painel de Sincronização */}
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

        {/* Hero & Progresso */}
        <div className="flex flex-col lg:flex-row gap-8 mb-10 md:mb-16">
          <div className="flex-1 text-center lg:text-left space-y-4">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-teal-950 tracking-tight leading-[1.1]">
              BIOQUIMICA <span className="text-teal-600">RESEARCH</span>
            </h2>
            <p className="text-teal-900/60 font-medium text-sm md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Diretório consolidado de instituições brasileiras para pesquisadores e estudantes de biociências. Dados sincronizados em tempo real.
            </p>
          </div>

          <div className="w-full lg:w-[380px] shrink-0">
            <div className="glass-card p-6 md:p-8 rounded-[2.5rem] shadow-2xl shadow-teal-900/5 border border-white/50 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                 <i className="fas fa-flask text-8xl text-teal-900"></i>
               </div>
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
                        selectedSphere === sphere 
                        ? 'bg-white text-teal-600 shadow-lg text-shadow-sm' 
                        : 'text-teal-400 hover:text-teal-600'
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
                    className="w-full bg-white border-2 border-teal-50 rounded-2xl px-5 py-3.5 text-xs font-black text-teal-900 focus:border-teal-400 focus:ring-4 focus:ring-teal-500/5 outline-none appearance-none cursor-pointer transition-all"
                  >
                    {uniqueStates.map(st => (
                      <option key={st} value={st}>{st === 'Todos' ? 'Todos os Estados' : `Estado: ${st}`}</option>
                    ))}
                  </select>
                  <i className="fas fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-teal-300 group-hover:text-teal-500 pointer-events-none text-xs transition-colors"></i>
               </div>
            </div>

            <div className="hidden md:flex items-end shrink-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="h-[52px] px-10 bg-teal-950 text-white font-black rounded-2xl hover:bg-teal-900 shadow-2xl shadow-teal-950/20 transition-all flex items-center gap-3 transform hover:translate-y-[-2px] active:translate-y-0"
              >
                <i className="fas fa-plus-circle text-lg"></i>
                <span className="text-xs uppercase tracking-widest">Adicionar Instituição</span>
              </button>
            </div>
          </div>
        </div>

        {/* Listagem de Resultados */}
        <div className="flex flex-col gap-8 md:gap-12 mb-24">
          <div className="flex items-center gap-4">
             <span className="text-[11px] font-black text-teal-950 uppercase tracking-[0.4em] whitespace-nowrap">Resultados Encontrados</span>
             <div className="h-px w-full bg-gradient-to-r from-teal-100 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {filteredColleges.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
                isChecked={checkedIds.has(college.id)}
                onToggleCheck={handleToggleCheck}
              />
            ))}
          </div>

          {filteredColleges.length === 0 && (
            <div className="py-32 text-center animate-in fade-in zoom-in duration-500">
               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border border-teal-50">
                  <i className="fas fa-dna text-teal-100 text-4xl"></i>
               </div>
               <h3 className="text-xl font-black text-teal-950 mb-2">Nenhum registro compatível</h3>
               <p className="text-teal-400 text-xs font-bold uppercase tracking-widest">Tente ajustar seus filtros de busca ou região.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer Multinível Premium */}
      <footer className="pt-20 pb-10 bg-white border-t border-teal-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            
            {/* Branding */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white text-lg shadow-xl shadow-teal-600/20">
                   <i className="fas fa-dna"></i>
                </div>
                <span className="text-xl font-black text-teal-950 uppercase tracking-tighter">Bioquimica Research</span>
              </div>
              <p className="text-xs text-teal-500 leading-relaxed font-semibold pr-4">
                Monitoramento avançado de instituições de ensino superior com foco em biotecnologia e saúde no território brasileiro.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all shadow-sm"><i className="fab fa-instagram"></i></a>
                <a href="#" className="w-10 h-10 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all shadow-sm"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="w-10 h-10 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all shadow-sm"><i className="fas fa-envelope"></i></a>
              </div>
            </div>

            {/* Menu 1 */}
            <div>
              <h4 className="text-[11px] font-black text-teal-950 uppercase tracking-[0.3em] mb-8 relative inline-block">
                Plataforma
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-teal-600 rounded-full"></span>
              </h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-xs font-bold text-teal-400 hover:text-teal-950 transition-colors uppercase tracking-widest">Sobre o Projeto</a></li>
                <li><a href="#" className="text-xs font-bold text-teal-400 hover:text-teal-950 transition-colors uppercase tracking-widest">Documentação</a></li>
                <li><a href="#" className="text-xs font-bold text-teal-400 hover:text-teal-950 transition-colors uppercase tracking-widest">Termos de Uso</a></li>
                <li><a href="#" className="text-xs font-bold text-teal-400 hover:text-teal-950 transition-colors uppercase tracking-widest">Política de Dados</a></li>
              </ul>
            </div>

            {/* Menu 2 */}
            <div>
              <h4 className="text-[11px] font-black text-teal-950 uppercase tracking-[0.3em] mb-8 relative inline-block">
                Regiões Foco
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-teal-600 rounded-full"></span>
              </h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-4">
                {['São Paulo', 'Minas Gerais', 'Rio de Janeiro', 'Paraná', 'Amazonas', 'Bahia', 'Ceará', 'Mato Grosso'].map(reg => (
                  <li key={reg}><a href="#" onClick={() => {setSearchQuery(reg); window.scrollTo({top: 0, behavior: 'smooth'});}} className="text-[10px] font-bold text-teal-400 hover:text-teal-950 transition-colors uppercase tracking-widest whitespace-nowrap">{reg}</a></li>
                ))}
              </ul>
            </div>

            {/* Menu 3 */}
            <div>
              <h4 className="text-[11px] font-black text-teal-950 uppercase tracking-[0.3em] mb-8 relative inline-block">
                Integração
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-teal-600 rounded-full"></span>
              </h4>
              <div className="space-y-4">
                 <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100 flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-teal-600 shadow-sm"><i className="fas fa-database"></i></div>
                    <div>
                      <p className="text-[9px] font-black text-teal-950 uppercase">Versão do DB</p>
                      <p className="text-[11px] font-bold text-teal-600">v4.2.0 Stable</p>
                    </div>
                 </div>
                 <button onClick={() => setShowSync(true)} className="w-full py-4 bg-teal-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-teal-950/20 hover:bg-teal-900 transition-all active:scale-95">
                   Abrir Console Sync
                 </button>
              </div>
            </div>
          </div>
          
          {/* Assinatura Final */}
          <div className="pt-10 border-t border-teal-50 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
               <div className="h-px w-12 bg-teal-100"></div>
               <p className="text-[12px] font-black text-teal-950/30 uppercase tracking-[0.4em]">
                  POWERED BY <span className="text-teal-600/60">JOI.A.</span>
               </p>
               <div className="h-px w-12 bg-teal-100"></div>
            </div>
            <p className="text-[10px] font-bold text-teal-300 uppercase tracking-[0.2em] text-center max-w-sm leading-relaxed">
              todos direitos reservados © 2026 • Inteligência em Dados Acadêmicos aplicada à Bioquímica.
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
          if (isDuplicate) return 'Esta instituição já consta no banco de dados para esta localidade.';
          const collegeWithMeta: College = { ...newCol, id: crypto.randomUUID(), createdAt: Date.now() };
          setColleges(prev => [...prev, collegeWithMeta]);
          return null;
        }} 
      />
    </div>
  );
};

export default App;