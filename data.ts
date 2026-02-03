
import { College } from './types';

export const INITIAL_COLLEGES: College[] = [
  // --- RONDÔNIA (RO) - NOVO LEVANTAMENTO ---
  { id: 'ro-unir-sede', name: 'UNIR (Sede)', city: 'Porto Velho', state: 'RO', address: 'Av. Pres. Dutra, 2965, Centro', type: 'Federal', phone: '(69) 2182-2000', website: 'unir.br', courses: ['Enfermagem', 'Medicina', 'Biologia', 'Saúde Coletiva'], createdAt: 1740000000700 },
  { id: 'ro-fimca-pv', name: 'FIMCA (Centro Universitário Aparício Carvalho)', city: 'Porto Velho', state: 'RO', address: 'Rua Araras, 241, Jardim Eldorado', type: 'Privada', phone: '(69) 3217-8900', website: 'fimca.com.br', courses: ['Biomedicina', 'Farmácia', 'Enfermagem', 'Medicina', 'Biologia', 'Nutrição', 'Medicina Veterinária'], createdAt: 1740000000701 },
  { id: 'ro-saolucas-pv', name: 'Faculdade São Lucas (Afya)', city: 'Porto Velho', state: 'RO', address: 'Rua Alexandre Guimarães, 1927, Areal', type: 'Privada', phone: '(69) 3211-8000', website: 'portovelho.saolucas.edu.br', courses: ['Biomedicina', 'Farmácia', 'Enfermagem', 'Medicina', 'Nutrição'], createdAt: 1740000000702 },
  { id: 'ro-uniron-pv', name: 'UNIRON (Centro Universitário)', city: 'Porto Velho', state: 'RO', address: 'Av. Mamoré, 1520, Cascalheira', type: 'Privada', phone: '(69) 3733-5555', website: 'uniron.edu.br', courses: ['Biomedicina', 'Enfermagem', 'Farmácia'], createdAt: 1740000000703 },
  { id: 'ro-ifro-pv', name: 'IFRO (Reitoria/Campus)', city: 'Porto Velho', state: 'RO', address: 'Av. Lauro Sodré, 6500, Aeroporto', type: 'Federal', phone: '(69) 2182-9602', website: 'portal.ifro.edu.br', courses: ['Biologia', 'Saúde Pública'], createdAt: 1740000000704 },
  { id: 'ro-catolica-pv', name: 'Faculdade Católica de Rondônia', city: 'Porto Velho', state: 'RO', address: 'Rua Gonçalves Dias, 290, Centro', type: 'Privada', phone: '(69) 3211-4500', website: 'catolicaro.org.br', courses: ['Psicologia (Saúde)'], createdAt: 1740000000705 },
  { id: 'ro-unir-ji', name: 'UNIR (Campus Ji-Paraná)', city: 'Ji-Paraná', state: 'RO', address: 'Rua da Beira, 6933', type: 'Federal', phone: '(69) 3416-7900', website: 'unir.br', courses: ['Biologia'], createdAt: 1740000000706 },
  { id: 'ro-saolucas-ji', name: 'Centro Universitário São Lucas (Ji-Paraná)', city: 'Ji-Paraná', state: 'RO', address: 'Rua Engenheiro Manfredo Barata Almeida da Fonseca, 542', type: 'Privada', phone: '(69) 3411-2700', website: 'jiparana.saolucas.edu.br', courses: ['Biomedicina', 'Enfermagem', 'Farmácia', 'Medicina'], createdAt: 1740000000707 },
  { id: 'ro-ifro-ji', name: 'IFRO (Campus Ji-Paraná)', city: 'Ji-Paraná', state: 'RO', address: 'Rua Engenheiro Manfredo Barata Almeida da Fonseca, 634', type: 'Federal', phone: '(69) 2183-6900', website: 'portal.ifro.edu.br', courses: ['Química (Bioquímica)', 'Biologia'], createdAt: 1740000000708 },
  { id: 'ro-unesc-cacoal', name: 'UNESC (Centro Universitário)', city: 'Cacoal', state: 'RO', address: 'Rua das Flores, 2490, Jardim Clodoaldo', type: 'Privada', phone: '(69) 3441-4503', website: 'unescnet.br', courses: ['Biomedicina', 'Enfermagem', 'Farmácia', 'Medicina', 'Nutrição'], createdAt: 1740000000709 },
  { id: 'ro-facimed-cacoal', name: 'FACIMED (Centro Universitário)', city: 'Cacoal', state: 'RO', address: 'Av. Cuiabá, 3087, Jardim Clodoaldo', type: 'Privada', phone: '(69) 3441-1011', website: 'facimed.edu.br', courses: ['Biomedicina', 'Enfermagem', 'Farmácia', 'Medicina', 'Medicina Veterinária'], createdAt: 1740000000710 },
  { id: 'ro-unir-vilhena', name: 'UNIR (Campus Vilhena)', city: 'Vilhena', state: 'RO', address: 'Av. Norte Sul, 7300', type: 'Federal', phone: '(69) 3321-5511', website: 'unir.br', courses: ['Biologia'], createdAt: 1740000000711 },
  { id: 'ro-fimca-vilhena', name: 'FIMCA (Vilhena)', city: 'Vilhena', state: 'RO', address: 'Av. Marques Henrique, 625', type: 'Privada', phone: '(69) 3322-8966', website: 'fimca.com.br', courses: ['Biomedicina', 'Enfermagem', 'Farmácia'], createdAt: 1740000000712 },
  { id: 'ro-ifro-vilhena', name: 'IFRO (Campus Vilhena)', city: 'Vilhena', state: 'RO', address: 'Rodovia BR-174, km 3', type: 'Federal', phone: '(69) 2101-0700', website: 'portal.ifro.edu.br', courses: ['Biologia'], createdAt: 1740000000713 },
  { id: 'ro-unir-ariquemes', name: 'UNIR (Campus Ariquemes)', city: 'Ariquemes', state: 'RO', address: 'Av. Tancredo Neves, 3450', type: 'Federal', phone: '(69) 3535-4911', website: 'unir.br', courses: ['Biologia'], createdAt: 1740000000714 },
  { id: 'ro-unifaema-ariquemes', name: 'UNIFAEMA (Centro Universitário)', city: 'Ariquemes', state: 'RO', address: 'Av. Juscelino Kubitschek, 1627', type: 'Privada', phone: '(69) 3536-6600', website: 'unifaema.edu.br', courses: ['Biomedicina', 'Enfermagem', 'Farmácia', 'Medicina'], createdAt: 1740000000715 },
  { id: 'ro-faar-ariquemes', name: 'FAAr (Faculdades Associadas de Ariquemes)', city: 'Ariquemes', state: 'RO', address: 'Av. Capitão Silvio, 2738', type: 'Privada', phone: '(69) 3535-5008', website: 'faar.edu.br', courses: ['Biomedicina', 'Enfermagem', 'Farmácia'], createdAt: 1740000000716 },
  { id: 'ro-unir-rolim', name: 'UNIR (Campus Rolim de Moura)', city: 'Rolim de Moura', state: 'RO', address: 'Av. Norte Sul, 7300', type: 'Federal', phone: '(69) 3442-1128', website: 'unir.br', courses: ['Biologia'], createdAt: 1740000000717 },
  { id: 'ro-uniasselvi-rolim', name: 'UNIASSELVI (Polo Rolim de Moura)', city: 'Rolim de Moura', state: 'RO', address: 'Av. Porto Velho, 4884, Centro', type: 'Privada', phone: '(69) 98424-5166', website: 'uniasselvi.com.br', courses: ['Biomedicina', 'Enfermagem'], createdAt: 1740000000718 },
  { id: 'ro-unir-guajara', name: 'UNIR (Campus Guajará-Mirim)', city: 'Guajará-Mirim', state: 'RO', address: 'Av. 15 de Novembro, s/n', type: 'Federal', phone: '(69) 3541-2334', website: 'unir.br', courses: ['Biologia'], createdAt: 1740000000719 },
  { id: 'ro-ifro-guajara', name: 'IFRO (Campus Guajará-Mirim)', city: 'Guajará-Mirim', state: 'RO', address: 'Av. 15 de Novembro, s/n', type: 'Federal', phone: '(69) 2182-9602', website: 'portal.ifro.edu.br', courses: ['Biologia', 'Saúde Pública'], createdAt: 1740000000720 },

  // --- AMAZONAS (AM) - MANTIDOS ---
  { id: 'am-ufam-sede', name: 'UFAM (Sede)', city: 'Manaus', state: 'AM', address: 'Av. Rodrigo Otávio, 6200, Coroado', type: 'Federal', phone: '(92) 3305-1181', website: 'ufam.edu.br', courses: ['Farmácia', 'Enfermagem', 'Medicina', 'Biologia', 'Biotecnologia', 'Nutrição'], createdAt: 1740000000600 },
  { id: 'am-uea-esa', name: 'UEA (ESA - Escola Superior de Ciências da Saúde)', city: 'Manaus', state: 'AM', address: 'Av. Carvalho Leal, 1777, Cachoeirinha', type: 'Estadual', phone: '(92) 3878-4362', website: 'uea.edu.br', courses: ['Medicina', 'Enfermagem', 'Odontologia', 'Saúde Pública'], createdAt: 1740000000601 },
  { id: 'am-fametro-sede', name: 'FAMETRO (Centro Universitário)', city: 'Manaus', state: 'AM', address: 'Av. Constantino Nery, 3000, Chapada', type: 'Privada', phone: '(92) 2101-1000', website: 'fametro.edu.br', courses: ['Biomedicina', 'Farmácia', 'Enfermagem', 'Medicina', 'Biologia', 'Nutrição', 'Medicina Veterinária'], createdAt: 1740000000602 },

  // --- ACRE (AC) - MANTIDOS ---
  { id: 'ac-ufac-sede', name: 'UFAC (Sede)', city: 'Rio Branco', state: 'AC', address: 'Rodovia BR-364, km 04, Distrito Industrial', type: 'Federal', phone: '(68) 3229-2244', website: 'ufac.br', courses: ['Enfermagem', 'Medicina', 'Biologia', 'Saúde Coletiva', 'Nutrição'], createdAt: 1740000000500 },
  { id: 'ac-uninorte-rb', name: 'UNINORTE (Centro Universitário)', city: 'Rio Branco', state: 'AC', address: 'Alameda Ricardo de Oliveira, 211, Jardim de Alah', type: 'Privada', phone: '(68) 3302-7100', website: 'uninorteac.edu.br', courses: ['Biomedicina', 'Farmácia', 'Enfermagem', 'Medicina', 'Biologia', 'Nutrição'], createdAt: 1740000000501 },

  // --- RIO DE JANEIRO (RJ) - MANTIDOS ---
  { id: 'rj-ufrj-cap', name: 'UFRJ - Univ. Federal do Rio de Janeiro', city: 'Rio de Janeiro', state: 'RJ', address: 'Av. Pedro Calmon, 550, Cidade Universitária', type: 'Federal', phone: '(21) 3938-9600', website: 'ufrj.br', courses: ['Bioquímica', 'Biomedicina', 'Farmácia', 'Enfermagem', 'Medicina', 'Biotecnologia'], createdAt: 1740000000400 },
  { id: 'rj-uerj-cap', name: 'UERJ - Univ. do Estado do Rio de Janeiro', city: 'Rio de Janeiro', state: 'RJ', address: 'Rua São Francisco Xavier, 524, Maracanã', type: 'Estadual', phone: '(21) 2334-0000', website: 'uerj.br', courses: ['Enfermagem', 'Medicina', 'Biologia', 'Nutrição'], createdAt: 1740000000401 },

  // --- BAHIA (BA) - MANTIDOS ---
  { id: 'ba-ufba-salvador', name: 'UFBA - Universidade Federal da Bahia', city: 'Salvador', state: 'BA', address: 'Rua Augusto Viana, s/n, Canela', type: 'Federal', phone: '(71) 3283-7070', website: 'ufba.br', courses: ['Bioquímica', 'Biomedicina', 'Farmácia', 'Enfermagem', 'Medicina', 'Biologia'], createdAt: 1740000000300 },
  { id: 'ba-uneb-salvador', name: 'UNEB - Universidade do Estado da Bahia', city: 'Salvador', state: 'BA', address: 'Rua Silveira Martins, 2555, Cabula', type: 'Estadual', phone: '(71) 3117-2200', website: 'uneb.br', courses: ['Enfermagem', 'Farmácia', 'Medicina', 'Biologia'], createdAt: 1740000000302 },

  // --- MINAS GERAIS (MG) - MANTIDOS ---
  { id: 'mg-ufmg', name: 'UFMG - Univ. Federal de Minas Gerais', city: 'Belo Horizonte', state: 'MG', address: 'Av. Antônio Carlos, 6627, Pampulha', type: 'Federal', phone: '(31) 3409-5000', website: 'ufmg.br', courses: ['Bioquímica', 'Biomedicina', 'Farmácia', 'Enfermagem', 'Medicina'], createdAt: 1740000000200 },
  { id: 'mg-ufu', name: 'UFU - Univ. Federal de Uberlândia', city: 'Uberlândia', state: 'MG', address: 'Av. João Naves de Ávila, 2121, Santa Mônica', type: 'Federal', phone: '(34) 3239-4411', website: 'ufu.br', courses: ['Biomedicina', 'Farmácia', 'Enfermagem', 'Medicina', 'Biotecnologia'], createdAt: 1740000000207 },

  // --- RIO GRANDE DO NORTE (RN) - MANTIDOS ---
  { id: 'rn-ufrn-1', name: 'UFRN (Univ. Federal do RN)', city: 'Natal', state: 'RN', address: 'Campus Universitário, Lagoa Nova, Natal - RN, CEP: 59078-970', type: 'Federal', phone: '(84) 3215-3416', website: 'ufrn.br', courses: ['Bioquímica', 'Biomedicina', 'Farmácia'], createdAt: 1740000000100 },

  // --- PARÁ (PA) - MANTIDOS ---
  { id: 'pa-1', name: 'Universidade Federal do Pará (UFPA)', city: 'Belém', state: 'PA', address: 'Rua Augusto Corrêa, 1 - Guamá', type: 'Federal', phone: '(91) 3201-7000', website: 'www.ufpa.br', courses: ['Bioquímica', 'Biotecnologia'], createdAt: 1740000000011 }
];
