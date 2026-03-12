import React, { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

interface RegistroPonto {
  id: string;
  funcionario: string;
  data: string;
  entrada: string;
  saidaAlmoco?: string;
  voltaAlmoco?: string;
  saida?: string;
  horasTrabalhadas: number;
  status: 'presente' | 'ausente' | 'atrasado' | 'incompleto';
  observacoes?: string;
}

interface PontoTableProps {
  registros: RegistroPonto[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterData: string;
  setFilterData: (data: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  onEdit: (registro: RegistroPonto) => void;
}

export default function PontoTable({ 
  registros, 
  searchTerm, 
  setSearchTerm, 
  filterData, 
  setFilterData,
  filterStatus,
  setFilterStatus,
  onEdit 
}: PontoTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'presente':
        return <span className="badge bg-success">Presente</span>;
      case 'atrasado':
        return <span className="badge bg-warning">Atrasado</span>;
      case 'ausente':
        return <span className="badge bg-danger">Ausente</span>;
      case 'incompleto':
        return <span className="badge bg-secondary">Incompleto</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const formatTime = (time?: string) => {
    return time || '--:--';
  };

  const calcularHoras = (entrada?: string, saida?: string, saidaAlmoco?: string, voltaAlmoco?: string) => {
    if (!entrada || !saida) return 0;
    
    const [entradaH, entradaM] = entrada.split(':').map(Number);
    const [saidaH, saidaM] = saida.split(':').map(Number);
    
    let totalMinutos = (saidaH * 60 + saidaM) - (entradaH * 60 + entradaM);
    
    if (saidaAlmoco && voltaAlmoco) {
      const [saidaAlmocoH, saidaAlmocoM] = saidaAlmoco.split(':').map(Number);
      const [voltaAlmocoH, voltaAlmocoM] = voltaAlmoco.split(':').map(Number);
      const almocoMinutos = (voltaAlmocoH * 60 + voltaAlmocoM) - (saidaAlmocoH * 60 + saidaAlmocoM);
      totalMinutos -= almocoMinutos;
    }
    
    return totalMinutos / 60;
  };

  // Filtrar registros
  const filteredRegistros = registros.filter(registro => {
    const matchesSearch = registro.funcionario.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesData = !filterData || registro.data === filterData;
    const matchesStatus = filterStatus === 'todos' || registro.status === filterStatus;
    
    return matchesSearch && matchesData && matchesStatus;
  });

  // Paginação
  const totalPages = Math.ceil(filteredRegistros.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRegistros = filteredRegistros.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Panel>
      <PanelHeader>
        <div className="d-flex justify-content-between align-items-center w-100">
          <span>Registros de Ponto</span>
          <div className="d-flex gap-2">
            <select 
              className="form-select form-select-sm" 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{width: '120px'}}
            >
              <option value="todos">Todos</option>
              <option value="presente">Presente</option>
              <option value="atrasado">Atrasado</option>
              <option value="ausente">Ausente</option>
              <option value="incompleto">Incompleto</option>
            </select>
            <input
              type="date"
              className="form-control form-control-sm"
              value={filterData}
              onChange={(e) => setFilterData(e.target.value)}
              style={{width: '150px'}}
            />
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar funcionário..."
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
                <th>Funcionário</th>
                <th>Data</th>
                <th>Entrada</th>
                <th>Saída Almoço</th>
                <th>Volta Almoço</th>
                <th>Saída</th>
                <th>Horas</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRegistros.map((registro) => (
                <tr key={registro.id}>
                  <td>
                    <div>
                      <strong>{registro.funcionario}</strong>
                      {registro.observacoes && (
                        <div className="small text-muted">
                          {registro.observacoes}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <span>{new Date(registro.data).toLocaleDateString('pt-AO')}</span>
                  </td>
                  <td>
                    <span className={registro.entrada && registro.entrada > '08:00' ? 'text-warning' : 'text-success'}>
                      {formatTime(registro.entrada)}
                    </span>
                  </td>
                  <td>
                    <span className="text-muted">{formatTime(registro.saidaAlmoco)}</span>
                  </td>
                  <td>
                    <span className="text-muted">{formatTime(registro.voltaAlmoco)}</span>
                  </td>
                  <td>
                    <span className={registro.saida && registro.saida < '17:00' ? 'text-warning' : 'text-success'}>
                      {formatTime(registro.saida)}
                    </span>
                  </td>
                  <td>
                    <strong className={registro.horasTrabalhadas < 8 ? 'text-danger' : 'text-success'}>
                      {registro.horasTrabalhadas.toFixed(1)}h
                    </strong>
                  </td>
                  <td>
                    {getStatusBadge(registro.status)}
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => onEdit(registro)}
                        title="Editar"
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-outline-info"
                        title="Relatório"
                      >
                        <i className="fa fa-file-alt"></i>
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
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredRegistros.length)} de {filteredRegistros.length} registros
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