'use client';

import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import FluxoCaixaTable from '@/components/financeiro/FluxoCaixaTable';
import MovimentacaoModal from '@/components/financeiro/MovimentacaoModal';
import MovimentacaoDetailsModal from '@/components/financeiro/MovimentacaoDetailsModal';
import ComprovanteModal from '@/components/financeiro/ComprovanteModal';

interface Movimentacao {
  id: number;
  data: string;
  tipo: 'entrada' | 'saida';
  categoria: string;
  descricao: string;
  valor: number;
  origem: string;
  documento: string;
  saldoAnterior: number;
  saldoAtual: number;
}

const movimentacoesExemplo: Movimentacao[] = [
  {
    id: 1,
    data: '2024-01-25T14:30:00',
    tipo: 'entrada',
    categoria: 'Faturamento',
    descricao: 'Recebimento FT-2024/001 - João Silva',
    valor: 85000,
    origem: 'Multicaixa',
    documento: 'FT-2024/001',
    saldoAnterior: 1250000,
    saldoAtual: 1335000
  },
  {
    id: 2,
    data: '2024-01-25T11:15:00',
    tipo: 'saida',
    categoria: 'Fornecedores',
    descricao: 'Pagamento FC-2024/089 - Auto Peças Luanda',
    valor: 125000,
    origem: 'Transferência',
    documento: 'FC-2024/089',
    saldoAnterior: 1375000,
    saldoAtual: 1250000
  },
  {
    id: 3,
    data: '2024-01-24T16:45:00',
    tipo: 'entrada',
    categoria: 'Faturamento',
    descricao: 'Recebimento FT-2024/002 - Maria Santos',
    valor: 45000,
    origem: 'Dinheiro',
    documento: 'FT-2024/002',
    saldoAnterior: 1330000,
    saldoAtual: 1375000
  },
  {
    id: 4,
    data: '2024-01-24T09:20:00',
    tipo: 'saida',
    categoria: 'Operacional',
    descricao: 'Pagamento de salários - Janeiro 2024',
    valor: 180000,
    origem: 'Transferência',
    documento: 'FOLHA-2024/01',
    saldoAnterior: 1510000,
    saldoAtual: 1330000
  },
  {
    id: 5,
    data: '2024-01-23T13:10:00',
    tipo: 'entrada',
    categoria: 'Faturamento',
    descricao: 'Recebimento FT-2024/003 - Carlos Oliveira',
    valor: 120000,
    origem: 'Multicaixa',
    documento: 'FT-2024/003',
    saldoAnterior: 1390000,
    saldoAtual: 1510000
  },
  {
    id: 6,
    data: '2024-01-23T10:30:00',
    tipo: 'saida',
    categoria: 'Fornecedores',
    descricao: 'Compra de equipamentos - Ferramentas SA',
    valor: 85000,
    origem: 'Transferência',
    documento: 'FC-2024/156',
    saldoAnterior: 1475000,
    saldoAtual: 1390000
  }
];

export default function FinanceiroFluxoCaixaPage() {
  const [movimentacoes] = useState<Movimentacao[]>(movimentacoesExemplo);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('todos');
  const [filterPeriodo, setFilterPeriodo] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showComprovanteModal, setShowComprovanteModal] = useState(false);
  const [editingMovimentacao, setEditingMovimentacao] = useState<Movimentacao | null>(null);
  const [viewingMovimentacao, setViewingMovimentacao] = useState<Movimentacao | null>(null);
  const [comprovanteMovimentacao, setComprovanteMovimentacao] = useState<Movimentacao | null>(null);

  const handleEdit = (movimentacao: Movimentacao) => {
    setEditingMovimentacao(movimentacao);
    setShowModal(true);
  };

  const handleView = (movimentacao: Movimentacao) => {
    setViewingMovimentacao(movimentacao);
    setShowDetailsModal(true);
  };

  const handleComprovante = (movimentacao: Movimentacao) => {
    setComprovanteMovimentacao(movimentacao);
    setShowComprovanteModal(true);
  };

  const handleSave = (movimentacao: Movimentacao) => {
    console.log('Salvando movimentação:', movimentacao);
    setShowModal(false);
    setEditingMovimentacao(null);
  };

  // Cálculos do dashboard
  const saldoAtual = movimentacoes.length > 0 ? movimentacoes[0].saldoAtual : 0;
  const entradasHoje = movimentacoes
    .filter(m => m.tipo === 'entrada' && new Date(m.data).toDateString() === new Date().toDateString())
    .reduce((acc, m) => acc + m.valor, 0);
  const saidasHoje = movimentacoes
    .filter(m => m.tipo === 'saida' && new Date(m.data).toDateString() === new Date().toDateString())
    .reduce((acc, m) => acc + m.valor, 0);
  const saldoDia = entradasHoje - saidasHoje;

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item">Financeiro</li>
            <li className="breadcrumb-item active">Fluxo de Caixa</li>
          </ol>
          <h1 className="page-header mb-0">Fluxo de Caixa</h1>
        </div>
        <div className="ms-auto">
          <div className="btn-group">
            <button 
              className="btn btn-success"
              onClick={() => setShowModal(true)}
            >
              <i className="fa fa-plus me-2"></i>
              Nova Entrada
            </button>
            <button 
              className="btn btn-danger"
              onClick={() => setShowModal(true)}
            >
              <i className="fa fa-minus me-2"></i>
              Nova Saída
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard de Saldos */}
      <div className="row mb-3">
        <div className="col-xl-3 col-md-6">
          <Panel className="bg-info text-white">
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">Kz {saldoAtual.toFixed(2)}</div>
                  <div>Saldo Atual</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-wallet fa-2x"></i>
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
                  <div className="h4 mb-0">Kz {entradasHoje.toFixed(2)}</div>
                  <div>Entradas Hoje</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-arrow-up fa-2x"></i>
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
                  <div className="h4 mb-0">Kz {saidasHoje.toFixed(2)}</div>
                  <div>Saídas Hoje</div>
                </div>
                <div className="opacity-50">
                  <i className="fa fa-arrow-down fa-2x"></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
        <div className="col-xl-3 col-md-6">
          <Panel className={`${saldoDia >= 0 ? 'bg-primary' : 'bg-warning'} text-white`}>
            <PanelBody>
              <div className="d-flex align-items-center">
                <div className="flex-fill">
                  <div className="h4 mb-0">Kz {saldoDia.toFixed(2)}</div>
                  <div>Saldo do Dia</div>
                </div>
                <div className="opacity-50">
                  <i className={`fa ${saldoDia >= 0 ? 'fa-chart-line' : 'fa-exclamation-triangle'} fa-2x`}></i>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      {/* Filtros Rápidos */}
      <Panel className="mb-3">
        <PanelHeader>
          <span>Filtros</span>
        </PanelHeader>
        <PanelBody>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label fw-bold">Período</label>
              <select 
                className="form-select"
                value={filterPeriodo}
                onChange={(e) => setFilterPeriodo(e.target.value)}
              >
                <option value="todos">Todos</option>
                <option value="hoje">Hoje</option>
                <option value="ontem">Ontem</option>
                <option value="semana">Esta Semana</option>
                <option value="mes">Este Mês</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">Tipo</label>
              <select 
                className="form-select"
                value={filterTipo}
                onChange={(e) => setFilterTipo(e.target.value)}
              >
                <option value="todos">Todos</option>
                <option value="entrada">Entradas</option>
                <option value="saida">Saídas</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Buscar</label>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por descrição, documento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button className="btn btn-outline-primary w-100">
                <i className="fa fa-download me-2"></i>
                Exportar
              </button>
            </div>
          </div>
        </PanelBody>
      </Panel>

      {/* Resumo Rápido */}
      <div className="row mb-3">
        <div className="col-md-4">
          <div className="card border-success">
            <div className="card-body text-center">
              <h5 className="text-success">Total de Entradas</h5>
              <h3 className="text-success">
                Kz {movimentacoes.filter(m => m.tipo === 'entrada').reduce((acc, m) => acc + m.valor, 0).toFixed(2)}
              </h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-danger">
            <div className="card-body text-center">
              <h5 className="text-danger">Total de Saídas</h5>
              <h3 className="text-danger">
                Kz {movimentacoes.filter(m => m.tipo === 'saida').reduce((acc, m) => acc + m.valor, 0).toFixed(2)}
              </h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-info">
            <div className="card-body text-center">
              <h5 className="text-info">Saldo Líquido</h5>
              <h3 className="text-info">
                Kz {(movimentacoes.filter(m => m.tipo === 'entrada').reduce((acc, m) => acc + m.valor, 0) - 
                     movimentacoes.filter(m => m.tipo === 'saida').reduce((acc, m) => acc + m.valor, 0)).toFixed(2)}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Movimentações */}
      <FluxoCaixaTable
        movimentacoes={movimentacoes}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterTipo={filterTipo}
        setFilterTipo={setFilterTipo}
        filterPeriodo={filterPeriodo}
        setFilterPeriodo={setFilterPeriodo}
        onEdit={handleEdit}
        onView={handleView}
        onComprovante={handleComprovante}
      />

      {/* Modal */}
      {showModal && (
        <MovimentacaoModal
          movimentacao={editingMovimentacao}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingMovimentacao(null);
          }}
        />
      )}

      {showDetailsModal && viewingMovimentacao && (
        <MovimentacaoDetailsModal
          movimentacao={viewingMovimentacao}
          onClose={() => {
            setShowDetailsModal(false);
            setViewingMovimentacao(null);
          }}
        />
      )}

      {showComprovanteModal && comprovanteMovimentacao && (
        <ComprovanteModal
          movimentacao={comprovanteMovimentacao}
          onClose={() => {
            setShowComprovanteModal(false);
            setComprovanteMovimentacao(null);
          }}
        />
      )}
    </div>
  );
}