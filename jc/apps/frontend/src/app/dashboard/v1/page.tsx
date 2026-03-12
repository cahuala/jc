"use client";
import { Panel, PanelHeader, PanelBody } from "@/components/panel/panel";
import React, { useState, useEffect } from "react";

export default function VisaoGeralPage() {
  const [horaAtual, setHoraAtual] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setHoraAtual(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const metricas = {
    processosAtivos: 156,
    audienciasHoje: 8,
    sentencasMes: 42,
    prisoesDecretadas: 12,
    inqueritosAndamento: 34,
    magistradosAtivos: 6,
    processosArquivados: 89,
    alertasUrgentes: 5,
  };

  const alertas = [
    {
      tipo: "urgente",
      mensagem: "Prazo vencendo: Processo #2024/0089 - Furto de Armamento",
      tempo: "2 horas",
    },
    {
      tipo: "aviso",
      mensagem: "Audiência confirmada: 14:00 - Réu: Sd. António Paulo",
      tempo: "1 hora",
    },
    {
      tipo: "info",
      mensagem: "Novo processo registrado: IPM #2024/0156",
      tempo: "30 min",
    },
  ];

  const statusProcessos = [
    { fase: "Autos de Prisão", quantidade: 23, status: "ativo" },
    { fase: "Inquéritos Policiais", quantidade: 34, status: "ativo" },
    { fase: "Processos Crimes", quantidade: 67, status: "ativo" },
    { fase: "Em Audiência", quantidade: 18, status: "em_andamento" },
    { fase: "Aguardando Sentença", quantidade: 14, status: "pendente" },
  ];

  const processosRecentes = [
    {
      id: "2024/0156",
      tipo: "IPM",
      reu: "Sd. João Mendes",
      crime: "Abandono de Posto",
      status: "em_investigacao",
      data: "10/01/2025",
    },
    {
      id: "2024/0155",
      tipo: "APF",
      reu: "Cb. Carlos António",
      crime: "Deserção",
      status: "prisao",
      data: "09/01/2025",
    },
    {
      id: "2024/0154",
      tipo: "PC",
      reu: "3º Sgt. Manuel Pedro",
      crime: "Furto Material Bélico",
      status: "audiencia",
      data: "08/01/2025",
    },
  ];

  const audienciasHoje = [
    {
      hora: "09:00",
      processo: "2024/0123",
      tipo: "Instrução",
      réu: "2º Sgt. Francisco",
      sala: "Sala 1",
    },
    {
      hora: "10:30",
      processo: "2024/0098",
      tipo: "Julgamento",
      réu: "Sd. António Zumba",
      sala: "Sala 2",
    },
    {
      hora: "14:00",
      processo: "2024/0145",
      tipo: "Oitiva",
      réu: "Cb. José Eduardo",
      sala: "Sala 1",
    },
    {
      hora: "16:00",
      processo: "2024/0087",
      tipo: "Sentença",
      réu: "1º Sgt. Maria Silva",
      sala: "Audiência Pública",
    },
  ];

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Dashboard - Sistema de Justiça Militar</h2>
          <p className="text-muted mb-0">
            Tribunal Militar - Painel Operacional
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="text-success">
            <i className="fa fa-circle me-1" style={{ fontSize: "8px" }}></i>
            Sistema Online
          </div>
          <div className="text-muted">
            <i className="fa fa-clock me-1"></i>
            {horaAtual.toLocaleTimeString("pt-AO")}
          </div>
          <div className="text-muted">
            <i className="fa fa-calendar me-1"></i>
            {horaAtual.toLocaleDateString("pt-AO")}
          </div>
        </div>
      </div>

      {/* Alertas Urgentes */}
      {alertas.length > 0 && (
        <div className="alert alert-danger alert-dismissible mb-4" role="alert">
          <div className="d-flex align-items-center">
            <i className="fa fa-exclamation-triangle me-2"></i>
            <div className="flex-grow-1">
              <strong>Alertas Urgentes ({alertas.length})</strong>
              <div className="mt-1">
                {alertas.slice(0, 2).map((alerta, index) => (
                  <div key={index} className="small">
                    <span
                      className={`badge me-2 ${
                        alerta.tipo === "urgente"
                          ? "bg-danger"
                          : alerta.tipo === "aviso"
                            ? "bg-warning"
                            : "bg-info"
                      }`}
                    >
                      {alerta.tipo.toUpperCase()}
                    </span>
                    {alerta.mensagem}{" "}
                    <span className="text-muted">({alerta.tempo})</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="btn btn-outline-danger btn-sm">
              <i className="fa fa-eye me-1"></i>
              Ver Todos
            </button>
          </div>
        </div>
      )}

      {/* Métricas Principais */}
      <div className="row mb-4">
        <div className="col-lg-2 col-md-4 col-sm-6">
          <div className="card bg-primary text-white">
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Processos Ativos</h6>
                  <h4 className="mb-0">{metricas.processosAtivos}</h4>
                  <small className="opacity-75">em tramitação</small>
                </div>
                <i className="fa fa-gavel fa-2x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-6">
          <div className="card bg-warning text-white">
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Audiências</h6>
                  <h4 className="mb-0">{metricas.audienciasHoje}</h4>
                  <small className="opacity-75">hoje</small>
                </div>
                <i className="fa fa-balance-scale fa-2x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-6">
          <div className="card bg-success text-white">
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Sentenças</h6>
                  <h4 className="mb-0">{metricas.sentencasMes}</h4>
                  <small className="opacity-75">este mês</small>
                </div>
                <i className="fa fa-file-signature fa-2x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-6">
          <div className="card bg-danger text-white">
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Prisões</h6>
                  <h4 className="mb-0">{metricas.prisoesDecretadas}</h4>
                  <small className="opacity-75">decretadas</small>
                </div>
                <i className="fa fa-user-lock fa-2x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-6">
          <div className="card bg-info text-white">
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Inquéritos</h6>
                  <h4 className="mb-0">{metricas.inqueritosAndamento}</h4>
                  <small className="opacity-75">em andamento</small>
                </div>
                <i className="fa fa-search fa-2x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-4 col-sm-6">
          <div className="card bg-secondary text-white">
            <div className="card-body p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Arquivados</h6>
                  <h4 className="mb-0">{metricas.processosArquivados}</h4>
                  <small className="opacity-75">total</small>
                </div>
                <i className="fa fa-archive fa-2x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status dos Processos */}
      <div className="row mb-4">
        <div className="col-12">
          <Panel>
            <PanelHeader>Situação dos Processos</PanelHeader>
            <PanelBody>
              <div className="row">
                {statusProcessos.map((fase, index) => (
                  <div key={index} className="col-md-2 text-center">
                    <div className="p-3 border rounded">
                      <h5 className="mb-1">{fase.quantidade}</h5>
                      <small className="text-muted">{fase.fase}</small>
                      <div className="mt-2">
                        <span
                          className={`badge ${
                            fase.status === "ativo"
                              ? "bg-primary"
                              : fase.status === "em_andamento"
                                ? "bg-warning"
                                : "bg-secondary"
                          }`}
                        >
                          {fase.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      <div className="row">
        {/* Processos Recentes */}
        <div className="col-lg-4">
          <Panel>
            <PanelHeader>
              <div className="d-flex justify-content-between align-items-center w-100">
                <span>Processos Recentes</span>
                <button className="btn btn-outline-primary btn-sm">
                  <i className="fa fa-plus me-1"></i>
                  Novo
                </button>
              </div>
            </PanelHeader>
            <PanelBody>
              {processosRecentes.length > 0 ? (
                <div className="list-group list-group-flush">
                  {processosRecentes.map((processo) => (
                    <div
                      key={processo.id}
                      className="list-group-item px-0 py-3"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">
                            <span className="badge bg-primary me-2">
                              {processo.id}
                            </span>
                            {processo.tipo}
                          </h6>
                          <p className="mb-1 text-muted">Réu: {processo.reu}</p>
                          <small className="text-muted">
                            <i className="fa fa-exclamation-circle me-1"></i>
                            {processo.crime}
                          </small>
                        </div>
                        <span
                          className={`badge ${
                            processo.status === "prisao"
                              ? "bg-danger"
                              : processo.status === "audiencia"
                                ? "bg-warning"
                                : "bg-info"
                          }`}
                        >
                          {processo.status.replace("_", " ")}
                        </span>
                      </div>
                      <small className="text-muted mt-2 d-block">
                        <i className="fa fa-calendar me-1"></i>
                        {processo.data}
                      </small>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted py-4">
                  <i className="fa fa-folder-open fa-3x mb-3"></i>
                  <p>Nenhum processo recente</p>
                </div>
              )}
            </PanelBody>
          </Panel>
        </div>

        {/* Audiências de Hoje */}
        <div className="col-lg-4">
          <Panel>
            <PanelHeader>
              <div className="d-flex justify-content-between align-items-center w-100">
                <span>Audiências de Hoje</span>
                <span className="badge bg-primary">
                  {audienciasHoje.length}
                </span>
              </div>
            </PanelHeader>
            <PanelBody>
              {audienciasHoje.length > 0 ? (
                <div className="list-group list-group-flush">
                  {audienciasHoje.map((audiencia, index) => (
                    <div key={index} className="list-group-item px-0 py-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">
                            <i className="fa fa-clock me-2 text-primary"></i>
                            {audiencia.hora}
                          </h6>
                          <p className="mb-1 text-muted">
                            <span className="badge bg-secondary me-2">
                              {audiencia.processo}
                            </span>
                            {audiencia.tipo}
                          </p>
                          <small className="text-info">
                            <i className="fa fa-user me-1"></i>
                            {audiencia.réu}
                          </small>
                        </div>
                        <div className="text-end">
                          <small className="text-muted d-block">
                            <i className="fa fa-door-open me-1"></i>
                            {audiencia.sala}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted py-4">
                  <i className="fa fa-calendar-times fa-3x mb-3"></i>
                  <p>Nenhuma audiência para hoje</p>
                </div>
              )}
            </PanelBody>
          </Panel>
        </div>

        {/* Distribuição por Crime */}
        <div className="col-lg-4">
          <Panel>
            <PanelHeader>Distribuição por Natureza de Crime</PanelHeader>
            <PanelBody>
              <div className="list-group list-group-flush">
                {[
                  {
                    crime: "Abandono de Posto",
                    quantidade: 23,
                    percentual: "15%",
                  },
                  { crime: "Deserção", quantidade: 18, percentual: "12%" },
                  {
                    crime: "Furto Material Bélico",
                    quantidade: 15,
                    percentual: "10%",
                  },
                  { crime: "Insubordinação", quantidade: 12, percentual: "8%" },
                  {
                    crime: "Violência Contra Superior",
                    quantidade: 8,
                    percentual: "5%",
                  },
                  { crime: "Outros", quantidade: 80, percentual: "50%" },
                ].map((item, index) => (
                  <div key={index} className="list-group-item px-0 py-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{item.crime}</h6>
                        <small className="text-muted">
                          {item.quantidade} processos
                        </small>
                      </div>
                      <div className="d-flex align-items-center">
                        <div
                          className="progress me-2"
                          style={{ width: "80px", height: "6px" }}
                        >
                          <div
                            className="progress-bar bg-primary"
                            style={{ width: item.percentual }}
                          ></div>
                        </div>
                        <small className="text-muted">{item.percentual}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      {/* Gráfico de Processos por Mês */}
      <div className="row mt-4">
        <div className="col-12">
          <Panel>
            <PanelHeader>Processos Registados nos Últimos 6 Meses</PanelHeader>
            <PanelBody>
              <div style={{ height: "300px", position: "relative" }}>
                <div
                  className="d-flex justify-content-center align-items-end gap-3"
                  style={{ height: "200px", marginTop: "50px" }}
                >
                  {[
                    { mes: "Ago", quantidade: 45 },
                    { mes: "Set", quantidade: 52 },
                    { mes: "Out", quantidade: 38 },
                    { mes: "Nov", quantidade: 61 },
                    { mes: "Dez", quantidade: 55 },
                    { mes: "Jan", quantidade: 48 },
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="bg-primary"
                        style={{
                          width: "40px",
                          height: `${(item.quantidade / 70) * 180}px`,
                          margin: "0 auto",
                          borderRadius: "4px 4px 0 0",
                        }}
                      ></div>
                      <small className="mt-2 d-block">{item.mes}</small>
                      <small className="text-muted">{item.quantidade}</small>
                    </div>
                  ))}
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>
    </div>
  );
}
