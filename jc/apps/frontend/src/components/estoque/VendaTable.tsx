import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

interface ItemVenda {
  produto: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

interface Venda {
  id: number;
  numero: string;
  cliente: string;
  data: string;
  itens: ItemVenda[];
  subtotal: number;
  desconto: number;
  total: number;
  status: string;
  vendedor: string;
  observacoes: string;
}

interface VendaTableProps {
  vendas: Venda[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  onEdit: (venda: Venda) => void;
}

export default function VendaTable({ 
  vendas, 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus,
  onEdit 
}: VendaTableProps) {
  const [expandedVenda, setExpandedVenda] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggleExpanded = (vendaId: number) => {
    setExpandedVenda(expandedVenda === vendaId ? null : vendaId);
  };

  const filteredVendas = vendas.filter(venda => {
    const matchesSearch = venda.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venda.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venda.vendedor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || venda.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredVendas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVendas = filteredVendas.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'finalizada': return 'bg-success';
      case 'rascunho': return 'bg-warning';
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
          <span>Lista de Vendas</span>
          <div className="d-flex gap-2">
            <select 
              className="form-select form-select-sm" 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{width: '120px'}}
            >
              <option value="todos">Todos</option>
              <option value="finalizada">Finalizadas</option>
              <option value="rascunho">Rascunho</option>
              <option value="cancelada">Canceladas</option>
            </select>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar venda..."
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
                <th>Data/Hora</th>
                <th>Itens</th>
                <th>Total</th>
                <th>Status</th>
                <th>Vendedor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedVendas.map((venda) => (
                <React.Fragment key={venda.id}>
                  <tr 
                    onClick={() => toggleExpanded(venda.id)} 
                    style={{cursor: 'pointer'}} 
                    className="table-row-hover"
                  >
                    <td>
                      <div className="d-flex align-items-center">
                        <i className={`fa fa-chevron-${expandedVenda === venda.id ? 'down' : 'right'} me-2 text-muted`}></i>
                        <div>
                          <div className="fw-bold text-primary">{venda.numero}</div>
                          <small className="text-muted">{venda.cliente}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div>{formatDateTime(venda.data).date}</div>
                        <small className="text-muted">{formatDateTime(venda.data).time}</small>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-info">{venda.itens.length} itens</span>
                    </td>
                    <td className="fw-bold text-success">
                      Kz {venda.total.toFixed(2)}
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(venda.status)}`}>
                        {venda.status.charAt(0).toUpperCase() + venda.status.slice(1)}
                      </span>
                    </td>
                    <td>{venda.vendedor}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="btn-group btn-group-sm">
                        <button 
                          className="btn btn-outline-warning" 
                          title="Editar"
                          onClick={() => onEdit(venda)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button className="btn btn-outline-info" title="Imprimir">
                          <i className="fa fa-print"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedVenda === venda.id && (
                    <tr>
                      <td colSpan={7} className="p-0 bg-light">
                        <div className="p-4">
                          <div className="row">
                            <div className="col-md-8">
                              <h6 className="text-primary mb-3">
                                <i className="fa fa-list me-2"></i>
                                Itens da Venda
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
                                    {venda.itens.map((item, index) => (
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
                                      <td className="text-end">Kz {venda.subtotal.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                      <td className="fw-bold">Desconto:</td>
                                      <td className="text-end text-danger">- Kz {venda.desconto.toFixed(2)}</td>
                                    </tr>
                                    <tr className="border-top">
                                      <td className="fw-bold">Total:</td>
                                      <td className="text-end fw-bold text-success">Kz {venda.total.toFixed(2)}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              {venda.observacoes && (
                                <div className="mt-3">
                                  <strong>Observações:</strong><br/>
                                  <small className="text-muted">{venda.observacoes}</small>
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
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredVendas.length)} de {filteredVendas.length} vendas
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