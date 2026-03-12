'use client';

import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import VendaTable from '@/components/estoque/VendaTable';
import VendaModal from '@/components/estoque/VendaModal';

interface ItemVenda {
  produto: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

interface Venda {
  id: number;
  numero: string;
  cliente: string;
  data: string;
  itens: ItemVenda[];
  subtotal: number;
  desconto: number;
  total: number;
  status: string;
  vendedor: string;
  observacoes: string;
}

const vendasExemplo: Venda[] = [
  {
    id: 1,
    numero: 'VD-2024-001',
    cliente: 'João Silva',
    data: '2024-01-25T14:30:00',
    itens: [
      { produto: 'Filtro de Óleo - Mann Filter W712/75', quantidade: 2, precoUnitario: 25.90, subtotal: 51.80 },
      { produto: 'Óleo Motor 5W30 - Castrol GTX', quantidade: 1, precoUnitario: 45.90, subtotal: 45.90 }
    ],
    subtotal: 97.70,
    desconto: 5.00,
    total: 92.70,
    status: 'finalizada',
    vendedor: 'Maria Santos',
    observacoes: 'Venda balcão'
  },
  {
    id: 2,
    numero: 'VD-2024-002',
    cliente: 'Carlos Oliveira',
    data: '2024-01-25T16:15:00',
    itens: [
      { produto: 'Pastilha de Freio Dianteira - Bosch BB1234', quantidade: 1, precoUnitario: 75.00, subtotal: 75.00 }
    ],
    subtotal: 75.00,
    desconto: 0,
    total: 75.00,
    status: 'finalizada',
    vendedor: 'Pedro Lima',
    observacoes: ''
  },
  {
    id: 3,
    numero: 'VD-2024-003',
    cliente: 'Ana Costa',
    data: '2024-01-24T11:45:00',
    itens: [
      { produto: 'Vela de Ignição - NGK BKR6E', quantidade: 4, precoUnitario: 22.90, subtotal: 91.60 },
      { produto: 'Correia Dentada - Gates T318', quantidade: 1, precoUnitario: 135.00, subtotal: 135.00 }
    ],
    subtotal: 226.60,
    desconto: 10.00,
    total: 216.60,
    status: 'finalizada',
    vendedor: 'João Silva',
    observacoes: 'Cliente fidelidade'
  }
];

export default function EstoqueVendasPage() {
  const [vendas] = useState<Venda[]>(vendasExemplo);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [editingVenda, setEditingVenda] = useState<Venda | null>(null);

  const handleEdit = (venda: Venda) => {
    setEditingVenda(venda);
    setShowModal(true);
  };

  const handleSave = (venda: Venda) => {
    console.log('Salvando venda:', venda);
    setShowModal(false);
    setEditingVenda(null);
  };

  const totalVendas = vendas.length;
  const vendasFinalizadas = vendas.filter(v => v.status === 'finalizada').length;
  const faturamentoTotal = vendas.reduce((acc, v) => acc + v.total, 0);
  const ticketMedio = faturamentoTotal / totalVendas;

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item">Estoque</li>
            <li className="breadcrumb-item active">Vendas</li>
          </ol>
          <h1 className="page-header mb-0">Vendas de Produtos</h1>
        </div>
        <div className="ms-auto">
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <i className="fa fa-plus me-2"></i>
            Nova Venda
          </button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-xl-3 col-md-6">
          <Panel className="bg-primary text-white">
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">{totalVendas}</div>
                  <div>Total de Vendas</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-shopping-cart fa-2x"></i>
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
                  <div className="h4 mb-0">{vendasFinalizadas}</div>
                  <div>Finalizadas</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-check fa-2x"></i>
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
                  <div className="h4 mb-0">Kz {faturamentoTotal.toFixed(2)}</div>
                  <div>Faturamento</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-dollar-sign fa-2x"></i>
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
                  <div className="h4 mb-0">Kz {ticketMedio.toFixed(2)}</div>
                  <div>Ticket Médio</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-chart-line fa-2x"></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      <VendaTable
        vendas={vendas}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onEdit={handleEdit}
      />

      {showModal && (
        <VendaModal
          venda={editingVenda}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingVenda(null);
          }}
        />
      )}
    </div>
  );
}