import React, { useState, useEffect } from 'react';

interface ItemVenda {
  produto: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

interface Venda {
  id: number;
  numero: string;
  cliente: string;
  data: string;
  itens: ItemVenda[];
  subtotal: number;
  desconto: number;
  total: number;
  status: string;
  vendedor: string;
  observacoes: string;
}

interface VendaModalProps {
  venda: Venda | null;
  onSave: (venda: Venda) => void;
  onClose: () => void;
}

const produtosDisponiveis = [
  { nome: 'Filtro de Óleo - Mann Filter W712/75', preco: 25.90, estoque: 45 },
  { nome: 'Pastilha de Freio Dianteira - Bosch BB1234', preco: 75.00, estoque: 8 },
  { nome: 'Óleo Motor 5W30 - Castrol GTX', preco: 45.90, estoque: 25 },
  { nome: 'Vela de Ignição - NGK BKR6E', preco: 22.90, estoque: 60 },
  { nome: 'Correia Dentada - Gates T318', preco: 135.00, estoque: 3 }
];

const clientesDisponiveis = [
  'João Silva', 'Carlos Oliveira', 'Ana Costa', 'Maria Santos', 'Pedro Lima'
];

export default function VendaModal({ venda, onSave, onClose }: VendaModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dados');
  const [formData, setFormData] = useState<Venda>({
    id: 0,
    numero: `VD-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
    cliente: '',
    data: new Date().toISOString().slice(0, 16),
    itens: [],
    subtotal: 0,
    desconto: 0,
    total: 0,
    status: 'rascunho',
    vendedor: 'Usuário Atual',
    observacoes: ''
  });

  const [novoItem, setNovoItem] = useState({
    produto: '',
    quantidade: 1,
    precoUnitario: 0
  });

  useEffect(() => {
    if (venda) {
      setFormData(venda);
    }
  }, [venda]);

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
    
    if (name === 'produto') {
      const produto = produtosDisponiveis.find(p => p.nome === value);
      setNovoItem(prev => ({
        ...prev,
        produto: value,
        precoUnitario: produto?.preco || 0
      }));
    } else {
      setNovoItem(prev => ({ ...prev, [name]: name === 'quantidade' ? parseInt(value) || 1 : parseFloat(value) || 0 }));
    }
  };

  const adicionarItem = () => {
    if (!novoItem.produto || novoItem.quantidade <= 0) return;
    
    const produto = produtosDisponiveis.find(p => p.nome === novoItem.produto);
    if (!produto || novoItem.quantidade > produto.estoque) {
      alert('Quantidade indisponível em estoque!');
      return;
    }

    const item: ItemVenda = {
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
      alert('Adicione pelo menos um item à venda!');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      onSave({ ...formData, status: 'finalizada' });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fa fa-shopping-cart me-2"></i>
              {venda ? 'Editar Venda' : 'Nova Venda'}
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
                        Dados da Venda
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
                        <label className="form-label fw-bold">Número da Venda</label>
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
                      <div className="col-12">
                        <label className="form-label fw-bold">Cliente *</label>
                        <select
                          className="form-select"
                          name="cliente"
                          value={formData.cliente}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Selecione o cliente...</option>
                          {clientesDisponiveis.map(cliente => (
                            <option key={cliente} value={cliente}>{cliente}</option>
                          ))}
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
                          placeholder="Observações sobre a venda..."
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
                                  <option key={produto.nome} value={produto.nome}>
                                    {produto.nome} (Est: {produto.estoque})
                                  </option>
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
                        Resumo da Venda
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="mb-2">
                        <strong>Cliente:</strong><br/>
                        <span className="text-primary">{formData.cliente || 'Não selecionado'}</span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Itens:</strong><br/>
                        <span className="badge bg-info">{formData.itens.length}</span>
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
                    Finalizando...
                  </>
                ) : (
                  <>
                    <i className="fa fa-check me-2"></i>
                    Finalizar Venda
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