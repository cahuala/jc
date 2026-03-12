import React, { useState, useEffect } from 'react';

interface FolhaPagamento {
  id?: string;
  funcionario: string;
  cargo: string;
  periodo: string;
  salarioBase: number;
  beneficios: number;
  descontos: number;
  salarioLiquido: number;
  status: 'processada' | 'pendente' | 'paga';
  dataPagamento?: string;
}

interface FolhaPagamentoModalProps {
  folha: FolhaPagamento | null;
  onSave: (folha: any) => void;
  onClose: () => void;
}

const funcionariosDisponiveis = [
  { id: 1, nome: 'António Silva', cargo: 'Mecânico Sénior', salario: 180000 },
  { id: 2, nome: 'Maria Santos', cargo: 'Recepcionista', salario: 120000 },
  { id: 3, nome: 'Carlos Mendes', cargo: 'Supervisor', salario: 220000 },
  { id: 4, nome: 'Ana Costa', cargo: 'Contabilista', salario: 200000 },
  { id: 5, nome: 'Pedro Oliveira', cargo: 'Mecânico', salario: 150000 }
];

export default function FolhaPagamentoModal({ folha, onSave, onClose }: FolhaPagamentoModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FolhaPagamento>({
    funcionario: '',
    cargo: '',
    periodo: new Date().toISOString().slice(0, 7),
    salarioBase: 0,
    beneficios: 0,
    descontos: 0,
    salarioLiquido: 0,
    status: 'pendente'
  });
  const [beneficiosDetalhes, setBeneficiosDetalhes] = useState([
    { nome: 'Subsídio de Alimentação', valor: 15000 },
    { nome: 'Subsídio de Transporte', valor: 10000 }
  ]);
  const [descontosDetalhes, setDescontosDetalhes] = useState([
    { nome: 'Segurança Social (3%)', valor: 0 }
  ]);

  useEffect(() => {
    if (folha) {
      setFormData(folha);
      setBeneficiosDetalhes([
        { nome: 'Subsídio de Alimentação', valor: 15000 },
        { nome: 'Subsídio de Transporte', valor: 10000 }
      ]);
      setDescontosDetalhes([
        { nome: 'Segurança Social (3%)', valor: folha.salarioBase * 0.03 }
      ]);
    }
  }, [folha]);

  const handleFuncionarioChange = (funcionarioNome: string) => {
    const funcionario = funcionariosDisponiveis.find(f => f.nome === funcionarioNome);
    if (funcionario) {
      const segurancaSocial = funcionario.salario * 0.03;
      setFormData(prev => ({
        ...prev,
        funcionario: funcionario.nome,
        cargo: funcionario.cargo,
        salarioBase: funcionario.salario
      }));
      setDescontosDetalhes([
        { nome: 'Segurança Social (3%)', valor: segurancaSocial }
      ]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const totalBeneficios = beneficiosDetalhes.reduce((sum, b) => sum + b.valor, 0);
  const totalDescontos = descontosDetalhes.reduce((sum, d) => sum + d.valor, 0);
  const salarioLiquido = formData.salarioBase + totalBeneficios - totalDescontos;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setTimeout(() => {
      onSave({
        ...formData,
        beneficios: totalBeneficios,
        descontos: totalDescontos,
        salarioLiquido
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fa fa-money-check-alt me-2"></i>
              {folha ? 'Editar Folha de Pagamento' : 'Processar Nova Folha'}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-8">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label fw-bold">Funcionário *</label>
                      <select
                        className="form-select"
                        value={formData.funcionario}
                        onChange={(e) => handleFuncionarioChange(e.target.value)}
                        required
                      >
                        <option value="">Selecione o funcionário...</option>
                        {funcionariosDisponiveis.map(func => (
                          <option key={func.nome} value={func.nome}>{func.nome}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Período *</label>
                      <input
                        type="month"
                        className="form-control"
                        name="periodo"
                        value={formData.periodo}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Cargo</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.cargo}
                        readOnly
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Salário Base (Kz)</label>
                      <div className="input-group">
                        <span className="input-group-text">Kz</span>
                        <input
                          type="number"
                          className="form-control bg-light"
                          value={formData.salarioBase}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="card">
                        <div className="card-header">
                          <h6 className="mb-0 text-success">Benefícios</h6>
                        </div>
                        <div className="card-body">
                          {beneficiosDetalhes.map((beneficio, index) => (
                            <div key={index} className="row align-items-center mb-2">
                              <div className="col-md-8">
                                <span>{beneficio.nome}</span>
                              </div>
                              <div className="col-md-4">
                                <div className="input-group input-group-sm">
                                  <span className="input-group-text">Kz</span>
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={beneficio.valor}
                                    onChange={(e) => {
                                      const newBeneficios = [...beneficiosDetalhes];
                                      newBeneficios[index].valor = parseFloat(e.target.value) || 0;
                                      setBeneficiosDetalhes(newBeneficios);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="text-end">
                            <strong>Total: Kz {totalBeneficios.toLocaleString()}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="card">
                        <div className="card-header">
                          <h6 className="mb-0 text-danger">Descontos</h6>
                        </div>
                        <div className="card-body">
                          {descontosDetalhes.map((desconto, index) => (
                            <div key={index} className="row align-items-center mb-2">
                              <div className="col-md-8">
                                <span>{desconto.nome}</span>
                              </div>
                              <div className="col-md-4">
                                <div className="input-group input-group-sm">
                                  <span className="input-group-text">Kz</span>
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={desconto.valor}
                                    onChange={(e) => {
                                      const newDescontos = [...descontosDetalhes];
                                      newDescontos[index].valor = parseFloat(e.target.value) || 0;
                                      setDescontosDetalhes(newDescontos);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="text-end">
                            <strong>Total: Kz {totalDescontos.toLocaleString()}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card bg-light">
                    <div className="card-header">
                      <h6 className="card-title mb-0">
                        <i className="fa fa-calculator me-2"></i>
                        Resumo da Folha
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <strong>Funcionário:</strong><br/>
                        <span className="text-primary">{formData.funcionario || 'Não selecionado'}</span>
                      </div>
                      
                      <div className="mb-3">
                        <strong>Cargo:</strong><br/>
                        <span className="text-muted">{formData.cargo || 'N/A'}</span>
                      </div>
                      
                      <div className="mb-3">
                        <strong>Período:</strong><br/>
                        <span className="text-info">
                          {formData.periodo ? 
                            new Date(formData.periodo + '-01').toLocaleDateString('pt-AO', { month: 'long', year: 'numeric' }) : 
                            'N/A'
                          }
                        </span>
                      </div>
                      
                      <hr/>
                      
                      <div className="mb-2">
                        <div className="d-flex justify-content-between">
                          <span>Salário Base:</span>
                          <span className="text-primary">Kz {formData.salarioBase.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <div className="d-flex justify-content-between">
                          <span>Total Benefícios:</span>
                          <span className="text-success">+Kz {totalBeneficios.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span>Total Descontos:</span>
                          <span className="text-danger">-Kz {totalDescontos.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <hr/>
                      
                      <div className="mb-0">
                        <div className="d-flex justify-content-between">
                          <strong>Salário Líquido:</strong>
                          <strong className="h5 text-success">Kz {salarioLiquido.toLocaleString()}</strong>
                        </div>
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
                    Processando...
                  </>
                ) : (
                  <>
                    <i className="fa fa-save me-2"></i>
                    {folha ? 'Atualizar' : 'Processar'} Folha
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