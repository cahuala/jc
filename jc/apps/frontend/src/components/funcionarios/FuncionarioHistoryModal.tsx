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

interface HistoricoItem {
  id: number;
  data: string;
  tipo: 'admissao' | 'promocao' | 'transferencia' | 'ferias' | 'licenca' | 'advertencia' | 'elogio' | 'treinamento';
  descricao: string;
  observacoes?: string;
  usuario: string;
}

interface FuncionarioHistoryModalProps {
  funcionario: Funcionario;
  onClose: () => void;
}

export default function FuncionarioHistoryModal({ funcionario, onClose }: FuncionarioHistoryModalProps) {
  // Dados de exemplo do histórico
  const historico: HistoricoItem[] = [
    {
      id: 1,
      data: '2024-01-15T09:00:00',
      tipo: 'elogio',
      descricao: 'Elogio por excelente atendimento ao cliente',
      observacoes: 'Cliente João Silva elogiou o atendimento prestado',
      usuario: 'Supervisor Carlos'
    },
    {
      id: 2,
      data: '2023-12-01T14:30:00',
      tipo: 'treinamento',
      descricao: 'Participação em treinamento de novos equipamentos',
      observacoes: 'Treinamento sobre sistema de diagnóstico automotivo',
      usuario: 'RH Maria Santos'
    },
    {
      id: 3,
      data: '2023-08-15T08:00:00',
      tipo: 'ferias',
      descricao: 'Período de férias - 30 dias',
      observacoes: 'Férias regulamentares de 30 dias',
      usuario: 'RH Maria Santos'
    },
    {
      id: 4,
      data: '2023-03-10T10:15:00',
      tipo: 'promocao',
      descricao: 'Promoção para Mecânico Sênior',
      observacoes: 'Promoção devido ao excelente desempenho e experiência',
      usuario: 'Gerente Pedro'
    },
    {
      id: 5,
      data: funcionario.dataAdmissao + 'T08:00:00',
      tipo: 'admissao',
      descricao: 'Admissão na empresa',
      observacoes: `Contratado como ${funcionario.cargo}`,
      usuario: 'RH Ana Costa'
    }
  ];

  const getTipoIcon = (tipo: string) => {
    const icons = {
      'admissao': 'fa-user-plus text-success',
      'promocao': 'fa-arrow-up text-primary',
      'transferencia': 'fa-exchange-alt text-info',
      'ferias': 'fa-calendar-alt text-warning',
      'licenca': 'fa-clock text-secondary',
      'advertencia': 'fa-exclamation-triangle text-danger',
      'elogio': 'fa-star text-warning',
      'treinamento': 'fa-graduation-cap text-info'
    };
    return icons[tipo as keyof typeof icons] || 'fa-circle text-secondary';
  };

  const getTipoText = (tipo: string) => {
    const texts = {
      'admissao': 'Admissão',
      'promocao': 'Promoção',
      'transferencia': 'Transferência',
      'ferias': 'Férias',
      'licenca': 'Licença',
      'advertencia': 'Advertência',
      'elogio': 'Elogio',
      'treinamento': 'Treinamento'
    };
    return texts[tipo as keyof typeof texts] || 'Evento';
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('pt-AO'),
      time: date.toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fa fa-history me-2"></i>
              Histórico do Funcionário - {funcionario.nome}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Resumo do Funcionário</h6>
                  </div>
                  <div className="card-body">
                    <div className="text-center mb-3">
                      <div className="avatar avatar-lg mx-auto mb-2">
                        <div className="avatar-initial bg-primary rounded-circle fs-3">
                          {funcionario.nome.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <h6 className="fw-bold">{funcionario.nome}</h6>
                      <p className="text-muted mb-1">{funcionario.cargo}</p>
                      <span className="badge bg-info">{funcionario.departamento}</span>
                    </div>

                    <div className="mb-2">
                      <small className="text-muted">Data de Admissão:</small>
                      <div className="fw-bold">{new Date(funcionario.dataAdmissao).toLocaleDateString('pt-AO')}</div>
                    </div>

                    <div className="mb-2">
                      <small className="text-muted">Email:</small>
                      <div className="fw-bold">{funcionario.email}</div>
                    </div>

                    <div className="mb-2">
                      <small className="text-muted">Telefone:</small>
                      <div className="fw-bold">{funcionario.telefone}</div>
                    </div>

                    <div className="mb-2">
                      <small className="text-muted">NIF:</small>
                      <div className="fw-bold">{funcionario.nif}</div>
                    </div>
                  </div>
                </div>

                <div className="card mt-3">
                  <div className="card-header">
                    <h6 className="mb-0">Estatísticas</h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Total de Eventos:</span>
                        <span className="fw-bold">{historico.length}</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Elogios:</span>
                        <span className="fw-bold text-success">{historico.filter(h => h.tipo === 'elogio').length}</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Treinamentos:</span>
                        <span className="fw-bold text-info">{historico.filter(h => h.tipo === 'treinamento').length}</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Promoções:</span>
                        <span className="fw-bold text-primary">{historico.filter(h => h.tipo === 'promocao').length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Linha do Tempo</h6>
                  </div>
                  <div className="card-body">
                    <div className="timeline">
                      {historico.map((item, index) => {
                        const dateTime = formatDateTime(item.data);
                        return (
                          <div key={item.id} className="timeline-item">
                            <div className="timeline-marker">
                              <i className={`fa ${getTipoIcon(item.tipo)}`}></i>
                            </div>
                            <div className="timeline-content">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                  <h6 className="mb-1">{getTipoText(item.tipo)}</h6>
                                  <p className="mb-1">{item.descricao}</p>
                                  {item.observacoes && (
                                    <small className="text-muted">{item.observacoes}</small>
                                  )}
                                </div>
                                <div className="text-end">
                                  <small className="text-muted d-block">{dateTime.date}</small>
                                  <small className="text-muted">{dateTime.time}</small>
                                </div>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <small className="text-muted">
                                  <i className="fa fa-user me-1"></i>
                                  {item.usuario}
                                </small>
                                <span className={`badge badge-sm ${
                                  item.tipo === 'elogio' ? 'bg-success' :
                                  item.tipo === 'promocao' ? 'bg-primary' :
                                  item.tipo === 'treinamento' ? 'bg-info' :
                                  item.tipo === 'ferias' ? 'bg-warning' :
                                  item.tipo === 'advertencia' ? 'bg-danger' :
                                  'bg-secondary'
                                }`}>
                                  {getTipoText(item.tipo)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
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
              <i className="fa fa-plus me-2"></i>
              Adicionar Evento
            </button>
            <button type="button" className="btn btn-primary">
              <i className="fa fa-print me-2"></i>
              Imprimir Histórico
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .timeline {
          position: relative;
          padding-left: 30px;
        }
        
        .timeline::before {
          content: '';
          position: absolute;
          left: 15px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #dee2e6;
        }
        
        .timeline-item {
          position: relative;
          margin-bottom: 30px;
        }
        
        .timeline-marker {
          position: absolute;
          left: -22px;
          top: 0;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: white;
          border: 2px solid #dee2e6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }
        
        .timeline-content {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          border-left: 3px solid #007bff;
        }
      `}</style>
    </div>
  );
}