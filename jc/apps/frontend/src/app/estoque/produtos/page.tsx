'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import ProdutoTable from '@/components/estoque/ProdutoTable';
import ProdutoModal from '@/components/estoque/ProdutoModal';
import ExportButtons from '@/components/ui/ExportButtons';

interface Produto {
  id: number;
  codigo: string;
  nome: string;
  categoria: string;
  marca: string;
  modelo: string;
  descricao: string;
  precoCompra: number;
  precoVenda: number;
  estoque: number;
  estoqueMinimo: number;
  unidade: string;
  fornecedor: string;
  localizacao: string;
  status: string;
  dataUltimaCompra: string;
  dataUltimaVenda: string;
}

const produtosExemplo: Produto[] = [
  {
    id: 1,
    codigo: 'PEC001',
    nome: 'Filtro de Óleo',
    categoria: 'Filtros',
    marca: 'Mann Filter',
    modelo: 'W712/75',
    descricao: 'Filtro de óleo para motores 1.0 a 1.6',
    precoCompra: 15.50,
    precoVenda: 25.90,
    estoque: 45,
    estoqueMinimo: 10,
    unidade: 'UN',
    fornecedor: 'Auto Peças Silva',
    localizacao: 'A1-B2',
    status: 'ativo',
    dataUltimaCompra: '2024-01-15T10:30:00',
    dataUltimaVenda: '2024-01-20T14:20:00'
  },
  {
    id: 2,
    codigo: 'PEC002',
    nome: 'Pastilha de Freio Dianteira',
    categoria: 'Freios',
    marca: 'Bosch',
    modelo: 'BB1234',
    descricao: 'Pastilha de freio dianteira para veículos compactos',
    precoCompra: 45.00,
    precoVenda: 75.00,
    estoque: 8,
    estoqueMinimo: 15,
    unidade: 'JG',
    fornecedor: 'Distribuidora Norte',
    localizacao: 'B2-C1',
    status: 'ativo',
    dataUltimaCompra: '2024-01-10T09:15:00',
    dataUltimaVenda: '2024-01-22T16:45:00'
  },
  {
    id: 3,
    codigo: 'PEC003',
    nome: 'Óleo Motor 5W30',
    categoria: 'Lubrificantes',
    marca: 'Castrol',
    modelo: 'GTX 5W30',
    descricao: 'Óleo sintético para motores modernos',
    precoCompra: 28.90,
    precoVenda: 45.90,
    estoque: 25,
    estoqueMinimo: 12,
    unidade: 'LT',
    fornecedor: 'Lubrificantes Express',
    localizacao: 'C1-D3',
    status: 'ativo',
    dataUltimaCompra: '2024-01-18T11:00:00',
    dataUltimaVenda: '2024-01-21T13:30:00'
  },
  {
    id: 4,
    codigo: 'PEC004',
    nome: 'Correia Dentada',
    categoria: 'Correias',
    marca: 'Gates',
    modelo: 'T318',
    descricao: 'Correia dentada 120 dentes para motores 1.6',
    precoCompra: 85.00,
    precoVenda: 135.00,
    estoque: 3,
    estoqueMinimo: 8,
    unidade: 'UN',
    fornecedor: 'Auto Peças Silva',
    localizacao: 'D1-A2',
    status: 'ativo',
    dataUltimaCompra: '2024-01-12T15:20:00',
    dataUltimaVenda: '2024-01-19T10:15:00'
  },
  {
    id: 5,
    codigo: 'PEC005',
    nome: 'Vela de Ignição',
    categoria: 'Ignição',
    marca: 'NGK',
    modelo: 'BKR6E',
    descricao: 'Vela de ignição padrão para motores flex',
    precoCompra: 12.50,
    precoVenda: 22.90,
    estoque: 60,
    estoqueMinimo: 20,
    unidade: 'UN',
    fornecedor: 'Distribuidora Norte',
    localizacao: 'A3-B1',
    status: 'ativo',
    dataUltimaCompra: '2024-01-16T14:10:00',
    dataUltimaVenda: '2024-01-23T09:40:00'
  },
  {
    id: 6,
    codigo: 'PEC006',
    nome: 'Amortecedor Dianteiro',
    categoria: 'Suspensão',
    marca: 'Monroe',
    modelo: 'G7392',
    descricao: 'Amortecedor dianteiro para veículos médios',
    precoCompra: 120.00,
    precoVenda: 195.00,
    estoque: 12,
    estoqueMinimo: 6,
    unidade: 'UN',
    fornecedor: 'Suspensão Total',
    localizacao: 'E1-F2',
    status: 'ativo',
    dataUltimaCompra: '2024-01-14T16:30:00',
    dataUltimaVenda: '2024-01-20T11:20:00'
  },
  {
    id: 7,
    codigo: 'PEC007',
    nome: 'Bateria 60Ah',
    categoria: 'Elétrica',
    marca: 'Moura',
    modelo: 'M60GD',
    descricao: 'Bateria 60Ah para veículos de passeio',
    precoCompra: 180.00,
    precoVenda: 280.00,
    estoque: 8,
    estoqueMinimo: 5,
    unidade: 'UN',
    fornecedor: 'Elétrica Automotiva',
    localizacao: 'F1-G2',
    status: 'ativo',
    dataUltimaCompra: '2024-01-17T13:45:00',
    dataUltimaVenda: '2024-01-22T15:10:00'
  },
  {
    id: 8,
    codigo: 'PEC008',
    nome: 'Disco de Freio',
    categoria: 'Freios',
    marca: 'TRW',
    modelo: 'DF4567',
    descricao: 'Disco de freio ventilado 280mm',
    precoCompra: 95.00,
    precoVenda: 155.00,
    estoque: 6,
    estoqueMinimo: 10,
    unidade: 'UN',
    fornecedor: 'Freios & Cia',
    localizacao: 'B3-C2',
    status: 'ativo',
    dataUltimaCompra: '2024-01-13T10:25:00',
    dataUltimaVenda: '2024-01-21T14:50:00'
  }
];

export default function EstoqueProdutosPage() {
  const [produtos] = useState<Produto[]>(produtosExemplo);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('todas');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null);

  const handleEdit = (produto: Produto) => {
    setEditingProduto(produto);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduto(null);
  };

  const handleSave = (produto: Produto) => {
    console.log('Salvando produto:', produto);
    handleCloseModal();
  };

  const handleDeleteProduto = (produto: Produto) => {
    alert(`Produto "${produto.nome}" foi excluído com sucesso!`);
    // Aqui implementaria a lógica real de exclusão
  };

  const categorias = [...new Set(produtos.map(p => p.categoria))];
  const fornecedores = [...new Set(produtos.map(p => p.fornecedor))];

  return (
    <div>
      <ol className="breadcrumb float-xl-end">
        <li className="breadcrumb-item"><Link href="/dashboard/v1">Home</Link></li>
        <li className="breadcrumb-item">Estoque</li>
        <li className="breadcrumb-item active">Produtos</li>
      </ol>
      <h1 className="page-header">Gestão de Produtos <small>controle de estoque e preços</small></h1>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-2">
          <ExportButtons 
            data={produtos} 
            filename="produtos"
            onExportPDF={() => alert('Exportando produtos para PDF...')}
            onExportExcel={() => alert('Exportando produtos para Excel...')}
            onPrint={() => window.print()}
          />
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <i className="fa fa-plus me-2"></i>
          Novo Produto
        </button>
      </div>

      <div className="row mb-3">
        <div className="col-xl-3 col-md-6">
          <Panel className="bg-primary text-white">
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">{produtos.length}</div>
                  <div>Total de Produtos</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-boxes fa-2x"></i>
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
                  <div className="h4 mb-0">
                    {produtos.filter(p => p.estoque <= p.estoqueMinimo).length}
                  </div>
                  <div>Estoque Baixo</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-exclamation-triangle fa-2x"></i>
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
                  <div className="h4 mb-0">{categorias.length}</div>
                  <div>Categorias</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-tags fa-2x"></i>
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
                  <div className="h4 mb-0">
                    Kz {produtos.reduce((acc, p) => acc + (p.estoque * p.precoCompra), 0).toLocaleString('pt-AO', { minimumFractionDigits: 2 })}
                  </div>
                  <div>Valor em Estoque</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-dollar-sign fa-2x"></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      <ProdutoTable
        produtos={produtos}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterCategoria={filterCategoria}
        setFilterCategoria={setFilterCategoria}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onEdit={handleEdit}
        onDelete={handleDeleteProduto}
        categorias={categorias}
      />

      {showModal && (
        <ProdutoModal
          produto={editingProduto}
          onSave={handleSave}
          onClose={handleCloseModal}
          categorias={categorias}
          fornecedores={fornecedores}
        />
      )}
    </div>
  );
}