import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Toast from '@/components/ui/Toast';
import OrdemServicoPrint from './OrdemServicoPrint';

interface Servico {
  nome: string;
  preco: number;
  status: string;
}

interface Peca {
  nome: string;
  quantidade: number;
  preco: number;
}

interface OrdemServico {
  id: number;
  numero: string;
  cliente: string;
  veiculo: string;
  placa: string;
  dataAbertura: string;
  dataPrevisao: string;
  status: string;
  prioridade: string;
  mecanico: string | null;
  servicos: Servico[];
  pecas: Peca[];
  valorTotal: number;
  observacoes: string;
}

interface OrdemServicoTableProps {
  ordens: OrdemServico[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  onEdit: (ordem: OrdemServico) => void;
  onDelete?: (ordem: OrdemServico) => void;
}

export default function OrdemServicoTable({ 
  ordens, 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus,
  onEdit,
  onDelete
}: OrdemServicoTableProps) {
  const [expandedOrdem, setExpandedOrdem] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [ordemToDelete, setOrdemToDelete] = useState<OrdemServico | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [ordemToPrint, setOrdemToPrint] = useState<OrdemServico | null>(null);
  const itemsPerPage = 5;

  const toggleExpanded = (ordemId: number) => {
    setExpandedOrdem(expandedOrdem === ordemId ? null : ordemId);
  };

  const handlePrint = (ordem: OrdemServico) => {
    setOrdemToPrint(ordem);
    setShowPrintModal(true);
  };

  const handleFinalize = (ordem: OrdemServico) => {
    setToastMessage(`OS ${ordem.numero} finalizada com sucesso!`);
    setShowToast(true);
    // Implementar finalização
  };

  const handleDelete = (ordem: OrdemServico) => {
    setOrdemToDelete(ordem);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (ordemToDelete) {
      if (onDelete) {
        onDelete(ordemToDelete);
      }
      setToastMessage(`Ordem de Serviço "${ordemToDelete.numero}" foi excluída com sucesso!`);
      setShowToast(true);
      setShowConfirmModal(false);
      setOrdemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setOrdemToDelete(null);
  };

  const filteredOrdens = ordens.filter(ordem => {
    const matchesSearch = ordem.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ordem.veiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ordem.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ordem.numero.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'todos' || ordem.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredOrdens.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrdens = filteredOrdens.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'aguardando': return 'bg-secondary';
      case 'em_andamento': return 'bg-warning';
      case 'concluido': return 'bg-success';
      case 'cancelado': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'aguardando': return 'Aguardando';
      case 'em_andamento': return 'Em Andamento';
      case 'concluido': return 'Concluído';
      case 'cancelado': return 'Cancelado';
      default: return 'Indefinido';
    }
  };

  const getPrioridadeBadge = (prioridade: string) => {
    switch(prioridade) {
      case 'alta': return 'bg-danger';
      case 'media': return 'bg-warning';
      case 'baixa': return 'bg-info';
      default: return 'bg-secondary';
    }
  };

  const getServicoStatusBadge = (status: string) => {
    switch(status) {
      case 'pendente': return 'bg-secondary';
      case 'em_andamento': return 'bg-warning';
      case 'concluido': return 'bg-success';
      case 'cancelado': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('pt-AO'),
      time: date.toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <Panel>
      <PanelHeader>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span>Lista de Ordens de Serviço</span>
          <div className="d-flex gap-2">
            <select 
              className="form-select form-select-sm" 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{width: '150px'}}
            >
              <option value="todos">Todos Status</option>
              <option value="aguardando">Aguardando</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="concluido">Concluído</option>
              <option value="cancelado">Cancelado</option>
            </select>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar ordem..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{width: '200px'}}
            />
          </div>
        </div>
      </PanelHeader>
      <PanelBody className="p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>OS / Cliente</th>
                <th>Veículo</th>
                <th>Data/Previsão</th>
                <th>Status</th>
                <th>Prioridade</th>
                <th>Mecânico</th>
                <th>Valor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrdens.map((ordem) => (
                <React.Fragment key={ordem.id}>
                  <tr 
                    onClick={() => toggleExpanded(ordem.id)} 
                    style={{cursor: 'pointer'}} 
                    className="table-row-hover"
                  >
                    <td>
                      <div className="d-flex align-items-center">
                        <i className={`fa fa-chevron-${expandedOrdem === ordem.id ? 'down' : 'right'} me-2 text-muted`}></i>
                        <div>
                          <div className="fw-bold text-primary">{ordem.numero}</div>
                          <small className="text-muted">{ordem.cliente}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="fw-bold">{ordem.veiculo}</div>
                        <small className="text-muted">
                          <span className="badge bg-dark">{ordem.placa}</span>
                        </small>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div>{formatDateTime(ordem.dataAbertura).date}</div>
                        <small className="text-muted">
                          Prev: {formatDateTime(ordem.dataPrevisao).date}
                        </small>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(ordem.status)}`}>
                        {getStatusText(ordem.status)}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getPrioridadeBadge(ordem.prioridade)}`}>
                        {ordem.prioridade.charAt(0).toUpperCase() + ordem.prioridade.slice(1)}
                      </span>
                    </td>
                    <td>
                      {ordem.mecanico ? (
                        <span className="text-primary">{ordem.mecanico}</span>
                      ) : (
                        <span className="text-muted">Não atribuído</span>
                      )}
                    </td>
                    <td className="fw-bold text-success">
                      Kz {ordem.valorTotal.toFixed(2)}
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="btn-group btn-group-sm">
                        <button 
                          className="btn btn-outline-warning" 
                          title="Editar"
                          onClick={() => onEdit(ordem)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button 
                          className="btn btn-outline-info" 
                          title="Imprimir"
                          onClick={() => handlePrint(ordem)}
                        >
                          <i className="fa fa-print"></i>
                        </button>
                        {ordem.status !== 'concluido' && ordem.status !== 'cancelado' && (
                          <button 
                            className="btn btn-outline-success" 
                            title="Finalizar"
                            onClick={() => handleFinalize(ordem)}
                          >
                            <i className="fa fa-check"></i>
                          </button>
                        )}
                        <button 
                          className="btn btn-outline-danger" 
                          title="Excluir"
                          onClick={() => handleDelete(ordem)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedOrdem === ordem.id && (
                    <tr>
                      <td colSpan={8} className="p-0 bg-light">
                        <div className="p-4">
                          <div className="row">
                            <div className="col-md-6">
                              <h6 className="text-primary mb-3">
                                <i className="fa fa-wrench me-2"></i>
                                Serviços Solicitados
                              </h6>
                              <div className="table-responsive">
                                <table className="table table-sm table-bordered">
                                  <thead className="table-secondary">
                                    <tr>
                                      <th>Serviço</th>
                                      <th>Preço</th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {ordem.servicos.map((servico, index) => (
                                      <tr key={index}>
                                        <td>{servico.nome}</td>
                                        <td className="text-success">R$ {servico.preco.toFixed(2)}</td>
                                        <td>
                                          <span className={`badge ${getServicoStatusBadge(servico.status)}`}>
                                            {servico.status === 'pendente' ? 'Pendente' :
                                             servico.status === 'em_andamento' ? 'Em Andamento' :
                                             servico.status === 'concluido' ? 'Concluído' : 'Cancelado'}
                                          </span>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              
                              {ordem.observacoes && (
                                <div className="mt-3">
                                  <h6 className="text-secondary">
                                    <i className="fa fa-comment me-2"></i>
                                    Observações
                                  </h6>
                                  <p className="text-muted small bg-white p-2 rounded border">
                                    {ordem.observacoes}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            <div className="col-md-6">
                              <h6 className="text-primary mb-3">
                                <i className="fa fa-boxes me-2"></i>
                                Peças Necessárias
                              </h6>
                              {ordem.pecas.length > 0 ? (
                                <div className="table-responsive">
                                  <table className="table table-sm table-bordered">
                                    <thead className="table-secondary">
                                      <tr>
                                        <th>Peça</th>
                                        <th>Qtd</th>
                                        <th>Preço Unit.</th>
                                        <th>Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {ordem.pecas.map((peca, index) => (
                                        <tr key={index}>
                                          <td>{peca.nome}</td>
                                          <td>{peca.quantidade}</td>
                                          <td className="text-success">R$ {(peca.preco / peca.quantidade).toFixed(2)}</td>
                                          <td className="text-success fw-bold">R$ {peca.preco.toFixed(2)}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <p className="text-muted">Nenhuma peça necessária</p>
                              )}
                              
                              <div className="mt-3 p-3 bg-white rounded border">
                                <div className="row text-center">
                                  <div className="col-4">
                                    <div className="text-info fw-bold">
                                      R$ {ordem.servicos.reduce((sum, s) => sum + s.preco, 0).toFixed(2)}
                                    </div>
                                    <small className="text-muted">Serviços</small>
                                  </div>
                                  <div className="col-4">
                                    <div className="text-warning fw-bold">
                                      R$ {ordem.pecas.reduce((sum, p) => sum + p.preco, 0).toFixed(2)}
                                    </div>
                                    <small className="text-muted">Peças</small>
                                  </div>
                                  <div className="col-4">
                                    <div className="text-success fw-bold">
                                      R$ {ordem.valorTotal.toFixed(2)}
                                    </div>
                                    <small className="text-muted">Total</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center p-3">
            <div className="text-muted">
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredOrdens.length)} de {filteredOrdens.length} registros
            </div>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                    Anterior
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
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

      <ConfirmModal
        isOpen={showConfirmModal}
        title="Excluir Ordem de Serviço"
        message={`Tem certeza que deseja excluir a OS "${ordemToDelete?.numero}"?\n\nTodos os dados da ordem (serviços, peças, observações) serão perdidos permanentemente.`}
        confirmText="Sim, Excluir"
        cancelText="Cancelar"
        type="danger"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <Toast
        isOpen={showToast}
        message={toastMessage}
        type="success"
        onClose={() => setShowToast(false)}
      />

      {showPrintModal && ordemToPrint && (
        <OrdemServicoPrint
          ordem={ordemToPrint}
          onClose={() => {
            setShowPrintModal(false);
            setOrdemToPrint(null);
          }}
        />
      )}
    </Panel>
  );
}