import React from 'react';

interface Funcionario {
  id: number;
  nome: string;
  nif: string;
  telefone: string;
  email: string;
  salario: number;
  dataAdmissao: string;
  status: 'ativo' | 'inativo' | 'ferias';
}

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

interface CargoFuncionariosModalProps {
  cargo: Cargo;
  onClose: () => void;
}

export default function CargoFuncionariosModal({ cargo, onClose }: CargoFuncionariosModalProps) {
  // Dados de exemplo dos funcionários do cargo
  const funcionarios: Funcionario[] = [
    {
      id: 1,
      nome: 'António Silva',
      nif: '123456789',
      telefone: '+244 923 456 789',
      email: 'antonio.silva@flxmotor.ao',
      salario: 180000,
      dataAdmissao: '2022-03-15',
      status: 'ativo'
    },
    {
      id: 2,
      nome: 'Carlos Mendes',
      nif: '456789123',
      telefone: '+244 925 678 901',
      email: 'carlos.mendes@flxmotor.ao',
      salario: 220000,
      dataAdmissao: '2021-08-20',
      status: 'ferias'
    }
  ];

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-AO');
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fa fa-users me-2"></i>
              Funcionários - {cargo.nome}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row mb-3">
              <div className="col-md-8">
                <h6 className="text-muted mb-0">Cargo: {cargo.nome}</h6>
                <small className="text-muted">Departamento: {cargo.departamento}</small>
              </div>
              <div className="col-md-4 text-end">
                <span className="badge bg-info fs-6">{funcionarios.length} funcionários</span>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Funcionário</th>
                    <th>Contacto</th>
                    <th>Salário</th>
                    <th>Admissão</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {funcionarios.map((funcionario) => (
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
                            <small className="text-muted">NIF: {funcionario.nif}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>{funcionario.telefone}</div>
                        <small className="text-muted">{funcionario.email}</small>
                      </td>
                      <td>
                        <span className="fw-bold">Kz {funcionario.salario.toLocaleString()}</span>
                      </td>
                      <td>
                        {formatDate(funcionario.dataAdmissao)}
                      </td>
                      <td>
                        {getStatusBadge(funcionario.status)}
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            title="Editar"
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-outline-info"
                            title="Visualizar"
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

            {funcionarios.length === 0 && (
              <div className="text-center py-4">
                <i className="fa fa-users fa-3x text-muted mb-3"></i>
                <h5 className="text-muted">Nenhum funcionário encontrado</h5>
                <p className="text-muted">Este cargo ainda não possui funcionários atribuídos.</p>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Fechar
            </button>
            <button type="button" className="btn btn-primary">
              <i className="fa fa-plus me-2"></i>
              Atribuir Funcionário
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}