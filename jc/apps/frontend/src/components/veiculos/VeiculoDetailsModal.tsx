import React from 'react';

interface Veiculo {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  cor: string;
  combustivel: string;
  clienteId: number;
  clienteNome: string;
}

interface VeiculoDetailsModalProps {
  isOpen: boolean;
  veiculo: Veiculo | null;
  onClose: () => void;
}

export default function VeiculoDetailsModal({ isOpen, veiculo, onClose }: VeiculoDetailsModalProps) {
  if (!isOpen || !veiculo) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fa fa-car me-2"></i>
              Detalhes do Veículo
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">
                      <i className="fa fa-info-circle me-2"></i>
                      Informações do Veículo
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label fw-bold text-muted">Marca/Modelo</label>
                      <div className="fs-5 fw-bold">{veiculo.marca} {veiculo.modelo}</div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-6">
                        <label className="form-label fw-bold text-muted">Matrícula</label>
                        <div className="badge bg-dark fs-6 p-2">{veiculo.placa}</div>
                      </div>
                      <div className="col-6">
                        <label className="form-label fw-bold text-muted">Ano</label>
                        <div className="fs-6">{veiculo.ano}</div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-6">
                        <label className="form-label fw-bold text-muted">Cor</label>
                        <div>
                          <span className="badge bg-secondary fs-6 p-2">{veiculo.cor}</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <label className="form-label fw-bold text-muted">Combustível</label>
                        <div>
                          <span className={`badge fs-6 p-2 ${
                            veiculo.combustivel === 'Gasolina' ? 'bg-danger' : 
                            veiculo.combustivel === 'Diesel' ? 'bg-warning' : 'bg-success'
                          }`}>
                            {veiculo.combustivel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">
                      <i className="fa fa-user me-2"></i>
                      Proprietário
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label fw-bold text-muted">Nome</label>
                      <div className="fs-5 fw-bold">{veiculo.clienteNome}</div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold text-muted">ID Cliente</label>
                      <div className="badge bg-info fs-6 p-2">#{veiculo.clienteId}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card mt-3">
              <div className="card-header bg-light">
                <h6 className="mb-0">
                  <i className="fa fa-chart-line me-2"></i>
                  Estatísticas Rápidas
                </h6>
              </div>
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-3">
                    <div className="border-end">
                      <div className="fs-4 fw-bold text-primary">8</div>
                      <small className="text-muted">Serviços</small>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="border-end">
                      <div className="fs-4 fw-bold text-success">Kz 45.000</div>
                      <small className="text-muted">Total Gasto</small>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="border-end">
                      <div className="fs-4 fw-bold text-warning">15/03</div>
                      <small className="text-muted">Próxima Revisão</small>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="fs-4 fw-bold text-info">Ativo</div>
                    <small className="text-muted">Status</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
              <i className="fa fa-times me-2"></i>
              Fechar
            </button>
            <button type="button" className="btn btn-primary">
              <i className="fa fa-edit me-2"></i>
              Editar Veículo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}