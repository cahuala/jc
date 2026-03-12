import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

interface FolhaPagamento {
  id: string;
  funcionario: string;
  cargo: string;
  periodo: string;
  salarioBase: number;
  beneficios: number;
  descontos: number;
  salarioLiquido: number;
  status: 'processada' | 'pendente' | 'paga';
  dataPagamento?: string;
}

interface FolhaPagamentoTableProps {
  folhas: FolhaPagamento[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterPeriodo: string;
  setFilterPeriodo: (periodo: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  onEdit: (folha: FolhaPagamento) => void;
}

export default function FolhaPagamentoTable({ 
  folhas, 
  searchTerm, 
  setSearchTerm, 
  filterPeriodo, 
  setFilterPeriodo,
  filterStatus,
  setFilterStatus,
  onEdit 
}: FolhaPagamentoTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paga':
        return <span className="badge bg-success">Paga</span>;
      case 'processada':
        return <span className="badge bg-warning">Processada</span>;
      case 'pendente':
        return <span className="badge bg-secondary">Pendente</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const formatPeriodo = (periodo: string) => {
    const [ano, mes] = periodo.split('-');
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return `${meses[parseInt(mes) - 1]} ${ano}`;
  };

  const handlePrint = (folha: FolhaPagamento) => {
    alert(`Imprimindo recibo de pagamento de ${folha.funcionario} - ${formatPeriodo(folha.periodo)}`);
  };

  const handleMarkAsPaid = (folha: FolhaPagamento) => {
    alert(`Marcando como paga a folha de ${folha.funcionario}`);
  };

  // Filtrar folhas
  const filteredFolhas = folhas.filter(folha => {
    const matchesSearch = folha.funcionario.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPeriodo = filterPeriodo === 'todos' || folha.periodo === filterPeriodo;
    const matchesStatus = filterStatus === 'todos' || folha.status === filterStatus;
    
    return matchesSearch && matchesPeriodo && matchesStatus;
  });

  // Paginação
  const totalPages = Math.ceil(filteredFolhas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFolhas = filteredFolhas.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Panel>
      <PanelHeader>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span>Folhas de Pagamento</span>
          <div className="d-flex gap-2">
            <select 
              className="form-select form-select-sm" 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{width: '120px'}}
            >
              <option value="todos">Todos</option>
              <option value="pendente">Pendente</option>
              <option value="processada">Processada</option>
              <option value="paga">Paga</option>
            </select>
            <input
              type="month"
              className="form-control form-control-sm"
              value={filterPeriodo}
              onChange={(e) => setFilterPeriodo(e.target.value)}
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
                <th>Cargo</th>
                <th>Período</th>
                <th>Salário Base</th>
                <th>Benefícios</th>
                <th>Descontos</th>
                <th>Líquido</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedFolhas.map((folha) => (
                <tr key={folha.id}>
                  <td>
                    <div>
                      <strong>{folha.funcionario}</strong>
                      {folha.dataPagamento && (
                        <div className="small text-muted">
                          Pago em: {new Date(folha.dataPagamento).toLocaleDateString('pt-AO')}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="text-primary">{folha.cargo}</span>
                  </td>
                  <td>
                    <strong>{formatPeriodo(folha.periodo)}</strong>
                  </td>
                  <td>
                    <span className="text-success">Kz {folha.salarioBase.toLocaleString()}</span>
                  </td>
                  <td>
                    <span className="text-info">+Kz {folha.beneficios.toLocaleString()}</span>
                  </td>
                  <td>
                    <span className="text-danger">-Kz {folha.descontos.toLocaleString()}</span>
                  </td>
                  <td>
                    <strong className="text-success h6">Kz {folha.salarioLiquido.toLocaleString()}</strong>
                  </td>
                  <td>
                    {getStatusBadge(folha.status)}
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => onEdit(folha)}
                        title="Editar"
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-outline-info"
                        onClick={() => handlePrint(folha)}
                        title="Imprimir Recibo"
                      >
                        <i className="fa fa-print"></i>
                      </button>
                      {folha.status === 'processada' && (
                        <button
                          className="btn btn-outline-success"
                          onClick={() => handleMarkAsPaid(folha)}
                          title="Marcar como Paga"
                        >
                          <i className="fa fa-check"></i>
                        </button>
                      )}
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
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredFolhas.length)} de {filteredFolhas.length} folhas
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