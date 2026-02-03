
import { College } from './types';

export const INITIAL_COLLEGES: College[] = [
  // --- MINAS GERAIS (MG) - LEVANTAMENTO EXAUSTIVO ---
  
  // Belo Horizonte
  { id: 'mg-ufmg', name: 'UFMG - Univ. Federal de Minas Gerais', city: 'Belo Horizonte', state: 'MG', address: 'Av. Antônio Carlos, 6627, Pampulha', type: 'Federal', phone: '(31) 3409-5000', website: 'ufmg.br', courses: ['Bioquímica', 'Biomedicina', 'Farmácia', 'Enfermagem', 'Medicina'], createdAt: 1740000000200 },
  { id: 'mg-puc-bh', name: 'PUC Minas', city: 'Belo Horizonte', state: 'MG', address: 'Av. Dom José Gaspar, 500, Coração Eucarístico', type: 'Privada', phone: '(31) 3319-4444', website: 'pucminas.br', courses: ['Biomedicina', 'Enfermagem', 'Farmácia', 'Medicina'], createdAt: 1740000000201 },
  { id: 'mg-fcmmg', name: 'Faculdade Ciências Médicas (FCM-MG)', city: 'Belo Horizonte', state: 'MG', address: 'Alameda Ezequiel Dias, 275, Centro', type: 'Privada', phone: '(31) 3248-7100', website: 'cmmg.edu.br', courses: ['Medicina', 'Enfermagem', 'Fisioterapia'], createdAt: 1740000000202 },
  { id: 'mg-faminas', name: 'FAMINAS-BH', city: 'Belo Horizonte', state: 'MG', address: 'Av. Cristiano Machado, 12001, Vila Cloris', type: 'Privada', phone: '(31) 2126-3100', website: 'faminasbh.edu.br', courses: ['Biomedicina', 'Enfermagem', 'Farmácia', 'Medicina'], createdAt: 1740000000203 },
  { id: 'mg-unibh', name: 'UniBH', city: 'Belo Horizonte', state: 'MG', address: 'Rua Diamantina, 567, Lagoinha', type: 'Privada', phone: '(31) 3319-9500', website: 'unibh.br', courses: ['Biomedicina', 'Enfermagem', 'Farmácia', 'Biologia'], createdAt: 1740000000204 },

  // Região Metropolitana
  { id: 'mg-una-contagem', name: 'UNA Contagem', city: 'Contagem', state: 'MG', address: 'Av. João César de Oliveira, 5775', type: 'Privada', phone: '(31) 3235-8800', website: 'una.br', courses: ['Biomedicina', 'Farmácia', 'Enfermagem'], createdAt: 1740000000205 },
  { id: 'mg-puc-betim', name: 'PUC Minas Betim', city: 'Betim', state: 'MG', address: 'Rua do Rosário, 1081, Angola', type: 'Privada', phone: '(31) 3539-6150', website: 'pucminas.br', courses: ['Biomedicina', 'Enfermagem', 'Medicina'], createdAt: 1740000000206 },

  // Triângulo Mineiro
  { id: 'mg-ufu', name: 'UFU - Univ. Federal de Uberlândia', city: 'Uberlândia', state: 'MG', address: 'Av. João Naves de Ávila, 2121, Santa Mônica', type: 'Federal', phone: '(34) 3239-4411', website: 'ufu.br', courses: ['Biomedicina', 'Farmácia', 'Enfermagem', 'Medicina', 'Biotecnologia'], createdAt: 1740000000207 },
  { id: 'mg-uftm', name: 'UFTM - Univ. Federal do Triângulo Mineiro', city: 'Uberaba', state: 'MG', address: 'Av. Frei Paulino, 30, Abadia', type: 'Federal', phone: '(34) 3700-6000', website: 'uftm.edu.br', courses: ['Biomedicina', 'Enfermagem', 'Medicina', 'Nutrição'], createdAt: 1740000000208 },
  { id: 'mg-uniube', name: 'UNIUBE', city: 'Uberaba', state: 'MG', address: 'Av. Nenê Sabino, 1801, Universitário', type: 'Privada', phone: '(34) 3319-8800', website: 'uniube.br', courses: ['Biomedicina', 'Farmácia', 'Enfermagem', 'Medicina'], createdAt: 1740000000209 },
  { id: 'mg-imepac', name: 'IMEPAC Araguari', city: 'Araguari', state: 'MG', address: 'Av. Minas Gerais, 1889, Centro', type: 'Privada', phone: '(34) 3249-3900', website: 'imepac.edu.br', courses: ['Medicina', 'Enfermagem', 'Farmácia'], createdAt: 1740000000210 },
  { id: 'mg-unipam', name: 'UNIPAM', city: 'Patos de Minas', state: 'MG', address: 'Rua Major Gote, 808, Caiçaras', type: 'Privada', phone: '(34) 3823-0300', website: 'unipam.edu.br', courses: ['Biomedicina', 'Farmácia', 'Enfermagem', 'Biologia'], createdAt: 1740000000211 },

  // Sul de Minas
  { id: 'mg-unifal', name: 'UNIFAL-MG - Univ. Federal de Alfenas', city: 'Alfenas', state: 'MG', address: 'Rua Gabriel Monteiro da Silva, 700', type: 'Federal', phone: '(35) 3701-9000', website: 'unifal-mg.edu.br', courses: ['Biotecnologia', 'Biomedicina', 'Farmácia', 'Enfermagem', 'Medicina'], createdAt: 1740000000212 },
  { id: 'mg-unifenas', name: 'UNIFENAS', city: 'Alfenas', state: 'MG', address: 'Rodovia MG-179, Km 0, Trevo', type: 'Privada', phone: '(35) 3299-3000', website: 'unifenas.br', courses: ['Biomedicina', 'Farmácia', 'Enfermagem', 'Medicina'], createdAt: 1740000000213 },
  { id: 'mg-ufla', name: 'UFLA - Univ. Federal de Lavras', city: 'Lavras', state: 'MG', address: 'Aquenta Sol, Lavras', type: 'Federal', phone: '(35) 3829-1122', website: 'ufla.br', courses: ['Bioquímica', 'Farmácia', 'Medicina', 'Biologia'], createdAt: 1740000000214 },
  { id: 'mg-unis', name: 'Grupo Unis', city: 'Varginha', state: 'MG', address: 'Av. Alzira Barra Gazola, 650, Aeroporto', type: 'Privada', phone: '(35) 3219-5000', website: 'portal.unis.edu.br', courses: ['Biomedicina', 'Enfermagem', 'Fisioterapia'], createdAt: 1740000000215 },
  { id: 'mg-fepi', name: 'FEPI - Centro Univ. de Itajubá', city: 'Itajubá', state: 'MG', address: 'Av. Dr. Antônio Braga Filho, 687', type: 'Privada', phone: '(35) 3629-8400', website: 'fepi.br', courses: ['Biomedicina', 'Enfermagem', 'Farmácia'], createdAt: 1740000000216 },
  { id: 'mg-univas', name: 'UNIVÁS', city: 'Pouso Alegre', state: 'MG', address: 'Av. Pref. Tuany Toledo, 470', type: 'Privada', phone: '(35) 3449-9200', website: 'univas.edu.br', courses: ['Enfermagem', 'Farmácia', 'Medicina'], createdAt: 1740000000217 },

  // Zona da Mata
  { id: 'mg-ufjf', name: 'UFJF - Univ. Federal de Juiz de Fora', city: 'Juiz de Fora', state: 'MG', address: 'Rua José Lourenço Kelmer, s/n, Campus Universitário', type: 'Federal', phone: '(32) 2102-3911', website: 'ufjf.br', courses: ['Farmácia', 'Enfermagem', 'Medicina', 'Biologia'], createdAt: 1740000000218 },
  { id: 'mg-suprema', name: 'Faculdade Suprema', city: 'Juiz de Fora', state: 'MG', address: 'Alameda Salvaterra, 200, Salvaterra', type: 'Privada', phone: '(32) 2101-5000', website: 'suprema.edu.br', courses: ['Enfermagem', 'Farmácia', 'Medicina'], createdAt: 1740000000219 },
  { id: 'mg-ufv-vicosa', name: 'UFV - Univ. Federal de Viçosa', city: 'Viçosa', state: 'MG', address: 'Av. Peter Henry Rolfs, s/n, Campus Universitário', type: 'Federal', phone: '(31) 3612-0000', website: 'ufv.br', courses: ['Bioquímica', 'Enfermagem', 'Medicina', 'Biologia'], createdAt: 1740000000220 },

  // Norte de Minas e Vales
  { id: 'mg-unimontes', name: 'UNIMONTES', city: 'Montes Claros', state: 'MG', address: 'Av. Rui Braga, s/n, Vila Mauriceia', type: 'Estadual', phone: '(38) 3229-8000', website: 'unimontes.br', courses: ['Enfermagem', 'Medicina', 'Biologia'], createdAt: 1740000000221 },
  { id: 'mg-funorte', name: 'Funorte', city: 'Montes Claros', state: 'MG', address: 'Av. Osmane Barbosa, 11111, JK', type: 'Privada', phone: '(38) 2101-9292', website: 'funorte.edu.br', courses: ['Biomedicina', 'Farmácia', 'Enfermagem'], createdAt: 1740000000222 },
  { id: 'mg-ufvjm-dia', name: 'UFVJM Diamantina', city: 'Diamantina', state: 'MG', address: 'Rodovia MGT-367, Km 583, 5000', type: 'Federal', phone: '(38) 3532-1200', website: 'ufvjm.edu.br', courses: ['Farmácia', 'Enfermagem', 'Medicina', 'Biologia'], createdAt: 1740000000223 },
  { id: 'mg-ufvjm-to', name: 'UFVJM Teófilo Otoni', city: 'Teófilo Otoni', state: 'MG', address: 'Rua do Cruzeiro, 01, Jardim São Paulo', type: 'Federal', phone: '(33) 3529-2700', website: 'ufvjm.edu.br', courses: ['Medicina', 'Farmácia'], createdAt: 1740000000224 },

  // Centro-Oeste e Histórica
  { id: 'mg-ufsj-div', name: 'UFSJ Divinópolis', city: 'Divinópolis', state: 'MG', address: 'Rua Sebastião Gonçalves Coelho, 400', type: 'Federal', phone: '(37) 3221-1164', website: 'ufsj.edu.br', courses: ['Bioquímica', 'Farmácia', 'Enfermagem', 'Medicina'], createdAt: 1740000000225 },
  { id: 'mg-ufsj-sjr', name: 'UFSJ São João del-Rei', city: 'São João del-Rei', state: 'MG', address: 'Praça Frei Orlando, 170, Centro', type: 'Federal', phone: '(32) 3379-5100', website: 'ufsj.edu.br', courses: ['Medicina', 'Biologia'], createdAt: 1740000000226 },
  { id: 'mg-ufop', name: 'UFOP - Univ. Federal de Ouro Preto', city: 'Ouro Preto', state: 'MG', address: 'Rua Diogo de Vasconcelos, 122, Centro', type: 'Federal', phone: '(31) 3559-1200', website: 'ufop.br', courses: ['Farmácia', 'Enfermagem', 'Medicina', 'Biologia'], createdAt: 1740000000227 },

  // --- RIO GRANDE DO NORTE (RN) - MANTIDOS ---
  { id: 'rn-ufrn-1', name: 'UFRN (Univ. Federal do RN)', city: 'Natal', state: 'RN', address: 'Campus Universitário, Lagoa Nova, Natal - RN, CEP: 59078-970', type: 'Federal', phone: '(84) 3215-3416', website: 'ufrn.br', courses: ['Bioquímica', 'Biomedicina', 'Farmácia'], createdAt: 1740000000100 },
  { id: 'rn-unirn-1', name: 'UNI-RN', city: 'Natal', state: 'RN', address: 'Rua Prefeito Jundiaí, 546, Tirol, Natal - RN, CEP: 59020-120', type: 'Privada', phone: '(84) 3215-2917', website: 'unirn.edu.br', courses: ['Biomedicina', 'Farmácia'], createdAt: 1740000000101 },
  { id: 'rn-unp-1', name: 'UnP (Univ. Potiguar)', city: 'Natal', state: 'RN', address: 'Av. Eng. Roberto Freire, 2184, Capim Macio, Natal - RN, CEP: 59082-902', type: 'Privada', phone: '(84) 3227-1234', website: 'unp.br', courses: ['Biomedicina', 'Farmácia'], createdAt: 1740000000102 },
  { id: 'rn-ufersa-1', name: 'UFERSA (Univ. Fed. Rural do Semi-Árido)', city: 'Mossoró', state: 'RN', address: 'Av. Francisco Mota, 572, Costa e Silva, Mossoró - RN, CEP: 59625-900', type: 'Federal', phone: '(84) 3317-8224', website: 'ufersa.edu.br', courses: ['Biotecnologia', 'Medicina'], createdAt: 1740000000103 },
  { id: 'rn-uern-1', name: 'UERN (Univ. do Estado do RN)', city: 'Mossoró', state: 'RN', address: 'Rua Almino Afonso, 478, Centro, Mossoró - RN, CEP: 59610-210', type: 'Estadual', phone: '(84) 3315-2248', website: 'portal.uern.br', courses: ['Medicina', 'Enfermagem'], createdAt: 1740000000104 },

  // --- REGIÃO NORTE - MANTIDOS ---
  { id: 'am-1', name: 'Universidade Federal do Amazonas (UFAM)', city: 'Manaus', state: 'AM', address: 'Av. Rodrigo Otávio, 6200 - Coroado', type: 'Federal', phone: '(92) 3305-1181', website: 'www.ufam.edu.br', courses: ['Medicina', 'Farmácia', 'Bioquímica'], createdAt: 1740000000004 },
  { id: 'am-6', name: 'Afya Itacoatiara', city: 'Itacoatiara', state: 'AM', address: 'Rua Acácio Leite, s/n - Santo Antônio', type: 'Privada', phone: '(92) 3878-3788', website: 'itacoatiara.afya.com.br', courses: ['Medicina'], createdAt: 1740000000009 },
  { id: 'pa-1', name: 'Universidade Federal do Pará (UFPA)', city: 'Belém', state: 'PA', address: 'Rua Augusto Corrêa, 1 - Guamá', type: 'Federal', phone: '(91) 3201-7000', website: 'www.ufpa.br', courses: ['Bioquímica', 'Biotecnologia'], createdAt: 1740000000011 }
];
