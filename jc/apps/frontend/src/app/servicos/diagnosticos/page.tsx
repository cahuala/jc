'use client';

import { useState } from 'react';
import DiagnosticoTable from '@/components/servicos/DiagnosticoTable';
import DiagnosticoModal from '@/components/servicos/DiagnosticoModal';
import DiagnosticoStats from '@/components/servicos/DiagnosticoStats';

export default function DiagnosticosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [modalAberto, setModalAberto] = useState(false);
  const [diagnosticoSelecionado, setDiagnosticoSelecionado] = useState(null);

  const diagnosticos = [
    {
      id: 1,
      cliente: 'João Silva',
      veiculo: 'Honda Civic 2020',
      placa: 'ABC-1234',
      dataEntrada: '2024-01-15',
      status: 'em_andamento',
      prioridade: 'alta',
      sintomas: ['Ruído no motor', 'Vibração no volante'],
      problemas: [
        { sistema: 'Motor', descricao: 'Correia dentada com folga', severidade: 'alta' },
        { sistema: 'Suspensão', descricao: 'Amortecedor dianteiro vazando', severidade: 'media' }
      ],
      mecanico: 'Carlos Santos',
      tempoEstimado: 180,
      custoEstimado: 850.00
    },
    {
      id: 2,
      cliente: 'Maria Costa',
      veiculo: 'Toyota Corolla 2019',
      placa: 'XYZ-5678',
      dataEntrada: '2024-01-14',
      status: 'concluido',
      prioridade: 'media',
      sintomas: ['Ar condicionado não gela'],
      problemas: [
        { sistema: 'Ar Condicionado', descricao: 'Gás refrigerante baixo', severidade: 'baixa' }
      ],
      mecanico: 'Pedro Lima',
      tempoEstimado: 60,
      custoEstimado: 120.00
    },
    {
      id: 3,
      cliente: 'Roberto Alves',
      veiculo: 'Ford Focus 2018',
      placa: 'DEF-9012',
      dataEntrada: '2024-01-16',
      status: 'aguardando',
      prioridade: 'baixa',
      sintomas: ['Luz do painel acesa'],
      problemas: [],
      mecanico: null,
      tempoEstimado: 0,
      custoEstimado: 0
    }
  ];

  const abrirModal = (diagnostico = null) => {
    setDiagnosticoSelecionado(diagnostico);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setDiagnosticoSelecionado(null);
  };

  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
            <li className="breadcrumb-item"><a href="/servicos">Serviços</a></li>
            <li className="breadcrumb-item active">Diagnósticos</li>
          </ol>
          <h1 className="page-header mb-0">Diagnósticos Veiculares</h1>
        </div>
        <div className="ms-auto">
          <button 
            className="btn btn-primary"
            onClick={() => abrirModal()}
          >
            <i className="fa fa-plus me-2"></i>
            Novo Diagnóstico
          </button>
        </div>
      </div>

      <DiagnosticoStats diagnosticos={diagnosticos} />

      <DiagnosticoTable 
        diagnosticos={diagnosticos}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onEdit={abrirModal}
      />

      {modalAberto && (
        <DiagnosticoModal 
          diagnostico={diagnosticoSelecionado}
          isOpen={modalAberto}
          onClose={fecharModal}
        />
      )}
    </>
  );
}