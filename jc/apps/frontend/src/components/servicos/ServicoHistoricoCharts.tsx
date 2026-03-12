import React from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

interface ServicoHistorico {
  id: number;
  tipoServico: string;
  mecanico: string;
  dataInicio: string;
  valor: number;
  lucro: number;
  tempoServico: number;
  satisfacao: number;
}

interface ServicoHistoricoChartsProps {
  servicos: ServicoHistorico[];
}

export default function ServicoHistoricoCharts({ servicos }: ServicoHistoricoChartsProps) {
  // Análise por tipo de serviço
  const servicosPorTipo = servicos.reduce((acc, servico) => {
    acc[servico.tipoServico] = (acc[servico.tipoServico] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Análise por mecânico
  const servicosPorMecanico = servicos.reduce((acc, servico) => {
    if (!acc[servico.mecanico]) {
      acc[servico.mecanico] = { count: 0, valor: 0, satisfacao: 0 };
    }
    acc[servico.mecanico].count += 1;
    acc[servico.mecanico].valor += servico.valor;
    acc[servico.mecanico].satisfacao += servico.satisfacao;
    return acc;
  }, {} as Record<string, { count: number; valor: number; satisfacao: number }>);

  // Faturamento por mês (últimos 6 meses)
  const faturamentoPorMes = servicos.reduce((acc, servico) => {
    const data = new Date(servico.dataInicio);
    const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`;
    acc[mesAno] = (acc[mesAno] || 0) + servico.valor;
    return acc;
  }, {} as Record<string, number>);

  const getCorPorTipo = (tipo: string) => {
    const cores = {
      'Manutenção Preventiva': 'bg-success',
      'Motor': 'bg-danger',
      'Freios': 'bg-warning',
      'Suspensão': 'bg-info',
      'Ar Condicionado': 'bg-primary',
      'Elétrica': 'bg-secondary'
    };
    return cores[tipo as keyof typeof cores] || 'bg-dark';
  };

  const maxServicos = Math.max(...Object.values(servicosPorTipo));
  const maxFaturamento = Math.max(...Object.values(faturamentoPorMes));

  return (
    <div className="row mb-4">
      {/* Gráfico de Serviços por Tipo */}
      <div className="col-xl-4 col-lg-6">
        <Panel className="mb-3">
          <PanelHeader>
            <h4 className="panel-title">
              <i className="fa fa-chart-pie me-2 text-primary"></i>
              Serviços por Tipo
            </h4>
          </PanelHeader>
          <PanelBody>
            <div className="d-flex flex-column gap-3">
              {Object.entries(servicosPorTipo).map(([tipo, count]) => (
                <div key={tipo} className="d-flex align-items-center">
                  <div className="flex-fill">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="fs-13px">{tipo}</span>
                      <span className="fs-13px fw-bold">{count}</span>
                    </div>
                    <div className="progress" style={{height: '8px'}}>
                      <div 
                        className={`progress-bar ${getCorPorTipo(tipo)}`}
                        style={{width: `${(count / maxServicos) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PanelBody>
        </Panel>
      </div>

      {/* Performance por Mecânico */}
      <div className="col-xl-4 col-lg-6">
        <Panel className="mb-3">
          <PanelHeader>
            <h4 className="panel-title">
              <i className="fa fa-users me-2 text-success"></i>
              Performance por Mecânico
            </h4>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <table className="table table-sm mb-0">
                <thead>
                  <tr>
                    <th>Mecânico</th>
                    <th>Serviços</th>
                    <th>Faturamento</th>
                    <th>Satisfação</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(servicosPorMecanico).map(([mecanico, data]) => (
                    <tr key={mecanico}>
                      <td className="fw-bold">{mecanico}</td>
                      <td>
                        <span className="badge bg-primary">{data.count}</span>
                      </td>
                      <td className="text-success">
                        R$ {data.valor.toLocaleString()}
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="me-2">{(data.satisfacao / data.count).toFixed(1)}</span>
                          <div className="flex-fill">
                            {Array.from({length: 5}, (_, i) => (
                              <i key={i} className={`fa fa-star ${i < Math.round(data.satisfacao / data.count) ? 'text-warning' : 'text-muted'} fs-10px`}></i>
                            ))}
                          </div>
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

      {/* Faturamento Mensal */}
      <div className="col-xl-4 col-lg-12">
        <Panel className="mb-3">
          <PanelHeader>
            <h4 className="panel-title">
              <i className="fa fa-chart-line me-2 text-warning"></i>
              Faturamento Mensal
            </h4>
          </PanelHeader>
          <PanelBody>
            <div className="d-flex flex-column gap-3">
              {Object.entries(faturamentoPorMes)
                .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
                .slice(-6)
                .map(([mes, valor]) => (
                <div key={mes} className="d-flex align-items-center">
                  <div className="flex-fill">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="fs-13px">{mes}</span>
                      <span className="fs-13px fw-bold text-success">R$ {valor.toLocaleString()}</span>
                    </div>
                    <div className="progress" style={{height: '8px'}}>
                      <div 
                        className="progress-bar bg-success"
                        style={{width: `${(valor / maxFaturamento) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-top">
              <div className="row text-center">
                <div className="col-6">
                  <div className="text-success fw-bold">
                    R$ {Object.values(faturamentoPorMes).reduce((a, b) => a + b, 0).toLocaleString()}
                  </div>
                  <div className="text-muted fs-12px">Total Período</div>
                </div>
                <div className="col-6">
                  <div className="text-info fw-bold">
                    R$ {(Object.values(faturamentoPorMes).reduce((a, b) => a + b, 0) / Object.keys(faturamentoPorMes).length).toLocaleString()}
                  </div>
                  <div className="text-muted fs-12px">Média Mensal</div>
                </div>
              </div>
            </div>
          </PanelBody>
        </Panel>
      </div>
    </div>
  );
}