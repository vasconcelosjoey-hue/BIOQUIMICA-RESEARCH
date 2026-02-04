
import React, { useState, useEffect, useMemo } from 'react';
import { College, AppStats } from './types';
import { INITIAL_COLLEGES, ALL_STATES } from './data';
import PremiumHeader from './components/PremiumHeader';
import CollegeCard from './components/CollegeCard';
import AddCollegeModal from './components/AddCollegeModal';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // ESTADO DOS DADOS
  const [colleges, setColleges] = useState<College[]>(() => {
    try {
      const saved = localStorage.getItem('bioquimica_repo_v11');
      const savedColleges: College[] = saved ? JSON.parse(saved) : [];
      const registry = new Map<string, College>();
      INITIAL_COLLEGES.forEach(c => registry.set(c.id, c));
      savedColleges.forEach(c => {
        if (!registry.has(c.id)) registry.set(c.id, c);
      });
      return Array.from(registry.values());
    } catch (e) {
      return INITIAL_COLLEGES;
    }
  });

  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('bioquimica_checked_v11');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (e) {
      return new Set();
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSphere, setSelectedSphere] = useState<'Todos' | 'Pública' | 'Privada'>('Todos');
  const [selectedState, setSelectedState] = useState<string>('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSync, setShowSync] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // DETECÇÃO DE LINK COMPARTILHADO (HYDRATION)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#share=')) {
      try {
        const base64 = hash.split('#share=')[1];
        const jsonStr = atob(base64);
        const sharedData = JSON.parse(jsonStr);

        if (sharedData.customColleges || sharedData.checkedIds) {
          // Merge das faculdades customizadas
          if (sharedData.customColleges) {
            setColleges(prev => {
              const registry = new Map<string, College>();
              prev.forEach(c => registry.set(c.id, c));
              sharedData.customColleges.forEach((c: College) => registry.set(c.id, c));
              return Array.from(registry.values());
            });
          }
          // Merge dos checks
          if (sharedData.checkedIds) {
            setCheckedIds(prev => new Set([...Array.from(prev), ...sharedData.checkedIds]));
          }
          
          // Notificação visual simples e limpeza de URL
          alert("📡 Dados de pesquisa importados com sucesso via link compartilhado!");
          window.history.replaceState(null, "", window.location.pathname);
        }
      } catch (e) {
        console.error("Erro ao decodificar link de compartilhamento", e);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('bioquimica_repo_v11', JSON.stringify(colleges));
  }, [colleges]);

  useEffect(() => {
    localStorage.setItem('bioquimica_checked_v11', JSON.stringify(Array.from(checkedIds)));
  }, [checkedIds]);

  // Fix: added handleToggleCheck to fix the error in line 239 where it was called but not defined
  const handleToggleCheck = (id: string) => {
    setCheckedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredColleges = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return colleges.filter(c => {
      if (selectedState !== 'Todos' && c.state !== selectedState) return false;
      if (selectedSphere !== 'Todos') {
        const type = c.type.toLowerCase();
        const isPublic = type.includes('federal') || type.includes('estadual') || type.includes('municipal') || type.includes('pública');
        const isPrivate = type.includes('privada') || type.includes('comunitária') || type.includes('filantrópica');
        if (selectedSphere === 'Pública' && !isPublic) return false;
        if (selectedSphere === 'Privada' && !isPrivate) return false;
      }
      if (q) {
        const inName = c.name.toLowerCase().includes(q);
        const inCity = c.city.toLowerCase().includes(q);
        const inCourses = c.courses.some(course => course.toLowerCase().includes(q));
        if (!inName && !inCity && !inCourses) return false;
      }
      return true;
    }).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }, [colleges, searchQuery, selectedSphere, selectedState]);

  // FUNÇÃO DE GERAÇÃO DE LINK MÁGICO
  const handleShareLink = () => {
    const customColleges = colleges.filter(c => c.id.startsWith('custom-'));
    const checkedArray = Array.from(checkedIds);
    
    const dataToShare = {
      customColleges,
      checkedIds: checkedArray,
      v: "1.1"
    };

    const jsonStr = JSON.stringify(dataToShare);
    const base64 = btoa(jsonStr);
    const shareUrl = `${window.location.origin}${window.location.pathname}#share=${base64}`;

    navigator.clipboard.writeText(shareUrl);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 3000);
  };

  const generatePDF = async () => {
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
    const title = selectedState === 'Todos' ? 'BRASIL' : selectedState;
    doc.setFillColor(13, 148, 136); 
    doc.rect(0, 0, doc.internal.pageSize.width, 100, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(`DIRETÓRIO BIOQUÍMICA: ${title}`, 40, 55);
    doc.setFontSize(10);
    doc.text(`Registros Exportados: ${filteredColleges.length} | Data: ${new Date().toLocaleDateString()}`, 40, 85);
    const tableData = filteredColleges.map(c => [c.name, `${c.city}-${c.state}`, c.type, c.phone || '-', c.website, c.courses.join(', ')]);
    (doc as any).autoTable({
      startY: 140,
      head: [['Instituição', 'Localização', 'Esfera', 'Contato', 'Website', 'Cursos Principal']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [15, 118, 110], fontSize: 9 },
      styles: { fontSize: 8, cellPadding: 8 }
    });
    doc.save(`bioquimica-research-${title.toLowerCase()}.pdf`);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex flex-col selection:bg-teal-200 selection:text-teal-900 bg-[#F8FAFA]">
      <PremiumHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        collegeCount={filteredColleges.length}
        onOpenAdd={() => setIsModalOpen(true)}
        onToggleSync={() => setShowSync(!showSync)}
        onShare={handleShareLink}
      />

      {/* Toast Feedback */}
      {copyFeedback && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-4 duration-300">
           <div className="bg-teal-950 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-teal-500/30">
              <i className="fas fa-check-circle text-teal-400"></i>
              <span className="text-[10px] font-black uppercase tracking-widest">Link de pesquisa copiado!</span>
           </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 md:py-12">
        {/* Filters Section */}
        <div className="glass-card rounded-[3rem] p-8 md:p-12 mb-16 border border-teal-100 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
          <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-stretch lg:items-end">
            <div className="flex-1 space-y-4">
              <label className="flex items-center gap-2 text-[11px] font-black text-teal-900 uppercase tracking-[0.3em] ml-2">
                <i className="fas fa-filter text-[10px] text-teal-400"></i>
                Filtragem Administrativa
              </label>
              <div className="grid grid-cols-3 bg-teal-50/50 p-1.5 rounded-2xl border border-teal-100/50">
                {['Todos', 'Pública', 'Privada'].map(sphere => (
                  <button key={sphere} onClick={() => setSelectedSphere(sphere as any)}
                    className={`px-4 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      selectedSphere === sphere ? 'bg-white text-teal-600 shadow-lg ring-1 ring-teal-100' : 'text-teal-400 hover:text-teal-700'
                    }`}
                  >
                    {sphere}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-96 space-y-4">
              <label className="flex items-center gap-2 text-[11px] font-black text-teal-900 uppercase tracking-[0.3em] ml-2">
                <i className="fas fa-map-pin text-[10px] text-teal-400"></i>
                Região Geográfica
              </label>
              <div className="relative group">
                <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-white border-2 border-teal-50 rounded-2xl px-8 py-4 text-xs font-black text-teal-950 outline-none appearance-none cursor-pointer group-hover:border-teal-200 transition-all shadow-inner"
                >
                  <option value="Todos">Todas as Unidades (Brasil)</option>
                  {ALL_STATES.map(st => <option key={st} value={st}>Estado: {st}</option>)}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none">
                   <div className="w-px h-4 bg-teal-100"></div>
                   <i className="fas fa-chevron-down text-teal-300 text-[10px]"></i>
                </div>
              </div>
            </div>
            <div className="flex gap-4 shrink-0">
               <button onClick={generatePDF} disabled={filteredColleges.length === 0}
                 className="flex-1 lg:flex-none h-[64px] px-10 bg-white border-2 border-teal-600 text-teal-600 font-black rounded-2xl hover:bg-teal-50 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
               >
                 <i className="fas fa-file-pdf text-lg"></i>
                 <span className="text-[10px] uppercase tracking-widest text-center">PDF</span>
               </button>
               <button onClick={() => setIsModalOpen(true)}
                 className="flex-1 lg:flex-none h-[64px] px-10 bg-teal-950 text-white font-black rounded-2xl hover:bg-teal-900 transition-all flex items-center justify-center gap-4 shadow-xl shadow-teal-950/20 active:scale-95"
               >
                 <i className="fas fa-plus text-lg"></i>
                 <span className="text-[10px] uppercase tracking-widest">Add</span>
               </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-40">
          {filteredColleges.map((college) => (
            <CollegeCard key={college.id} college={college} isChecked={checkedIds.has(college.id)} onToggleCheck={handleToggleCheck} />
          ))}
          {filteredColleges.length === 0 && selectedState !== 'Todos' && (
            <div className="col-span-full py-32 glass-card rounded-[4rem] border-4 border-dashed border-teal-100/50 flex flex-col items-center text-center px-8 animate-in zoom-in duration-500">
               <h3 className="text-4xl md:text-5xl font-black text-teal-950 uppercase tracking-tighter mb-4">Em Breve: {selectedState}</h3>
               <button onClick={() => setSelectedState('Todos')} className="mt-8 px-8 py-4 bg-teal-950 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl">Voltar ao Brasil</button>
            </div>
          )}
        </div>
      </main>

      <footer className="pt-24 pb-16 bg-white border-t border-teal-50 text-center">
         <p className="text-[14px] font-black text-teal-950 uppercase tracking-[0.5em]">BIOQUIMICA <span className="text-teal-600">RESEARCH</span></p>
         <p className="text-[10px] font-black text-teal-950/20 uppercase tracking-[0.4em] mt-4">© 2026 JOI.A. ACADEMIC DATA</p>
      </footer>

      <AddCollegeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={(newCol) => {
          const collegeWithMeta = { ...newCol, id: `custom-${crypto.randomUUID()}`, createdAt: Date.now() };
          setColleges(prev => [...prev, collegeWithMeta]);
          return null;
        }} 
      />
    </div>
  );
};

export default App;
