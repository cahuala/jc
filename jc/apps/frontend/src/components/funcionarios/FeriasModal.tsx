import React, { useState, useEffect } from 'react';

interface Ferias {
  id?: string;
  funcionario: string;
  cargo: string;
  dataInicio: string;
  dataFim: string;
  diasSolicitados: number;
  diasDisponiveis: number;
  status: 'pendente' | 'aprovada' | 'rejeitada' | 'em_andamento' | 'concluida';
  observacoes?: string;
  aprovadoPor?: string;
  dataAprovacao?: string;
}

interface FeriasModalProps {
  ferias: Ferias | null;
  onSave: (ferias: any) => void;
  onClose: () => void;
}

const funcionariosDisponiveis = [
  { nome: 'António Silva', cargo: 'Mecânico Sénior', diasDisponiveis: 22 },
  { nome: 'Maria Santos', cargo: 'Recepcionista', diasDisponiveis: 30 },
  { nome: 'Carlos Mendes', cargo: 'Supervisor', diasDisponiveis: 8 },
  { nome: 'Ana Costa', cargo: 'Contabilista', diasDisponiveis: 25 },
  { nome: 'Pedro Oliveira', cargo: 'Mecânico', diasDisponiveis: 30 }
];

export default function FeriasModal({ ferias, onSave, onClose }: FeriasModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Ferias>({
    funcionario: '',
    cargo: '',
    dataInicio: '',
    dataFim: '',
    diasSolicitados: 0,
    diasDisponiveis: 0,
    status: 'pendente',
    observacoes: ''
  });

  useEffect(() => {
    if (ferias) {
      setFormData(ferias);
    }
  }, [ferias]);

  const calcularDias = (inicio: string, fim: string) => {
    if (!inicio || !fim) return 0;
    const dataInicio = new Date(inicio);
    const dataFim = new Date(fim);
    if (dataFim < dataInicio) return 0;
    const diffTime = Math.abs(dataFim.getTime() - dataInicio.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleFuncionarioChange = (funcionarioNome: string) => {
    const funcionario = funcionariosDisponiveis.find(f => f.nome === funcionarioNome);
    if (funcionario) {
      setFormData(prev => ({
        ...prev,
        funcionario: funcionario.nome,
        cargo: funcionario.cargo,
        diasDisponiveis: funcionario.diasDisponiveis
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    const newFormData = { ...formData, [name]: value };
    
    // Recalcular dias automaticamente
    if (name === 'dataInicio' || name === 'dataFim') {
      const dias = calcularDias(newFormData.dataInicio, newFormData.dataFim);
      newFormData.diasSolicitados = dias;
    }
    
    setFormData(newFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.diasSolicitados > formData.diasDisponiveis) {
      alert('Dias solicitados excedem os dias disponíveis!');
      return;
    }
    
    if (new Date(formData.dataFim) < new Date(formData.dataInicio)) {
      alert('Data de fim deve ser posterior à data de início!');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      onSave(formData);
      setIsLoading(false);
    }, 1000);
  };

  const diasRestantes = formData.diasDisponiveis - formData.diasSolicitados;
  const isExcedente = formData.diasSolicitados > formData.diasDisponiveis;

  return (
    <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fa fa-calendar-alt me-2"></i>
              {ferias ? 'Editar Solicitação de Férias' : 'Nova Solicitação de Férias'}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-8">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label fw-bold">Funcionário *</label>
                      <select
                        className="form-select"
                        value={formData.funcionario}
                        onChange={(e) => handleFuncionarioChange(e.target.value)}
                        required
                      >
                        <option value="">Selecione o funcionário...</option>
                        {funcionariosDisponiveis.map(func => (
                          <option key={func.nome} value={func.nome}>{func.nome}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Cargo</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.cargo}
                        readOnly
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Data de Início *</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dataInicio"
                        value={formData.dataInicio}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Data de Fim *</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dataFim"
                        value={formData.dataFim}
                        onChange={handleInputChange}
                        min={formData.dataInicio || new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Dias Disponíveis</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control bg-light"
                          value={formData.diasDisponiveis}
                          readOnly
                        />
                        <span className="input-group-text">dias</span>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Dias Solicitados</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className={`form-control ${isExcedente ? 'is-invalid' : ''}`}
                          value={formData.diasSolicitados}
                          readOnly
                        />
                        <span className="input-group-text">dias</span>
                      </div>
                      {isExcedente && (
                        <div className="invalid-feedback">
                          Excede os dias disponíveis
                        </div>
                      )}
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label fw-bold">Observações</label>
                      <textarea
                        className="form-control"
                        name="observacoes"
                        value={formData.observacoes}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Motivo ou observações sobre as férias..."
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card bg-light">
                    <div className="card-header">
                      <h6 className="card-title mb-0">
                        <i className="fa fa-info-circle me-2"></i>
                        Resumo das Férias
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <strong>Funcionário:</strong><br/>
                        <span className="text-primary">{formData.funcionario || 'Não selecionado'}</span>
                      </div>
                      
                      <div className="mb-3">
                        <strong>Cargo:</strong><br/>
                        <span className="text-muted">{formData.cargo || 'N/A'}</span>
                      </div>
                      
                      <hr/>
                      
                      <div className="mb-2">
                        <strong>Período:</strong><br/>
                        {formData.dataInicio && formData.dataFim ? (
                          <span className="text-info">
                            {new Date(formData.dataInicio).toLocaleDateString('pt-AO')} - {' '}
                            {new Date(formData.dataFim).toLocaleDateString('pt-AO')}
                          </span>
                        ) : (
                          <span className="text-muted">Selecione as datas</span>
                        )}
                      </div>
                      
                      <div className="mb-2">
                        <div className="d-flex justify-content-between">
                          <span>Dias Solicitados:</span>
                          <span className={isExcedente ? 'text-danger fw-bold' : 'text-primary fw-bold'}>
                            {formData.diasSolicitados}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <div className="d-flex justify-content-between">
                          <span>Dias Disponíveis:</span>
                          <span className="text-success">{formData.diasDisponiveis}</span>
                        </div>
                      </div>
                      
                      <hr/>
                      
                      <div className="mb-0">
                        <div className="d-flex justify-content-between">
                          <strong>Dias Restantes:</strong>
                          <strong className={diasRestantes < 0 ? 'text-danger' : 'text-success'}>
                            {diasRestantes}
                          </strong>
                        </div>
                      </div>
                      
                      {isExcedente && (
                        <div className="alert alert-danger mt-3 py-2">
                          <small>
                            <i className="fa fa-exclamation-triangle me-1"></i>
                            Dias solicitados excedem o saldo disponível
                          </small>
                        </div>
                      )}
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
              <button type="submit" className="btn btn-primary" disabled={isLoading || isExcedente}>
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Salvando...
                  </>
                ) : (
                  <>
                    <i className="fa fa-save me-2"></i>
                    {ferias ? 'Atualizar' : 'Solicitar'} Férias
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