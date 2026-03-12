"use client";
import { useState } from "react";
import { Panel, PanelHeader, PanelBody } from "@/components/panel/panel";

export default function UnidadesListaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRegiao, setFilterRegiao] = useState("todos");

  const unidades = [
    {
      id: "UM-001",
      nome: "Quartel General da Marinha",
      sigla: "QG-M",
      regiao: "Luanda",
      tipo: "Comando",
      comandante: "C Almirante João Almeida",
      telefone: "+244 222 000 001",
      estado: "ativo",
    },
    {
      id: "UM-002",
      nome: "Batalhão de Infantaria de São Paulo",
      sigla: "BISPA",
      regiao: "Luanda",
      tipo: "Batalhão",
      comandante: "TCoronel Manuel Pedro",
      telefone: "+244 222 000 002",
      estado: "ativo",
    },
    {
      id: "UM-003",
      nome: "Região Militar Norte",
      sigla: "RMN",
      regiao: "Uíge",
      tipo: "Região",
      comandante: "Gen Divisão António Costa",
      telefone: "+244 222 000 003",
      estado: "ativo",
    },
    {
      id: "UM-004",
      nome: "Base Aérea de Luanda",
      sigla: "BAL",
      regiao: "Luanda",
      tipo: "Base",
      comandante: "CM Aviação Maria Santos",
      telefone: "+244 222 000 004",
      estado: "ativo",
    },
    {
      id: "UM-005",
      nome: "Região Militar Sul",
      sigla: "RMS",
      regiao: "Namibe",
      tipo: "Região",
      comandante: "Gen Bda Francisco Lima",
      telefone: "+244 222 000 005",
      estado: "ativo",
    },
  ];

  const filteredUnidades = unidades.filter((unidade) => {
    const matchesSearch =
      unidade.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unidade.sigla.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegiao =
      filterRegiao === "todos" || unidade.regiao === filterRegiao;
    return matchesSearch && matchesRegiao;
  });

  const regioes = [...new Set(unidades.map((u) => u.regiao))];

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Unidades Militares</h2>
          <p className="text-muted mb-0">
            Gestão de unidades das Forças Armadas Angolanas
          </p>
        </div>
        <button className="btn btn-primary">
          <i className="fa fa-plus me-2"></i>
          Nova Unidade
        </button>
      </div>

      {/* Filtros */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fa fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nome ou sigla..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterRegiao}
            onChange={(e) => setFilterRegiao(e.target.value)}
          >
            <option value="todos">Todas as Regiões</option>
            {regioes.map((regiao) => (
              <option key={regiao} value={regiao}>
                {regiao}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 text-end">
          <span className="text-muted">
            {filteredUnidades.length} unidade(s) encontrada(s)
          </span>
        </div>
      </div>

      {/* Tabela de Unidades */}
      <div className="row">
        <div className="col-12">
          <Panel>
            <PanelHeader>
              <div className="d-flex justify-content-between align-items-center w-100">
                <span>Lista de Unidades</span>
                <div className="btn-group btn-group-sm">
                  <button className="btn btn-outline-secondary active">
                    <i className="fa fa-list"></i>
                  </button>
                  <button className="btn btn-outline-secondary">
                    <i className="fa fa-th"></i>
                  </button>
                </div>
              </div>
            </PanelHeader>
            <PanelBody className="p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Sigla</th>
                      <th>Nome da Unidade</th>
                      <th>Tipo</th>
                      <th>Região</th>
                      <th>Comandante</th>
                      <th>Telefone</th>
                      <th>Estado</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUnidades.map((unidade) => (
                      <tr key={unidade.id}>
                        <td>
                          <span className="badge bg-primary">
                            {unidade.sigla}
                          </span>
                        </td>
                        <td>
                          <strong>{unidade.nome}</strong>
                          <br />
                          <small className="text-muted">ID: {unidade.id}</small>
                        </td>
                        <td>{unidade.tipo}</td>
                        <td>{unidade.regiao}</td>
                        <td>{unidade.comandante}</td>
                        <td>{unidade.telefone}</td>
                        <td>
                          <span
                            className={`badge ${
                              unidade.estado === "ativo"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {unidade.estado}
                          </span>
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
                              title="Excluir"
                            >
                              <i className="fa fa-trash"></i>
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
                  <h6 className="card-title mb-1">Total Unidades</h6>
                  <h4 className="mb-0">{unidades.length}</h4>
                </div>
                <i className="fa fa-building fa-2x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Ativas</h6>
                  <h4 className="mb-0">
                    {unidades.filter((u) => u.estado === "ativo").length}
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
                  <h6 className="card-title mb-1">Regiões</h6>
                  <h4 className="mb-0">{regioes.length}</h4>
                </div>
                <i className="fa fa-map-marker-alt fa-2x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Comandos</h6>
                  <h4 className="mb-0">
                    {unidades.filter((u) => u.tipo === "Comando").length}
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
