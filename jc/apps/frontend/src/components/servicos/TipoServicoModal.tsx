import React, { useState, useEffect } from 'react';

interface TipoServico {
  id?: number;
  nome: string;
  categoria: string;
  descricao: string;
  preco: number;
  tempoEstimado: number;
  status: string;
  materiais: string[];
  frequencia: string;
}

interface TipoServicoModalProps {
  tipo?: TipoServico | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TipoServicoModal({ tipo, isOpen, onClose }: TipoServicoModalProps) {
  const [formData, setFormData] = useState<TipoServico>({
    nome: '',
    categoria: '',
    descricao: '',
    preco: 0,
    tempoEstimado: 0,
    status: 'ativo',
    materiais: [],
    frequencia: ''
  });
  const [novoMaterial, setNovoMaterial] = useState('');
  const [activeTab, setActiveTab] = useState('basico');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (tipo) {
      setFormData(tipo);
    } else {
      setFormData({
        nome: '',
        categoria: '',
        descricao: '',
        preco: 0,
        tempoEstimado: 0,
        status: 'ativo',
        materiais: [],
        frequencia: ''
      });
    }
    setErrors({});
  }, [tipo]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.categoria) newErrors.categoria = 'Categoria é obrigatória';
    if (!formData.descricao.trim()) newErrors.descricao = 'Descrição é obrigatória';
    if (formData.preco <= 0) newErrors.preco = 'Preço deve ser maior que zero';
    if (formData.tempoEstimado <= 0) newErrors.tempoEstimado = 'Tempo deve ser maior que zero';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setActiveTab('basico');
      return;
    }
    
    setIsLoading(true);
    
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Salvando tipo de serviço:', formData);
    setIsLoading(false);
    onClose();
  };

  const adicionarMaterial = () => {
    if (novoMaterial.trim() && !formData.materiais.includes(novoMaterial.trim())) {
      setFormData({
        ...formData,
        materiais: [...formData.materiais, novoMaterial.trim()]
      });
      setNovoMaterial('');
    }
  };

  const removerMaterial = (index: number) => {
    setFormData({
      ...formData,
      materiais: formData.materiais.filter((_, i) => i !== index)
    });
  };

  const getCategoriaIcon = (categoria: string) => {
    const icons: {[key: string]: string} = {
      'Manutenção Preventiva': 'fa-shield-alt',
      'Manutenção Corretiva': 'fa-tools',
      'Motor': 'fa-cog',
      'Suspensão': 'fa-car',
      'Freios': 'fa-stop-circle',
      'Elétrica': 'fa-bolt',
      'Ar Condicionado': 'fa-snowflake',
      'Pneus': 'fa-circle'
    };
    return icons[categoria] || 'fa-wrench';
  };

  const getPrecoFormatado = () => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(formData.preco);
  };

  const getTempoFormatado = () => {
    const horas = Math.floor(formData.tempoEstimado / 60);
    const minutos = formData.tempoEstimado % 60;
    if (horas > 0) {
      return `${horas}h ${minutos > 0 ? minutos + 'min' : ''}`;
    }
    return `${minutos}min`;
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <div className="d-flex align-items-center">
              <i className="fa fa-wrench me-2"></i>
              <h5 className="modal-title mb-0">
                {tipo ? 'Editar Tipo de Serviço' : 'Novo Tipo de Serviço'}
              </h5>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          
          <div className="modal-body p-0">
            <div className="row g-0">
              {/* Sidebar com Preview */}
              <div className="col-md-4 bg-light border-end">
                <div className="p-4">
                  <h6 className="text-primary mb-3">
                    <i className="fa fa-eye me-2"></i>
                    Preview do Serviço
                  </h6>
                  
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary text-white rounded-circle p-2 me-3">
                          <i className={`fa ${getCategoriaIcon(formData.categoria)}`}></i>
                        </div>
                        <div>
                          <h6 className="mb-0">{formData.nome || 'Nome do Serviço'}</h6>
                          <small className="text-muted">{formData.categoria || 'Categoria'}</small>
                        </div>
                      </div>
                      
                      <div className="row text-center mb-3">
                        <div className="col-6">
                          <div className="border-end">
                            <div className="text-success fw-bold">{getPrecoFormatado()}</div>
                            <small className="text-muted">Preço</small>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="text-info fw-bold">{getTempoFormatado()}</div>
                          <small className="text-muted">Duração</small>
                        </div>
                      </div>
                      
                      <p className="text-muted small mb-3">
                        {formData.descricao || 'Descrição do serviço aparecerá aqui...'}
                      </p>
                      
                      {formData.materiais.length > 0 && (
                        <div className="mb-3">
                          <small className="text-muted d-block mb-2">Materiais:</small>
                          <div className="d-flex flex-wrap gap-1">
                            {formData.materiais.slice(0, 3).map((material, index) => (
                              <span key={index} className="badge bg-secondary small">
                                {material}
                              </span>
                            ))}
                            {formData.materiais.length > 3 && (
                              <span className="badge bg-light text-dark small">
                                +{formData.materiais.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <span className={`badge ${formData.status === 'ativo' ? 'bg-success' : 'bg-danger'}`}>
                          {formData.status === 'ativo' ? 'Ativo' : 'Inativo'}
                        </span>
                        {formData.frequencia && (
                          <small className="text-muted">
                            <i className="fa fa-clock me-1"></i>
                            {formData.frequencia}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Formulário */}
              <div className="col-md-8">
                <div className="p-4">
                  {/* Tabs */}
                  <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'basico' ? 'active' : ''}`}
                        onClick={() => setActiveTab('basico')}
                        type="button"
                      >
                        <i className="fa fa-info-circle me-2"></i>
                        Informações Básicas
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'detalhes' ? 'active' : ''}`}
                        onClick={() => setActiveTab('detalhes')}
                        type="button"
                      >
                        <i className="fa fa-list me-2"></i>
                        Detalhes e Materiais
                      </button>
                    </li>
                  </ul>
                  
                  <form onSubmit={handleSubmit}>
                    {/* Tab Básico */}
                    {activeTab === 'basico' && (
                      <div className="tab-content">
                        <div className="row">
                          <div className="col-md-8">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                <i className="fa fa-tag me-2 text-primary"></i>
                                Nome do Serviço *
                              </label>
                              <input
                                type="text"
                                className={`form-control ${errors.nome ? 'is-invalid' : formData.nome ? 'is-valid' : ''}`}
                                value={formData.nome}
                                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                                placeholder="Ex: Troca de Óleo do Motor"
                              />
                              {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                <i className="fa fa-toggle-on me-2 text-success"></i>
                                Status
                              </label>
                              <select
                                className="form-select"
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                              >
                                <option value="ativo">✅ Ativo</option>
                                <option value="inativo">❌ Inativo</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                <i className="fa fa-folder me-2 text-warning"></i>
                                Categoria *
                              </label>
                              <select
                                className={`form-select ${errors.categoria ? 'is-invalid' : formData.categoria ? 'is-valid' : ''}`}
                                value={formData.categoria}
                                onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                              >
                                <option value="">Selecione uma categoria</option>
                                <option value="Manutenção Preventiva">🛡️ Manutenção Preventiva</option>
                                <option value="Manutenção Corretiva">🔧 Manutenção Corretiva</option>
                                <option value="Motor">⚙️ Motor</option>
                                <option value="Suspensão">🚗 Suspensão</option>
                                <option value="Freios">🛑 Freios</option>
                                <option value="Elétrica">⚡ Elétrica</option>
                                <option value="Ar Condicionado">❄️ Ar Condicionado</option>
                                <option value="Pneus">⭕ Pneus</option>
                              </select>
                              {errors.categoria && <div className="invalid-feedback">{errors.categoria}</div>}
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                <i className="fa fa-dollar-sign me-2 text-success"></i>
                                Preço (R$) *
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                className={`form-control ${errors.preco ? 'is-invalid' : formData.preco > 0 ? 'is-valid' : ''}`}
                                value={formData.preco}
                                onChange={(e) => setFormData({...formData, preco: parseFloat(e.target.value) || 0})}
                                placeholder="0,00"
                              />
                              {errors.preco && <div className="invalid-feedback">{errors.preco}</div>}
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                <i className="fa fa-clock me-2 text-info"></i>
                                Tempo (min) *
                              </label>
                              <input
                                type="number"
                                min="1"
                                className={`form-control ${errors.tempoEstimado ? 'is-invalid' : formData.tempoEstimado > 0 ? 'is-valid' : ''}`}
                                value={formData.tempoEstimado}
                                onChange={(e) => setFormData({...formData, tempoEstimado: parseInt(e.target.value) || 0})}
                                placeholder="30"
                              />
                              {errors.tempoEstimado && <div className="invalid-feedback">{errors.tempoEstimado}</div>}
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            <i className="fa fa-align-left me-2 text-secondary"></i>
                            Descrição *
                          </label>
                          <textarea
                            className={`form-control ${errors.descricao ? 'is-invalid' : formData.descricao ? 'is-valid' : ''}`}
                            rows={4}
                            value={formData.descricao}
                            onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                            placeholder="Descreva detalhadamente o que inclui este serviço..."
                          />
                          {errors.descricao && <div className="invalid-feedback">{errors.descricao}</div>}
                          <div className="form-text">
                            {formData.descricao.length}/500 caracteres
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Tab Detalhes */}
                    {activeTab === 'detalhes' && (
                      <div className="tab-content">
                        <div className="mb-4">
                          <label className="form-label fw-bold">
                            <i className="fa fa-calendar-alt me-2 text-primary"></i>
                            Frequência Recomendada
                          </label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fa fa-repeat"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Ex: A cada 10.000 km ou 6 meses"
                              value={formData.frequencia}
                              onChange={(e) => setFormData({...formData, frequencia: e.target.value})}
                            />
                          </div>
                          <div className="form-text">
                            Informe quando este serviço deve ser realizado novamente
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            <i className="fa fa-boxes me-2 text-warning"></i>
                            Materiais Necessários
                          </label>
                          <div className="input-group mb-3">
                            <span className="input-group-text">
                              <i className="fa fa-plus"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Digite um material e pressione Enter"
                              value={novoMaterial}
                              onChange={(e) => setNovoMaterial(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  adicionarMaterial();
                                }
                              }}
                            />
                            <button 
                              type="button" 
                              className="btn btn-primary"
                              onClick={adicionarMaterial}
                              disabled={!novoMaterial.trim()}
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                          
                          {formData.materiais.length > 0 && (
                            <div className="border rounded p-3 bg-light">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <small className="text-muted fw-bold">
                                  MATERIAIS ADICIONADOS ({formData.materiais.length})
                                </small>
                              </div>
                              <div className="d-flex flex-wrap gap-2">
                                {formData.materiais.map((material, index) => (
                                  <span key={index} className="badge bg-primary d-flex align-items-center fs-6 py-2 px-3">
                                    <i className="fa fa-box me-2"></i>
                                    {material}
                                    <button
                                      type="button"
                                      className="btn-close btn-close-white ms-2"
                                      style={{fontSize: '0.6em'}}
                                      onClick={() => removerMaterial(index)}
                                      title="Remover material"
                                    ></button>
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer bg-light">
            <div className="d-flex justify-content-between w-100">
              <div className="d-flex align-items-center text-muted">
                <i className="fa fa-info-circle me-2"></i>
                <small>* Campos obrigatórios</small>
              </div>
              <div>
                <button type="button" className="btn btn-light me-2" onClick={onClose}>
                  <i className="fa fa-times me-2"></i>
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <i className="fa fa-save me-2"></i>
                      {tipo ? 'Atualizar' : 'Criar'} Serviço
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}