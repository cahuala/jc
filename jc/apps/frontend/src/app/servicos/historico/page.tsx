'use client';

import { useState } from 'react';
import ServicoHistoricoStats from '@/components/servicos/ServicoHistoricoStats';
import ServicoHistoricoTable from '@/components/servicos/ServicoHistoricoTable';
import ServicoHistoricoCharts from '@/components/servicos/ServicoHistoricoCharts';

export default function ServicoHistoricoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterPeriodo, setFilterPeriodo] = useState('todos');
  const [filterMecanico, setFilterMecanico] = useState('');

  const servicosHistorico = [
    {
      id: 1,
      ordemServico: 'OS-2024-001',
      cliente: 'João Silva',
      veiculo: 'Honda Civic 2020',
      placa: 'ABC-1234',
      tipoServico: 'Manutenção Preventiva',
      servicos: ['Troca de óleo', 'Filtro de ar', 'Revisão geral'],
      mecanico: 'Carlos Santos',
      dataInicio: '2024-01-20T08:00:00',
      dataFim: '2024-01-20T12:30:00',
      tempoServico: 270,
      valor: 450.00,
      status: 'concluido',
      satisfacao: 5,
      observacoes: 'Cliente muito satisfeito com o atendimento',
      pecasUsadas: [
        { nome: 'Óleo 5W30', quantidade: 4, valor: 120.00 },
        { nome: 'Filtro de ar', quantidade: 1, valor: 45.00 }
      ],
      custoTotal: 165.00,
      lucro: 285.00
    },
    {
      id: 2,
      ordemServico: 'OS-2024-002',
      cliente: 'Maria Costa',
      veiculo: 'Toyota Corolla 2019',
      placa: 'XYZ-5678',
      tipoServico: 'Ar Condicionado',
      servicos: ['Recarga de gás', 'Limpeza do sistema'],
      mecanico: 'Pedro Lima',
      dataInicio: '2024-01-19T14:00:00',
      dataFim: '2024-01-19T15:30:00',
      tempoServico: 90,
      valor: 180.00,
      status: 'concluido',
      satisfacao: 4,
      observacoes: 'Serviço executado conforme solicitado',
      pecasUsadas: [
        { nome: 'Gás R134a', quantidade: 1, valor: 80.00 }
      ],
      custoTotal: 80.00,
      lucro: 100.00
    },
    {
      id: 3,
      ordemServico: 'OS-2024-003',
      cliente: 'Roberto Alves',
      veiculo: 'Ford Focus 2018',
      placa: 'DEF-9012',
      tipoServico: 'Freios',
      servicos: ['Troca de pastilhas', 'Disco de freio'],
      mecanico: 'João Ferreira',
      dataInicio: '2024-01-18T09:00:00',
      dataFim: '2024-01-18T16:00:00',
      tempoServico: 420,
      valor: 680.00,
      status: 'concluido',
      satisfacao: 5,
      observacoes: 'Problema resolvido completamente',
      pecasUsadas: [
        { nome: 'Pastilhas de freio', quantidade: 1, valor: 180.00 },
        { nome: 'Disco de freio', quantidade: 2, valor: 320.00 }
      ],
      custoTotal: 500.00,
      lucro: 180.00
    },
    {
      id: 4,
      ordemServico: 'OS-2024-004',
      cliente: 'Ana Santos',
      veiculo: 'Volkswagen Golf 2021',
      placa: 'GHI-3456',
      tipoServico: 'Motor',
      servicos: ['Troca de correia dentada', 'Tensor'],
      mecanico: 'Carlos Santos',
      dataInicio: '2024-01-17T08:30:00',
      dataFim: '2024-01-17T17:00:00',
      tempoServico: 510,
      valor: 850.00,
      status: 'concluido',
      satisfacao: 4,
      observacoes: 'Serviço complexo executado com sucesso',
      pecasUsadas: [
        { nome: 'Correia dentada', quantidade: 1, valor: 280.00 },
        { nome: 'Tensor', quantidade: 1, valor: 150.00 }
      ],
      custoTotal: 430.00,
      lucro: 420.00
    },
    {
      id: 5,
      ordemServico: 'OS-2024-005',
      cliente: 'Pedro Oliveira',
      veiculo: 'Chevrolet Onix 2022',
      placa: 'JKL-7890',
      tipoServico: 'Suspensão',
      servicos: ['Amortecedor dianteiro', 'Alinhamento'],
      mecanico: 'Pedro Lima',
      dataInicio: '2024-01-16T13:00:00',
      dataFim: '2024-01-16T18:30:00',
      tempoServico: 330,
      valor: 520.00,
      status: 'concluido',
      satisfacao: 5,
      observacoes: 'Cliente recomendou a oficina',
      pecasUsadas: [
        { nome: 'Amortecedor', quantidade: 2, valor: 360.00 }
      ],
      custoTotal: 360.00,
      lucro: 160.00
    },
    {
      id: 6,
      ordemServico: 'OS-2024-006',
      cliente: 'Fernanda Silva',
      veiculo: 'Hyundai HB20 2021',
      placa: 'MNO-2468',
      tipoServico: 'Elétrica',
      servicos: ['Troca de bateria', 'Teste do alternador'],
      mecanico: 'João Ferreira',
      dataInicio: '2024-01-15T10:00:00',
      dataFim: '2024-01-15T12:00:00',
      tempoServico: 120,
      valor: 320.00,
      status: 'concluido',
      satisfacao: 4,
      observacoes: 'Bateria substituída com garantia',
      pecasUsadas: [
        { nome: 'Bateria 60Ah', quantidade: 1, valor: 250.00 }
      ],
      custoTotal: 250.00,
      lucro: 70.00
    },
    {
      id: 7,
      ordemServico: 'OS-2024-007',
      cliente: 'Carlos Mendes',
      veiculo: 'Nissan Sentra 2020',
      placa: 'PQR-1357',
      tipoServico: 'Manutenção Preventiva',
      servicos: ['Revisão dos 20.000km', 'Troca de filtros'],
      mecanico: 'Carlos Santos',
      dataInicio: '2024-01-14T08:00:00',
      dataFim: '2024-01-14T16:00:00',
      tempoServico: 480,
      valor: 580.00,
      status: 'concluido',
      satisfacao: 5,
      observacoes: 'Revisão completa realizada',
      pecasUsadas: [
        { nome: 'Filtro de óleo', quantidade: 1, valor: 35.00 },
        { nome: 'Filtro de ar', quantidade: 1, valor: 45.00 },
        { nome: 'Óleo sintético', quantidade: 4, valor: 160.00 }
      ],
      custoTotal: 240.00,
      lucro: 340.00
    },
    {
      id: 8,
      ordemServico: 'OS-2024-008',
      cliente: 'Lucia Rocha',
      veiculo: 'Fiat Argo 2022',
      placa: 'STU-9876',
      tipoServico: 'Ar Condicionado',
      servicos: ['Higienização', 'Troca do filtro'],
      mecanico: 'Pedro Lima',
      dataInicio: '2024-01-13T14:30:00',
      dataFim: '2024-01-13T16:00:00',
      tempoServico: 90,
      valor: 150.00,
      status: 'concluido',
      satisfacao: 4,
      observacoes: 'Ar condicionado funcionando perfeitamente',
      pecasUsadas: [
        { nome: 'Filtro do ar condicionado', quantidade: 1, valor: 40.00 }
      ],
      custoTotal: 40.00,
      lucro: 110.00
    }
  ];

  const filteredServicos = servicosHistorico.filter(servico => {
    const matchesSearch = servico.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         servico.veiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         servico.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         servico.ordemServico.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'todos' || servico.status === filterStatus;
    const matchesMecanico = filterMecanico === '' || servico.mecanico === filterMecanico;
    
    // Filtro por período - corrigido
    if (filterPeriodo === 'todos') {
      return matchesSearch && matchesStatus && matchesMecanico;
    }
    
    const dataServico = new Date(servico.dataInicio);
    const hoje = new Date();
    const diasAtras = parseInt(filterPeriodo);
    const dataLimite = new Date(hoje.getTime() - (diasAtras * 24 * 60 * 60 * 1000));
    const matchesPeriodo = dataServico >= dataLimite;
    
    return matchesSearch && matchesStatus && matchesMecanico && matchesPeriodo;
  });

  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
            <li className="breadcrumb-item"><a href="/servicos">Serviços</a></li>
            <li className="breadcrumb-item active">Histórico</li>
          </ol>
          <h1 className="page-header mb-0">Histórico de Serviços</h1>
          <p className="text-muted">Análise completa dos serviços realizados</p>
        </div>
      </div>

      <ServicoHistoricoStats servicos={filteredServicos} />

      <ServicoHistoricoCharts servicos={filteredServicos} />

      <ServicoHistoricoTable 
        servicos={filteredServicos}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterPeriodo={filterPeriodo}
        setFilterPeriodo={setFilterPeriodo}
        filterMecanico={filterMecanico}
        setFilterMecanico={setFilterMecanico}
      />
    </>
  );
}