'use client';
import { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import React from 'react';

export default function SistemaPage() {
  const [activeTab, setActiveTab] = useState('geral');

  const statusSistema = {
    servidor: { status: 'online', uptime: '15 dias, 8h 32m', cpu: '23%', memoria: '67%', disco: '45%' },
    database: { status: 'online', conexoes: 12, tamanho: '2.3 GB', backup: '2024-01-15 03:00' },
    seguranca: { status: 'ativo', tentativas: 0, ultimoLogin: '2024-01-15 14:30' }
  };

  const tabs = [
    { id: 'geral', nome: 'Geral', icon: 'fa-server' },
    { id: 'notificacoes', nome: 'Notificações', icon: 'fa-bell' },
    { id: 'seguranca', nome: 'Segurança', icon: 'fa-shield-alt' },
    { id: 'backup', nome: 'Backup', icon: 'fa-database' }
  ];

  return (
    <div className="container-fluid p-4">
      <Panel className="mb-4">
        <PanelHeader>Status do Sistema</PanelHeader>
        <PanelBody>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="card-title mb-1">Servidor</h6>
                      <span className="badge bg-success">Online</span>
                    </div>
                    <i className="fa fa-server fa-2x opacity-75"></i>
                  </div>
                  <div className="mt-3">
                    <div className="d-flex justify-content-between small">
                      <span>Uptime:</span>
                      <span>{statusSistema.servidor.uptime}</span>
                    </div>
                    <div className="d-flex justify-content-between small">
                      <span>CPU:</span>
                      <span>{statusSistema.servidor.cpu}</span>
                    </div>
                    <div className="d-flex justify-content-between small">
                      <span>Memória:</span>
                      <span>{statusSistema.servidor.memoria}</span>
                    </div>
                    <div className="d-flex justify-content-between small">
                      <span>Disco:</span>
                      <span>{statusSistema.servidor.disco}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="card-title mb-1">Base de Dados</h6>
                      <span className="badge bg-light text-dark">Online</span>
                    </div>
                    <i className="fa fa-database fa-2x opacity-75"></i>
                  </div>
                  <div className="mt-3">
                    <div className="d-flex justify-content-between small">
                      <span>Conexões:</span>
                      <span>{statusSistema.database.conexoes}</span>
                    </div>
                    <div className="d-flex justify-content-between small">
                      <span>Tamanho:</span>
                      <span>{statusSistema.database.tamanho}</span>
                    </div>
                    <div className="d-flex justify-content-between small">
                      <span>Último Backup:</span>
                      <span>{statusSistema.database.backup}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card bg-info text-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="card-title mb-1">Segurança</h6>
                      <span className="badge bg-light text-dark">Ativo</span>
                    </div>
                    <i className="fa fa-shield-alt fa-2x opacity-75"></i>
                  </div>
                  <div className="mt-3">
                    <div className="d-flex justify-content-between small">
                      <span>Tentativas Falhadas:</span>
                      <span>{statusSistema.seguranca.tentativas}</span>
                    </div>
                    <div className="d-flex justify-content-between small">
                      <span>Último Login:</span>
                      <span>{statusSistema.seguranca.ultimoLogin}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PanelBody>
      </Panel>

      <Panel>
        <PanelHeader>Configurações do Sistema</PanelHeader>
        <PanelBody>
          <ul className="nav nav-tabs mb-4">
            {tabs.map((tab) => (
              <li key={tab.id} className="nav-item">
                <button
                  className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <i className={`fa ${tab.icon} me-2`}></i>
                  {tab.nome}
                </button>
              </li>
            ))}
          </ul>

          {activeTab === 'geral' && (
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Nome da Empresa</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="FlxMotor - Oficina Mecânica"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Versão do Sistema</label>
                  <input
                    type="text"
                    className="form-control"
                    value="2.1.4"
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Ambiente</label>
                  <select className="form-select">
                    <option value="producao">Produção</option>
                    <option value="teste">Teste</option>
                    <option value="desenvolvimento">Desenvolvimento</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Fuso Horário</label>
                  <select className="form-select">
                    <option value="Africa/Luanda">Africa/Luanda (WAT)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Idioma</label>
                  <select className="form-select">
                    <option value="pt-AO">Português (Angola)</option>
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Moeda</label>
                  <select className="form-select">
                    <option value="AOA">Kwanza Angolano (AOA)</option>
                    <option value="USD">Dólar Americano (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notificacoes' && (
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Canais de Notificação</h6>
                  </div>
                  <div className="card-body">
                    <div className="form-check form-switch mb-3">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <label className="form-check-label">
                        <i className="fa fa-envelope me-2"></i>Email
                      </label>
                    </div>
                    <div className="form-check form-switch mb-3">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">
                        <i className="fa fa-mobile-alt me-2"></i>SMS
                      </label>
                    </div>
                    <div className="form-check form-switch mb-3">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <label className="form-check-label">
                        <i className="fa fa-bell me-2"></i>Push
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Tipos de Notificação</h6>
                  </div>
                  <div className="card-body">
                    <div className="form-check form-switch mb-3">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <label className="form-check-label">Relatórios Automáticos</label>
                    </div>
                    <div className="form-check form-switch mb-3">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <label className="form-check-label">Alertas do Sistema</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seguranca' && (
            <div className="row">
              <div className="col-md-6">
                <div className="form-check form-switch mb-3">
                  <input className="form-check-input" type="checkbox" defaultChecked />
                  <label className="form-check-label fw-bold">Autenticação 2FA</label>
                  <div className="form-text">Requer segundo fator de autenticação</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Timeout de Sessão (minutos)</label>
                  <input
                    type="number"
                    className="form-control"
                    defaultValue={30}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tentativas de Login</label>
                  <input
                    type="number"
                    className="form-control"
                    defaultValue={3}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-check form-switch mb-3">
                  <input className="form-check-input" type="checkbox" defaultChecked />
                  <label className="form-check-label fw-bold">Complexidade de Senha</label>
                  <div className="form-text">Exige senhas complexas</div>
                </div>

                <div className="form-check form-switch mb-3">
                  <input className="form-check-input" type="checkbox" defaultChecked />
                  <label className="form-check-label fw-bold">Log de Auditoria</label>
                  <div className="form-text">Registra todas as ações do sistema</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="row">
              <div className="col-md-6">
                <div className="form-check form-switch mb-3">
                  <input className="form-check-input" type="checkbox" defaultChecked />
                  <label className="form-check-label fw-bold">Backup Automático</label>
                </div>

                <div className="mb-3">
                  <label className="form-label">Frequência</label>
                  <select className="form-select" defaultValue="diario">
                    <option value="diario">Diário</option>
                    <option value="semanal">Semanal</option>
                    <option value="mensal">Mensal</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Horário</label>
                  <input
                    type="time"
                    className="form-control"
                    defaultValue="03:00"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Retenção (dias)</label>
                  <input
                    type="number"
                    className="form-control"
                    defaultValue={30}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Localização</label>
                  <select className="form-select">
                    <option value="local">Servidor Local</option>
                    <option value="nuvem">Nuvem</option>
                    <option value="externo">Disco Externo</option>
                  </select>
                </div>

                <button className="btn btn-primary w-100">
                  <i className="fa fa-play me-2"></i>
                  Executar Backup Agora
                </button>
              </div>
            </div>
          )}

          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
            <button className="btn btn-secondary">Cancelar</button>
            <button className="btn btn-primary">Salvar Configurações</button>
          </div>
        </PanelBody>
      </Panel>
    </div>
  );
}