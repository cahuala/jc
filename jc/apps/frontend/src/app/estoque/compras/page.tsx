'use client';

import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import CompraTable from '@/components/estoque/CompraTable';
import CompraModal from '@/components/estoque/CompraModal';

interface ItemCompra {
  produto: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

interface Compra {
  id: number;
  numero: string;
  fornecedor: string;
  data: string;
  itens: ItemCompra[];
  subtotal: number;
  desconto: number;
  total: number;
  status: string;
  responsavel: string;
  observacoes: string;
  numeroNF: string;
}

const comprasExemplo: Compra[] = [
  {
    id: 1,
    numero: 'CP-2024-001',
    fornecedor: 'Auto Peças Silva',
    data: '2024-01-25T09:30:00',
    itens: [
      { produto: 'Filtro de Óleo - Mann Filter W712/75', quantidade: 50, precoUnitario: 15.50, subtotal: 775.00 },
      { produto: 'Óleo Motor 5W30 - Castrol GTX', quantidade: 30, precoUnitario: 28.90, subtotal: 867.00 }
    ],
    subtotal: 1642.00,
    desconto: 50.00,
    total: 1592.00,
    status: 'recebida',
    responsavel: 'João Silva',
    observacoes: 'Compra mensal',
    numeroNF: 'NF-001234'
  },
  {
    id: 2,
    numero: 'CP-2024-002',
    fornecedor: 'Distribuidora Norte',
    data: '2024-01-24T14:15:00',
    itens: [
      { produto: 'Pastilha de Freio Dianteira - Bosch BB1234', quantidade: 20, precoUnitario: 45.00, subtotal: 900.00 },
      { produto: 'Vela de Ignição - NGK BKR6E', quantidade: 100, precoUnitario: 12.50, subtotal: 1250.00 }
    ],
    subtotal: 2150.00,
    desconto: 100.00,
    total: 2050.00,
    status: 'pendente',
    responsavel: 'Maria Santos',
    observacoes: 'Aguardando entrega',
    numeroNF: ''
  },
  {
    id: 3,
    numero: 'CP-2024-003',
    fornecedor: 'Suspensão Total',
    data: '2024-01-23T11:00:00',
    itens: [
      { produto: 'Amortecedor Dianteiro - Monroe G7392', quantidade: 10, precoUnitario: 120.00, subtotal: 1200.00 }
    ],
    subtotal: 1200.00,
    desconto: 0,
    total: 1200.00,
    status: 'recebida',
    responsavel: 'Carlos Oliveira',
    observacoes: '',
    numeroNF: 'NF-001236'
  }
];

export default function EstoqueComprasPage() {
  const [compras] = useState<Compra[]>(comprasExemplo);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [editingCompra, setEditingCompra] = useState<Compra | null>(null);

  const handleEdit = (compra: Compra) => {
    setEditingCompra(compra);
    setShowModal(true);
  };

  const handleSave = (compra: Compra) => {
    console.log('Salvando compra:', compra);
    setShowModal(false);
    setEditingCompra(null);
  };

  const totalCompras = compras.length;
  const comprasRecebidas = compras.filter(c => c.status === 'recebida').length;
  const valorTotal = compras.reduce((acc, c) => acc + c.total, 0);
  const comprasPendentes = compras.filter(c => c.status === 'pendente').length;

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item">Estoque</li>
            <li className="breadcrumb-item active">Compras</li>
          </ol>
          <h1 className="page-header mb-0">Compras de Produtos</h1>
        </div>
        <div className="ms-auto">
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <i className="fa fa-plus me-2"></i>
            Nova Compra
          </button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-xl-3 col-md-6">
          <Panel className="bg-primary text-white">
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">{totalCompras}</div>
                  <div>Total de Compras</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-truck fa-2x"></i>
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
                  <div className="h4 mb-0">{comprasRecebidas}</div>
                  <div>Recebidas</div>
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
                  <div className="h4 mb-0">{comprasPendentes}</div>
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
          <Panel className="bg-info text-white">
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">Kz {valorTotal.toFixed(2)}</div>
                  <div>Valor Total</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-dollar-sign fa-2x"></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      <CompraTable
        compras={compras}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onEdit={handleEdit}
      />

      {showModal && (
        <CompraModal
          compra={editingCompra}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingCompra(null);
          }}
        />
      )}
    </div>
  );
}