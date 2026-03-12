import React, { useState } from 'react';
import Toast from '@/components/ui/Toast';

interface Produto {
  id: number;
  codigo: string;
  nome: string;
  categoria: string;
  marca: string;
  modelo: string;
  estoque: number;
  estoqueMinimo: number;
  unidade: string;
  precoCompra: number;
  precoVenda: number;
  localizacao: string;
}

interface MovimentarEstoqueModalProps {
  isOpen: boolean;
  produto: Produto | null;
  onSave: (movimentacao: any) => void;
  onClose: () => void;
}

export default function MovimentarEstoqueModal({ isOpen, produto, onSave, onClose }: MovimentarEstoqueModalProps) {
  const [formData, setFormData] = useState({
    tipoMovimentacao: 'entrada',
    quantidade: 0,
    motivo: '',
    observacoes: '',
    documento: '',
    responsavel: '',
    dataMovimentacao: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const motivosEntrada = [
    'Compra de fornecedor',
    'Devolução de cliente',
    'Transferência entre filiais',
    'Ajuste de inventário',
    'Produção interna',
    'Outros'
  ];

  const motivosSaida = [
    'Venda ao cliente',
    'Uso interno',
    'Transferência entre filiais',
    'Perda/Avaria',
    'Vencimento',
    'Ajuste de inventário',
    'Outros'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.quantidade <= 0) {
      newErrors.quantidade = 'Quantidade deve ser maior que zero';
    }
    if (!formData.motivo) {
      newErrors.motivo = 'Motivo é obrigatório';
    }
    if (!formData.responsavel.trim()) {
      newErrors.responsavel = 'Responsável é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const novoEstoque = formData.tipoMovimentacao === 'entrada' 
        ? (produto?.estoque || 0) + formData.quantidade
        : (produto?.estoque || 0) - formData.quantidade;

      if (novoEstoque < 0) {
        setToastMessage('Quantidade insuficiente em estoque!');
        setShowToast(true);
        return;
      }

      onSave({
        ...formData,
        produtoId: produto?.id,
        estoqueAnterior: produto?.estoque,
        estoqueNovo: novoEstoque
      });
    }
  };

  const resetForm = () => {
    setFormData({
      tipoMovimentacao: 'entrada',
      quantidade: 0,
      motivo: '',
      observacoes: '',
      documento: '',
      responsavel: '',
      dataMovimentacao: new Date().toISOString().split('T')[0]
    });
    setErrors({});
  };

  if (!isOpen || !produto) return null;

  const novoEstoque = formData.tipoMovimentacao === 'entrada' 
    ? produto.estoque + formData.quantidade
    : produto.estoque - formData.quantidade;

  return (
    <>
      <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">
                <i className="fa fa-exchange-alt me-2"></i>
                Movimentar Estoque - {produto.nome}
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
                          <div className="col-md-6">
                            <strong>Código:</strong> {produto.codigo}
                          </div>
                          <div className="col-md-6">
                            <strong>Categoria:</strong> {produto.categoria}
                          </div>
                          <div className="col-md-6">
                            <strong>Marca/Modelo:</strong> {produto.marca} {produto.modelo}
                          </div>
                          <div className="col-md-6">
                            <strong>Localização:</strong> {produto.localizacao}
                          </div>
                          <div className="col-md-6">
                            <strong>Estoque Atual:</strong> 
                            <span className="badge bg-primary ms-2">{produto.estoque} {produto.unidade}</span>
                          </div>
                          <div className="col-md-6">
                            <strong>Estoque Mínimo:</strong> 
                            <span className="badge bg-warning ms-2">{produto.estoqueMinimo} {produto.unidade}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-header bg-light">
                        <h6 className="mb-0">
                          <i className="fa fa-edit me-2"></i>
                          Dados da Movimentação
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label fw-bold">
                              Tipo de Movimentação <span className="text-danger">*</span>
                            </label>
                            <div className="btn-group w-100" role="group">
                              <input
                                type="radio"
                                className="btn-check"
                                name="tipoMovimentacao"
                                id="entrada"
                                checked={formData.tipoMovimentacao === 'entrada'}
                                onChange={() => setFormData({ ...formData, tipoMovimentacao: 'entrada', motivo: '' })}
                              />
                              <label className="btn btn-outline-success" htmlFor="entrada">
                                <i className="fa fa-plus me-2"></i>
                                Entrada
                              </label>

                              <input
                                type="radio"
                                className="btn-check"
                                name="tipoMovimentacao"
                                id="saida"
                                checked={formData.tipoMovimentacao === 'saida'}
                                onChange={() => setFormData({ ...formData, tipoMovimentacao: 'saida', motivo: '' })}
                              />
                              <label className="btn btn-outline-danger" htmlFor="saida">
                                <i className="fa fa-minus me-2"></i>
                                Saída
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label fw-bold">
                              Data da Movimentação <span className="text-danger">*</span>
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              value={formData.dataMovimentacao}
                              onChange={(e) => setFormData({ ...formData, dataMovimentacao: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label fw-bold">
                              Quantidade <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                              <input
                                type="number"
                                className={`form-control ${errors.quantidade ? 'is-invalid' : ''}`}
                                value={formData.quantidade}
                                onChange={(e) => setFormData({ ...formData, quantidade: parseInt(e.target.value) || 0 })}
                                min="1"
                                placeholder="0"
                              />
                              <span className="input-group-text">{produto.unidade}</span>
                              {errors.quantidade && <div className="invalid-feedback">{errors.quantidade}</div>}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label fw-bold">
                              Motivo <span className="text-danger">*</span>
                            </label>
                            <select
                              className={`form-select ${errors.motivo ? 'is-invalid' : ''}`}
                              value={formData.motivo}
                              onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                            >
                              <option value="">Selecione o motivo</option>
                              {(formData.tipoMovimentacao === 'entrada' ? motivosEntrada : motivosSaida).map(motivo => (
                                <option key={motivo} value={motivo}>{motivo}</option>
                              ))}
                            </select>
                            {errors.motivo && <div className="invalid-feedback">{errors.motivo}</div>}
                          </div>
                        </div>

                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label fw-bold">Documento de Referência</label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.documento}
                              onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                              placeholder="Ex: NF-001234, OS-005678"
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label fw-bold">
                              Responsável <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className={`form-control ${errors.responsavel ? 'is-invalid' : ''}`}
                              value={formData.responsavel}
                              onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                              placeholder="Nome do responsável"
                            />
                            {errors.responsavel && <div className="invalid-feedback">{errors.responsavel}</div>}
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-bold">Observações</label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={formData.observacoes}
                            onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                            placeholder="Observações adicionais sobre a movimentação..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-header bg-light">
                        <h6 className="mb-0">
                          <i className="fa fa-calculator me-2"></i>
                          Resumo da Movimentação
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="text-center mb-3">
                          <i className={`fa fa-${formData.tipoMovimentacao === 'entrada' ? 'arrow-up text-success' : 'arrow-down text-danger'} fa-3x mb-2`}></i>
                          <h5 className={formData.tipoMovimentacao === 'entrada' ? 'text-success' : 'text-danger'}>
                            {formData.tipoMovimentacao === 'entrada' ? 'ENTRADA' : 'SAÍDA'}
                          </h5>
                        </div>

                        <div className="mb-3">
                          <div className="d-flex justify-content-between">
                            <span>Estoque Atual:</span>
                            <span className="fw-bold">{produto.estoque} {produto.unidade}</span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="d-flex justify-content-between">
                            <span>Quantidade:</span>
                            <span className={`fw-bold ${formData.tipoMovimentacao === 'entrada' ? 'text-success' : 'text-danger'}`}>
                              {formData.tipoMovimentacao === 'entrada' ? '+' : '-'}{formData.quantidade} {produto.unidade}
                            </span>
                          </div>
                        </div>

                        <hr />

                        <div className="mb-3">
                          <div className="d-flex justify-content-between">
                            <span className="fw-bold">Novo Estoque:</span>
                            <span className={`fw-bold fs-5 ${novoEstoque < produto.estoqueMinimo ? 'text-danger' : 'text-success'}`}>
                              {novoEstoque} {produto.unidade}
                            </span>
                          </div>
                        </div>

                        {novoEstoque < produto.estoqueMinimo && (
                          <div className="alert alert-warning">
                            <i className="fa fa-exclamation-triangle me-2"></i>
                            <small>Estoque ficará abaixo do mínimo!</small>
                          </div>
                        )}

                        {novoEstoque < 0 && (
                          <div className="alert alert-danger">
                            <i className="fa fa-times-circle me-2"></i>
                            <small>Quantidade insuficiente em estoque!</small>
                          </div>
                        )}

                        <div className="mt-3">
                          <small className="text-muted">
                            <strong>Motivo:</strong> {formData.motivo || 'Não selecionado'}
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
                <button type="button" className="btn btn-outline-warning" onClick={resetForm}>
                  <i className="fa fa-undo me-2"></i>
                  Limpar
                </button>
                <button 
                  type="submit" 
                  className={`btn ${formData.tipoMovimentacao === 'entrada' ? 'btn-success' : 'btn-danger'}`}
                  disabled={novoEstoque < 0}
                >
                  <i className={`fa fa-${formData.tipoMovimentacao === 'entrada' ? 'plus' : 'minus'} me-2`}></i>
                  Confirmar {formData.tipoMovimentacao === 'entrada' ? 'Entrada' : 'Saída'}
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