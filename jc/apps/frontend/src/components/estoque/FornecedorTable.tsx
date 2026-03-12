import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

interface Fornecedor {
  id: number;
  nome: string;
  nif: string;
  contato: string;
  telefone: string;
  status: string;
}

interface FornecedorTableProps {
  fornecedores: Fornecedor[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onEdit: (fornecedor: Fornecedor) => void;
}

export default function FornecedorTable({ 
  fornecedores, 
  searchTerm, 
  setSearchTerm, 
  onEdit 
}: FornecedorTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredFornecedores = fornecedores.filter(f => 
    f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.nif.includes(searchTerm) ||
    f.contato.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFornecedores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFornecedores = filteredFornecedores.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Panel>
      <PanelHeader>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span>Lista de Fornecedores</span>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Buscar fornecedor..."
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
                <th>NIF</th>
                <th>Contato</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedFornecedores.map((fornecedor) => (
                <tr key={fornecedor.id}>
                  <td className="fw-bold">{fornecedor.nome}</td>
                  <td>{fornecedor.nif}</td>
                  <td>{fornecedor.contato}</td>
                  <td>{fornecedor.telefone}</td>
                  <td>
                    <span className="badge bg-success">Ativo</span>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button 
                        className="btn btn-outline-warning" 
                        title="Editar"
                        onClick={() => onEdit(fornecedor)}
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
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredFornecedores.length)} de {filteredFornecedores.length} fornecedores
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