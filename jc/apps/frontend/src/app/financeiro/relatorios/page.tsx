'use client';

import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

export default function FinanceiroRelatoriosPage() {
  const [periodo, setPeriodo] = useState('mes');
  const [dataInicio, setDataInicio] = useState('2024-01-01');
  const [dataFim, setDataFim] = useState('2024-01-31');
  const [currentPageClientes, setCurrentPageClientes] = useState(1);
  const [currentPageFornecedores, setCurrentPageFornecedores] = useState(1);
  const [currentPageFluxo, setCurrentPageFluxo] = useState(1);
  const itemsPerPage = 5;

  // Dados mock dos relatórios
  const dadosFinanceiros = {
    receitas: {
      faturamento: 2850000,
      recebimentos: 2450000,
      pendente: 400000
    },
    despesas: {
      fornecedores: 1250000,
      pagamentos: 1100000,
      pendente: 150000
    },
    lucro: {
      bruto: 1600000,
      liquido: 1350000,
      margem: 47.4
    }
  };

  const topClientes = [
    { nome: 'João Silva', valor: 285000, faturas: 8 },
    { nome: 'Maria Santos', valor: 245000, faturas: 6 },
    { nome: 'Carlos Mendes', valor: 195000, faturas: 5 },
    { nome: 'Ana Costa', valor: 165000, faturas: 4 },
    { nome: 'Pedro Oliveira', valor: 125000, faturas: 3 },
    { nome: 'Luisa Ferreira', valor: 115000, faturas: 3 },
    { nome: 'António Neto', valor: 95000, faturas: 2 },
    { nome: 'Beatriz Costa', valor: 85000, faturas: 2 },
    { nome: 'Ricardo Silva', valor: 75000, faturas: 2 },
    { nome: 'Fernanda Lima', valor: 65000, faturas: 1 }
  ];

  const topFornecedores = [
    { nome: 'Auto Peças Luanda Lda', valor: 425000, compras: 12 },
    { nome: 'Ferramentas & Equipamentos SA', valor: 285000, compras: 8 },
    { nome: 'Distribuidora Benguela', valor: 195000, compras: 6 },
    { nome: 'Lubricantes Angola', valor: 165000, compras: 5 },
    { nome: 'Importadora Central', valor: 125000, compras: 4 },
    { nome: 'Peças Originais SA', valor: 115000, compras: 4 },
    { nome: 'Distribuidora Norte', valor: 95000, compras: 3 },
    { nome: 'Auto Center Luanda', valor: 85000, compras: 3 },
    { nome: 'Mecânica Industrial', valor: 75000, compras: 2 },
    { nome: 'Fornecedor Premium', valor: 65000, compras: 2 }
  ];

  const fluxoMensal = [
    { mes: 'Jan', receitas: 2850000, despesas: 1250000, saldo: 1600000 },
    { mes: 'Dez', receitas: 2650000, despesas: 1180000, saldo: 1470000 },
    { mes: 'Nov', receitas: 2750000, despesas: 1320000, saldo: 1430000 },
    { mes: 'Out', receitas: 2450000, despesas: 1150000, saldo: 1300000 },
    { mes: 'Set', receitas: 2350000, despesas: 1080000, saldo: 1270000 },
    { mes: 'Ago', receitas: 2250000, despesas: 1050000, saldo: 1200000 },
    { mes: 'Jul', receitas: 2150000, despesas: 980000, saldo: 1170000 },
    { mes: 'Jun', receitas: 2050000, despesas: 920000, saldo: 1130000 },
    { mes: 'Mai', receitas: 1950000, despesas: 880000, saldo: 1070000 },
    { mes: 'Abr', receitas: 1850000, despesas: 850000, saldo: 1000000 }
  ];

  // Paginação para clientes
  const totalPagesClientes = Math.ceil(topClientes.length / itemsPerPage);
  const startIndexClientes = (currentPageClientes - 1) * itemsPerPage;
  const paginatedClientes = topClientes.slice(startIndexClientes, startIndexClientes + itemsPerPage);

  // Paginação para fornecedores
  const totalPagesFornecedores = Math.ceil(topFornecedores.length / itemsPerPage);
  const startIndexFornecedores = (currentPageFornecedores - 1) * itemsPerPage;
  const paginatedFornecedores = topFornecedores.slice(startIndexFornecedores, startIndexFornecedores + itemsPerPage);

  // Paginação para fluxo
  const totalPagesFluxo = Math.ceil(fluxoMensal.length / itemsPerPage);
  const startIndexFluxo = (currentPageFluxo - 1) * itemsPerPage;
  const paginatedFluxo = fluxoMensal.slice(startIndexFluxo, startIndexFluxo + itemsPerPage);

  const gerarRelatorio = () => {
    console.log('Gerando relatório para período:', { periodo, dataInicio, dataFim });
  };

  const exportarPDF = () => {
    console.log('Exportando relatório em PDF');
  };

  const exportarExcel = () => {
    console.log('Exportando relatório em Excel');
  };

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item">Financeiro</li>
            <li className="breadcrumb-item active">Relatórios Financeiros</li>
          </ol>
          <h1 className="page-header mb-0">Relatórios Financeiros</h1>
        </div>
        <div className="ms-auto">
          <div className="btn-group">
            <button className="btn btn-success" onClick={exportarExcel}>
              <i className="fa fa-file-excel me-2"></i>
              Excel
            </button>
            <button className="btn btn-danger" onClick={exportarPDF}>
              <i className="fa fa-file-pdf me-2"></i>
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <Panel className="mb-3">
        <PanelHeader>
          <span>Filtros do Relatório</span>
        </PanelHeader>
        <PanelBody>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label fw-bold">Período</label>
              <select 
                className="form-select"
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
              >
                <option value="hoje">Hoje</option>
                <option value="semana">Esta Semana</option>
                <option value="mes">Este Mês</option>
                <option value="trimestre">Este Trimestre</option>
                <option value="ano">Este Ano</option>
                <option value="personalizado">Personalizado</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">Data Início</label>
              <input
                type="date"
                className="form-control"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                disabled={periodo !== 'personalizado'}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">Data Fim</label>
              <input
                type="date"
                className="form-control"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                disabled={periodo !== 'personalizado'}
              />
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button className="btn btn-primary w-100" onClick={gerarRelatorio}>
                <i className="fa fa-chart-bar me-2"></i>
                Gerar Relatório
              </button>
            </div>
          </div>
        </PanelBody>
      </Panel>

      {/* Resumo Financeiro */}
      <div className="row mb-3">
        <div className="col-xl-4 col-md-6">
          <Panel className="bg-success text-white">
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">Kz {dadosFinanceiros.receitas.faturamento.toFixed(2)}</div>
                  <div>Receitas Totais</div>
                  <small>Recebido: Kz {dadosFinanceiros.receitas.recebimentos.toFixed(2)}</small>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-arrow-up fa-2x"></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
        <div className="col-xl-4 col-md-6">
          <Panel className="bg-danger text-white">
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">Kz {dadosFinanceiros.despesas.fornecedores.toFixed(2)}</div>
                  <div>Despesas Totais</div>
                  <small>Pago: Kz {dadosFinanceiros.despesas.pagamentos.toFixed(2)}</small>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-arrow-down fa-2x"></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
        <div className="col-xl-4 col-md-6">
          <Panel className="bg-info text-white">
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">Kz {dadosFinanceiros.lucro.liquido.toFixed(2)}</div>
                  <div>Lucro Líquido</div>
                  <small>Margem: {dadosFinanceiros.lucro.margem}%</small>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-chart-line fa-2x"></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      <div className="row">
        {/* Top Clientes */}
        <div className="col-xl-6">
          <Panel>
            <PanelHeader>
              <span>Top Clientes</span>
            </PanelHeader>
            <PanelBody className="p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Cliente</th>
                      <th>Faturamento</th>
                      <th>Faturas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedClientes.map((cliente, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="badge bg-primary me-2">{startIndexClientes + index + 1}</div>
                            <span className="fw-bold">{cliente.nome}</span>
                          </div>
                        </td>
                        <td className="text-success fw-bold">Kz {cliente.valor.toFixed(2)}</td>
                        <td>
                          <span className="badge bg-info">{cliente.faturas}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalPagesClientes > 1 && (
                <div className="d-flex justify-content-between align-items-center p-3 border-top">
                  <div className="text-muted">
                    Mostrando {startIndexClientes + 1} a {Math.min(startIndexClientes + itemsPerPage, topClientes.length)} de {topClientes.length} clientes
                  </div>
                  <div className="btn-group btn-group-sm">
                    <button 
                      className="btn btn-outline-secondary" 
                      disabled={currentPageClientes === 1}
                      onClick={() => setCurrentPageClientes(currentPageClientes - 1)}
                    >
                      <i className="fa fa-chevron-left"></i>
                    </button>
                    {Array.from({ length: totalPagesClientes }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        className={`btn ${currentPageClientes === page ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => setCurrentPageClientes(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button 
                      className="btn btn-outline-secondary" 
                      disabled={currentPageClientes === totalPagesClientes}
                      onClick={() => setCurrentPageClientes(currentPageClientes + 1)}
                    >
                      <i className="fa fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              )}
            </PanelBody>
          </Panel>
        </div>

        {/* Top Fornecedores */}
        <div className="col-xl-6">
          <Panel>
            <PanelHeader>
              <span>Top Fornecedores</span>
            </PanelHeader>
            <PanelBody className="p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Fornecedor</th>
                      <th>Compras</th>
                      <th>Pedidos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedFornecedores.map((fornecedor, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="badge bg-warning me-2">{startIndexFornecedores + index + 1}</div>
                            <span className="fw-bold">{fornecedor.nome}</span>
                          </div>
                        </td>
                        <td className="text-danger fw-bold">Kz {fornecedor.valor.toFixed(2)}</td>
                        <td>
                          <span className="badge bg-secondary">{fornecedor.compras}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalPagesFornecedores > 1 && (
                <div className="d-flex justify-content-between align-items-center p-3 border-top">
                  <div className="text-muted">
                    Mostrando {startIndexFornecedores + 1} a {Math.min(startIndexFornecedores + itemsPerPage, topFornecedores.length)} de {topFornecedores.length} fornecedores
                  </div>
                  <div className="btn-group btn-group-sm">
                    <button 
                      className="btn btn-outline-secondary" 
                      disabled={currentPageFornecedores === 1}
                      onClick={() => setCurrentPageFornecedores(currentPageFornecedores - 1)}
                    >
                      <i className="fa fa-chevron-left"></i>
                    </button>
                    {Array.from({ length: totalPagesFornecedores }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        className={`btn ${currentPageFornecedores === page ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => setCurrentPageFornecedores(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button 
                      className="btn btn-outline-secondary" 
                      disabled={currentPageFornecedores === totalPagesFornecedores}
                      onClick={() => setCurrentPageFornecedores(currentPageFornecedores + 1)}
                    >
                      <i className="fa fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              )}
            </PanelBody>
          </Panel>
        </div>
      </div>

      {/* Fluxo de Caixa Mensal */}
      <Panel className="mt-3">
        <PanelHeader>
          <span>Fluxo de Caixa Mensal</span>
        </PanelHeader>
        <PanelBody className="p-0">
          <div className="table-responsive">
            <table className="table table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Mês</th>
                  <th>Receitas</th>
                  <th>Despesas</th>
                  <th>Saldo</th>
                  <th>Variação</th>
                </tr>
              </thead>
              <tbody>
                {paginatedFluxo.map((mes, index) => {
                  const realIndex = startIndexFluxo + index;
                  const variacao = realIndex < fluxoMensal.length - 1 ? 
                    ((mes.saldo - fluxoMensal[realIndex + 1].saldo) / fluxoMensal[realIndex + 1].saldo * 100) : 0;
                  
                  return (
                    <tr key={index}>
                      <td className="fw-bold">{mes.mes}/2024</td>
                      <td className="text-success fw-bold">Kz {mes.receitas.toFixed(2)}</td>
                      <td className="text-danger fw-bold">Kz {mes.despesas.toFixed(2)}</td>
                      <td className="fw-bold">Kz {mes.saldo.toFixed(2)}</td>
                      <td>
                        <span className={`badge ${variacao >= 0 ? 'bg-success' : 'bg-danger'}`}>
                          {variacao >= 0 ? '+' : ''}{variacao.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {totalPagesFluxo > 1 && (
            <div className="d-flex justify-content-between align-items-center p-3 border-top">
              <div className="text-muted">
                Mostrando {startIndexFluxo + 1} a {Math.min(startIndexFluxo + itemsPerPage, fluxoMensal.length)} de {fluxoMensal.length} meses
              </div>
              <div className="btn-group btn-group-sm">
                <button 
                  className="btn btn-outline-secondary" 
                  disabled={currentPageFluxo === 1}
                  onClick={() => setCurrentPageFluxo(currentPageFluxo - 1)}
                >
                  <i className="fa fa-chevron-left"></i>
                </button>
                {Array.from({ length: totalPagesFluxo }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`btn ${currentPageFluxo === page ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setCurrentPageFluxo(page)}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  className="btn btn-outline-secondary" 
                  disabled={currentPageFluxo === totalPagesFluxo}
                  onClick={() => setCurrentPageFluxo(currentPageFluxo + 1)}
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
            </div>
          )}
        </PanelBody>
      </Panel>
    </div>
  );
}