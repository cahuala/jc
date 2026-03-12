import React from 'react';

interface Movimentacao {
  id: number;
  data: string;
  tipo: 'entrada' | 'saida';
  categoria: string;
  descricao: string;
  valor: number;
  origem: string;
  documento: string;
  saldoAnterior: number;
  saldoAtual: number;
}

interface MovimentacaoDetailsModalProps {
  movimentacao: Movimentacao;
  onClose: () => void;
}

export default function MovimentacaoDetailsModal({ movimentacao, onClose }: MovimentacaoDetailsModalProps) {
  const getTipoBadge = (tipo: string) => {
    return tipo === 'entrada' ? 'bg-success' : 'bg-danger';
  };

  const getTipoText = (tipo: string) => {
    return tipo === 'entrada' ? 'Entrada' : 'Saída';
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('pt-AO'),
      time: date.toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const dateTime = formatDateTime(movimentacao.data);

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fa fa-eye me-2"></i>
              Detalhes da Movimentação
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Informações da Movimentação</h6>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Documento:</strong>
                      </div>
                      <div className="col-sm-8">
                        <span className="text-primary fw-bold">{movimentacao.documento}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Data/Hora:</strong>
                      </div>
                      <div className="col-sm-8">
                        {dateTime.date} às {dateTime.time}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Tipo:</strong>
                      </div>
                      <div className="col-sm-8">
                        <span className={`badge ${getTipoBadge(movimentacao.tipo)}`}>
                          {getTipoText(movimentacao.tipo)}
                        </span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Categoria:</strong>
                      </div>
                      <div className="col-sm-8">
                        <span className="badge bg-info">{movimentacao.categoria}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Descrição:</strong>
                      </div>
                      <div className="col-sm-8">
                        {movimentacao.descricao}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Valor:</strong>
                      </div>
                      <div className="col-sm-8">
                        <span className={`fw-bold fs-5 ${movimentacao.tipo === 'entrada' ? 'text-success' : 'text-danger'}`}>
                          {movimentacao.tipo === 'entrada' ? '+' : '-'} Kz {movimentacao.valor.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <strong>Origem:</strong>
                      </div>
                      <div className="col-sm-8">
                        <span className="badge bg-secondary">{movimentacao.origem}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Impacto no Saldo</h6>
                  </div>
                  <div className="card-body">
                    <div className="text-center mb-3">
                      <i className={`fa fa-${movimentacao.tipo === 'entrada' ? 'arrow-up text-success' : 'arrow-down text-danger'} fa-3x mb-2`}></i>
                      <h6 className={movimentacao.tipo === 'entrada' ? 'text-success' : 'text-danger'}>
                        {getTipoText(movimentacao.tipo).toUpperCase()}
                      </h6>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Saldo Anterior:</span>
                        <span className="fw-bold">Kz {movimentacao.saldoAnterior.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Movimentação:</span>
                        <span className={`fw-bold ${movimentacao.tipo === 'entrada' ? 'text-success' : 'text-danger'}`}>
                          {movimentacao.tipo === 'entrada' ? '+' : '-'} Kz {movimentacao.valor.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <hr />

                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">Saldo Atual:</span>
                        <span className="fw-bold fs-5 text-primary">
                          Kz {movimentacao.saldoAtual.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className={`alert ${movimentacao.tipo === 'entrada' ? 'alert-success' : 'alert-danger'} p-2`}>
                        <small>
                          <i className={`fa fa-${movimentacao.tipo === 'entrada' ? 'plus' : 'minus'} me-1`}></i>
                          {movimentacao.tipo === 'entrada' ? 'Entrada registrada' : 'Saída registrada'}
                        </small>
                      </div>
                    </div>

                    <div className="mt-3">
                      <small className="text-muted">
                        <i className="fa fa-info-circle me-1"></i>
                        ID: #{movimentacao.id}
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
              <i className="fa fa-receipt me-2"></i>
              Comprovante
            </button>
            <button type="button" className="btn btn-primary">
              <i className="fa fa-print me-2"></i>
              Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}