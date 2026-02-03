
import React, { useState, useEffect } from 'react';
import { College } from '../types';

interface AddCollegeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (college: Omit<College, 'id' | 'createdAt'>) => string | null; // null if success, error message if not
}

const AddCollegeModal: React.FC<AddCollegeModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    address: '',
    type: 'Pública Federal',
    phone: '',
    website: '',
    courses: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) setError('');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.city || !formData.state || !formData.address) {
      setError('Campos marcados com * são obrigatórios.');
      return;
    }

    const errorMessage = onAdd({
      ...formData,
      courses: formData.courses.split(',').map(c => c.trim()).filter(c => c !== '')
    });

    if (!errorMessage) {
      setFormData({ name: '', city: '', state: '', address: '', type: 'Pública Federal', phone: '', website: '', courses: '' });
      onClose();
    } else {
      setError(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-teal-950/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-[2rem] w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col">
        <div className="px-8 py-6 bg-gradient-to-r from-teal-800 to-teal-900 text-white flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Nova Pesquisa</h2>
            <p className="text-teal-300 text-[10px] font-bold uppercase tracking-widest mt-1">Expanda o diretório nacional</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5 overflow-y-auto">
          {error && (
            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl text-red-600 text-sm flex items-center gap-3">
              <i className="fas fa-triangle-exclamation"></i>
              <span className="font-bold">{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block text-[10px] font-black text-teal-800/50 uppercase tracking-wider mb-2">Nome da Instituição *</label>
              <input
                autoFocus
                type="text"
                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-semibold"
                placeholder="Ex: USP, UFRJ..."
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-[10px] font-black text-teal-800/50 uppercase tracking-wider mb-2">Cidade *</label>
                <input
                  type="text"
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-semibold"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-teal-800/50 uppercase tracking-wider mb-2">Estado (UF) *</label>
                <input
                  type="text"
                  maxLength={2}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-semibold uppercase text-center"
                  placeholder="SP"
                  value={formData.state}
                  onChange={e => setFormData({...formData, state: e.target.value.toUpperCase()})}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-teal-800/50 uppercase tracking-wider mb-2">Endereço Completo *</label>
              <input
                type="text"
                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-semibold"
                placeholder="Rua, Número, Bairro..."
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-teal-800/50 uppercase tracking-wider mb-2">Categoria</label>
                <select
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-semibold appearance-none"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                >
                  <option>Pública Federal</option>
                  <option>Pública Estadual</option>
                  <option>Privada</option>
                  <option>Comunitária</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-teal-800/50 uppercase tracking-wider mb-2">Telefone</label>
                <input
                  type="text"
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-semibold"
                  placeholder="(00) 0000-0000"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-teal-800/50 uppercase tracking-wider mb-2">Website</label>
              <input
                type="text"
                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-semibold"
                placeholder="www.exemplo.com.br"
                value={formData.website}
                onChange={e => setFormData({...formData, website: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-teal-800/50 uppercase tracking-wider mb-2">Cursos (Separados por vírgula)</label>
              <textarea
                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-semibold h-20 resize-none"
                placeholder="Bioquímica, Biomedicina, Química..."
                value={formData.courses}
                onChange={e => setFormData({...formData, courses: e.target.value})}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4 shrink-0">
            <button
              type="submit"
              className="w-full py-4 bg-teal-600 text-white font-black rounded-2xl hover:bg-teal-700 shadow-xl shadow-teal-200 transition-all transform active:scale-95 text-xs uppercase tracking-widest"
            >
              SALVAR NO DIRETÓRIO
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCollegeModal;
