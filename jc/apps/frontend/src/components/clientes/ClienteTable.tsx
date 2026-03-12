/* eslint-disable @typescript-eslint/no-explicit-any */
import { Panel, PanelHeader, PanelBody } from "@/components/panel/panel";
import { useState } from "react";
import ClienteHistorico from "./ClienteHistorico";
import ClienteDetailsModal from "./ClienteDetailsModal";
import ClienteEditModal from "./ClienteEditModal";
import NovoServicoModal from "./NovoServicoModal";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Toast from "@/components/ui/Toast";
import React from "react";

interface Veiculo {
  id: number;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  cor: string;
  combustivel: string;
  ultimaManutencao?: string;
  proximaManutencao?: string;
  valorTotalServicos?: number;
  statusManutencao?: "em_dia" | "atrasado" | "proximo";
}

interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  veiculos: Veiculo[];
  ultimoServico: string;
  proximaRevisao: string;
  totalGasto: number;
  servicos: number;
  status: string;
  observacoes: string;
  historico?: any[];
}

interface ClienteTableProps {
  clientes: Cliente[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  onDelete?: (cliente: Cliente) => void;
}

export default function ClienteTable({
  clientes,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  onDelete,
}: ClienteTableProps) {
  const [expandedCliente, setExpandedCliente] = useState<number | null>(null);
  const [historicoAberto, setHistoricoAberto] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState<Cliente | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNovoServicoModal, setShowNovoServicoModal] = useState(false);
  const itemsPerPage = 5;

  const toggleExpanded = (clienteId: number) => {
    setExpandedCliente(expandedCliente === clienteId ? null : clienteId);
  };

  const abrirHistorico = (cliente: Cliente) => {
    console.log("Cliente selecionado:", cliente);
    console.log("Histórico do cliente:", cliente.historico);
    setClienteSelecionado(cliente);
    setHistoricoAberto(true);
  };

  const fecharHistorico = () => {
    setHistoricoAberto(false);
    setClienteSelecionado(null);
  };

  const handleViewDetails = (cliente: Cliente) => {
    setClienteSelecionado(cliente);
    setShowDetailsModal(true);
  };

  const handleEdit = (cliente: Cliente) => {
    setClienteSelecionado(cliente);
    setShowEditModal(true);
  };

  const handleNewService = (cliente: Cliente) => {
    setClienteSelecionado(cliente);
    setShowNovoServicoModal(true);
  };

  const handleSaveCliente = (cliente: Cliente) => {
    setToastMessage(`Cliente "${cliente.nome}" foi atualizado com sucesso!`);
    setShowToast(true);
    setShowEditModal(false);
    setClienteSelecionado(null);
  };

  const handleSaveServico = (servico: any) => {
    setToastMessage(`Serviço agendado com sucesso para ${servico.clienteNome}!`);
    setShowToast(true);
    setShowNovoServicoModal(false);
    setClienteSelecionado(null);
  };

  const handleDelete = (cliente: Cliente) => {
    setClienteToDelete(cliente);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (clienteToDelete) {
      if (onDelete) {
        onDelete(clienteToDelete);
      }
      setToastMessage(`Cliente "${clienteToDelete.nome}" foi excluído com sucesso!`);
      setShowToast(true);
      setShowConfirmModal(false);
      setClienteToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setClienteToDelete(null);
  };
  const filteredClientes = clientes.filter((cliente) => {
    const matchesSearch =
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.veiculos.some(
        (v) =>
          v.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
          `${v.marca} ${v.modelo}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    const matchesFilter =
      filterStatus === "todos" || cliente.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredClientes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClientes = filteredClientes.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-success";
      case "atencao":
        return "bg-warning";
      case "inativo":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ativo":
        return "Ativo";
      case "atencao":
        return "Atenção";
      case "inativo":
        return "Inativo";
      default:
        return "Indefinido";
    }
  };

  return (
    <>
      <Panel>
        <PanelHeader>
          <div className="d-flex justify-content-between align-items-center w-100">
            <span>Lista de Clientes</span>
            <div className="d-flex gap-2">
              <select
                className="form-select form-select-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ width: "150px" }}
              >
                <option value="todos">Todos Status</option>
                <option value="ativo">Ativos</option>
                <option value="atencao">Atenção</option>
                <option value="inativo">Inativos</option>
              </select>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Buscar cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "200px" }}
              />
            </div>
          </div>
        </PanelHeader>
        <PanelBody className="p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Cliente</th>
                  <th>Veículos</th>
                  <th>Contato</th>
                  <th>Último Serviço</th>
                  <th>Próxima Revisão</th>
                  <th>Total Gasto</th>
                  <th>Serviços</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {paginatedClientes.map((cliente) => (
                  <React.Fragment key={cliente.id}>
                    <tr
                      onClick={() => toggleExpanded(cliente.id)}
                      style={{ cursor: "pointer" }}
                      className="table-row-hover"
                    >
                      <td>
                        <div className="d-flex align-items-center">
                          <i
                            className={`fa fa-chevron-${expandedCliente === cliente.id ? "down" : "right"} me-2 text-muted`}
                          ></i>
                          <div>
                            <div className="fw-bold">{cliente.nome}</div>
                            <small className="text-muted">
                              {cliente.observacoes}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          {cliente.veiculos.length}
                        </span>
                        {cliente.veiculos.length > 0 && (
                          <div className="mt-1">
                            <small className="text-muted">
                              {cliente.veiculos[0].marca}{" "}
                              {cliente.veiculos[0].modelo}
                            </small>
                          </div>
                        )}
                      </td>
                      <td>
                        <div>{cliente.telefone}</div>
                        <small className="text-muted">{cliente.email}</small>
                      </td>
                      <td>{cliente.ultimoServico}</td>
                      <td>
                        <span
                          className={`badge ${new Date(cliente.proximaRevisao.split("/").reverse().join("-")) < new Date() ? "bg-danger" : "bg-success"}`}
                        >
                          {cliente.proximaRevisao}
                        </span>
                      </td>
                      <td className="fw-bold text-success">
                        R$ {cliente.totalGasto.toLocaleString()}
                      </td>
                      <td>
                        <span className="badge bg-primary">
                          {cliente.servicos}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${getStatusBadge(cliente.status)}`}
                        >
                          {getStatusText(cliente.status)}
                        </span>
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            title="Ver Detalhes"
                            onClick={() => handleViewDetails(cliente)}
                          >
                            <i className="fa fa-eye"></i>
                          </button>
                          <button
                            className="btn btn-outline-info"
                            title="Histórico de Serviços"
                            onClick={() => abrirHistorico(cliente)}
                          >
                            <i className="fa fa-history"></i>
                          </button>
                          <button
                            className="btn btn-outline-success"
                            title="Novo Serviço"
                            onClick={() => handleNewService(cliente)}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                          <button
                            className="btn btn-outline-warning"
                            title="Editar"
                            onClick={() => handleEdit(cliente)}
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            title="Excluir"
                            onClick={() => handleDelete(cliente)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedCliente === cliente.id && (
                      <tr>
                        <td colSpan={9} className="p-0 bg-light">
                          <table className="table table-sm mb-0">
                            <thead className="table-secondary">
                              <tr>
                                <th width="25%">Veículo</th>
                                <th width="10%">Placa</th>
                                <th width="15%">Última Manutenção</th>
                                <th width="15%">Próxima Manutenção</th>
                                <th width="15%">Mecânico</th>
                                <th width="10%">Total</th>
                                <th width="10%">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cliente.veiculos.map((veiculo) => {
                                const ultimaManutencao = "15/12/2023";
                                const proximaManutencao = "15/06/2024";
                                const valorTotal =
                                  Math.floor(Math.random() * 2000) + 500;
                                const mecanico = [
                                  "António Mendes",
                                  "Manuel Costa",
                                  "José Ferreira",
                                ][Math.floor(Math.random() * 3)];
                                const status =
                                  new Date(
                                    proximaManutencao
                                      .split("/")
                                      .reverse()
                                      .join("-"),
                                  ) < new Date()
                                    ? "atrasado"
                                    : "em_dia";

                                return (
                                  <tr key={veiculo.id}>
                                    <td>
                                      <div className="fw-bold">
                                        {veiculo.marca} {veiculo.modelo}
                                      </div>
                                      <small className="text-muted">
                                        {veiculo.ano} • {veiculo.cor}
                                      </small>
                                    </td>
                                    <td>
                                      <span className="badge bg-dark">
                                        {veiculo.placa}
                                      </span>
                                    </td>
                                    <td>{ultimaManutencao}</td>
                                    <td>
                                      <span
                                        className={`badge ${status === "atrasado" ? "bg-danger" : "bg-success"}`}
                                      >
                                        {proximaManutencao}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-primary">
                                        {mecanico}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-success fw-bold">
                                        R$ {valorTotal.toLocaleString()}
                                      </span>
                                    </td>
                                    <td>
                                      <span
                                        className={`badge ${status === "atrasado" ? "bg-danger" : "bg-success"}`}
                                      >
                                        {status === "atrasado"
                                          ? "Atrasado"
                                          : "Em dia"}
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center p-3">
              <div className="text-muted">
                Mostrando {startIndex + 1} a{" "}
                {Math.min(startIndex + itemsPerPage, filteredClientes.length)}{" "}
                de {filteredClientes.length} registros
              </div>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Anterior
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <li
                        key={page}
                        className={`page-item ${currentPage === page ? "active" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ),
                  )}
                  <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Próximo
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </PanelBody>
      </Panel>

      {clienteSelecionado && (
        <ClienteHistorico
          cliente={clienteSelecionado}
          isOpen={historicoAberto}
          onClose={fecharHistorico}
        />
      )}

      <ConfirmModal
        isOpen={showConfirmModal}
        title="Excluir Cliente"
        message={`Tem certeza que deseja excluir o cliente "${clienteToDelete?.nome}"?\n\nTodos os dados relacionados (veículos, histórico de serviços) serão perdidos permanentemente.`}
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

      <ClienteDetailsModal
        isOpen={showDetailsModal}
        cliente={clienteSelecionado}
        onClose={() => {
          setShowDetailsModal(false);
          setClienteSelecionado(null);
        }}
      />

      <ClienteEditModal
        isOpen={showEditModal}
        cliente={clienteSelecionado}
        onSave={handleSaveCliente}
        onClose={() => {
          setShowEditModal(false);
          setClienteSelecionado(null);
        }}
      />

      <NovoServicoModal
        isOpen={showNovoServicoModal}
        cliente={clienteSelecionado}
        onSave={handleSaveServico}
        onClose={() => {
          setShowNovoServicoModal(false);
          setClienteSelecionado(null);
        }}
      />
    </>
  );
}
