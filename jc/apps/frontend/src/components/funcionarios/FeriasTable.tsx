import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

interface Ferias {
  id: string;
  funcionario: string;
  cargo: string;
  dataInicio: string;
  dataFim: string;
  diasSolicitados: number;
  diasDisponiveis: number;
  status: 'pendente' | 'aprovada' | 'rejeitada' | 'em_andamento' | 'concluida';
  observacoes?: string;
  aprovadoPor?: string;
  dataAprovacao?: string;
}

interface FeriasTableProps {
  ferias: Ferias[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterMes: string;
  setFilterMes: (mes: string) => void;
  onEdit: (ferias: Ferias) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function FeriasTable({ 
  ferias, 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus,
  filterMes,
  setFilterMes,
  onEdit,
  onApprove,
  onReject
}: FeriasTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'aprovada':
        return <span className="badge bg-success">Aprovada</span>;
      case 'pendente':
        return <span className="badge bg-warning">Pendente</span>;
      case 'rejeitada':
        return <span className="badge bg-danger">Rejeitada</span>;
      case 'em_andamento':
        return <span className="badge bg-info">Em Andamento</span>;
      case 'concluida':
        return <span className="badge bg-secondary">Concluída</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const calcularDias = (inicio: string, fim: string) => {
    const dataInicio = new Date(inicio);
    const dataFim = new Date(fim);
    const diffTime = Math.abs(dataFim.getTime() - dataInicio.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const isEmAndamento = (inicio: string, fim: string, status: string) => {
    if (status !== 'aprovada') return false;
    const hoje = new Date();
    const dataInicio = new Date(inicio);
    const dataFim = new Date(fim);
    return hoje >= dataInicio && hoje <= dataFim;
  };

  // Filtrar férias
  const filteredFerias = ferias.filter(feriasItem => {
    const matchesSearch = feriasItem.funcionario.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || feriasItem.status === filterStatus;
    const matchesMes = !filterMes || feriasItem.dataInicio.startsWith(filterMes);
    
    return matchesSearch && matchesStatus && matchesMes;
  });

  // Paginação
  const totalPages = Math.ceil(filteredFerias.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFerias = filteredFerias.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Panel>
      <PanelHeader>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span>Solicitações de Férias</span>
          <div className="d-flex gap-2">
            <select 
              className="form-select form-select-sm" 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{width: '120px'}}
            >
              <option value="todos">Todos</option>
              <option value="pendente">Pendente</option>
              <option value="aprovada">Aprovada</option>
              <option value="rejeitada">Rejeitada</option>
              <option value="concluida">Concluída</option>
            </select>
            <input
              type="month"
              className="form-control form-control-sm"
              value={filterMes}
              onChange={(e) => setFilterMes(e.target.value)}
              style={{width: '150px'}}
            />
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar funcionário..."
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
                <th>Funcionário</th>
                <th>Período</th>
                <th>Dias</th>
                <th>Disponível</th>
                <th>Status</th>
                <th>Aprovação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedFerias.map((feriasItem) => (
                <tr key={feriasItem.id}>
                  <td>
                    <div>
                      <strong>{feriasItem.funcionario}</strong>
                      <div className="small text-muted">{feriasItem.cargo}</div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <strong>
                        {new Date(feriasItem.dataInicio).toLocaleDateString('pt-AO')} - {' '}
                        {new Date(feriasItem.dataFim).toLocaleDateString('pt-AO')}
                      </strong>
                      {isEmAndamento(feriasItem.dataInicio, feriasItem.dataFim, feriasItem.status) && (
                        <div className="small text-info">
                          <i className="fa fa-clock me-1"></i>Em andamento
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-primary">{feriasItem.diasSolicitados} dias</span>
                  </td>
                  <td>
                    <div>
                      <span className={feriasItem.diasDisponiveis > 0 ? 'text-success' : 'text-danger'}>
                        {feriasItem.diasDisponiveis} dias
                      </span>
                      <div className="small text-muted">
                        Restam: {feriasItem.diasDisponiveis - feriasItem.diasSolicitados}
                      </div>
                    </div>
                  </td>
                  <td>
                    {getStatusBadge(feriasItem.status)}
                  </td>
                  <td>
                    {feriasItem.aprovadoPor ? (
                      <div>
                        <div className="small text-success">
                          <i className="fa fa-user-check me-1"></i>
                          {feriasItem.aprovadoPor}
                        </div>
                        {feriasItem.dataAprovacao && (
                          <div className="small text-muted">
                            {new Date(feriasItem.dataAprovacao).toLocaleDateString('pt-AO')}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted">Pendente</span>
                    )}
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => onEdit(feriasItem)}
                        title="Editar"
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      {feriasItem.status === 'pendente' && (
                        <>
                          <button
                            className="btn btn-outline-success"
                            onClick={() => onApprove(feriasItem.id)}
                            title="Aprovar"
                          >
                            <i className="fa fa-check"></i>
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => onReject(feriasItem.id)}
                            title="Rejeitar"
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </>
                      )}
                      <button
                        className="btn btn-outline-info"
                        title="Relatório"
                      >
                        <i className="fa fa-file-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center p-3 border-top">
            <div className="text-muted">
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredFerias.length)} de {filteredFerias.length} solicitações
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