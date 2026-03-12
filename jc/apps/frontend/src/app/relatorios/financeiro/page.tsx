'use client';

import { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import PDFReport from '@/components/relatorios/PDFReport';

export default function RelatorioFinanceiroPage() {
  const [periodo, setPeriodo] = useState('mes');
  const [showPDF, setShowPDF] = useState(false);

  const dadosFinanceiros = {
    receitaTotal: 4700000,
    despesaTotal: 2850000,
    lucroLiquido: 1850000,
    margemLucro: 39.4,
    contasReceber: 850000,
    contasPagar: 420000,
    fluxoCaixa: [
      { mes: 'Jan', receita: 4200000, despesa: 2600000, lucro: 1600000 },
      { mes: 'Fev', receita: 4700000, despesa: 2850000, lucro: 1850000 },
      { mes: 'Mar', receita: 5100000, despesa: 3100000, lucro: 2000000 }
    ],
    categoriasDespesas: [
      { categoria: 'Folha de Pagamento', valor: 1200000, percentual: 42.1 },
      { categoria: 'Fornecedores', valor: 850000, percentual: 29.8 },
      { categoria: 'Aluguel e Utilidades', valor: 450000, percentual: 15.8 },
      { categoria: 'Marketing', valor: 200000, percentual: 7.0 },
      { categoria: 'Outros', valor: 150000, percentual: 5.3 }
    ]
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Relatório Financeiro</h2>
          <p className="text-muted mb-0">Análise de receitas, despesas e lucratividade</p>
        </div>
        <div className="d-flex gap-2">
          <select 
            className="form-select"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
          >
            <option value="mes">Este Mês</option>
            <option value="trimestre">Trimestre</option>
            <option value="semestre">Semestre</option>
            <option value="ano">Este Ano</option>
          </select>
          <button className="btn btn-success" onClick={() => setShowPDF(true)}>
            <i className="fa fa-download me-2"></i>
            Exportar PDF
          </button>
          <button className="btn btn-info" onClick={() => {
            const link = document.createElement('a');
            link.href = '#';
            link.download = `relatorio_financeiro_${new Date().getTime()}.pdf`;
            link.click();
          }}>
            <i className="fa fa-file-excel me-2"></i>
            Exportar Excel
          </button>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Receita Total</h6>
                  <h3 className="mb-0">Kz {dadosFinanceiros.receitaTotal.toLocaleString()}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-arrow-up fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Despesa Total</h6>
                  <h3 className="mb-0">Kz {dadosFinanceiros.despesaTotal.toLocaleString()}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-arrow-down fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Lucro Líquido</h6>
                  <h3 className="mb-0">Kz {dadosFinanceiros.lucroLiquido.toLocaleString()}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-chart-line fa-2x opacity-75"></i>
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
                  <h6 className="card-title">Margem de Lucro</h6>
                  <h3 className="mb-0">{dadosFinanceiros.margemLucro}%</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-percentage fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Contas a Receber</h6>
                  <h3 className="mb-0">Kz {dadosFinanceiros.contasReceber.toLocaleString()}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-file-invoice fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card bg-secondary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Contas a Pagar</h6>
                  <h3 className="mb-0">Kz {dadosFinanceiros.contasPagar.toLocaleString()}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-file-invoice-dollar fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <Panel>
            <PanelHeader>Fluxo de Caixa (Últimos 3 Meses)</PanelHeader>
            <PanelBody>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Mês</th>
                      <th>Receita</th>
                      <th>Despesa</th>
                      <th>Lucro</th>
                      <th>Gráfico</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosFinanceiros.fluxoCaixa.map((item, index) => (
                      <tr key={index}>
                        <td><strong>{item.mes}</strong></td>
                        <td className="text-success">Kz {item.receita.toLocaleString()}</td>
                        <td className="text-danger">Kz {item.despesa.toLocaleString()}</td>
                        <td className="text-primary fw-bold">Kz {item.lucro.toLocaleString()}</td>
                        <td>
                          <div className="progress" style={{height: '20px'}}>
                            <div 
                              className="progress-bar bg-success" 
                              style={{width: `${(item.receita / 5500000) * 100}%`}}
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
            <PanelHeader>Despesas por Categoria</PanelHeader>
            <PanelBody>
              {dadosFinanceiros.categoriasDespesas.map((categoria, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="fw-bold">{categoria.categoria}</span>
                    <span className="text-muted">{categoria.percentual}%</span>
                  </div>
                  <div className="progress mb-1" style={{height: '8px'}}>
                    <div 
                      className="progress-bar bg-danger" 
                      style={{width: `${categoria.percentual}%`}}
                    ></div>
                  </div>
                  <div className="text-end">
                    <small className="text-muted">Kz {categoria.valor.toLocaleString()}</small>
                  </div>
                </div>
              ))}
            </PanelBody>
          </Panel>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <Panel>
            <PanelHeader>Indicadores Financeiros</PanelHeader>
            <PanelBody>
              <div className="row text-center">
                <div className="col-md-3">
                  <div className="p-3">
                    <i className="fa fa-coins fa-3x text-warning mb-2"></i>
                    <h4>Kz {(dadosFinanceiros.contasReceber - dadosFinanceiros.contasPagar).toLocaleString()}</h4>
                    <p className="text-muted">Saldo Líquido</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3">
                    <i className="fa fa-chart-pie fa-3x text-info mb-2"></i>
                    <h4>{((dadosFinanceiros.despesaTotal / dadosFinanceiros.receitaTotal) * 100).toFixed(1)}%</h4>
                    <p className="text-muted">Taxa de Despesas</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3">
                    <i className="fa fa-trending-up fa-3x text-success mb-2"></i>
                    <h4>+15.2%</h4>
                    <p className="text-muted">Crescimento Mensal</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3">
                    <i className="fa fa-balance-scale fa-3x text-primary mb-2"></i>
                    <h4>{(dadosFinanceiros.receitaTotal / dadosFinanceiros.despesaTotal).toFixed(1)}x</h4>
                    <p className="text-muted">Índice Receita/Despesa</p>
                  </div>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      {showPDF && (
        <PDFReport
          tipo="financeiro"
          dados={dadosFinanceiros}
          periodo={periodo === 'mes' ? 'Fevereiro 2024' : periodo}
          onClose={() => setShowPDF(false)}
        />
      )}
    </div>
  );
}