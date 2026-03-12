import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Toast from '@/components/ui/Toast';

interface ItemFatura {
  descricao: string;
  quantidade: number;
  precoUnitario: number;
  iva: number;
  subtotal: number;
}

interface Fatura {
  id: number;
  numero: string;
  cliente: string;
  nifCliente: string;
  data: string;
  dataVencimento: string;
  itens: ItemFatura[];
  subtotal: number;
  totalIva: number;
  total: number;
  status: string;
  observacoes: string;
  formaPagamento: string;
}

interface FaturaTableProps {
  faturas: Fatura[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  onEdit: (fatura: Fatura) => void;
  onDelete?: (fatura: Fatura) => void;
}

export default function FaturaTable({ 
  faturas, 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus,
  onEdit,
  onDelete
}: FaturaTableProps) {
  const [expandedFatura, setExpandedFatura] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [faturaToDelete, setFaturaToDelete] = useState<Fatura | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const itemsPerPage = 5;

  const toggleExpanded = (faturaId: number) => {
    setExpandedFatura(expandedFatura === faturaId ? null : faturaId);
  };

  const handlePrint = (fatura: Fatura) => {
    alert(`Imprimindo fatura: ${fatura.numero}`);
    // Implementar impressão da fatura
  };

  const handleMarkAsPaid = (fatura: Fatura) => {
    if (confirm(`Marcar fatura ${fatura.numero} como paga?`)) {
      alert(`Fatura ${fatura.numero} marcada como paga!`);
      // Implementar marcação como paga
    }
  };

  const handleDelete = (fatura: Fatura) => {
    setFaturaToDelete(fatura);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (faturaToDelete) {
      if (onDelete) {
        onDelete(faturaToDelete);
      }
      setToastMessage(`Fatura "${faturaToDelete.numero}" foi excluída com sucesso!`);
      setShowToast(true);
      setShowConfirmModal(false);
      setFaturaToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setFaturaToDelete(null);
  };

  const filteredFaturas = faturas.filter(fatura => {
    const matchesSearch = fatura.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fatura.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fatura.nifCliente.includes(searchTerm);
    const matchesStatus = filterStatus === 'todos' || fatura.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredFaturas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFaturas = filteredFaturas.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'paga': return 'bg-success';
      case 'pendente': return 'bg-warning';
      case 'vencida': return 'bg-danger';
      case 'cancelada': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-AO');
  };

  const isVencida = (dataVencimento: string, status: string) => {
    return status === 'pendente' && new Date(dataVencimento) < new Date();
  };

  return (
    <Panel>
      <PanelHeader>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span>Lista de Faturas</span>
          <div className="d-flex gap-2">
            <select 
              className="form-select form-select-sm" 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{width: '120px'}}
            >
              <option value="todos">Todos</option>
              <option value="pendente">Pendentes</option>
              <option value="paga">Pagas</option>
              <option value="vencida">Vencidas</option>
              <option value="cancelada">Canceladas</option>
            </select>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar fatura..."
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
                <th>Número / Cliente</th>
                <th>NIF</th>
                <th>Data Emissão</th>
                <th>Vencimento</th>
                <th>Total</th>
                <th>Status</th>
                <th>Pagamento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedFaturas.map((fatura) => (
                <React.Fragment key={fatura.id}>
                  <tr 
                    onClick={() => toggleExpanded(fatura.id)} 
                    style={{cursor: 'pointer'}} 
                    className="table-row-hover"
                  >
                    <td>
                      <div className="d-flex align-items-center">
                        <i className={`fa fa-chevron-${expandedFatura === fatura.id ? 'down' : 'right'} me-2 text-muted`}></i>
                        <div>
                          <div className="fw-bold text-primary">{fatura.numero}</div>
                          <small className="text-muted">{fatura.cliente}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-dark">{fatura.nifCliente}</span>
                    </td>
                    <td>{formatDate(fatura.data)}</td>
                    <td>
                      <div className={isVencida(fatura.dataVencimento, fatura.status) ? 'text-danger fw-bold' : ''}>
                        {formatDate(fatura.dataVencimento)}
                        {isVencida(fatura.dataVencimento, fatura.status) && (
                          <i className="fa fa-exclamation-triangle ms-1"></i>
                        )}
                      </div>
                    </td>
                    <td className="fw-bold text-success">
                      Kz {fatura.total.toFixed(2)}
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(fatura.status)}`}>
                        {fatura.status.charAt(0).toUpperCase() + fatura.status.slice(1)}
                      </span>
                    </td>
                    <td>{fatura.formaPagamento}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="btn-group btn-group-sm">
                        <button 
                          className="btn btn-outline-warning" 
                          title="Editar"
                          onClick={() => onEdit(fatura)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button 
                          className="btn btn-outline-info" 
                          title="Imprimir"
                          onClick={() => handlePrint(fatura)}
                        >
                          <i className="fa fa-print"></i>
                        </button>
                        {fatura.status === 'pendente' && (
                          <button 
                            className="btn btn-outline-success" 
                            title="Marcar como Paga"
                            onClick={() => handleMarkAsPaid(fatura)}
                          >
                            <i className="fa fa-check"></i>
                          </button>
                        )}
                        <button 
                          className="btn btn-outline-danger" 
                          title="Excluir"
                          onClick={() => handleDelete(fatura)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedFatura === fatura.id && (
                    <tr>
                      <td colSpan={8} className="p-0 bg-light">
                        <div className="p-4">
                          <div className="row">
                            <div className="col-md-8">
                              <h6 className="text-primary mb-3">
                                <i className="fa fa-list me-2"></i>
                                Itens da Fatura
                              </h6>
                              <div className="table-responsive">
                                <table className="table table-sm table-bordered">
                                  <thead>
                                    <tr>
                                      <th>Descrição</th>
                                      <th>Qtd</th>
                                      <th>Preço Unit.</th>
                                      <th>IVA</th>
                                      <th>Subtotal</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {fatura.itens.map((item, index) => (
                                      <tr key={index}>
                                        <td>{item.descricao}</td>
                                        <td>{item.quantidade}</td>
                                        <td>Kz {item.precoUnitario.toFixed(2)}</td>
                                        <td>Kz {item.iva.toFixed(2)}</td>
                                        <td className="fw-bold">Kz {item.subtotal.toFixed(2)}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <h6 className="text-primary mb-3">
                                <i className="fa fa-calculator me-2"></i>
                                Resumo Financeiro
                              </h6>
                              <div className="table-responsive">
                                <table className="table table-sm table-borderless">
                                  <tbody>
                                    <tr>
                                      <td className="fw-bold">Subtotal:</td>
                                      <td className="text-end">Kz {fatura.subtotal.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                      <td className="fw-bold">IVA (15%):</td>
                                      <td className="text-end text-warning">Kz {fatura.totalIva.toFixed(2)}</td>
                                    </tr>
                                    <tr className="border-top">
                                      <td className="fw-bold">Total:</td>
                                      <td className="text-end fw-bold text-success">Kz {fatura.total.toFixed(2)}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              {fatura.observacoes && (
                                <div className="mt-3">
                                  <strong>Observações:</strong><br/>
                                  <small className="text-muted">{fatura.observacoes}</small>
                                </div>
                              )}
                              <div className="mt-3">
                                <strong>Forma de Pagamento:</strong><br/>
                                <span className="badge bg-info">{fatura.formaPagamento}</span>
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
          <div className="d-flex justify-content-between align-items-center p-3 border-top">
            <div className="text-muted">
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredFaturas.length)} de {filteredFaturas.length} faturas
            </div>
            <div className="btn-group btn-group-sm">
              <button 
                className="btn btn-outline-secondary" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <i className="fa fa-chevron-left"></i>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`btn ${currentPage === page ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button 
                className="btn btn-outline-secondary" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <i className="fa fa-chevron-right"></i>
              </button>
            </div>
          </div>
        )}
      </PanelBody>

      <ConfirmModal
        isOpen={showConfirmModal}
        title="Excluir Fatura"
        message={`Tem certeza que deseja excluir a fatura "${faturaToDelete?.numero}"?\n\nTodos os dados financeiros relacionados serão perdidos permanentemente.`}
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
    </Panel>
  );
}