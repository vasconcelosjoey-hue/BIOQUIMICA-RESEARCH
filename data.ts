
import { College } from './types';

export const INITIAL_COLLEGES: College[] = [
  // --- POLOS DE EXCELÊNCIA EM BIOQUÍMICA (GRADUAÇÃO) ---
  { id: 'ufv-bq', name: 'Universidade Federal de Viçosa (UFV)', city: 'Viçosa', state: 'MG', type: 'Federal', phone: '(31) 3612-5103', website: 'www.dbq.ufv.br', courses: ['Bioquímica', 'Ciências Biológicas'], createdAt: 1740000000001 },
  { id: 'ufsj-bq', name: 'Univ. Federal de São João del-Rei (UFSJ)', city: 'Divinópolis', state: 'MG', type: 'Federal', phone: '(37) 3221-1164', website: 'www.ufsj.edu.br/bioquimica', courses: ['Bioquímica', 'Farmácia', 'Medicina'], createdAt: 1740000000002 },
  { id: 'uem-bq', name: 'Universidade Estadual de Maringá (UEM)', city: 'Maringá', state: 'PR', type: 'Estadual', phone: '(44) 3011-4312', website: 'www.dbq.uem.br', courses: ['Bioquímica', 'Farmácia', 'Ciências Biológicas'], createdAt: 1740000000003 },

  // --- REGIÃO NORTE (POLOS DE INTERIORIZAÇÃO) ---
  { id: 'ufam-am', name: 'Universidade Federal do Amazonas (UFAM)', city: 'Manaus', state: 'AM', type: 'Federal', phone: '(92) 3305-1181', website: 'www.ufam.edu.br', courses: ['Farmácia', 'Ciências Biológicas', 'Medicina'], createdAt: 1740000000004 },
  { id: 'uea-am', name: 'Universidade do Estado do Amazonas (UEA)', city: 'Manaus', state: 'AM', type: 'Estadual', phone: '(92) 3878-4450', website: 'www.uea.edu.br', courses: ['Medicina', 'Enfermagem', 'Odontologia'], createdAt: 1740000000005 },
  { id: 'fametro-am', name: 'FAMETRO', city: 'Manaus', state: 'AM', type: 'Privada', phone: '(92) 2101-1000', website: 'www.fametro.edu.br', courses: ['Bioquímica', 'Farmácia', 'Nutrição'], createdAt: 1740000000006 },
  { id: 'unip-am', name: 'UNIP Manaus', city: 'Manaus', state: 'AM', type: 'Privada', phone: '(92) 3643-3800', website: 'www.unip.br', courses: ['Farmácia', 'Enfermagem', 'Biomedicina'], createdAt: 1740000000007 },
  { id: 'afya-itac', name: 'Afya Itacoatiara', city: 'Itacoatiara', state: 'AM', type: 'Privada', phone: '(92) 3878-3788', website: 'itacoatiara.afya.com.br', courses: ['Medicina'], createdAt: 1740000000008 },
  { id: 'cesupa-pa', name: 'CESUPA', city: 'Belém', state: 'PA', type: 'Privada', phone: '(91) 4009-9100', website: 'www.cesupa.br', courses: ['Farmácia', 'Medicina', 'Odontologia'], createdAt: 1740000000009 },
  { id: 'unifamaz-pa', name: 'UNIFAMAZ', city: 'Belém', state: 'PA', type: 'Privada', phone: '(91) 3201-0303', website: 'www.unifamaz.edu.br', courses: ['Biomedicina', 'Enfermagem'], createdAt: 1740000000010 },
  { id: 'itpac-ac', name: 'ITPAC Cruzeiro do Sul', city: 'Cruzeiro do Sul', state: 'AC', type: 'Privada', phone: '(68) 3311-2000', website: 'cruzeirodosul.afya.com.br', courses: ['Medicina'], createdAt: 1740000000011 },

  // --- REGIÃO NORDESTE (POLOS ADICIONAIS) ---
  { id: 'bahiana-med', name: 'Escola Bahiana de Medicina e Saúde Pública', city: 'Salvador', state: 'BA', type: 'Privada', phone: '(71) 3276-8200', website: 'www.bahiana.edu.br', courses: ['Medicina', 'Biomedicina', 'Fisioterapia'], createdAt: 1740000000012 },
  { id: 'unifor-ce', name: 'UNIFOR', city: 'Fortaleza', state: 'CE', type: 'Privada', phone: '(85) 3477-3000', website: 'www.unifor.br', courses: ['Medicina', 'Farmácia', 'Nutrição'], createdAt: 1740000000013 },
  { id: 'unichristus-ce', name: 'UNICHRISTUS', city: 'Fortaleza', state: 'CE', type: 'Privada', phone: '(85) 3265-8100', website: 'www.unichristus.edu.br', courses: ['Medicina', 'Biomedicina'], createdAt: 1740000000014 },
  { id: 'fps-pe', name: 'Faculdade Pernambucana de Saúde (FPS)', city: 'Recife', state: 'PE', type: 'Privada', phone: '(81) 3035-7777', website: 'www.fps.edu.br', courses: ['Medicina', 'Farmácia', 'Enfermagem'], createdAt: 1740000000015 },
  { id: 'cesmac-al', name: 'CESMAC', city: 'Maceió', state: 'AL', type: 'Privada', phone: '(82) 3215-5000', website: 'www.cesmac.edu.br', courses: ['Medicina', 'Farmácia'], createdAt: 1740000000016 },

  // --- REGIÃO SUDESTE (CENTROS DE REFERÊNCIA) ---
  { id: 'ficsae-sp', name: 'Faculdade Albert Einstein (FICSAE)', city: 'São Paulo', state: 'SP', type: 'Privada', phone: '(11) 2151-1001', website: 'ensino.einstein.br', courses: ['Medicina', 'Enfermagem', 'Engenharia Biomédica'], createdAt: 1740000000017 },
  { id: 'fcmscsp-sp', name: 'Faculdade de Ciências Médicas da Santa Casa de SP', city: 'São Paulo', state: 'SP', type: 'Privada', phone: '(11) 3367-7700', website: 'fcmsantacasasp.edu.br', courses: ['Medicina', 'Enfermagem', 'Fonoaudiologia'], createdAt: 1740000000018 },
  { id: 'mandic-sp', name: 'São Leopoldo Mandic', city: 'Campinas', state: 'SP', type: 'Privada', phone: '(19) 3211-3300', website: 'www.slmandic.edu.br', courses: ['Medicina', 'Odontologia'], createdAt: 1740000000019 },
  { id: 'cmmg-mg', name: 'Faculdade de Ciências Médicas de Minas Gerais', city: 'Belo Horizonte', state: 'MG', type: 'Privada', phone: '(31) 3248-7100', website: 'www.cmmg.edu.br', courses: ['Medicina', 'Enfermagem', 'Fisioterapia'], createdAt: 1740000000020 },
  { id: 'atenas-mg', name: 'UniAtenas', city: 'Paracatu', state: 'MG', type: 'Privada', phone: '(38) 3672-3737', website: 'www.atenas.edu.br', courses: ['Medicina', 'Farmácia'], createdAt: 1740000000021 },

  // --- REGIÃO SUL (COMPLEMENTO) ---
  { id: 'unicesumar-pr', name: 'UniCesumar', city: 'Maringá', state: 'PR', type: 'Privada', phone: '(44) 3027-6360', website: 'www.unicesumar.edu.br', courses: ['Medicina', 'Biomedicina', 'Farmácia'], createdAt: 1740000000022 },
  { id: 'feevale-rs', name: 'Universidade Feevale', city: 'Novo Hamburgo', state: 'RS', type: 'Privada', phone: '(51) 3586-8800', website: 'www.feevale.br', courses: ['Medicina', 'Biomedicina', 'Farmácia'], createdAt: 1740000000023 },
  { id: 'ufn-rs', name: 'Universidade Franciscana (UFN)', city: 'Santa Maria', state: 'RS', type: 'Privada', phone: '(55) 3220-1200', website: 'www.unifra.br', courses: ['Medicina', 'Enfermagem', 'Biomedicina'], createdAt: 1740000000024 },

  // --- REGIÃO CENTRO-OESTE (EXPANSÃO) ---
  { id: 'unifan-go', name: 'Centro Universitário Alfredo Nasser', city: 'Aparecida de Goiânia', state: 'GO', type: 'Privada', phone: '(62) 3277-3000', website: 'www.unifan.edu.br', courses: ['Medicina', 'Farmácia'], createdAt: 1740000000025 },
  { id: 'unic-mt', name: 'UNIC Cuiabá', city: 'Cuiabá', state: 'MT', type: 'Privada', phone: '(65) 3363-1000', website: 'www.unic.br', courses: ['Medicina', 'Fisioterapia', 'Enfermagem'], createdAt: 1740000000026 },
  { id: 'unigran-ms', name: 'UNIGRAN', city: 'Dourados', state: 'MS', type: 'Privada', phone: '(67) 3411-4141', website: 'www.unigran.br', courses: ['Medicina', 'Biomedicina', 'Farmácia'], createdAt: 1740000000027 },

  // PUCs (Mantidas e Refinadas)
  { id: 'puc-rj', name: 'PUC-Rio', city: 'Rio de Janeiro', state: 'RJ', type: 'Privada (Comunitária)', phone: '(21) 3736-1001', website: 'www.puc-rio.br', courses: ['Medicina', 'Bioquímica', 'Nutrição'], createdAt: 1740000000028 },
  { id: 'puc-sp', name: 'PUC-SP', city: 'São Paulo', state: 'SP', type: 'Privada (Comunitária)', phone: '(11) 3670-8011', website: 'www.pucsp.br', courses: ['Medicina', 'Bioquímica', 'Fonoaudiologia'], createdAt: 1740000000029 },
  { id: 'puc-pr', name: 'PUCPR', city: 'Curitiba', state: 'PR', type: 'Privada (Comunitária)', phone: '(41) 3271-1555', website: 'www.pucpr.br', courses: ['Medicina', 'Biotecnologia', 'Farmácia'], createdAt: 1740000000030 },
  { id: 'puc-rs', name: 'PUCRS', city: 'Porto Alegre', state: 'RS', type: 'Privada (Comunitária)', phone: '(51) 3320-3500', website: 'www.pucrs.br', courses: ['Medicina', 'Biomedicina', 'Psicologia'], createdAt: 1740000000031 }
];
