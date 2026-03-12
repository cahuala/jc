import React, { useState } from 'react';

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

interface AgendamentoEditModalProps {
  agendamento: Agendamento | null;
  onSave: (agendamento: Agendamento) => void;
  onClose: () => void;
}

export default function AgendamentoEditModal({ agendamento, onSave, onClose }: AgendamentoEditModalProps) {
  const [formData, setFormData] = useState({
    cliente: agendamento?.cliente || '',
    veiculo: agendamento?.veiculo || '',
    servico: agendamento?.servico || '',
    data: agendamento?.data || '',
    hora: agendamento?.hora || '',
    mecanico: agendamento?.mecanico || '',
    status: agendamento?.status || 'pendente',
    observacoes: agendamento?.observacoes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const savedAgendamento: Agendamento = {
      id: agendamento?.id || Date.now(),
      ...formData
    };
    onSave(savedAgendamento);
  };

  const clientes = ['João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Oliveira'];
  const veiculos = ['Toyota Corolla - ABC-1234', 'Honda Civic - XYZ-5678', 'Nissan Sentra - DEF-9012'];
  const servicos = ['Revisão Completa', 'Troca de Óleo', 'Alinhamento', 'Balanceamento', 'Diagnóstico'];
  const mecanicos = ['António Mendes', 'Manuel Costa', 'José Ferreira', 'Carlos Silva'];

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fa fa-calendar-plus me-2"></i>
              {agendamento ? 'Editar Agendamento' : 'Novo Agendamento'}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-0">
              <div className="row g-0">
                <div className="col-md-8 p-4">
                  <div className="mb-4">
                    <h6 className="text-primary border-bottom pb-2 mb-3">
                      <i className="fa fa-user me-2"></i>
                      Informações do Cliente
                    </h6>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Cliente *</label>
                        <div className="input-group">
                          <span className="input-group-text"><i className="fa fa-user"></i></span>
                          <select 
                            className="form-select"
                            value={formData.cliente}
                            onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                            required
                          >
                            <option value="">Selecione o cliente</option>
                            {clientes.map(cliente => (
                              <option key={cliente} value={cliente}>{cliente}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Veículo *</label>
                        <div className="input-group">
                          <span className="input-group-text"><i className="fa fa-car"></i></span>
                          <select 
                            className="form-select"
                            value={formData.veiculo}
                            onChange={(e) => setFormData({...formData, veiculo: e.target.value})}
                            required
                          >
                            <option value="">Selecione o veículo</option>
                            {veiculos.map(veiculo => (
                              <option key={veiculo} value={veiculo}>{veiculo}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h6 className="text-primary border-bottom pb-2 mb-3">
                      <i className="fa fa-wrench me-2"></i>
                      Detalhes do Serviço
                    </h6>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Tipo de Serviço *</label>
                        <div className="input-group">
                          <span className="input-group-text"><i className="fa fa-wrench"></i></span>
                          <select 
                            className="form-select"
                            value={formData.servico}
                            onChange={(e) => setFormData({...formData, servico: e.target.value})}
                            required
                          >
                            <option value="">Selecione o serviço</option>
                            {servicos.map(servico => (
                              <option key={servico} value={servico}>{servico}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Mecânico Responsável *</label>
                        <div className="input-group">
                          <span className="input-group-text"><i className="fa fa-user-cog"></i></span>
                          <select 
                            className="form-select"
                            value={formData.mecanico}
                            onChange={(e) => setFormData({...formData, mecanico: e.target.value})}
                            required
                          >
                            <option value="">Selecione o mecânico</option>
                            {mecanicos.map(mecanico => (
                              <option key={mecanico} value={mecanico}>{mecanico}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h6 className="text-primary border-bottom pb-2 mb-3">
                      <i className="fa fa-clock me-2"></i>
                      Data e Horário
                    </h6>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label fw-bold">Data *</label>
                        <div className="input-group">
                          <span className="input-group-text"><i className="fa fa-calendar"></i></span>
                          <input 
                            type="date"
                            className="form-control"
                            value={formData.data}
                            onChange={(e) => setFormData({...formData, data: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label fw-bold">Horário *</label>
                        <div className="input-group">
                          <span className="input-group-text"><i className="fa fa-clock"></i></span>
                          <input 
                            type="time"
                            className="form-control"
                            value={formData.hora}
                            onChange={(e) => setFormData({...formData, hora: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label fw-bold">Status</label>
                        <div className="input-group">
                          <span className="input-group-text"><i className="fa fa-flag"></i></span>
                          <select 
                            className="form-select"
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                          >
                            <option value="pendente">Pendente</option>
                            <option value="confirmado">Confirmado</option>
                            <option value="em_andamento">Em Andamento</option>
                            <option value="concluido">Concluído</option>
                            <option value="cancelado">Cancelado</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-0">
                    <h6 className="text-primary border-bottom pb-2 mb-3">
                      <i className="fa fa-comment me-2"></i>
                      Observações
                    </h6>
                    <div className="input-group">
                      <span className="input-group-text"><i className="fa fa-comment"></i></span>
                      <textarea 
                        className="form-control"
                        rows={3}
                        value={formData.observacoes}
                        onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                        placeholder="Observações adicionais sobre o agendamento..."
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-4 bg-light border-start">
                  <div className="p-4 h-100">
                    <h6 className="text-primary mb-3">
                      <i className="fa fa-eye me-2"></i>
                      Preview do Agendamento
                    </h6>
                    
                    <div className="card border-0 shadow-sm mb-3">
                      <div className="card-body p-3">
                        <div className="text-center mb-3">
                          <i className="fa fa-calendar-check fa-3x text-primary mb-2"></i>
                          <h6 className="text-primary">Agendamento #{agendamento?.id || 'Novo'}</h6>
                        </div>
                        
                        <div className="mb-2">
                          <strong>Cliente:</strong><br/>
                          <span className="text-primary">{formData.cliente || 'Não selecionado'}</span>
                        </div>
                        <div className="mb-2">
                          <strong>Serviço:</strong><br/>
                          <span className="text-info">{formData.servico || 'Não selecionado'}</span>
                        </div>
                        <div className="mb-2">
                          <strong>Data/Hora:</strong><br/>
                          <span className="fw-bold">
                            {formData.data ? new Date(formData.data).toLocaleDateString('pt-AO') : '--/--/----'} às {formData.hora || '--:--'}
                          </span>
                        </div>
                        <div className="mb-0">
                          <strong>Mecânico:</strong><br/>
                          <span className="text-success">{formData.mecanico || 'Não selecionado'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="alert alert-info py-2">
                      <i className="fa fa-info-circle me-2"></i>
                      <small>
                        <strong>Dica:</strong><br/>
                        Preencha todos os campos obrigatórios (*) para salvar o agendamento.
                      </small>
                    </div>

                    <div className="card border-0 bg-white">
                      <div className="card-header bg-primary text-white py-2">
                        <h6 className="mb-0">
                          <i className="fa fa-chart-bar me-2"></i>
                          Horários Disponíveis
                        </h6>
                      </div>
                      <div className="card-body p-3">
                        <div className="row text-center">
                          <div className="col-6">
                            <div className="border-end">
                              <h6 className="text-success mb-0">8</h6>
                              <small className="text-muted">Manhã</small>
                            </div>
                          </div>
                          <div className="col-6">
                            <h6 className="text-warning mb-0">5</h6>
                            <small className="text-muted">Tarde</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer bg-light">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                <i className="fa fa-times me-2"></i>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-save me-2"></i>
                {agendamento ? 'Atualizar' : 'Criar'} Agendamento
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}