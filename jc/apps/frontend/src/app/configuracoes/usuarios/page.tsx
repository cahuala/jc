'use client';

import { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: 'admin' | 'gerente' | 'funcionario';
  status: 'ativo' | 'inativo';
  ultimoAcesso: string;
}

const usuarios: Usuario[] = [
  {
    id: '1',
    nome: 'Administrador',
    email: 'admin@flxmotor.ao',
    perfil: 'admin',
    status: 'ativo',
    ultimoAcesso: '2024-02-20 14:30'
  },
  {
    id: '2',
    nome: 'Carlos Mendes',
    email: 'carlos@flxmotor.ao',
    perfil: 'gerente',
    status: 'ativo',
    ultimoAcesso: '2024-02-20 12:15'
  },
  {
    id: '3',
    nome: 'Maria Santos',
    email: 'maria@flxmotor.ao',
    perfil: 'funcionario',
    status: 'ativo',
    ultimoAcesso: '2024-02-19 16:45'
  }
];

export default function UsuariosPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'danger'>('success');

  const handleResetPassword = (usuario: Usuario) => {
    setToastMessage(`Senha do usuário "${usuario.nome}" foi resetada e enviada por email.`);
    setToastType('success');
    setShowToast(true);
  };

  const handleToggleStatus = (usuario: Usuario) => {
    const newStatus = usuario.status === 'ativo' ? 'inativo' : 'ativo';
    const action = newStatus === 'ativo' ? 'ativado' : 'desativado';
    setToastMessage(`Usuário "${usuario.nome}" foi ${action} com sucesso.`);
    setToastType(newStatus === 'ativo' ? 'success' : 'danger');
    setShowToast(true);
  };

  const getPerfilBadge = (perfil: string) => {
    switch (perfil) {
      case 'admin':
        return <span className="badge bg-danger">Administrador</span>;
      case 'gerente':
        return <span className="badge bg-warning">Gerente</span>;
      case 'funcionario':
        return <span className="badge bg-info">Funcionário</span>;
      default:
        return <span className="badge bg-secondary">{perfil}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'ativo' ? 
      <span className="badge bg-success">Ativo</span> : 
      <span className="badge bg-secondary">Inativo</span>;
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Gestão de Usuários</h2>
          <p className="text-muted mb-0">Controle de acesso ao sistema</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <i className="fa fa-plus me-2"></i>
          Novo Usuário
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Total Usuários</h6>
                  <h3 className="mb-0">{usuarios.length}</h3>
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
                  <h6 className="card-title">Usuários Ativos</h6>
                  <h3 className="mb-0">{usuarios.filter(u => u.status === 'ativo').length}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-user-check fa-2x opacity-75"></i>
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
                  <h6 className="card-title">Administradores</h6>
                  <h3 className="mb-0">{usuarios.filter(u => u.perfil === 'admin').length}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-user-shield fa-2x opacity-75"></i>
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
                  <h6 className="card-title">Online Agora</h6>
                  <h3 className="mb-0">2</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-circle fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Panel>
        <PanelHeader>Lista de Usuários</PanelHeader>
        <PanelBody className="p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Usuário</th>
                  <th>Email</th>
                  <th>Perfil</th>
                  <th>Status</th>
                  <th>Último Acesso</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                          <i className="fa fa-user"></i>
                        </div>
                        <strong>{usuario.nome}</strong>
                      </div>
                    </td>
                    <td>{usuario.email}</td>
                    <td>{getPerfilBadge(usuario.perfil)}</td>
                    <td>{getStatusBadge(usuario.status)}</td>
                    <td>
                      <span className="text-muted">{usuario.ultimoAcesso}</span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => {
                            setSelectedUser(usuario);
                            setShowModal(true);
                          }}
                          title="Editar"
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-outline-warning"
                          title="Resetar Senha"
                          onClick={() => handleResetPassword(usuario)}
                        >
                          <i className="fa fa-key"></i>
                        </button>
                        <button
                          className={`btn btn-outline-${usuario.status === 'ativo' ? 'danger' : 'success'}`}
                          title={usuario.status === 'ativo' ? 'Desativar' : 'Ativar'}
                          onClick={() => handleToggleStatus(usuario)}
                        >
                          <i className={`fa fa-${usuario.status === 'ativo' ? 'ban' : 'check'}`}></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PanelBody>
      </Panel>

      {showModal && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="fa fa-user me-2"></i>
                  {selectedUser ? 'Editar Usuário' : 'Novo Usuário'}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => {
                  setShowModal(false);
                  setSelectedUser(null);
                }}></button>
              </div>
              <div className="modal-body p-0">
                <div className="row g-0">
                  <div className="col-md-8 p-4">
                    <form>
                      <div className="mb-4">
                        <h6 className="text-primary border-bottom pb-2 mb-3">
                          <i className="fa fa-user-circle me-2"></i>
                          Informações Pessoais
                        </h6>
                        <div className="row g-3">
                          <div className="col-md-8">
                            <label className="form-label fw-bold">Nome Completo *</label>
                            <div className="input-group">
                              <span className="input-group-text"><i className="fa fa-user"></i></span>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={selectedUser?.nome || ''}
                                placeholder="Digite o nome completo"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label className="form-label fw-bold">Status</label>
                            <div className="input-group">
                              <span className="input-group-text"><i className="fa fa-toggle-on"></i></span>
                              <select className="form-select" defaultValue={selectedUser?.status || 'ativo'}>
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <label className="form-label fw-bold">Email *</label>
                            <div className="input-group">
                              <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                              <input
                                type="email"
                                className="form-control"
                                defaultValue={selectedUser?.email || ''}
                                placeholder="usuario@flxmotor.ao"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label className="form-label fw-bold">Perfil de Acesso *</label>
                            <div className="input-group">
                              <span className="input-group-text"><i className="fa fa-shield-alt"></i></span>
                              <select className="form-select" defaultValue={selectedUser?.perfil || 'funcionario'}>
                                <option value="funcionario">Funcionário</option>
                                <option value="gerente">Gerente</option>
                                <option value="admin">Administrador</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      {!selectedUser && (
                        <div className="mb-4">
                          <h6 className="text-primary border-bottom pb-2 mb-3">
                            <i className="fa fa-key me-2"></i>
                            Credenciais de Acesso
                          </h6>
                          <div className="row g-3">
                            <div className="col-md-6">
                              <label className="form-label fw-bold">Senha Temporária *</label>
                              <div className="input-group">
                                <span className="input-group-text"><i className="fa fa-lock"></i></span>
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Mínimo 8 caracteres"
                                  required
                                />
                                <button className="btn btn-outline-secondary" type="button">
                                  <i className="fa fa-eye"></i>
                                </button>
                              </div>
                              <div className="form-text">
                                <i className="fa fa-info-circle me-1"></i>
                                Deve conter pelo menos 8 caracteres
                              </div>
                            </div>
                            <div className="col-md-6">
                              <label className="form-label fw-bold">Confirmar Senha *</label>
                              <div className="input-group">
                                <span className="input-group-text"><i className="fa fa-lock"></i></span>
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Repita a senha"
                                  required
                                />
                                <button className="btn btn-outline-secondary" type="button">
                                  <i className="fa fa-eye"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mb-4">
                        <h6 className="text-primary border-bottom pb-2 mb-3">
                          <i className="fa fa-shield-alt me-2"></i>
                          Permissões do Sistema
                        </h6>
                        <div className="card bg-light">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-4">
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="perfil" id="funcionario" defaultChecked />
                                  <label className="form-check-label fw-bold" htmlFor="funcionario">
                                    <i className="fa fa-user text-info me-2"></i>
                                    Funcionário
                                  </label>
                                </div>
                                <ul className="list-unstyled small mt-2 ms-4">
                                  <li><i className="fa fa-check text-success me-1"></i> Visualizar dados</li>
                                  <li><i className="fa fa-check text-success me-1"></i> Registrar serviços</li>
                                  <li><i className="fa fa-check text-success me-1"></i> Atualizar status</li>
                                </ul>
                              </div>
                              <div className="col-md-4">
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="perfil" id="gerente" />
                                  <label className="form-check-label fw-bold" htmlFor="gerente">
                                    <i className="fa fa-user-tie text-warning me-2"></i>
                                    Gerente
                                  </label>
                                </div>
                                <ul className="list-unstyled small mt-2 ms-4">
                                  <li><i className="fa fa-check text-success me-1"></i> Todas do funcionário</li>
                                  <li><i className="fa fa-check text-success me-1"></i> Aprovar orçamentos</li>
                                  <li><i className="fa fa-check text-success me-1"></i> Relatórios gerenciais</li>
                                </ul>
                              </div>
                              <div className="col-md-4">
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="perfil" id="admin" />
                                  <label className="form-check-label fw-bold" htmlFor="admin">
                                    <i className="fa fa-user-shield text-danger me-2"></i>
                                    Administrador
                                  </label>
                                </div>
                                <ul className="list-unstyled small mt-2 ms-4">
                                  <li><i className="fa fa-check text-success me-1"></i> Acesso total</li>
                                  <li><i className="fa fa-check text-success me-1"></i> Configurações</li>
                                  <li><i className="fa fa-check text-success me-1"></i> Gestão de usuários</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  
                  <div className="col-md-4 bg-light border-start">
                    <div className="p-4 h-100">
                      <h6 className="text-primary mb-3">
                        <i className="fa fa-info-circle me-2"></i>
                        Preview do Usuário
                      </h6>
                      
                      <div className="text-center mb-4">
                        <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                          <i className="fa fa-user fa-2x"></i>
                        </div>
                        <h5 className="text-primary mb-1">{selectedUser?.nome || 'Novo Usuário'}</h5>
                        <p className="text-muted small mb-0">{selectedUser?.email || 'email@flxmotor.ao'}</p>
                      </div>

                      <div className="card border-0 shadow-sm mb-3">
                        <div className="card-body p-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-bold">Perfil:</span>
                            {selectedUser ? getPerfilBadge(selectedUser.perfil) : <span className="badge bg-info">Funcionário</span>}
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-bold">Status:</span>
                            {selectedUser ? getStatusBadge(selectedUser.status) : <span className="badge bg-success">Ativo</span>}
                          </div>
                          {selectedUser && (
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="fw-bold">Último Acesso:</span>
                              <span className="text-muted small">{selectedUser.ultimoAcesso}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {!selectedUser && (
                        <div className="alert alert-info py-2">
                          <i className="fa fa-info-circle me-2"></i>
                          <small>
                            <strong>Importante:</strong><br/>
                            A senha será enviada por email após a criação do usuário.
                          </small>
                        </div>
                      )}

                      <div className="card border-0 bg-white">
                        <div className="card-header bg-primary text-white py-2">
                          <h6 className="mb-0">
                            <i className="fa fa-chart-bar me-2"></i>
                            Estatísticas
                          </h6>
                        </div>
                        <div className="card-body p-3">
                          <div className="row text-center">
                            <div className="col-6">
                              <div className="border-end">
                                <h4 className="text-primary mb-0">{usuarios.length}</h4>
                                <small className="text-muted">Total</small>
                              </div>
                            </div>
                            <div className="col-6">
                              <h4 className="text-success mb-0">{usuarios.filter(u => u.status === 'ativo').length}</h4>
                              <small className="text-muted">Ativos</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer bg-light">
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setShowModal(false);
                  setSelectedUser(null);
                }}>
                  <i className="fa fa-times me-2"></i>
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary">
                  <i className="fa fa-save me-2"></i>
                  {selectedUser ? 'Atualizar' : 'Criar'} Usuário
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="position-fixed top-0 end-0 p-3" style={{zIndex: 1050}}>
          <div className={`alert alert-${toastType === 'success' ? 'success' : 'danger'} alert-dismissible fade show`}>
            <i className={`fa fa-${toastType === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2`}></i>
            {toastMessage}
            <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
          </div>
        </div>
      )}
    </div>
  );
}