'use client';
import { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import React from 'react';

export default function PermissoesPage() {
  const [perfis] = useState([
    {
      id: 1,
      nome: 'Administrador',
      descricao: 'Acesso total ao sistema',
      usuarios: 2,
      cor: 'bg-danger',
      permissoes: {
        clientes: ['criar', 'editar', 'excluir', 'visualizar'],
        servicos: ['criar', 'editar', 'excluir', 'visualizar'],
        estoque: ['criar', 'editar', 'excluir', 'visualizar'],
        financeiro: ['criar', 'editar', 'excluir', 'visualizar'],
        funcionarios: ['criar', 'editar', 'excluir', 'visualizar'],
        relatorios: ['visualizar', 'exportar'],
        configuracoes: ['criar', 'editar', 'excluir', 'visualizar']
      }
    },
    {
      id: 2,
      nome: 'Gerente',
      descricao: 'Gestão operacional completa',
      usuarios: 3,
      cor: 'bg-primary',
      permissoes: {
        clientes: ['criar', 'editar', 'visualizar'],
        servicos: ['criar', 'editar', 'visualizar'],
        estoque: ['criar', 'editar', 'visualizar'],
        financeiro: ['visualizar'],
        funcionarios: ['visualizar'],
        relatorios: ['visualizar', 'exportar'],
        configuracoes: ['visualizar']
      }
    },
    {
      id: 3,
      nome: 'Mecânico',
      descricao: 'Acesso aos serviços técnicos',
      usuarios: 5,
      cor: 'bg-success',
      permissoes: {
        clientes: ['visualizar'],
        servicos: ['criar', 'editar', 'visualizar'],
        estoque: ['visualizar'],
        funcionarios: ['visualizar'],
        relatorios: ['visualizar']
      }
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedPerfil, setSelectedPerfil] = useState(null);

  const modulos = [
    { key: 'clientes', nome: 'Clientes' },
    { key: 'servicos', nome: 'Serviços' },
    { key: 'estoque', nome: 'Estoque' },
    { key: 'financeiro', nome: 'Financeiro' },
    { key: 'funcionarios', nome: 'Funcionários' },
    { key: 'relatorios', nome: 'Relatórios' },
    { key: 'configuracoes', nome: 'Configurações' }
  ];

  const acoes = [
    { key: 'visualizar', nome: 'Visualizar', cor: 'bg-info' },
    { key: 'criar', nome: 'Criar', cor: 'bg-success' },
    { key: 'editar', nome: 'Editar', cor: 'bg-warning' },
    { key: 'excluir', nome: 'Excluir', cor: 'bg-danger' },
    { key: 'exportar', nome: 'Exportar', cor: 'bg-secondary' }
  ];

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Perfis de Permissão</h2>
          <p className="text-muted mb-0">Gerencie os perfis de acesso do sistema</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <i className="fa fa-plus me-2"></i>
          Novo Perfil
        </button>
      </div>

      <div className="row">
        {perfis.map((perfil) => (
          <div key={perfil.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <div className={`rounded-circle ${perfil.cor} text-white d-flex align-items-center justify-content-center me-3`} style={{width: '40px', height: '40px'}}>
                      <i className="fa fa-shield-alt"></i>
                    </div>
                    <div>
                      <h5 className="card-title mb-0">{perfil.nome}</h5>
                      <small className="text-muted">{perfil.usuarios} usuários</small>
                    </div>
                  </div>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => {
                      setSelectedPerfil(perfil);
                      setShowModal(true);
                    }}
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                </div>
                
                <p className="text-muted mb-3">{perfil.descricao}</p>
                
                <div>
                  <p className="small fw-bold text-muted mb-2">Módulos com acesso:</p>
                  <div className="d-flex flex-wrap gap-1">
                    {Object.keys(perfil.permissoes).map((modulo) => {
                      const moduloInfo = modulos.find(m => m.key === modulo);
                      return (
                        <span key={modulo} className="badge bg-secondary">
                          {moduloInfo?.nome}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedPerfil?.id ? 'Editar Perfil' : 'Novo Perfil'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="mb-3">
                      <label className="form-label">Nome do Perfil</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={selectedPerfil?.nome}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Descrição</label>
                      <textarea
                        rows={3}
                        className="form-control"
                        defaultValue={selectedPerfil?.descricao}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Permissões por Módulo</label>
                      <div className="row">
                        {modulos.map((modulo) => {
                          const permissoesModulo = selectedPerfil?.permissoes?.[modulo.key] || [];
                          
                          return (
                            <div key={modulo.key} className="col-md-6 mb-3">
                              <div className="card">
                                <div className="card-header py-2">
                                  <h6 className="mb-0">{modulo.nome}</h6>
                                </div>
                                <div className="card-body py-2">
                                  <div className="d-flex flex-wrap gap-2">
                                    {acoes.map((acao) => (
                                      <div key={acao.key} className="form-check">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id={`${modulo.key}_${acao.key}`}
                                          defaultChecked={permissoesModulo.includes(acao.key)}
                                        />
                                        <label className="form-check-label" htmlFor={`${modulo.key}_${acao.key}`}>
                                          <span className={`badge ${acao.cor} text-white`}>
                                            {acao.nome}
                                          </span>
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="bg-light rounded p-3">
                      <h6 className="mb-3">Preview do Perfil</h6>
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-3">
                            <div className={`rounded-circle ${selectedPerfil?.cor || 'bg-secondary'} text-white d-flex align-items-center justify-content-center me-3`} style={{width: '48px', height: '48px'}}>
                              <i className="fa fa-shield-alt"></i>
                            </div>
                            <div>
                              <h6 className="mb-0">
                                {selectedPerfil?.nome || 'Nome do Perfil'}
                              </h6>
                              <small className="text-muted">
                                {selectedPerfil?.descricao || 'Descrição do perfil'}
                              </small>
                            </div>
                          </div>
                          
                          <div>
                            <p className="small fw-bold text-muted mb-2">Resumo de Permissões:</p>
                            <div className="small text-muted">
                              <p className="mb-1">• Módulos com acesso: {Object.keys(selectedPerfil?.permissoes || {}).length}</p>
                              <p className="mb-0">• Total de permissões: {Object.values(selectedPerfil?.permissoes || {}).flat().length}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary">
                  {selectedPerfil?.id ? 'Salvar Alterações' : 'Criar Perfil'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}