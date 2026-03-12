import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

interface ItemInventario {
  id: number;
  produto: string;
  categoria: string;
  estoqueAtual: number;
  estoqueContado: number;
  diferenca: number;
  valorUnitario: number;
  valorDiferenca: number;
  status: string;
  usuario: string;
  dataContagem: string;
}

interface InventarioTableProps {
  inventario: ItemInventario[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  onEdit: (item: ItemInventario) => void;
  onConfirm?: (item: ItemInventario) => void;
  onView?: (item: ItemInventario) => void;
}

export default function InventarioTable({ 
  inventario, 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus,
  onEdit,
  onConfirm,
  onView
}: InventarioTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredInventario = inventario.filter(item => {
    const matchesSearch = item.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredInventario.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInventario = filteredInventario.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'conferido': return 'bg-success';
      case 'pendente': return 'bg-warning';
      case 'ajustado': return 'bg-info';
      default: return 'bg-secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'conferido': return 'Conferido';
      case 'pendente': return 'Pendente';
      case 'ajustado': return 'Ajustado';
      default: return 'Indefinido';
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
          <span>Itens do Inventário</span>
          <div className="d-flex gap-2">
            <select 
              className="form-select form-select-sm" 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{width: '120px'}}
            >
              <option value="todos">Todos</option>
              <option value="pendente">Pendentes</option>
              <option value="conferido">Conferidos</option>
              <option value="ajustado">Ajustados</option>
            </select>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar item..."
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
                <th>Produto</th>
                <th>Categoria</th>
                <th>Estoque Atual</th>
                <th>Contado</th>
                <th>Diferença</th>
                <th>Valor Diferença</th>
                <th>Status</th>
                <th>Usuário</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInventario.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="fw-bold">{item.produto}</div>
                    <small className="text-muted">
                      {formatDateTime(item.dataContagem).date} {formatDateTime(item.dataContagem).time}
                    </small>
                  </td>
                  <td>
                    <span className="badge bg-info">{item.categoria}</span>
                  </td>
                  <td className="text-center">
                    <span className="fw-bold">{item.estoqueAtual}</span>
                  </td>
                  <td className="text-center">
                    <span className="fw-bold">{item.estoqueContado}</span>
                  </td>
                  <td className="text-center">
                    <span className={`fw-bold ${item.diferenca > 0 ? 'text-success' : item.diferenca < 0 ? 'text-danger' : 'text-muted'}`}>
                      {item.diferenca > 0 ? '+' : ''}{item.diferenca}
                    </span>
                  </td>
                  <td>
                    <span className={`fw-bold ${item.valorDiferenca > 0 ? 'text-success' : item.valorDiferenca < 0 ? 'text-danger' : 'text-muted'}`}>
                      Kz {item.valorDiferenca.toFixed(2)}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </td>
                  <td>{item.usuario}</td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      {item.status === 'pendente' && (
                        <>
                          <button 
                            className="btn btn-outline-success" 
                            title="Confirmar"
                            onClick={() => onConfirm?.(item)}
                          >
                            <i className="fa fa-check"></i>
                          </button>
                          <button 
                            className="btn btn-outline-warning" 
                            title="Editar"
                            onClick={() => onEdit(item)}
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                        </>
                      )}
                      <button 
                        className="btn btn-outline-info" 
                        title="Detalhes"
                        onClick={() => onView?.(item)}
                      >
                        <i className="fa fa-eye"></i>
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
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredInventario.length)} de {filteredInventario.length} itens
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