import React from 'react';

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

interface CargoDetailsModalProps {
  cargo: Cargo;
  onClose: () => void;
}

export default function CargoDetailsModal({ cargo, onClose }: CargoDetailsModalProps) {
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

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fa fa-briefcase me-2"></i>
              Detalhes do Cargo
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-8">
                <div className="mb-4">
                  <h4 className="text-primary mb-2">{cargo.nome}</h4>
                  <div className="d-flex gap-2 mb-3">
                    {getDepartamentoBadge(cargo.departamento)}
                    {getNivelBadge(cargo.nivel)}
                    <span className={`badge ${cargo.status === 'ativo' ? 'bg-success' : 'bg-danger'}`}>
                      {cargo.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <p className="text-muted">{cargo.descricao}</p>
                </div>

                <div className="mb-4">
                  <h6 className="text-primary mb-3">
                    <i className="fa fa-list me-2"></i>
                    Requisitos do Cargo
                  </h6>
                  <ul className="list-unstyled">
                    {cargo.requisitos.map((requisito, index) => (
                      <li key={index} className="mb-2">
                        <i className="fa fa-check text-success me-2"></i>
                        {requisito}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">
                      <i className="fa fa-info-circle me-2"></i>
                      Informações
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <strong>Faixa Salarial:</strong><br/>
                      <span className="text-success fw-bold">
                        Kz {cargo.salarioMinimo.toLocaleString()} - {cargo.salarioMaximo.toLocaleString()}
                      </span><br/>
                      <small className="text-muted">
                        Média: Kz {((cargo.salarioMinimo + cargo.salarioMaximo) / 2).toLocaleString()}
                      </small>
                    </div>
                    
                    <div className="mb-3">
                      <strong>Funcionários Ativos:</strong><br/>
                      <span className="badge bg-info fs-6">{cargo.funcionariosAtivos} pessoas</span>
                    </div>

                    <div className="mb-3">
                      <strong>Departamento:</strong><br/>
                      {getDepartamentoBadge(cargo.departamento)}
                    </div>

                    <div className="mb-0">
                      <strong>Nível:</strong><br/>
                      {getNivelBadge(cargo.nivel)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Fechar
            </button>
            <button type="button" className="btn btn-primary">
              <i className="fa fa-edit me-2"></i>
              Editar Cargo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}