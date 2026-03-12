'use client';

import { useState } from 'react';
import Link from 'next/link';
import OrdemServicoTable from '@/components/servicos/OrdemServicoTable';
import OrdemServicoModal from '@/components/servicos/OrdemServicoModal';
import OrdemServicoStats from '@/components/servicos/OrdemServicoStats';
import ExportButtons from '@/components/ui/ExportButtons';

export default function OrdensServicoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [modalAberto, setModalAberto] = useState(false);
  const [ordemSelecionada, setOrdemSelecionada] = useState(null);

  const ordensServico = [
    {
      id: 1,
      numero: 'OS-2024-001',
      cliente: 'João Silva',
      veiculo: 'Honda Civic 2020',
      placa: 'ABC-1234',
      dataAbertura: '2024-01-20T08:00:00',
      dataPrevisao: '2024-01-20T17:00:00',
      status: 'em_andamento',
      prioridade: 'alta',
      mecanico: 'Carlos Santos',
      servicos: [
        { nome: 'Troca de óleo', preco: 150.00, status: 'concluido' },
        { nome: 'Filtro de ar', preco: 80.00, status: 'em_andamento' }
      ],
      pecas: [
        { nome: 'Óleo 5W30', quantidade: 4, preco: 120.00 },
        { nome: 'Filtro de ar', quantidade: 1, preco: 45.00 }
      ],
      valorTotal: 395.00,
      observacoes: 'Cliente solicitou revisão completa'
    },
    {
      id: 2,
      numero: 'OS-2024-002',
      cliente: 'Maria Costa',
      veiculo: 'Toyota Corolla 2019',
      placa: 'XYZ-5678',
      dataAbertura: '2024-01-19T09:30:00',
      dataPrevisao: '2024-01-19T16:00:00',
      status: 'concluido',
      prioridade: 'media',
      mecanico: 'Pedro Lima',
      servicos: [
        { nome: 'Recarga de gás', preco: 120.00, status: 'concluido' },
        { nome: 'Limpeza do sistema', preco: 60.00, status: 'concluido' }
      ],
      pecas: [
        { nome: 'Gás R134a', quantidade: 1, preco: 80.00 }
      ],
      valorTotal: 260.00,
      observacoes: 'Ar condicionado não gelava'
    },
    {
      id: 3,
      numero: 'OS-2024-003',
      cliente: 'Roberto Alves',
      veiculo: 'Ford Focus 2018',
      placa: 'DEF-9012',
      dataAbertura: '2024-01-21T10:00:00',
      dataPrevisao: '2024-01-22T18:00:00',
      status: 'aguardando',
      prioridade: 'baixa',
      mecanico: null,
      servicos: [
        { nome: 'Diagnóstico elétrico', preco: 80.00, status: 'pendente' }
      ],
      pecas: [],
      valorTotal: 80.00,
      observacoes: 'Luz do painel acesa'
    },
    {
      id: 4,
      numero: 'OS-2024-004',
      cliente: 'Ana Santos',
      veiculo: 'Volkswagen Golf 2021',
      placa: 'GHI-3456',
      dataAbertura: '2024-01-18T14:00:00',
      dataPrevisao: '2024-01-19T12:00:00',
      status: 'em_andamento',
      prioridade: 'alta',
      mecanico: 'João Ferreira',
      servicos: [
        { nome: 'Troca de pastilhas', preco: 200.00, status: 'em_andamento' },
        { nome: 'Disco de freio', preco: 350.00, status: 'pendente' }
      ],
      pecas: [
        { nome: 'Pastilhas de freio', quantidade: 1, preco: 180.00 },
        { nome: 'Disco de freio', quantidade: 2, preco: 320.00 }
      ],
      valorTotal: 1050.00,
      observacoes: 'Freio fazendo ruído'
    },
    {
      id: 5,
      numero: 'OS-2024-005',
      cliente: 'Pedro Oliveira',
      veiculo: 'Chevrolet Onix 2022',
      placa: 'JKL-7890',
      dataAbertura: '2024-01-17T11:00:00',
      dataPrevisao: '2024-01-17T15:00:00',
      status: 'cancelado',
      prioridade: 'media',
      mecanico: 'Carlos Santos',
      servicos: [
        { nome: 'Alinhamento', preco: 80.00, status: 'cancelado' }
      ],
      pecas: [],
      valorTotal: 80.00,
      observacoes: 'Cliente cancelou o serviço'
    }
  ];

  const abrirModal = (ordem = null) => {
    setOrdemSelecionada(ordem);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setOrdemSelecionada(null);
  };

  const handleDeleteOrdem = (ordem: any) => {
    alert(`Ordem de Serviço "${ordem.numero}" foi excluída com sucesso!`);
    // Aqui implementaria a lógica real de exclusão
  };

  return (
    <>
      <ol className="breadcrumb float-xl-end">
        <li className="breadcrumb-item"><Link href="/dashboard/v1">Home</Link></li>
        <li className="breadcrumb-item">Serviços</li>
        <li className="breadcrumb-item active">Ordens de Serviço</li>
      </ol>
      <h1 className="page-header">Ordens de Serviço <small>gestão completa dos serviços</small></h1>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-2">
          <ExportButtons 
            data={ordensServico} 
            filename="ordens-servico"
            onExportPDF={() => alert('Exportando ordens para PDF...')}
            onExportExcel={() => alert('Exportando ordens para Excel...')}
            onPrint={() => window.print()}
          />
        </div>
        <button 
          className="btn btn-success"
          onClick={() => abrirModal()}
        >
          <i className="fa fa-plus me-2"></i>
          Nova Ordem de Serviço
        </button>
      </div>

      <OrdemServicoStats ordens={ordensServico} />

      <OrdemServicoTable 
        ordens={ordensServico}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onEdit={abrirModal}
        onDelete={handleDeleteOrdem}
      />

      {modalAberto && (
        <OrdemServicoModal 
          ordem={ordemSelecionada}
          isOpen={modalAberto}
          onClose={fecharModal}
        />
      )}
    </>
  );
}