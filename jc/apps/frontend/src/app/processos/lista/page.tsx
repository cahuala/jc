"use client";
import { useState } from "react";
import { Panel, PanelHeader, PanelBody } from "@/components/panel/panel";

export default function ProcessosListaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterTipo] = useState("todos");
  const [filterStatus, setFilterStatus] = useState("todos");

  const processos = [
    {
      id: "2024/0156",
      tipo: "IPM",
      tipoDescricao: "Inquérito Policial Militar",
      reu: "Sd. João Mendes",
      posto: "Soldado",
      unidade: "BISPA",
      crime: "Abandono de Posto",
      dataAbertura: "2024-12-15",
      status: "em_investigacao",
      fase: "Instrução",
      juiz: "Maj. Judge Carlos Manuel",
    },
    {
      id: "2024/0155",
      tipo: "APF",
      tipoDescricao: "Auto de Prisão em Flagrante",
      reu: "Cb. Carlos António",
      posto: "Cabo",
      unidade: "Região Militar Norte",
      crime: "Deserção",
      dataAbertura: "2024-12-10",
      status: "prisao",
      fase: "Detenção",
      juiz: "Ten. Cel. António Pedro",
    },
    {
      id: "2024/0154",
      tipo: "PC",
      tipoDescricao: "Processo Crime",
      reu: "3º Sgt. Manuel Pedro",
      posto: "Primeiro Sargento",
      unidade: "Base Aérea",
      crime: "Furto Material Bélico",
      dataAbertura: "2024-11-28",
      status: "audiencia",
      fase: "Julgamento",
      juiz: "Maj. Judge Maria Santos",
    },
    {
      id: "2024/0153",
      tipo: "CD",
      tipoDescricao: "Conselho de Disciplina",
      reu: "Cb. Francisco Eduardo",
      posto: "Cabo",
      unidade: "Batalhão 3211",
      crime: "Insubordinação",
      dataAbertura: "2024-11-20",
      status: "instrucao",
      fase: "Alegações",
      juiz: "Cap. Judge Ana Paula",
    },
    {
      id: "2024/0152",
      tipo: "IPM",
      tipoDescricao: "Inquérito Policial Militar",
      reu: "Sd. Pedro António",
      posto: "Soldado",
      unidade: "Hospital Militar",
      crime: "Fuga de Serviço",
      dataAbertura: "2024-11-15",
      status: "arquivado",
      fase: "Arquivado",
      juiz: "Ten. Cel. João Lima",
    },
    {
      id: "2024/0151",
      tipo: "PC",
      tipoDescricao: "Processo Crime",
      reu: "2º Sgt. José Maria",
      posto: "Segundo Sargento",
      unidade: "Região Militar Sul",
      crime: "Violência Contra Superior",
      dataAbertura: "2024-10-25",
      status: "sentenciado",
      fase: "Cumprimento de Pena",
      juiz: "Maj. Judge Carlos Manuel",
    },
  ];

  const tipos = [
    { value: "todos", label: "Todos os Tipos" },
    { value: "APF", label: "Autos de Prisão em Flagrante" },
    { value: "IPM", label: "Inquéritos Policiais Militares" },
    { value: "CD", label: "Conselhos de Disciplina" },
    { value: "PC", label: "Processos Crimes" },
  ];

  const status = [
    { value: "todos", label: "Todos os Status" },
    { value: "em_investigacao", label: "Em Investigação" },
    { value: "prisao", label: "Prisão" },
    { value: "instrucao", label: "Instrução" },
    { value: "audiencia", label: "Audiência" },
    { value: "sentenciado", label: "Sentenciado" },
    { value: "arquivado", label: "Arquivado" },
  ];

  const filteredProcessos = processos.filter((processo) => {
    const matchesSearch =
      processo.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      processo.reu.toLowerCase().includes(searchTerm.toLowerCase()) ||
      processo.crime.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = filterTipo === "todos" || processo.tipo === filterTipo;
    const matchesStatus =
      filterStatus === "todos" || processo.status === filterStatus;
    return matchesSearch && matchesTipo && matchesStatus;
  });

  const getTipoColor = (tipo: string) => {
    const colors: Record<string, string> = {
      APF: "bg-danger",
      IPM: "bg-warning",
      CD: "bg-info",
      PC: "bg-primary",
    };
    return colors[tipo] || "bg-secondary";
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      em_investigacao: "bg-warning",
      prisao: "bg-danger",
      instrucao: "bg-info",
      audiencia: "bg-primary",
      sentenciado: "bg-success",
      arquivado: "bg-secondary",
    };
    return colors[status] || "bg-secondary";
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      em_investigacao: "Em Investigação",
      prisao: "Prisão",
      instrucao: "Instrução",
      audiencia: "Audiência",
      sentenciado: "Sentenciado",
      arquivado: "Arquivado",
    };
    return labels[status] || status;
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Processos Judiciais</h2>
          <p className="text-muted mb-0">
            Gestão de processos da Justiça Militar
          </p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary">
            <i className="fa fa-file-pdf me-2"></i>
            Relatório
          </button>
          <button className="btn btn-primary">
            <i className="fa fa-plus me-2"></i>
            Novo Processo
          </button>
        </div>
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
              placeholder="Buscar por processo, réu ou crime..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
          >
            {tipos.map((tipo) => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {status.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2 text-end">
          <span className="text-muted">
            {filteredProcessos.length} processo(s)
          </span>
        </div>
      </div>

      {/* Tabela de Processos */}
      <div className="row">
        <div className="col-12">
          <Panel>
            <PanelHeader>
              <div className="d-flex justify-content-between align-items-center w-100">
                <span>Lista de Processos</span>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-success btn-sm">
                    <i className="fa fa-file-excel me-1"></i>
                    Excel
                  </button>
                  <button className="btn btn-outline-danger btn-sm">
                    <i className="fa fa-file-pdf me-1"></i>
                    PDF
                  </button>
                </div>
              </div>
            </PanelHeader>
            <PanelBody className="p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Nº Processo</th>
                      <th>Tipo</th>
                      <th>Réu</th>
                      <th>Crime</th>
                      <th>Fase</th>
                      <th>Status</th>
                      <th>Data</th>
                      <th>Juiz</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProcessos.map((processo) => (
                      <tr key={processo.id}>
                        <td>
                          <a
                            href={`/processos/detalhe/${processo.id}`}
                            className="text-primary fw-bold"
                          >
                            <i className="fa fa-file-alt me-1"></i>
                            {processo.id}
                          </a>
                        </td>
                        <td>
                          <span
                            className={`badge ${getTipoColor(processo.tipo)}`}
                          >
                            {processo.tipo}
                          </span>
                          <br />
                          <small className="text-muted">
                            {processo.tipoDescricao}
                          </small>
                        </td>
                        <td>
                          <strong>{processo.reu}</strong>
                          <br />
                          <small className="text-muted">
                            {processo.posto} - {processo.unidade}
                          </small>
                        </td>
                        <td>{processo.crime}</td>
                        <td>
                          <span className="badge bg-secondary">
                            {processo.fase}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${getStatusColor(processo.status)}`}
                          >
                            {getStatusLabel(processo.status)}
                          </span>
                        </td>
                        <td>{processo.dataAbertura}</td>
                        <td>{processo.juiz}</td>
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
                              className="btn btn-outline-success"
                              title="Audiência"
                            >
                              <i className="fa fa-balance-scale"></i>
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              title="Documentos"
                            >
                              <i className="fa fa-file-pdf"></i>
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
        <div className="col-md-2">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h6 className="card-title mb-1">Total</h6>
              <h4 className="mb-0">{processos.length}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card bg-warning text-white">
            <div className="card-body text-center">
              <h6 className="card-title mb-1">Em Investigação</h6>
              <h4 className="mb-0">
                {processos.filter((p) => p.status === "em_investigacao").length}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card bg-danger text-white">
            <div className="card-body text-center">
              <h6 className="card-title mb-1">Em Prisão</h6>
              <h4 className="mb-0">
                {processos.filter((p) => p.status === "prisao").length}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card bg-info text-white">
            <div className="card-body text-center">
              <h6 className="card-title mb-1">Em Audiência</h6>
              <h4 className="mb-0">
                {processos.filter((p) => p.status === "audiencia").length}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h6 className="card-title mb-1">Sentenciados</h6>
              <h4 className="mb-0">
                {processos.filter((p) => p.status === "sentenciado").length}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card bg-secondary text-white">
            <div className="card-body text-center">
              <h6 className="card-title mb-1">Arquivados</h6>
              <h4 className="mb-0">
                {processos.filter((p) => p.status === "arquivado").length}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
