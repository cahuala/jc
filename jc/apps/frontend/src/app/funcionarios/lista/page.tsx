'use client';

import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import FuncionariosTable from '@/components/funcionarios/FuncionariosTable';
import FuncionarioModal from '@/components/funcionarios/FuncionarioModal';
import FuncionarioDetailsModal from '@/components/funcionarios/FuncionarioDetailsModal';
import FuncionarioHistoryModal from '@/components/funcionarios/FuncionarioHistoryModal';

interface Funcionario {
  id: number;
  nome: string;
  nif: string;
  telefone: string;
  email: string;
  cargo: string;
  departamento: string;
  salario: number;
  dataAdmissao: string;
  status: 'ativo' | 'inativo' | 'ferias';
  foto?: string;
}

const funcionariosExemplo: Funcionario[] = [
  {
    id: 1,
    nome: 'António Silva',
    nif: '123456789',
    telefone: '+244 923 456 789',
    email: 'antonio.silva@flxmotor.ao',
    cargo: 'Mecânico Sénior',
    departamento: 'Oficina',
    salario: 180000,
    dataAdmissao: '2022-03-15',
    status: 'ativo'
  },
  {
    id: 2,
    nome: 'Maria Santos',
    nif: '987654321',
    telefone: '+244 924 567 890',
    email: 'maria.santos@flxmotor.ao',
    cargo: 'Recepcionista',
    departamento: 'Atendimento',
    salario: 120000,
    dataAdmissao: '2023-01-10',
    status: 'ativo'
  },
  {
    id: 3,
    nome: 'Carlos Mendes',
    nif: '456789123',
    telefone: '+244 925 678 901',
    email: 'carlos.mendes@flxmotor.ao',
    cargo: 'Supervisor',
    departamento: 'Oficina',
    salario: 220000,
    dataAdmissao: '2021-08-20',
    status: 'ferias'
  },
  {
    id: 4,
    nome: 'Ana Costa',
    nif: '789123456',
    telefone: '+244 926 789 012',
    email: 'ana.costa@flxmotor.ao',
    cargo: 'Contabilista',
    departamento: 'Financeiro',
    salario: 200000,
    dataAdmissao: '2022-11-05',
    status: 'ativo'
  },
  {
    id: 5,
    nome: 'Pedro Oliveira',
    nif: '321654987',
    telefone: '+244 927 890 123',
    email: 'pedro.oliveira@flxmotor.ao',
    cargo: 'Mecânico',
    departamento: 'Oficina',
    salario: 150000,
    dataAdmissao: '2023-06-12',
    status: 'inativo'
  }
];

export default function FuncionariosListaPage() {
  const [funcionarios] = useState<Funcionario[]>(funcionariosExemplo);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterDepartamento, setFilterDepartamento] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [editingFuncionario, setEditingFuncionario] = useState<Funcionario | null>(null);
  const [viewingFuncionario, setViewingFuncionario] = useState<Funcionario | null>(null);
  const [historyFuncionario, setHistoryFuncionario] = useState<Funcionario | null>(null);

  const handleEdit = (funcionario: Funcionario) => {
    setEditingFuncionario(funcionario);
    setShowModal(true);
  };

  const handleView = (funcionario: Funcionario) => {
    setViewingFuncionario(funcionario);
    setShowDetailsModal(true);
  };

  const handleHistory = (funcionario: Funcionario) => {
    setHistoryFuncionario(funcionario);
    setShowHistoryModal(true);
  };

  const handleSave = (funcionario: Funcionario) => {
    console.log('Salvando funcionário:', funcionario);
    setShowModal(false);
    setEditingFuncionario(null);
  };

  const handleDeleteFuncionario = (funcionario: Funcionario) => {
    alert(`Funcionário "${funcionario.nome}" foi excluído com sucesso!`);
    // Aqui implementaria a lógica real de exclusão
  };

  // Métricas do dashboard
  const totalFuncionarios = funcionarios.length;
  const funcionariosAtivos = funcionarios.filter(f => f.status === 'ativo').length;
  const funcionariosFerias = funcionarios.filter(f => f.status === 'ferias').length;
  const folhaPagamento = funcionarios.filter(f => f.status === 'ativo').reduce((acc, f) => acc + f.salario, 0);

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item">Funcionários</li>
            <li className="breadcrumb-item active">Lista de Funcionários</li>
          </ol>
          <h1 className="page-header mb-0">Lista de Funcionários</h1>
        </div>
        <div className="ms-auto">
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <i className="fa fa-plus me-2"></i>
            Novo Funcionário
          </button>
        </div>
      </div>

      {/* Dashboard de Métricas */}
      <div className="row mb-3">
        <div className="col-xl-3 col-md-6">
          <Panel className="bg-primary text-white">
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">{totalFuncionarios}</div>
                  <div>Total de Funcionários</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-users fa-2x"></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
        <div className="col-xl-3 col-md-6">
          <Panel className="bg-success text-white">
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">{funcionariosAtivos}</div>
                  <div>Funcionários Ativos</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-user-check fa-2x"></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
        <div className="col-xl-3 col-md-6">
          <Panel className="bg-warning text-white">
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">{funcionariosFerias}</div>
                  <div>Em Férias</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-calendar-alt fa-2x"></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
        <div className="col-xl-3 col-md-6">
          <Panel className="bg-info text-white">
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">Kz {folhaPagamento.toFixed(2)}</div>
                  <div>Folha de Pagamento</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-money-bill-wave fa-2x"></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      {/* Filtros */}
      <Panel className="mb-3">
        <PanelHeader>
          <span>Filtros</span>
        </PanelHeader>
        <PanelBody>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label fw-bold">Status</label>
              <select 
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="todos">Todos os Status</option>
                <option value="ativo">Ativos</option>
                <option value="inativo">Inativos</option>
                <option value="ferias">Em Férias</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">Departamento</label>
              <select 
                className="form-select"
                value={filterDepartamento}
                onChange={(e) => setFilterDepartamento(e.target.value)}
              >
                <option value="todos">Todos os Departamentos</option>
                <option value="Oficina">Oficina</option>
                <option value="Atendimento">Atendimento</option>
                <option value="Financeiro">Financeiro</option>
                <option value="Administração">Administração</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Buscar</label>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nome, cargo, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button className="btn btn-outline-primary w-100">
                <i className="fa fa-download me-2"></i>
                Exportar Lista
              </button>
            </div>
          </div>
        </PanelBody>
      </Panel>

      {/* Tabela de Funcionários */}
      <FuncionariosTable
        funcionarios={funcionarios}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterDepartamento={filterDepartamento}
        setFilterDepartamento={setFilterDepartamento}
        onEdit={handleEdit}
        onDelete={handleDeleteFuncionario}
        onView={handleView}
        onHistory={handleHistory}
      />

      {/* Modal */}
      {showModal && (
        <FuncionarioModal
          funcionario={editingFuncionario}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingFuncionario(null);
          }}
        />
      )}

      {showDetailsModal && viewingFuncionario && (
        <FuncionarioDetailsModal
          funcionario={viewingFuncionario}
          onClose={() => {
            setShowDetailsModal(false);
            setViewingFuncionario(null);
          }}
        />
      )}

      {showHistoryModal && historyFuncionario && (
        <FuncionarioHistoryModal
          funcionario={historyFuncionario}
          onClose={() => {
            setShowHistoryModal(false);
            setHistoryFuncionario(null);
          }}
        />
      )}
    </div>
  );
}