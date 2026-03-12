'use client';
import { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import React from 'react';

export default function AnalyticsPage() {
  const [periodo, setPeriodo] = useState('30');

  const analytics = {
    totalServicos: 156,
    servicosConcluidos: 142,
    servicosCancelados: 8,
    tempoMedioServico: '2.5h',
    satisfacaoCliente: 4.7,
    receitaTotal: 450000,
    custoOperacional: 280000,
    margemLucro: 37.8
  };

  const servicosMaisRealizados = [
    { servico: 'Troca de Óleo', quantidade: 45, receita: 67500 },
    { servico: 'Alinhamento', quantidade: 32, receita: 48000 },
    { servico: 'Revisão Completa', quantidade: 28, receita: 84000 },
    { servico: 'Troca de Pneus', quantidade: 25, receita: 125000 },
    { servico: 'Diagnóstico', quantidade: 18, receita: 27000 }
  ];

  const mecanicoPerformance = [
    { nome: 'António Mendes', servicos: 48, avaliacao: 4.9, eficiencia: 95 },
    { nome: 'Manuel Costa', servicos: 42, avaliacao: 4.7, eficiencia: 88 },
    { nome: 'José Ferreira', servicos: 38, avaliacao: 4.8, eficiencia: 92 },
    { nome: 'Carlos Silva', servicos: 28, avaliacao: 4.5, eficiencia: 85 }
  ];

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Analytics</h2>
          <p className="text-muted mb-0">Análise detalhada do desempenho da oficina</p>
        </div>
        <select 
          className="form-select" 
          style={{width: '150px'}}
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
        >
          <option value="7">Últimos 7 dias</option>
          <option value="30">Últimos 30 dias</option>
          <option value="90">Últimos 90 dias</option>
          <option value="365">Último ano</option>
        </select>
      </div>

      {/* KPIs Principais */}
      <div className="row mb-4">
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-primary">
            <div className="card-body text-center">
              <i className="fa fa-wrench fa-2x text-primary mb-2"></i>
              <h4 className="text-primary">{analytics.totalServicos}</h4>
              <p className="text-muted mb-0">Total de Serviços</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-success">
            <div className="card-body text-center">
              <i className="fa fa-check-circle fa-2x text-success mb-2"></i>
              <h4 className="text-success">{analytics.servicosConcluidos}</h4>
              <p className="text-muted mb-0">Serviços Concluídos</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-warning">
            <div className="card-body text-center">
              <i className="fa fa-clock fa-2x text-warning mb-2"></i>
              <h4 className="text-warning">{analytics.tempoMedioServico}</h4>
              <p className="text-muted mb-0">Tempo Médio</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-info">
            <div className="card-body text-center">
              <i className="fa fa-star fa-2x text-info mb-2"></i>
              <h4 className="text-info">{analytics.satisfacaoCliente}/5</h4>
              <p className="text-muted mb-0">Satisfação Cliente</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Análise Financeira */}
        <div className="col-lg-4">
          <Panel>
            <PanelHeader>Análise Financeira</PanelHeader>
            <PanelBody>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Receita Total</span>
                  <strong className="text-success">{analytics.receitaTotal.toLocaleString()} Kz</strong>
                </div>
                <div className="progress mb-3" style={{height: '8px'}}>
                  <div className="progress-bar bg-success" style={{width: '100%'}}></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Custo Operacional</span>
                  <strong className="text-warning">{analytics.custoOperacional.toLocaleString()} Kz</strong>
                </div>
                <div className="progress mb-3" style={{height: '8px'}}>
                  <div className="progress-bar bg-warning" style={{width: '62%'}}></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Margem de Lucro</span>
                  <strong className="text-primary">{analytics.margemLucro}%</strong>
                </div>
                <div className="progress" style={{height: '8px'}}>
                  <div className="progress-bar bg-primary" style={{width: `${analytics.margemLucro}%`}}></div>
                </div>
              </div>

              <div className="text-center mt-4">
                <h5 className="text-success">
                  Lucro: {(analytics.receitaTotal - analytics.custoOperacional).toLocaleString()} Kz
                </h5>
              </div>
            </PanelBody>
          </Panel>
        </div>

        {/* Serviços Mais Realizados */}
        <div className="col-lg-4">
          <Panel>
            <PanelHeader>Serviços Mais Realizados</PanelHeader>
            <PanelBody className="p-0">
              <div className="table-responsive">
                <table className="table table-sm mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Serviço</th>
                      <th>Qtd</th>
                      <th>Receita</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicosMaisRealizados.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="fw-bold">{item.servico}</div>
                        </td>
                        <td>
                          <span className="badge bg-primary">{item.quantidade}</span>
                        </td>
                        <td>
                          <span className="text-success fw-bold">
                            {item.receita.toLocaleString()} Kz
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </PanelBody>
          </Panel>
        </div>

        {/* Performance dos Mecânicos */}
        <div className="col-lg-4">
          <Panel>
            <PanelHeader>Performance dos Mecânicos</PanelHeader>
            <PanelBody className="p-0">
              <div className="table-responsive">
                <table className="table table-sm mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Mecânico</th>
                      <th>Serviços</th>
                      <th>Avaliação</th>
                      <th>Eficiência</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mecanicoPerformance.map((mecanico, index) => (
                      <tr key={index}>
                        <td>
                          <div className="fw-bold">{mecanico.nome}</div>
                        </td>
                        <td>
                          <span className="badge bg-info">{mecanico.servicos}</span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <i className="fa fa-star text-warning me-1"></i>
                            <span>{mecanico.avaliacao}</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="progress me-2" style={{width: '50px', height: '6px'}}>
                              <div 
                                className="progress-bar bg-success" 
                                style={{width: `${mecanico.eficiencia}%`}}
                              ></div>
                            </div>
                            <small>{mecanico.eficiencia}%</small>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      {/* Gráficos */}
      <div className="row mt-4">
        <div className="col-lg-6">
          <Panel>
            <PanelHeader>Tendência de Serviços</PanelHeader>
            <PanelBody>
              <div style={{height: '250px', position: 'relative'}}>
                <div className="d-flex justify-content-center align-items-end gap-2" style={{height: '180px', marginTop: '30px'}}>
                  <div className="text-center">
                    <div className="bg-info" style={{width: '25px', height: '80px', margin: '0 auto'}}></div>
                    <small className="mt-1 d-block">Jan</small>
                  </div>
                  <div className="text-center">
                    <div className="bg-info" style={{width: '25px', height: '120px', margin: '0 auto'}}></div>
                    <small className="mt-1 d-block">Fev</small>
                  </div>
                  <div className="text-center">
                    <div className="bg-info" style={{width: '25px', height: '100px', margin: '0 auto'}}></div>
                    <small className="mt-1 d-block">Mar</small>
                  </div>
                  <div className="text-center">
                    <div className="bg-info" style={{width: '25px', height: '140px', margin: '0 auto'}}></div>
                    <small className="mt-1 d-block">Abr</small>
                  </div>
                  <div className="text-center">
                    <div className="bg-info" style={{width: '25px', height: '160px', margin: '0 auto'}}></div>
                    <small className="mt-1 d-block">Mai</small>
                  </div>
                  <div className="text-center">
                    <div className="bg-info" style={{width: '25px', height: '180px', margin: '0 auto'}}></div>
                    <small className="mt-1 d-block">Jun</small>
                  </div>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>

        <div className="col-lg-6">
          <Panel>
            <PanelHeader>Distribuição por Tipo de Serviço</PanelHeader>
            <PanelBody>
              <div style={{height: '250px', position: 'relative'}}>
                <div className="d-flex justify-content-center align-items-center" style={{height: '200px'}}>
                  <div style={{width: '150px', height: '150px', borderRadius: '50%', background: 'conic-gradient(#0d6efd 0deg 108deg, #198754 108deg 180deg, #ffc107 180deg 252deg, #dc3545 252deg 324deg, #6f42c1 324deg 360deg)', position: 'relative'}}>
                    <div className="position-absolute top-50 start-50 translate-middle bg-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                      <div className="text-center">
                        <div className="fw-bold">156</div>
                        <small className="text-muted">Total</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center gap-3 mt-2">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary" style={{width: '12px', height: '12px', marginRight: '5px'}}></div>
                    <small>Revisão (30%)</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="bg-success" style={{width: '12px', height: '12px', marginRight: '5px'}}></div>
                    <small>Pneus (20%)</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="bg-warning" style={{width: '12px', height: '12px', marginRight: '5px'}}></div>
                    <small>Óleo (20%)</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="bg-danger" style={{width: '12px', height: '12px', marginRight: '5px'}}></div>
                    <small>Freios (20%)</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="bg-secondary" style={{width: '12px', height: '12px', marginRight: '5px'}}></div>
                    <small>Outros (10%)</small>
                  </div>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>
    </div>
  );
}