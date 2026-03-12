import React, { useState, useEffect } from 'react';

interface Funcionario {
  id: number;
  nome: string;
  nif: string;
  telefone: string;
  email: string;
  cargo: string;
  departamento: string;
  salario: number;
  dataAdmissao: string;
  status: 'ativo' | 'inativo' | 'ferias';
  foto?: string;
}

interface FuncionarioModalProps {
  funcionario: Funcionario | null;
  onSave: (funcionario: Funcionario) => void;
  onClose: () => void;
}

const cargosDisponiveis = [
  'Mecânico Sénior',
  'Mecânico',
  'Supervisor',
  'Recepcionista',
  'Contabilista',
  'Gerente',
  'Assistente Administrativo',
  'Técnico em Diagnóstico',
  'Vendedor'
];

const departamentosDisponiveis = [
  'Oficina',
  'Atendimento',
  'Financeiro',
  'Administração',
  'Vendas'
];

export default function FuncionarioModal({ funcionario, onSave, onClose }: FuncionarioModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dados');
  const [formData, setFormData] = useState<Funcionario>({
    id: 0,
    nome: '',
    nif: '',
    telefone: '',
    email: '',
    cargo: '',
    departamento: '',
    salario: 0,
    dataAdmissao: new Date().toISOString().slice(0, 10),
    status: 'ativo'
  });

  useEffect(() => {
    if (funcionario) {
      setFormData(funcionario);
    }
  }, [funcionario]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'salario') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
              <i className="fa fa-user me-2"></i>
              {funcionario ? 'Editar Funcionário' : 'Novo Funcionário'}
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
                        <i className="fa fa-user me-1"></i>
                        Dados Pessoais
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        type="button"
                        className={`nav-link ${activeTab === 'profissional' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profissional')}
                      >
                        <i className="fa fa-briefcase me-1"></i>
                        Dados Profissionais
                      </button>
                    </li>
                  </ul>

                  {activeTab === 'dados' && (
                    <div className="row g-3">
                      <div className="col-md-8">
                        <label className="form-label fw-bold">Nome Completo *</label>
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
                        <label className="form-label fw-bold">NIF *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="nif"
                          value={formData.nif}
                          onChange={handleInputChange}
                          maxLength={9}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Telefone *</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleInputChange}
                          placeholder="+244 9XX XXX XXX"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'profissional' && (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Cargo *</label>
                        <select
                          className="form-select"
                          name="cargo"
                          value={formData.cargo}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Selecione o cargo...</option>
                          {cargosDisponiveis.map(cargo => (
                            <option key={cargo} value={cargo}>{cargo}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Departamento *</label>
                        <select
                          className="form-select"
                          name="departamento"
                          value={formData.departamento}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Selecione o departamento...</option>
                          {departamentosDisponiveis.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Salário (Kz) *</label>
                        <div className="input-group">
                          <span className="input-group-text">Kz</span>
                          <input
                            type="number"
                            className="form-control"
                            name="salario"
                            value={formData.salario}
                            onChange={handleInputChange}
                            step="1000"
                            min="0"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold">Data de Admissão *</label>
                        <input
                          type="date"
                          className="form-control"
                          name="dataAdmissao"
                          value={formData.dataAdmissao}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label fw-bold">Status</label>
                        <select
                          className="form-select"
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                        >
                          <option value="ativo">Ativo</option>
                          <option value="inativo">Inativo</option>
                          <option value="ferias">Em Férias</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-md-4">
                  <div className="card bg-light">
                    <div className="card-header">
                      <h6 className="card-title mb-0">
                        <i className="fa fa-info-circle me-2"></i>
                        Resumo do Funcionário
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="text-center mb-3">
                        <div className="avatar avatar-xl mx-auto mb-2">
                          <div className="avatar-initial bg-primary rounded-circle">
                            <span className="h3 mb-0">{formData.nome.charAt(0).toUpperCase()}</span>
                          </div>
                        </div>
                        <h6 className="mb-0">{formData.nome || 'Nome do Funcionário'}</h6>
                        <small className="text-muted">{formData.cargo || 'Cargo'}</small>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Departamento:</strong><br/>
                        <span className="text-info">{formData.departamento || 'Não selecionado'}</span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Email:</strong><br/>
                        <span className="text-muted">{formData.email || 'N/A'}</span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Telefone:</strong><br/>
                        <span className="text-muted">{formData.telefone || 'N/A'}</span>
                      </div>
                      
                      <hr/>
                      
                      <div className="mb-2">
                        <strong>Salário:</strong><br/>
                        <span className="h5 text-success">Kz {formData.salario.toFixed(2)}</span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Admissão:</strong><br/>
                        <span className="text-warning">
                          {formData.dataAdmissao ? 
                            new Date(formData.dataAdmissao).toLocaleDateString('pt-AO') : 
                            'N/A'
                          }
                        </span>
                      </div>
                      
                      <div className="mb-0">
                        <strong>Status:</strong><br/>
                        <span className={`badge ${
                          formData.status === 'ativo' ? 'bg-success' :
                          formData.status === 'inativo' ? 'bg-danger' : 'bg-warning'
                        }`}>
                          {formData.status === 'ativo' ? 'Ativo' :
                           formData.status === 'inativo' ? 'Inativo' : 'Em Férias'}
                        </span>
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
                    {funcionario ? 'Atualizar' : 'Cadastrar'} Funcionário
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