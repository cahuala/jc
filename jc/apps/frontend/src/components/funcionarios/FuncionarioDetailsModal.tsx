import React from 'react';

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

interface FuncionarioDetailsModalProps {
  funcionario: Funcionario;
  onClose: () => void;
}

export default function FuncionarioDetailsModal({ funcionario, onClose }: FuncionarioDetailsModalProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-success';
      case 'inativo': return 'bg-danger';
      case 'ferias': return 'bg-warning';
      default: return 'bg-secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativo': return 'Ativo';
      case 'inativo': return 'Inativo';
      case 'ferias': return 'Em Férias';
      default: return 'Indefinido';
    }
  };

  const getDepartamentoBadge = (departamento: string) => {
    const colors = {
      'Oficina': 'bg-primary',
      'Atendimento': 'bg-info',
      'Financeiro': 'bg-success',
      'Administração': 'bg-warning'
    };
    return colors[departamento as keyof typeof colors] || 'bg-secondary';
  };

  const calcularTempoServico = (dataAdmissao: string) => {
    const admissao = new Date(dataAdmissao);
    const hoje = new Date();
    const diffTime = Math.abs(hoje.getTime() - admissao.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const anos = Math.floor(diffDays / 365);
    const meses = Math.floor((diffDays % 365) / 30);
    
    if (anos > 0) {
      return `${anos} ano${anos > 1 ? 's' : ''} e ${meses} mês${meses > 1 ? 'es' : ''}`;
    } else {
      return `${meses} mês${meses > 1 ? 'es' : ''}`;
    }
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fa fa-user me-2"></i>
              Detalhes do Funcionário
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Informações Pessoais</h6>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Nome Completo:</strong>
                      </div>
                      <div className="col-sm-8">
                        {funcionario.nome}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>NIF:</strong>
                      </div>
                      <div className="col-sm-8">
                        {funcionario.nif}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Telefone:</strong>
                      </div>
                      <div className="col-sm-8">
                        {funcionario.telefone}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Email:</strong>
                      </div>
                      <div className="col-sm-8">
                        <a href={`mailto:${funcionario.email}`}>{funcionario.email}</a>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Cargo:</strong>
                      </div>
                      <div className="col-sm-8">
                        <span className="fw-bold">{funcionario.cargo}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Departamento:</strong>
                      </div>
                      <div className="col-sm-8">
                        <span className={`badge ${getDepartamentoBadge(funcionario.departamento)}`}>
                          {funcionario.departamento}
                        </span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Salário:</strong>
                      </div>
                      <div className="col-sm-8">
                        <span className="fw-bold fs-5 text-success">Kz {funcionario.salario.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Data de Admissão:</strong>
                      </div>
                      <div className="col-sm-8">
                        {new Date(funcionario.dataAdmissao).toLocaleDateString('pt-AO')}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <strong>Status:</strong>
                      </div>
                      <div className="col-sm-8">
                        <span className={`badge ${getStatusBadge(funcionario.status)}`}>
                          {getStatusText(funcionario.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Resumo Profissional</h6>
                  </div>
                  <div className="card-body">
                    <div className="text-center mb-3">
                      <div className="avatar avatar-xl mx-auto mb-3">
                        <div className="avatar-initial bg-primary rounded-circle fs-1">
                          {funcionario.nome.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <h6 className="fw-bold">{funcionario.nome}</h6>
                      <p className="text-muted">{funcionario.cargo}</p>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Tempo de Serviço:</span>
                        <span className="fw-bold">{calcularTempoServico(funcionario.dataAdmissao)}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Departamento:</span>
                        <span className={`badge ${getDepartamentoBadge(funcionario.departamento)}`}>
                          {funcionario.departamento}
                        </span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Status Atual:</span>
                        <span className={`badge ${getStatusBadge(funcionario.status)}`}>
                          {getStatusText(funcionario.status)}
                        </span>
                      </div>
                    </div>

                    <hr />

                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Salário Mensal:</span>
                        <span className="fw-bold text-success">Kz {funcionario.salario.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className={`alert ${funcionario.status === 'ativo' ? 'alert-success' : funcionario.status === 'ferias' ? 'alert-warning' : 'alert-danger'} p-2`}>
                        <small>
                          <i className={`fa fa-${funcionario.status === 'ativo' ? 'check' : funcionario.status === 'ferias' ? 'calendar' : 'times'} me-1`}></i>
                          {funcionario.status === 'ativo' ? 'Funcionário ativo' : 
                           funcionario.status === 'ferias' ? 'Funcionário em férias' : 
                           'Funcionário inativo'}
                        </small>
                      </div>
                    </div>

                    <div className="mt-3">
                      <small className="text-muted">
                        <i className="fa fa-info-circle me-1"></i>
                        ID: #{funcionario.id}
                      </small>
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
            <button type="button" className="btn btn-outline-primary">
              <i className="fa fa-history me-2"></i>
              Ver Histórico
            </button>
            <button type="button" className="btn btn-primary">
              <i className="fa fa-print me-2"></i>
              Imprimir Ficha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}