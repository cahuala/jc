import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

interface Movimentacao {
  id: number;
  data: string;
  tipo: 'entrada' | 'saida';
  categoria: string;
  descricao: string;
  valor: number;
  origem: string;
  documento: string;
  saldoAnterior: number;
  saldoAtual: number;
}

interface FluxoCaixaTableProps {
  movimentacoes: Movimentacao[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterTipo: string;
  setFilterTipo: (tipo: string) => void;
  filterPeriodo: string;
  setFilterPeriodo: (periodo: string) => void;
  onEdit: (movimentacao: Movimentacao) => void;
  onView?: (movimentacao: Movimentacao) => void;
  onComprovante?: (movimentacao: Movimentacao) => void;
}

export default function FluxoCaixaTable({ 
  movimentacoes, 
  searchTerm, 
  setSearchTerm, 
  filterTipo, 
  setFilterTipo,
  filterPeriodo,
  setFilterPeriodo,
  onEdit,
  onView,
  onComprovante
}: FluxoCaixaTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getTipoIcon = (tipo: string) => {
    return tipo === 'entrada' ? 
      <i className="fa fa-arrow-up text-success"></i> : 
      <i className="fa fa-arrow-down text-danger"></i>;
  };

  const getTipoBadge = (tipo: string) => {
    return tipo === 'entrada' ? 
      <span className="badge bg-success">Entrada</span> : 
      <span className="badge bg-danger">Saída</span>;
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('pt-AO'),
      time: date.toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const filterByPeriodo = (movimentacao: Movimentacao) => {
    const hoje = new Date();
    const dataMovimentacao = new Date(movimentacao.data);
    
    switch (filterPeriodo) {
      case 'hoje':
        return dataMovimentacao.toDateString() === hoje.toDateString();
      case 'ontem':
        const ontem = new Date(hoje);
        ontem.setDate(hoje.getDate() - 1);
        return dataMovimentacao.toDateString() === ontem.toDateString();
      case 'semana':
        const inicioSemana = new Date(hoje);
        inicioSemana.setDate(hoje.getDate() - hoje.getDay());
        return dataMovimentacao >= inicioSemana;
      case 'mes':
        return dataMovimentacao.getMonth() === hoje.getMonth() && 
               dataMovimentacao.getFullYear() === hoje.getFullYear();
      default:
        return true;
    }
  };

  // Filtrar movimentações
  const filteredMovimentacoes = movimentacoes.filter(movimentacao => {
    const matchesSearch = 
      movimentacao.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movimentacao.documento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movimentacao.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTipo = filterTipo === 'todos' || movimentacao.tipo === filterTipo;
    const matchesPeriodo = filterByPeriodo(movimentacao);
    
    return matchesSearch && matchesTipo && matchesPeriodo;
  });

  // Paginação
  const totalPages = Math.ceil(filteredMovimentacoes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMovimentacoes = filteredMovimentacoes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Panel>
      <PanelHeader>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span>Movimentações do Caixa</span>
          <div className="d-flex gap-2">
            <select 
              className="form-select form-select-sm" 
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
              style={{width: '120px'}}
            >
              <option value="todos">Todos</option>
              <option value="entrada">Entradas</option>
              <option value="saida">Saídas</option>
            </select>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar movimentação..."
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
                <th>Data/Hora</th>
                <th>Tipo</th>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Origem</th>
                <th>Saldo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMovimentacoes.map((movimentacao) => {
                const dateTime = formatDateTime(movimentacao.data);
                
                return (
                  <tr key={movimentacao.id}>
                    <td>
                      <div className="fw-bold">{dateTime.date}</div>
                      <small className="text-muted">{dateTime.time}</small>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        {getTipoIcon(movimentacao.tipo)}
                        <span className="ms-2">{getTipoBadge(movimentacao.tipo)}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-info">{movimentacao.categoria}</span>
                    </td>
                    <td>
                      <div className="text-truncate" style={{maxWidth: '250px'}}>
                        {movimentacao.descricao}
                      </div>
                      <small className="text-muted">{movimentacao.documento}</small>
                    </td>
                    <td>
                      <span className={`fw-bold ${movimentacao.tipo === 'entrada' ? 'text-success' : 'text-danger'}`}>
                        {movimentacao.tipo === 'entrada' ? '+' : '-'} Kz {movimentacao.valor.toFixed(2)}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-secondary">{movimentacao.origem}</span>
                    </td>
                    <td>
                      <div className="fw-bold">Kz {movimentacao.saldoAtual.toFixed(2)}</div>
                      <small className="text-muted">
                        Anterior: Kz {movimentacao.saldoAnterior.toFixed(2)}
                      </small>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => onEdit(movimentacao)}
                          title="Editar"
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-outline-info"
                          onClick={() => onView?.(movimentacao)}
                          title="Visualizar"
                        >
                          <i className="fa fa-eye"></i>
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => onComprovante?.(movimentacao)}
                          title="Comprovante"
                        >
                          <i className="fa fa-receipt"></i>
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
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredMovimentacoes.length)} de {filteredMovimentacoes.length} movimentações
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