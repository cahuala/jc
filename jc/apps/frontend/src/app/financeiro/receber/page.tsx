'use client';

import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import ContasReceberTable from '@/components/financeiro/ContasReceberTable';
import ContaReceberModal from '@/components/financeiro/ContaReceberModal';
import ContaReceberDetailsModal from '@/components/financeiro/ContaReceberDetailsModal';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Toast from '@/components/ui/Toast';
import { useNotifications } from '@/hooks/useNotifications';

interface ContaReceber {
  id: number;
  cliente: string;
  nifCliente: string;
  documento: string;
  descricao: string;
  valor: number;
  dataVencimento: string;
  status: 'pendente' | 'vencida' | 'paga';
  observacoes: string;
}

const contasExemplo: ContaReceber[] = [
  {
    id: 1,
    cliente: 'João Silva',
    nifCliente: '123456789',
    documento: 'FT-2024/001',
    descricao: 'Serviço de manutenção - Toyota Corolla',
    valor: 85000,
    dataVencimento: '2024-01-15',
    status: 'vencida',
    observacoes: 'Cliente solicitou prazo adicional'
  },
  {
    id: 2,
    cliente: 'Maria Santos',
    nifCliente: '987654321',
    documento: 'FT-2024/002',
    descricao: 'Troca de óleo e filtros - Honda Civic',
    valor: 45000,
    dataVencimento: '2024-01-20',
    status: 'pendente',
    observacoes: ''
  },
  {
    id: 3,
    cliente: 'Carlos Mendes',
    nifCliente: '456789123',
    documento: 'FT-2024/003',
    descricao: 'Reparo de freios - Mercedes C200',
    valor: 120000,
    dataVencimento: '2024-01-25',
    status: 'pendente',
    observacoes: ''
  },
  {
    id: 4,
    cliente: 'Ana Costa',
    nifCliente: '789123456',
    documento: 'FT-2024/004',
    descricao: 'Diagnóstico eletrônico - BMW X3',
    valor: 65000,
    dataVencimento: '2024-01-10',
    status: 'paga',
    observacoes: 'Pago via Multicaixa'
  }
];

export default function FinanceiroContasReceberPage() {
  const [contas, setContas] = useState<ContaReceber[]>(contasExemplo);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editingConta, setEditingConta] = useState<ContaReceber | null>(null);
  const [viewingConta, setViewingConta] = useState<ContaReceber | null>(null);
  const { showToast, showConfirm, confirmation, toast } = useNotifications();

  const handleEdit = (conta: ContaReceber) => {
    setEditingConta(conta);
    setShowModal(true);
  };

  const handleView = (conta: ContaReceber) => {
    setViewingConta(conta);
    setShowDetailsModal(true);
  };

  const handleReceber = (conta: ContaReceber) => {
    showConfirm({
      title: 'Confirmar Recebimento',
      message: `Deseja confirmar o recebimento da conta "${conta.documento}" no valor de Kz ${conta.valor.toFixed(2)}?`,
      type: 'success',
      onConfirm: () => {
        const updatedContas = contas.map(c => 
          c.id === conta.id ? { ...c, status: 'paga' as const } : c
        );
        setContas(updatedContas);
        showToast('Conta recebida com sucesso!', 'success');
      }
    });
  };

  const handleSave = (conta: ContaReceber) => {
    const updatedContas = contas.map(c => 
      c.id === conta.id ? conta : c
    );
    setContas(updatedContas);
    showToast('Conta atualizada com sucesso!', 'success');
    setShowModal(false);
    setEditingConta(null);
  };

  const totalContas = contas.length;
  const contasPagas = contas.filter(c => c.status === 'paga').length;
  const totalReceber = contas.filter(c => c.status !== 'paga').reduce((acc, c) => acc + c.valor, 0);
  const contasVencidas = contas.filter(c => c.status === 'vencida').length;

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item">Financeiro</li>
            <li className="breadcrumb-item active">Contas a Receber</li>
          </ol>
          <h1 className="page-header mb-0">Contas a Receber</h1>
        </div>
        <div className="ms-auto">
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <i className="fa fa-plus me-2"></i>
            Nova Conta
          </button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-xl-3 col-md-6">
          <Panel className="bg-primary text-white">
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">{totalContas}</div>
                  <div>Total de Contas</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-file-invoice fa-2x"></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
        <div className="col-xl-3 col-md-6">
          <Panel className="bg-success text-white">
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">{contasPagas}</div>
                  <div>Pagas</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-check-circle fa-2x"></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
        <div className="col-xl-3 col-md-6">
          <Panel className="bg-danger text-white">
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">{contasVencidas}</div>
                  <div>Vencidas</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-exclamation-triangle fa-2x"></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
        <div className="col-xl-3 col-md-6">
          <Panel className="bg-info text-white">
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">Kz {totalReceber.toFixed(2)}</div>
                  <div>Total a Receber</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-money-bill-wave fa-2x"></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      <ContasReceberTable
        contas={contas}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onEdit={handleEdit}
        onReceber={handleReceber}
        onView={handleView}
      />

      {showModal && (
        <ContaReceberModal
          conta={editingConta}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingConta(null);
          }}
        />
      )}

      {showDetailsModal && viewingConta && (
        <ContaReceberDetailsModal
          conta={viewingConta}
          onClose={() => {
            setShowDetailsModal(false);
            setViewingConta(null);
          }}
        />
      )}

      <ConfirmModal
        isOpen={confirmation.isOpen}
        title={confirmation.config?.title || ''}
        message={confirmation.config?.message || ''}
        type={confirmation.config?.type || 'info'}
        confirmText={confirmation.config?.confirmText}
        cancelText={confirmation.config?.cancelText}
        onConfirm={confirmation.handleConfirm}
        onCancel={confirmation.handleCancel}
      />

      <Toast
        isOpen={toast.isOpen}
        message={toast.config?.message || ''}
        type={toast.config?.type || 'info'}
        onClose={toast.hideToast}
      />
    </div>
  );
}