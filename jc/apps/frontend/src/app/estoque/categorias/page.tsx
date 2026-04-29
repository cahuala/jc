'use client';

import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import CategoriaTable from '@/components/estoque/CategoriaTable';
import CategoriaModal from '@/components/estoque/CategoriaModal';

interface Categoria {
  id: number;
  nome: string;
  descricao: string;
  totalProdutos: number;
  status: string;
}

const categoriasExemplo: Categoria[] = [
  { id: 1, nome: 'Filtros', descricao: 'Filtros de óleo, ar, combustível', totalProdutos: 15, status: 'ativo' },
  { id: 2, nome: 'Freios', descricao: 'Pastilhas, discos, fluidos de freio', totalProdutos: 12, status: 'ativo' },
  { id: 3, nome: 'Lubrificantes', descricao: 'Óleos, graxas, aditivos', totalProdutos: 8, status: 'ativo' },
  { id: 4, nome: 'Correias', descricao: 'Correias dentadas, poly-v', totalProdutos: 6, status: 'ativo' },
  { id: 5, nome: 'Ignição', descricao: 'Velas, cabos, bobinas', totalProdutos: 10, status: 'ativo' },
  { id: 6, nome: 'Suspensão', descricao: 'Amortecedores, molas, buchas', totalProdutos: 9, status: 'ativo' },
  { id: 7, nome: 'Elétrica', descricao: 'Baterias, alternadores, motores', totalProdutos: 7, status: 'ativo' }
];

export default function EstoqueCategoriasPage() {
  const [categorias] = useState<Categoria[]>(categoriasExemplo);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);

  const handleEdit = (categoria: Categoria) => {
    setEditingCategoria(categoria);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategoria(null);
  };

  const handleSave = (categoria: Categoria) => {
    
    handleCloseModal();
  };

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item">Estoque</li>
            <li className="breadcrumb-item active">Categorias</li>
          </ol>
          <h1 className="page-header mb-0">Categorias</h1>
        </div>
        <div className="ms-auto">
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <i className="fa fa-plus me-2"></i>
            Nova Categoria
          </button>
        </div>
      </div>

      <CategoriaTable
        categorias={categorias}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onEdit={handleEdit}
      />

      {showModal && (
        <CategoriaModal
          categoria={editingCategoria}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}