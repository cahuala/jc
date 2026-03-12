'use client';

import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import InventarioTable from '@/components/estoque/InventarioTable';
import InventarioModal from '@/components/estoque/InventarioModal';
import NovaContagemModal from '@/components/estoque/NovaContagemModal';
import InventarioDetailsModal from '@/components/estoque/InventarioDetailsModal';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Toast from '@/components/ui/Toast';
import { useNotifications } from '@/hooks/useNotifications';

interface ItemInventario {
  id: number;
  produto: string;
  categoria: string;
  estoqueAtual: number;
  estoqueContado: number;
  diferenca: number;
  valorUnitario: number;
  valorDiferenca: number;
  status: string;
  usuario: string;
  dataContagem: string;
}

const inventarioExemplo: ItemInventario[] = [
  {
    id: 1,
    produto: 'Filtro de Óleo - Mann Filter W712/75',
    categoria: 'Filtros',
    estoqueAtual: 45,
    estoqueContado: 43,
    diferenca: -2,
    valorUnitario: 15.50,
    valorDiferenca: -31.00,
    status: 'pendente',
    usuario: 'João Silva',
    dataContagem: '2024-01-25T09:30:00'
  },
  {
    id: 2,
    produto: 'Pastilha de Freio Dianteira - Bosch BB1234',
    categoria: 'Freios',
    estoqueAtual: 8,
    estoqueContado: 8,
    diferenca: 0,
    valorUnitario: 45.00,
    valorDiferenca: 0,
    status: 'conferido',
    usuario: 'Maria Santos',
    dataContagem: '2024-01-25T10:15:00'
  },
  {
    id: 3,
    produto: 'Óleo Motor 5W30 - Castrol GTX',
    categoria: 'Lubrificantes',
    estoqueAtual: 25,
    estoqueContado: 27,
    diferenca: 2,
    valorUnitario: 28.90,
    valorDiferenca: 57.80,
    status: 'pendente',
    usuario: 'Carlos Oliveira',
    dataContagem: '2024-01-25T11:00:00'
  },
  {
    id: 4,
    produto: 'Vela de Ignição - NGK BKR6E',
    categoria: 'Ignição',
    estoqueAtual: 60,
    estoqueContado: 58,
    diferenca: -2,
    valorUnitario: 12.50,
    valorDiferenca: -25.00,
    status: 'ajustado',
    usuario: 'Ana Costa',
    dataContagem: '2024-01-24T14:30:00'
  },
  {
    id: 5,
    produto: 'Correia Dentada - Gates T318',
    categoria: 'Correias',
    estoqueAtual: 3,
    estoqueContado: 3,
    diferenca: 0,
    valorUnitario: 85.00,
    valorDiferenca: 0,
    status: 'conferido',
    usuario: 'Pedro Lima',
    dataContagem: '2024-01-24T15:45:00'
  }
];

export default function EstoqueInventarioPage() {
  const [inventario, setInventario] = useState<ItemInventario[]>(inventarioExemplo);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ItemInventario | null>(null);
  const [viewingItem, setViewingItem] = useState<ItemInventario | null>(null);
  const { showToast, showConfirm, confirmation, toast } = useNotifications();

  const handleEdit = (item: ItemInventario) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleNewCount = () => {
    setShowNewModal(true);
  };

  const handleView = (item: ItemInventario) => {
    setViewingItem(item);
    setShowDetailsModal(true);
  };

  const handleConfirm = (item: ItemInventario) => {
    showConfirm({
      title: 'Confirmar Inventário',
      message: `Deseja confirmar a contagem do produto "${item.produto}"?`,
      type: 'info',
      onConfirm: () => {
        const updatedInventario = inventario.map(i => 
          i.id === item.id ? { ...i, status: 'conferido' } : i
        );
        setInventario(updatedInventario);
        showToast('Inventário confirmado com sucesso!', 'success');
      }
    });
  };

  const handleSave = (item: ItemInventario) => {
    const updatedInventario = inventario.map(i => 
      i.id === item.id ? item : i
    );
    setInventario(updatedInventario);
    showToast('Item atualizado com sucesso!', 'success');
    setShowModal(false);
    setEditingItem(null);
  };

  const handleSaveNew = (item: ItemInventario) => {
    const newItem: ItemInventario = {
      ...item,
      id: Math.max(...inventario.map(i => i.id)) + 1
    };
    setInventario([...inventario, newItem]);
    showToast('Nova contagem criada com sucesso!', 'success');
    setShowNewModal(false);
  };

  const totalItens = inventario.length;
  const itensConferidos = inventario.filter(i => i.status === 'conferido').length;
  const itensPendentes = inventario.filter(i => i.status === 'pendente').length;
  const valorDivergencia = inventario.reduce((acc, i) => acc + i.valorDiferenca, 0);

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item">Estoque</li>
            <li className="breadcrumb-item active">Inventário</li>
          </ol>
          <h1 className="page-header mb-0">Inventário de Estoque</h1>
        </div>
        <div className="ms-auto">
          <div className="btn-group">
            <button className="btn btn-success">
              <i className="fa fa-download me-2"></i>
              Exportar
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleNewCount}
            >
              <i className="fa fa-plus me-2"></i>
              Nova Contagem
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-xl-3 col-md-6">
          <Panel className="bg-primary text-white">
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">{totalItens}</div>
                  <div>Total de Itens</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-clipboard-list fa-2x"></i>
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
                  <div className="h4 mb-0">{itensConferidos}</div>
                  <div>Conferidos</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-check fa-2x"></i>
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
                  <div className="h4 mb-0">{itensPendentes}</div>
                  <div>Pendentes</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-clock fa-2x"></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
        <div className="col-xl-3 col-md-6">
          <Panel className={`${valorDivergencia >= 0 ? 'bg-info' : 'bg-danger'} text-white`}>
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">Kz {valorDivergencia.toFixed(2)}</div>
                  <div>Divergência</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-balance-scale fa-2x"></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      <InventarioTable
        inventario={inventario}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onEdit={handleEdit}
        onConfirm={handleConfirm}
        onView={handleView}
      />

      {showModal && editingItem && (
        <InventarioModal
          item={editingItem}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
        />
      )}

      {showNewModal && (
        <NovaContagemModal
          onSave={handleSaveNew}
          onClose={() => setShowNewModal(false)}
        />
      )}

      {showDetailsModal && viewingItem && (
        <InventarioDetailsModal
          item={viewingItem}
          onClose={() => {
            setShowDetailsModal(false);
            setViewingItem(null);
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