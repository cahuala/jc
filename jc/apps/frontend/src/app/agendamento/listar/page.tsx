'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import ExportButtons from '@/components/ui/ExportButtons';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Toast from '@/components/ui/Toast';
import AgendamentoDetailsModal from '@/components/agendamento/AgendamentoDetailsModal';
import AgendamentoEditModal from '@/components/agendamento/AgendamentoEditModal';
import React from 'react';

interface Agendamento {
  id: number;
  cliente: string;
  veiculo: string;
  servico: string;
  data: string;
  hora: string;
  mecanico: string;
  status: string;
  observacoes: string;
}

export default function ListarAgendamentosPage() {
  const [agendamentos] = useState<Agendamento[]>([
    {
      id: 1,
      cliente: 'João Silva',
      veiculo: 'Toyota Corolla - ABC-1234',
      servico: 'Revisão Completa',
      data: '2024-01-20',
      hora: '09:00',
      mecanico: 'António Mendes',
      status: 'confirmado',
      observacoes: 'Cliente solicitou troca de óleo'
    },
    {
      id: 2,
      cliente: 'Maria Santos',
      veiculo: 'Honda Civic - XYZ-5678',
      servico: 'Troca de Pneus',
      data: '2024-01-20',
      hora: '14:00',
      mecanico: 'Manuel Costa',
      status: 'pendente',
      observacoes: 'Verificar alinhamento'
    },
    {
      id: 3,
      cliente: 'Pedro Costa',
      veiculo: 'Nissan Sentra - DEF-9012',
      servico: 'Diagnóstico Elétrico',
      data: '2024-01-21',
      hora: '10:30',
      mecanico: 'José Ferreira',
      status: 'em_andamento',
      observacoes: 'Problema no sistema de ignição'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('todos');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [agendamentoToDelete, setAgendamentoToDelete] = useState<Agendamento | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'warning' | 'info'>('success');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState<Agendamento | null>(null);
  const [editingAgendamento, setEditingAgendamento] = useState<Agendamento | null>(null);
  const itemsPerPage = 5;

  const handleView = (agendamento: Agendamento) => {
    setSelectedAgendamento(agendamento);
    setShowDetailsModal(true);
  };

  const handleEdit = (agendamento: Agendamento) => {
    setEditingAgendamento(agendamento);
    setShowEditModal(true);
  };

  const handleSave = (agendamento: Agendamento) => {
    setToastMessage(`Agendamento ${editingAgendamento ? 'atualizado' : 'criado'} com sucesso!`);
    setToastType('success');
    setShowToast(true);
    setShowEditModal(false);
    setEditingAgendamento(null);
  };

  const handleConfirm = (agendamento: Agendamento) => {
    setToastMessage(`Agendamento de ${agendamento.cliente} foi confirmado com sucesso!`);
    setToastType('success');
    setShowToast(true);
  };

  const handleCancel = (agendamento: Agendamento) => {
    setToastMessage(`Agendamento de ${agendamento.cliente} foi cancelado.`);
    setToastType('warning');
    setShowToast(true);
  };

  const handleDelete = (agendamento: Agendamento) => {
    setAgendamentoToDelete(agendamento);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (agendamentoToDelete) {
      setToastMessage(`Agendamento de "${agendamentoToDelete.cliente}" foi excluído com sucesso!`);
      setShowToast(true);
      setShowConfirmModal(false);
      setAgendamentoToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setAgendamentoToDelete(null);
  };

  const filteredAgendamentos = agendamentos.filter(agendamento => 
    filterStatus === 'todos' || agendamento.status === filterStatus
  );

  const totalPages = Math.ceil(filteredAgendamentos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAgendamentos = filteredAgendamentos.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string): string => {
    switch (status) {
      case 'confirmado':
        return 'bg-success';
      case 'pendente':
        return 'bg-warning';
      case 'em_andamento':
        return 'bg-info';
      case 'concluido':
        return 'bg-primary';
      case 'cancelado':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'confirmado':
        return 'Confirmado';
      case 'pendente':
        return 'Pendente';
      case 'em_andamento':
        return 'Em Andamento';
      case 'concluido':
        return 'Concluído';
      case 'cancelado':
        return 'Cancelado';
      default:
        return 'Indefinido';
    }
  };

  return (
    <div className="container-fluid p-4">
      <ol className="breadcrumb float-xl-end">
        <li className="breadcrumb-item"><Link href="/dashboard/v1">Home</Link></li>
        <li className="breadcrumb-item">Agendamentos</li>
        <li className="breadcrumb-item active">Lista</li>
      </ol>
      <h1 className="page-header">Lista de Agendamentos <small>gerencie todos os agendamentos da oficina</small></h1>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-2">
          <ExportButtons 
            data={agendamentos} 
            filename="agendamentos"
            onExportPDF={() => alert('Exportando agendamentos para PDF...')}
            onExportExcel={() => alert('Exportando agendamentos para Excel...')}
            onPrint={() => window.print()}
          />
        </div>
        <button className="btn btn-primary" onClick={() => setShowEditModal(true)}>
          <i className="fa fa-plus me-2"></i>
          Novo Agendamento
        </button>
      </div>

      <Panel>
        <PanelHeader>
          <div className="d-flex justify-content-between align-items-center w-100">
            <span>Agendamentos</span>
            <div className="d-flex gap-2">
              <select
                className="form-select form-select-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ width: '150px' }}
              >
                <option value="todos">Todos Status</option>
                <option value="pendente">Pendente</option>
                <option value="confirmado">Confirmado</option>
                <option value="em_andamento">Em Andamento</option>
                <option value="concluido">Concluído</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
          </div>
        </PanelHeader>
        <PanelBody className="p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Cliente</th>
                  <th>Veículo</th>
                  <th>Serviço</th>
                  <th>Data/Hora</th>
                  <th>Mecânico</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAgendamentos.map((agendamento) => (
                  <tr key={agendamento.id}>
                    <td>
                      <div>
                        <div className="fw-bold">{agendamento.cliente}</div>
                        <small className="text-muted">{agendamento.observacoes}</small>
                      </div>
                    </td>
                    <td>
                      <span className="text-primary">{agendamento.veiculo}</span>
                    </td>
                    <td>{agendamento.servico}</td>
                    <td>
                      <div>
                        <div>{new Date(agendamento.data).toLocaleDateString('pt-AO')}</div>
                        <small className="text-muted">{agendamento.hora}</small>
                      </div>
                    </td>
                    <td>
                      <span className="text-info">{agendamento.mecanico}</span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(agendamento.status)}`}>
                        {getStatusText(agendamento.status)}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button 
                          className="btn btn-outline-primary" 
                          title="Ver Detalhes"
                          onClick={() => handleView(agendamento)}
                        >
                          <i className="fa fa-eye"></i>
                        </button>
                        <button 
                          className="btn btn-outline-warning" 
                          title="Editar"
                          onClick={() => handleEdit(agendamento)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        {agendamento.status === 'pendente' && (
                          <button 
                            className="btn btn-outline-success" 
                            title="Confirmar"
                            onClick={() => handleConfirm(agendamento)}
                          >
                            <i className="fa fa-check"></i>
                          </button>
                        )}
                        {agendamento.status !== 'cancelado' && agendamento.status !== 'concluido' && (
                          <button 
                            className="btn btn-outline-warning" 
                            title="Cancelar"
                            onClick={() => handleCancel(agendamento)}
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        )}
                        <button 
                          className="btn btn-outline-danger" 
                          title="Excluir"
                          onClick={() => handleDelete(agendamento)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center p-3">
              <div className="text-muted">
                Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredAgendamentos.length)} de {filteredAgendamentos.length} registros
              </div>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                      Anterior
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(page)}>
                        {page}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                      Próximo
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </PanelBody>
      </Panel>

      <ConfirmModal
        isOpen={showConfirmModal}
        title="Excluir Agendamento"
        message={`Tem certeza que deseja excluir o agendamento de "${agendamentoToDelete?.cliente}"?\n\nTodos os dados do agendamento serão perdidos permanentemente.`}
        confirmText="Sim, Excluir"
        cancelText="Cancelar"
        type="danger"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <Toast
        isOpen={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />

      {showDetailsModal && selectedAgendamento && (
        <AgendamentoDetailsModal
          agendamento={selectedAgendamento}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedAgendamento(null);
          }}
        />
      )}

      {showEditModal && (
        <AgendamentoEditModal
          agendamento={editingAgendamento}
          onSave={handleSave}
          onClose={() => {
            setShowEditModal(false);
            setEditingAgendamento(null);
          }}
        />
      )}
    </div>
  );
}