import React from 'react';

interface ContaPagar {
  id: number;
  fornecedor: string;
  nifFornecedor: string;
  documento: string;
  descricao: string;
  valor: number;
  dataVencimento: string;
  status: 'pendente' | 'vencida' | 'paga';
  observacoes: string;
}

interface ContaPagarDetailsModalProps {
  conta: ContaPagar;
  onClose: () => void;
}

export default function ContaPagarDetailsModal({ conta, onClose }: ContaPagarDetailsModalProps) {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'paga': return 'bg-success';
      case 'vencida': return 'bg-danger';
      case 'pendente': return 'bg-warning';
      default: return 'bg-secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'paga': return 'Paga';
      case 'vencida': return 'Vencida';
      case 'pendente': return 'Pendente';
      default: return 'Indefinido';
    }
  };

  const getDiasAtraso = () => {
    if (conta.status !== 'vencida') return null;
    
    const hoje = new Date();
    const vencimento = new Date(conta.dataVencimento);
    const diasAtraso = Math.ceil((hoje.getTime() - vencimento.getTime()) / (1000 * 3600 * 24));
    
    return diasAtraso > 0 ? diasAtraso : null;
  };

  const diasAtraso = getDiasAtraso();

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fa fa-file-invoice me-2"></i>
              Detalhes da Conta a Pagar
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Informações da Conta</h6>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Documento:</strong>
                      </div>
                      <div className="col-sm-8">
                        <span className="text-primary fw-bold">{conta.documento}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Fornecedor:</strong>
                      </div>
                      <div className="col-sm-8">
                        {conta.fornecedor}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>NIF:</strong>
                      </div>
                      <div className="col-sm-8">
                        {conta.nifFornecedor}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Descrição:</strong>
                      </div>
                      <div className="col-sm-8">
                        {conta.descricao}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Valor:</strong>
                      </div>
                      <div className="col-sm-8">
                        <span className="fw-bold fs-5 text-danger">Kz {conta.valor.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Data de Vencimento:</strong>
                      </div>
                      <div className="col-sm-8">
                        {new Date(conta.dataVencimento).toLocaleDateString('pt-AO')}
                        {diasAtraso && (
                          <div className="text-danger mt-1">
                            <i className="fa fa-exclamation-triangle me-1"></i>
                            {diasAtraso} dias em atraso
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Status:</strong>
                      </div>
                      <div className="col-sm-8">
                        <span className={`badge ${getStatusBadge(conta.status)}`}>
                          {getStatusText(conta.status)}
                        </span>
                      </div>
                    </div>
                    {conta.observacoes && (
                      <div className="row">
                        <div className="col-sm-4">
                          <strong>Observações:</strong>
                        </div>
                        <div className="col-sm-8">
                          {conta.observacoes}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Resumo Financeiro</h6>
                  </div>
                  <div className="card-body">
                    <div className="text-center mb-3">
                      <i className={`fa fa-${conta.status === 'paga' ? 'check-circle text-success' : conta.status === 'vencida' ? 'exclamation-triangle text-danger' : 'clock text-warning'} fa-3x mb-2`}></i>
                      <h6 className={conta.status === 'paga' ? 'text-success' : conta.status === 'vencida' ? 'text-danger' : 'text-warning'}>
                        {getStatusText(conta.status).toUpperCase()}
                      </h6>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Valor Total:</span>
                        <span className="fw-bold">Kz {conta.valor.toFixed(2)}</span>
                      </div>
                    </div>

                    {conta.status !== 'paga' && (
                      <>
                        <div className="mb-3">
                          <div className="d-flex justify-content-between">
                            <span>Valor em Aberto:</span>
                            <span className="fw-bold text-danger">Kz {conta.valor.toFixed(2)}</span>
                          </div>
                        </div>

                        {diasAtraso && (
                          <div className="mb-3">
                            <div className="alert alert-danger p-2">
                              <small>
                                <i className="fa fa-exclamation-triangle me-1"></i>
                                Conta vencida há {diasAtraso} dias
                              </small>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {conta.status === 'paga' && (
                      <div className="mb-3">
                        <div className="alert alert-success p-2">
                          <small>
                            <i className="fa fa-check me-1"></i>
                            Conta quitada
                          </small>
                        </div>
                      </div>
                    )}

                    <div className="mt-3">
                      <small className="text-muted">
                        <i className="fa fa-info-circle me-1"></i>
                        Documento: {conta.documento}
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
            <button type="button" className="btn btn-primary">
              <i className="fa fa-print me-2"></i>
              Imprimir
            </button>
            {conta.status !== 'paga' && (
              <button type="button" className="btn btn-success">
                <i className="fa fa-credit-card me-2"></i>
                Pagar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}