
import { College } from './types';

export const ALL_STATES = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

export const INITIAL_COLLEGES: College[] = [
  // --- TOCANTINS (TO) - VERIFICADO ---
  { id: 'to-uft', name: 'UFT - Universidade Federal do Tocantins', city: 'Palmas / Diversos', state: 'TO', address: 'Av. NS 15, ALCNO 14 - Plano Diretor Norte, Palmas', type: 'Pública (Federal)', phone: '(63) 3229-4413', website: 'uft.edu.br', courses: ['Medicina', 'Enfermagem', 'Nutrição', 'Ed. Física', 'C. Biológicas', 'Med. Veterinária', 'Zootecnia', 'Agronomia', 'Eng. Ambiental', 'Eng. de Alimentos', 'Eng. Florestal'], createdAt: 1740100000001 },
  { id: 'to-ufnt', name: 'UFNT - Universidade Federal do Norte do Tocantins', city: 'Araguaína', state: 'TO', address: 'Rua 07, Lote 15, s/n - Setor Aeroporto', type: 'Pública (Federal)', phone: '(63) 2112-2200', website: 'ufnt.edu.br', courses: ['Medicina', 'Med. Veterinária', 'Zootecnia', 'C. Biológicas'], createdAt: 1740100000002 },
  { id: 'to-ifto', name: 'IFTO - Instituto Federal do Tocantins', city: 'Palmas / Diversos', state: 'TO', address: 'Av. Joaquim Teotônio Segurado - Palmas (Reitoria)', type: 'Pública (Federal)', phone: '(63) 3229-2200', website: 'ifto.edu.br', courses: ['Agronomia', 'C. Biológicas', 'Eng. Ambiental', 'Eng. de Alimentos'], createdAt: 1740100000003 },
  { id: 'to-unitins', name: 'UNITINS - Universidade Estadual do Tocantins', city: 'Palmas / Diversos', state: 'TO', address: '108 Sul, Alameda 11, Lote 03 - Palmas', type: 'Pública (Estadual)', phone: '(63) 3218-2900', website: 'unitins.br', courses: ['Enfermagem', 'Medicina', 'Agronomia'], createdAt: 1740100000004 },
  { id: 'to-unirg', name: 'UnirG - Universidade de Gurupi', city: 'Gurupi', state: 'TO', address: 'Av. Antônio Nunes da Silva, 2195 - Parque das Acácias', type: 'Pública (Municipal)', phone: '(63) 3612-7500', website: 'unirg.edu.br', courses: ['Medicina', 'Odontologia', 'Enfermagem', 'Fisioterapia', 'Nutrição', 'Ed. Física', 'C. Biológicas'], createdAt: 1740100000005 },
  { id: 'to-itpac-ara', name: 'ITPAC Araguaína - Centro Universitário ITPAC', city: 'Araguaína', state: 'TO', address: 'Av. Filadélfia, 568 - Setor Oeste', type: 'Privada', phone: '(63) 3411-8500', website: 'itpac.br', courses: ['Medicina', 'Odontologia', 'Enfermagem', 'Fisioterapia', 'Nutrição', 'Biomedicina', 'Ed. Física', 'Med. Veterinária'], createdAt: 1740100000008 },
  
  // --- GOIÁS (GO) ---
  { id: 'go-ufg', name: 'UFG - Universidade Federal de Goiás', city: 'Goiânia', state: 'GO', address: 'Avenida Esperança, s/n - Campus Samambaia', type: 'Pública (Federal)', phone: '(62) 3521-1000', website: 'ufg.br', courses: ['Medicina', 'Biomedicina', 'Bioquímica', 'Agronomia', 'C. Biológicas', 'Nutrição', 'Enfermagem'], createdAt: 1740200000001 },
  { id: 'go-ifg', name: 'IFG - Instituto Federal de Goiás', city: 'Goiânia', state: 'GO', address: 'Rua 75, nº 46 - Centro', type: 'Pública (Federal)', phone: '(62) 3227-2700', website: 'ifg.edu.br', courses: ['Eng. Ambiental', 'Ciências Biológicas', 'Química'], createdAt: 1740200000002 },
  { id: 'go-ueg', name: 'UEG - Universidade Estadual de Goiás', city: 'Anápolis', state: 'GO', address: 'Rodovia BR-153, Quadra Área, Km 99', type: 'Pública (Estadual)', phone: '(62) 3328-1122', website: 'ueg.br', courses: ['C. Biológicas', 'Farmácia', 'Fisioterapia', 'Medicina (Itumbiara)'], createdAt: 1740200000003 },

  // --- DISTRITO FEDERAL (DF) ---
  { id: 'df-unb', name: 'UnB - Universidade de Brasília', city: 'Brasília', state: 'DF', address: 'Campus Universitário Darcy Ribeiro - Asa Norte', type: 'Pública (Federal)', phone: '(61) 3107-3300', website: 'unb.br', courses: ['Medicina', 'Biomedicina', 'Biotecnologia', 'Ciências Biológicas', 'Nutrição', 'Agronomia', 'Med. Veterinária'], createdAt: 1740300000001 },
  { id: 'df-escs', name: 'ESCS - Escola Superior de Ciências da Saúde', city: 'Brasília', state: 'DF', address: 'SMHN Quadra 03, Conjunto A, Bloco 01 - Asa Norte', type: 'Pública (Distrital)', phone: '(61) 3326-9372', website: 'escs.edu.br', courses: ['Medicina', 'Enfermagem'], createdAt: 1740300000002 },

  // --- MINAS GERAIS (MG) ---
  { id: 'mg-ufmg', name: 'UFMG - Universidade Federal de Minas Gerais', city: 'Belo Horizonte', state: 'MG', address: 'Av. Antônio Carlos, 6627 - Pampulha', type: 'Pública (Federal)', phone: '(31) 3409-5000', website: 'ufmg.br', courses: ['Medicina', 'Biomedicina', 'Ciências Biológicas', 'Aquacultura', 'Agronomia', 'Med. Veterinária', 'Nutrição'], createdAt: 1740400000001 },
  { id: 'mg-ufv', name: 'UFV - Universidade Federal de Viçosa', city: 'Viçosa', state: 'MG', address: 'Avenida Peter Henry Rolfs, s/n - Campus Universitário', type: 'Pública (Federal)', phone: '(31) 3612-0000', website: 'ufv.br', courses: ['Bioquímica', 'Agronomia', 'Zootecnia', 'Medicina', 'Med. Veterinária', 'Eng. de Alimentos', 'C. Biológicas'], createdAt: 1740400000002 },
  { id: 'mg-ufla', name: 'UFLA - Universidade Federal de Lavras', city: 'Lavras', state: 'MG', address: 'Av. Central, s/n - Campus Universitário', type: 'Pública (Federal)', phone: '(35) 3829-1122', website: 'ufla.br', courses: ['Agronomia', 'Zootecnia', 'Med. Veterinária', 'C. Biológicas', 'Medicina', 'Nutrição'], createdAt: 1740400000003 },

  // --- SÃO PAULO (SP) ---
  { id: 'sp-usp', name: 'USP - Universidade de São Paulo', city: 'São Paulo', state: 'SP', address: 'Rua da Reitoria, 109 - Cidade Universitária', type: 'Pública (Estadual)', phone: '(11) 3091-3116', website: 'usp.br', courses: ['Medicina', 'Odontologia', 'Ciências Biológicas', 'Biomedicina (Ribeirão)', 'Biotecnologia', 'Med. Veterinária', 'Agronomia (ESALQ)'], createdAt: 1740500000001 },
  { id: 'sp-unicamp', name: 'UNICAMP - Universidade Estadual de Campinas', city: 'Campinas', state: 'SP', address: 'Cidade Universitária Zeferino Vaz - Barão Geraldo', type: 'Pública (Estadual)', phone: '(19) 3521-7000', website: 'unicamp.br', courses: ['Medicina', 'Enfermagem', 'C. Biológicas', 'Eng. de Alimentos', 'Farmácia'], createdAt: 1740500000002 },
  { id: 'sp-unifesp', name: 'UNIFESP - Universidade Federal de São Paulo', city: 'São Paulo', state: 'SP', address: 'Rua Sena Madureira, 1500 - Vila Clementino', type: 'Pública (Federal)', phone: '(11) 5576-4000', website: 'unifesp.br', courses: ['Biomedicina', 'Medicina', 'Enfermagem', 'C. Biológicas (Diadema)'], createdAt: 1740500000003 },

  // --- RIO DE JANEIRO (RJ) ---
  { id: 'rj-ufrj', name: 'UFRJ - Universidade Federal do Rio de Janeiro', city: 'Rio de Janeiro', state: 'RJ', address: 'Avenida Pedro Calmon, 550 - Cidade Universitária', type: 'Pública (Federal)', phone: '(21) 3938-9600', website: 'ufrj.br', courses: ['Medicina', 'Biomedicina', 'Bioquímica', 'Biotecnologia', 'C. Biológicas', 'Nutrição'], createdAt: 1740600000001 },
  { id: 'rj-uerj', name: 'UERJ - Universidade do Estado do Rio de Janeiro', city: 'Rio de Janeiro', state: 'RJ', address: 'Rua São Francisco Xavier, 524 - Maracanã', type: 'Pública (Estadual)', phone: '(21) 2334-0000', website: 'uerj.br', courses: ['Medicina', 'Enfermagem', 'C. Biológicas', 'Oceanografia', 'Nutrição'], createdAt: 1740600000002 },

  // --- PARANÁ (PR) ---
  { id: 'pr-ufpr', name: 'UFPR - Universidade Federal do Paraná', city: 'Curitiba', state: 'PR', address: 'Rua XV de Novembro, 1299 - Centro', type: 'Pública (Federal)', phone: '(41) 3360-5000', website: 'ufpr.br', courses: ['Medicina', 'Biomedicina', 'C. Biológicas', 'Agronomia', 'Med. Veterinária', 'Zootecnia'], createdAt: 1740700000001 },
  { id: 'pr-uem', name: 'UEM - Universidade Estadual de Maringá', city: 'Maringá', state: 'PR', address: 'Av. Colombo, 5790 - Jd. Universitário', type: 'Pública (Estadual)', phone: '(44) 3011-4040', website: 'uem.br', courses: ['Bioquímica', 'Medicina', 'Agronomia', 'C. Biológicas', 'Biomedicina'], createdAt: 1740700000002 },

  // --- SANTA CATARINA (SC) ---
  { id: 'sc-ufsc', name: 'UFSC - Universidade Federal de Santa Catarina', city: 'Florianópolis', state: 'SC', address: 'Campus Universitário Reitor João David Ferreira Lima - Trindade', type: 'Pública (Federal)', phone: '(48) 3721-9000', website: 'ufsc.br', courses: ['Medicina', 'Biotecnologia', 'C. Biológicas', 'Eng. de Alimentos', 'Agronomia'], createdAt: 1740800000001 },

  // --- AMAZONAS (AM) ---
  { id: 'am-ufam', name: 'UFAM - Universidade Federal do Amazonas', city: 'Manaus', state: 'AM', address: 'Av. Rodrigo Octávio, 6200 - Coroado', type: 'Pública (Federal)', phone: '(92) 3305-1181', website: 'ufam.edu.br', courses: ['Medicina', 'C. Biológicas', 'Biotecnologia', 'Agronomia', 'Eng. de Alimentos'], createdAt: 1740900000001 },

  // --- PARA (PA) ---
  { id: 'pa-ufpa', name: 'UFPA - Universidade Federal do Pará', city: 'Belém', state: 'PA', address: 'Rua Augusto Corrêa, 01 - Guamá', type: 'Pública (Federal)', phone: '(91) 3201-7000', website: 'ufpa.br', courses: ['Biomedicina', 'Medicina', 'C. Biológicas', 'Biotecnologia'], createdAt: 1741000000001 },

  // --- BAHIA (BA) ---
  { id: 'ba-ufba', name: 'UFBA - Universidade Federal da Bahia', city: 'Salvador', state: 'BA', address: 'Rua Augusto Viana, s/n - Canela', type: 'Pública (Federal)', phone: '(71) 3283-7000', website: 'ufba.br', courses: ['Medicina', 'Biomedicina', 'C. Biológicas', 'Med. Veterinária', 'Eng. Sanitária'], createdAt: 1741100000001 }
];
