const Menu = [
  { is_header: true, title: "Sistema de Justiça Militar Angolano" },

  {
    path: "/dashboard",
    icon: "fa fa-gavel",
    title: "Dashboard",
    children: [
      { path: "/dashboard/visao", title: "Visão Geral" },
      { path: "/dashboard/estatisticas", title: "Estatísticas" },
      { path: "/dashboard/processos", title: "Processos Ativos" },
    ],
  },

  {
    path: "/unidades",
    icon: "fa fa-building",
    title: "Unidades Militares",
    children: [
      { path: "/unidades/lista", title: "Lista de Unidades" },
      { path: "/unidades/quartéis", title: "Quartéis Generais" },
      { path: "/unidades/regioes", title: "Regiões Militares" },
    ],
  },

  {
    path: "/pessoal",
    icon: "fa fa-users",
    title: "Pessoal Militar",
    children: [
      { path: "/pessoal/oficiais", title: "Oficiais" },
      { path: "/pessoal/pracas", title: "Praças" },
      { path: "/pessoal/magistrados", title: "Magistrados" },
      { path: "/pessoal/funcionarios", title: "Funcionários" },
      { path: "/pessoal/postos", title: "Postos e Graduações" },
    ],
  },

  {
    path: "/processos",
    icon: "fa fa-file-alt",
    title: "Processos",
    children: [
      { path: "/processos/lista", title: "Todos os Processos" },
      { path: "/processos/apf", title: "Autos de Prisão em Flagrante" },
      { path: "/processos/ipm", title: "Inquéritos Policiais Militares" },
      { path: "/processos/cd", title: "Conselhos de Disciplina" },
      { path: "/processos/crimes", title: "Processos Crimes" },
      { path: "/processos/naturezas", title: "Naturezas do Crime" },
    ],
  },

  {
    path: "/audiencias",
    icon: "fa fa-balance-scale",
    title: "Audiências",
    children: [
      { path: "/audiencias/agenda", title: "Agenda" },
      { path: "/audiencias/pauta", title: "Pauta" },
      { path: "/audiencias/salas", title: "Salas de Audiência" },
      { path: "/audiencias/atas", title: "Atas de Audiência" },
    ],
  },

  {
    path: "/documentos",
    icon: "fa fa-file-signature",
    title: "Documentos",
    children: [
      { path: "/documentos/decisoes", title: "Decisões" },
      { path: "/documentos/sentencas", title: "Sentenças" },
      { path: "/documentos/despachos", title: "Despachos" },
      { path: "/documentos/portarias", title: "Portarias" },
      { path: "/documentos/oficios", title: "Ofícios" },
    ],
  },

  {
    path: "/relatorios",
    icon: "fa fa-chart-line",
    title: "Relatórios",
    children: [
      { path: "/relatorios/processos", title: "Relatório de Processos" },
      { path: "/relatorios/estatisticas", title: "Estatísticas" },
      { path: "/relatorios/militares", title: "Militares Envolvidos" },
      { path: "/relatorios/audiencias", title: "Audiências" },
    ],
  },

  {
    path: "/configuracoes",
    icon: "fa fa-cog",
    title: "Configurações",
    children: [
      { path: "/configuracoes/sistema", title: "Sistema" },
      { path: "/configuracoes/usuarios", title: "Usuários" },
      { path: "/configuracoes/permissoes", title: "Permissões" },
      { path: "/configuracoes/backup", title: "Backup" },
    ],
  },
];

export default Menu;
