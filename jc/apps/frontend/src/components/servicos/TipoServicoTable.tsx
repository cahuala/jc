import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Toast from '@/components/ui/Toast';

interface TipoServico {
  id: number;
  nome: string;
  categoria: string;
  descricao: string;
  preco: number;
  tempoEstimado: number;
  status: string;
  materiais: string[];
  frequencia: string;
}

interface TipoServicoTableProps {
  tiposServico: TipoServico[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  onEdit: (tipo: TipoServico) => void;
  onDelete?: (tipo: TipoServico) => void;
}

export default function TipoServicoTable({ 
  tiposServico, 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus,
  onEdit,
  onDelete
}: TipoServicoTableProps) {
  const [expandedTipo, setExpandedTipo] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tipoToDelete, setTipoToDelete] = useState<TipoServico | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const itemsPerPage = 5;

  const handleDelete = (tipo: TipoServico) => {
    setTipoToDelete(tipo);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (tipoToDelete) {
      if (onDelete) {
        onDelete(tipoToDelete);
      }
      setToastMessage(`Tipo de serviço "${tipoToDelete.nome}" foi excluído com sucesso!`);
      setShowToast(true);
      setShowConfirmModal(false);
      setTipoToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setTipoToDelete(null);
  };

  const toggleExpanded = (tipoId: number) => {
    setExpandedTipo(expandedTipo === tipoId ? null : tipoId);
  };

  const filteredTipos = tiposServico.filter(tipo => {
    const matchesSearch = tipo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tipo.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'todos' || tipo.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredTipos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTipos = filteredTipos.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'ativo': return 'bg-success';
      case 'inativo': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  return (
    <Panel>
      <PanelHeader>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span>Lista de Tipos de Serviço</span>
          <div className="d-flex gap-2">
            <select 
              className="form-select form-select-sm" 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{width: '150px'}}
            >
              <option value="todos">Todos Status</option>
              <option value="ativo">Ativos</option>
              <option value="inativo">Inativos</option>
            </select>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar tipo de serviço..."
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
                <th>Serviço</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Tempo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTipos.map((tipo) => (
                <React.Fragment key={tipo.id}>
                  <tr 
                    onClick={() => toggleExpanded(tipo.id)} 
                    style={{cursor: 'pointer'}} 
                    className="table-row-hover"
                  >
                    <td>
                      <div className="d-flex align-items-center">
                        <i className={`fa fa-chevron-${expandedTipo === tipo.id ? 'down' : 'right'} me-2 text-muted`}></i>
                        <div>
                          <div className="fw-bold">{tipo.nome}</div>
                          <small className="text-muted">{tipo.descricao}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-primary">{tipo.categoria}</span>
                    </td>
                    <td className="fw-bold text-success">R$ {tipo.preco.toFixed(2)}</td>
                    <td>{tipo.tempoEstimado} min</td>
                    <td>
                      <span className={`badge ${getStatusBadge(tipo.status)}`}>
                        {tipo.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="btn-group btn-group-sm">
                        <button 
                          className="btn btn-outline-warning" 
                          title="Editar"
                          onClick={() => onEdit(tipo)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button 
                          className="btn btn-outline-danger" 
                          title="Excluir"
                          onClick={() => handleDelete(tipo)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedTipo === tipo.id && (
                    <tr>
                      <td colSpan={6} className="p-0 bg-light">
                        <div className="p-3">
                          <div className="row">
                            <div className="col-md-6">
                              <h6 className="text-primary mb-2">
                                <i className="fa fa-tools me-2"></i>
                                Materiais Necessários
                              </h6>
                              <ul className="list-unstyled">
                                {tipo.materiais.map((material, index) => (
                                  <li key={index} className="mb-1">
                                    <i className="fa fa-check text-success me-2"></i>
                                    {material}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="col-md-6">
                              <h6 className="text-primary mb-2">
                                <i className="fa fa-clock me-2"></i>
                                Frequência Recomendada
                              </h6>
                              <p className="mb-0">{tipo.frequencia}</p>
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
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredTipos.length)} de {filteredTipos.length} registros
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

      <ConfirmModal
        isOpen={showConfirmModal}
        title="Excluir Tipo de Serviço"
        message={`Tem certeza que deseja excluir o tipo de serviço "${tipoToDelete?.nome}"?\n\nEsta ação não pode ser desfeita e afetará todas as ordens de serviço relacionadas.`}
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