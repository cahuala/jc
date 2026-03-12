import React, { useState, useEffect } from 'react';

interface Cargo {
  id: number;
  nome: string;
  departamento: string;
  nivel: 'junior' | 'pleno' | 'senior' | 'gerencial';
  salarioMinimo: number;
  salarioMaximo: number;
  descricao: string;
  requisitos: string[];
  funcionariosAtivos: number;
  status: 'ativo' | 'inativo';
}

interface CargoModalProps {
  cargo: Cargo | null;
  onSave: (cargo: Cargo) => void;
  onClose: () => void;
}

const departamentosDisponiveis = [
  'Oficina',
  'Atendimento',
  'Financeiro',
  'Administração',
  'Vendas'
];

const niveisDisponiveis = [
  { value: 'junior', label: 'Júnior' },
  { value: 'pleno', label: 'Pleno' },
  { value: 'senior', label: 'Sénior' },
  { value: 'gerencial', label: 'Gerencial' }
];

export default function CargoModal({ cargo, onSave, onClose }: CargoModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Cargo>({
    id: 0,
    nome: '',
    departamento: '',
    nivel: 'junior',
    salarioMinimo: 0,
    salarioMaximo: 0,
    descricao: '',
    requisitos: [],
    funcionariosAtivos: 0,
    status: 'ativo'
  });
  const [novoRequisito, setNovoRequisito] = useState('');

  useEffect(() => {
    if (cargo) {
      setFormData(cargo);
    }
  }, [cargo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'salarioMinimo' || name === 'salarioMaximo') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const adicionarRequisito = () => {
    if (novoRequisito.trim()) {
      setFormData(prev => ({
        ...prev,
        requisitos: [...prev.requisitos, novoRequisito.trim()]
      }));
      setNovoRequisito('');
    }
  };

  const removerRequisito = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requisitos: prev.requisitos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.salarioMinimo >= formData.salarioMaximo) {
      alert('O salário mínimo deve ser menor que o salário máximo!');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      onSave(formData);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fa fa-briefcase me-2"></i>
              {cargo ? 'Editar Cargo' : 'Novo Cargo'}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-8">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label fw-bold">Nome do Cargo *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Status</label>
                      <select
                        className="form-select"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Departamento *</label>
                      <select
                        className="form-select"
                        name="departamento"
                        value={formData.departamento}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Selecione o departamento...</option>
                        {departamentosDisponiveis.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Nível *</label>
                      <select
                        className="form-select"
                        name="nivel"
                        value={formData.nivel}
                        onChange={handleInputChange}
                        required
                      >
                        {niveisDisponiveis.map(nivel => (
                          <option key={nivel.value} value={nivel.value}>{nivel.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">Descrição *</label>
                      <textarea
                        className="form-control"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Descrição detalhada das responsabilidades do cargo"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Salário Mínimo (Kz) *</label>
                      <div className="input-group">
                        <span className="input-group-text">Kz</span>
                        <input
                          type="number"
                          className="form-control"
                          name="salarioMinimo"
                          value={formData.salarioMinimo}
                          onChange={handleInputChange}
                          step="1000"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Salário Máximo (Kz) *</label>
                      <div className="input-group">
                        <span className="input-group-text">Kz</span>
                        <input
                          type="number"
                          className="form-control"
                          name="salarioMaximo"
                          value={formData.salarioMaximo}
                          onChange={handleInputChange}
                          step="1000"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">Requisitos</label>
                      <div className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          value={novoRequisito}
                          onChange={(e) => setNovoRequisito(e.target.value)}
                          placeholder="Digite um requisito..."
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarRequisito())}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={adicionarRequisito}
                        >
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                      <div className="border rounded p-2" style={{minHeight: '100px', maxHeight: '150px', overflowY: 'auto'}}>
                        {formData.requisitos.length === 0 ? (
                          <small className="text-muted">Nenhum requisito adicionado</small>
                        ) : (
                          formData.requisitos.map((requisito, index) => (
                            <div key={index} className="d-flex justify-content-between align-items-center mb-1">
                              <small>• {requisito}</small>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => removerRequisito(index)}
                              >
                                <i className="fa fa-times"></i>
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card bg-light">
                    <div className="card-header">
                      <h6 className="card-title mb-0">
                        <i className="fa fa-info-circle me-2"></i>
                        Resumo do Cargo
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="mb-2">
                        <strong>Cargo:</strong><br/>
                        <span className="text-primary">{formData.nome || 'Nome do cargo'}</span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Departamento:</strong><br/>
                        <span className="text-info">{formData.departamento || 'Não selecionado'}</span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Nível:</strong><br/>
                        <span className={`badge ${
                          formData.nivel === 'junior' ? 'bg-info' :
                          formData.nivel === 'pleno' ? 'bg-primary' :
                          formData.nivel === 'senior' ? 'bg-success' : 'bg-warning'
                        }`}>
                          {formData.nivel.charAt(0).toUpperCase() + formData.nivel.slice(1)}
                        </span>
                      </div>
                      
                      <hr/>
                      
                      <div className="mb-2">
                        <strong>Faixa Salarial:</strong><br/>
                        <div className="text-success fw-bold">
                          Kz {formData.salarioMinimo.toFixed(0)} - {formData.salarioMaximo.toFixed(0)}
                        </div>
                        <small className="text-muted">
                          Média: Kz {((formData.salarioMinimo + formData.salarioMaximo) / 2).toFixed(0)}
                        </small>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Requisitos:</strong><br/>
                        <span className="badge bg-secondary">{formData.requisitos.length} itens</span>
                      </div>
                      
                      <div className="mb-0">
                        <strong>Status:</strong><br/>
                        <span className={`badge ${formData.status === 'ativo' ? 'bg-success' : 'bg-danger'}`}>
                          {formData.status === 'ativo' ? 'Ativo' : 'Inativo'}
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
                    {cargo ? 'Atualizar' : 'Criar'} Cargo
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