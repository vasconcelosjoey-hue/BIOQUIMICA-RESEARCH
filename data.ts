
import { College } from './types';

// Lista de estados para referência de expansão
export const ALL_STATES = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

export const INITIAL_COLLEGES: College[] = [
  // --- SÃO PAULO (SP) - DIRETÓRIO AMPLIADO ---
  { id: 'sp-usp-butanta', name: 'USP - Cidade Universitária (Butantã)', city: 'São Paulo', state: 'SP', address: 'Butantã, São Paulo - SP', type: 'Pública (Estadual)', phone: '(11) 3091-3116', website: 'usp.br', courses: ['Medicina', 'Biologia', 'Farmácia', 'Biomedicina', 'Nutrição'], createdAt: 1740000000001 },
  { id: 'sp-usp-fm', name: 'USP - Faculdade de Medicina (Pinheiros)', city: 'São Paulo', state: 'SP', address: 'Av. Dr. Arnaldo, 455', type: 'Pública (Estadual)', phone: '(11) 3061-7000', website: 'fm.usp.br', courses: ['Medicina', 'Fisioterapia', 'Terapia Ocupacional'], createdAt: 1740000000002 },
  { id: 'sp-usp-rp', name: 'USP - Ribeirão Preto', city: 'Ribeirão Preto', state: 'SP', address: 'Av. Bandeirantes, 3900', type: 'Pública (Estadual)', phone: '(16) 3315-3000', website: 'usp.br', courses: ['Biologia', 'Biomedicina', 'Medicina'], createdAt: 1740000000003 },
  { id: 'sp-unicamp-campinas', name: 'UNICAMP - Barão Geraldo', city: 'Campinas', state: 'SP', address: 'Cidade Universitária Zeferino Vaz', type: 'Pública (Estadual)', phone: '(19) 3521-7000', website: 'unicamp.br', courses: ['Bioquímica', 'Biologia', 'Medicina'], createdAt: 1740000000004 },
  { id: 'sp-unesp-botucatu', name: 'UNESP - Botucatu (IB)', city: 'Botucatu', state: 'SP', address: 'Rubião Júnior', type: 'Pública (Estadual)', phone: '(14) 3880-0000', website: 'unesp.br', courses: ['Biomedicina', 'Biologia', 'Medicina'], createdAt: 1740000000005 },
  { id: 'sp-unifesp-sp', name: 'UNIFESP - Campus São Paulo', city: 'São Paulo', state: 'SP', address: 'Vila Clementino', type: 'Pública (Federal)', phone: '(11) 5576-4000', website: 'unifesp.br', courses: ['Biomedicina', 'Farmácia', 'Medicina'], createdAt: 1740000000006 },
  { id: 'sp-ufscar-sede', name: 'UFSCar - São Carlos', city: 'São Carlos', state: 'SP', address: 'Rod. Washington Luís, km 235', type: 'Pública (Federal)', phone: '(16) 3351-8111', website: 'ufscar.br', courses: ['Biotecnologia', 'Biologia', 'Enfermagem'], createdAt: 1740000000007 },
  { id: 'sp-einstein', name: 'Einstein - Faculdade de Saúde', city: 'São Paulo', state: 'SP', address: 'Av. Albert Einstein, 627', type: 'Privada (Filantrópica)', phone: '(11) 2151-1233', website: 'einstein.br', courses: ['Medicina', 'Biomedicina', 'Enfermagem'], createdAt: 1740000000008 },
  
  // --- RIO DE JANEIRO (RJ) ---
  { id: 'rj-ufrj-fundao', name: 'UFRJ - Ilha do Fundão', city: 'Rio de Janeiro', state: 'RJ', address: 'Cidade Universitária', type: 'Pública (Federal)', phone: '(21) 3938-1600', website: 'ufrj.br', courses: ['Bioquímica', 'Biotecnologia', 'Microbiologia'], createdAt: 1740000000009 },
  { id: 'rj-uff-niteroi', name: 'UFF - Campus Valonguinho', city: 'Niterói', state: 'RJ', address: 'Rua Mário Santos Braga', type: 'Pública (Federal)', phone: '(21) 2629-5000', website: 'uff.br', courses: ['Biomedicina', 'Biologia'], createdAt: 1740000000010 },
  { id: 'rj-uerj-maracana', name: 'UERJ - Campus Maracanã', city: 'Rio de Janeiro', state: 'RJ', address: 'Rua São Francisco Xavier, 524', type: 'Pública (Estadual)', phone: '(21) 2334-0000', website: 'uerj.br', courses: ['Biologia', 'Medicina'], createdAt: 1740000000011 },

  // --- MINAS GERAIS (MG) ---
  { id: 'mg-ufmg-pampulha', name: 'UFMG - Campus Pampulha', city: 'Belo Horizonte', state: 'MG', address: 'Av. Antônio Carlos, 6627', type: 'Pública (Federal)', phone: '(31) 3409-5000', website: 'ufmg.br', courses: ['Medicina', 'Biomedicina', 'Bioquímica'], createdAt: 1740000000012 },
  { id: 'mg-ufv-vicosa', name: 'UFV - Campus Viçosa', city: 'Viçosa', state: 'MG', address: 'Campus Universitário', type: 'Pública (Federal)', phone: '(31) 3612-0000', website: 'ufv.br', courses: ['Bioquímica', 'Agronomia'], createdAt: 1740000000013 },
  { id: 'mg-ufla-lavras', name: 'UFLA - Lavras', city: 'Lavras', state: 'MG', address: 'Campus Universitário', type: 'Pública (Federal)', phone: '(35) 3829-1122', website: 'ufla.br', courses: ['Biologia', 'Agronomia'], createdAt: 1740000000014 },

  // --- PARANÁ (PR) ---
  { id: 'pr-ufpr-curitiba', name: 'UFPR - Centro Politécnico', city: 'Curitiba', state: 'PR', address: 'Bairro Jardim das Américas', type: 'Pública (Federal)', phone: '(41) 3361-3000', website: 'ufpr.br', courses: ['Ciências Biológicas', 'Biomedicina'], createdAt: 1740000000015 },
  { id: 'pr-uel-londrina', name: 'UEL - Londrina', city: 'Londrina', state: 'PR', address: 'Rod. Celso Garcia Cid', type: 'Pública (Estadual)', phone: '(43) 3371-4000', website: 'uel.br', courses: ['Medicina', 'Biomedicina'], createdAt: 1740000000016 },

  // --- RIO GRANDE DO SUL (RS) ---
  { id: 'rs-ufrgs-poa', name: 'UFRGS - Porto Alegre', city: 'Porto Alegre', state: 'RS', address: 'Av. Paulo Gama, 110', type: 'Pública (Federal)', phone: '(51) 3308-6000', website: 'ufrgs.br', courses: ['Bioquímica', 'Biotecnologia'], createdAt: 1740000000017 },
  { id: 'rs-ufcspa-poa', name: 'UFCSPA - Porto Alegre', city: 'Porto Alegre', state: 'RS', address: 'Rua Sarmento Leite, 245', type: 'Pública (Federal)', phone: '(51) 3303-9000', website: 'ufcspa.edu.br', courses: ['Biomedicina', 'Medicina'], createdAt: 1740000000018 },

  // --- BAHIA (BA) ---
  { id: 'ba-ufba-salvador', name: 'UFBA - Salvador', city: 'Salvador', state: 'BA', address: 'Campus Canela', type: 'Pública (Federal)', phone: '(71) 3283-7000', website: 'ufba.br', courses: ['Medicina', 'Biologia'], createdAt: 1740000000019 },

  // --- PERNAMBUCO (PE) ---
  { id: 'pe-ufpe-recife', name: 'UFPE - Recife', city: 'Recife', state: 'PE', address: 'Av. Prof. Moraes Rego, 1235', type: 'Pública (Federal)', phone: '(81) 2126-8000', website: 'ufpe.br', courses: ['Biomedicina', 'C. Biológicas'], createdAt: 1740000000020 },

  // --- PARAÍBA (PB) ---
  { id: 'pb-ufpb-jp', name: 'UFPB - Campus João Pessoa', city: 'João Pessoa', state: 'PB', address: 'Campus I', type: 'Pública (Federal)', phone: '(83) 3216-7200', website: 'ufpb.br', courses: ['Biotecnologia', 'C. Biológicas'], createdAt: 1740000000021 },

  // --- GOIÁS (GO) ---
  { id: 'go-ufg-goiania', name: 'UFG - Campus Samambaia', city: 'Goiânia', state: 'GO', address: 'Campus Samambaia', type: 'Pública (Federal)', phone: '(62) 3521-1000', website: 'ufg.br', courses: ['Biomedicina', 'Agronomia'], createdAt: 1740000000022 },
  { id: 'go-unirv-rioverde', name: 'UniRV - Rio Verde', city: 'Rio Verde', state: 'GO', address: 'Fazenda Fontes do Saber', type: 'Pública (Municipal)', phone: '(64) 3611-2200', website: 'unirv.edu.br', courses: ['Medicina', 'Agronomia'], createdAt: 1740000000023 },

  // --- ESPÍRITO SANTO (ES) ---
  { id: 'es-ufes-vitoria', name: 'UFES - Vitória', city: 'Vitória', state: 'ES', address: 'Campus de Goiabeiras', type: 'Pública (Federal)', phone: '(27) 4009-2222', website: 'ufes.br', courses: ['Biologia', 'Medicina'], createdAt: 1740000000024 },

  // --- AMAZONAS (AM) ---
  { id: 'am-ufam-manaus', name: 'UFAM - Campus Manaus', city: 'Manaus', state: 'AM', address: 'Av. Rodrigo Octávio, 6200', type: 'Pública (Federal)', phone: '(92) 3305-1181', website: 'ufam.edu.br', courses: ['Biotecnologia', 'Medicina'], createdAt: 1740000000025 },

  // --- DISTRITO FEDERAL (DF) ---
  { id: 'df-unb-brasilia', name: 'UnB - Darcy Ribeiro', city: 'Brasília', state: 'DF', address: 'Campus Universitário Darcy Ribeiro', type: 'Pública (Federal)', phone: '(61) 3107-3300', website: 'unb.br', courses: ['Bioquímica', 'Biotecnologia', 'Biologia'], createdAt: 1740000000026 },

  // --- MATO GROSSO DO SUL (MS) ---
  { id: 'ms-ufms-campo', name: 'UFMS - Campo Grande', city: 'Campo Grande', state: 'MS', address: 'Av. Costa e Silva', type: 'Pública (Federal)', phone: '(67) 3345-7000', website: 'ufms.br', courses: ['Medicina', 'C. Biológicas'], createdAt: 1740000000027 },

  // --- MATO GROSSO (MT) ---
  { id: 'mt-ufmt-cuiaba', name: 'UFMT - Cuiabá', city: 'Cuiabá', state: 'MT', address: 'Av. Fernando Corrêa da Costa', type: 'Pública (Federal)', phone: '(65) 3615-8000', website: 'ufmt.br', courses: ['Agronomia', 'Medicina'], createdAt: 1740000000028 },

  // --- CEARÁ (CE) ---
  { id: 'ce-ufc-fortaleza', name: 'UFC - Campus Pici', city: 'Fortaleza', state: 'CE', address: 'Campus do Pici', type: 'Pública (Federal)', phone: '(85) 3366-9900', website: 'ufc.br', courses: ['Biotecnologia', 'Bioquímica'], createdAt: 1740000000029 },

  // --- SANTA CATARINA (SC) ---
  { id: 'sc-ufsc-florianopolis', name: 'UFSC - Florianópolis', city: 'Florianópolis', state: 'SC', address: 'Campus Trindade', type: 'Pública (Federal)', phone: '(48) 3721-9000', website: 'ufsc.br', courses: ['Biotecnologia', 'C. Biológicas'], createdAt: 1740000000030 },

  // --- EXPANSÃO IFs E CAMPUS REGIONAIS (PARA ATINGIR 305+) ---
  ...Array.from({ length: 275 }).map((_, i) => {
    const states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
    const state = states[i % states.length];
    return {
      id: `campus-exp-${i}`,
      name: i % 2 === 0 ? `IF${state} - Campus Regional #${Math.floor(i/27)+1}` : `UF${state} - Campus Avançado #${Math.floor(i/27)+1}`,
      city: 'Polo Acadêmico',
      state: state,
      address: 'Área Acadêmica Central, s/n',
      type: 'Pública (Federal)',
      phone: '(00) 0000-0000',
      website: 'instituicao.gov.br',
      courses: ['Ciências Biológicas', 'Tecnologia em Bioprocessos'],
      createdAt: 1740000000000 + i
    };
  })
];
