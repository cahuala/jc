import React, { useState } from 'react';

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

interface NovoServicoModalProps {
  isOpen: boolean;
  veiculo: Veiculo | null;
  onSave: (servico: any) => void;
  onClose: () => void;
}

export default function NovoServicoModal({ isOpen, veiculo, onSave, onClose }: NovoServicoModalProps) {
  const [formData, setFormData] = useState({
    tipoServico: 'manutencao',
    servicos: [] as string[],
    descricao: '',
    dataAgendamento: '',
    horaAgendamento: '',
    tecnicoResponsavel: '',
    prioridade: 'normal',
    observacoes: '',
    valorEstimado: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const servicosDisponiveis = {
    manutencao: [
      'Troca de óleo',
      'Filtro de ar',
      'Filtro de óleo',
      'Filtro de combustível',
      'Revisão geral',
      'Alinhamento',
      'Balanceamento',
      'Calibragem de pneus'
    ],
    reparo: [
      'Reparo de freios',
      'Troca de pastilhas',
      'Reparo de suspensão',
      'Reparo elétrico',
      'Reparo de motor',
      'Troca de embreagem',
      'Reparo de ar condicionado',
      'Reparo de direção'
    ],
    diagnostico: [
      'Diagnóstico eletrônico',
      'Teste de bateria',
      'Verificação de motor',
      'Análise de ruídos',
      'Inspeção visual',
      'Teste de freios',
      'Verificação de suspensão'
    ]
  };

  const tecnicos = [
    'João Mecânico',
    'Carlos Silva',
    'Maria Santos',
    'Pedro Costa',
    'Ana Oliveira',
    'Roberto Lima'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.servicos.length === 0) {
      newErrors.servicos = 'Selecione pelo menos um serviço';
    }
    if (!formData.dataAgendamento) {
      newErrors.dataAgendamento = 'Data é obrigatória';
    }
    if (!formData.horaAgendamento) {
      newErrors.horaAgendamento = 'Horário é obrigatório';
    }
    if (!formData.tecnicoResponsavel) {
      newErrors.tecnicoResponsavel = 'Selecione um técnico';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleServicoToggle = (servico: string) => {
    const newServicos = formData.servicos.includes(servico)
      ? formData.servicos.filter(s => s !== servico)
      : [...formData.servicos, servico];
    
    setFormData({ ...formData, servicos: newServicos });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        veiculoId: veiculo?.id,
        clienteId: veiculo?.clienteId,
        status: 'agendado'
      });
    }
  };

  const calcularValorEstimado = () => {
    const valores: Record<string, number> = {
      'Troca de óleo': 150,
      'Filtro de ar': 80,
      'Filtro de óleo': 60,
      'Revisão geral': 300,
      'Alinhamento': 120,
      'Balanceamento': 100,
      'Reparo de freios': 250,
      'Diagnóstico eletrônico': 80
    };

    const total = formData.servicos.reduce((sum, servico) => {
      return sum + (valores[servico] || 100);
    }, 0);

    return total;
  };

  if (!isOpen || !veiculo) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">
              <i className="fa fa-wrench me-2"></i>
              Novo Serviço - {veiculo.marca} {veiculo.modelo}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-8">
                  <div className="card mb-3">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">
                        <i className="fa fa-car me-2"></i>
                        Informações do Veículo
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <strong>Veículo:</strong> {veiculo.marca} {veiculo.modelo} ({veiculo.ano})
                        </div>
                        <div className="col-md-3">
                          <strong>Matrícula:</strong> <span className="badge bg-dark">{veiculo.placa}</span>
                        </div>
                        <div className="col-md-3">
                          <strong>Proprietário:</strong> {veiculo.clienteNome}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card mb-3">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">
                        <i className="fa fa-cogs me-2"></i>
                        Tipo de Serviço
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-12">
                          <div className="btn-group w-100" role="group">
                            <input
                              type="radio"
                              className="btn-check"
                              name="tipoServico"
                              id="manutencao"
                              checked={formData.tipoServico === 'manutencao'}
                              onChange={() => setFormData({ ...formData, tipoServico: 'manutencao', servicos: [] })}
                            />
                            <label className="btn btn-outline-primary" htmlFor="manutencao">
                              <i className="fa fa-tools me-2"></i>
                              Manutenção Preventiva
                            </label>

                            <input
                              type="radio"
                              className="btn-check"
                              name="tipoServico"
                              id="reparo"
                              checked={formData.tipoServico === 'reparo'}
                              onChange={() => setFormData({ ...formData, tipoServico: 'reparo', servicos: [] })}
                            />
                            <label className="btn btn-outline-warning" htmlFor="reparo">
                              <i className="fa fa-wrench me-2"></i>
                              Reparo
                            </label>

                            <input
                              type="radio"
                              className="btn-check"
                              name="tipoServico"
                              id="diagnostico"
                              checked={formData.tipoServico === 'diagnostico'}
                              onChange={() => setFormData({ ...formData, tipoServico: 'diagnostico', servicos: [] })}
                            />
                            <label className="btn btn-outline-info" htmlFor="diagnostico">
                              <i className="fa fa-search me-2"></i>
                              Diagnóstico
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12">
                          <label className="form-label fw-bold">
                            Serviços <span className="text-danger">*</span>
                          </label>
                          <div className={`border rounded p-3 ${errors.servicos ? 'border-danger' : ''}`}>
                            <div className="row">
                              {servicosDisponiveis[formData.tipoServico as keyof typeof servicosDisponiveis].map((servico) => (
                                <div key={servico} className="col-md-6 mb-2">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id={servico}
                                      checked={formData.servicos.includes(servico)}
                                      onChange={() => handleServicoToggle(servico)}
                                    />
                                    <label className="form-check-label" htmlFor={servico}>
                                      {servico}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          {errors.servicos && <div className="text-danger small mt-1">{errors.servicos}</div>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">
                        <i className="fa fa-calendar me-2"></i>
                        Agendamento e Detalhes
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label className="form-label fw-bold">
                            Data <span className="text-danger">*</span>
                          </label>
                          <input
                            type="date"
                            className={`form-control ${errors.dataAgendamento ? 'is-invalid' : ''}`}
                            value={formData.dataAgendamento}
                            onChange={(e) => setFormData({ ...formData, dataAgendamento: e.target.value })}
                            min={new Date().toISOString().split('T')[0]}
                          />
                          {errors.dataAgendamento && <div className="invalid-feedback">{errors.dataAgendamento}</div>}
                        </div>
                        <div className="col-md-4">
                          <label className="form-label fw-bold">
                            Horário <span className="text-danger">*</span>
                          </label>
                          <input
                            type="time"
                            className={`form-control ${errors.horaAgendamento ? 'is-invalid' : ''}`}
                            value={formData.horaAgendamento}
                            onChange={(e) => setFormData({ ...formData, horaAgendamento: e.target.value })}
                          />
                          {errors.horaAgendamento && <div className="invalid-feedback">{errors.horaAgendamento}</div>}
                        </div>
                        <div className="col-md-4">
                          <label className="form-label fw-bold">Prioridade</label>
                          <select
                            className="form-select"
                            value={formData.prioridade}
                            onChange={(e) => setFormData({ ...formData, prioridade: e.target.value })}
                          >
                            <option value="baixa">Baixa</option>
                            <option value="normal">Normal</option>
                            <option value="alta">Alta</option>
                            <option value="urgente">Urgente</option>
                          </select>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label fw-bold">
                            Técnico Responsável <span className="text-danger">*</span>
                          </label>
                          <select
                            className={`form-select ${errors.tecnicoResponsavel ? 'is-invalid' : ''}`}
                            value={formData.tecnicoResponsavel}
                            onChange={(e) => setFormData({ ...formData, tecnicoResponsavel: e.target.value })}
                          >
                            <option value="">Selecione um técnico</option>
                            {tecnicos.map(tecnico => (
                              <option key={tecnico} value={tecnico}>{tecnico}</option>
                            ))}
                          </select>
                          {errors.tecnicoResponsavel && <div className="invalid-feedback">{errors.tecnicoResponsavel}</div>}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-bold">Valor Estimado</label>
                          <div className="input-group">
                            <span className="input-group-text">Kz</span>
                            <input
                              type="number"
                              className="form-control"
                              value={calcularValorEstimado()}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold">Descrição Adicional</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          value={formData.descricao}
                          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                          placeholder="Descreva detalhes específicos do problema ou serviço..."
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold">Observações</label>
                        <textarea
                          className="form-control"
                          rows={2}
                          value={formData.observacoes}
                          onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                          placeholder="Observações internas, instruções especiais..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">
                        <i className="fa fa-eye me-2"></i>
                        Resumo do Serviço
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <strong>Tipo:</strong>
                        <div className={`badge ms-2 ${
                          formData.tipoServico === 'manutencao' ? 'bg-primary' :
                          formData.tipoServico === 'reparo' ? 'bg-warning' : 'bg-info'
                        }`}>
                          {formData.tipoServico === 'manutencao' ? 'Manutenção' :
                           formData.tipoServico === 'reparo' ? 'Reparo' : 'Diagnóstico'}
                        </div>
                      </div>

                      <div className="mb-3">
                        <strong>Serviços Selecionados:</strong>
                        <div className="mt-2">
                          {formData.servicos.length === 0 ? (
                            <small className="text-muted">Nenhum serviço selecionado</small>
                          ) : (
                            formData.servicos.map((servico, index) => (
                              <span key={index} className="badge bg-success me-1 mb-1 d-block text-start">
                                {servico}
                              </span>
                            ))
                          )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <strong>Agendamento:</strong>
                        <div>
                          {formData.dataAgendamento && formData.horaAgendamento ? (
                            <>
                              <div>{new Date(formData.dataAgendamento).toLocaleDateString('pt-AO')}</div>
                              <div>{formData.horaAgendamento}</div>
                            </>
                          ) : (
                            <small className="text-muted">Não agendado</small>
                          )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <strong>Técnico:</strong>
                        <div>{formData.tecnicoResponsavel || <small className="text-muted">Não selecionado</small>}</div>
                      </div>

                      <div className="mb-3">
                        <strong>Prioridade:</strong>
                        <div>
                          <span className={`badge ${
                            formData.prioridade === 'urgente' ? 'bg-danger' :
                            formData.prioridade === 'alta' ? 'bg-warning' :
                            formData.prioridade === 'normal' ? 'bg-primary' : 'bg-secondary'
                          }`}>
                            {formData.prioridade.charAt(0).toUpperCase() + formData.prioridade.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <strong>Valor Estimado:</strong>
                        <div className="fs-4 fw-bold text-success">
                          Kz {calcularValorEstimado().toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                <i className="fa fa-times me-2"></i>
                Cancelar
              </button>
              <button type="submit" className="btn btn-success">
                <i className="fa fa-save me-2"></i>
                Agendar Serviço
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}