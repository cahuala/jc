import React, { useState } from 'react';

interface Cliente {
  id: number;
  nome: string;
  veiculos: any[];
}

interface NovoServicoModalProps {
  isOpen: boolean;
  cliente: Cliente | null;
  onSave: (servico: any) => void;
  onClose: () => void;
}

export default function NovoServicoModal({ isOpen, cliente, onSave, onClose }: NovoServicoModalProps) {
  const [formData, setFormData] = useState({
    veiculoId: '',
    tipoServico: '',
    descricao: '',
    dataAgendamento: '',
    horaAgendamento: '',
    mecanico: '',
    prioridade: 'media',
    observacoes: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tiposServico = [
    'Troca de Óleo',
    'Revisão Completa',
    'Alinhamento e Balanceamento',
    'Troca de Pastilhas',
    'Diagnóstico Elétrico',
    'Ar Condicionado',
    'Suspensão',
    'Freios',
    'Motor',
    'Outros'
  ];

  const mecanicos = [
    'António Mendes',
    'Manuel Costa',
    'José Ferreira',
    'Carlos Santos',
    'Pedro Lima'
  ];

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.veiculoId) {
      newErrors.veiculoId = 'Selecione um veículo';
    }

    if (!formData.tipoServico) {
      newErrors.tipoServico = 'Selecione o tipo de serviço';
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    if (!formData.dataAgendamento) {
      newErrors.dataAgendamento = 'Data é obrigatória';
    }

    if (!formData.horaAgendamento) {
      newErrors.horaAgendamento = 'Hora é obrigatória';
    }

    if (!formData.mecanico) {
      newErrors.mecanico = 'Selecione um mecânico';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      const novoServico = {
        ...formData,
        clienteId: cliente?.id,
        clienteNome: cliente?.nome,
        status: 'agendado',
        dataCreated: new Date().toISOString()
      };
      
      onSave(novoServico);
      setIsSubmitting(false);
      onClose();
      
      // Reset form
      setFormData({
        veiculoId: '',
        tipoServico: '',
        descricao: '',
        dataAgendamento: '',
        horaAgendamento: '',
        mecanico: '',
        prioridade: 'media',
        observacoes: ''
      });
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen || !cliente) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">
              <i className="fa fa-plus me-2"></i>
              Novo Serviço - {cliente.nome}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">
                        <i className="fa fa-wrench me-2"></i>
                        Detalhes do Serviço
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Veículo <span className="text-danger">*</span>
                            </label>
                            <select
                              className={`form-select ${errors.veiculoId ? 'is-invalid' : ''}`}
                              value={formData.veiculoId}
                              onChange={(e) => handleChange('veiculoId', e.target.value)}
                            >
                              <option value="">Selecione o veículo</option>
                              {cliente.veiculos.map((veiculo, index) => (
                                <option key={index} value={veiculo.id}>
                                  {veiculo.marca} {veiculo.modelo} - {veiculo.placa}
                                </option>
                              ))}
                            </select>
                            {errors.veiculoId && <div className="invalid-feedback">{errors.veiculoId}</div>}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Tipo de Serviço <span className="text-danger">*</span>
                            </label>
                            <select
                              className={`form-select ${errors.tipoServico ? 'is-invalid' : ''}`}
                              value={formData.tipoServico}
                              onChange={(e) => handleChange('tipoServico', e.target.value)}
                            >
                              <option value="">Selecione o tipo</option>
                              {tiposServico.map((tipo, index) => (
                                <option key={index} value={tipo}>{tipo}</option>
                              ))}
                            </select>
                            {errors.tipoServico && <div className="invalid-feedback">{errors.tipoServico}</div>}
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold">
                          Descrição do Serviço <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className={`form-control ${errors.descricao ? 'is-invalid' : ''}`}
                          rows={3}
                          value={formData.descricao}
                          onChange={(e) => handleChange('descricao', e.target.value)}
                          placeholder="Descreva detalhadamente o serviço a ser realizado..."
                        ></textarea>
                        {errors.descricao && <div className="invalid-feedback">{errors.descricao}</div>}
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Data <span className="text-danger">*</span>
                            </label>
                            <input
                              type="date"
                              className={`form-control ${errors.dataAgendamento ? 'is-invalid' : ''}`}
                              value={formData.dataAgendamento}
                              onChange={(e) => handleChange('dataAgendamento', e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                            />
                            {errors.dataAgendamento && <div className="invalid-feedback">{errors.dataAgendamento}</div>}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label fw-bold">
                              Hora <span className="text-danger">*</span>
                            </label>
                            <input
                              type="time"
                              className={`form-control ${errors.horaAgendamento ? 'is-invalid' : ''}`}
                              value={formData.horaAgendamento}
                              onChange={(e) => handleChange('horaAgendamento', e.target.value)}
                            />
                            {errors.horaAgendamento && <div className="invalid-feedback">{errors.horaAgendamento}</div>}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label fw-bold">Prioridade</label>
                            <select
                              className="form-select"
                              value={formData.prioridade}
                              onChange={(e) => handleChange('prioridade', e.target.value)}
                            >
                              <option value="baixa">Baixa</option>
                              <option value="media">Média</option>
                              <option value="alta">Alta</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold">Observações</label>
                        <textarea
                          className="form-control"
                          rows={2}
                          value={formData.observacoes}
                          onChange={(e) => handleChange('observacoes', e.target.value)}
                          placeholder="Observações adicionais..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">
                        <i className="fa fa-user-check me-2"></i>
                        Atribuição
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label fw-bold">
                          Mecânico Responsável <span className="text-danger">*</span>
                        </label>
                        <select
                          className={`form-select ${errors.mecanico ? 'is-invalid' : ''}`}
                          value={formData.mecanico}
                          onChange={(e) => handleChange('mecanico', e.target.value)}
                        >
                          <option value="">Selecione o mecânico</option>
                          {mecanicos.map((mecanico, index) => (
                            <option key={index} value={mecanico}>{mecanico}</option>
                          ))}
                        </select>
                        {errors.mecanico && <div className="invalid-feedback">{errors.mecanico}</div>}
                      </div>

                      <div className="alert alert-info">
                        <i className="fa fa-info-circle me-2"></i>
                        <strong>Informação:</strong> O serviço será criado com status "Agendado" e poderá ser acompanhado na seção de Ordens de Serviço.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button 
                type="submit" 
                className="btn btn-success"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Criando Serviço...
                  </>
                ) : (
                  <>
                    <i className="fa fa-plus me-2"></i>
                    Criar Serviço
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}