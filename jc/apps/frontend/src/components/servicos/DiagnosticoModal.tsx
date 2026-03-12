import React, { useState, useEffect } from 'react';

interface Problema {
  sistema: string;
  descricao: string;
  severidade: string;
}

interface Diagnostico {
  id?: number;
  cliente: string;
  veiculo: string;
  placa: string;
  dataEntrada: string;
  status: string;
  prioridade: string;
  sintomas: string[];
  problemas: Problema[];
  mecanico: string | null;
  tempoEstimado: number;
  custoEstimado: number;
}

interface DiagnosticoModalProps {
  diagnostico?: Diagnostico | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DiagnosticoModal({ diagnostico, isOpen, onClose }: DiagnosticoModalProps) {
  const [formData, setFormData] = useState<Diagnostico>({
    cliente: '',
    veiculo: '',
    placa: '',
    dataEntrada: new Date().toISOString().split('T')[0],
    status: 'aguardando',
    prioridade: 'media',
    sintomas: [],
    problemas: [],
    mecanico: null,
    tempoEstimado: 0,
    custoEstimado: 0
  });
  const [novoSintoma, setNovoSintoma] = useState('');
  const [novoProblema, setNovoProblema] = useState({
    sistema: '',
    descricao: '',
    severidade: 'media'
  });
  const [activeTab, setActiveTab] = useState('basico');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (diagnostico) {
      setFormData(diagnostico);
    } else {
      setFormData({
        cliente: '',
        veiculo: '',
        placa: '',
        dataEntrada: new Date().toISOString().split('T')[0],
        status: 'aguardando',
        prioridade: 'media',
        sintomas: [],
        problemas: [],
        mecanico: null,
        tempoEstimado: 0,
        custoEstimado: 0
      });
    }
  }, [diagnostico]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Salvando diagnóstico:', formData);
    setIsLoading(false);
    onClose();
  };

  const adicionarSintoma = () => {
    if (novoSintoma.trim() && !formData.sintomas.includes(novoSintoma.trim())) {
      setFormData({
        ...formData,
        sintomas: [...formData.sintomas, novoSintoma.trim()]
      });
      setNovoSintoma('');
    }
  };

  const removerSintoma = (index: number) => {
    setFormData({
      ...formData,
      sintomas: formData.sintomas.filter((_, i) => i !== index)
    });
  };

  const adicionarProblema = () => {
    if (novoProblema.sistema && novoProblema.descricao) {
      setFormData({
        ...formData,
        problemas: [...formData.problemas, { ...novoProblema }]
      });
      setNovoProblema({
        sistema: '',
        descricao: '',
        severidade: 'media'
      });
    }
  };

  const removerProblema = (index: number) => {
    setFormData({
      ...formData,
      problemas: formData.problemas.filter((_, i) => i !== index)
    });
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'aguardando': return 'fa-clock';
      case 'em_andamento': return 'fa-cog fa-spin';
      case 'concluido': return 'fa-check-circle';
      default: return 'fa-question-circle';
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch(prioridade) {
      case 'alta': return 'text-danger';
      case 'media': return 'text-warning';
      case 'baixa': return 'text-info';
      default: return 'text-secondary';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-info text-white">
            <div className="d-flex align-items-center">
              <i className="fa fa-stethoscope me-2"></i>
              <h5 className="modal-title mb-0">
                {diagnostico ? 'Editar Diagnóstico' : 'Novo Diagnóstico'}
              </h5>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          
          <div className="modal-body p-0">
            <div className="row g-0">
              {/* Sidebar com Preview */}
              <div className="col-md-4 bg-light border-end">
                <div className="p-4">
                  <h6 className="text-info mb-3">
                    <i className="fa fa-eye me-2"></i>
                    Resumo do Diagnóstico
                  </h6>
                  
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-info text-white rounded-circle p-2 me-3">
                          <i className={`fa ${getStatusIcon(formData.status)}`}></i>
                        </div>
                        <div>
                          <h6 className="mb-0">{formData.cliente || 'Cliente'}</h6>
                          <small className="text-muted">{formData.veiculo || 'Veículo'}</small>
                        </div>
                      </div>
                      
                      <div className="row text-center mb-3">
                        <div className="col-6">
                          <div className="border-end">
                            <div className={`fw-bold ${getPrioridadeColor(formData.prioridade)}`}>
                              {formData.prioridade.toUpperCase()}
                            </div>
                            <small className="text-muted">Prioridade</small>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="text-success fw-bold">
                            R$ {formData.custoEstimado.toFixed(2)}
                          </div>
                          <small className="text-muted">Custo Est.</small>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <small className="text-muted d-block mb-2">Status:</small>
                        <span className={`badge ${formData.status === 'concluido' ? 'bg-success' : formData.status === 'em_andamento' ? 'bg-warning' : 'bg-secondary'}`}>
                          {formData.status === 'aguardando' ? 'Aguardando' : 
                           formData.status === 'em_andamento' ? 'Em Andamento' : 'Concluído'}
                        </span>
                      </div>
                      
                      {formData.sintomas.length > 0 && (
                        <div className="mb-3">
                          <small className="text-muted d-block mb-2">Sintomas ({formData.sintomas.length}):</small>
                          <div className="d-flex flex-wrap gap-1">
                            {formData.sintomas.slice(0, 2).map((sintoma, index) => (
                              <span key={index} className="badge bg-warning small">
                                {sintoma.length > 20 ? sintoma.substring(0, 20) + '...' : sintoma}
                              </span>
                            ))}
                            {formData.sintomas.length > 2 && (
                              <span className="badge bg-light text-dark small">
                                +{formData.sintomas.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {formData.problemas.length > 0 && (
                        <div>
                          <small className="text-muted d-block mb-2">Problemas ({formData.problemas.length}):</small>
                          <div className="d-flex flex-wrap gap-1">
                            {formData.problemas.slice(0, 2).map((problema, index) => (
                              <span key={index} className="badge bg-danger small">
                                {problema.sistema}
                              </span>
                            ))}
                            {formData.problemas.length > 2 && (
                              <span className="badge bg-light text-dark small">
                                +{formData.problemas.length - 2}
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
                        className={`nav-link ${activeTab === 'sintomas' ? 'active' : ''}`}
                        onClick={() => setActiveTab('sintomas')}
                        type="button"
                      >
                        <i className="fa fa-exclamation-triangle me-2"></i>
                        Sintomas
                      </button>
                    </li>
                    <li className="nav-item">
                      <button 
                        className={`nav-link ${activeTab === 'problemas' ? 'active' : ''}`}
                        onClick={() => setActiveTab('problemas')}
                        type="button"
                      >
                        <i className="fa fa-tools me-2"></i>
                        Problemas
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
                                <i className="fa fa-user me-2 text-primary"></i>
                                Cliente *
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={formData.cliente}
                                onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                                placeholder="Nome do cliente"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                <i className="fa fa-car me-2 text-primary"></i>
                                Veículo *
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={formData.veiculo}
                                onChange={(e) => setFormData({...formData, veiculo: e.target.value})}
                                placeholder="Ex: Honda Civic 2020"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                <i className="fa fa-id-card me-2 text-secondary"></i>
                                Placa *
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={formData.placa}
                                onChange={(e) => setFormData({...formData, placa: e.target.value.toUpperCase()})}
                                placeholder="ABC-1234"
                                maxLength={8}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                <i className="fa fa-calendar me-2 text-info"></i>
                                Data de Entrada
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                value={formData.dataEntrada}
                                onChange={(e) => setFormData({...formData, dataEntrada: e.target.value})}
                              />
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
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                <i className="fa fa-clock me-2 text-info"></i>
                                Tempo Est. (min)
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                value={formData.tempoEstimado}
                                onChange={(e) => setFormData({...formData, tempoEstimado: parseInt(e.target.value) || 0})}
                                min="0"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label fw-bold">
                                <i className="fa fa-dollar-sign me-2 text-success"></i>
                                Custo Est. (R$)
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                value={formData.custoEstimado}
                                onChange={(e) => setFormData({...formData, custoEstimado: parseFloat(e.target.value) || 0})}
                                min="0"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            <i className="fa fa-user-cog me-2 text-primary"></i>
                            Mecânico Responsável
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
                    )}
                    
                    {/* Tab Sintomas */}
                    {activeTab === 'sintomas' && (
                      <div className="tab-content">
                        <div className="mb-4">
                          <label className="form-label fw-bold">
                            <i className="fa fa-exclamation-triangle me-2 text-warning"></i>
                            Adicionar Sintomas Relatados
                          </label>
                          <div className="input-group mb-3">
                            <span className="input-group-text">
                              <i className="fa fa-plus"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Descreva o sintoma relatado pelo cliente"
                              value={novoSintoma}
                              onChange={(e) => setNovoSintoma(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  adicionarSintoma();
                                }
                              }}
                            />
                            <button 
                              type="button" 
                              className="btn btn-warning"
                              onClick={adicionarSintoma}
                              disabled={!novoSintoma.trim()}
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                          
                          {formData.sintomas.length > 0 && (
                            <div className="border rounded p-3 bg-light">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <small className="text-muted fw-bold">
                                  SINTOMAS RELATADOS ({formData.sintomas.length})
                                </small>
                              </div>
                              <div className="d-flex flex-wrap gap-2">
                                {formData.sintomas.map((sintoma, index) => (
                                  <span key={index} className="badge bg-warning d-flex align-items-center fs-6 py-2 px-3">
                                    <i className="fa fa-exclamation-triangle me-2"></i>
                                    {sintoma}
                                    <button
                                      type="button"
                                      className="btn-close ms-2"
                                      style={{fontSize: '0.6em'}}
                                      onClick={() => removerSintoma(index)}
                                    ></button>
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Tab Problemas */}
                    {activeTab === 'problemas' && (
                      <div className="tab-content">
                        <div className="mb-4">
                          <label className="form-label fw-bold">
                            <i className="fa fa-tools me-2 text-danger"></i>
                            Adicionar Problemas Identificados
                          </label>
                          <div className="row">
                            <div className="col-md-4">
                              <select
                                className="form-select mb-2"
                                value={novoProblema.sistema}
                                onChange={(e) => setNovoProblema({...novoProblema, sistema: e.target.value})}
                              >
                                <option value="">Sistema</option>
                                <option value="Motor">Motor</option>
                                <option value="Transmissão">Transmissão</option>
                                <option value="Suspensão">Suspensão</option>
                                <option value="Freios">Freios</option>
                                <option value="Elétrica">Elétrica</option>
                                <option value="Ar Condicionado">Ar Condicionado</option>
                                <option value="Combustível">Combustível</option>
                              </select>
                            </div>
                            <div className="col-md-5">
                              <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Descrição do problema"
                                value={novoProblema.descricao}
                                onChange={(e) => setNovoProblema({...novoProblema, descricao: e.target.value})}
                              />
                            </div>
                            <div className="col-md-2">
                              <select
                                className="form-select mb-2"
                                value={novoProblema.severidade}
                                onChange={(e) => setNovoProblema({...novoProblema, severidade: e.target.value})}
                              >
                                <option value="baixa">Baixa</option>
                                <option value="media">Média</option>
                                <option value="alta">Alta</option>
                              </select>
                            </div>
                            <div className="col-md-1">
                              <button 
                                type="button" 
                                className="btn btn-danger w-100"
                                onClick={adicionarProblema}
                                disabled={!novoProblema.sistema || !novoProblema.descricao}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </div>
                          
                          {formData.problemas.length > 0 && (
                            <div className="table-responsive mt-3">
                              <table className="table table-sm">
                                <thead className="table-dark">
                                  <tr>
                                    <th>Sistema</th>
                                    <th>Problema</th>
                                    <th>Severidade</th>
                                    <th>Ação</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {formData.problemas.map((problema, index) => (
                                    <tr key={index}>
                                      <td>
                                        <span className="badge bg-secondary">{problema.sistema}</span>
                                      </td>
                                      <td>{problema.descricao}</td>
                                      <td>
                                        <span className={`badge ${problema.severidade === 'alta' ? 'bg-danger' : problema.severidade === 'media' ? 'bg-warning' : 'bg-info'}`}>
                                          {problema.severidade.charAt(0).toUpperCase() + problema.severidade.slice(1)}
                                        </span>
                                      </td>
                                      <td>
                                        <button
                                          type="button"
                                          className="btn btn-sm btn-outline-danger"
                                          onClick={() => removerProblema(index)}
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
                <i className="fa fa-info-circle me-2"></i>
                <small>* Campos obrigatórios</small>
              </div>
              <div>
                <button type="button" className="btn btn-light me-2" onClick={onClose}>
                  <i className="fa fa-times me-2"></i>
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-info"
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
                      {diagnostico ? 'Atualizar' : 'Criar'} Diagnóstico
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