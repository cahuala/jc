"use client";
import { useState } from "react";
import { Panel, PanelHeader, PanelBody } from "@/components/panel/panel";

export default function PracasListaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPosto, setFilterPosto] = useState("todos");
  const [filterSituacao, setFilterSituacao] = useState("todos");

  const pracas = [
    {
      id: "PR-001",
      nip: "NIP-34567",
      nome: "Sargento Chefe António Paulo",
      posto: "Sargento Chefe",
      arma: "Infantaria",
      unidade: "BISPA",
      situacao: "Serviço",
      dataIncorporacao: "2010-03-15",
      processo: null,
    },
    {
      id: "PR-002",
      nip: "NIP-35678",
      nome: "Sargento Adjunto Maria João",
      posto: "Sargento Adjunto",
      arma: "Saúde",
      unidade: "Hospital Militar",
      situacao: "Serviço",
      dataIncorporacao: "2012-07-20",
      processo: null,
    },
    {
      id: "PR-003",
      nip: "NIP-36789",
      nome: "Primeiro Sargento Francisco Manuel",
      posto: "Primeiro Sargento",
      arma: "Transmissões",
      unidade: "Região Militar Norte",
      situacao: "Processo",
      dataIncorporacao: "2014-01-10",
      processo: "CD-2024-0034",
    },
    {
      id: "PR-004",
      nip: "NIP-37890",
      nome: "Segundo Sargento Carlos Eduardo",
      posto: "Segundo Sargento",
      arma: "Artilharia",
      unidade: "Batalhão 3211",
      situacao: "Serviço",
      dataIncorporacao: "2016-05-22",
      processo: null,
    },
    {
      id: "PR-005",
      nip: "NIP-38901",
      nome: "Cabo Joaquim Pedro",
      posto: "Cabo",
      arma: "Cavalaria",
      unidade: "BISPA",
      situacao: "Serviço",
      dataIncorporacao: "2019-09-08",
      processo: null,
    },
    {
      id: "PR-006",
      nip: "NIP-39912",
      nome: "Soldado Manuel Tomás",
      posto: "Soldado",
      arma: "Infantaria",
      unidade: "BISPA",
      situacao: "Deserção",
      dataIncorporacao: "2021-11-15",
      processo: "APF-2024-0123",
    },
    {
      id: "PR-007",
      nip: "NIP-40923",
      nome: "Soldado Ana Cristina",
      posto: "Soldado",
      arma: "Enfermagem",
      unidade: "Hospital Militar",
      situacao: "Serviço",
      dataIncorporacao: "2022-02-28",
      processo: null,
    },
  ];

  const postos = [
    "todos",
    "Sargento Chefe",
    "Sargento Adjunto",
    "Primeiro Sargento",
    "Segundo Sargento",
    "Cabo",
    "Soldado",
  ];
  const situacoes = [
    "todos",
    "Serviço",
    "Processo",
    "Deserção",
    "Licença",
    "Reforma",
  ];

  const filteredPracas = pracas.filter((praca) => {
    const matchesSearch =
      praca.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      praca.nip.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosto = filterPosto === "todos" || praca.posto === filterPosto;
    const matchesSituacao =
      filterSituacao === "todos" || praca.situacao === filterSituacao;
    return matchesSearch && matchesPosto && matchesSituacao;
  });

  const getPostoIcon = (posto: string) => {
    const icons: Record<string, string> = {
      "Sargento Chefe": "fa-medal",
      "Sargento Adjunto": "fa-award",
      "Primeiro Sargento": "fa-certificate",
      "Segundo Sargento": "fa-id-badge",
      Cabo: "fa-user-shield",
      Soldado: "fa-user",
    };
    return icons[posto] || "fa-user";
  };

  const getPostoColor = (posto: string) => {
    const colors: Record<string, string> = {
      "Sargento Chefe": "bg-danger",
      "Sargento Adjunto": "bg-warning",
      "Primeiro Sargento": "bg-success",
      "Segundo Sargento": "bg-info",
      Cabo: "bg-primary",
      Soldado: "bg-secondary",
    };
    return colors[posto] || "bg-secondary";
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Praças das FAA</h2>
          <p className="text-muted mb-0">
            Gestão de praças das Forças Armadas Angolanas
          </p>
        </div>
        <button className="btn btn-primary">
          <i className="fa fa-plus me-2"></i>
          Nova Praça
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
                {posto === "todos" ? "Todas as Graduações" : posto}
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
            {filteredPracas.length} encontrado(s)
          </span>
        </div>
      </div>

      {/* Tabela de Praças */}
      <div className="row">
        <div className="col-12">
          <Panel>
            <PanelHeader>
              <div className="d-flex justify-content-between align-items-center w-100">
                <span>Lista de Praças</span>
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
                      <th>Graduação</th>
                      <th>Nome</th>
                      <th>NIP</th>
                      <th>Arma/Serviço</th>
                      <th>Unidade</th>
                      <th>Situação</th>
                      <th>Incorporação</th>
                      <th>Processo</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPracas.map((praca) => (
                      <tr key={praca.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <span
                              className={`badge ${getPostoColor(praca.posto)} me-2`}
                            >
                              <i
                                className={`fa ${getPostoIcon(praca.posto)} me-1`}
                              ></i>
                              {praca.posto}
                            </span>
                          </div>
                        </td>
                        <td>
                          <strong>{praca.nome}</strong>
                        </td>
                        <td>
                          <code>{praca.nip}</code>
                        </td>
                        <td>{praca.arma}</td>
                        <td>{praca.unidade}</td>
                        <td>
                          <span
                            className={`badge ${
                              praca.situacao === "Serviço"
                                ? "bg-success"
                                : praca.situacao === "Processo"
                                  ? "bg-warning"
                                  : praca.situacao === "Deserção"
                                    ? "bg-danger"
                                    : praca.situacao === "Licença"
                                      ? "bg-info"
                                      : "bg-secondary"
                            }`}
                          >
                            {praca.situacao}
                          </span>
                        </td>
                        <td>{praca.dataIncorporacao}</td>
                        <td>
                          {praca.processo ? (
                            <a
                              href={`/processos/lista?id=${praca.processo}`}
                              className="text-danger"
                            >
                              <i className="fa fa-link me-1"></i>
                              {praca.processo}
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
                  <h6 className="card-title mb-1">Total Praças</h6>
                  <h4 className="mb-0">{pracas.length}</h4>
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
                    {pracas.filter((p) => p.situacao === "Serviço").length}
                  </h4>
                </div>
                <i className="fa fa-check-circle fa-2x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Deserção</h6>
                  <h4 className="mb-0">
                    {pracas.filter((p) => p.situacao === "Deserção").length}
                  </h4>
                </div>
                <i className="fa fa-running fa-2x opacity-75"></i>
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
                    {pracas.filter((p) => p.situacao === "Processo").length}
                  </h4>
                </div>
                <i className="fa fa-exclamation-triangle fa-2x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
