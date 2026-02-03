
import { College } from './types';

export const INITIAL_COLLEGES: College[] = [
  {
    id: '1',
    name: 'Universidade de São Paulo (USP)',
    city: 'São Paulo',
    state: 'SP',
    type: 'Pública Estadual',
    phone: '(11) 3091-3116',
    website: 'www.usp.br',
    courses: ['Bioquímica', 'Farmácia', 'Ciências Biológicas'],
    createdAt: Date.now()
  },
  {
    id: '2',
    name: 'Universidade Federal de Minas Gerais (UFMG)',
    city: 'Belo Horizonte',
    state: 'MG',
    type: 'Pública Federal',
    phone: '(31) 3409-5000',
    website: 'www.ufmg.br',
    courses: ['Bioquímica', 'Biomedicina', 'Química'],
    createdAt: Date.now()
  },
  {
    id: '3',
    name: 'Universidade Federal do Rio de Janeiro (UFRJ)',
    city: 'Rio de Janeiro',
    state: 'RJ',
    type: 'Pública Federal',
    phone: '(21) 3938-2234',
    website: 'www.ufrj.br',
    courses: ['Bioquímica', 'Biotecnologia', 'Biologia'],
    createdAt: Date.now()
  },
  {
    id: '4',
    name: 'Universidade Federal do Rio Grande do Sul (UFRGS)',
    city: 'Porto Alegre',
    state: 'RS',
    type: 'Pública Federal',
    phone: '(51) 3308-6000',
    website: 'www.ufrgs.br',
    courses: ['Bioquímica', 'Farmácia', 'Biologia Marinha'],
    createdAt: Date.now()
  },
  {
    id: '5',
    name: 'Universidade Estadual de Campinas (UNICAMP)',
    city: 'Campinas',
    state: 'SP',
    type: 'Pública Estadual',
    phone: '(19) 3521-7000',
    website: 'www.unicamp.br',
    courses: ['Ciências Biológicas', 'Química', 'Bioquímica'],
    createdAt: Date.now()
  },
  {
    id: '6',
    name: 'Pontifícia Universidade Católica do Rio de Janeiro (PUC-Rio)',
    city: 'Rio de Janeiro',
    state: 'RJ',
    type: 'Privada (Comunitária)',
    phone: '(21) 3736-1001',
    website: 'www.puc-rio.br',
    courses: ['Biologia', 'Engenharia Química'],
    createdAt: Date.now()
  },
  {
    id: '7',
    name: 'Universidade Federal de Viçosa (UFV)',
    city: 'Viçosa',
    state: 'MG',
    type: 'Pública Federal',
    phone: '(31) 3612-0000',
    website: 'www.ufv.br',
    courses: ['Bioquímica', 'Agronomia', 'Engenharia de Alimentos'],
    createdAt: Date.now()
  }
];
