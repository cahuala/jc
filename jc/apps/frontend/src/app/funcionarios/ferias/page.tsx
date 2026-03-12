'use client';

import { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import FeriasTable from '@/components/funcionarios/FeriasTable';
import FeriasModal from '@/components/funcionarios/FeriasModal';

interface Ferias {
  id: string;
  funcionario: string;
  cargo: string;
  dataInicio: string;
  dataFim: string;
  diasSolicitados: number;
  diasDisponiveis: number;
  status: 'pendente' | 'aprovada' | 'rejeitada' | 'em_andamento' | 'concluida';
  observacoes?: string;
  aprovadoPor?: string;
  dataAprovacao?: string;
}

const feriasRegistros: Ferias[] = [
  {
    id: '1',
    funcionario: 'António Silva',
    cargo: 'Mecânico Sénior',
    dataInicio: '2024-03-15',
    dataFim: '2024-03-29',
    diasSolicitados: 15,
    diasDisponiveis: 22,
    status: 'aprovada',
    aprovadoPor: 'Carlos Mendes',
    dataAprovacao: '2024-02-10'
  },
  {
    id: '2',
    funcionario: 'Maria Santos',
    cargo: 'Recepcionista',
    dataInicio: '2024-04-01',
    dataFim: '2024-04-15',
    diasSolicitados: 15,
    diasDisponiveis: 30,
    status: 'pendente'
  },
  {
    id: '3',
    funcionario: 'Carlos Mendes',
    cargo: 'Supervisor',
    dataInicio: '2024-01-15',
    dataFim: '2024-02-05',
    diasSolicitados: 22,
    diasDisponiveis: 30,
    status: 'concluida',
    aprovadoPor: 'Administrador',
    dataAprovacao: '2024-01-05'
  },
  {
    id: '4',
    funcionario: 'Ana Costa',
    cargo: 'Contabilista',
    dataInicio: '2024-05-10',
    dataFim: '2024-05-24',
    diasSolicitados: 15,
    diasDisponiveis: 25,
    status: 'pendente'
  },
  {
    id: '5',
    funcionario: 'Pedro Oliveira',
    cargo: 'Mecânico',
    dataInicio: '2024-06-01',
    dataFim: '2024-06-10',
    diasSolicitados: 10,
    diasDisponiveis: 30,
    status: 'rejeitada',
    observacoes: 'Período de alta demanda'
  }
];

export default function FeriasPage() {
  const [ferias, setFerias] = useState<Ferias[]>(feriasRegistros);
  const [showModal, setShowModal] = useState(false);
  const [selectedFerias, setSelectedFerias] = useState<Ferias | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterMes, setFilterMes] = useState('');

  const totalSolicitacoes = ferias.length;
  const pendentes = ferias.filter(f => f.status === 'pendente').length;
  const aprovadas = ferias.filter(f => f.status === 'aprovada').length;
  const emAndamento = ferias.filter(f => {
    const hoje = new Date();
    const inicio = new Date(f.dataInicio);
    const fim = new Date(f.dataFim);
    return f.status === 'aprovada' && hoje >= inicio && hoje <= fim;
  }).length;

  const handleEdit = (feriasItem: Ferias) => {
    setSelectedFerias(feriasItem);
    setShowModal(true);
  };

  const handleSave = (feriasData: any) => {
    if (selectedFerias) {
      setFerias(prev => prev.map(f => 
        f.id === selectedFerias.id ? { ...f, ...feriasData } : f
      ));
    } else {
      const newFerias: Ferias = {
        id: Date.now().toString(),
        ...feriasData
      };
      setFerias(prev => [...prev, newFerias]);
    }
    setShowModal(false);
    setSelectedFerias(null);
  };

  const handleApprove = (id: string) => {
    setFerias(prev => prev.map(f => 
      f.id === id ? { 
        ...f, 
        status: 'aprovada',
        aprovadoPor: 'Administrador',
        dataAprovacao: new Date().toISOString().split('T')[0]
      } : f
    ));
  };

  const handleReject = (id: string) => {
    setFerias(prev => prev.map(f => 
      f.id === id ? { ...f, status: 'rejeitada' } : f
    ));
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Gestão de Férias</h2>
          <p className="text-muted mb-0">Controle de solicitações e períodos de férias</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setSelectedFerias(null);
            setShowModal(true);
          }}
        >
          <i className="fa fa-plus me-2"></i>
          Solicitar Férias
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Total Solicitações</h6>
                  <h3 className="mb-0">{totalSolicitacoes}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-calendar-alt fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Pendentes</h6>
                  <h3 className="mb-0">{pendentes}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-clock fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Aprovadas</h6>
                  <h3 className="mb-0">{aprovadas}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-check-circle fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Em Andamento</h6>
                  <h3 className="mb-0">{emAndamento}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-user-clock fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FeriasTable 
        ferias={ferias}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterMes={filterMes}
        setFilterMes={setFilterMes}
        onEdit={handleEdit}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {showModal && (
        <FeriasModal
          ferias={selectedFerias}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setSelectedFerias(null);
          }}
        />
      )}
    </div>
  );
}