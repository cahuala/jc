import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

interface Categoria {
  id: number;
  nome: string;
  descricao: string;
  totalProdutos: number;
  status: string;
}

interface CategoriaTableProps {
  categorias: Categoria[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onEdit: (categoria: Categoria) => void;
}

export default function CategoriaTable({ 
  categorias, 
  searchTerm, 
  setSearchTerm, 
  onEdit 
}: CategoriaTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredCategorias = categorias.filter(c => 
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategorias.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategorias = filteredCategorias.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Panel>
      <PanelHeader>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span>Lista de Categorias</span>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Buscar categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{width: '200px'}}
          />
        </div>
      </PanelHeader>
      <PanelBody className="p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Total Produtos</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCategorias.map((categoria) => (
                <tr key={categoria.id}>
                  <td className="fw-bold">{categoria.nome}</td>
                  <td>{categoria.descricao}</td>
                  <td>
                    <span className="badge bg-info">{categoria.totalProdutos}</span>
                  </td>
                  <td>
                    <span className="badge bg-success">Ativo</span>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button 
                        className="btn btn-outline-warning" 
                        title="Editar"
                        onClick={() => onEdit(categoria)}
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center p-3 border-top">
            <div className="text-muted">
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredCategorias.length)} de {filteredCategorias.length} categorias
            </div>
            <div className="btn-group btn-group-sm">
              <button 
                className="btn btn-outline-secondary" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <i className="fa fa-chevron-left"></i>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`btn ${currentPage === page ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button 
                className="btn btn-outline-secondary" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <i className="fa fa-chevron-right"></i>
              </button>
            </div>
          </div>
        )}
      </PanelBody>
    </Panel>
  );
}