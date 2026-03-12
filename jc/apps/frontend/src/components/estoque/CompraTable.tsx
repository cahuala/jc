import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

interface ItemCompra {
  produto: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

interface Compra {
  id: number;
  numero: string;
  fornecedor: string;
  data: string;
  itens: ItemCompra[];
  subtotal: number;
  desconto: number;
  total: number;
  status: string;
  responsavel: string;
  observacoes: string;
  numeroNF: string;
}

interface CompraTableProps {
  compras: Compra[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  onEdit: (compra: Compra) => void;
}

export default function CompraTable({ 
  compras, 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus,
  onEdit 
}: CompraTableProps) {
  const [expandedCompra, setExpandedCompra] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggleExpanded = (compraId: number) => {
    setExpandedCompra(expandedCompra === compraId ? null : compraId);
  };

  const filteredCompras = compras.filter(compra => {
    const matchesSearch = compra.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         compra.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         compra.numeroNF.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || compra.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCompras.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCompras = filteredCompras.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'recebida': return 'bg-success';
      case 'pendente': return 'bg-warning';
      case 'cancelada': return 'bg-danger';
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
          <span>Lista de Compras</span>
          <div className="d-flex gap-2">
            <select 
              className="form-select form-select-sm" 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{width: '120px'}}
            >
              <option value="todos">Todos</option>
              <option value="pendente">Pendentes</option>
              <option value="recebida">Recebidas</option>
              <option value="cancelada">Canceladas</option>
            </select>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar compra..."
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
                <th>Número / Fornecedor</th>
                <th>Data/Hora</th>
                <th>NF</th>
                <th>Itens</th>
                <th>Total</th>
                <th>Status</th>
                <th>Responsável</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCompras.map((compra) => (
                <React.Fragment key={compra.id}>
                  <tr 
                    onClick={() => toggleExpanded(compra.id)} 
                    style={{cursor: 'pointer'}} 
                    className="table-row-hover"
                  >
                    <td>
                      <div className="d-flex align-items-center">
                        <i className={`fa fa-chevron-${expandedCompra === compra.id ? 'down' : 'right'} me-2 text-muted`}></i>
                        <div>
                          <div className="fw-bold text-primary">{compra.numero}</div>
                          <small className="text-muted">{compra.fornecedor}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div>{formatDateTime(compra.data).date}</div>
                        <small className="text-muted">{formatDateTime(compra.data).time}</small>
                      </div>
                    </td>
                    <td>
                      {compra.numeroNF ? (
                        <span className="badge bg-dark">{compra.numeroNF}</span>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                    <td>
                      <span className="badge bg-info">{compra.itens.length} itens</span>
                    </td>
                    <td className="fw-bold text-success">
                      Kz {compra.total.toFixed(2)}
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(compra.status)}`}>
                        {compra.status.charAt(0).toUpperCase() + compra.status.slice(1)}
                      </span>
                    </td>
                    <td>{compra.responsavel}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="btn-group btn-group-sm">
                        <button 
                          className="btn btn-outline-warning" 
                          title="Editar"
                          onClick={() => onEdit(compra)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button className="btn btn-outline-info" title="Imprimir">
                          <i className="fa fa-print"></i>
                        </button>
                        {compra.status === 'pendente' && (
                          <button className="btn btn-outline-success" title="Receber">
                            <i className="fa fa-check"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  {expandedCompra === compra.id && (
                    <tr>
                      <td colSpan={8} className="p-0 bg-light">
                        <div className="p-4">
                          <div className="row">
                            <div className="col-md-8">
                              <h6 className="text-primary mb-3">
                                <i className="fa fa-list me-2"></i>
                                Itens da Compra
                              </h6>
                              <div className="table-responsive">
                                <table className="table table-sm table-bordered">
                                  <thead>
                                    <tr>
                                      <th>Produto</th>
                                      <th>Qtd</th>
                                      <th>Preço Unit.</th>
                                      <th>Subtotal</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {compra.itens.map((item, index) => (
                                      <tr key={index}>
                                        <td>{item.produto}</td>
                                        <td>{item.quantidade}</td>
                                        <td>Kz {item.precoUnitario.toFixed(2)}</td>
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
                                      <td className="text-end">Kz {compra.subtotal.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                      <td className="fw-bold">Desconto:</td>
                                      <td className="text-end text-danger">- Kz {compra.desconto.toFixed(2)}</td>
                                    </tr>
                                    <tr className="border-top">
                                      <td className="fw-bold">Total:</td>
                                      <td className="text-end fw-bold text-success">Kz {compra.total.toFixed(2)}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              {compra.observacoes && (
                                <div className="mt-3">
                                  <strong>Observações:</strong><br/>
                                  <small className="text-muted">{compra.observacoes}</small>
                                </div>
                              )}
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
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredCompras.length)} de {filteredCompras.length} compras
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
    </Panel>
  );
}