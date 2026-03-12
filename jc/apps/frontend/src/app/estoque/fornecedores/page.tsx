'use client';

import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import FornecedorTable from '@/components/estoque/FornecedorTable';
import FornecedorModal from '@/components/estoque/FornecedorModal';

interface Fornecedor {
  id: number;
  nome: string;
  nif: string;
  contato: string;
  telefone: string;
  status: string;
}

const fornecedoresExemplo: Fornecedor[] = [
  { id: 1, nome: 'Auto Peças Silva', nif: '123456789', contato: 'João Silva', telefone: '(+244) 923-456-789', status: 'ativo' },
  { id: 2, nome: 'Distribuidora Norte', nif: '987654321', contato: 'Maria Santos', telefone: '(+244) 912-345-678', status: 'ativo' },
  { id: 3, nome: 'Lubrificantes Express', nif: '111222333', contato: 'Carlos Oliveira', telefone: '(+244) 934-567-890', status: 'ativo' },
  { id: 4, nome: 'Suspensão Total', nif: '555666777', contato: 'Ana Costa', telefone: '(+244) 945-678-901', status: 'ativo' },
  { id: 5, nome: 'Elétrica Automotiva', nif: '333444555', contato: 'Pedro Lima', telefone: '(+244) 956-789-012', status: 'ativo' },
  { id: 6, nome: 'Freios & Cia', nif: '777888999', contato: 'Lucia Ferreira', telefone: '(+244) 967-890-123', status: 'ativo' }
];

export default function EstoqueFornecedoresPage() {
  const [fornecedores] = useState<Fornecedor[]>(fornecedoresExemplo);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingFornecedor, setEditingFornecedor] = useState<Fornecedor | null>(null);

  const handleEdit = (fornecedor: Fornecedor) => {
    setEditingFornecedor(fornecedor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFornecedor(null);
  };

  const handleSave = (fornecedor: Fornecedor) => {
    console.log('Salvando fornecedor:', fornecedor);
    handleCloseModal();
  };

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item">Estoque</li>
            <li className="breadcrumb-item active">Fornecedores</li>
          </ol>
          <h1 className="page-header mb-0">Fornecedores</h1>
        </div>
        <div className="ms-auto">
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <i className="fa fa-plus me-2"></i>
            Novo Fornecedor
          </button>
        </div>
      </div>

      <FornecedorTable
        fornecedores={fornecedores}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onEdit={handleEdit}
      />

      {showModal && (
        <FornecedorModal
          fornecedor={editingFornecedor}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}