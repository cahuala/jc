'use client';

import { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

export default function RelatorioPerformancePage() {
  const [periodo, setPeriodo] = useState('mes');

  const dadosPerformance = {
    kpis: {
      faturamentoTotal: 4700000,
      metaFaturamento: 4500000,
      servicosRealizados: 128,
      metaServicos: 120,
      satisfacaoCliente: 4.7,
      tempoMedioServico: 4.2,
      produtividadeFuncionarios: 87.5,
      margemLucro: 39.4
    },
    performanceMensal: [
      { mes: 'Jan', faturamento: 4200000, servicos: 115, satisfacao: 4.5 },
      { mes: 'Fev', faturamento: 4700000, servicos: 128, satisfacao: 4.7 },
      { mes: 'Mar', faturamento: 5100000, servicos: 142, satisfacao: 4.8 }
    ],
    departamentos: [
      { nome: 'Oficina', funcionarios: 8, produtividade: 92.3, faturamento: 2850000 },
      { nome: 'Vendas', funcionarios: 3, produtividade: 88.7, faturamento: 1200000 },
      { nome: 'Atendimento', funcionarios: 2, produtividade: 85.2, faturamento: 450000 },
      { nome: 'Administração', funcionarios: 2, produtividade: 78.9, faturamento: 200000 }
    ],
    indicadores: {
      eficienciaOperacional: 89.2,
      qualidadeServico: 94.5,
      pontualidadeEntrega: 91.8,
      satisfacaoFuncionarios: 86.3
    }
  };

  const getProgressColor = (valor: number, meta: number) => {
    const percentual = (valor / meta) * 100;
    if (percentual >= 100) return 'bg-success';
    if (percentual >= 80) return 'bg-warning';
    return 'bg-danger';
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Relatório de Performance</h2>
          <p className="text-muted mb-0">Análise de KPIs e indicadores de desempenho</p>
        </div>
        <div className="d-flex gap-2">
          <select 
            className="form-select"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
          >
            <option value="mes">Este Mês</option>
            <option value="trimestre">Trimestre</option>
            <option value="ano">Este Ano</option>
          </select>
          <button className="btn btn-success" onClick={() => setShowPDF(true)}>
            <i className="fa fa-download me-2"></i>
            Exportar PDF
          </button>
          <button className="btn btn-info" onClick={() => {
            const link = document.createElement('a');
            link.href = '#';
            link.download = `relatorio_performance_${new Date().getTime()}.pdf`;
            link.click();
          }}>
            <i className="fa fa-file-excel me-2"></i>
            Exportar Excel
          </button>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Faturamento</h6>
                  <h4 className="mb-0">Kz {dadosPerformance.kpis.faturamentoTotal.toLocaleString()}</h4>
                  <small>Meta: Kz {dadosPerformance.kpis.metaFaturamento.toLocaleString()}</small>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-chart-line fa-2x opacity-75"></i>
                </div>
              </div>
              <div className="progress mt-2" style={{height: '4px'}}>
                <div 
                  className={`progress-bar ${getProgressColor(dadosPerformance.kpis.faturamentoTotal, dadosPerformance.kpis.metaFaturamento)}`}
                  style={{width: `${Math.min((dadosPerformance.kpis.faturamentoTotal / dadosPerformance.kpis.metaFaturamento) * 100, 100)}%`}}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Serviços</h6>
                  <h4 className="mb-0">{dadosPerformance.kpis.servicosRealizados}</h4>
                  <small>Meta: {dadosPerformance.kpis.metaServicos}</small>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-wrench fa-2x opacity-75"></i>
                </div>
              </div>
              <div className="progress mt-2" style={{height: '4px'}}>
                <div 
                  className={`progress-bar ${getProgressColor(dadosPerformance.kpis.servicosRealizados, dadosPerformance.kpis.metaServicos)}`}
                  style={{width: `${Math.min((dadosPerformance.kpis.servicosRealizados / dadosPerformance.kpis.metaServicos) * 100, 100)}%`}}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Satisfação</h6>
                  <h4 className="mb-0">{dadosPerformance.kpis.satisfacaoCliente}/5.0</h4>
                  <small>⭐⭐⭐⭐⭐</small>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-smile fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Produtividade</h6>
                  <h4 className="mb-0">{dadosPerformance.kpis.produtividadeFuncionarios}%</h4>
                  <small>Funcionários</small>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-users fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <Panel>
            <PanelHeader>Performance Mensal</PanelHeader>
            <PanelBody>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Mês</th>
                      <th>Faturamento</th>
                      <th>Serviços</th>
                      <th>Satisfação</th>
                      <th>Crescimento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosPerformance.performanceMensal.map((item, index) => (
                      <tr key={index}>
                        <td><strong>{item.mes}</strong></td>
                        <td>Kz {item.faturamento.toLocaleString()}</td>
                        <td>
                          <span className="badge bg-primary">{item.servicos}</span>
                        </td>
                        <td>
                          <span className="text-warning fw-bold">{item.satisfacao}/5.0</span>
                        </td>
                        <td>
                          {index > 0 && (
                            <span className="text-success">
                              +{(((item.faturamento - dadosPerformance.performanceMensal[index-1].faturamento) / dadosPerformance.performanceMensal[index-1].faturamento) * 100).toFixed(1)}%
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </PanelBody>
          </Panel>
        </div>
        <div className="col-md-4">
          <Panel>
            <PanelHeader>Indicadores Chave</PanelHeader>
            <PanelBody>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Eficiência Operacional</span>
                  <span className="fw-bold">{dadosPerformance.indicadores.eficienciaOperacional}%</span>
                </div>
                <div className="progress" style={{height: '8px'}}>
                  <div 
                    className="progress-bar bg-primary" 
                    style={{width: `${dadosPerformance.indicadores.eficienciaOperacional}%`}}
                  ></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Qualidade do Serviço</span>
                  <span className="fw-bold">{dadosPerformance.indicadores.qualidadeServico}%</span>
                </div>
                <div className="progress" style={{height: '8px'}}>
                  <div 
                    className="progress-bar bg-success" 
                    style={{width: `${dadosPerformance.indicadores.qualidadeServico}%`}}
                  ></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Pontualidade</span>
                  <span className="fw-bold">{dadosPerformance.indicadores.pontualidadeEntrega}%</span>
                </div>
                <div className="progress" style={{height: '8px'}}>
                  <div 
                    className="progress-bar bg-info" 
                    style={{width: `${dadosPerformance.indicadores.pontualidadeEntrega}%`}}
                  ></div>
                </div>
              </div>
              <div className="mb-0">
                <div className="d-flex justify-content-between mb-1">
                  <span>Satisfação Funcionários</span>
                  <span className="fw-bold">{dadosPerformance.indicadores.satisfacaoFuncionarios}%</span>
                </div>
                <div className="progress" style={{height: '8px'}}>
                  <div 
                    className="progress-bar bg-warning" 
                    style={{width: `${dadosPerformance.indicadores.satisfacaoFuncionarios}%`}}
                  ></div>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <Panel>
            <PanelHeader>Performance por Departamento</PanelHeader>
            <PanelBody>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Departamento</th>
                      <th>Funcionários</th>
                      <th>Produtividade</th>
                      <th>Faturamento</th>
                      <th>Faturamento/Funcionário</th>
                      <th>Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosPerformance.departamentos.map((dept, index) => (
                      <tr key={index}>
                        <td><strong>{dept.nome}</strong></td>
                        <td>
                          <span className="badge bg-secondary">{dept.funcionarios}</span>
                        </td>
                        <td>
                          <span className={`fw-bold ${dept.produtividade >= 90 ? 'text-success' : dept.produtividade >= 80 ? 'text-warning' : 'text-danger'}`}>
                            {dept.produtividade}%
                          </span>
                        </td>
                        <td>Kz {dept.faturamento.toLocaleString()}</td>
                        <td>Kz {(dept.faturamento / dept.funcionarios).toLocaleString()}</td>
                        <td>
                          <div className="progress" style={{height: '20px', width: '100px'}}>
                            <div 
                              className={`progress-bar ${dept.produtividade >= 90 ? 'bg-success' : dept.produtividade >= 80 ? 'bg-warning' : 'bg-danger'}`}
                              style={{width: `${dept.produtividade}%`}}
                            ></div>
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
    </div>
  );
}