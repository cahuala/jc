'use client';

import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import CargosTable from '@/components/funcionarios/CargosTable';
import CargoModal from '@/components/funcionarios/CargoModal';
import CargoDetailsModal from '@/components/funcionarios/CargoDetailsModal';
import CargoFuncionariosModal from '@/components/funcionarios/CargoFuncionariosModal';

interface Cargo {
  id: number;
  nome: string;
  departamento: string;
  nivel: 'junior' | 'pleno' | 'senior' | 'gerencial';
  salarioMinimo: number;
  salarioMaximo: number;
  descricao: string;
  requisitos: string[];
  funcionariosAtivos: number;
  status: 'ativo' | 'inativo';
}

const cargosExemplo: Cargo[] = [
  {
    id: 1,
    nome: 'Mecânico Sénior',
    departamento: 'Oficina',
    nivel: 'senior',
    salarioMinimo: 180000,
    salarioMaximo: 250000,
    descricao: 'Responsável por diagnósticos complexos e supervisão de mecânicos juniores',
    requisitos: ['Experiência mínima 5 anos', 'Certificação técnica', 'Liderança de equipe'],
    funcionariosAtivos: 2,
    status: 'ativo'
  },
  {
    id: 2,
    nome: 'Mecânico',
    departamento: 'Oficina',
    nivel: 'pleno',
    salarioMinimo: 120000,
    salarioMaximo: 180000,
    descricao: 'Execução de reparos e manutenções preventivas em veículos',
    requisitos: ['Experiência mínima 2 anos', 'Curso técnico em mecânica'],
    funcionariosAtivos: 3,
    status: 'ativo'
  },
  {
    id: 3,
    nome: 'Supervisor',
    departamento: 'Oficina',
    nivel: 'gerencial',
    salarioMinimo: 220000,
    salarioMaximo: 300000,
    descricao: 'Supervisão geral da oficina e coordenação de equipes',
    requisitos: ['Experiência mínima 7 anos', 'Gestão de equipes', 'Conhecimento administrativo'],
    funcionariosAtivos: 1,
    status: 'ativo'
  },
  {
    id: 4,
    nome: 'Recepcionista',
    departamento: 'Atendimento',
    nivel: 'junior',
    salarioMinimo: 100000,
    salarioMaximo: 140000,
    descricao: 'Atendimento ao cliente e gestão de agendamentos',
    requisitos: ['Ensino médio completo', 'Boa comunicação', 'Conhecimentos básicos de informática'],
    funcionariosAtivos: 2,
    status: 'ativo'
  },
  {
    id: 5,
    nome: 'Contabilista',
    departamento: 'Financeiro',
    nivel: 'pleno',
    salarioMinimo: 180000,
    salarioMaximo: 240000,
    descricao: 'Gestão financeira e contabilidade da empresa',
    requisitos: ['Formação em Contabilidade', 'Experiência mínima 3 anos', 'Conhecimento em sistemas ERP'],
    funcionariosAtivos: 1,
    status: 'ativo'
  }
];

export default function FuncionariosCargosPage() {
  const [cargos] = useState<Cargo[]>(cargosExemplo);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartamento, setFilterDepartamento] = useState('todos');
  const [filterNivel, setFilterNivel] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFuncionariosModal, setShowFuncionariosModal] = useState(false);
  const [editingCargo, setEditingCargo] = useState<Cargo | null>(null);
  const [viewingCargo, setViewingCargo] = useState<Cargo | null>(null);
  const [funcionariosCargo, setFuncionariosCargo] = useState<Cargo | null>(null);

  const handleEdit = (cargo: Cargo) => {
    setEditingCargo(cargo);
    setShowModal(true);
  };

  const handleView = (cargo: Cargo) => {
    setViewingCargo(cargo);
    setShowDetailsModal(true);
  };

  const handleFuncionarios = (cargo: Cargo) => {
    setFuncionariosCargo(cargo);
    setShowFuncionariosModal(true);
  };

  const handleSave = (cargo: Cargo) => {
    console.log('Salvando cargo:', cargo);
    setShowModal(false);
    setEditingCargo(null);
  };

  // Métricas do dashboard
  const totalCargos = cargos.length;
  const cargosAtivos = cargos.filter(c => c.status === 'ativo').length;
  const totalFuncionarios = cargos.reduce((acc, c) => acc + c.funcionariosAtivos, 0);
  const mediaSalarial = cargos.reduce((acc, c) => acc + ((c.salarioMinimo + c.salarioMaximo) / 2), 0) / cargos.length;

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item">Funcionários</li>
            <li className="breadcrumb-item active">Cargos</li>
          </ol>
          <h1 className="page-header mb-0">Gestão de Cargos</h1>
        </div>
        <div className="ms-auto">
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <i className="fa fa-plus me-2"></i>
            Novo Cargo
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
                  <div className="h4 mb-0">{totalCargos}</div>
                  <div>Total de Cargos</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-briefcase fa-2x"></i>
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
                  <div className="h4 mb-0">{cargosAtivos}</div>
                  <div>Cargos Ativos</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-check-circle fa-2x"></i>
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
                  <div className="h4 mb-0">{totalFuncionarios}</div>
                  <div>Funcionários Alocados</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-users fa-2x"></i>
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
                  <div className="h4 mb-0">Kz {mediaSalarial.toFixed(0)}</div>
                  <div>Média Salarial</div>
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
            <div className="col-md-3">
              <label className="form-label fw-bold">Nível</label>
              <select 
                className="form-select"
                value={filterNivel}
                onChange={(e) => setFilterNivel(e.target.value)}
              >
                <option value="todos">Todos os Níveis</option>
                <option value="junior">Júnior</option>
                <option value="pleno">Pleno</option>
                <option value="senior">Sénior</option>
                <option value="gerencial">Gerencial</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Buscar</label>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nome do cargo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button className="btn btn-outline-primary w-100">
                <i className="fa fa-download me-2"></i>
                Exportar
              </button>
            </div>
          </div>
        </PanelBody>
      </Panel>

      {/* Resumo por Departamento */}
      <div className="row mb-3">
        {['Oficina', 'Atendimento', 'Financeiro'].map(dept => {
          const cargosDept = cargos.filter(c => c.departamento === dept);
          const funcionariosDept = cargosDept.reduce((acc, c) => acc + c.funcionariosAtivos, 0);
          
          return (
            <div key={dept} className="col-md-4">
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="text-primary">{dept}</h5>
                  <div className="row">
                    <div className="col-6">
                      <h6 className="mb-0">{cargosDept.length}</h6>
                      <small className="text-muted">Cargos</small>
                    </div>
                    <div className="col-6">
                      <h6 className="mb-0">{funcionariosDept}</h6>
                      <small className="text-muted">Funcionários</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabela de Cargos */}
      <CargosTable
        cargos={cargos}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterDepartamento={filterDepartamento}
        setFilterDepartamento={setFilterDepartamento}
        filterNivel={filterNivel}
        setFilterNivel={setFilterNivel}
        onEdit={handleEdit}
        onView={handleView}
        onFuncionarios={handleFuncionarios}
      />

      {/* Modal */}
      {showModal && (
        <CargoModal
          cargo={editingCargo}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingCargo(null);
          }}
        />
      )}

      {showDetailsModal && viewingCargo && (
        <CargoDetailsModal
          cargo={viewingCargo}
          onClose={() => {
            setShowDetailsModal(false);
            setViewingCargo(null);
          }}
        />
      )}

      {showFuncionariosModal && funcionariosCargo && (
        <CargoFuncionariosModal
          cargo={funcionariosCargo}
          onClose={() => {
            setShowFuncionariosModal(false);
            setFuncionariosCargo(null);
          }}
        />
      )}
    </div>
  );
}