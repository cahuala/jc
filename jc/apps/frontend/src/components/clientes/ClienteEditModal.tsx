import React, { useState, useEffect } from 'react';

interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  nif: string;
  endereco: string;
  status: string;
  observacoes: string;
}

interface Veiculo {
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  cor: string;
  combustivel: string;
  numeroMotor: string;
  numeroChasis: string;
}

interface ClienteEditModalProps {
  isOpen: boolean;
  cliente: Cliente | null;
  onSave: (cliente: Cliente, veiculo?: Veiculo) => void;
  onClose: () => void;
}

export default function ClienteEditModal({ isOpen, cliente, onSave, onClose }: ClienteEditModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    nif: '',
    endereco: '',
    status: 'ativo',
    observacoes: ''
  });
  
  const [veiculoData, setVeiculoData] = useState({
    marca: '',
    modelo: '',
    ano: new Date().getFullYear(),
    placa: '',
    cor: '',
    combustivel: 'gasolina',
    numeroMotor: '',
    numeroChasis: ''
  });
  
  const [incluirVeiculo, setIncluirVeiculo] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (cliente) {
      setFormData({
        nome: cliente.nome,
        telefone: cliente.telefone,
        email: cliente.email,
        nif: cliente.nif || '',
        endereco: cliente.endereco || '',
        status: cliente.status,
        observacoes: cliente.observacoes
      });
    } else {
      setFormData({
        nome: '',
        telefone: '',
        email: '',
        nif: '',
        endereco: '',
        status: 'ativo',
        observacoes: ''
      });
      setVeiculoData({
        marca: '',
        modelo: '',
        ano: new Date().getFullYear(),
        placa: '',
        cor: '',
        combustivel: 'gasolina',
        numeroMotor: '',
        numeroChasis: ''
      });
      setIncluirVeiculo(false);
      setCurrentStep(1);
    }
    setErrors({});
  }, [cliente, isOpen]);

  const validateClienteForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!/^\+244\s9[0-9]{2}\s[0-9]{3}\s[0-9]{3}$/.test(formData.telefone)) {
      newErrors.telefone = 'Formato: +244 923 456 789';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.nif.trim()) {
      newErrors.nif = 'NIF é obrigatório';
    } else if (!/^[0-9]{9}$/.test(formData.nif)) {
      newErrors.nif = 'NIF deve ter 9 dígitos';
    }

    if (!formData.endereco.trim()) {
      newErrors.endereco = 'Endereço é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateVeiculoForm = () => {
    if (!incluirVeiculo) return true;
    
    const newErrors: {[key: string]: string} = {};

    if (!veiculoData.marca.trim()) {
      newErrors.marca = 'Marca é obrigatória';
    }

    if (!veiculoData.modelo.trim()) {
      newErrors.modelo = 'Modelo é obrigatório';
    }

    if (!veiculoData.placa.trim()) {
      newErrors.placa = 'Placa é obrigatória';
    } else if (!/^[A-Z]{2}-[0-9]{2}-[A-Z]{2}$/.test(veiculoData.placa.toUpperCase())) {
      newErrors.placa = 'Formato: LD-12-34';
    }

    if (!veiculoData.cor.trim()) {
      newErrors.cor = 'Cor é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateClienteForm()) {
      setCurrentStep(2);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      handleNext();
      return;
    }

    if (!validateClienteForm() || !validateVeiculoForm()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      const updatedCliente = {
        ...cliente,
        ...formData
      } as Cliente;
      
      const veiculo = incluirVeiculo ? veiculoData : undefined;
      onSave(updatedCliente, veiculo);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleClienteChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleVeiculoChange = (field: string, value: string | number) => {
    setVeiculoData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const marcasVeiculos = [
    'Toyota', 'Honda', 'Hyundai', 'Nissan', 'Volkswagen', 'Ford', 'Chevrolet', 
    'Kia', 'Mitsubishi', 'Mazda', 'Suzuki', 'Peugeot', 'Renault', 'BMW', 'Mercedes-Benz'
  ];

  const cores = [
    'Branco', 'Preto', 'Prata', 'Cinza', 'Azul', 'Vermelho', 'Verde', 'Amarelo', 'Marrom', 'Bege'
  ];

  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fa fa-user-plus me-2"></i>
              {cliente ? 'Editar Cliente' : 'Novo Cliente'}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          
          {/* Progress Steps */}
          <div className="modal-body pb-0">
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-center mb-4">
                  <div className="d-flex align-items-center">
                    <div className={`rounded-circle d-flex align-items-center justify-content-center me-3 ${
                      currentStep >= 1 ? 'bg-primary text-white' : 'bg-light text-muted'
                    }`} style={{width: '40px', height: '40px'}}>
                      <i className="fa fa-user"></i>
                    </div>
                    <span className={`me-3 ${currentStep >= 1 ? 'text-primary fw-bold' : 'text-muted'}`}>
                      Dados Pessoais
                    </span>
                    
                    <div className={`border-top me-3 ${currentStep >= 2 ? 'border-primary' : 'border-light'}`} 
                         style={{width: '50px'}}></div>
                    
                    <div className={`rounded-circle d-flex align-items-center justify-content-center me-3 ${
                      currentStep >= 2 ? 'bg-primary text-white' : 'bg-light text-muted'
                    }`} style={{width: '40px', height: '40px'}}>
                      <i className="fa fa-car"></i>
                    </div>
                    <span className={currentStep >= 2 ? 'text-primary fw-bold' : 'text-muted'}>
                      Veículo (Opcional)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body pt-0">
              {currentStep === 1 && (
                <div className="row">
                  <div className="col-md-6">
                    <div className="card h-100">
                      <div className="card-header bg-light">
                        <h6 className="mb-0">
                          <i className="fa fa-user me-2"></i>
                          Informações Pessoais
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Nome Completo <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                            value={formData.nome}
                            onChange={(e) => handleClienteChange('nome', e.target.value)}
                            placeholder="Digite o nome completo"
                          />
                          {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            NIF (Número de Identificação Fiscal) <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${errors.nif ? 'is-invalid' : ''}`}
                            value={formData.nif}
                            onChange={(e) => handleClienteChange('nif', e.target.value.replace(/\D/g, '').slice(0, 9))}
                            placeholder="123456789"
                            maxLength={9}
                          />
                          {errors.nif && <div className="invalid-feedback">{errors.nif}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Telefone <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${errors.telefone ? 'is-invalid' : ''}`}
                            value={formData.telefone}
                            onChange={(e) => handleClienteChange('telefone', e.target.value)}
                            placeholder="+244 923 456 789"
                          />
                          {errors.telefone && <div className="invalid-feedback">{errors.telefone}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Email <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            value={formData.email}
                            onChange={(e) => handleClienteChange('email', e.target.value)}
                            placeholder="cliente@email.com"
                          />
                          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="card h-100">
                      <div className="card-header bg-light">
                        <h6 className="mb-0">
                          <i className="fa fa-map-marker-alt me-2"></i>
                          Endereço e Status
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Endereço Completo <span className="text-danger">*</span>
                          </label>
                          <textarea
                            className={`form-control ${errors.endereco ? 'is-invalid' : ''}`}
                            rows={3}
                            value={formData.endereco}
                            onChange={(e) => handleClienteChange('endereco', e.target.value)}
                            placeholder="Rua, Bairro, Município, Província"
                          ></textarea>
                          {errors.endereco && <div className="invalid-feedback">{errors.endereco}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-bold">Status do Cliente</label>
                          <select
                            className="form-select"
                            value={formData.status}
                            onChange={(e) => handleClienteChange('status', e.target.value)}
                          >
                            <option value="ativo">Ativo</option>
                            <option value="atencao">Atenção</option>
                            <option value="inativo">Inativo</option>
                          </select>
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-bold">Observações</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={formData.observacoes}
                            onChange={(e) => handleClienteChange('observacoes', e.target.value)}
                            placeholder="Informações adicionais sobre o cliente..."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <div className="card mb-4">
                    <div className="card-header bg-success text-white">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">
                          <i className="fa fa-car me-2"></i>
                          Adicionar Veículo (Opcional)
                        </h6>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={incluirVeiculo}
                            onChange={(e) => setIncluirVeiculo(e.target.checked)}
                          />
                          <label className="form-check-label text-white">
                            Incluir veículo
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    {incluirVeiculo && (
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                Marca <span className="text-danger">*</span>
                              </label>
                              <select
                                className={`form-select ${errors.marca ? 'is-invalid' : ''}`}
                                value={veiculoData.marca}
                                onChange={(e) => handleVeiculoChange('marca', e.target.value)}
                              >
                                <option value="">Selecione a marca</option>
                                {marcasVeiculos.map(marca => (
                                  <option key={marca} value={marca}>{marca}</option>
                                ))}
                              </select>
                              {errors.marca && <div className="invalid-feedback">{errors.marca}</div>}
                            </div>
                          </div>
                          
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                Modelo <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className={`form-control ${errors.modelo ? 'is-invalid' : ''}`}
                                value={veiculoData.modelo}
                                onChange={(e) => handleVeiculoChange('modelo', e.target.value)}
                                placeholder="Ex: Corolla, Civic, HB20"
                              />
                              {errors.modelo && <div className="invalid-feedback">{errors.modelo}</div>}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label fw-bold">Ano</label>
                              <input
                                type="number"
                                className="form-control"
                                value={veiculoData.ano}
                                onChange={(e) => handleVeiculoChange('ano', parseInt(e.target.value))}
                                min="1990"
                                max={new Date().getFullYear() + 1}
                              />
                            </div>
                          </div>
                          
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                Placa <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className={`form-control ${errors.placa ? 'is-invalid' : ''}`}
                                value={veiculoData.placa}
                                onChange={(e) => handleVeiculoChange('placa', e.target.value.toUpperCase())}
                                placeholder="LD-12-34"
                                maxLength={8}
                              />
                              {errors.placa && <div className="invalid-feedback">{errors.placa}</div>}
                            </div>
                          </div>
                          
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                Cor <span className="text-danger">*</span>
                              </label>
                              <select
                                className={`form-select ${errors.cor ? 'is-invalid' : ''}`}
                                value={veiculoData.cor}
                                onChange={(e) => handleVeiculoChange('cor', e.target.value)}
                              >
                                <option value="">Selecione a cor</option>
                                {cores.map(cor => (
                                  <option key={cor} value={cor}>{cor}</option>
                                ))}
                              </select>
                              {errors.cor && <div className="invalid-feedback">{errors.cor}</div>}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label fw-bold">Combustível</label>
                              <select
                                className="form-select"
                                value={veiculoData.combustivel}
                                onChange={(e) => handleVeiculoChange('combustivel', e.target.value)}
                              >
                                <option value="gasolina">Gasolina</option>
                                <option value="diesel">Diesel</option>
                                <option value="flex">Flex</option>
                                <option value="eletrico">Elétrico</option>
                                <option value="hibrido">Híbrido</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label fw-bold">Número do Motor</label>
                              <input
                                type="text"
                                className="form-control"
                                value={veiculoData.numeroMotor}
                                onChange={(e) => handleVeiculoChange('numeroMotor', e.target.value)}
                                placeholder="Opcional"
                              />
                            </div>
                          </div>
                          
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label fw-bold">Número do Chassis</label>
                              <input
                                type="text"
                                className="form-control"
                                value={veiculoData.numeroChasis}
                                onChange={(e) => handleVeiculoChange('numeroChasis', e.target.value)}
                                placeholder="Opcional"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {!incluirVeiculo && (
                    <div className="alert alert-info text-center">
                      <i className="fa fa-info-circle fa-2x mb-3"></i>
                      <h5>Veículo Opcional</h5>
                      <p className="mb-0">Você pode adicionar um veículo agora ou fazer isso mais tarde na ficha do cliente.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              {currentStep === 2 && (
                <button type="button" className="btn btn-outline-secondary" onClick={handlePrevious}>
                  <i className="fa fa-arrow-left me-2"></i>
                  Voltar
                </button>
              )}
              
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                Cancelar
              </button>
              
              <button 
                type="submit" 
                className={`btn ${currentStep === 1 ? 'btn-primary' : 'btn-success'}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Salvando...
                  </>
                ) : currentStep === 1 ? (
                  <>
                    Próximo
                    <i className="fa fa-arrow-right ms-2"></i>
                  </>
                ) : (
                  <>
                    <i className="fa fa-save me-2"></i>
                    {cliente ? 'Atualizar' : 'Salvar Cliente'}
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