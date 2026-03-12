import React, { useState } from 'react';
import Toast from '@/components/ui/Toast';

interface Veiculo {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  cor: string;
  combustivel: string;
  clienteId: number;
  clienteNome: string;
}

interface HistoricoItem {
  id: number;
  data: string;
  servicos: string[];
  valor: number;
  status: 'concluido' | 'pendente' | 'cancelado';
  observacoes?: string;
  tecnico?: string;
}

interface ServicoDetailsModalProps {
  isOpen: boolean;
  servico: HistoricoItem | null;
  veiculo: Veiculo | null;
  onClose: () => void;
}

function ServicoDetailsModal({ isOpen, servico, veiculo, onClose }: ServicoDetailsModalProps) {
  if (!isOpen || !servico || !veiculo) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fa fa-wrench me-2"></i>
              Detalhes do Serviço #{servico.id}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">Informações do Serviço</h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label fw-bold text-muted">Data do Serviço</label>
                      <div className="fs-6">{new Date(servico.data).toLocaleDateString('pt-AO')}</div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold text-muted">Serviços Realizados</label>
                      <div>
                        {servico.servicos.map((s, index) => (
                          <span key={index} className="badge bg-primary me-1 mb-1">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold text-muted">Técnico Responsável</label>
                      <div className="fs-6">{servico.tecnico}</div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold text-muted">Valor Total</label>
                      <div className="fs-4 fw-bold text-success">Kz {servico.valor.toLocaleString()}</div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold text-muted">Status</label>
                      <div>
                        <span className={`badge ${
                          servico.status === 'concluido' ? 'bg-success' :
                          servico.status === 'pendente' ? 'bg-warning' : 'bg-danger'
                        }`}>
                          {servico.status.charAt(0).toUpperCase() + servico.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    {servico.observacoes && (
                      <div className="mb-3">
                        <label className="form-label fw-bold text-muted">Observações</label>
                        <div className="border rounded p-2 bg-light">{servico.observacoes}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">Veículo Atendido</h6>
                  </div>
                  <div className="card-body">
                    <div className="text-center mb-3">
                      <i className="fa fa-car fa-3x text-primary mb-2"></i>
                      <h5>{veiculo.marca} {veiculo.modelo}</h5>
                    </div>
                    <div className="mb-2">
                      <strong>Matrícula:</strong> <span className="badge bg-dark ms-2">{veiculo.placa}</span>
                    </div>
                    <div className="mb-2">
                      <strong>Ano:</strong> <span className="ms-2">{veiculo.ano}</span>
                    </div>
                    <div className="mb-2">
                      <strong>Cor:</strong> <span className="badge bg-secondary ms-2">{veiculo.cor}</span>
                    </div>
                    <div className="mb-2">
                      <strong>Combustível:</strong> 
                      <span className={`badge ms-2 ${
                        veiculo.combustivel === 'Gasolina' ? 'bg-danger' :
                        veiculo.combustivel === 'Diesel' ? 'bg-warning' : 'bg-success'
                      }`}>
                        {veiculo.combustivel}
                      </span>
                    </div>
                    <div className="mb-2">
                      <strong>Proprietário:</strong> <div className="fw-bold">{veiculo.clienteNome}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
              <i className="fa fa-times me-2"></i>
              Fechar
            </button>
            <button type="button" className="btn btn-info">
              <i className="fa fa-print me-2"></i>
              Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Veiculo {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  cor: string;
  combustivel: string;
  clienteId: number;
  clienteNome: string;
}

interface HistoricoItem {
  id: number;
  data: string;
  servicos: string[];
  valor: number;
  status: 'concluido' | 'pendente' | 'cancelado';
  observacoes?: string;
  tecnico?: string;
}

interface VeiculoHistoryModalProps {
  isOpen: boolean;
  veiculo: Veiculo | null;
  onClose: () => void;
}

export default function VeiculoHistoryModal({ isOpen, veiculo, onClose }: VeiculoHistoryModalProps) {
  const [showServiceDetails, setShowServiceDetails] = useState(false);
  const [selectedService, setSelectedService] = useState<HistoricoItem | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');

  if (!isOpen || !veiculo) return null;

  // Mock data - em produção viria da API
  const historico: HistoricoItem[] = [
    {
      id: 1,
      data: '2024-02-15',
      servicos: ['Troca de óleo', 'Filtro de ar', 'Revisão geral'],
      valor: 450,
      status: 'concluido',
      observacoes: 'Veículo em bom estado geral',
      tecnico: 'João Mecânico'
    },
    {
      id: 2,
      data: '2024-01-10',
      servicos: ['Alinhamento', 'Balanceamento'],
      valor: 180,
      status: 'concluido',
      tecnico: 'Carlos Silva'
    },
    {
      id: 3,
      data: '2023-12-05',
      servicos: ['Troca de pastilhas de freio'],
      valor: 320,
      status: 'concluido',
      observacoes: 'Pastilhas muito desgastadas',
      tecnico: 'Maria Santos'
    },
    {
      id: 4,
      data: '2023-11-20',
      servicos: ['Diagnóstico eletrônico'],
      valor: 80,
      status: 'concluido',
      tecnico: 'Pedro Costa'
    }
  ];

  const totalGasto = historico.reduce((sum, item) => sum + item.valor, 0);
  const totalServicos = historico.length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'concluido':
        return 'bg-success';
      case 'pendente':
        return 'bg-warning';
      case 'cancelado':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const handleViewDetails = (servico: HistoricoItem) => {
    setSelectedService(servico);
    setShowServiceDetails(true);
  };

  const handlePrintService = (servico: HistoricoItem) => {
    setToastMessage(`Imprimindo serviço #${servico.id}...`);
    setToastType('info');
    setShowToast(true);
    // Aqui implementaria a lógica de impressão
    window.print();
  };

  const handleCopyService = (servico: HistoricoItem) => {
    const serviceText = `Serviço #${servico.id}\nData: ${new Date(servico.data).toLocaleDateString('pt-AO')}\nVeículo: ${veiculo.marca} ${veiculo.modelo} (${veiculo.placa})\nServiços: ${servico.servicos.join(', ')}\nTécnico: ${servico.tecnico}\nValor: Kz ${servico.valor.toLocaleString()}\nStatus: ${servico.status}`;
    
    navigator.clipboard.writeText(serviceText).then(() => {
      setToastMessage('Dados do serviço copiados para a área de transferência!');
      setToastType('success');
      setShowToast(true);
    }).catch(() => {
      setToastMessage('Erro ao copiar dados do serviço');
      setToastType('error');
      setShowToast(true);
    });
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-info text-white">
            <h5 className="modal-title">
              <i className="fa fa-history me-2"></i>
              Histórico de Serviços - {veiculo.marca} {veiculo.modelo}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row mb-4">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <i className="fa fa-car fa-2x text-primary me-3"></i>
                      <div>
                        <h5 className="mb-1">{veiculo.marca} {veiculo.modelo} ({veiculo.ano})</h5>
                        <p className="mb-0 text-muted">
                          <span className="badge bg-dark me-2">{veiculo.placa}</span>
                          <span className="badge bg-secondary me-2">{veiculo.cor}</span>
                          <span className={`badge ${
                            veiculo.combustivel === 'Gasolina' ? 'bg-danger' : 
                            veiculo.combustivel === 'Diesel' ? 'bg-warning' : 'bg-success'
                          }`}>
                            {veiculo.combustivel}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <div className="row">
                      <div className="col-6 border-end">
                        <div className="fs-4 fw-bold text-primary">{totalServicos}</div>
                        <small className="text-muted">Serviços</small>
                      </div>
                      <div className="col-6">
                        <div className="fs-4 fw-bold text-success">Kz {totalGasto.toLocaleString()}</div>
                        <small className="text-muted">Total Gasto</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h6 className="mb-0">
                  <i className="fa fa-list me-2"></i>
                  Histórico Detalhado
                </h6>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Data</th>
                        <th>Serviços Realizados</th>
                        <th>Técnico</th>
                        <th>Valor</th>
                        <th>Status</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historico.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="fw-bold">
                              {new Date(item.data).toLocaleDateString('pt-AO')}
                            </div>
                          </td>
                          <td>
                            <div>
                              {item.servicos.map((servico, index) => (
                                <span key={index} className="badge bg-primary me-1 mb-1">
                                  {servico}
                                </span>
                              ))}
                            </div>
                            {item.observacoes && (
                              <small className="text-muted d-block mt-1">
                                <i className="fa fa-comment me-1"></i>
                                {item.observacoes}
                              </small>
                            )}
                          </td>
                          <td>
                            <div className="fw-bold">{item.tecnico}</div>
                          </td>
                          <td>
                            <div className="fw-bold text-success">
                              Kz {item.valor.toLocaleString()}
                            </div>
                          </td>
                          <td>
                            <span className={`badge ${getStatusBadge(item.status)}`}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                className="btn btn-outline-primary" 
                                title="Ver Detalhes"
                                onClick={() => handleViewDetails(item)}
                              >
                                <i className="fa fa-eye"></i>
                              </button>
                              <button 
                                className="btn btn-outline-info" 
                                title="Imprimir"
                                onClick={() => handlePrintService(item)}
                              >
                                <i className="fa fa-print"></i>
                              </button>
                              <button 
                                className="btn btn-outline-success" 
                                title="Copiar Dados"
                                onClick={() => handleCopyService(item)}
                              >
                                <i className="fa fa-copy"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">
                      <i className="fa fa-chart-pie me-2"></i>
                      Resumo por Categoria
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-2 d-flex justify-content-between">
                      <span>Manutenção Preventiva</span>
                      <span className="fw-bold">Kz 630</span>
                    </div>
                    <div className="mb-2 d-flex justify-content-between">
                      <span>Reparos</span>
                      <span className="fw-bold">Kz 320</span>
                    </div>
                    <div className="mb-2 d-flex justify-content-between">
                      <span>Diagnósticos</span>
                      <span className="fw-bold">Kz 80</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">
                      <i className="fa fa-calendar me-2"></i>
                      Próximas Manutenções
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Troca de óleo</span>
                        <span className="badge bg-warning">15/03/2024</span>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Revisão geral</span>
                        <span className="badge bg-info">15/05/2024</span>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Inspeção anual</span>
                        <span className="badge bg-secondary">15/08/2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
              <i className="fa fa-times me-2"></i>
              Fechar
            </button>
            <button type="button" className="btn btn-success">
              <i className="fa fa-wrench me-2"></i>
              Novo Serviço
            </button>
            <button type="button" className="btn btn-info">
              <i className="fa fa-print me-2"></i>
              Imprimir Histórico
            </button>
          </div>
        </div>
      </div>

      <ServicoDetailsModal
        isOpen={showServiceDetails}
        servico={selectedService}
        veiculo={veiculo}
        onClose={() => {
          setShowServiceDetails(false);
          setSelectedService(null);
        }}
      />

      <Toast
        isOpen={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}