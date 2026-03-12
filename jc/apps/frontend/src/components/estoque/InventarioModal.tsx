import React, { useState } from 'react';
import Toast from '@/components/ui/Toast';

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

interface InventarioModalProps {
  item: ItemInventario | null;
  onSave: (item: ItemInventario) => void;
  onClose: () => void;
}

export default function InventarioModal({ item, onSave, onClose }: InventarioModalProps) {
  const [formData, setFormData] = useState({
    estoqueContado: item?.estoqueContado || 0,
    usuario: item?.usuario || '',
    dataContagem: item?.dataContagem ? item.dataContagem.split('T')[0] : new Date().toISOString().split('T')[0],
    observacoes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.estoqueContado < 0) {
      newErrors.estoqueContado = 'Quantidade não pode ser negativa';
    }
    if (!formData.usuario.trim()) {
      newErrors.usuario = 'Usuário é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && item) {
      const updatedItem: ItemInventario = {
        ...item,
        estoqueContado: formData.estoqueContado,
        diferenca: formData.estoqueContado - item.estoqueAtual,
        valorDiferenca: (formData.estoqueContado - item.estoqueAtual) * item.valorUnitario,
        usuario: formData.usuario,
        dataContagem: formData.dataContagem + 'T' + new Date().toTimeString().split(' ')[0],
        status: 'conferido'
      };
      onSave(updatedItem);
    }
  };

  const hasDivergencia = () => {
    return item ? formData.estoqueContado !== item.estoqueAtual : false;
  };

  const getDivergencia = () => {
    return item ? formData.estoqueContado - item.estoqueAtual : 0;
  };



  if (!item) return null;

  const divergencia = getDivergencia();
  const percentualDivergencia = item.estoqueAtual > 0 ? (Math.abs(divergencia) / item.estoqueAtual * 100) : 0;

  return (
    <>
      <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">
                <i className="fa fa-clipboard-check me-2"></i>
                Editar Inventário - {item.produto}
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
                          Informações do Produto
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12">
                            <strong>Produto:</strong> {item.produto}
                          </div>
                          <div className="col-md-6">
                            <strong>Categoria:</strong> {item.categoria}
                          </div>
                          <div className="col-md-6">
                            <strong>Estoque Atual:</strong> 
                            <span className="badge bg-primary ms-2">{item.estoqueAtual}</span>
                          </div>
                          <div className="col-md-6">
                            <strong>Valor Unitário:</strong> 
                            <span className="text-success ms-2">Kz {item.valorUnitario.toFixed(2)}</span>
                          </div>
                          <div className="col-md-6">
                            <strong>Status:</strong> 
                            <span className="badge bg-warning ms-2">{item.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-header bg-light">
                        <h6 className="mb-0">
                          <i className="fa fa-count me-2"></i>
                          Dados do Inventário
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="row mb-3">
                          <div className="col-md-6">
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

                        <div className="row mb-3">
                          <div className="col-md-12">
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
                        </div>

                        {hasDivergencia() && (
                          <div className="alert alert-warning">
                            <i className="fa fa-exclamation-triangle me-2"></i>
                            <strong>Divergência detectada!</strong> 
                            Diferença de {divergencia > 0 ? '+' : ''}{divergencia} unidades.
                          </div>
                        )}

                        <div className="mb-3">
                          <label className="form-label fw-bold">Observações</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={formData.observacoes}
                            onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                            placeholder="Observações sobre o inventário, condições dos produtos, etc..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-header bg-light">
                        <h6 className="mb-0">
                          <i className="fa fa-chart-line me-2"></i>
                          Análise do Inventário
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="text-center mb-3">
                          <i className={`fa fa-${hasDivergencia() ? 'exclamation-triangle text-warning' : 'check-circle text-success'} fa-3x mb-2`}></i>
                          <h6 className={hasDivergencia() ? 'text-warning' : 'text-success'}>
                            {hasDivergencia() ? 'DIVERGÊNCIA' : 'CONFORME'}
                          </h6>
                        </div>

                        <div className="mb-3">
                          <div className="d-flex justify-content-between">
                            <span>Estoque Atual:</span>
                            <span className="fw-bold">{item.estoqueAtual}</span>
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
                            <span className="fw-bold">Divergência:</span>
                            <span className={`fw-bold fs-5 ${
                              divergencia === 0 ? 'text-success' : 
                              divergencia > 0 ? 'text-primary' : 'text-danger'
                            }`}>
                              {divergencia > 0 ? '+' : ''}{divergencia}
                            </span>
                          </div>
                        </div>

                        {hasDivergencia() && (
                          <>
                            <div className="mb-3">
                              <div className="d-flex justify-content-between">
                                <span>Percentual:</span>
                                <span className="fw-bold">{percentualDivergencia.toFixed(1)}%</span>
                              </div>
                            </div>

                            <div className="mb-3">
                              <div className="d-flex justify-content-between">
                                <span>Impacto Financeiro:</span>
                                <span className={`fw-bold ${divergencia > 0 ? 'text-success' : 'text-danger'}`}>
                                  {divergencia > 0 ? '+' : ''}Kz {(Math.abs(divergencia) * item.valorUnitario).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </>
                        )}

                        <div className="mt-3">
                          <small className="text-muted">
                            <i className="fa fa-info-circle me-1"></i>
                            {hasDivergencia() 
                              ? 'O estoque será ajustado automaticamente após confirmação.'
                              : 'Nenhum ajuste será necessário.'
                            }
                          </small>
                        </div>

                        {formData.usuario && (
                          <div className="mt-3">
                            <div className="alert alert-info p-2">
                              <i className="fa fa-user me-2"></i>
                              <small>Responsável: {formData.usuario}</small>
                            </div>
                          </div>
                        )}
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
                <button type="button" className="btn btn-outline-warning" onClick={() => {
                  setFormData({
                    estoqueContado: item?.estoqueAtual || 0,
                    usuario: '',
                    dataContagem: new Date().toISOString().split('T')[0],
                    observacoes: ''
                  });
                  setErrors({});
                }}>
                  <i className="fa fa-undo me-2"></i>
                  Limpar
                </button>
                <button type="submit" className="btn btn-success">
                  <i className="fa fa-save me-2"></i>
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Toast
        isOpen={showToast}
        message={toastMessage}
        type="error"
        onClose={() => setShowToast(false)}
      />
    </>
  );
}