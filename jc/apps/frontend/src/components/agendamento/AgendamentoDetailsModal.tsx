import React from 'react';

interface Agendamento {
  id: number;
  cliente: string;
  veiculo: string;
  servico: string;
  data: string;
  hora: string;
  mecanico: string;
  status: string;
  observacoes: string;
}

interface AgendamentoDetailsModalProps {
  agendamento: Agendamento;
  onClose: () => void;
}

export default function AgendamentoDetailsModal({ agendamento, onClose }: AgendamentoDetailsModalProps) {
  const getStatusBadge = (status: string) => {
    const colors = {
      'confirmado': 'bg-success',
      'pendente': 'bg-warning',
      'em_andamento': 'bg-info',
      'concluido': 'bg-primary',
      'cancelado': 'bg-danger'
    };
    const texts = {
      'confirmado': 'Confirmado',
      'pendente': 'Pendente',
      'em_andamento': 'Em Andamento',
      'concluido': 'Concluído',
      'cancelado': 'Cancelado'
    };
    return <span className={`badge ${colors[status as keyof typeof colors] || 'bg-secondary'}`}>
      {texts[status as keyof typeof texts] || 'Indefinido'}
    </span>;
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fa fa-calendar-alt me-2"></i>
              Detalhes do Agendamento
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-8">
                <div className="mb-4">
                  <h6 className="text-primary border-bottom pb-2 mb-3">
                    <i className="fa fa-user me-2"></i>
                    Informações do Cliente
                  </h6>
                  <div className="row">
                    <div className="col-md-6">
                      <strong>Cliente:</strong><br/>
                      <span className="text-primary fs-5">{agendamento.cliente}</span>
                    </div>
                    <div className="col-md-6">
                      <strong>Veículo:</strong><br/>
                      <span className="text-info">{agendamento.veiculo}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="text-primary border-bottom pb-2 mb-3">
                    <i className="fa fa-wrench me-2"></i>
                    Detalhes do Serviço
                  </h6>
                  <div className="row">
                    <div className="col-md-6">
                      <strong>Serviço:</strong><br/>
                      <span className="fw-bold">{agendamento.servico}</span>
                    </div>
                    <div className="col-md-6">
                      <strong>Mecânico Responsável:</strong><br/>
                      <span className="text-success">{agendamento.mecanico}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="text-primary border-bottom pb-2 mb-3">
                    <i className="fa fa-clock me-2"></i>
                    Agendamento
                  </h6>
                  <div className="row">
                    <div className="col-md-6">
                      <strong>Data:</strong><br/>
                      <span className="fw-bold">{new Date(agendamento.data).toLocaleDateString('pt-AO')}</span>
                    </div>
                    <div className="col-md-6">
                      <strong>Horário:</strong><br/>
                      <span className="fw-bold">{agendamento.hora}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-0">
                  <h6 className="text-primary border-bottom pb-2 mb-3">
                    <i className="fa fa-comment me-2"></i>
                    Observações
                  </h6>
                  <div className="card bg-light">
                    <div className="card-body">
                      <p className="mb-0">{agendamento.observacoes || 'Nenhuma observação registrada.'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">
                      <i className="fa fa-info-circle me-2"></i>
                      Status do Agendamento
                    </h6>
                  </div>
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <i className="fa fa-calendar-check fa-3x text-primary mb-2"></i>
                      <h5 className="text-primary">#{agendamento.id}</h5>
                    </div>
                    
                    <div className="mb-3">
                      {getStatusBadge(agendamento.status)}
                    </div>

                    <div className="border-top pt-3">
                      <div className="row text-center">
                        <div className="col-6 border-end">
                          <i className="fa fa-calendar text-muted"></i>
                          <div className="small text-muted">Data</div>
                          <div className="fw-bold">{new Date(agendamento.data).getDate()}</div>
                        </div>
                        <div className="col-6">
                          <i className="fa fa-clock text-muted"></i>
                          <div className="small text-muted">Hora</div>
                          <div className="fw-bold">{agendamento.hora}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card border-0 shadow-sm mt-3">
                  <div className="card-header bg-warning text-white">
                    <h6 className="mb-0">
                      <i className="fa fa-exclamation-triangle me-2"></i>
                      Ações Rápidas
                    </h6>
                  </div>
                  <div className="card-body p-2">
                    <div className="d-grid gap-2">
                      {agendamento.status === 'pendente' && (
                        <button className="btn btn-success btn-sm">
                          <i className="fa fa-check me-2"></i>
                          Confirmar
                        </button>
                      )}
                      {agendamento.status !== 'cancelado' && agendamento.status !== 'concluido' && (
                        <button className="btn btn-warning btn-sm">
                          <i className="fa fa-edit me-2"></i>
                          Editar
                        </button>
                      )}
                      {agendamento.status !== 'cancelado' && agendamento.status !== 'concluido' && (
                        <button className="btn btn-outline-danger btn-sm">
                          <i className="fa fa-times me-2"></i>
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              <i className="fa fa-times me-2"></i>
              Fechar
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