import React, { useState } from 'react';

interface ItemInventario {
  id: number;
  produto: string;
  categoria: string;
  estoqueAtual: number;
  estoqueContado: number;
  diferenca: number;
  valorUnitario: number;
  valorDiferenca: number;
  status: string;
  usuario: string;
  dataContagem: string;
}

interface NovaContagemModalProps {
  onSave: (item: ItemInventario) => void;
  onClose: () => void;
}

export default function NovaContagemModal({ onSave, onClose }: NovaContagemModalProps) {
  const [formData, setFormData] = useState({
    produto: '',
    categoria: '',
    estoqueAtual: 0,
    estoqueContado: 0,
    valorUnitario: 0,
    usuario: '',
    dataContagem: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categorias = [
    'Filtros',
    'Freios',
    'Lubrificantes',
    'Ignição',
    'Correias',
    'Suspensão',
    'Elétrica',
    'Pneus',
    'Outros'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.produto.trim()) {
      newErrors.produto = 'Produto é obrigatório';
    }
    if (!formData.categoria) {
      newErrors.categoria = 'Categoria é obrigatória';
    }
    if (formData.estoqueAtual < 0) {
      newErrors.estoqueAtual = 'Estoque atual não pode ser negativo';
    }
    if (formData.estoqueContado < 0) {
      newErrors.estoqueContado = 'Estoque contado não pode ser negativo';
    }
    if (formData.valorUnitario <= 0) {
      newErrors.valorUnitario = 'Valor unitário deve ser maior que zero';
    }
    if (!formData.usuario.trim()) {
      newErrors.usuario = 'Usuário é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const diferenca = formData.estoqueContado - formData.estoqueAtual;
      const newItem: ItemInventario = {
        id: 0, // Será definido na página principal
        produto: formData.produto,
        categoria: formData.categoria,
        estoqueAtual: formData.estoqueAtual,
        estoqueContado: formData.estoqueContado,
        diferenca,
        valorUnitario: formData.valorUnitario,
        valorDiferenca: diferenca * formData.valorUnitario,
        status: 'pendente',
        usuario: formData.usuario,
        dataContagem: formData.dataContagem + 'T' + new Date().toTimeString().split(' ')[0]
      };
      onSave(newItem);
    }
  };

  const diferenca = formData.estoqueContado - formData.estoqueAtual;
  const valorDiferenca = diferenca * formData.valorUnitario;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fa fa-plus me-2"></i>
              Nova Contagem de Inventário
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
                        <i className="fa fa-box me-2"></i>
                        Dados do Produto
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="row mb-3">
                        <div className="col-md-8">
                          <label className="form-label fw-bold">
                            Nome do Produto <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${errors.produto ? 'is-invalid' : ''}`}
                            value={formData.produto}
                            onChange={(e) => setFormData({ ...formData, produto: e.target.value })}
                            placeholder="Ex: Filtro de Óleo - Mann Filter W712/75"
                          />
                          {errors.produto && <div className="invalid-feedback">{errors.produto}</div>}
                        </div>
                        <div className="col-md-4">
                          <label className="form-label fw-bold">
                            Categoria <span className="text-danger">*</span>
                          </label>
                          <select
                            className={`form-select ${errors.categoria ? 'is-invalid' : ''}`}
                            value={formData.categoria}
                            onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                          >
                            <option value="">Selecione</option>
                            {categorias.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                          {errors.categoria && <div className="invalid-feedback">{errors.categoria}</div>}
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label className="form-label fw-bold">
                            Estoque Atual <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className={`form-control ${errors.estoqueAtual ? 'is-invalid' : ''}`}
                            value={formData.estoqueAtual}
                            onChange={(e) => setFormData({ ...formData, estoqueAtual: parseInt(e.target.value) || 0 })}
                            min="0"
                            placeholder="0"
                          />
                          {errors.estoqueAtual && <div className="invalid-feedback">{errors.estoqueAtual}</div>}
                        </div>
                        <div className="col-md-4">
                          <label className="form-label fw-bold">
                            Quantidade Contada <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className={`form-control ${errors.estoqueContado ? 'is-invalid' : ''}`}
                            value={formData.estoqueContado}
                            onChange={(e) => setFormData({ ...formData, estoqueContado: parseInt(e.target.value) || 0 })}
                            min="0"
                            placeholder="0"
                          />
                          {errors.estoqueContado && <div className="invalid-feedback">{errors.estoqueContado}</div>}
                        </div>
                        <div className="col-md-4">
                          <label className="form-label fw-bold">
                            Valor Unitário (Kz) <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className={`form-control ${errors.valorUnitario ? 'is-invalid' : ''}`}
                            value={formData.valorUnitario}
                            onChange={(e) => setFormData({ ...formData, valorUnitario: parseFloat(e.target.value) || 0 })}
                            min="0"
                            placeholder="0.00"
                          />
                          {errors.valorUnitario && <div className="invalid-feedback">{errors.valorUnitario}</div>}
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label fw-bold">
                            Usuário Responsável <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${errors.usuario ? 'is-invalid' : ''}`}
                            value={formData.usuario}
                            onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                            placeholder="Nome do usuário"
                          />
                          {errors.usuario && <div className="invalid-feedback">{errors.usuario}</div>}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-bold">
                            Data da Contagem <span className="text-danger">*</span>
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            value={formData.dataContagem}
                            onChange={(e) => setFormData({ ...formData, dataContagem: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">
                        <i className="fa fa-calculator me-2"></i>
                        Resumo da Contagem
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="text-center mb-3">
                        <i className={`fa fa-${diferenca !== 0 ? 'exclamation-triangle text-warning' : 'check-circle text-success'} fa-3x mb-2`}></i>
                        <h6 className={diferenca !== 0 ? 'text-warning' : 'text-success'}>
                          {diferenca !== 0 ? 'DIVERGÊNCIA' : 'CONFORME'}
                        </h6>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span>Estoque Atual:</span>
                          <span className="fw-bold">{formData.estoqueAtual}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span>Quantidade Contada:</span>
                          <span className="fw-bold">{formData.estoqueContado}</span>
                        </div>
                      </div>

                      <hr />

                      <div className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span className="fw-bold">Diferença:</span>
                          <span className={`fw-bold fs-5 ${
                            diferenca === 0 ? 'text-success' : 
                            diferenca > 0 ? 'text-primary' : 'text-danger'
                          }`}>
                            {diferenca > 0 ? '+' : ''}{diferenca}
                          </span>
                        </div>
                      </div>

                      {diferenca !== 0 && (
                        <div className="mb-3">
                          <div className="d-flex justify-content-between">
                            <span>Impacto Financeiro:</span>
                            <span className={`fw-bold ${diferenca > 0 ? 'text-success' : 'text-danger'}`}>
                              {diferenca > 0 ? '+' : ''}Kz {Math.abs(valorDiferenca).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="mt-3">
                        <small className="text-muted">
                          <i className="fa fa-info-circle me-1"></i>
                          {diferenca !== 0 
                            ? 'Uma nova entrada será criada no inventário.'
                            : 'Contagem está conforme o esperado.'
                          }
                        </small>
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
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-save me-2"></i>
                Criar Contagem
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}