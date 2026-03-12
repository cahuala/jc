'use client';
import { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import React from 'react';

export default function MetricasPage() {
  const [filtroTempo, setFiltroTempo] = useState('mes');

  const metricas = {
    operacionais: {
      agendamentosTotal: 245,
      agendamentosConcluidos: 220,
      taxaConclusao: 89.8,
      tempoMedioAtendimento: 2.3,
      clientesAtendidos: 180,
      servicosRealizados: 156
    },
    financeiras: {
      receitaTotal: 580000,
      receitaMedia: 3718,
      custoTotal: 350000,
      margemBruta: 39.7,
      ticketMedio: 3222,
      receitaPorHora: 1250
    },
    qualidade: {
      satisfacaoMedia: 4.6,
      nps: 72,
      reclamacoes: 3,
      retrabalhos: 5,
      taxaResolucao: 96.2,
      tempoResposta: 1.2
    }
  };

  const metricasComparativas = [
    { metrica: 'Agendamentos', atual: 245, anterior: 198, variacao: 23.7 },
    { metrica: 'Receita Total', atual: 580000, anterior: 520000, variacao: 11.5 },
    { metrica: 'Satisfação Cliente', atual: 4.6, anterior: 4.4, variacao: 4.5 },
    { metrica: 'Tempo Médio Serviço', atual: 2.3, anterior: 2.8, variacao: -17.9 },
    { metrica: 'Taxa de Conclusão', atual: 89.8, anterior: 85.2, variacao: 5.4 }
  ];

  const alertas = [
    { tipo: 'warning', titulo: 'Capacidade Alta', descricao: 'Utilização da capacidade em 78%' },
    { tipo: 'info', titulo: 'Meta Atingida', descricao: 'Satisfação do cliente acima de 4.5' },
    { tipo: 'success', titulo: 'Eficiência Boa', descricao: 'Eficiência operacional em 87%' }
  ];

  const getVariacaoColor = (variacao: number): string => {
    return variacao > 0 ? 'text-success' : variacao < 0 ? 'text-danger' : 'text-muted';
  };

  const getVariacaoIcon = (variacao: number): string => {
    return variacao > 0 ? 'fa-arrow-up' : variacao < 0 ? 'fa-arrow-down' : 'fa-minus';
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Métricas de Performance</h2>
          <p className="text-muted mb-0">Indicadores chave de desempenho da oficina</p>
        </div>
        <select 
          className="form-select" 
          style={{width: '150px'}}
          value={filtroTempo}
          onChange={(e) => setFiltroTempo(e.target.value)}
        >
          <option value="semana">Esta Semana</option>
          <option value="mes">Este Mês</option>
          <option value="trimestre">Este Trimestre</option>
          <option value="ano">Este Ano</option>
        </select>
      </div>

      {/* Alertas */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex gap-3">
            {alertas.map((alerta, index) => (
              <div key={index} className={`alert alert-${alerta.tipo} d-flex align-items-center mb-0`} style={{flex: 1}}>
                <i className={`fa ${
                  alerta.tipo === 'warning' ? 'fa-exclamation-triangle' :
                  alerta.tipo === 'info' ? 'fa-info-circle' : 'fa-check-circle'
                } me-2`}></i>
                <div>
                  <strong>{alerta.titulo}</strong>
                  <div className="small">{alerta.descricao}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Métricas Operacionais */}
      <div className="row mb-4">
        <div className="col-12">
          <Panel>
            <PanelHeader>Métricas Operacionais</PanelHeader>
            <PanelBody>
              <div className="row">
                <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                  <div className="text-center">
                    <i className="fa fa-calendar-check fa-2x text-primary mb-2"></i>
                    <h4 className="text-primary">{metricas.operacionais.agendamentosTotal}</h4>
                    <p className="text-muted mb-0">Agendamentos</p>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                  <div className="text-center">
                    <i className="fa fa-check-circle fa-2x text-success mb-2"></i>
                    <h4 className="text-success">{metricas.operacionais.taxaConclusao}%</h4>
                    <p className="text-muted mb-0">Taxa Conclusão</p>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                  <div className="text-center">
                    <i className="fa fa-clock fa-2x text-warning mb-2"></i>
                    <h4 className="text-warning">{metricas.operacionais.tempoMedioAtendimento}h</h4>
                    <p className="text-muted mb-0">Tempo Médio</p>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                  <div className="text-center">
                    <i className="fa fa-users fa-2x text-info mb-2"></i>
                    <h4 className="text-info">{metricas.operacionais.clientesAtendidos}</h4>
                    <p className="text-muted mb-0">Clientes</p>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                  <div className="text-center">
                    <i className="fa fa-wrench fa-2x text-secondary mb-2"></i>
                    <h4 className="text-secondary">{metricas.operacionais.servicosRealizados}</h4>
                    <p className="text-muted mb-0">Serviços</p>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 mb-3">
                  <div className="text-center">
                    <i className="fa fa-chart-line fa-2x text-dark mb-2"></i>
                    <h4 className="text-dark">87%</h4>
                    <p className="text-muted mb-0">Eficiência</p>
                  </div>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      <div className="row">
        {/* Métricas Financeiras */}
        <div className="col-lg-6">
          <Panel>
            <PanelHeader>Métricas Financeiras</PanelHeader>
            <PanelBody>
              <div className="row">
                <div className="col-6 mb-3">
                  <div className="border-end pe-3">
                    <h5 className="text-success">{metricas.financeiras.receitaTotal.toLocaleString()} Kz</h5>
                    <p className="text-muted mb-0">Receita Total</p>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div>
                    <h5 className="text-primary">{metricas.financeiras.ticketMedio.toLocaleString()} Kz</h5>
                    <p className="text-muted mb-0">Ticket Médio</p>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="border-end pe-3">
                    <h5 className="text-warning">{metricas.financeiras.margemBruta}%</h5>
                    <p className="text-muted mb-0">Margem Bruta</p>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div>
                    <h5 className="text-info">{metricas.financeiras.receitaPorHora.toLocaleString()} Kz</h5>
                    <p className="text-muted mb-0">Receita/Hora</p>
                  </div>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>

        {/* Métricas de Qualidade */}
        <div className="col-lg-6">
          <Panel>
            <PanelHeader>Métricas de Qualidade</PanelHeader>
            <PanelBody>
              <div className="row">
                <div className="col-6 mb-3">
                  <div className="border-end pe-3">
                    <div className="d-flex align-items-center">
                      <i className="fa fa-star text-warning me-2"></i>
                      <h5 className="mb-0">{metricas.qualidade.satisfacaoMedia}/5</h5>
                    </div>
                    <p className="text-muted mb-0">Satisfação</p>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div>
                    <h5 className="text-success">{metricas.qualidade.nps}</h5>
                    <p className="text-muted mb-0">NPS Score</p>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="border-end pe-3">
                    <h5 className="text-danger">{metricas.qualidade.reclamacoes}</h5>
                    <p className="text-muted mb-0">Reclamações</p>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div>
                    <h5 className="text-primary">{metricas.qualidade.taxaResolucao}%</h5>
                    <p className="text-muted mb-0">Taxa Resolução</p>
                  </div>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      {/* Comparativo com Período Anterior */}
      <div className="row mt-4">
        <div className="col-12">
          <Panel>
            <PanelHeader>Comparativo com Período Anterior</PanelHeader>
            <PanelBody className="p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Métrica</th>
                      <th>Período Atual</th>
                      <th>Período Anterior</th>
                      <th>Variação</th>
                      <th>Tendência</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metricasComparativas.map((item, index) => (
                      <tr key={index}>
                        <td className="fw-bold">{item.metrica}</td>
                        <td>
                          {item.metrica.includes('Receita') 
                            ? `${item.atual.toLocaleString()} Kz`
                            : item.atual
                          }
                        </td>
                        <td className="text-muted">
                          {item.metrica.includes('Receita') 
                            ? `${item.anterior.toLocaleString()} Kz`
                            : item.anterior
                          }
                        </td>
                        <td className={getVariacaoColor(item.variacao)}>
                          <strong>{Math.abs(item.variacao)}%</strong>
                        </td>
                        <td>
                          <i className={`fa ${getVariacaoIcon(item.variacao)} ${getVariacaoColor(item.variacao)}`}></i>
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