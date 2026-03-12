import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

interface ContaPagar {
  id: number;
  fornecedor: string;
  nifFornecedor: string;
  documento: string;
  descricao: string;
  valor: number;
  dataVencimento: string;
  status: 'pendente' | 'vencida' | 'paga';
  observacoes: string;
}

interface ContasPagarTableProps {
  contas: ContaPagar[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  onEdit: (conta: ContaPagar) => void;
  onPagar?: (conta: ContaPagar) => void;
  onView?: (conta: ContaPagar) => void;
}

export default function ContasPagarTable({ 
  contas, 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus, 
  onEdit,
  onPagar,
  onView
}: ContasPagarTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getStatusBadge = (status: string, dataVencimento: string) => {
    const hoje = new Date();
    const vencimento = new Date(dataVencimento);
    const diasParaVencimento = Math.ceil((vencimento.getTime() - hoje.getTime()) / (1000 * 3600 * 24));

    switch (status) {
      case 'paga':
        return <span className="badge bg-success">Paga</span>;
      case 'vencida':
        return <span className="badge bg-danger">Vencida</span>;
      case 'pendente':
        if (diasParaVencimento <= 0) {
          return <span className="badge bg-warning">Vence Hoje</span>;
        } else if (diasParaVencimento <= 7) {
          return <span className="badge bg-info">Vence em {diasParaVencimento}d</span>;
        } else {
          return <span className="badge bg-primary">Pendente</span>;
        }
      default:
        return <span className="badge bg-secondary">-</span>;
    }
  };

  const getDiasAtraso = (status: string, dataVencimento: string) => {
    if (status !== 'vencida') return null;
    
    const hoje = new Date();
    const vencimento = new Date(dataVencimento);
    const diasAtraso = Math.ceil((hoje.getTime() - vencimento.getTime()) / (1000 * 3600 * 24));
    
    return diasAtraso > 0 ? diasAtraso : null;
  };

  // Filtrar contas
  const filteredContas = contas.filter(conta => {
    const matchesSearch = 
      conta.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conta.documento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conta.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'todos' || conta.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Paginação
  const totalPages = Math.ceil(filteredContas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContas = filteredContas.slice(startIndex, startIndex + itemsPerPage);

  const handlePagarConta = (conta: ContaPagar) => {
    onPagar?.(conta);
  };

  return (
    <Panel>
      <PanelHeader>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span>Contas a Pagar</span>
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
            </select>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar conta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{width: '200px'}}
            />
          </div>
        </div>
      </PanelHeader>
      <PanelBody className="p-0">
        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th>Fornecedor</th>
                <th>Documento</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Vencimento</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedContas.map((conta) => {
                const diasAtraso = getDiasAtraso(conta.status, conta.dataVencimento);
                
                return (
                  <tr key={conta.id}>
                    <td>
                      <div className="fw-bold">{conta.fornecedor}</div>
                      <small className="text-muted">NIF: {conta.nifFornecedor}</small>
                    </td>
                    <td>
                      <span className="text-primary fw-bold">{conta.documento}</span>
                    </td>
                    <td>
                      <div className="text-truncate" style={{maxWidth: '200px'}}>
                        {conta.descricao}
                      </div>
                    </td>
                    <td>
                      <span className="fw-bold text-danger">Kz {conta.valor.toFixed(2)}</span>
                    </td>
                    <td>
                      <div>{new Date(conta.dataVencimento).toLocaleDateString('pt-AO')}</div>
                      {diasAtraso && (
                        <small className="text-danger">
                          {diasAtraso} dias em atraso
                        </small>
                      )}
                    </td>
                    <td>
                      {getStatusBadge(conta.status, conta.dataVencimento)}
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        {conta.status !== 'paga' && (
                          <button
                            className="btn btn-success"
                            onClick={() => handlePagarConta(conta)}
                            title="Pagar"
                          >
                            <i className="fa fa-credit-card"></i>
                          </button>
                        )}
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => onEdit(conta)}
                          title="Editar"
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-outline-info"
                          onClick={() => onView?.(conta)}
                          title="Visualizar"
                        >
                          <i className="fa fa-eye"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center p-3 border-top">
            <div className="text-muted">
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredContas.length)} de {filteredContas.length} contas
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