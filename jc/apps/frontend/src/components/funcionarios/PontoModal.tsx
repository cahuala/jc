import React, { useState, useEffect } from 'react';

interface RegistroPonto {
  id?: string;
  funcionario: string;
  data: string;
  entrada: string;
  saidaAlmoco?: string;
  voltaAlmoco?: string;
  saida?: string;
  horasTrabalhadas: number;
  status: 'presente' | 'ausente' | 'atrasado' | 'incompleto';
  observacoes?: string;
}

interface PontoModalProps {
  registro: RegistroPonto | null;
  onSave: (registro: any) => void;
  onClose: () => void;
}

const funcionariosDisponiveis = [
  'António Silva',
  'Maria Santos', 
  'Carlos Mendes',
  'Ana Costa',
  'Pedro Oliveira'
];

export default function PontoModal({ registro, onSave, onClose }: PontoModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegistroPonto>({
    funcionario: '',
    data: new Date().toISOString().split('T')[0],
    entrada: '',
    saidaAlmoco: '',
    voltaAlmoco: '',
    saida: '',
    horasTrabalhadas: 0,
    status: 'presente',
    observacoes: ''
  });

  useEffect(() => {
    if (registro) {
      setFormData(registro);
    }
  }, [registro]);

  const calcularHoras = (entrada: string, saida: string, saidaAlmoco?: string, voltaAlmoco?: string) => {
    if (!entrada || !saida) return 0;
    
    const [entradaH, entradaM] = entrada.split(':').map(Number);
    const [saidaH, saidaM] = saida.split(':').map(Number);
    
    let totalMinutos = (saidaH * 60 + saidaM) - (entradaH * 60 + entradaM);
    
    if (saidaAlmoco && voltaAlmoco) {
      const [saidaAlmocoH, saidaAlmocoM] = saidaAlmoco.split(':').map(Number);
      const [voltaAlmocoH, voltaAlmocoM] = voltaAlmoco.split(':').map(Number);
      const almocoMinutos = (voltaAlmocoH * 60 + voltaAlmocoM) - (saidaAlmocoH * 60 + saidaAlmocoM);
      totalMinutos -= almocoMinutos;
    }
    
    return Math.max(0, totalMinutos / 60);
  };

  const determinarStatus = (entrada: string, saida: string, horasTrabalhadas: number) => {
    if (!entrada) return 'ausente';
    if (!saida) return 'incompleto';
    if (entrada > '08:00') return 'atrasado';
    if (horasTrabalhadas >= 8) return 'presente';
    return 'incompleto';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    const newFormData = { ...formData, [name]: value };
    
    // Recalcular horas e status automaticamente
    if (['entrada', 'saida', 'saidaAlmoco', 'voltaAlmoco'].includes(name)) {
      const horas = calcularHoras(
        newFormData.entrada, 
        newFormData.saida || '', 
        newFormData.saidaAlmoco, 
        newFormData.voltaAlmoco
      );
      newFormData.horasTrabalhadas = horas;
      newFormData.status = determinarStatus(newFormData.entrada, newFormData.saida || '', horas);
    }
    
    setFormData(newFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setTimeout(() => {
      onSave(formData);
      setIsLoading(false);
    }, 1000);
  };

  const agora = new Date();
  const horaAtual = `${agora.getHours().toString().padStart(2, '0')}:${agora.getMinutes().toString().padStart(2, '0')}`;

  return (
    <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fa fa-clock me-2"></i>
              {registro ? 'Editar Registro de Ponto' : 'Novo Registro de Ponto'}
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
                        name="funcionario"
                        value={formData.funcionario}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Selecione o funcionário...</option>
                        {funcionariosDisponiveis.map(func => (
                          <option key={func} value={func}>{func}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Data *</label>
                      <input
                        type="date"
                        className="form-control"
                        name="data"
                        value={formData.data}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Entrada *</label>
                      <div className="input-group">
                        <input
                          type="time"
                          className="form-control"
                          name="entrada"
                          value={formData.entrada}
                          onChange={handleInputChange}
                          required
                        />
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => setFormData(prev => ({...prev, entrada: horaAtual}))}
                        >
                          Agora
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Saída Almoço</label>
                      <div className="input-group">
                        <input
                          type="time"
                          className="form-control"
                          name="saidaAlmoco"
                          value={formData.saidaAlmoco}
                          onChange={handleInputChange}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setFormData(prev => ({...prev, saidaAlmoco: '12:00'}))}
                        >
                          12:00
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Volta Almoço</label>
                      <div className="input-group">
                        <input
                          type="time"
                          className="form-control"
                          name="voltaAlmoco"
                          value={formData.voltaAlmoco}
                          onChange={handleInputChange}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setFormData(prev => ({...prev, voltaAlmoco: '13:00'}))}
                        >
                          13:00
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Saída</label>
                      <div className="input-group">
                        <input
                          type="time"
                          className="form-control"
                          name="saida"
                          value={formData.saida}
                          onChange={handleInputChange}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => setFormData(prev => ({...prev, saida: horaAtual}))}
                        >
                          Agora
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label fw-bold">Observações</label>
                      <textarea
                        className="form-control"
                        name="observacoes"
                        value={formData.observacoes}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Observações sobre o registro..."
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card bg-light">
                    <div className="card-header">
                      <h6 className="card-title mb-0">
                        <i className="fa fa-calculator me-2"></i>
                        Resumo do Ponto
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <strong>Funcionário:</strong><br/>
                        <span className="text-primary">{formData.funcionario || 'Não selecionado'}</span>
                      </div>
                      
                      <div className="mb-3">
                        <strong>Data:</strong><br/>
                        <span className="text-info">
                          {formData.data ? 
                            new Date(formData.data).toLocaleDateString('pt-AO') : 
                            'N/A'
                          }
                        </span>
                      </div>
                      
                      <hr/>
                      
                      <div className="mb-2">
                        <div className="d-flex justify-content-between">
                          <span>Entrada:</span>
                          <span className={formData.entrada > '08:00' ? 'text-warning' : 'text-success'}>
                            {formData.entrada || '--:--'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <div className="d-flex justify-content-between">
                          <span>Saída Almoço:</span>
                          <span className="text-muted">{formData.saidaAlmoco || '--:--'}</span>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <div className="d-flex justify-content-between">
                          <span>Volta Almoço:</span>
                          <span className="text-muted">{formData.voltaAlmoco || '--:--'}</span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span>Saída:</span>
                          <span className="text-success">{formData.saida || '--:--'}</span>
                        </div>
                      </div>
                      
                      <hr/>
                      
                      <div className="mb-2">
                        <div className="d-flex justify-content-between">
                          <strong>Horas Trabalhadas:</strong>
                          <strong className={formData.horasTrabalhadas < 8 ? 'text-danger' : 'text-success'}>
                            {formData.horasTrabalhadas.toFixed(1)}h
                          </strong>
                        </div>
                      </div>
                      
                      <div className="mb-0">
                        <strong>Status:</strong><br/>
                        <span className={`badge ${
                          formData.status === 'presente' ? 'bg-success' :
                          formData.status === 'atrasado' ? 'bg-warning' :
                          formData.status === 'ausente' ? 'bg-danger' : 'bg-secondary'
                        }`}>
                          {formData.status === 'presente' ? 'Presente' :
                           formData.status === 'atrasado' ? 'Atrasado' :
                           formData.status === 'ausente' ? 'Ausente' : 'Incompleto'}
                        </span>
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
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Salvando...
                  </>
                ) : (
                  <>
                    <i className="fa fa-save me-2"></i>
                    {registro ? 'Atualizar' : 'Registrar'} Ponto
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