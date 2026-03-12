import React, { useState, useEffect } from 'react';

interface Categoria {
  id: number;
  nome: string;
  descricao: string;
  totalProdutos: number;
  status: string;
}

interface CategoriaModalProps {
  categoria: Categoria | null;
  onSave: (categoria: Categoria) => void;
  onClose: () => void;
}

export default function CategoriaModal({ categoria, onSave, onClose }: CategoriaModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState<Categoria>({
    id: 0,
    nome: '',
    descricao: '',
    totalProdutos: 0,
    status: 'ativo'
  });

  useEffect(() => {
    if (categoria) {
      setFormData(categoria);
    }
  }, [categoria]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
              <i className="fa fa-tags me-2"></i>
              {categoria ? 'Editar Categoria' : 'Nova Categoria'}
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
                        Nome da Categoria *
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.nome ? 'is-invalid' : formData.nome ? 'is-valid' : ''}`}
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Ex: Filtros, Freios, Lubrificantes..."
                        required
                      />
                      {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">Descrição</label>
                      <textarea
                        className="form-control"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Descreva os tipos de produtos desta categoria..."
                      />
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
                          <i className="fa fa-tags fa-2x"></i>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Nome:</strong><br/>
                        <span className="text-primary">{formData.nome || 'Nome da categoria'}</span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Status:</strong><br/>
                        <span className={`badge ${formData.status === 'ativo' ? 'bg-success' : 'bg-secondary'}`}>
                          {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Produtos:</strong><br/>
                        <span className="badge bg-info">{formData.totalProdutos}</span>
                      </div>
                      
                      {formData.descricao && (
                        <div className="mt-3">
                          <strong>Descrição:</strong><br/>
                          <small className="text-muted">{formData.descricao}</small>
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
                    Salvar Categoria
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