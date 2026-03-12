'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import FaturaTable from '@/components/financeiro/FaturaTable';
import FaturaModal from '@/components/financeiro/FaturaModal';
import ExportButtons from '@/components/ui/ExportButtons';

interface ItemFatura {
  descricao: string;
  quantidade: number;
  precoUnitario: number;
  iva: number;
  subtotal: number;
}

interface Fatura {
  id: number;
  numero: string;
  cliente: string;
  nifCliente: string;
  data: string;
  dataVencimento: string;
  itens: ItemFatura[];
  subtotal: number;
  totalIva: number;
  total: number;
  status: string;
  observacoes: string;
  formaPagamento: string;
}

const faturasExemplo: Fatura[] = [
  {
    id: 1,
    numero: 'FT-2024/001',
    cliente: 'João Silva',
    nifCliente: '123456789',
    data: '2024-01-25T14:30:00',
    dataVencimento: '2024-02-25',
    itens: [
      { descricao: 'Troca de óleo e filtro', quantidade: 1, precoUnitario: 8500.00, iva: 1275.00, subtotal: 9775.00 },
      { descricao: 'Filtro de óleo Mann Filter', quantidade: 1, precoUnitario: 2590.00, iva: 388.50, subtotal: 2978.50 }
    ],
    subtotal: 11090.00,
    totalIva: 1663.50,
    total: 12753.50,
    status: 'paga',
    observacoes: 'Serviço completo realizado',
    formaPagamento: 'Multicaixa'
  },
  {
    id: 2,
    numero: 'FT-2024/002',
    cliente: 'Maria Santos',
    nifCliente: '987654321',
    data: '2024-01-24T16:15:00',
    dataVencimento: '2024-02-24',
    itens: [
      { descricao: 'Substituição pastilhas de freio', quantidade: 1, precoUnitario: 12000.00, iva: 1800.00, subtotal: 13800.00 }
    ],
    subtotal: 12000.00,
    totalIva: 1800.00,
    total: 13800.00,
    status: 'pendente',
    observacoes: '',
    formaPagamento: 'Dinheiro'
  },
  {
    id: 3,
    numero: 'FT-2024/003',
    cliente: 'Carlos Oliveira',
    nifCliente: '111222333',
    data: '2024-01-23T11:45:00',
    dataVencimento: '2024-02-23',
    itens: [
      { descricao: 'Diagnóstico completo do motor', quantidade: 1, precoUnitario: 5000.00, iva: 750.00, subtotal: 5750.00 },
      { descricao: 'Substituição velas de ignição', quantidade: 4, precoUnitario: 2290.00, iva: 1374.00, subtotal: 10534.00 }
    ],
    subtotal: 14160.00,
    totalIva: 2124.00,
    total: 16284.00,
    status: 'vencida',
    observacoes: 'Cliente solicitou prazo adicional',
    formaPagamento: 'Transferência'
  }
];

export default function FinanceiroFaturamentoPage() {
  const [faturas] = useState<Fatura[]>(faturasExemplo);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [editingFatura, setEditingFatura] = useState<Fatura | null>(null);

  const handleEdit = (fatura: Fatura) => {
    setEditingFatura(fatura);
    setShowModal(true);
  };

  const handleSave = (fatura: Fatura) => {
    console.log('Salvando fatura:', fatura);
    setShowModal(false);
    setEditingFatura(null);
  };

  const handleDeleteFatura = (fatura: Fatura) => {
    alert(`Fatura "${fatura.numero}" foi excluída com sucesso!`);
    // Aqui implementaria a lógica real de exclusão
  };

  const totalFaturas = faturas.length;
  const faturasPagas = faturas.filter(f => f.status === 'paga').length;
  const faturamentoTotal = faturas.reduce((acc, f) => acc + f.total, 0);
  const faturasVencidas = faturas.filter(f => f.status === 'vencida').length;

  return (
    <div>
      <ol className="breadcrumb float-xl-end">
        <li className="breadcrumb-item"><Link href="/dashboard/v1">Home</Link></li>
        <li className="breadcrumb-item">Financeiro</li>
        <li className="breadcrumb-item active">Faturamento</li>
      </ol>
      <h1 className="page-header">Faturamento <small>gestão de faturas e cobranças</small></h1>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-2">
          <ExportButtons 
            data={faturas} 
            filename="faturamento"
            onExportPDF={() => alert('Exportando faturas para PDF...')}
            onExportExcel={() => alert('Exportando faturas para Excel...')}
            onPrint={() => window.print()}
          />
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <i className="fa fa-plus me-2"></i>
          Nova Fatura
        </button>
      </div>

      <div className="row mb-3">
        <div className="col-xl-3 col-md-6">
          <Panel className="bg-primary text-white">
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">{totalFaturas}</div>
                  <div>Total de Faturas</div>
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
                  <div className="h4 mb-0">{faturasPagas}</div>
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
                  <div className="h4 mb-0">{faturasVencidas}</div>
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
                  <div className="h4 mb-0">Kz {faturamentoTotal.toLocaleString('pt-AO', { minimumFractionDigits: 2 })}</div>
                  <div>Faturamento Total</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-dollar-sign fa-2x"></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      <FaturaTable
        faturas={faturas}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onEdit={handleEdit}
        onDelete={handleDeleteFatura}
      />

      {showModal && (
        <FaturaModal
          fatura={editingFatura}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingFatura(null);
          }}
        />
      )}
    </div>
  );
}