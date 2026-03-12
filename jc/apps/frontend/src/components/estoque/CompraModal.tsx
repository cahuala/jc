import React, { useState, useEffect } from 'react';

interface ItemCompra {
  produto: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

interface Compra {
  id: number;
  numero: string;
  fornecedor: string;
  data: string;
  itens: ItemCompra[];
  subtotal: number;
  desconto: number;
  total: number;
  status: string;
  responsavel: string;
  observacoes: string;
  numeroNF: string;
}

interface CompraModalProps {
  compra: Compra | null;
  onSave: (compra: Compra) => void;
  onClose: () => void;
}

const produtosDisponiveis = [
  'Filtro de Óleo - Mann Filter W712/75',
  'Pastilha de Freio Dianteira - Bosch BB1234',
  'Óleo Motor 5W30 - Castrol GTX',
  'Vela de Ignição - NGK BKR6E',
  'Correia Dentada - Gates T318',
  'Amortecedor Dianteiro - Monroe G7392',
  'Bateria 60Ah - Moura M60GD',
  'Disco de Freio - TRW DF4567'
];

const fornecedoresDisponiveis = [
  'Auto Peças Silva',
  'Distribuidora Norte',
  'Lubrificantes Express',
  'Suspensão Total',
  'Elétrica Automotiva',
  'Freios & Cia'
];

export default function CompraModal({ compra, onSave, onClose }: CompraModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dados');
  const [formData, setFormData] = useState<Compra>({
    id: 0,
    numero: `CP-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
    fornecedor: '',
    data: new Date().toISOString().slice(0, 16),
    itens: [],
    subtotal: 0,
    desconto: 0,
    total: 0,
    status: 'pendente',
    responsavel: 'Usuário Atual',
    observacoes: '',
    numeroNF: ''
  });

  const [novoItem, setNovoItem] = useState({
    produto: '',
    quantidade: 1,
    precoUnitario: 0
  });

  useEffect(() => {
    if (compra) {
      setFormData(compra);
    }
  }, [compra]);

  useEffect(() => {
    const subtotal = formData.itens.reduce((acc, item) => acc + item.subtotal, 0);
    const total = subtotal - formData.desconto;
    setFormData(prev => ({ ...prev, subtotal, total }));
  }, [formData.itens, formData.desconto]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'desconto' ? parseFloat(value) || 0 : value }));
  };

  const handleNovoItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNovoItem(prev => ({ ...prev, [name]: name === 'quantidade' ? parseInt(value) || 1 : name === 'precoUnitario' ? parseFloat(value) || 0 : value }));
  };

  const adicionarItem = () => {
    if (!novoItem.produto || novoItem.quantidade <= 0 || novoItem.precoUnitario <= 0) return;

    const item: ItemCompra = {
      produto: novoItem.produto,
      quantidade: novoItem.quantidade,
      precoUnitario: novoItem.precoUnitario,
      subtotal: novoItem.quantidade * novoItem.precoUnitario
    };

    setFormData(prev => ({ ...prev, itens: [...prev.itens, item] }));
    setNovoItem({ produto: '', quantidade: 1, precoUnitario: 0 });
  };

  const removerItem = (index: number) => {
    setFormData(prev => ({ ...prev, itens: prev.itens.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.itens.length === 0) {
      alert('Adicione pelo menos um item à compra!');
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
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fa fa-truck me-2"></i>
              {compra ? 'Editar Compra' : 'Nova Compra'}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-8">
                  <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                      <button
                        type="button"
                        className={`nav-link ${activeTab === 'dados' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dados')}
                      >
                        <i className="fa fa-info-circle me-1"></i>
                        Dados da Compra
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        type="button"
                        className={`nav-link ${activeTab === 'itens' ? 'active' : ''}`}
                        onClick={() => setActiveTab('itens')}
                      >
                        <i className="fa fa-list me-1"></i>
                        Itens ({formData.itens.length})
                      </button>
                    </li>
                  </ul>

                  {activeTab === 'dados' && (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Número da Compra</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.numero}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Data/Hora *</label>
                        <input
                          type="datetime-local"
                          className="form-control"
                          name="data"
                          value={formData.data}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Fornecedor *</label>
                        <select
                          className="form-select"
                          name="fornecedor"
                          value={formData.fornecedor}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Selecione o fornecedor...</option>
                          {fornecedoresDisponiveis.map(fornecedor => (
                            <option key={fornecedor} value={fornecedor}>{fornecedor}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Número da NF</label>
                        <input
                          type="text"
                          className="form-control"
                          name="numeroNF"
                          value={formData.numeroNF}
                          onChange={handleInputChange}
                          placeholder="Ex: NF-001234"
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
                          <option value="pendente">Pendente</option>
                          <option value="recebida">Recebida</option>
                          <option value="cancelada">Cancelada</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-bold">Observações</label>
                        <textarea
                          className="form-control"
                          name="observacoes"
                          value={formData.observacoes}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Observações sobre a compra..."
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'itens' && (
                    <div>
                      <div className="card mb-3">
                        <div className="card-header">
                          <h6 className="card-title mb-0">Adicionar Item</h6>
                        </div>
                        <div className="card-body">
                          <div className="row g-2">
                            <div className="col-md-5">
                              <select
                                className="form-select form-select-sm"
                                name="produto"
                                value={novoItem.produto}
                                onChange={handleNovoItemChange}
                              >
                                <option value="">Selecione o produto...</option>
                                {produtosDisponiveis.map(produto => (
                                  <option key={produto} value={produto}>{produto}</option>
                                ))}
                              </select>
                            </div>
                            <div className="col-md-2">
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                name="quantidade"
                                value={novoItem.quantidade}
                                onChange={handleNovoItemChange}
                                placeholder="Qtd"
                                min="1"
                              />
                            </div>
                            <div className="col-md-3">
                              <div className="input-group input-group-sm">
                                <span className="input-group-text">Kz</span>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="precoUnitario"
                                  value={novoItem.precoUnitario}
                                  onChange={handleNovoItemChange}
                                  step="0.01"
                                  placeholder="Preço"
                                />
                              </div>
                            </div>
                            <div className="col-md-2">
                              <button
                                type="button"
                                className="btn btn-success btn-sm w-100"
                                onClick={adicionarItem}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="table-responsive">
                        <table className="table table-sm">
                          <thead className="table-light">
                            <tr>
                              <th>Produto</th>
                              <th>Qtd</th>
                              <th>Preço Unit.</th>
                              <th>Subtotal</th>
                              <th>Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.itens.map((item, index) => (
                              <tr key={index}>
                                <td>{item.produto}</td>
                                <td>{item.quantidade}</td>
                                <td>Kz {item.precoUnitario.toFixed(2)}</td>
                                <td className="fw-bold">Kz {item.subtotal.toFixed(2)}</td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => removerItem(index)}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label className="form-label fw-bold">Desconto</label>
                          <div className="input-group">
                            <span className="input-group-text">Kz</span>
                            <input
                              type="number"
                              className="form-control"
                              name="desconto"
                              value={formData.desconto}
                              onChange={handleInputChange}
                              step="0.01"
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-md-4">
                  <div className="card bg-light">
                    <div className="card-header">
                      <h6 className="card-title mb-0">
                        <i className="fa fa-calculator me-2"></i>
                        Resumo da Compra
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="mb-2">
                        <strong>Fornecedor:</strong><br/>
                        <span className="text-primary">{formData.fornecedor || 'Não selecionado'}</span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Itens:</strong><br/>
                        <span className="badge bg-info">{formData.itens.length}</span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Status:</strong><br/>
                        <span className={`badge ${formData.status === 'recebida' ? 'bg-success' : formData.status === 'pendente' ? 'bg-warning' : 'bg-danger'}`}>
                          {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                        </span>
                      </div>
                      
                      <hr/>
                      
                      <div className="mb-2">
                        <strong>Subtotal:</strong><br/>
                        <span className="h6">Kz {formData.subtotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Desconto:</strong><br/>
                        <span className="text-danger">- Kz {formData.desconto.toFixed(2)}</span>
                      </div>
                      
                      <hr/>
                      
                      <div className="mb-0">
                        <strong>Total:</strong><br/>
                        <span className="h4 text-success">Kz {formData.total.toFixed(2)}</span>
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
                    Salvar Compra
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