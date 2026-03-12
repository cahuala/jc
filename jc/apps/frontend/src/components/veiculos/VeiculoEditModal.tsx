import React, { useState, useEffect } from 'react';

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

interface Cliente {
  id: number;
  nome: string;
}

interface VeiculoEditModalProps {
  isOpen: boolean;
  veiculo: Veiculo | null;
  clientes: Cliente[];
  onSave: (veiculo: Partial<Veiculo>) => void;
  onClose: () => void;
}

export default function VeiculoEditModal({ isOpen, veiculo, clientes, onSave, onClose }: VeiculoEditModalProps) {
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    ano: new Date().getFullYear(),
    placa: '',
    cor: '',
    combustivel: 'Gasolina',
    clienteId: 0
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const marcasPopulares = [
    'Toyota', 'Honda', 'Volkswagen', 'Ford', 'Chevrolet', 'Hyundai', 
    'Nissan', 'Kia', 'Peugeot', 'Renault', 'Mitsubishi', 'Mazda'
  ];

  const cores = [
    'Branco', 'Preto', 'Prata', 'Cinza', 'Azul', 'Vermelho', 
    'Verde', 'Amarelo', 'Marrom', 'Dourado', 'Laranja'
  ];

  useEffect(() => {
    if (veiculo) {
      setFormData({
        marca: veiculo.marca,
        modelo: veiculo.modelo,
        ano: veiculo.ano,
        placa: veiculo.placa,
        cor: veiculo.cor,
        combustivel: veiculo.combustivel,
        clienteId: veiculo.clienteId
      });
    } else {
      setFormData({
        marca: '',
        modelo: '',
        ano: new Date().getFullYear(),
        placa: '',
        cor: '',
        combustivel: 'Gasolina',
        clienteId: 0
      });
    }
    setErrors({});
  }, [veiculo, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.marca.trim()) newErrors.marca = 'Marca é obrigatória';
    if (!formData.modelo.trim()) newErrors.modelo = 'Modelo é obrigatório';
    if (formData.ano < 1900 || formData.ano > new Date().getFullYear() + 1) {
      newErrors.ano = 'Ano inválido';
    }
    if (!formData.placa.trim()) {
      newErrors.placa = 'Matrícula é obrigatória';
    } else if (!/^[A-Z]{2}-\d{2}-\d{2}$/.test(formData.placa)) {
      newErrors.placa = 'Formato: LD-12-34';
    }
    if (!formData.cor.trim()) newErrors.cor = 'Cor é obrigatória';
    if (formData.clienteId === 0) newErrors.clienteId = 'Selecione um cliente';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handlePlacaChange = (value: string) => {
    let formatted = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (formatted.length >= 2) {
      formatted = formatted.slice(0, 2) + '-' + formatted.slice(2);
    }
    if (formatted.length >= 6) {
      formatted = formatted.slice(0, 6) + '-' + formatted.slice(6, 8);
    }
    setFormData({ ...formData, placa: formatted });
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-warning text-dark">
            <h5 className="modal-title">
              <i className="fa fa-edit me-2"></i>
              {veiculo ? 'Editar Veículo' : 'Novo Veículo'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">
                        <i className="fa fa-car me-2"></i>
                        Dados do Veículo
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label fw-bold">
                            Marca <span className="text-danger">*</span>
                          </label>
                          <select
                            className={`form-select ${errors.marca ? 'is-invalid' : ''}`}
                            value={formData.marca}
                            onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                          >
                            <option value="">Selecione a marca</option>
                            {marcasPopulares.map(marca => (
                              <option key={marca} value={marca}>{marca}</option>
                            ))}
                            <option value="Outra">Outra marca</option>
                          </select>
                          {errors.marca && <div className="invalid-feedback">{errors.marca}</div>}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-bold">
                            Modelo <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${errors.modelo ? 'is-invalid' : ''}`}
                            value={formData.modelo}
                            onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                            placeholder="Ex: Civic, Corolla, Golf"
                          />
                          {errors.modelo && <div className="invalid-feedback">{errors.modelo}</div>}
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label className="form-label fw-bold">
                            Ano <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className={`form-control ${errors.ano ? 'is-invalid' : ''}`}
                            value={formData.ano}
                            onChange={(e) => setFormData({ ...formData, ano: parseInt(e.target.value) })}
                            min="1900"
                            max={new Date().getFullYear() + 1}
                          />
                          {errors.ano && <div className="invalid-feedback">{errors.ano}</div>}
                        </div>
                        <div className="col-md-4">
                          <label className="form-label fw-bold">
                            Matrícula <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${errors.placa ? 'is-invalid' : ''}`}
                            value={formData.placa}
                            onChange={(e) => handlePlacaChange(e.target.value)}
                            placeholder="LD-12-34"
                            maxLength={8}
                          />
                          {errors.placa && <div className="invalid-feedback">{errors.placa}</div>}
                        </div>
                        <div className="col-md-4">
                          <label className="form-label fw-bold">
                            Combustível <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select"
                            value={formData.combustivel}
                            onChange={(e) => setFormData({ ...formData, combustivel: e.target.value })}
                          >
                            <option value="Gasolina">Gasolina</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Flex">Flex</option>
                            <option value="Elétrico">Elétrico</option>
                            <option value="Híbrido">Híbrido</option>
                          </select>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label fw-bold">
                            Cor <span className="text-danger">*</span>
                          </label>
                          <select
                            className={`form-select ${errors.cor ? 'is-invalid' : ''}`}
                            value={formData.cor}
                            onChange={(e) => setFormData({ ...formData, cor: e.target.value })}
                          >
                            <option value="">Selecione a cor</option>
                            {cores.map(cor => (
                              <option key={cor} value={cor}>{cor}</option>
                            ))}
                          </select>
                          {errors.cor && <div className="invalid-feedback">{errors.cor}</div>}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-bold">
                            Proprietário <span className="text-danger">*</span>
                          </label>
                          <select
                            className={`form-select ${errors.clienteId ? 'is-invalid' : ''}`}
                            value={formData.clienteId}
                            onChange={(e) => setFormData({ ...formData, clienteId: parseInt(e.target.value) })}
                          >
                            <option value={0}>Selecione o cliente</option>
                            {clientes.map(cliente => (
                              <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                            ))}
                          </select>
                          {errors.clienteId && <div className="invalid-feedback">{errors.clienteId}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">
                        <i className="fa fa-eye me-2"></i>
                        Pré-visualização
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="text-center mb-3">
                        <i className="fa fa-car fa-4x text-primary mb-3"></i>
                        <h5 className="fw-bold">{formData.marca || 'Marca'} {formData.modelo || 'Modelo'}</h5>
                      </div>
                      
                      <div className="mb-2">
                        <small className="text-muted">Matrícula:</small>
                        <div className="badge bg-dark ms-2">{formData.placa || 'LD-12-34'}</div>
                      </div>
                      
                      <div className="mb-2">
                        <small className="text-muted">Ano:</small>
                        <span className="ms-2">{formData.ano}</span>
                      </div>
                      
                      <div className="mb-2">
                        <small className="text-muted">Cor:</small>
                        <span className="badge bg-secondary ms-2">{formData.cor || 'Cor'}</span>
                      </div>
                      
                      <div className="mb-2">
                        <small className="text-muted">Combustível:</small>
                        <span className={`badge ms-2 ${
                          formData.combustivel === 'Gasolina' ? 'bg-danger' : 
                          formData.combustivel === 'Diesel' ? 'bg-warning' : 'bg-success'
                        }`}>
                          {formData.combustivel}
                        </span>
                      </div>
                      
                      <div className="mb-2">
                        <small className="text-muted">Proprietário:</small>
                        <div className="fw-bold">
                          {clientes.find(c => c.id === formData.clienteId)?.nome || 'Selecione'}
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
              <button type="submit" className="btn btn-warning">
                <i className="fa fa-save me-2"></i>
                {veiculo ? 'Atualizar' : 'Salvar'} Veículo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}