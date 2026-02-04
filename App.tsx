
import React, { useState, useEffect, useMemo } from 'react';
import { College, AppStats } from './types';
import { INITIAL_COLLEGES } from './data';
import PremiumHeader from './components/PremiumHeader';
import CollegeCard from './components/CollegeCard';
import AddCollegeModal from './components/AddCollegeModal';
import LoadingScreen from './components/LoadingScreen';

// Fix: Import React to resolve the missing 'React' namespace error for React.FC
const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Foto institucional enviada via Firebase Storage
  const researcherImg = "https://firebasestorage.googleapis.com/v0/b/bioquimica-research.firebasestorage.app/o/Gemini_Generated_Image_9z0axj9z0axj9z0a.png?alt=media&token=c7bca208-998d-4505-a9c8-e5108b10cdf7";

  // Função auxiliar para criar uma chave única e limpa para deduplicação
  const getCleanKey = (name: string, city: string) => {
    return `${name.replace(/[().-]/g, '').toLowerCase().trim()}|${city.toLowerCase().trim()}`;
  };

  const [colleges, setColleges] = useState<College[]>(() => {
    try {
      // v9: Migração para limpar dados legados e adicionar SP
      const saved = localStorage.getItem('bioquimica_repo_v9');
      let savedColleges: College[] = saved ? JSON.parse(saved) : [];
      
      const registry = new Map<string, College>();
      
      // 1. Carrega dados iniciais higienizados
      INITIAL_COLLEGES.forEach(c => {
        registry.set(getCleanKey(c.name, c.city), c);
      });
      
      // 2. Mescla com dados salvos (novos registros do usuário)
      savedColleges.forEach(c => {
        const key = getCleanKey(c.name, c.city);
        if (!registry.has(key)) {
          registry.set(key, c);
        }
      });
      
      return Array.from(registry.values());
    } catch (e) {
      return INITIAL_COLLEGES;
    }
  });

  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('bioquimica_checked_v9');
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
  const [syncKey, setSyncKey] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('bioquimica_repo_v9', JSON.stringify(colleges));
  }, [colleges]);

  useEffect(() => {
    localStorage.setItem('bioquimica_checked_v9', JSON.stringify(Array.from(checkedIds)));
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

  const generatePDF = async () => {
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'a4'
    });

    // Cabeçalho do PDF
    doc.setFillColor(13, 148, 136); 
    doc.rect(0, 0, doc.internal.pageSize.width, 100, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.text('BIOQUIMICA RESEARCH', 40, 50);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('DIRETÓRIO NACIONAL DE INSTITUIÇÕES E CURSOS DE BIOCIÊNCIAS', 40, 70);
    
    // Contagem Gerencial no Cabeçalho (Nova Funcionalidade)
    doc.setFont('helvetica', 'bold');
    doc.text(`Instituições Listadas: ${filteredColleges.length} registros selecionados nesta exportação`, 40, 88);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const date = new Date().toLocaleString('pt-BR');
    doc.text(`Data da Geração: ${date}`, doc.internal.pageSize.width - 200, 30);

    // Filtros
    doc.setTextColor(13, 148, 136);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    const filterText = `Filtros Aplicados: Lupa [${searchQuery || 'Nenhum'}] | Esfera [${selectedSphere}] | UF [${selectedState}]`;
    doc.text(filterText, 40, 125);

    // Tabela
    const tableData = filteredColleges.map(c => [
      c.name,
      `${c.city} - ${c.state}`,
      c.type,
      c.phone || '-',
      c.website,
      c.courses.join(', ')
    ]);

    (doc as any).autoTable({
      startY: 140,
      head: [['Instituição', 'Localização', 'Tipo', 'Contato', 'Website', 'Cursos Disponíveis']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [15, 118, 110], textColor: 255, fontSize: 9, fontStyle: 'bold' },
      styles: { fontSize: 8, cellPadding: 8, overflow: 'linebreak' },
      columnStyles: { 0: { cellWidth: 150 }, 1: { cellWidth: 100 }, 2: { cellWidth: 80 }, 3: { cellWidth: 80 }, 4: { cellWidth: 100 } },
      margin: { left: 40, right: 40 },
      didDrawPage: (data: any) => {
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Página ${data.pageNumber}`, doc.internal.pageSize.width - 60, doc.internal.pageSize.height - 20);
        doc.text('© 2026 BIOQUIMICA RESEARCH - Relatório Gerencial de Dados Acadêmicos', 40, doc.internal.pageSize.height - 20);
      }
    });

    doc.save(`relatorio-bioquimica-research-${selectedState.toLowerCase()}-${filteredColleges.length}-itens.pdf`);
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
        
        {/* Sync Panel */}
        {showSync && (
          <div className="mb-8 glass-card rounded-3xl p-5 border-2 border-teal-500/10 animate-in slide-in-from-top duration-500">
             <div className="flex flex-col md:flex-row items-end gap-4">
               <div className="flex-1 w-full">
                 <p className="text-[9px] font-black text-teal-800 uppercase tracking-widest mb-2 ml-1">Chave de Restauração de Dados</p>
                 <input 
                    type="text" 
                    placeholder="Código de sincronização..."
                    className="w-full px-4 py-3 bg-white border border-teal-50 rounded-xl text-xs outline-none focus:ring-4 focus:ring-teal-500/5 transition-all font-mono"
                    value={syncKey}
                    onChange={(e) => setSyncKey(e.target.value)}
                  />
               </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button className="flex-1 md:px-6 py-3 bg-teal-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">Importar</button>
                  <button className="flex-1 md:px-6 py-3 bg-white border border-teal-100 text-teal-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-50 active:scale-95 transition-all">Exportar</button>
                </div>
             </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 mb-12 md:mb-20 items-center lg:items-center">
          
          <div className="shrink-0 relative">
            <div className="absolute inset-0 bg-teal-600/10 rounded-full blur-3xl"></div>
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full p-2 border-2 border-dashed border-teal-200 animate-[spin_20s_linear_infinite] absolute inset-[-10px] pointer-events-none opacity-40"></div>
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-[8px] border-white shadow-[0_25px_60px_rgba(13,148,136,0.18)] overflow-hidden relative z-10 transition-transform hover:scale-[1.05] duration-500">
              <img 
                src={researcherImg} 
                alt="Lead Researcher" 
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 md:bottom-2 md:right-2 z-20 bg-teal-950 text-white px-3 py-1.5 rounded-full border-4 border-white shadow-xl flex items-center gap-2">
              <i className="fas fa-check-circle text-teal-400 text-[10px]"></i>
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">Verified Expert</span>
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-600 rounded-full mb-6 border border-teal-100 shadow-sm">
               <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-ping"></span>
               <span className="text-[9px] font-black uppercase tracking-[0.2em]">National Academic Repository</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-teal-950 tracking-tighter leading-none mb-6">
              BIOQUIMICA <br className="hidden md:block"/><span className="text-teal-600 italic">RESEARCH</span>
            </h2>
            <p className="text-teal-900/50 font-medium text-sm md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
              Repositório nacional consolidado. Mapeamos instituições federais, estaduais e privadas com dados exaustivos em biociências e agrárias.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
               <div className="flex items-center gap-3 px-5 py-3 bg-white border border-teal-100 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center"><i className="fas fa-flask"></i></div>
                  <div className="text-left">
                    <p className="text-[8px] font-black text-teal-300 uppercase tracking-widest">Total Registros</p>
                    <p className="text-sm font-black text-teal-950">{colleges.length}</p>
                  </div>
               </div>
               <div className="flex items-center gap-3 px-5 py-3 bg-white border border-teal-100 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center"><i className="fas fa-microscope"></i></div>
                  <div className="text-left">
                    <p className="text-[8px] font-black text-teal-300 uppercase tracking-widest">UF's Mapeadas</p>
                    <p className="text-sm font-black text-teal-950">{uniqueStates.length - 1}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-[2.5rem] p-6 md:p-10 mb-12 border border-teal-100 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-1000">
             <i className="fas fa-dna text-[120px] text-teal-900"></i>
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-stretch lg:items-end">
            
            <div className="flex-1 space-y-4">
               <label className="block text-[11px] font-black text-teal-950 uppercase tracking-[0.3em] ml-1">Filtragem Administrativa</label>
               <div className="flex bg-teal-50/50 p-1.5 rounded-2xl border border-teal-100/50">
                  {['Todos', 'Pública', 'Privada'].map(sphere => (
                    <button
                      key={sphere}
                      onClick={() => setSelectedSphere(sphere as any)}
                      className={`flex-1 px-4 py-3 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${
                        selectedSphere === sphere ? 'bg-white text-teal-600 shadow-md scale-[1.02]' : 'text-teal-400 hover:text-teal-600'
                      }`}
                    >
                      {sphere}
                    </button>
                  ))}
               </div>
            </div>

            <div className="w-full lg:w-80 space-y-4">
               <label className="block text-[11px] font-black text-teal-950 uppercase tracking-[0.3em] ml-1">Região Geográfica</label>
               <div className="relative">
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-white border-2 border-teal-50 rounded-2xl px-6 py-3.5 text-xs font-black text-teal-950 focus:border-teal-400 outline-none appearance-none cursor-pointer transition-all shadow-sm"
                  >
                    {uniqueStates.map(st => (
                      <option key={st} value={st}>{st === 'Todos' ? 'Todos os Estados' : `Estado: ${st}`}</option>
                    ))}
                  </select>
                  <i className="fas fa-map-location absolute right-6 top-1/2 -translate-y-1/2 text-teal-200 pointer-events-none text-xs"></i>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={generatePDF}
                className="h-[56px] px-8 bg-white border-2 border-teal-600 text-teal-600 font-black rounded-2xl hover:bg-teal-50 shadow-xl transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95"
              >
                <i className="fas fa-file-pdf text-lg"></i>
                <span className="text-xs uppercase tracking-[0.2em]">Gerar PDF</span>
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="h-[56px] px-8 bg-teal-950 text-white font-black rounded-2xl hover:bg-teal-900 shadow-2xl transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95"
              >
                <i className="fas fa-plus-circle text-lg"></i>
                <span className="text-xs uppercase tracking-[0.2em]">Novo Registro</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-32">
          {filteredColleges.map((college) => (
            <CollegeCard
              key={college.id}
              college={college}
              isChecked={checkedIds.has(college.id)}
              onToggleCheck={handleToggleCheck}
            />
          ))}
          {filteredColleges.length === 0 && (
            <div className="col-span-full py-20 text-center opacity-50">
               <i className="fas fa-search-minus text-4xl text-teal-200 mb-4 block"></i>
               <p className="text-sm font-black text-teal-900 uppercase tracking-widest">Nenhum resultado encontrado</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="pt-20 pb-12 bg-white border-t border-teal-50">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center gap-10">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-xl ring-4 ring-teal-50">
               <img src={researcherImg} className="w-full h-full object-cover" alt="Researcher Footer" />
             </div>
             <div className="h-px w-20 bg-teal-100 hidden sm:block"></div>
             <p className="text-[14px] font-black text-teal-950 uppercase tracking-[0.5em]">
                BIOQUIMICA <span className="text-teal-600">RESEARCH</span>
             </p>
             <div className="h-px w-20 bg-teal-100 hidden sm:block"></div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-[10px] font-bold text-teal-400 uppercase tracking-[0.3em]">Repositório Monumental v9.0</p>
            <p className="text-[10px] font-black text-teal-950/20 uppercase tracking-[0.4em]">© 2026 JOI.A. ACADEMIC DATA</p>
          </div>
        </div>
      </footer>

      <AddCollegeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={(newCol) => {
          const isDuplicate = colleges.some(c => 
            getCleanKey(c.name, c.city) === getCleanKey(newCol.name, newCol.city)
          );
          if (isDuplicate) return 'Esta instituição já consta no banco de dados.';
          const collegeWithMeta = { ...newCol, id: crypto.randomUUID(), createdAt: Date.now() };
          setColleges(prev => [...prev, collegeWithMeta]);
          return null;
        }} 
      />
    </div>
  );
};

export default App;
