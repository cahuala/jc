'use client';

import { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import PDFReport from '@/components/relatorios/PDFReport';
import FaturaAngolana from '@/components/relatorios/FaturaAngolana';

export default function RelatorioVendasPage() {
  const [periodo, setPeriodo] = useState('mes');
  const [dataInicio, setDataInicio] = useState('2024-02-01');
  const [dataFim, setDataFim] = useState('2024-02-29');
  const [showPDF, setShowPDF] = useState(false);
  const [showFatura, setShowFatura] = useState(false);

  const dadosVendas = {
    totalVendas: 2850000,
    totalPedidos: 45,
    ticketMedio: 63333,
    crescimento: 12.5,
    vendasPorDia: [
      { data: '01/02', valor: 95000 },
      { data: '02/02', valor: 120000 },
      { data: '03/02', valor: 85000 },
      { data: '04/02', valor: 150000 },
      { data: '05/02', valor: 110000 }
    ],
    produtosMaisVendidos: [
      { produto: 'Óleo Motor 5W30', quantidade: 25, valor: 375000 },
      { produto: 'Filtro de Ar', quantidade: 18, valor: 180000 },
      { produto: 'Pastilhas de Freio', quantidade: 15, valor: 450000 },
      { produto: 'Bateria 60Ah', quantidade: 8, valor: 320000 }
    ]
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Relatório de Vendas</h2>
          <p className="text-muted mb-0">Análise de vendas e performance comercial</p>
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
            <option value="personalizado">Personalizado</option>
          </select>
          <button className="btn btn-info" onClick={() => setShowFatura(true)}>
            <i className="fa fa-file-invoice me-2"></i>
            Ver Fatura
          </button>
          <button className="btn btn-success" onClick={() => setShowPDF(true)}>
            <i className="fa fa-download me-2"></i>
            Exportar PDF
          </button>
        </div>
      </div>

      {periodo === 'personalizado' && (
        <Panel className="mb-4">
          <PanelHeader>Período Personalizado</PanelHeader>
          <PanelBody>
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Data Início</label>
                <input
                  type="date"
                  className="form-control"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Data Fim</label>
                <input
                  type="date"
                  className="form-control"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button className="btn btn-primary w-100">Aplicar</button>
              </div>
            </div>
          </PanelBody>
        </Panel>
      )}

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Total de Vendas</h6>
                  <h3 className="mb-0">Kz {dadosVendas.totalVendas.toLocaleString()}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-chart-line fa-2x opacity-75"></i>
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
                  <h6 className="card-title">Total de Pedidos</h6>
                  <h3 className="mb-0">{dadosVendas.totalPedidos}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-shopping-cart fa-2x opacity-75"></i>
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
                  <h6 className="card-title">Ticket Médio</h6>
                  <h3 className="mb-0">Kz {dadosVendas.ticketMedio.toLocaleString()}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-calculator fa-2x opacity-75"></i>
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
                  <h6 className="card-title">Crescimento</h6>
                  <h3 className="mb-0">+{dadosVendas.crescimento}%</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-arrow-up fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <Panel>
            <PanelHeader>Vendas por Dia</PanelHeader>
            <PanelBody>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Valor</th>
                      <th>Gráfico</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosVendas.vendasPorDia.map((venda, index) => (
                      <tr key={index}>
                        <td><strong>{venda.data}</strong></td>
                        <td>Kz {venda.valor.toLocaleString()}</td>
                        <td>
                          <div className="progress" style={{height: '20px'}}>
                            <div 
                              className="progress-bar bg-primary" 
                              style={{width: `${(venda.valor / 150000) * 100}%`}}
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
        <div className="col-md-4">
          <Panel>
            <PanelHeader>Produtos Mais Vendidos</PanelHeader>
            <PanelBody>
              {dadosVendas.produtosMaisVendidos.map((produto, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <div className="fw-bold">{produto.produto}</div>
                    <small className="text-muted">{produto.quantidade} unidades</small>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold text-success">Kz {produto.valor.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </PanelBody>
          </Panel>
        </div>
      </div>

      {showFatura && (
        <FaturaAngolana onClose={() => setShowFatura(false)} />
      )}

      {showPDF && (
        <PDFReport
          tipo="vendas"
          dados={dadosVendas}
          periodo={periodo === 'mes' ? 'Fevereiro 2024' : periodo}
          onClose={() => setShowPDF(false)}
        />
      )}
    </div>
  );
}