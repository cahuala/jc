import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

interface Cargo {
  id: number;
  nome: string;
  departamento: string;
  nivel: 'junior' | 'pleno' | 'senior' | 'gerencial';
  salarioMinimo: number;
  salarioMaximo: number;
  descricao: string;
  requisitos: string[];
  funcionariosAtivos: number;
  status: 'ativo' | 'inativo';
}

interface CargosTableProps {
  cargos: Cargo[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterDepartamento: string;
  setFilterDepartamento: (departamento: string) => void;
  filterNivel: string;
  setFilterNivel: (nivel: string) => void;
  onEdit: (cargo: Cargo) => void;
  onView?: (cargo: Cargo) => void;
  onFuncionarios?: (cargo: Cargo) => void;
}

export default function CargosTable({ 
  cargos, 
  searchTerm, 
  setSearchTerm, 
  filterDepartamento, 
  setFilterDepartamento,
  filterNivel,
  setFilterNivel,
  onEdit,
  onView,
  onFuncionarios
}: CargosTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCargo, setExpandedCargo] = useState<number | null>(null);
  const itemsPerPage = 5;

  const getNivelBadge = (nivel: string) => {
    const colors = {
      'junior': 'bg-info',
      'pleno': 'bg-primary',
      'senior': 'bg-success',
      'gerencial': 'bg-warning'
    };
    return <span className={`badge ${colors[nivel as keyof typeof colors]}`}>
      {nivel.charAt(0).toUpperCase() + nivel.slice(1)}
    </span>;
  };

  const getDepartamentoBadge = (departamento: string) => {
    const colors = {
      'Oficina': 'bg-primary',
      'Atendimento': 'bg-info',
      'Financeiro': 'bg-success',
      'Administração': 'bg-warning'
    };
    return <span className={`badge ${colors[departamento as keyof typeof colors] || 'bg-secondary'}`}>{departamento}</span>;
  };

  const getStatusBadge = (status: string) => {
    return status === 'ativo' ? 
      <span className="badge bg-success">Ativo</span> : 
      <span className="badge bg-danger">Inativo</span>;
  };

  const toggleExpanded = (cargoId: number) => {
    setExpandedCargo(expandedCargo === cargoId ? null : cargoId);
  };

  // Filtrar cargos
  const filteredCargos = cargos.filter(cargo => {
    const matchesSearch = cargo.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartamento = filterDepartamento === 'todos' || cargo.departamento === filterDepartamento;
    const matchesNivel = filterNivel === 'todos' || cargo.nivel === filterNivel;
    
    return matchesSearch && matchesDepartamento && matchesNivel;
  });

  // Paginação
  const totalPages = Math.ceil(filteredCargos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCargos = filteredCargos.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Panel>
      <PanelHeader>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span>Cargos da Empresa</span>
          <div className="d-flex gap-2">
            <select 
              className="form-select form-select-sm" 
              value={filterNivel}
              onChange={(e) => setFilterNivel(e.target.value)}
              style={{width: '120px'}}
            >
              <option value="todos">Todos</option>
              <option value="junior">Júnior</option>
              <option value="pleno">Pleno</option>
              <option value="senior">Sénior</option>
              <option value="gerencial">Gerencial</option>
            </select>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar cargo..."
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
                <th>Cargo</th>
                <th>Departamento</th>
                <th>Nível</th>
                <th>Faixa Salarial</th>
                <th>Funcionários</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCargos.map((cargo) => (
                <React.Fragment key={cargo.id}>
                  <tr 
                    onClick={() => toggleExpanded(cargo.id)} 
                    style={{cursor: 'pointer'}} 
                    className="table-row-hover"
                  >
                    <td>
                      <div className="d-flex align-items-center">
                        <i className={`fa fa-chevron-${expandedCargo === cargo.id ? 'down' : 'right'} me-2 text-muted`}></i>
                        <div>
                          <div className="fw-bold">{cargo.nome}</div>
                          <small className="text-muted text-truncate" style={{maxWidth: '200px', display: 'block'}}>
                            {cargo.descricao}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      {getDepartamentoBadge(cargo.departamento)}
                    </td>
                    <td>
                      {getNivelBadge(cargo.nivel)}
                    </td>
                    <td>
                      <div className="fw-bold">Kz {cargo.salarioMinimo.toFixed(0)} - {cargo.salarioMaximo.toFixed(0)}</div>
                      <small className="text-muted">
                        Média: Kz {((cargo.salarioMinimo + cargo.salarioMaximo) / 2).toFixed(0)}
                      </small>
                    </td>
                    <td>
                      <span className="badge bg-info">{cargo.funcionariosAtivos}</span>
                    </td>
                    <td>
                      {getStatusBadge(cargo.status)}
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => onEdit(cargo)}
                          title="Editar"
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-outline-info"
                          title="Visualizar"
                          onClick={() => onView?.(cargo)}
                        >
                          <i className="fa fa-eye"></i>
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          title="Funcionários"
                          onClick={() => onFuncionarios?.(cargo)}
                        >
                          <i className="fa fa-users"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedCargo === cargo.id && (
                    <tr>
                      <td colSpan={7} className="p-0 bg-light">
                        <div className="p-4">
                          <div className="row">
                            <div className="col-md-8">
                              <h6 className="text-primary mb-3">
                                <i className="fa fa-list me-2"></i>
                                Requisitos do Cargo
                              </h6>
                              <ul className="list-unstyled">
                                {cargo.requisitos.map((requisito, index) => (
                                  <li key={index} className="mb-1">
                                    <i className="fa fa-check text-success me-2"></i>
                                    {requisito}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="col-md-4">
                              <h6 className="text-primary mb-3">
                                <i className="fa fa-info-circle me-2"></i>
                                Informações Adicionais
                              </h6>
                              <div className="mb-2">
                                <strong>Descrição Completa:</strong><br/>
                                <small className="text-muted">{cargo.descricao}</small>
                              </div>
                              <div className="mb-2">
                                <strong>Funcionários Ativos:</strong><br/>
                                <span className="badge bg-info">{cargo.funcionariosAtivos} pessoas</span>
                              </div>
                              <div className="mb-0">
                                <strong>Faixa Salarial:</strong><br/>
                                <span className="text-success fw-bold">
                                  Kz {cargo.salarioMinimo.toFixed(0)} - {cargo.salarioMaximo.toFixed(0)}
                                </span>
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
          <div className="d-flex justify-content-between align-items-center p-3 border-top">
            <div className="text-muted">
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredCargos.length)} de {filteredCargos.length} cargos
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