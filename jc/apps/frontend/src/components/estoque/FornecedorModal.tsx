import React, { useState, useEffect } from 'react';

interface Fornecedor {
  id: number;
  nome: string;
  nif: string;
  contato: string;
  telefone: string;
  status: string;
}

interface FornecedorModalProps {
  fornecedor: Fornecedor | null;
  onSave: (fornecedor: Fornecedor) => void;
  onClose: () => void;
}

export default function FornecedorModal({ fornecedor, onSave, onClose }: FornecedorModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState<Fornecedor>({
    id: 0,
    nome: '',
    nif: '',
    contato: '',
    telefone: '',
    status: 'ativo'
  });

  useEffect(() => {
    if (fornecedor) {
      setFormData(fornecedor);
    }
  }, [fornecedor]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    
    if (!formData.nif.trim()) {
      newErrors.nif = 'NIF é obrigatório';
    } else if (formData.nif.replace(/\D/g, '').length !== 9) {
      newErrors.nif = 'NIF deve ter 9 dígitos';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatNIF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{9})/, '$1');
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const handleNIFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNIF(e.target.value);
    setFormData(prev => ({ ...prev, nif: formatted }));
    if (errors.nif) {
      setErrors(prev => ({ ...prev, nif: '' }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, telefone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
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
              <i className="fa fa-truck me-2"></i>
              {fornecedor ? 'Editar Fornecedor' : 'Novo Fornecedor'}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-8">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-bold">
                        Nome da Empresa *
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.nome ? 'is-invalid' : formData.nome ? 'is-valid' : ''}`}
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Ex: Auto Peças Silva Lda"
                        required
                      />
                      {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-bold">NIF *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.nif ? 'is-invalid' : formData.nif.replace(/\D/g, '').length === 9 ? 'is-valid' : ''}`}
                        name="nif"
                        value={formData.nif}
                        onChange={handleNIFChange}
                        placeholder="123456789"
                        maxLength={9}
                        required
                      />
                      {errors.nif && <div className="invalid-feedback">{errors.nif}</div>}
                    </div>
                    
                    <div className="col-md-6">
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
                      <label className="form-label fw-bold">Pessoa de Contato</label>
                      <input
                        type="text"
                        className="form-control"
                        name="contato"
                        value={formData.contato}
                        onChange={handleInputChange}
                        placeholder="Nome do responsável"
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Telefone</label>
                      <input
                        type="text"
                        className="form-control"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handlePhoneChange}
                        placeholder="(+244) 999-999-999"
                        maxLength={15}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="card bg-light">
                    <div className="card-header">
                      <h6 className="card-title mb-0">
                        <i className="fa fa-eye me-2"></i>
                        Preview
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="text-center mb-3">
                        <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
                          <i className="fa fa-truck fa-2x"></i>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Empresa:</strong><br/>
                        <span className="text-primary">{formData.nome || 'Nome da empresa'}</span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>NIF:</strong><br/>
                        <span className="text-muted">{formData.nif || '123456789'}</span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Status:</strong><br/>
                        <span className={`badge ${formData.status === 'ativo' ? 'bg-success' : 'bg-secondary'}`}>
                          {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                        </span>
                      </div>
                      
                      {formData.contato && (
                        <div className="mb-2">
                          <strong>Contato:</strong><br/>
                          <span className="text-muted">{formData.contato}</span>
                        </div>
                      )}
                      
                      {formData.telefone && (
                        <div className="mb-2">
                          <strong>Telefone:</strong><br/>
                          <span className="text-muted">{formData.telefone}</span>
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
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Salvando...
                  </>
                ) : (
                  <>
                    <i className="fa fa-save me-2"></i>
                    Salvar Fornecedor
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