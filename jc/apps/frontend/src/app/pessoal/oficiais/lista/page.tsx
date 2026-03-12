"use client";
import { useState } from "react";
import { Panel, PanelHeader, PanelBody } from "@/components/panel/panel";

export default function OficiaisListaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPosto, setFilterPosto] = useState("todos");
  const [filterSituacao, setFilterSituacao] = useState("todos");

  const oficiais = [
    {
      id: "OF-001",
      nip: "NIP-19845",
      nome: "General de Coroa António Miguel",
      posto: "General",
      arma: "Infantaria",
      unidade: "Quartel General",
      situacao: "Serviço",
      dataPromocao: "2020-11-10",
      processo: null,
    },
    {
      id: "OF-002",
      nip: "NIP-20123",
      nome: "Coronel Manuel João Pedro",
      posto: "Coronel",
      arma: "Artilharia",
      unidade: "BISPA",
      situacao: "Serviço",
      dataPromocao: "2019-05-15",
      processo: null,
    },
    {
      id: "OF-003",
      nip: "NIP-21567",
      nome: "Tenente Coronel Maria Santos Lima",
      posto: "Tenente Coronel",
      arma: "Engenharia",
      unidade: "Região Militar Norte",
      situacao: "Serviço",
      dataPromocao: "2021-03-20",
      processo: "IPM-2024-0156",
    },
    {
      id: "OF-004",
      nip: "NIP-18934",
      nome: "Major Francisco António",
      posto: "Major",
      arma: "Transmissões",
      unidade: "Base Aérea",
      situacao: "Processo",
      dataPromocao: "2018-08-12",
      processo: "APF-2024-0089",
    },
    {
      id: "OF-005",
      nip: "NIP-22345",
      nome: "Capitão Carlos Manuel",
      posto: "Capitão",
      arma: "Cavalaria",
      unidade: "Batalhão 3211",
      situacao: "Serviço",
      dataPromocao: "2022-01-05",
      processo: null,
    },
    {
      id: "OF-006",
      nip: "NIP-23456",
      nome: "Tenente Ana Paula Costa",
      posto: "Tenente",
      arma: "Infantaria",
      unidade: "BISPA",
      situacao: "Serviço",
      dataPromocao: "2023-06-18",
      processo: null,
    },
    {
      id: "OF-007",
      nip: "NIP-19876",
      nome: "Subtenente Pedro Paulo",
      posto: "Subtenente",
      arma: "Material Bélico",
      unidade: "Arsenal",
      situacao: "Reserva",
      dataPromocao: "2015-12-01",
      processo: null,
    },
  ];

  const postos = [
    "todos",
    "General",
    "Coronel",
    "Tenente Coronel",
    "Major",
    "Capitão",
    "Tenente",
    "Subtenente",
  ];
  const situacoes = ["todos", "Serviço", "Processo", "Reserva", "Reforma"];

  const filteredOficiais = oficiais.filter((oficial) => {
    const matchesSearch =
      oficial.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      oficial.nip.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosto =
      filterPosto === "todos" || oficial.posto === filterPosto;
    const matchesSituacao =
      filterSituacao === "todos" || oficial.situacao === filterSituacao;
    return matchesSearch && matchesPosto && matchesSituacao;
  });

  const getPostoIcon = (posto: string) => {
    const icons: Record<string, string> = {
      General: "fa-star",
      Coronel: "fa-medal",
      "Tenente Coronel": "fa-medal",
      Major: "fa-award",
      Capitão: "fa-certificate",
      Tenente: "fa-id-badge",
      Subtenente: "fa-id-card",
    };
    return icons[posto] || "fa-user";
  };

  const getPostoColor = (posto: string) => {
    const colors: Record<string, string> = {
      General: "bg-danger",
      Coronel: "bg-warning",
      "Tenente Coronel": "bg-success",
      Major: "bg-info",
      Capitão: "bg-primary",
      Tenente: "bg-secondary",
      Subtenente: "bg-dark",
    };
    return colors[posto] || "bg-secondary";
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Oficiais das FAA</h2>
          <p className="text-muted mb-0">
            Gestão de oficiais das Forças Armadas Angolanas
          </p>
        </div>
        <button className="btn btn-primary">
          <i className="fa fa-plus me-2"></i>
          Novo Oficial
        </button>
      </div>

      {/* Filtros */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nome ou NIP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterPosto}
            onChange={(e) => setFilterPosto(e.target.value)}
          >
            {postos.map((posto) => (
              <option key={posto} value={posto}>
                {posto === "todos" ? "Todos os Postos" : posto}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterSituacao}
            onChange={(e) => setFilterSituacao(e.target.value)}
          >
            {situacoes.map((situacao) => (
              <option key={situacao} value={situacao}>
                {situacao === "todos" ? "Todas as Situações" : situacao}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2 text-end">
          <span className="text-muted">
            {filteredOficiais.length} encontrado(s)
          </span>
        </div>
      </div>

      {/* Tabela de Oficiais */}
      <div className="row">
        <div className="col-12">
          <Panel>
            <PanelHeader>
              <div className="d-flex justify-content-between align-items-center w-100">
                <span>Lista de Oficiais</span>
                <button className="btn btn-outline-success btn-sm">
                  <i className="fa fa-file-excel me-1"></i>
                  Exportar
                </button>
              </div>
            </PanelHeader>
            <PanelBody className="p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Posto</th>
                      <th>Nome</th>
                      <th>NIP</th>
                      <th>Arma/Serviço</th>
                      <th>Unidade</th>
                      <th>Situação</th>
                      <th>Data Promoção</th>
                      <th>Processo</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOficiais.map((oficial) => (
                      <tr key={oficial.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <span
                              className={`badge ${getPostoColor(oficial.posto)} me-2`}
                            >
                              <i
                                className={`fa ${getPostoIcon(oficial.posto)} me-1`}
                              ></i>
                              {oficial.posto}
                            </span>
                          </div>
                        </td>
                        <td>
                          <strong>{oficial.nome}</strong>
                        </td>
                        <td>
                          <code>{oficial.nip}</code>
                        </td>
                        <td>{oficial.arma}</td>
                        <td>{oficial.unidade}</td>
                        <td>
                          <span
                            className={`badge ${
                              oficial.situacao === "Serviço"
                                ? "bg-success"
                                : oficial.situacao === "Processo"
                                  ? "bg-warning"
                                  : oficial.situacao === "Reserva"
                                    ? "bg-info"
                                    : "bg-secondary"
                            }`}
                          >
                            {oficial.situacao}
                          </span>
                        </td>
                        <td>{oficial.dataPromocao}</td>
                        <td>
                          {oficial.processo ? (
                            <a
                              href={`/processos/lista?id=${oficial.processo}`}
                              className="text-danger"
                            >
                              <i className="fa fa-link me-1"></i>
                              {oficial.processo}
                            </a>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary"
                              title="Visualizar"
                            >
                              <i className="fa fa-eye"></i>
                            </button>
                            <button
                              className="btn btn-outline-secondary"
                              title="Editar"
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              title="Abrir Processo"
                            >
                              <i className="fa fa-gavel"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Total Oficiais</h6>
                  <h4 className="mb-0">{oficiais.length}</h4>
                </div>
                <i className="fa fa-users fa-2x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Em Serviço</h6>
                  <h4 className="mb-0">
                    {oficiais.filter((o) => o.situacao === "Serviço").length}
                  </h4>
                </div>
                <i className="fa fa-check-circle fa-2x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Em Processo</h6>
                  <h4 className="mb-0">
                    {oficiais.filter((o) => o.situacao === "Processo").length}
                  </h4>
                </div>
                <i className="fa fa-exclamation-triangle fa-2x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Generais</h6>
                  <h4 className="mb-0">
                    {oficiais.filter((o) => o.posto === "General").length}
                  </h4>
                </div>
                <i className="fa fa-star fa-2x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
