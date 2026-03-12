import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Toast from '@/components/ui/Toast';
import MovimentarEstoqueModal from './MovimentarEstoqueModal';
import InventarioModal from './InventarioModal';

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

interface ProdutoTableProps {
  produtos: Produto[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterCategoria: string;
  setFilterCategoria: (categoria: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  onEdit: (produto: Produto) => void;
  onDelete?: (produto: Produto) => void;
  categorias: string[];
}

export default function ProdutoTable({ 
  produtos, 
  searchTerm, 
  setSearchTerm, 
  filterCategoria, 
  setFilterCategoria,
  filterStatus,
  setFilterStatus,
  onEdit,
  onDelete,
  categorias
}: ProdutoTableProps) {
  const [expandedProduto, setExpandedProduto] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState<Produto | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showMovimentarModal, setShowMovimentarModal] = useState(false);
  const [showInventarioModal, setShowInventarioModal] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const itemsPerPage = 5;

  const toggleExpanded = (produtoId: number) => {
    setExpandedProduto(expandedProduto === produtoId ? null : produtoId);
  };

  const handleMovimentar = (produto: Produto) => {
    setSelectedProduto(produto);
    setShowMovimentarModal(true);
  };

  const handleInventario = (produto: Produto) => {
    setSelectedProduto(produto);
    setShowInventarioModal(true);
  };

  const handleSaveMovimentacao = (movimentacao: any) => {
    setToastMessage(`Movimentação de estoque realizada com sucesso!`);
    setShowToast(true);
    setShowMovimentarModal(false);
    setSelectedProduto(null);
  };

  const handleSaveInventario = (inventario: any) => {
    setToastMessage(`Inventário realizado com sucesso!`);
    setShowToast(true);
    setShowInventarioModal(false);
    setSelectedProduto(null);
  };

  const handleDelete = (produto: Produto) => {
    setProdutoToDelete(produto);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (produtoToDelete) {
      if (onDelete) {
        onDelete(produtoToDelete);
      }
      setToastMessage(`Produto "${produtoToDelete.nome}" foi excluído com sucesso!`);
      setShowToast(true);
      setShowConfirmModal(false);
      setProdutoToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setProdutoToDelete(null);
  };

  const filteredProdutos = produtos.filter(produto => {
    const matchesSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.modelo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = filterCategoria === 'todas' || produto.categoria === filterCategoria;
    const matchesStatus = filterStatus === 'todos' || produto.status === filterStatus;
    return matchesSearch && matchesCategoria && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProdutos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProdutos = filteredProdutos.slice(startIndex, startIndex + itemsPerPage);

  const getEstoqueBadge = (produto: Produto) => {
    if (produto.estoque <= produto.estoqueMinimo) return 'bg-danger';
    if (produto.estoque <= produto.estoqueMinimo * 1.5) return 'bg-warning';
    return 'bg-success';
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'ativo': return 'bg-success';
      case 'inativo': return 'bg-secondary';
      case 'descontinuado': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <Panel>
      <PanelHeader>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span>Lista de Produtos</span>
          <div className="d-flex gap-2">
            <select 
              className="form-select form-select-sm" 
              value={filterCategoria}
              onChange={(e) => setFilterCategoria(e.target.value)}
              style={{width: '150px'}}
            >
              <option value="todas">Todas Categorias</option>
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
            <select 
              className="form-select form-select-sm" 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{width: '120px'}}
            >
              <option value="todos">Todos Status</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
              <option value="descontinuado">Descontinuado</option>
            </select>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{width: '200px'}}
            />
          </div>
        </div>
      </PanelHeader>
      <PanelBody className="p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Código / Nome</th>
                <th>Categoria</th>
                <th>Marca/Modelo</th>
                <th>Estoque</th>
                <th>Preços</th>
                <th>Status</th>
                <th>Localização</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProdutos.map((produto) => (
                <React.Fragment key={produto.id}>
                  <tr 
                    onClick={() => toggleExpanded(produto.id)} 
                    style={{cursor: 'pointer'}} 
                    className="table-row-hover"
                  >
                    <td>
                      <div className="d-flex align-items-center">
                        <i className={`fa fa-chevron-${expandedProduto === produto.id ? 'down' : 'right'} me-2 text-muted`}></i>
                        <div>
                          <div className="fw-bold text-primary">{produto.codigo}</div>
                          <small className="text-muted">{produto.nome}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-info">{produto.categoria}</span>
                    </td>
                    <td>
                      <div>
                        <div className="fw-bold">{produto.marca}</div>
                        <small className="text-muted">{produto.modelo}</small>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span className={`badge ${getEstoqueBadge(produto)}`}>
                          {produto.estoque} {produto.unidade}
                        </span>
                        <div>
                          <small className="text-muted">Min: {produto.estoqueMinimo}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="text-success fw-bold">Kz {produto.precoVenda.toFixed(2)}</div>
                        <small className="text-muted">Custo: Kz {produto.precoCompra.toFixed(2)}</small>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(produto.status)}`}>
                        {produto.status.charAt(0).toUpperCase() + produto.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-dark">{produto.localizacao}</span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="btn-group btn-group-sm">
                        <button 
                          className="btn btn-outline-warning" 
                          title="Editar"
                          onClick={() => onEdit(produto)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button 
                          className="btn btn-outline-info" 
                          title="Movimentar"
                          onClick={() => handleMovimentar(produto)}
                        >
                          <i className="fa fa-exchange-alt"></i>
                        </button>
                        <button 
                          className="btn btn-outline-success" 
                          title="Inventário"
                          onClick={() => handleInventario(produto)}
                        >
                          <i className="fa fa-clipboard-check"></i>
                        </button>
                        <button 
                          className="btn btn-outline-danger" 
                          title="Excluir"
                          onClick={() => handleDelete(produto)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedProduto === produto.id && (
                    <tr>
                      <td colSpan={8} className="p-0 bg-light">
                        <div className="p-4">
                          <div className="row">
                            <div className="col-md-6">
                              <h6 className="text-primary mb-3">
                                <i className="fa fa-info-circle me-2"></i>
                                Informações Detalhadas
                              </h6>
                              <div className="table-responsive">
                                <table className="table table-sm table-borderless">
                                  <tbody>
                                    <tr>
                                      <td className="fw-bold">Descrição:</td>
                                      <td>{produto.descricao}</td>
                                    </tr>
                                    <tr>
                                      <td className="fw-bold">Fornecedor:</td>
                                      <td>{produto.fornecedor}</td>
                                    </tr>
                                    <tr>
                                      <td className="fw-bold">Margem:</td>
                                      <td className="text-success">
                                        {(((produto.precoVenda - produto.precoCompra) / produto.precoCompra) * 100).toFixed(1)}%
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fw-bold">Valor Total:</td>
                                      <td className="text-primary fw-bold">
                                        Kz {(produto.estoque * produto.precoCompra).toFixed(2)}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <h6 className="text-primary mb-3">
                                <i className="fa fa-history me-2"></i>
                                Histórico de Movimentação
                              </h6>
                              <div className="table-responsive">
                                <table className="table table-sm table-borderless">
                                  <tbody>
                                    <tr>
                                      <td className="fw-bold">Última Compra:</td>
                                      <td>{formatDateTime(produto.dataUltimaCompra)}</td>
                                    </tr>
                                    <tr>
                                      <td className="fw-bold">Última Venda:</td>
                                      <td>{formatDateTime(produto.dataUltimaVenda)}</td>
                                    </tr>
                                    <tr>
                                      <td className="fw-bold">Giro de Estoque:</td>
                                      <td>
                                        <span className="badge bg-info">Médio</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="fw-bold">Dias em Estoque:</td>
                                      <td>
                                        {Math.floor((new Date().getTime() - new Date(produto.dataUltimaCompra).getTime()) / (1000 * 60 * 60 * 24))} dias
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center p-3 border-top">
            <div className="text-muted">
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredProdutos.length)} de {filteredProdutos.length} produtos
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

      <ConfirmModal
        isOpen={showConfirmModal}
        title="Excluir Produto"
        message={`Tem certeza que deseja excluir o produto "${produtoToDelete?.nome}"?\n\nTodas as movimentações de estoque relacionadas serão perdidas permanentemente.`}
        confirmText="Sim, Excluir"
        cancelText="Cancelar"
        type="danger"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <Toast
        isOpen={showToast}
        message={toastMessage}
        type="success"
        onClose={() => setShowToast(false)}
      />

      <MovimentarEstoqueModal
        isOpen={showMovimentarModal}
        produto={selectedProduto}
        onSave={handleSaveMovimentacao}
        onClose={() => {
          setShowMovimentarModal(false);
          setSelectedProduto(null);
        }}
      />

      <InventarioModal
        isOpen={showInventarioModal}
        produto={selectedProduto}
        onSave={handleSaveInventario}
        onClose={() => {
          setShowInventarioModal(false);
          setSelectedProduto(null);
        }}
      />
    </Panel>
  );
}