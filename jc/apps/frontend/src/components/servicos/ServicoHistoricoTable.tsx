import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import Toast from '@/components/ui/Toast';

interface Peca {
  nome: string;
  quantidade: number;
  valor: number;
}

interface ServicoHistorico {
  id: number;
  ordemServico: string;
  cliente: string;
  veiculo: string;
  placa: string;
  tipoServico: string;
  servicos: string[];
  mecanico: string;
  dataInicio: string;
  dataFim: string;
  tempoServico: number;
  valor: number;
  status: string;
  satisfacao: number;
  observacoes: string;
  pecasUsadas: Peca[];
  custoTotal: number;
  lucro: number;
}

interface ServicoHistoricoTableProps {
  servicos: ServicoHistorico[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterPeriodo: string;
  setFilterPeriodo: (periodo: string) => void;
  filterMecanico: string;
  setFilterMecanico: (mecanico: string) => void;
}

export default function ServicoHistoricoTable({ 
  servicos, 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus,
  filterPeriodo,
  setFilterPeriodo,
  filterMecanico,
  setFilterMecanico
}: ServicoHistoricoTableProps) {
  const [expandedServico, setExpandedServico] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const itemsPerPage = 5;

  const toggleExpanded = (servicoId: number) => {
    setExpandedServico(expandedServico === servicoId ? null : servicoId);
  };

  const totalPages = Math.ceil(servicos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedServicos = servicos.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'concluido': return 'bg-success';
      case 'em_andamento': return 'bg-warning';
      case 'cancelado': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const getSatisfacaoStars = (rating: number) => {
    return Array.from({length: 5}, (_, i) => (
      <i key={i} className={`fa fa-star ${i < rating ? 'text-warning' : 'text-muted'}`}></i>
    ));
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('pt-BR'),
      time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const mecanicos = [...new Set(servicos.map(s => s.mecanico))];

  const handleViewDetails = (servico: ServicoHistorico) => {
    setToastMessage(`Visualizando detalhes da OS ${servico.ordemServico}`);
    setToastType('info');
    setShowToast(true);
    setExpandedServico(servico.id);
  };

  const handlePrintService = (servico: ServicoHistorico) => {
    setToastMessage(`Imprimindo OS ${servico.ordemServico}...`);
    setToastType('info');
    setShowToast(true);
    window.print();
  };

  const handleCopyService = (servico: ServicoHistorico) => {
    const serviceText = `OS: ${servico.ordemServico}\nCliente: ${servico.cliente}\nVeículo: ${servico.veiculo} (${servico.placa})\nServiços: ${servico.servicos.join(', ')}\nMecânico: ${servico.mecanico}\nData: ${formatDateTime(servico.dataInicio).date}\nTempo: ${formatTime(servico.tempoServico)}\nValor: R$ ${servico.valor.toFixed(2)}\nStatus: ${servico.status}\nSatisfação: ${servico.satisfacao}/5`;
    
    navigator.clipboard.writeText(serviceText).then(() => {
      setToastMessage('Dados do serviço copiados para a área de transferência!');
      setToastType('success');
      setShowToast(true);
    }).catch(() => {
      setToastMessage('Erro ao copiar dados do serviço');
      setToastType('error');
      setShowToast(true);
    });
  };

  return (
    <Panel>
      <PanelHeader>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span>Histórico Detalhado de Serviços</span>
          <div className="d-flex gap-2">
            <select 
              className="form-select form-select-sm" 
              value={filterPeriodo}
              onChange={(e) => setFilterPeriodo(e.target.value)}
              style={{width: '120px'}}
            >
              <option value="7">7 dias</option>
              <option value="30">30 dias</option>
              <option value="90">90 dias</option>
              <option value="365">1 ano</option>
              <option value="todos">Todos</option>
            </select>
            <select 
              className="form-select form-select-sm" 
              value={filterMecanico}
              onChange={(e) => setFilterMecanico(e.target.value)}
              style={{width: '150px'}}
            >
              <option value="">Todos Mecânicos</option>
              {mecanicos.map(mecanico => (
                <option key={mecanico} value={mecanico}>{mecanico}</option>
              ))}
            </select>
            <select 
              className="form-select form-select-sm" 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{width: '120px'}}
            >
              <option value="todos">Todos Status</option>
              <option value="concluido">Concluído</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="cancelado">Cancelado</option>
            </select>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar serviço..."
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
            <thead className="table-dark">
              <tr>
                <th>OS / Cliente</th>
                <th>Veículo</th>
                <th>Serviço</th>
                <th>Mecânico</th>
                <th>Data/Tempo</th>
                <th>Valor/Lucro</th>
                <th>Satisfação</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedServicos.map((servico) => (
                <React.Fragment key={servico.id}>
                  <tr 
                    onClick={() => toggleExpanded(servico.id)} 
                    style={{cursor: 'pointer'}} 
                    className="table-row-hover"
                  >
                    <td>
                      <div className="d-flex align-items-center">
                        <i className={`fa fa-chevron-${expandedServico === servico.id ? 'down' : 'right'} me-2 text-muted`}></i>
                        <div>
                          <div className="fw-bold text-primary">{servico.ordemServico}</div>
                          <small className="text-muted">{servico.cliente}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="fw-bold">{servico.veiculo}</div>
                        <small className="text-muted">
                          <span className="badge bg-dark">{servico.placa}</span>
                        </small>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span className="badge bg-primary">{servico.tipoServico}</span>
                        <div className="mt-1">
                          <small className="text-muted">
                            {servico.servicos.slice(0, 2).join(', ')}
                            {servico.servicos.length > 2 && '...'}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-info">{servico.mecanico}</span>
                    </td>
                    <td>
                      <div>
                        <div>{formatDateTime(servico.dataInicio).date}</div>
                        <small className="text-muted">
                          <i className="fa fa-clock me-1"></i>
                          {formatTime(servico.tempoServico)}
                        </small>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="fw-bold text-success">R$ {servico.valor.toFixed(2)}</div>
                        <small className="text-warning">
                          Lucro: R$ {servico.lucro.toFixed(2)}
                        </small>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex">
                        {getSatisfacaoStars(servico.satisfacao)}
                      </div>
                      <small className="text-muted">{servico.satisfacao}/5</small>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(servico.status)}`}>
                        {servico.status === 'concluido' ? 'Concluído' : 
                         servico.status === 'em_andamento' ? 'Em Andamento' : 'Cancelado'}
                      </span>
                    </td>
                  </tr>
                  {expandedServico === servico.id && (
                    <tr>
                      <td colSpan={8} className="p-0 bg-light">
                        <div className="p-4">
                          <div className="row">
                            <div className="col-md-6">
                              <h6 className="text-primary mb-3">
                                <i className="fa fa-info-circle me-2"></i>
                                Detalhes do Serviço
                              </h6>
                              <div className="table-responsive">
                                <table className="table table-sm">
                                  <tbody>
                                    <tr>
                                      <td className="fw-bold">Início:</td>
                                      <td>
                                        {formatDateTime(servico.dataInicio).date} às {formatDateTime(servico.dataInicio).time}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fw-bold">Fim:</td>
                                      <td>
                                        {formatDateTime(servico.dataFim).date} às {formatDateTime(servico.dataFim).time}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fw-bold">Duração:</td>
                                      <td>{formatTime(servico.tempoServico)}</td>
                                    </tr>
                                    <tr>
                                      <td className="fw-bold">Serviços:</td>
                                      <td>
                                        {servico.servicos.map((s, i) => (
                                          <span key={i} className="badge bg-secondary me-1 mb-1">{s}</span>
                                        ))}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              
                              {servico.observacoes && (
                                <div className="mt-3">
                                  <h6 className="text-secondary">
                                    <i className="fa fa-comment me-2"></i>
                                    Observações
                                  </h6>
                                  <p className="text-muted small bg-white p-2 rounded border">
                                    {servico.observacoes}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            <div className="col-md-6">
                              <h6 className="text-primary mb-3">
                                <i className="fa fa-calculator me-2"></i>
                                Análise Financeira
                              </h6>
                              <div className="row mb-3">
                                <div className="col-4">
                                  <div className="text-center p-2 bg-success bg-opacity-10 rounded">
                                    <div className="fw-bold text-success">R$ {servico.valor.toFixed(2)}</div>
                                    <small className="text-muted">Faturamento</small>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <div className="text-center p-2 bg-danger bg-opacity-10 rounded">
                                    <div className="fw-bold text-danger">R$ {servico.custoTotal.toFixed(2)}</div>
                                    <small className="text-muted">Custo</small>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <div className="text-center p-2 bg-warning bg-opacity-10 rounded">
                                    <div className="fw-bold text-warning">R$ {servico.lucro.toFixed(2)}</div>
                                    <small className="text-muted">Lucro</small>
                                  </div>
                                </div>
                              </div>
                              
                              <h6 className="text-secondary mb-2">
                                <i className="fa fa-boxes me-2"></i>
                                Peças Utilizadas
                              </h6>
                              <div className="table-responsive">
                                <table className="table table-sm table-bordered">
                                  <thead className="table-secondary">
                                    <tr>
                                      <th>Peça</th>
                                      <th>Qtd</th>
                                      <th>Valor</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {servico.pecasUsadas.map((peca, index) => (
                                      <tr key={index}>
                                        <td>{peca.nome}</td>
                                        <td>{peca.quantidade}</td>
                                        <td className="text-success">R$ {peca.valor.toFixed(2)}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
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
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, servicos.length)} de {servicos.length} registros
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