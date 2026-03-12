/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Toast from '@/components/ui/Toast';
import React from 'react';

export default function BackupPage() {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [backupToRestore, setBackupToRestore] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');

  const backups = [
    {
      id: '1',
      nome: 'backup_completo_20240220.zip',
      data: '2024-02-20 02:00:00',
      tamanho: '45.2 MB',
      tipo: 'Automático',
      status: 'Concluído'
    },
    {
      id: '2',
      nome: 'backup_completo_20240219.zip',
      data: '2024-02-19 02:00:00',
      tamanho: '44.8 MB',
      tipo: 'Automático',
      status: 'Concluído'
    },
    {
      id: '3',
      nome: 'backup_manual_20240218.zip',
      data: '2024-02-18 15:30:00',
      tamanho: '44.5 MB',
      tipo: 'Manual',
      status: 'Concluído'
    }
  ];

  const handleBackup = async () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setToastMessage('Backup criado com sucesso!');
      setToastType('success');
      setShowToast(true);
      setIsBackingUp(false);
    }, 3000);
  };

  const handleRestore = async (backupId: string) => {
    setBackupToRestore(backupId);
    setShowConfirmModal(true);
  };

  const confirmRestore = () => {
    setIsRestoring(true);
    setShowConfirmModal(false);
    setTimeout(() => {
      setToastMessage('Sistema restaurado com sucesso!');
      setToastType('success');
      setShowToast(true);
      setIsRestoring(false);
      setBackupToRestore(null);
    }, 5000);
  };

  const cancelRestore = () => {
    setShowConfirmModal(false);
    setBackupToRestore(null);
  };

  return (
    <>
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h4 mb-1">Backup e Restauração</h2>
            <p className="text-muted mb-0">Gestão de cópias de segurança do sistema</p>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card bg-primary text-white">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="card-title">Total Backups</h6>
                    <h3 className="mb-0">{backups.length}</h3>
                  </div>
                  <div className="align-self-center">
                    <i className="fa fa-database fa-2x opacity-75"></i>
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
                    <h6 className="card-title">Último Backup</h6>
                    <h3 className="mb-0">Hoje</h3>
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
                    <h6 className="card-title">Espaço Usado</h6>
                    <h3 className="mb-0">134 MB</h3>
                  </div>
                  <div className="align-self-center">
                    <i className="fa fa-hdd fa-2x opacity-75"></i>
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
                    <h6 className="card-title">Próximo Backup</h6>
                    <h3 className="mb-0">02:00</h3>
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
          <div className="col-md-8">
            <Panel>
              <PanelHeader>Histórico de Backups</PanelHeader>
              <PanelBody className="p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Nome do Arquivo</th>
                        <th>Data/Hora</th>
                        <th>Tamanho</th>
                        <th>Tipo</th>
                        <th>Status</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {backups.map((backup) => (
                        <tr key={backup.id}>
                          <td>
                            <div>
                              <i className="fa fa-file-archive text-primary me-2"></i>
                              <strong>{backup.nome}</strong>
                            </div>
                          </td>
                          <td>{new Date(backup.data).toLocaleString('pt-AO')}</td>
                          <td>{backup.tamanho}</td>
                          <td>
                            <span className={`badge ${backup.tipo === 'Automático' ? 'bg-info' : 'bg-warning'}`}>
                              {backup.tipo}
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-success">{backup.status}</span>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-outline-primary"
                                title="Download"
                                onClick={() => {
                                  const link = document.createElement('a');
                                  link.href = '#';
                                  link.download = backup.nome;
                                  link.click();
                                }}
                              >
                                <i className="fa fa-download"></i>
                              </button>
                              <button
                                className="btn btn-outline-success"
                                title="Restaurar"
                                onClick={() => handleRestore(backup.id)}
                                disabled={isRestoring}
                              >
                                <i className="fa fa-undo"></i>
                              </button>
                              <button
                                className="btn btn-outline-danger"
                                title="Excluir"
                              >
                                <i className="fa fa-trash"></i>
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
          </div>

          <div className="col-md-4">
            <Panel className="mb-4">
              <PanelHeader>Criar Backup Manual</PanelHeader>
              <PanelBody>
                <div className="text-center">
                  <i className="fa fa-database fa-3x text-primary mb-3"></i>
                  <p className="text-muted mb-3">
                    Crie uma cópia de segurança completa do sistema agora.
                  </p>
                  <button 
                    className="btn btn-primary w-100"
                    onClick={handleBackup}
                    disabled={isBackingUp}
                  >
                    {isBackingUp ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Criando Backup...
                      </>
                    ) : (
                      <>
                        <i className="fa fa-plus me-2"></i>
                        Criar Backup Agora
                      </>
                    )}
                  </button>
                </div>
              </PanelBody>
            </Panel>

            <Panel>
              <PanelHeader>Configurações de Backup</PanelHeader>
              <PanelBody>
                <div className="mb-3">
                  <label className="form-label fw-bold">Backup Automático</label>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" defaultChecked />
                    <label className="form-check-label">Ativar backup automático</label>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Horário</label>
                  <input type="time" className="form-control" defaultValue="02:00" />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Frequência</label>
                  <select className="form-select" defaultValue="diario">
                    <option value="diario">Diário</option>
                    <option value="semanal">Semanal</option>
                    <option value="mensal">Mensal</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Manter Backups</label>
                  <select className="form-select" defaultValue="30">
                    <option value="7">7 dias</option>
                    <option value="30">30 dias</option>
                    <option value="90">90 dias</option>
                    <option value="365">1 ano</option>
                  </select>
                </div>
                <button className="btn btn-success w-100">
                  <i className="fa fa-save me-2"></i>
                  Salvar Configurações
                </button>
              </PanelBody>
            </Panel>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        title="Restaurar Backup"
        message="Tem certeza que deseja restaurar este backup?\n\nTodos os dados atuais serão substituídos pelos dados do backup. Esta ação não pode ser desfeita."
        confirmText="Sim, Restaurar"
        cancelText="Cancelar"
        type="warning"
        onConfirm={confirmRestore}
        onCancel={cancelRestore}
      />

      <Toast
        isOpen={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </>
  )
}