import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Toast from '@/components/ui/Toast';

interface Funcionario {
  id: number;
  nome: string;
  nif: string;
  telefone: string;
  email: string;
  cargo: string;
  departamento: string;
  salario: number;
  dataAdmissao: string;
  status: 'ativo' | 'inativo' | 'ferias';
  foto?: string;
}

interface FuncionariosTableProps {
  funcionarios: Funcionario[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterDepartamento: string;
  setFilterDepartamento: (departamento: string) => void;
  onEdit: (funcionario: Funcionario) => void;
  onDelete?: (funcionario: Funcionario) => void;
  onView?: (funcionario: Funcionario) => void;
  onHistory?: (funcionario: Funcionario) => void;
}

export default function FuncionariosTable({ 
  funcionarios, 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus,
  filterDepartamento,
  setFilterDepartamento,
  onEdit,
  onDelete,
  onView,
  onHistory
}: FuncionariosTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [funcionarioToDelete, setFuncionarioToDelete] = useState<Funcionario | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const itemsPerPage = 5;

  const handleView = (funcionario: Funcionario) => {
    onView?.(funcionario);
  };

  const handleHistory = (funcionario: Funcionario) => {
    onHistory?.(funcionario);
  };

  const handleDelete = (funcionario: Funcionario) => {
    setFuncionarioToDelete(funcionario);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (funcionarioToDelete) {
      if (onDelete) {
        onDelete(funcionarioToDelete);
      }
      setToastMessage(`Funcionário "${funcionarioToDelete.nome}" foi excluído com sucesso!`);
      setShowToast(true);
      setShowConfirmModal(false);
      setFuncionarioToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setFuncionarioToDelete(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativo':
        return <span className="badge bg-success">Ativo</span>;
      case 'inativo':
        return <span className="badge bg-danger">Inativo</span>;
      case 'ferias':
        return <span className="badge bg-warning">Em Férias</span>;
      default:
        return <span className="badge bg-secondary">-</span>;
    }
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-AO');
  };

  const calcularTempoServico = (dataAdmissao: string) => {
    const admissao = new Date(dataAdmissao);
    const hoje = new Date();
    const diffTime = Math.abs(hoje.getTime() - admissao.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const anos = Math.floor(diffDays / 365);
    const meses = Math.floor((diffDays % 365) / 30);
    
    if (anos > 0) {
      return `${anos}a ${meses}m`;
    } else {
      return `${meses}m`;
    }
  };

  // Filtrar funcionários
  const filteredFuncionarios = funcionarios.filter(funcionario => {
    const matchesSearch = 
      funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      funcionario.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      funcionario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      funcionario.departamento.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'todos' || funcionario.status === filterStatus;
    const matchesDepartamento = filterDepartamento === 'todos' || funcionario.departamento === filterDepartamento;
    
    return matchesSearch && matchesStatus && matchesDepartamento;
  });

  // Paginação
  const totalPages = Math.ceil(filteredFuncionarios.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFuncionarios = filteredFuncionarios.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Panel>
      <PanelHeader>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span>Funcionários</span>
          <div className="d-flex gap-2">
            <select 
              className="form-select form-select-sm" 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{width: '120px'}}
            >
              <option value="todos">Todos</option>
              <option value="ativo">Ativos</option>
              <option value="inativo">Inativos</option>
              <option value="ferias">Férias</option>
            </select>
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
                <th>Departamento</th>
                <th>Salário</th>
                <th>Admissão</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedFuncionarios.map((funcionario) => (
                <tr key={funcionario.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-sm me-3">
                        <div className="avatar-initial bg-primary rounded-circle">
                          {funcionario.nome.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <div className="fw-bold">{funcionario.nome}</div>
                        <small className="text-muted">{funcionario.email}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="fw-bold">{funcionario.cargo}</div>
                    <small className="text-muted">NIF: {funcionario.nif}</small>
                  </td>
                  <td>
                    {getDepartamentoBadge(funcionario.departamento)}
                  </td>
                  <td>
                    <span className="fw-bold">Kz {funcionario.salario.toFixed(2)}</span>
                  </td>
                  <td>
                    <div>{formatDate(funcionario.dataAdmissao)}</div>
                    <small className="text-muted">{calcularTempoServico(funcionario.dataAdmissao)}</small>
                  </td>
                  <td>
                    {getStatusBadge(funcionario.status)}
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => onEdit(funcionario)}
                        title="Editar"
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-outline-info"
                        title="Visualizar"
                        onClick={() => handleView(funcionario)}
                      >
                        <i className="fa fa-eye"></i>
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        title="Histórico"
                        onClick={() => handleHistory(funcionario)}
                      >
                        <i className="fa fa-history"></i>
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        title="Excluir"
                        onClick={() => handleDelete(funcionario)}
                      >
                        <i className="fa fa-trash"></i>
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
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredFuncionarios.length)} de {filteredFuncionarios.length} funcionários
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

      <ConfirmModal
        isOpen={showConfirmModal}
        title="Excluir Funcionário"
        message={`Tem certeza que deseja excluir o funcionário "${funcionarioToDelete?.nome}"?\n\nTodos os dados relacionados (histórico, folha de pagamento) serão perdidos permanentemente.`}
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