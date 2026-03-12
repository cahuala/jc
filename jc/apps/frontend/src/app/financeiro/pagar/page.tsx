'use client';

import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import ContasPagarTable from '@/components/financeiro/ContasPagarTable';
import ContaPagarModal from '@/components/financeiro/ContaPagarModal';
import ContaPagarDetailsModal from '@/components/financeiro/ContaPagarDetailsModal';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Toast from '@/components/ui/Toast';
import { useNotifications } from '@/hooks/useNotifications';

interface ContaPagar {
  id: number;
  fornecedor: string;
  nifFornecedor: string;
  documento: string;
  descricao: string;
  valor: number;
  dataVencimento: string;
  status: 'pendente' | 'vencida' | 'paga';
  observacoes: string;
}

const contasExemplo: ContaPagar[] = [
  {
    id: 1,
    fornecedor: 'Auto Peças Luanda Lda',
    nifFornecedor: '555123456',
    documento: 'FC-2024/089',
    descricao: 'Compra de filtros e óleos',
    valor: 125000,
    dataVencimento: '2024-01-18',
    status: 'vencida',
    observacoes: 'Fornecedor principal de peças'
  },
  {
    id: 2,
    fornecedor: 'Ferramentas & Equipamentos SA',
    nifFornecedor: '666789123',
    documento: 'FT-2024/156',
    descricao: 'Equipamento de diagnóstico',
    valor: 85000,
    dataVencimento: '2024-01-22',
    status: 'pendente',
    observacoes: ''
  },
  {
    id: 3,
    fornecedor: 'Distribuidora Benguela',
    nifFornecedor: '777456789',
    documento: 'FC-2024/201',
    descricao: 'Pastilhas de freio variadas',
    valor: 95000,
    dataVencimento: '2024-01-28',
    status: 'pendente',
    observacoes: ''
  },
  {
    id: 4,
    fornecedor: 'Lubricantes Angola',
    nifFornecedor: '888321654',
    documento: 'FT-2024/078',
    descricao: 'Óleos lubrificantes premium',
    valor: 75000,
    dataVencimento: '2024-01-12',
    status: 'paga',
    observacoes: 'Pago via transferência bancária'
  }
];

export default function FinanceiroContasPagarPage() {
  const [contas, setContas] = useState<ContaPagar[]>(contasExemplo);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editingConta, setEditingConta] = useState<ContaPagar | null>(null);
  const [viewingConta, setViewingConta] = useState<ContaPagar | null>(null);
  const { showToast, showConfirm, confirmation, toast } = useNotifications();

  const handleEdit = (conta: ContaPagar) => {
    setEditingConta(conta);
    setShowModal(true);
  };

  const handleView = (conta: ContaPagar) => {
    setViewingConta(conta);
    setShowDetailsModal(true);
  };

  const handlePagar = (conta: ContaPagar) => {
    showConfirm({
      title: 'Confirmar Pagamento',
      message: `Deseja confirmar o pagamento da conta "${conta.documento}" no valor de Kz ${conta.valor.toFixed(2)}?`,
      type: 'warning',
      onConfirm: () => {
        const updatedContas = contas.map(c => 
          c.id === conta.id ? { ...c, status: 'paga' as const } : c
        );
        setContas(updatedContas);
        showToast('Conta paga com sucesso!', 'success');
      }
    });
  };

  const handleSave = (conta: ContaPagar) => {
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
  const totalPagar = contas.filter(c => c.status !== 'paga').reduce((acc, c) => acc + c.valor, 0);
  const contasVencidas = contas.filter(c => c.status === 'vencida').length;

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item">Financeiro</li>
            <li className="breadcrumb-item active">Contas a Pagar</li>
          </ol>
          <h1 className="page-header mb-0">Contas a Pagar</h1>
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
          <Panel className="bg-warning text-white">
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">Kz {totalPagar.toFixed(2)}</div>
                  <div>Total a Pagar</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-credit-card fa-2x"></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      <ContasPagarTable
        contas={contas}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onEdit={handleEdit}
        onPagar={handlePagar}
        onView={handleView}
      />

      {showModal && (
        <ContaPagarModal
          conta={editingConta}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingConta(null);
          }}
        />
      )}

      {showDetailsModal && viewingConta && (
        <ContaPagarDetailsModal
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