'use client';

import { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import FolhaPagamentoTable from '@/components/funcionarios/FolhaPagamentoTable';
import FolhaPagamentoModal from '@/components/funcionarios/FolhaPagamentoModal';

interface FolhaPagamento {
  id: string;
  funcionario: string;
  cargo: string;
  periodo: string;
  salarioBase: number;
  beneficios: number;
  descontos: number;
  salarioLiquido: number;
  status: 'processada' | 'pendente' | 'paga';
  dataPagamento?: string;
}

const folhasPagamento: FolhaPagamento[] = [
  {
    id: '1',
    funcionario: 'António Silva',
    cargo: 'Mecânico Sénior',
    periodo: '2024-01',
    salarioBase: 180000,
    beneficios: 25000,
    descontos: 5400,
    salarioLiquido: 199600,
    status: 'paga',
    dataPagamento: '2024-01-30'
  },
  {
    id: '2',
    funcionario: 'Maria Santos',
    cargo: 'Recepcionista',
    periodo: '2024-01',
    salarioBase: 120000,
    beneficios: 25000,
    descontos: 3600,
    salarioLiquido: 141400,
    status: 'paga',
    dataPagamento: '2024-01-30'
  },
  {
    id: '3',
    funcionario: 'Carlos Mendes',
    cargo: 'Supervisor',
    periodo: '2024-01',
    salarioBase: 220000,
    beneficios: 25000,
    descontos: 6600,
    salarioLiquido: 238400,
    status: 'paga',
    dataPagamento: '2024-01-30'
  },
  {
    id: '4',
    funcionario: 'Ana Costa',
    cargo: 'Contabilista',
    periodo: '2024-01',
    salarioBase: 200000,
    beneficios: 25000,
    descontos: 6000,
    salarioLiquido: 219000,
    status: 'paga',
    dataPagamento: '2024-01-30'
  },
  {
    id: '5',
    funcionario: 'Pedro Oliveira',
    cargo: 'Mecânico',
    periodo: '2024-01',
    salarioBase: 150000,
    beneficios: 25000,
    descontos: 4500,
    salarioLiquido: 170500,
    status: 'paga',
    dataPagamento: '2024-01-30'
  },
  {
    id: '6',
    funcionario: 'António Silva',
    cargo: 'Mecânico Sénior',
    periodo: '2024-02',
    salarioBase: 180000,
    beneficios: 25000,
    descontos: 5400,
    salarioLiquido: 199600,
    status: 'processada'
  },
  {
    id: '7',
    funcionario: 'Maria Santos',
    cargo: 'Recepcionista',
    periodo: '2024-02',
    salarioBase: 120000,
    beneficios: 25000,
    descontos: 3600,
    salarioLiquido: 141400,
    status: 'processada'
  },
  {
    id: '8',
    funcionario: 'Carlos Mendes',
    cargo: 'Supervisor',
    periodo: '2024-02',
    salarioBase: 220000,
    beneficios: 25000,
    descontos: 6600,
    salarioLiquido: 238400,
    status: 'pendente'
  },
  {
    id: '9',
    funcionario: 'Ana Costa',
    cargo: 'Contabilista',
    periodo: '2024-02',
    salarioBase: 200000,
    beneficios: 25000,
    descontos: 6000,
    salarioLiquido: 219000,
    status: 'pendente'
  },
  {
    id: '10',
    funcionario: 'Pedro Oliveira',
    cargo: 'Mecânico',
    periodo: '2024-02',
    salarioBase: 150000,
    beneficios: 25000,
    descontos: 4500,
    salarioLiquido: 170500,
    status: 'pendente'
  }
];

export default function FolhaPagamentoPage() {
  const [folhas, setFolhas] = useState<FolhaPagamento[]>(folhasPagamento);
  const [showModal, setShowModal] = useState(false);
  const [selectedFolha, setSelectedFolha] = useState<FolhaPagamento | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriodo, setFilterPeriodo] = useState('todos');
  const [filterStatus, setFilterStatus] = useState('todos');

  const totalFolhas = folhas.length;
  const folhasProcessadas = folhas.filter(f => f.status === 'processada').length;
  const folhasPagas = folhas.filter(f => f.status === 'paga').length;
  const totalSalarios = folhas.reduce((sum, f) => sum + f.salarioLiquido, 0);

  const handleEdit = (folha: FolhaPagamento) => {
    setSelectedFolha(folha);
    setShowModal(true);
  };

  const handleSave = (folhaData: any) => {
    if (selectedFolha) {
      setFolhas(prev => prev.map(f => 
        f.id === selectedFolha.id ? { ...f, ...folhaData } : f
      ));
    } else {
      const newFolha: FolhaPagamento = {
        id: Date.now().toString(),
        ...folhaData
      };
      setFolhas(prev => [...prev, newFolha]);
    }
    setShowModal(false);
    setSelectedFolha(null);
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Folha de Pagamento</h2>
          <p className="text-muted mb-0">Gestão de salários e pagamentos dos funcionários</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setSelectedFolha(null);
            setShowModal(true);
          }}
        >
          <i className="fa fa-plus me-2"></i>
          Processar Folha
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Total de Folhas</h6>
                  <h3 className="mb-0">{totalFolhas}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-file-invoice fa-2x opacity-75"></i>
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
                  <h6 className="card-title">Processadas</h6>
                  <h3 className="mb-0">{folhasProcessadas}</h3>
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
                  <h6 className="card-title">Pagas</h6>
                  <h3 className="mb-0">{folhasPagas}</h3>
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
                  <h6 className="card-title">Total Salários</h6>
                  <h3 className="mb-0">Kz {totalSalarios.toLocaleString()}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-money-bill fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FolhaPagamentoTable 
        folhas={folhas}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterPeriodo={filterPeriodo}
        setFilterPeriodo={setFilterPeriodo}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onEdit={handleEdit}
      />

      {showModal && (
        <FolhaPagamentoModal
          folha={selectedFolha}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setSelectedFolha(null);
          }}
        />
      )}
    </div>
  );
}