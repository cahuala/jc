'use client';

import { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

export default function RelatorioClientesPage() {
  const [periodo, setPeriodo] = useState('mes');

  const dadosClientes = {
    totalClientes: 245,
    clientesAtivos: 198,
    clientesNovos: 28,
    clientesInativos: 47,
    ticketMedioCliente: 85000,
    frequenciaMedia: 2.3,
    clientesPorSegmento: [
      { segmento: 'Pessoa Física', quantidade: 180, percentual: 73.5, faturamento: 2850000 },
      { segmento: 'Pessoa Jurídica', quantidade: 45, percentual: 18.4, faturamento: 1950000 },
      { segmento: 'Frota', quantidade: 20, percentual: 8.1, faturamento: 1200000 }
    ],
    topClientes: [
      { nome: 'João Pereira', nif: '123456789', servicos: 12, faturamento: 450000 },
      { nome: 'Maria Silva', nif: '987654321', servicos: 8, faturamento: 320000 },
      { nome: 'Empresa ABC Lda', nif: '456789123', servicos: 15, faturamento: 680000 },
      { nome: 'Carlos Santos', nif: '789123456', servicos: 6, faturamento: 280000 }
    ],
    servicosPorCliente: [
      { mes: 'Jan', novos: 22, retorno: 156 },
      { mes: 'Fev', novos: 28, retorno: 170 },
      { mes: 'Mar', novos: 25, retorno: 165 }
    ]
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Relatório de Clientes</h2>
          <p className="text-muted mb-0">Análise da base de clientes e comportamento</p>
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
            link.download = `relatorio_clientes_${new Date().getTime()}.pdf`;
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
                  <h6 className="card-title">Total de Clientes</h6>
                  <h3 className="mb-0">{dadosClientes.totalClientes}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-users fa-2x opacity-75"></i>
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
                  <h6 className="card-title">Clientes Ativos</h6>
                  <h3 className="mb-0">{dadosClientes.clientesAtivos}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-user-check fa-2x opacity-75"></i>
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
                  <h6 className="card-title">Clientes Novos</h6>
                  <h3 className="mb-0">{dadosClientes.clientesNovos}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-user-plus fa-2x opacity-75"></i>
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
                  <h6 className="card-title">Ticket Médio</h6>
                  <h3 className="mb-0">Kz {dadosClientes.ticketMedioCliente.toLocaleString()}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-calculator fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Panel>
            <PanelHeader>Clientes por Segmento</PanelHeader>
            <PanelBody>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Segmento</th>
                      <th>Quantidade</th>
                      <th>%</th>
                      <th>Faturamento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosClientes.clientesPorSegmento.map((segmento, index) => (
                      <tr key={index}>
                        <td><strong>{segmento.segmento}</strong></td>
                        <td>
                          <span className="badge bg-primary">{segmento.quantidade}</span>
                        </td>
                        <td>{segmento.percentual}%</td>
                        <td>
                          <span className="text-success fw-bold">
                            Kz {segmento.faturamento.toLocaleString()}
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
            <PanelHeader>Top Clientes</PanelHeader>
            <PanelBody>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Serviços</th>
                      <th>Faturamento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosClientes.topClientes.map((cliente, index) => (
                      <tr key={index}>
                        <td>
                          <div>
                            <strong>{cliente.nome}</strong>
                            <div className="small text-muted">NIF: {cliente.nif}</div>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-info">{cliente.servicos}</span>
                        </td>
                        <td>
                          <span className="text-success fw-bold">
                            Kz {cliente.faturamento.toLocaleString()}
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
        <div className="col-md-8">
          <Panel>
            <PanelHeader>Novos vs Clientes de Retorno</PanelHeader>
            <PanelBody>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Mês</th>
                      <th>Novos Clientes</th>
                      <th>Clientes Retorno</th>
                      <th>Total</th>
                      <th>Taxa Retorno</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosClientes.servicosPorCliente.map((item, index) => (
                      <tr key={index}>
                        <td><strong>{item.mes}</strong></td>
                        <td>
                          <span className="badge bg-info">{item.novos}</span>
                        </td>
                        <td>
                          <span className="badge bg-success">{item.retorno}</span>
                        </td>
                        <td>
                          <span className="fw-bold">{item.novos + item.retorno}</span>
                        </td>
                        <td>
                          <span className="text-success fw-bold">
                            {((item.retorno / (item.novos + item.retorno)) * 100).toFixed(1)}%
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
        <div className="col-md-4">
          <Panel>
            <PanelHeader>Indicadores de Fidelidade</PanelHeader>
            <PanelBody>
              <div className="text-center mb-3">
                <i className="fa fa-heart fa-3x text-danger mb-2"></i>
                <h4>{dadosClientes.frequenciaMedia}</h4>
                <p className="text-muted">Frequência Média (serviços/mês)</p>
              </div>
              <hr/>
              <div className="text-center mb-3">
                <i className="fa fa-sync fa-3x text-success mb-2"></i>
                <h4>{((dadosClientes.clientesAtivos / dadosClientes.totalClientes) * 100).toFixed(1)}%</h4>
                <p className="text-muted">Taxa de Retenção</p>
              </div>
              <hr/>
              <div className="text-center">
                <i className="fa fa-chart-line fa-3x text-primary mb-2"></i>
                <h4>{((dadosClientes.clientesNovos / dadosClientes.totalClientes) * 100).toFixed(1)}%</h4>
                <p className="text-muted">Taxa de Crescimento</p>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>
    </div>
  );
}