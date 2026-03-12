'use client';

import { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import PDFReport from '@/components/relatorios/PDFReport';

export default function RelatorioServicosPage() {
  const [periodo, setPeriodo] = useState('mes');
  const [showPDF, setShowPDF] = useState(false);

  const dadosServicos = {
    totalServicos: 128,
    servicosCompletos: 115,
    servicosAndamento: 8,
    servicosPendentes: 5,
    faturamentoServicos: 1850000,
    tempoMedioServico: 4.2,
    servicosPorTipo: [
      { tipo: 'Manutenção Preventiva', quantidade: 45, valor: 675000 },
      { tipo: 'Troca de Óleo', quantidade: 38, valor: 380000 },
      { tipo: 'Alinhamento e Balanceamento', quantidade: 25, valor: 375000 },
      { tipo: 'Freios', quantidade: 20, valor: 420000 }
    ],
    mecanicos: [
      { nome: 'António Silva', servicos: 42, faturamento: 630000 },
      { nome: 'Pedro Oliveira', servicos: 35, faturamento: 525000 },
      { nome: 'Carlos Mendes', servicos: 28, faturamento: 420000 }
    ]
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Relatório de Serviços</h2>
          <p className="text-muted mb-0">Análise de produtividade da oficina</p>
        </div>
        <div className="d-flex gap-2">
          <select 
            className="form-select"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
          >
            <option value="dia">Hoje</option>
            <option value="semana">Esta Semana</option>
            <option value="mes">Este Mês</option>
            <option value="ano">Este Ano</option>
          </select>
          <button className="btn btn-success" onClick={() => setShowPDF(true)}>
            <i className="fa fa-download me-2"></i>
            Exportar PDF
          </button>
          <button className="btn btn-info" onClick={() => {
            const link = document.createElement('a');
            link.href = '#';
            link.download = `relatorio_servicos_${new Date().getTime()}.xlsx`;
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
                  <h6 className="card-title">Total de Serviços</h6>
                  <h3 className="mb-0">{dadosServicos.totalServicos}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-wrench fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Completos</h6>
                  <h3 className="mb-0">{dadosServicos.servicosCompletos}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-check-circle fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Faturamento</h6>
                  <h3 className="mb-0">Kz {dadosServicos.faturamentoServicos.toLocaleString()}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-money-bill fa-2x opacity-75"></i>
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
                  <h6 className="card-title">Tempo Médio</h6>
                  <h3 className="mb-0">{dadosServicos.tempoMedioServico}h</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-clock fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Panel>
            <PanelHeader>Serviços por Tipo</PanelHeader>
            <PanelBody>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Tipo de Serviço</th>
                      <th>Quantidade</th>
                      <th>Faturamento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosServicos.servicosPorTipo.map((servico, index) => (
                      <tr key={index}>
                        <td><strong>{servico.tipo}</strong></td>
                        <td>
                          <span className="badge bg-primary">{servico.quantidade}</span>
                        </td>
                        <td>
                          <span className="text-success fw-bold">
                            Kz {servico.valor.toLocaleString()}
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
        <div className="col-md-6">
          <Panel>
            <PanelHeader>Performance dos Mecânicos</PanelHeader>
            <PanelBody>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Mecânico</th>
                      <th>Serviços</th>
                      <th>Faturamento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosServicos.mecanicos.map((mecanico, index) => (
                      <tr key={index}>
                        <td><strong>{mecanico.nome}</strong></td>
                        <td>
                          <span className="badge bg-info">{mecanico.servicos}</span>
                        </td>
                        <td>
                          <span className="text-success fw-bold">
                            Kz {mecanico.faturamento.toLocaleString()}
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
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <Panel>
            <PanelHeader>Status dos Serviços</PanelHeader>
            <PanelBody>
              <div className="row text-center">
                <div className="col-md-3">
                  <div className="p-3">
                    <i className="fa fa-check-circle fa-3x text-success mb-2"></i>
                    <h4>{dadosServicos.servicosCompletos}</h4>
                    <p className="text-muted">Completos</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3">
                    <i className="fa fa-cog fa-3x text-warning mb-2"></i>
                    <h4>{dadosServicos.servicosAndamento}</h4>
                    <p className="text-muted">Em Andamento</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3">
                    <i className="fa fa-clock fa-3x text-info mb-2"></i>
                    <h4>{dadosServicos.servicosPendentes}</h4>
                    <p className="text-muted">Pendentes</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3">
                    <i className="fa fa-percentage fa-3x text-primary mb-2"></i>
                    <h4>{((dadosServicos.servicosCompletos / dadosServicos.totalServicos) * 100).toFixed(1)}%</h4>
                    <p className="text-muted">Taxa de Conclusão</p>
                  </div>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      {showPDF && (
        <PDFReport
          tipo="servicos"
          dados={dadosServicos}
          periodo={periodo === 'mes' ? 'Fevereiro 2024' : periodo}
          onClose={() => setShowPDF(false)}
        />
      )}
    </div>
  );
}