
import { College } from './types';

export const INITIAL_COLLEGES: College[] = [
  // REGIAO NORTE
  { id: 'ac-1', name: 'UFAC', city: 'Rio Branco', state: 'AC', type: 'Federal', phone: '(68) 3901-2500', website: 'ufac.br', courses: ['Biomedicina', 'Farmácia', 'Biologia', 'Nutrição'], createdAt: 1700000000000 },
  { id: 'ac-2', name: 'UFAC - Campus Floresta', city: 'Cruzeiro do Sul', state: 'AC', type: 'Federal', phone: '(68) 3311-2500', website: 'ufac.br', courses: ['Enfermagem', 'Biologia', 'Engenharia Agronômica'], createdAt: 1700000000001 },
  { id: 'ac-3', name: 'UNINORTE', city: 'Rio Branco', state: 'AC', type: 'Privada', phone: '(68) 3302-7000', website: 'uninorteac.edu.br', courses: ['Biomedicina', 'Farmácia', 'Enfermagem', 'Odontologia'], createdAt: 1700000000002 },
  { id: 'ac-4', name: 'FAMETRO', city: 'Rio Branco', state: 'AC', type: 'Privada', phone: '(68) 3223-3000', website: 'fametro.edu.br', courses: ['Biomedicina', 'Farmácia', 'Nutrição'], createdAt: 1700000000003 },
  { id: 'am-1', name: 'UFAM', city: 'Manaus', state: 'AM', type: 'Federal', phone: '(92) 3305-1181', website: 'ufam.edu.br', courses: ['Farmácia', 'Ciências Biológicas', 'Biotecnologia', 'Medicina'], createdAt: 1700000000004 },
  { id: 'am-2', name: 'UFAM - ISB', city: 'Coari', state: 'AM', type: 'Federal', phone: '(92) 3305-1181', website: 'isb.ufam.edu.br', courses: ['Biotecnologia', 'Nutrição', 'Enfermagem', 'Medicina'], createdAt: 1700000000005 },
  { id: 'am-3', name: 'UFAM - ICET', city: 'Itacoatiara', state: 'AM', type: 'Federal', phone: '(92) 3521-3444', website: 'icet.ufam.edu.br', courses: ['Engenharia de Alimentos', 'Biologia', 'Química'], createdAt: 1700000000006 },
  { id: 'am-4', name: 'UEA', city: 'Manaus', state: 'AM', type: 'Estadual', phone: '(92) 3878-4478', website: 'uea.edu.br', courses: ['Biomedicina', 'Farmácia', 'Medicina', 'Odontologia'], createdAt: 1700000000007 },
  { id: 'pa-1', name: 'UFPA', city: 'Belém', state: 'PA', type: 'Federal', phone: '(91) 3201-7112', website: 'ufpa.br', courses: ['Bioquímica', 'Biomedicina', 'Farmácia', 'Biotecnologia'], createdAt: 1700000000008 },
  { id: 'pa-2', name: 'UFOPA', city: 'Santarém', state: 'PA', type: 'Federal', phone: '(93) 2101-4900', website: 'ufopa.edu.br', courses: ['Farmácia', 'Biologia', 'Biotecnologia'], createdAt: 1700000000009 },
  { id: 'ro-1', name: 'UNIR', city: 'Porto Velho', state: 'RO', type: 'Federal', phone: '(69) 2182-2000', website: 'unir.br', courses: ['Farmácia', 'Biologia', 'Medicina', 'Enfermagem'], createdAt: 1700000000010 },
  { id: 'to-1', name: 'UFT', city: 'Palmas', state: 'TO', type: 'Federal', phone: '(63) 3229-4000', website: 'uft.edu.br', courses: ['Medicina', 'Nutrição', 'Enfermagem', 'Biologia'], createdAt: 1700000000011 },

  // REGIAO NORDESTE
  { id: 'ba-1', name: 'UFBA', city: 'Salvador', state: 'BA', type: 'Federal', phone: '(71) 3283-6940', website: 'ufba.br', courses: ['Bioquímica', 'Farmácia', 'Biomedicina', 'Biotecnologia'], createdAt: 1700000000012 },
  { id: 'ba-2', name: 'UEFS', city: 'Feira de Santana', state: 'BA', type: 'Estadual', phone: '(75) 3161-8000', website: 'uefs.br', courses: ['Farmácia', 'Ciências Biológicas', 'Medicina'], createdAt: 1700000000013 },
  { id: 'pe-1', name: 'UFPE', city: 'Recife', state: 'PE', type: 'Federal', phone: '(81) 2126-8000', website: 'ufpe.br', courses: ['Biomedicina', 'Farmácia', 'Ciências Biológicas'], createdAt: 1700000000014 },
  { id: 'ce-1', name: 'UFC', city: 'Fortaleza', state: 'CE', type: 'Federal', phone: '(85) 3366-8262', website: 'ufc.br', courses: ['Farmácia', 'Biotecnologia', 'Ciências Biológicas'], createdAt: 1700000000015 },
  { id: 'rn-1', name: 'UFRN', city: 'Natal', state: 'RN', type: 'Federal', phone: '(84) 3215-3416', website: 'ufrn.br', courses: ['Bioquímica', 'Biomedicina', 'Farmácia'], createdAt: 1700000000016 },
  { id: 'pb-1', name: 'UFPB', city: 'João Pessoa', state: 'PB', type: 'Federal', phone: '(83) 3216-7200', website: 'ufpb.br', courses: ['Biomedicina', 'Farmácia', 'Biologia'], createdAt: 1700000000017 },
  { id: 'ma-1', name: 'UFMA', city: 'São Luís', state: 'MA', type: 'Federal', phone: '(98) 3272-8000', website: 'ufma.br', courses: ['Farmácia', 'Biologia', 'Nutrição'], createdAt: 1700000000018 },
  { id: 'al-1', name: 'UFAL', city: 'Maceió', state: 'AL', type: 'Federal', phone: '(82) 3214-1100', website: 'ufal.br', courses: ['Farmácia', 'Biologia'], createdAt: 1700000000019 },

  // REGIAO CENTRO-OESTE
  { id: 'df-1', name: 'UnB', city: 'Brasília', state: 'DF', type: 'Federal', phone: '(61) 3107-3300', website: 'unb.br', courses: ['Farmácia', 'Ciências Biológicas', 'Medicina', 'Nutrição'], createdAt: 1700000000020 },
  { id: 'go-1', name: 'UFG', city: 'Goiânia', state: 'GO', type: 'Federal', phone: '(62) 3521-1000', website: 'ufg.br', courses: ['Biomedicina', 'Farmácia', 'Biotecnologia', 'Biologia'], createdAt: 1700000000021 },
  { id: 'mt-1', name: 'UFMT', city: 'Cuiabá', state: 'MT', type: 'Federal', phone: '(65) 3615-8000', website: 'ufmt.br', courses: ['Biomedicina', 'Farmácia', 'Biologia', 'Medicina'], createdAt: 1700000000022 },
  { id: 'ms-1', name: 'UFMS', city: 'Campo Grande', state: 'MS', type: 'Federal', phone: '(67) 3345-7000', website: 'ufms.br', courses: ['Farmácia', 'Biologia', 'Medicina'], createdAt: 1700000000023 },

  // REGIAO SUDESTE
  { id: 'sp-1', name: 'USP', city: 'São Paulo', state: 'SP', type: 'Estadual', phone: '(11) 3091-3116', website: 'usp.br', courses: ['Biomedicina', 'Farmácia', 'Biologia', 'Medicina'], createdAt: 1700000000024 },
  { id: 'sp-2', name: 'UNICAMP', city: 'Campinas', state: 'SP', type: 'Estadual', phone: '(19) 3521-7000', website: 'unicamp.br', courses: ['Farmácia', 'Biologia', 'Medicina'], createdAt: 1700000000025 },
  { id: 'sp-3', name: 'UNESP', city: 'Araraquara', state: 'SP', type: 'Estadual', phone: '(16) 3301-6100', website: 'fcfar.unesp.br', courses: ['Farmácia-Bioquímica', 'Biotecnologia'], createdAt: 1700000000026 },
  { id: 'sp-4', name: 'UNIFESP', city: 'São Paulo', state: 'SP', type: 'Federal', phone: '(11) 5576-4848', website: 'unifesp.br', courses: ['Biomedicina', 'Farmácia', 'Biologia'], createdAt: 1700000000027 },
  { id: 'mg-1', name: 'UFMG', city: 'Belo Horizonte', state: 'MG', type: 'Federal', phone: '(31) 3409-5000', website: 'ufmg.br', courses: ['Biomedicina', 'Farmácia', 'Biologia', 'Medicina'], createdAt: 1700000000028 },
  { id: 'mg-2', name: 'UFV', city: 'Viçosa', state: 'MG', type: 'Federal', phone: '(31) 3612-0000', website: 'ufv.br', courses: ['Bioquímica', 'Farmácia', 'Biologia'], createdAt: 1700000000029 },
  { id: 'rj-1', name: 'UFRJ', city: 'Rio de Janeiro', state: 'RJ', type: 'Federal', phone: '(21) 3938-6444', website: 'ufrj.br', courses: ['Bioquímica', 'Biomedicina', 'Farmácia', 'Biotecnologia'], createdAt: 1700000000030 },
  { id: 'es-1', name: 'UFES', city: 'Vitória', state: 'ES', type: 'Federal', phone: '(27) 4009-2200', website: 'ufes.br', courses: ['Farmácia', 'Ciências Biológicas', 'Medicina'], createdAt: 1700000000031 },

  // REGIAO SUL
  { id: 'pr-1', name: 'UFPR', city: 'Curitiba', state: 'PR', type: 'Federal', phone: '(41) 3360-5000', website: 'ufpr.br', courses: ['Biomedicina', 'Farmácia', 'Biologia', 'Medicina'], createdAt: 1700000000032 },
  { id: 'sc-1', name: 'UFSC', city: 'Florianópolis', state: 'SC', type: 'Federal', phone: '(48) 3721-9000', website: 'ufsc.br', courses: ['Farmácia', 'Ciências Biológicas', 'Medicina'], createdAt: 1700000000033 },
  { id: 'rs-1', name: 'UFRGS', city: 'Porto Alegre', state: 'RS', type: 'Federal', phone: '(51) 3308-6000', website: 'ufrgs.br', courses: ['Biomedicina', 'Farmácia', 'Biotecnologia', 'Biologia'], createdAt: 1700000000034 },
  { id: 'rs-2', name: 'UFSM', city: 'Santa Maria', state: 'RS', type: 'Federal', phone: '(55) 3220-8000', website: 'ufsm.br', courses: ['Farmácia', 'Biologia', 'Medicina', 'Nutrição'], createdAt: 1700000000035 },
  
  // ADICIONAIS DO DOCUMENTO (OUTROS CAMPUS)
  { id: 'pe-2', name: 'UFPE - CAA', city: 'Caruaru', state: 'PE', type: 'Federal', phone: '(81) 2103-9156', website: 'ufpe.br/caa', courses: ['Medicina', 'Nutrição (Base Bioquímica)'], createdAt: 1700000000036 },
  { id: 'mg-3', name: 'UFU', city: 'Uberlândia', state: 'MG', type: 'Federal', phone: '(34) 3239-4411', website: 'ufu.br', courses: ['Biomedicina', 'Farmácia', 'Biotecnologia'], createdAt: 1700000000037 },
  { id: 'mg-4', name: 'UFLA', city: 'Lavras', state: 'MG', type: 'Federal', phone: '(35) 3829-1122', website: 'ufla.br', courses: ['Bioquímica', 'Farmácia', 'Biologia'], createdAt: 1700000000038 },
  { id: 'rj-2', name: 'UFF', city: 'Niterói', state: 'RJ', type: 'Federal', phone: '(21) 2629-2540', website: 'uff.br', courses: ['Biomedicina', 'Farmácia', 'Biologia'], createdAt: 1700000000039 },
  { id: 'sp-5', name: 'USP - FCFRP', city: 'Ribeirão Preto', state: 'SP', type: 'Estadual', phone: '(16) 3315-4200', website: 'fcfrp.usp.br', courses: ['Farmácia-Bioquímica', 'Biologia'], createdAt: 1700000000040 }
];
