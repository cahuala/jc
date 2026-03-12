import React, { useState, useEffect } from 'react';

interface ItemFatura {
  descricao: string;
  quantidade: number;
  precoUnitario: number;
  iva: number;
  subtotal: number;
}

interface Fatura {
  id: number;
  numero: string;
  cliente: string;
  nifCliente: string;
  data: string;
  dataVencimento: string;
  itens: ItemFatura[];
  subtotal: number;
  totalIva: number;
  total: number;
  status: string;
  observacoes: string;
  formaPagamento: string;
}

interface FaturaModalProps {
  fatura: Fatura | null;
  onSave: (fatura: Fatura) => void;
  onClose: () => void;
}

const clientesDisponiveis = [
  { nome: 'João Silva', nif: '123456789' },
  { nome: 'Maria Santos', nif: '987654321' },
  { nome: 'Carlos Oliveira', nif: '111222333' },
  { nome: 'Ana Costa', nif: '444555666' },
  { nome: 'Pedro Lima', nif: '777888999' }
];

const servicosDisponiveis = [
  { descricao: 'Troca de óleo e filtro', preco: 8500.00 },
  { descricao: 'Substituição pastilhas de freio', preco: 12000.00 },
  { descricao: 'Diagnóstico completo do motor', preco: 5000.00 },
  { descricao: 'Alinhamento e balanceamento', preco: 6500.00 },
  { descricao: 'Substituição velas de ignição', preco: 2290.00 }
];

export default function FaturaModal({ fatura, onSave, onClose }: FaturaModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dados');
  const [formData, setFormData] = useState<Fatura>({
    id: 0,
    numero: `FT-${new Date().getFullYear()}/${String(Date.now()).slice(-3)}`,
    cliente: '',
    nifCliente: '',
    data: new Date().toISOString().slice(0, 16),
    dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    itens: [],
    subtotal: 0,
    totalIva: 0,
    total: 0,
    status: 'pendente',
    observacoes: '',
    formaPagamento: 'Dinheiro'
  });

  const [novoItem, setNovoItem] = useState({
    descricao: '',
    quantidade: 1,
    precoUnitario: 0
  });

  useEffect(() => {
    if (fatura) {
      setFormData(fatura);
    }
  }, [fatura]);

  useEffect(() => {
    const subtotal = formData.itens.reduce((acc, item) => acc + (item.quantidade * item.precoUnitario), 0);
    const totalIva = formData.itens.reduce((acc, item) => acc + item.iva, 0);
    const total = subtotal + totalIva;
    setFormData(prev => ({ ...prev, subtotal, totalIva, total }));
  }, [formData.itens]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cliente') {
      const cliente = clientesDisponiveis.find(c => c.nome === value);
      setFormData(prev => ({
        ...prev,
        cliente: value,
        nifCliente: cliente?.nif || ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNovoItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'descricao') {
      const servico = servicosDisponiveis.find(s => s.descricao === value);
      setNovoItem(prev => ({
        ...prev,
        descricao: value,
        precoUnitario: servico?.preco || 0
      }));
    } else {
      setNovoItem(prev => ({ ...prev, [name]: name === 'quantidade' ? parseInt(value) || 1 : parseFloat(value) || 0 }));
    }
  };

  const adicionarItem = () => {
    if (!novoItem.descricao || novoItem.quantidade <= 0 || novoItem.precoUnitario <= 0) return;

    const subtotalItem = novoItem.quantidade * novoItem.precoUnitario;
    const ivaItem = subtotalItem * 0.15; // IVA 15% em Angola
    
    const item: ItemFatura = {
      descricao: novoItem.descricao,
      quantidade: novoItem.quantidade,
      precoUnitario: novoItem.precoUnitario,
      iva: ivaItem,
      subtotal: subtotalItem + ivaItem
    };

    setFormData(prev => ({ ...prev, itens: [...prev.itens, item] }));
    setNovoItem({ descricao: '', quantidade: 1, precoUnitario: 0 });
  };

  const removerItem = (index: number) => {
    setFormData(prev => ({ ...prev, itens: prev.itens.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.itens.length === 0) {
      alert('Adicione pelo menos um item à fatura!');
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
              <i className="fa fa-file-invoice me-2"></i>
              {fatura ? 'Editar Fatura' : 'Nova Fatura'}
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
                        Dados da Fatura
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
                        <label className="form-label fw-bold">Número da Fatura</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.numero}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Data de Emissão *</label>
                        <input
                          type="datetime-local"
                          className="form-control"
                          name="data"
                          value={formData.data}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-8">
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
                            <option key={cliente.nif} value={cliente.nome}>{cliente.nome}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label fw-bold">NIF do Cliente</label>
                        <input
                          type="text"
                          className="form-control bg-light"
                          value={formData.nifCliente}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Data de Vencimento *</label>
                        <input
                          type="date"
                          className="form-control"
                          name="dataVencimento"
                          value={formData.dataVencimento}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Forma de Pagamento</label>
                        <select
                          className="form-select"
                          name="formaPagamento"
                          value={formData.formaPagamento}
                          onChange={handleInputChange}
                        >
                          <option value="Dinheiro">Dinheiro</option>
                          <option value="Multicaixa">Multicaixa</option>
                          <option value="Transferência">Transferência Bancária</option>
                          <option value="Cheque">Cheque</option>
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
                          placeholder="Observações sobre a fatura..."
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
                                name="descricao"
                                value={novoItem.descricao}
                                onChange={handleNovoItemChange}
                              >
                                <option value="">Selecione o serviço...</option>
                                {servicosDisponiveis.map(servico => (
                                  <option key={servico.descricao} value={servico.descricao}>
                                    {servico.descricao}
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
                              <th>Descrição</th>
                              <th>Qtd</th>
                              <th>Preço Unit.</th>
                              <th>IVA (15%)</th>
                              <th>Subtotal</th>
                              <th>Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.itens.map((item, index) => (
                              <tr key={index}>
                                <td>{item.descricao}</td>
                                <td>{item.quantidade}</td>
                                <td>Kz {item.precoUnitario.toFixed(2)}</td>
                                <td>Kz {item.iva.toFixed(2)}</td>
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
                    </div>
                  )}
                </div>

                <div className="col-md-4">
                  <div className="card bg-light">
                    <div className="card-header">
                      <h6 className="card-title mb-0">
                        <i className="fa fa-calculator me-2"></i>
                        Resumo da Fatura
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="mb-2">
                        <strong>Cliente:</strong><br/>
                        <span className="text-primary">{formData.cliente || 'Não selecionado'}</span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>NIF:</strong><br/>
                        <span className="text-muted">{formData.nifCliente || 'N/A'}</span>
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
                        <strong>IVA (15%):</strong><br/>
                        <span className="text-warning">Kz {formData.totalIva.toFixed(2)}</span>
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
                    Emitir Fatura
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