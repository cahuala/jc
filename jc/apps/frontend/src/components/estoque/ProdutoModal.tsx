import React, { useState, useEffect } from 'react';

interface Produto {
  id: number;
  codigo: string;
  nome: string;
  categoria: string;
  marca: string;
  modelo: string;
  descricao: string;
  precoCompra: number;
  precoVenda: number;
  estoque: number;
  estoqueMinimo: number;
  unidade: string;
  fornecedor: string;
  localizacao: string;
  status: string;
  dataUltimaCompra: string;
  dataUltimaVenda: string;
}

interface ProdutoModalProps {
  produto: Produto | null;
  onSave: (produto: Produto) => void;
  onClose: () => void;
  categorias: string[];
  fornecedores: string[];
}

export default function ProdutoModal({ produto, onSave, onClose, categorias, fornecedores }: ProdutoModalProps) {
  const [activeTab, setActiveTab] = useState('dados');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Produto>({
    id: 0,
    codigo: '',
    nome: '',
    categoria: '',
    marca: '',
    modelo: '',
    descricao: '',
    precoCompra: 0,
    precoVenda: 0,
    estoque: 0,
    estoqueMinimo: 0,
    unidade: 'UN',
    fornecedor: '',
    localizacao: '',
    status: 'ativo',
    dataUltimaCompra: new Date().toISOString(),
    dataUltimaVenda: new Date().toISOString()
  });

  useEffect(() => {
    if (produto) {
      setFormData(produto);
    }
  }, [produto]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('preco') || name === 'estoque' || name === 'estoqueMinimo' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      onSave(formData);
      setIsLoading(false);
    }, 1000);
  };

  const calcularMargem = () => {
    if (formData.precoCompra > 0) {
      return (((formData.precoVenda - formData.precoCompra) / formData.precoCompra) * 100).toFixed(1);
    }
    return '0.0';
  };

  const calcularValorTotal = () => {
    return (formData.estoque * formData.precoCompra).toFixed(2);
  };

  return (
    <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fa fa-box me-2"></i>
              {produto ? 'Editar Produto' : 'Novo Produto'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
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
                        Dados Básicos
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        type="button"
                        className={`nav-link ${activeTab === 'precos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('precos')}
                      >
                        <i className="fa fa-dollar-sign me-1"></i>
                        Preços e Estoque
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        type="button"
                        className={`nav-link ${activeTab === 'fornecedor' ? 'active' : ''}`}
                        onClick={() => setActiveTab('fornecedor')}
                      >
                        <i className="fa fa-truck me-1"></i>
                        Fornecedor e Local
                      </button>
                    </li>
                  </ul>

                  {activeTab === 'dados' && (
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label">Código *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="codigo"
                          value={formData.codigo}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-8">
                        <label className="form-label">Nome do Produto *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="nome"
                          value={formData.nome}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Categoria *</label>
                        <select
                          className="form-select"
                          name="categoria"
                          value={formData.categoria}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Selecione...</option>
                          {categorias.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Marca</label>
                        <input
                          type="text"
                          className="form-control"
                          name="marca"
                          value={formData.marca}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Modelo</label>
                        <input
                          type="text"
                          className="form-control"
                          name="modelo"
                          value={formData.modelo}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Descrição</label>
                        <textarea
                          className="form-control"
                          name="descricao"
                          value={formData.descricao}
                          onChange={handleInputChange}
                          rows={3}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Unidade</label>
                        <select
                          className="form-select"
                          name="unidade"
                          value={formData.unidade}
                          onChange={handleInputChange}
                        >
                          <option value="UN">Unidade</option>
                          <option value="KG">Quilograma</option>
                          <option value="LT">Litro</option>
                          <option value="MT">Metro</option>
                          <option value="JG">Jogo</option>
                          <option value="PC">Peça</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Status</label>
                        <select
                          className="form-select"
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                        >
                          <option value="ativo">Ativo</option>
                          <option value="inativo">Inativo</option>
                          <option value="descontinuado">Descontinuado</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {activeTab === 'precos' && (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Preço de Compra *</label>
                        <div className="input-group">
                          <span className="input-group-text">Kz</span>
                          <input
                            type="number"
                            className="form-control"
                            name="precoCompra"
                            value={formData.precoCompra}
                            onChange={handleInputChange}
                            step="0.01"
                            min="0"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Preço de Venda *</label>
                        <div className="input-group">
                          <span className="input-group-text">Kz</span>
                          <input
                            type="number"
                            className="form-control"
                            name="precoVenda"
                            value={formData.precoVenda}
                            onChange={handleInputChange}
                            step="0.01"
                            min="0"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Estoque Atual</label>
                        <input
                          type="number"
                          className="form-control"
                          name="estoque"
                          value={formData.estoque}
                          onChange={handleInputChange}
                          min="0"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Estoque Mínimo</label>
                        <input
                          type="number"
                          className="form-control"
                          name="estoqueMinimo"
                          value={formData.estoqueMinimo}
                          onChange={handleInputChange}
                          min="0"
                        />
                      </div>
                      <div className="col-12">
                        <div className="alert alert-info">
                          <div className="row">
                            <div className="col-md-4">
                              <strong>Margem de Lucro:</strong><br/>
                              <span className="h5 text-success">{calcularMargem()}%</span>
                            </div>
                            <div className="col-md-4">
                              <strong>Valor Total em Estoque:</strong><br/>
                              <span className="h5 text-primary">Kz {calcularValorTotal()}</span>
                            </div>
                            <div className="col-md-4">
                              <strong>Lucro por Unidade:</strong><br/>
                              <span className="h5 text-success">Kz {(formData.precoVenda - formData.precoCompra).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'fornecedor' && (
                    <div className="row g-3">
                      <div className="col-md-8">
                        <label className="form-label">Fornecedor Principal</label>
                        <select
                          className="form-select"
                          name="fornecedor"
                          value={formData.fornecedor}
                          onChange={handleInputChange}
                        >
                          <option value="">Selecione...</option>
                          {fornecedores.map(forn => (
                            <option key={forn} value={forn}>{forn}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Localização no Estoque</label>
                        <input
                          type="text"
                          className="form-control"
                          name="localizacao"
                          value={formData.localizacao}
                          onChange={handleInputChange}
                          placeholder="Ex: A1-B2"
                        />
                      </div>
                      <div className="col-12">
                        <div className="alert alert-warning">
                          <i className="fa fa-info-circle me-2"></i>
                          <strong>Dica:</strong> Use um código de localização que facilite encontrar o produto no estoque (Ex: Corredor-Prateleira-Posição).
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="card-title mb-0">
                        <i className="fa fa-eye me-2"></i>
                        Preview do Produto
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="text-center mb-3">
                        <div className="bg-light rounded p-4">
                          <i className="fa fa-box fa-3x text-muted"></i>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Código:</strong> {formData.codigo || 'N/A'}
                      </div>
                      <div className="mb-2">
                        <strong>Nome:</strong> {formData.nome || 'N/A'}
                      </div>
                      <div className="mb-2">
                        <strong>Categoria:</strong> 
                        <span className="badge bg-info ms-1">{formData.categoria || 'N/A'}</span>
                      </div>
                      <div className="mb-2">
                        <strong>Marca/Modelo:</strong> {formData.marca} {formData.modelo}
                      </div>
                      <div className="mb-2">
                        <strong>Preço:</strong> 
                        <span className="text-success fw-bold">Kz {formData.precoVenda.toFixed(2)}</span>
                      </div>
                      <div className="mb-2">
                        <strong>Estoque:</strong> 
                        <span className={`badge ${formData.estoque <= formData.estoqueMinimo ? 'bg-danger' : 'bg-success'}`}>
                          {formData.estoque} {formData.unidade}
                        </span>
                      </div>
                      <div className="mb-2">
                        <strong>Status:</strong> 
                        <span className={`badge ${formData.status === 'ativo' ? 'bg-success' : 'bg-secondary'}`}>
                          {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                        </span>
                      </div>
                      <div className="mb-2">
                        <strong>Localização:</strong> 
                        <span className="badge bg-dark">{formData.localizacao || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
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
                    Salvar Produto
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