import React, { useState, useEffect } from 'react';

interface Servico {
  nome: string;
  preco: number;
  status: string;
}

interface Peca {
  nome: string;
  quantidade: number;
  preco: number;
}

interface OrdemServico {
  id?: number;
  numero: string;
  cliente: string;
  veiculo: string;
  placa: string;
  dataAbertura: string;
  dataPrevisao: string;
  status: string;
  prioridade: string;
  mecanico: string | null;
  servicos: Servico[];
  pecas: Peca[];
  valorTotal: number;
  observacoes: string;
}

interface OrdemServicoModalProps {
  ordem?: OrdemServico | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrdemServicoModal({ ordem, isOpen, onClose }: OrdemServicoModalProps) {
  const [formData, setFormData] = useState<OrdemServico>({
    numero: '',
    cliente: '',
    veiculo: '',
    placa: '',
    dataAbertura: new Date().toISOString().split('T')[0],
    dataPrevisao: new Date().toISOString().split('T')[0],
    status: 'aguardando',
    prioridade: 'media',
    mecanico: null,
    servicos: [],
    pecas: [],
    valorTotal: 0,
    observacoes: ''
  });
  
  const [novoServico, setNovoServico] = useState({ nome: '', preco: 0, status: 'pendente' });
  const [novaPeca, setNovaPeca] = useState({ nome: '', quantidade: 1, preco: 0 });
  const [activeTab, setActiveTab] = useState('basico');
  const [isLoading, setIsLoading] = useState(false);

  // Dados dos clientes e seus veículos
  const clientesVeiculos = {
    'João Silva': [
      { marca: 'Honda', modelo: 'Civic', ano: 2020, placa: 'ABC-1234' },
      { marca: 'Toyota', modelo: 'Corolla', ano: 2018, placa: 'DEF-5678' }
    ],
    'Maria Costa': [
      { marca: 'Toyota', modelo: 'Corolla', ano: 2019, placa: 'XYZ-5678' }
    ],
    'Roberto Alves': [
      { marca: 'Ford', modelo: 'Focus', ano: 2018, placa: 'DEF-9012' }
    ],
    'Ana Santos': [
      { marca: 'Volkswagen', modelo: 'Golf', ano: 2021, placa: 'GHI-3456' }
    ],
    'Pedro Oliveira': [
      { marca: 'Chevrolet', modelo: 'Onix', ano: 2022, placa: 'JKL-7890' }
    ],
    'Fernanda Silva': [
      { marca: 'Hyundai', modelo: 'HB20', ano: 2021, placa: 'MNO-2468' },
      { marca: 'Nissan', modelo: 'March', ano: 2017, placa: 'PQR-1357' }
    ],
    'Carlos Mendes': [
      { marca: 'Nissan', modelo: 'Sentra', ano: 2020, placa: 'PQR-1357' }
    ],
    'Lucia Rocha': [
      { marca: 'Fiat', modelo: 'Argo', ano: 2022, placa: 'STU-9876' }
    ]
  };

  const getVeiculosCliente = (cliente: string) => {
    return clientesVeiculos[cliente as keyof typeof clientesVeiculos] || [];
  };

  useEffect(() => {
    if (ordem) {
      setFormData(ordem);
    } else {
      const novoNumero = `OS-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`;
      setFormData({
        numero: novoNumero,
        cliente: '',
        veiculo: '',
        placa: '',
        dataAbertura: new Date().toISOString().split('T')[0],
        dataPrevisao: new Date().toISOString().split('T')[0],
        status: 'aguardando',
        prioridade: 'media',
        mecanico: null,
        servicos: [],
        pecas: [],
        valorTotal: 0,
        observacoes: ''
      });
    }
  }, [ordem]);

  useEffect(() => {
    const valorServicos = formData.servicos.reduce((sum, s) => sum + s.preco, 0);
    const valorPecas = formData.pecas.reduce((sum, p) => sum + p.preco, 0);
    setFormData(prev => ({ ...prev, valorTotal: valorServicos + valorPecas }));
  }, [formData.servicos, formData.pecas]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Salvando ordem de serviço:', formData);
    setIsLoading(false);
    onClose();
  };

  const adicionarServico = () => {
    if (novoServico.nome && novoServico.preco > 0) {
      setFormData({
        ...formData,
        servicos: [...formData.servicos, { ...novoServico }]
      });
      setNovoServico({ nome: '', preco: 0, status: 'pendente' });
    }
  };

  const removerServico = (index: number) => {
    setFormData({
      ...formData,
      servicos: formData.servicos.filter((_, i) => i !== index)
    });
  };

  const adicionarPeca = () => {
    if (novaPeca.nome && novaPeca.quantidade > 0 && novaPeca.preco > 0) {
      const precoTotal = novaPeca.quantidade * novaPeca.preco;
      setFormData({
        ...formData,
        pecas: [...formData.pecas, { ...novaPeca, preco: precoTotal }]
      });
      setNovaPeca({ nome: '', quantidade: 1, preco: 0 });
    }
  };

  const removerPeca = (index: number) => {
    setFormData({
      ...formData,
      pecas: formData.pecas.filter((_, i) => i !== index)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-success text-white">
            <div className="d-flex align-items-center">
              <i className="fa fa-clipboard-list me-2"></i>
              <h5 className="modal-title mb-0">
                {ordem ? 'Editar Ordem de Serviço' : 'Nova Ordem de Serviço'}
              </h5>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          
          <div className="modal-body p-0">
            <div className="row g-0">
              {/* Sidebar com Preview */}
              <div className="col-md-4 bg-light border-end">
                <div className="p-4">
                  <h6 className="text-success mb-3">
                    <i className="fa fa-eye me-2"></i>
                    Preview da Ordem
                  </h6>
                  
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-success text-white rounded-circle p-2 me-3">
                          <i className="fa fa-clipboard-list"></i>
                        </div>
                        <div>
                          <h6 className="mb-0">{formData.numero}</h6>
                          <small className="text-muted">{formData.cliente || 'Cliente'}</small>
                        </div>
                      </div>
                      
                      <div className="row text-center mb-3">
                        <div className="col-6">
                          <div className="border-end">
                            <div className="text-success fw-bold">R$ {formData.valorTotal.toFixed(2)}</div>
                            <small className="text-muted">Total</small>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className={`fw-bold ${formData.prioridade === 'alta' ? 'text-danger' : formData.prioridade === 'media' ? 'text-warning' : 'text-info'}`}>
                            {formData.prioridade.toUpperCase()}
                          </div>
                          <small className="text-muted">Prioridade</small>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <small className="text-muted d-block mb-2">Status:</small>
                        <span className={`badge ${formData.status === 'concluido' ? 'bg-success' : formData.status === 'em_andamento' ? 'bg-warning' : formData.status === 'cancelado' ? 'bg-danger' : 'bg-secondary'}`}>
                          {formData.status === 'aguardando' ? 'Aguardando' : 
                           formData.status === 'em_andamento' ? 'Em Andamento' : 
                           formData.status === 'concluido' ? 'Concluído' : 'Cancelado'}
                        </span>
                      </div>
                      
                      {formData.servicos.length > 0 && (
                        <div className="mb-3">
                          <small className="text-muted d-block mb-2">Serviços ({formData.servicos.length}):</small>
                          <div className="d-flex flex-wrap gap-1">
                            {formData.servicos.slice(0, 2).map((servico, index) => (
                              <span key={index} className="badge bg-primary small">
                                {servico.nome}
                              </span>
                            ))}
                            {formData.servicos.length > 2 && (
                              <span className="badge bg-light text-dark small">
                                +{formData.servicos.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {formData.pecas.length > 0 && (
                        <div>
                          <small className="text-muted d-block mb-2">Peças ({formData.pecas.length}):</small>
                          <div className="d-flex flex-wrap gap-1">
                            {formData.pecas.slice(0, 2).map((peca, index) => (
                              <span key={index} className="badge bg-warning small">
                                {peca.nome}
                              </span>
                            ))}
                            {formData.pecas.length > 2 && (
                              <span className="badge bg-light text-dark small">
                                +{formData.pecas.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Formulário */}
              <div className="col-md-8">
                <div className="p-4">
                  {/* Tabs */}
                  <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'basico' ? 'active' : ''}`}
                        onClick={() => setActiveTab('basico')}
                        type="button"
                      >
                        <i className="fa fa-info-circle me-2"></i>
                        Dados Básicos
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'servicos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('servicos')}
                        type="button"
                      >
                        <i className="fa fa-wrench me-2"></i>
                        Serviços
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'pecas' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pecas')}
                        type="button"
                      >
                        <i className="fa fa-boxes me-2"></i>
                        Peças
                      </button>
                    </li>
                  </ul>
                  
                  <form onSubmit={handleSubmit}>
                    {/* Tab Básico */}
                    {activeTab === 'basico' && (
                      <div className="tab-content">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                <i className="fa fa-hashtag me-2 text-primary"></i>
                                Número da OS
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={formData.numero}
                                onChange={(e) => setFormData({...formData, numero: e.target.value})}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                <i className="fa fa-user me-2 text-primary"></i>
                                Cliente *
                              </label>
                              <select
                                className="form-select"
                                value={formData.cliente}
                                onChange={(e) => {
                                  const clienteSelecionado = e.target.value;
                                  setFormData({...formData, cliente: clienteSelecionado, veiculo: '', placa: ''});
                                }}
                                required
                              >
                                <option value="">Selecione um cliente</option>
                                <option value="João Silva">João Silva</option>
                                <option value="Maria Costa">Maria Costa</option>
                                <option value="Roberto Alves">Roberto Alves</option>
                                <option value="Ana Santos">Ana Santos</option>
                                <option value="Pedro Oliveira">Pedro Oliveira</option>
                                <option value="Fernanda Silva">Fernanda Silva</option>
                                <option value="Carlos Mendes">Carlos Mendes</option>
                                <option value="Lucia Rocha">Lucia Rocha</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                <i className="fa fa-car me-2 text-primary"></i>
                                Veículo *
                              </label>
                              <select
                                className="form-select"
                                value={formData.veiculo}
                                onChange={(e) => {
                                  const veiculoSelecionado = e.target.value;
                                  const veiculosCliente = getVeiculosCliente(formData.cliente);
                                  const veiculo = veiculosCliente.find(v => `${v.marca} ${v.modelo} ${v.ano}` === veiculoSelecionado);
                                  setFormData({
                                    ...formData, 
                                    veiculo: veiculoSelecionado,
                                    placa: veiculo ? veiculo.placa : ''
                                  });
                                }}
                                required
                                disabled={!formData.cliente}
                              >
                                <option value="">Selecione um veículo</option>
                                {getVeiculosCliente(formData.cliente).map((veiculo, index) => (
                                  <option key={index} value={`${veiculo.marca} ${veiculo.modelo} ${veiculo.ano}`}>
                                    {veiculo.marca} {veiculo.modelo} {veiculo.ano} - {veiculo.placa}
                                  </option>
                                ))}
                              </select>
                              {!formData.cliente && (
                                <small className="text-muted">Selecione um cliente primeiro</small>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                <i className="fa fa-id-card me-2 text-secondary"></i>
                                Placa
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={formData.placa}
                                readOnly
                                placeholder="Será preenchida automaticamente"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                <i className="fa fa-calendar me-2 text-info"></i>
                                Data de Abertura
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                value={formData.dataAbertura}
                                onChange={(e) => setFormData({...formData, dataAbertura: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                <i className="fa fa-calendar-check me-2 text-success"></i>
                                Previsão de Entrega
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                value={formData.dataPrevisao}
                                onChange={(e) => setFormData({...formData, dataPrevisao: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                <i className="fa fa-cog me-2 text-success"></i>
                                Status
                              </label>
                              <select
                                className="form-select"
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                              >
                                <option value="aguardando">⏳ Aguardando</option>
                                <option value="em_andamento">⚙️ Em Andamento</option>
                                <option value="concluido">✅ Concluído</option>
                                <option value="cancelado">❌ Cancelado</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                <i className="fa fa-flag me-2 text-warning"></i>
                                Prioridade
                              </label>
                              <select
                                className="form-select"
                                value={formData.prioridade}
                                onChange={(e) => setFormData({...formData, prioridade: e.target.value})}
                              >
                                <option value="baixa">🟢 Baixa</option>
                                <option value="media">🟡 Média</option>
                                <option value="alta">🔴 Alta</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                <i className="fa fa-user-cog me-2 text-primary"></i>
                                Mecânico
                              </label>
                              <select
                                className="form-select"
                                value={formData.mecanico || ''}
                                onChange={(e) => setFormData({...formData, mecanico: e.target.value || null})}
                              >
                                <option value="">Selecione um mecânico</option>
                                <option value="Carlos Santos">Carlos Santos</option>
                                <option value="Pedro Lima">Pedro Lima</option>
                                <option value="João Ferreira">João Ferreira</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            <i className="fa fa-comment me-2 text-secondary"></i>
                            Observações
                          </label>
                          <textarea
                            className="form-control"
                            rows={3}
                            value={formData.observacoes}
                            onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                            placeholder="Observações sobre o serviço..."
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Tab Serviços */}
                    {activeTab === 'servicos' && (
                      <div className="tab-content">
                        <div className="mb-4">
                          <label className="form-label fw-bold">
                            <i className="fa fa-wrench me-2 text-primary"></i>
                            Adicionar Serviços
                          </label>
                          <div className="row">
                            <div className="col-md-6">
                              <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Nome do serviço"
                                value={novoServico.nome}
                                onChange={(e) => setNovoServico({...novoServico, nome: e.target.value})}
                              />
                            </div>
                            <div className="col-md-3">
                              <input
                                type="number"
                                step="0.01"
                                className="form-control mb-2"
                                placeholder="Preço"
                                value={novoServico.preco}
                                onChange={(e) => setNovoServico({...novoServico, preco: parseFloat(e.target.value) || 0})}
                              />
                            </div>
                            <div className="col-md-2">
                              <select
                                className="form-select mb-2"
                                value={novoServico.status}
                                onChange={(e) => setNovoServico({...novoServico, status: e.target.value})}
                              >
                                <option value="pendente">Pendente</option>
                                <option value="em_andamento">Em Andamento</option>
                                <option value="concluido">Concluído</option>
                              </select>
                            </div>
                            <div className="col-md-1">
                              <button 
                                type="button" 
                                className="btn btn-primary w-100"
                                onClick={adicionarServico}
                                disabled={!novoServico.nome || novoServico.preco <= 0}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </div>
                          
                          {formData.servicos.length > 0 && (
                            <div className="table-responsive mt-3">
                              <table className="table table-sm table-bordered">
                                <thead className="table-primary">
                                  <tr>
                                    <th>Serviço</th>
                                    <th>Preço</th>
                                    <th>Status</th>
                                    <th>Ação</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {formData.servicos.map((servico, index) => (
                                    <tr key={index}>
                                      <td>{servico.nome}</td>
                                      <td className="text-success">R$ {servico.preco.toFixed(2)}</td>
                                      <td>
                                        <span className={`badge ${servico.status === 'concluido' ? 'bg-success' : servico.status === 'em_andamento' ? 'bg-warning' : 'bg-secondary'}`}>
                                          {servico.status === 'pendente' ? 'Pendente' : servico.status === 'em_andamento' ? 'Em Andamento' : 'Concluído'}
                                        </span>
                                      </td>
                                      <td>
                                        <button
                                          type="button"
                                          className="btn btn-sm btn-outline-danger"
                                          onClick={() => removerServico(index)}
                                        >
                                          <i className="fa fa-trash"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Tab Peças */}
                    {activeTab === 'pecas' && (
                      <div className="tab-content">
                        <div className="mb-4">
                          <label className="form-label fw-bold">
                            <i className="fa fa-boxes me-2 text-warning"></i>
                            Adicionar Peças
                          </label>
                          <div className="row">
                            <div className="col-md-5">
                              <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Nome da peça"
                                value={novaPeca.nome}
                                onChange={(e) => setNovaPeca({...novaPeca, nome: e.target.value})}
                              />
                            </div>
                            <div className="col-md-2">
                              <input
                                type="number"
                                min="1"
                                className="form-control mb-2"
                                placeholder="Qtd"
                                value={novaPeca.quantidade}
                                onChange={(e) => setNovaPeca({...novaPeca, quantidade: parseInt(e.target.value) || 1})}
                              />
                            </div>
                            <div className="col-md-3">
                              <input
                                type="number"
                                step="0.01"
                                className="form-control mb-2"
                                placeholder="Preço unitário"
                                value={novaPeca.preco}
                                onChange={(e) => setNovaPeca({...novaPeca, preco: parseFloat(e.target.value) || 0})}
                              />
                            </div>
                            <div className="col-md-2">
                              <button 
                                type="button" 
                                className="btn btn-warning w-100"
                                onClick={adicionarPeca}
                                disabled={!novaPeca.nome || novaPeca.quantidade <= 0 || novaPeca.preco <= 0}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </div>
                          
                          {formData.pecas.length > 0 && (
                            <div className="table-responsive mt-3">
                              <table className="table table-sm table-bordered">
                                <thead className="table-warning">
                                  <tr>
                                    <th>Peça</th>
                                    <th>Quantidade</th>
                                    <th>Preço Unit.</th>
                                    <th>Total</th>
                                    <th>Ação</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {formData.pecas.map((peca, index) => (
                                    <tr key={index}>
                                      <td>{peca.nome}</td>
                                      <td>{peca.quantidade}</td>
                                      <td className="text-success">R$ {(peca.preco / peca.quantidade).toFixed(2)}</td>
                                      <td className="text-success fw-bold">R$ {peca.preco.toFixed(2)}</td>
                                      <td>
                                        <button
                                          type="button"
                                          className="btn btn-sm btn-outline-danger"
                                          onClick={() => removerPeca(index)}
                                        >
                                          <i className="fa fa-trash"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer bg-light">
            <div className="d-flex justify-content-between w-100">
              <div className="d-flex align-items-center text-muted">
                <i className="fa fa-calculator me-2"></i>
                <span>Total: <strong className="text-success">R$ {formData.valorTotal.toFixed(2)}</strong></span>
              </div>
              <div>
                <button type="button" className="btn btn-light me-2" onClick={onClose}>
                  <i className="fa fa-times me-2"></i>
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-success"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <i className="fa fa-save me-2"></i>
                      {ordem ? 'Atualizar' : 'Criar'} Ordem
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}