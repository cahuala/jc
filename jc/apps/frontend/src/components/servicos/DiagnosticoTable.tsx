import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

interface Problema {
  sistema: string;
  descricao: string;
  severidade: string;
}

interface Diagnostico {
  id: number;
  cliente: string;
  veiculo: string;
  placa: string;
  dataEntrada: string;
  status: string;
  prioridade: string;
  sintomas: string[];
  problemas: Problema[];
  mecanico: string | null;
  tempoEstimado: number;
  custoEstimado: number;
}

interface DiagnosticoTableProps {
  diagnosticos: Diagnostico[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  onEdit: (diagnostico: Diagnostico) => void;
  onFinalize?: (diagnostico: Diagnostico) => void;
  onPrint?: (diagnostico: Diagnostico) => void;
}

export default function DiagnosticoTable({ 
  diagnosticos, 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus,
  onEdit 
}: DiagnosticoTableProps) {
  const [expandedDiagnostico, setExpandedDiagnostico] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggleExpanded = (diagnosticoId: number) => {
    setExpandedDiagnostico(expandedDiagnostico === diagnosticoId ? null : diagnosticoId);
  };

  const filteredDiagnosticos = diagnosticos.filter(diagnostico => {
    const matchesSearch = diagnostico.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         diagnostico.veiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         diagnostico.placa.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'todos' || diagnostico.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredDiagnosticos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDiagnosticos = filteredDiagnosticos.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'em_andamento': return 'bg-warning';
      case 'concluido': return 'bg-success';
      case 'aguardando': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'em_andamento': return 'Em Andamento';
      case 'concluido': return 'Concluído';
      case 'aguardando': return 'Aguardando';
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

  const getSeveridadeBadge = (severidade: string) => {
    switch(severidade) {
      case 'alta': return 'bg-danger';
      case 'media': return 'bg-warning';
      case 'baixa': return 'bg-info';
      default: return 'bg-secondary';
    }
  };

  return (
    <Panel>
      <PanelHeader>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span>Lista de Diagnósticos</span>
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
            </select>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar diagnóstico..."
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
                <th>Cliente / Veículo</th>
                <th>Data</th>
                <th>Status</th>
                <th>Prioridade</th>
                <th>Mecânico</th>
                <th>Custo Est.</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDiagnosticos.map((diagnostico) => (
                <React.Fragment key={diagnostico.id}>
                  <tr 
                    onClick={() => toggleExpanded(diagnostico.id)} 
                    style={{cursor: 'pointer'}} 
                    className="table-row-hover"
                  >
                    <td>
                      <div className="d-flex align-items-center">
                        <i className={`fa fa-chevron-${expandedDiagnostico === diagnostico.id ? 'down' : 'right'} me-2 text-muted`}></i>
                        <div>
                          <div className="fw-bold">{diagnostico.cliente}</div>
                          <small className="text-muted">
                            {diagnostico.veiculo} • {diagnostico.placa}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>{new Date(diagnostico.dataEntrada).toLocaleDateString('pt-BR')}</div>
                      <small className="text-muted">
                        {diagnostico.tempoEstimado > 0 ? `${diagnostico.tempoEstimado}min` : 'N/A'}
                      </small>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(diagnostico.status)}`}>
                        {getStatusText(diagnostico.status)}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getPrioridadeBadge(diagnostico.prioridade)}`}>
                        {diagnostico.prioridade.charAt(0).toUpperCase() + diagnostico.prioridade.slice(1)}
                      </span>
                    </td>
                    <td>
                      {diagnostico.mecanico ? (
                        <span className="text-primary">{diagnostico.mecanico}</span>
                      ) : (
                        <span className="text-muted">Não atribuído</span>
                      )}
                    </td>
                    <td className="fw-bold text-success">
                      {diagnostico.custoEstimado > 0 ? 
                        `R$ ${diagnostico.custoEstimado.toFixed(2)}` : 
                        'A definir'
                      }
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="btn-group btn-group-sm">
                        <button 
                          className="btn btn-outline-warning" 
                          title="Editar"
                          onClick={() => onEdit(diagnostico)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button className="btn btn-outline-info" title="Relatório">
                          <i className="fa fa-file-alt"></i>
                        </button>
                        <button className="btn btn-outline-success" title="Finalizar">
                          <i className="fa fa-check"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedDiagnostico === diagnostico.id && (
                    <tr>
                      <td colSpan={7} className="p-0 bg-light">
                        <div className="p-4">
                          <div className="row">
                            <div className="col-md-6">
                              <h6 className="text-primary mb-3">
                                <i className="fa fa-exclamation-triangle me-2"></i>
                                Sintomas Relatados
                              </h6>
                              <ul className="list-unstyled">
                                {diagnostico.sintomas.map((sintoma, index) => (
                                  <li key={index} className="mb-2">
                                    <i className="fa fa-dot-circle text-warning me-2"></i>
                                    {sintoma}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="col-md-6">
                              <h6 className="text-primary mb-3">
                                <i className="fa fa-tools me-2"></i>
                                Problemas Identificados
                              </h6>
                              {diagnostico.problemas.length > 0 ? (
                                <div className="table-responsive">
                                  <table className="table table-sm">
                                    <thead>
                                      <tr>
                                        <th>Sistema</th>
                                        <th>Problema</th>
                                        <th>Severidade</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {diagnostico.problemas.map((problema, index) => (
                                        <tr key={index}>
                                          <td>
                                            <span className="badge bg-secondary">{problema.sistema}</span>
                                          </td>
                                          <td>{problema.descricao}</td>
                                          <td>
                                            <span className={`badge ${getSeveridadeBadge(problema.severidade)}`}>
                                              {problema.severidade.charAt(0).toUpperCase() + problema.severidade.slice(1)}
                                            </span>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <p className="text-muted">Diagnóstico ainda não realizado</p>
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
          <div className="d-flex justify-content-between align-items-center p-3">
            <div className="text-muted">
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredDiagnosticos.length)} de {filteredDiagnosticos.length} registros
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
    </Panel>
  );
}