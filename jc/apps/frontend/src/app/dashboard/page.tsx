'use client';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import React from 'react';

export default function DashboardPage() {
  const metricas = {
    agendamentosHoje: 8,
    servicosAndamento: 5,
    faturamentoMes: 125000,
    clientesAtivos: 234
  };

  const agendamentosRecentes = [
    { id: 1, cliente: 'João Silva', servico: 'Revisão', hora: '09:00', status: 'confirmado' },
    { id: 2, cliente: 'Maria Santos', servico: 'Troca de Pneus', hora: '14:00', status: 'pendente' },
    { id: 3, cliente: 'Pedro Costa', servico: 'Diagnóstico', hora: '16:30', status: 'em_andamento' }
  ];

  const servicosAndamento = [
    { id: 1, cliente: 'Ana Ferreira', veiculo: 'Toyota Corolla', mecanico: 'António Mendes', progresso: 75 },
    { id: 2, cliente: 'Carlos Lima', veiculo: 'Honda Civic', mecanico: 'Manuel Costa', progresso: 45 },
    { id: 3, cliente: 'Sofia Mendes', veiculo: 'Nissan Sentra', mecanico: 'José Ferreira', progresso: 90 }
  ];

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Dashboard</h2>
          <p className="text-muted mb-0">Visão geral da oficina</p>
        </div>
        <div className="text-muted">
          <i className="fa fa-calendar me-1"></i>
          {new Date().toLocaleDateString('pt-AO')}
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Agendamentos Hoje</h6>
                  <h3 className="mb-0">{metricas.agendamentosHoje}</h3>
                </div>
                <i className="fa fa-calendar fa-2x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Serviços em Andamento</h6>
                  <h3 className="mb-0">{metricas.servicosAndamento}</h3>
                </div>
                <i className="fa fa-wrench fa-2x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Faturamento do Mês</h6>
                  <h3 className="mb-0">{metricas.faturamentoMes.toLocaleString()} Kz</h3>
                </div>
                <i className="fa fa-money-bill fa-2x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Clientes Ativos</h6>
                  <h3 className="mb-0">{metricas.clientesAtivos}</h3>
                </div>
                <i className="fa fa-users fa-2x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Agendamentos de Hoje */}
        <div className="col-lg-6">
          <Panel>
            <PanelHeader>
              <div className="d-flex justify-content-between align-items-center w-100">
                <span>Agendamentos de Hoje</span>
                <button className="btn btn-outline-primary btn-sm">
                  <i className="fa fa-plus me-1"></i>
                  Novo
                </button>
              </div>
            </PanelHeader>
            <PanelBody>
              {agendamentosRecentes.length > 0 ? (
                <div className="list-group list-group-flush">
                  {agendamentosRecentes.map((agendamento) => (
                    <div key={agendamento.id} className="list-group-item px-0 py-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{agendamento.cliente}</h6>
                          <p className="mb-1 text-muted">{agendamento.servico}</p>
                          <small className="text-muted">
                            <i className="fa fa-clock me-1"></i>
                            {agendamento.hora}
                          </small>
                        </div>
                        <span className={`badge ${
                          agendamento.status === 'confirmado' ? 'bg-success' :
                          agendamento.status === 'pendente' ? 'bg-warning' : 'bg-info'
                        }`}>
                          {agendamento.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted py-4">
                  <i className="fa fa-calendar-times fa-3x mb-3"></i>
                  <p>Nenhum agendamento para hoje</p>
                </div>
              )}
            </PanelBody>
          </Panel>
        </div>

        {/* Serviços em Andamento */}
        <div className="col-lg-6">
          <Panel>
            <PanelHeader>
              <div className="d-flex justify-content-between align-items-center w-100">
                <span>Serviços em Andamento</span>
                <button className="btn btn-outline-success btn-sm">
                  <i className="fa fa-eye me-1"></i>
                  Ver Todos
                </button>
              </div>
            </PanelHeader>
            <PanelBody>
              {servicosAndamento.length > 0 ? (
                <div className="list-group list-group-flush">
                  {servicosAndamento.map((servico) => (
                    <div key={servico.id} className="list-group-item px-0 py-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="mb-1">{servico.cliente}</h6>
                          <p className="mb-1 text-muted">{servico.veiculo}</p>
                          <small className="text-info">{servico.mecanico}</small>
                        </div>
                        <span className="badge bg-primary">{servico.progresso}%</span>
                      </div>
                      <div className="progress" style={{height: '4px'}}>
                        <div 
                          className="progress-bar" 
                          style={{width: `${servico.progresso}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted py-4">
                  <i className="fa fa-wrench fa-3x mb-3"></i>
                  <p>Nenhum serviço em andamento</p>
                </div>
              )}
            </PanelBody>
          </Panel>
        </div>
      </div>

      {/* Gráfico de Faturamento */}
      <div className="row mt-4">
        <div className="col-12">
          <Panel>
            <PanelHeader>Faturamento dos Últimos 7 Dias</PanelHeader>
            <PanelBody>
              <div style={{height: '300px', position: 'relative'}}>
                <canvas id="faturamentoChart" width="100%" height="300"></canvas>
                <div className="position-absolute top-50 start-50 translate-middle text-center">
                  <i className="fa fa-chart-line fa-4x text-muted mb-3"></i>
                  <h5 className="text-muted">Gráfico de Faturamento</h5>
                  <p className="text-muted">Dados simulados - 7 dias</p>
                  <div className="d-flex justify-content-center gap-4 mt-3">
                    <div className="text-center">
                      <div className="bg-primary" style={{width: '20px', height: '60px', margin: '0 auto'}}></div>
                      <small>Seg</small>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary" style={{width: '20px', height: '80px', margin: '0 auto'}}></div>
                      <small>Ter</small>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary" style={{width: '20px', height: '45px', margin: '0 auto'}}></div>
                      <small>Qua</small>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary" style={{width: '20px', height: '90px', margin: '0 auto'}}></div>
                      <small>Qui</small>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary" style={{width: '20px', height: '70px', margin: '0 auto'}}></div>
                      <small>Sex</small>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary" style={{width: '20px', height: '35px', margin: '0 auto'}}></div>
                      <small>Sáb</small>
                    </div>
                    <div className="text-center">
                      <div className="bg-primary" style={{width: '20px', height: '25px', margin: '0 auto'}}></div>
                      <small>Dom</small>
                    </div>
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