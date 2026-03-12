import React from 'react';

interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  veiculos: any[];
  ultimoServico: string;
  proximaRevisao: string;
  totalGasto: number;
  servicos: number;
  status: string;
  observacoes: string;
}

interface ClienteDetailsModalProps {
  isOpen: boolean;
  cliente: Cliente | null;
  onClose: () => void;
}

export default function ClienteDetailsModal({ isOpen, cliente, onClose }: ClienteDetailsModalProps) {
  if (!isOpen || !cliente) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fa fa-user me-2"></i>
              Detalhes do Cliente
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-header bg-primary text-white">
                    <h6 className="mb-0">
                      <i className="fa fa-info-circle me-2"></i>
                      Informações Pessoais
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="text-center mb-3">
                      <div className="avatar avatar-xl bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center">
                        <i className="fa fa-user fa-2x"></i>
                      </div>
                      <h5 className="mt-2 mb-0">{cliente.nome}</h5>
                      <span className={`badge ${cliente.status === 'ativo' ? 'bg-success' : cliente.status === 'atencao' ? 'bg-warning' : 'bg-danger'}`}>
                        {cliente.status === 'ativo' ? 'Ativo' : cliente.status === 'atencao' ? 'Atenção' : 'Inativo'}
                      </span>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Telefone</label>
                      <div className="d-flex align-items-center">
                        <i className="fa fa-phone text-muted me-2"></i>
                        <span>{cliente.telefone}</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Email</label>
                      <div className="d-flex align-items-center">
                        <i className="fa fa-envelope text-muted me-2"></i>
                        <span>{cliente.email}</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Observações</label>
                      <p className="text-muted small">{cliente.observacoes}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-header bg-success text-white">
                    <h6 className="mb-0">
                      <i className="fa fa-chart-line me-2"></i>
                      Estatísticas
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="row text-center">
                      <div className="col-6 mb-3">
                        <div className="border rounded p-3">
                          <h4 className="text-primary mb-0">{cliente.servicos}</h4>
                          <small className="text-muted">Serviços</small>
                        </div>
                      </div>
                      <div className="col-6 mb-3">
                        <div className="border rounded p-3">
                          <h4 className="text-success mb-0">{cliente.veiculos.length}</h4>
                          <small className="text-muted">Veículos</small>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Total Gasto</label>
                      <h4 className="text-success">Kz {cliente.totalGasto.toLocaleString('pt-AO')}</h4>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Último Serviço</label>
                      <p className="mb-0">{cliente.ultimoServico}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Próxima Revisão</label>
                      <p className="mb-0">
                        <span className={`badge ${new Date(cliente.proximaRevisao.split('/').reverse().join('-')) < new Date() ? 'bg-danger' : 'bg-success'}`}>
                          {cliente.proximaRevisao}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="card h-100">
                  <div className="card-header bg-info text-white">
                    <h6 className="mb-0">
                      <i className="fa fa-car me-2"></i>
                      Veículos ({cliente.veiculos.length})
                    </h6>
                  </div>
                  <div className="card-body">
                    {cliente.veiculos.length > 0 ? (
                      <div className="list-group list-group-flush">
                        {cliente.veiculos.map((veiculo, index) => (
                          <div key={index} className="list-group-item px-0 py-2">
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h6 className="mb-1">{veiculo.marca} {veiculo.modelo}</h6>
                                <p className="mb-1 small text-muted">{veiculo.ano} • {veiculo.cor}</p>
                                <span className="badge bg-dark">{veiculo.placa}</span>
                              </div>
                              <small className="text-muted">{veiculo.combustivel}</small>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-muted py-4">
                        <i className="fa fa-car fa-3x mb-3 opacity-50"></i>
                        <p>Nenhum veículo cadastrado</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
              Fechar
            </button>
            <button type="button" className="btn btn-primary">
              <i className="fa fa-edit me-2"></i>
              Editar Cliente
            </button>
            <button type="button" className="btn btn-success">
              <i className="fa fa-plus me-2"></i>
              Novo Serviço
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}