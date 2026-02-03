
import { College } from './types';

export const INITIAL_COLLEGES: College[] = [
  // --- POLOS DE BIOQUÍMICA ESPECÍFICA (EXISTENTES) ---
  { id: 'ufv-bq-1', name: 'Universidade Federal de Viçosa (UFV)', city: 'Viçosa', state: 'MG', address: 'Avenida Peter Henry Rolfs, s/n - Campus Universitário', type: 'Federal', phone: '(31) 3612-5103', website: 'www.dbq.ufv.br', courses: ['Bioquímica', 'Ciências Biológicas'], createdAt: 1740000000001 },
  { id: 'ufsj-bq-1', name: 'Univ. Federal de São João del-Rei (UFSJ)', city: 'Divinópolis', state: 'MG', address: 'Rua Sebastião Gonçalves Coelho, 400 - Itanhangá', type: 'Federal', phone: '(37) 3221-1164', website: 'www.ufsj.edu.br/bioquimica', courses: ['Bioquímica', 'Farmácia', 'Medicina'], createdAt: 1740000000002 },
  { id: 'uem-bq-1', name: 'Universidade Estadual de Maringá (UEM)', city: 'Maringá', state: 'PR', address: 'Av. Colombo, 5790 - Jardim Universitário', type: 'Estadual', phone: '(44) 3011-4312', website: 'www.dbq.uem.br', courses: ['Bioquímica', 'Farmácia', 'Ciências Biológicas'], createdAt: 1740000000003 },

  // --- RIO GRANDE DO NORTE (RN) - NOVOS REGISTROS DO RELATÓRIO ---
  { 
    id: 'rn-ufrn-1', 
    name: 'UFRN (Univ. Federal do RN)', 
    city: 'Natal', 
    state: 'RN', 
    address: 'Campus Universitário, Lagoa Nova, Natal - RN, CEP: 59078-970', 
    type: 'Federal', 
    phone: '(84) 3215-3416', 
    website: 'ufrn.br', 
    courses: ['Bioquímica', 'Biomedicina', 'Farmácia'], 
    createdAt: 1740000000100 
  },
  { 
    id: 'rn-unirn-1', 
    name: 'UNI-RN', 
    city: 'Natal', 
    state: 'RN', 
    address: 'Rua Prefeito Jundiaí, 546, Tirol, Natal - RN, CEP: 59020-120', 
    type: 'Privada', 
    phone: '(84) 3215-2917', 
    website: 'unirn.edu.br', 
    courses: ['Biomedicina', 'Farmácia'], 
    createdAt: 1740000000101 
  },
  { 
    id: 'rn-unp-1', 
    name: 'UnP (Univ. Potiguar)', 
    city: 'Natal', 
    state: 'RN', 
    address: 'Av. Eng. Roberto Freire, 2184, Capim Macio, Natal - RN, CEP: 59082-902', 
    type: 'Privada', 
    phone: '(84) 3227-1234', 
    website: 'unp.br', 
    courses: ['Biomedicina', 'Farmácia'], 
    createdAt: 1740000000102 
  },
  { 
    id: 'rn-ufersa-1', 
    name: 'UFERSA (Univ. Fed. Rural do Semi-Árido)', 
    city: 'Mossoró', 
    state: 'RN', 
    address: 'Av. Francisco Mota, 572, Costa e Silva, Mossoró - RN, CEP: 59625-900', 
    type: 'Federal', 
    phone: '(84) 3317-8224', 
    website: 'ufersa.edu.br', 
    courses: ['Biotecnologia', 'Medicina'], 
    createdAt: 1740000000103 
  },
  { 
    id: 'rn-uern-1', 
    name: 'UERN (Univ. do Estado do RN)', 
    city: 'Mossoró', 
    state: 'RN', 
    address: 'Rua Almino Afonso, 478, Centro, Mossoró - RN, CEP: 59610-210', 
    type: 'Estadual', 
    phone: '(84) 3315-2248', 
    website: 'portal.uern.br', 
    courses: ['Medicina', 'Enfermagem'], 
    createdAt: 1740000000104 
  },
  { 
    id: 'rn-facene-1', 
    name: 'FACENE/RN', 
    city: 'Mossoró', 
    state: 'RN', 
    address: 'Av. Presidente Dutra, 701, Alto de São Manoel, Mossoró - RN, CEP: 59628-000', 
    type: 'Privada', 
    phone: '(84) 3312-0143', 
    website: 'facenemossoro.com.br', 
    courses: ['Biomedicina', 'Farmácia'], 
    createdAt: 1740000000105 
  },
  { 
    id: 'rn-uern-caico', 
    name: 'UERN (Campus Caicó)', 
    city: 'Caicó', 
    state: 'RN', 
    address: 'Av. Rio Branco, 725, Centro, Caicó - RN, CEP: 59300-000', 
    type: 'Estadual', 
    phone: '(84) 3421-6513', 
    website: 'caico.uern.br', 
    courses: ['Odontologia', 'Enfermagem'], 
    createdAt: 1740000000106 
  },
  { 
    id: 'rn-ufrn-facisa', 
    name: 'UFRN (FACISA)', 
    city: 'Santa Cruz', 
    state: 'RN', 
    address: 'Rua Trairi, s/n, Centro, Santa Cruz - RN, CEP: 59200-000', 
    type: 'Federal', 
    phone: '(84) 3291-2411', 
    website: 'facisa.ufrn.br', 
    courses: ['Nutrição', 'Fisioterapia'], 
    createdAt: 1740000000107 
  },
  { 
    id: 'rn-uern-pauferros', 
    name: 'UERN (Campus Pau dos Ferros)', 
    city: 'Pau dos Ferros', 
    state: 'RN', 
    address: 'BR 405, KM 153, Pau dos Ferros - RN, CEP: 59900-000', 
    type: 'Estadual', 
    phone: '(84) 3351-2560', 
    website: 'pferros.uern.br', 
    courses: ['Enfermagem', 'Biologia'], 
    createdAt: 1740000000108 
  },
  { 
    id: 'rn-unp-pauferros', 
    name: 'UnP (Polo Pau dos Ferros)', 
    city: 'Pau dos Ferros', 
    state: 'RN', 
    address: 'Rua Paulo Marcelino, 489, Centro, Pau dos Ferros - RN, CEP: 59900-000', 
    type: 'Privada', 
    phone: '(83) 98216-9192', 
    website: 'unp.br', 
    courses: ['Nutrição', 'Enfermagem'], 
    createdAt: 1740000000109 
  },

  // --- RESTANTE DA REGIÃO NORTE (MANTIDOS) ---
  { id: 'am-1', name: 'Universidade Federal do Amazonas (UFAM)', city: 'Manaus', state: 'AM', address: 'Av. Rodrigo Otávio, 6200 - Coroado', type: 'Federal', phone: '(92) 3305-1181', website: 'www.ufam.edu.br', courses: ['Medicina', 'Farmácia', 'Bioquímica'], createdAt: 1740000000004 },
  { id: 'am-2', name: 'Universidade do Estado do Amazonas (UEA)', city: 'Manaus', state: 'AM', address: 'Av. Djalma Batista, 3578 - Flores', type: 'Estadual', phone: '(92) 3878-4450', website: 'www.uea.edu.br', courses: ['Medicina', 'Enfermagem'], createdAt: 1740000000005 },
  { id: 'am-3', name: 'FAMETRO', city: 'Manaus', state: 'AM', address: 'Av. Constantino Nery, 3000 - Chapada', type: 'Privada', phone: '(92) 2101-1000', website: 'www.fametro.edu.br', courses: ['Bioquímica', 'Nutrição'], createdAt: 1740000000006 },
  { id: 'am-4', name: 'UNIP Manaus', city: 'Manaus', state: 'AM', address: 'Av. Mário Ypiranga, 3159 - Parque 10 de Novembro', type: 'Privada', phone: '(92) 3643-3800', website: 'www.unip.br', courses: ['Farmácia', 'Biomedicina'], createdAt: 1740000000007 },
  { id: 'am-5', name: 'UFAM - Campus Coari (ISB)', city: 'Coari', state: 'AM', address: 'Estrada do Mami, 305 - Espirito Santo', type: 'Federal', phone: '(92) 3305-1181', website: 'www.isb.ufam.edu.br', courses: ['Biotecnologia', 'Medicina'], createdAt: 1740000000008 },
  { id: 'am-6', name: 'Afya Itacoatiara', city: 'Itacoatiara', state: 'AM', address: 'Rua Acácio Leite, s/n - Santo Antônio', type: 'Privada', phone: '(92) 3878-3788', website: 'itacoatiara.afya.com.br', courses: ['Medicina'], createdAt: 1740000000009 },
  { id: 'am-7', name: 'Afya Manacapuru', city: 'Manacapuru', state: 'AM', address: 'Av. Ribeiro Júnior, s/n - Centro', type: 'Privada', phone: '(92) 3878-3785', website: 'manacapuru.afya.com.br', courses: ['Medicina'], createdAt: 1740000000010 },
  { id: 'pa-1', name: 'Universidade Federal do Pará (UFPA)', city: 'Belém', state: 'PA', address: 'Rua Augusto Corrêa, 1 - Guamá', type: 'Federal', phone: '(91) 3201-7000', website: 'www.ufpa.br', courses: ['Bioquímica', 'Biotecnologia'], createdAt: 1740000000011 },
  { id: 'pa-2', name: 'CESUPA', city: 'Belém', state: 'PA', address: 'Av. Gov. José Malcher, 1963 - Nazaré', type: 'Privada', phone: '(91) 4009-9100', website: 'www.cesupa.br', courses: ['Medicina', 'Farmácia'], createdAt: 1740000000012 },
  { id: 'pa-3', name: 'UNIFAMAZ', city: 'Belém', state: 'PA', address: 'Av. Visc. de Souza Franco, 72 - Reduto', type: 'Privada', phone: '(91) 3201-0303', website: 'www.unifamaz.edu.br', courses: ['Biomedicina', 'Enfermagem'], createdAt: 1740000000013 },
  { id: 'pa-4', name: 'Faculdade Metropolitana do Pará', city: 'Santarém', state: 'PA', address: 'Rua Rosa Vermelha, 335 - Aeroporto Velho', type: 'Privada', phone: '(93) 98405-2690', website: 'www.fametro.edu.br', courses: ['Saúde', 'Gestão'], createdAt: 1740000000014 },
  { id: 'pa-5', name: 'IDOMED Castanhal', city: 'Castanhal', state: 'PA', address: 'Rod. BR-316, s/n - KM 60', type: 'Privada', phone: '(91) 3721-1100', website: 'www.idomed.com.br', courses: ['Medicina'], createdAt: 1740000000015 },
  { id: 'ac-1', name: 'Universidade Federal do Acre (UFAC)', city: 'Rio Branco', state: 'AC', address: 'Rodovia BR-364, Km 04 - Distrito Industrial', type: 'Federal', phone: '(68) 3901-2500', website: 'www.ufac.br', courses: ['Medicina', 'Enfermagem'], createdAt: 1740000000016 },
  { id: 'ac-3', name: 'ITPAC Cruzeiro do Sul', city: 'Cruzeiro do Sul', state: 'AC', address: 'Av. 25 de Agosto, s/n - Aeroporto Velho', type: 'Privada', phone: '(68) 3311-2000', website: 'cruzeirodosul.afya.com.br', courses: ['Medicina'], createdAt: 1740000000018 },
  { id: 'ap-1', name: 'Universidade Federal do Amapá (UNIFAP)', city: 'Macapá', state: 'AP', address: 'Rodovia Juscelino Kubitschek, KM 02 - Jardim Marco Zero', type: 'Federal', phone: '(96) 3312-1700', website: 'www.unifap.br', courses: ['Farmácia', 'Medicina'], createdAt: 1740000000019 },
  { id: 'ro-1', name: 'Universidade Federal de Rondônia (UNIR)', city: 'Porto Velho', state: 'RO', address: 'BR-364, KM 9,5 - Sentido Acre', type: 'Federal', phone: '(69) 2182-2100', website: 'www.unir.br', courses: ['Biologia', 'Saúde'], createdAt: 1740000000021 },
  { id: 'to-1', name: 'Universidade Federal de Tocantins (UFT)', city: 'Palmas', state: 'TO', address: 'Av. NS 15, s/n - 109 Norte', type: 'Federal', phone: '(63) 3229-4000', website: 'www.uft.edu.br', courses: ['Nutrição', 'Medicina'], createdAt: 1740000000023 },

  // --- REGIÃO SUDESTE (MANTIDOS) ---
  { id: 'sp-1', name: 'Universidade de São Paulo (USP)', city: 'São Paulo', state: 'SP', address: 'Rua do Matão, s/n - Cidade Universitária', type: 'Estadual', phone: '(11) 3091-3100', website: 'www.usp.br', courses: ['Bioquímica', 'Medicina'], createdAt: 1740000000045 },
  { id: 'sp-4', name: 'Fac. Albert Einstein (FICSAE)', city: 'São Paulo', state: 'SP', address: 'Av. Albert Einstein, 627 - Morumbi', type: 'Privada', phone: '(11) 2151-1001', website: 'ensino.einstein.br', courses: ['Medicina', 'Enfermagem'], createdAt: 1740000000048 },
  { id: 'mg-1', name: 'Univ. Fed. Minas Gerais (UFMG)', city: 'Belo Horizonte', state: 'MG', address: 'Av. Pres. Antônio Carlos, 6627 - Pampulha', type: 'Federal', phone: '(31) 3409-5000', website: 'www.ufmg.br', courses: ['Bioquímica', 'Medicina'], createdAt: 1740000000053 },
  { id: 'rj-1', name: 'Univ. Fed. Rio de Janeiro (UFRJ)', city: 'Rio de Janeiro', state: 'RJ', address: 'Av. Pedro Calmon, 550 - Cidade Universitária', type: 'Federal', phone: '(21) 3938-9600', website: 'www.ufrj.br', courses: ['Bioquímica', 'Medicina'], createdAt: 1740000000060 },
  { id: 'pr-1', name: 'Univ. Federal do Paraná (UFPR)', city: 'Curitiba', state: 'PR', address: 'Rua XV de Novembro, 1299 - Centro', type: 'Federal', phone: '(41) 3360-5000', website: 'www.ufpr.br', courses: ['Bioquímica', 'Medicina'], createdAt: 1740000000065 },
  { id: 'rs-1', name: 'Univ. Fed. R. G. Sul (UFRGS)', city: 'Porto Alegre', state: 'RS', address: 'Av. Paulo Gama, 110 - Farroupilha', type: 'Federal', phone: '(51) 3308-6000', website: 'www.ufrgs.br', courses: ['Bioquímica', 'Biotecnologia'], createdAt: 1740000000071 },
  { id: 'df-1', name: 'Univ. de Brasília (UnB)', city: 'Brasília', state: 'DF', address: 'Campus Universitário Darcy Ribeiro - Asa Norte', type: 'Federal', phone: '(61) 3107-3300', website: 'www.unb.br', courses: ['Bioquímica', 'Medicina'], createdAt: 1740000000080 }
];
