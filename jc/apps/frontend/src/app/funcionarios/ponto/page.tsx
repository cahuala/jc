'use client';

import { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import PontoTable from '@/components/funcionarios/PontoTable';
import PontoModal from '@/components/funcionarios/PontoModal';

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

const registrosPonto: RegistroPonto[] = [
  {
    id: '1',
    funcionario: 'António Silva',
    data: '2024-02-20',
    entrada: '08:00',
    saidaAlmoco: '12:00',
    voltaAlmoco: '13:00',
    saida: '17:00',
    horasTrabalhadas: 8,
    status: 'presente'
  },
  {
    id: '2',
    funcionario: 'Maria Santos',
    data: '2024-02-20',
    entrada: '08:15',
    saidaAlmoco: '12:00',
    voltaAlmoco: '13:00',
    saida: '17:00',
    horasTrabalhadas: 7.75,
    status: 'atrasado',
    observacoes: 'Atraso de 15 minutos'
  },
  {
    id: '3',
    funcionario: 'Carlos Mendes',
    data: '2024-02-20',
    entrada: '07:45',
    saidaAlmoco: '12:00',
    voltaAlmoco: '13:00',
    saida: '17:30',
    horasTrabalhadas: 8.75,
    status: 'presente'
  },
  {
    id: '4',
    funcionario: 'Ana Costa',
    data: '2024-02-20',
    entrada: '08:00',
    saidaAlmoco: '12:00',
    voltaAlmoco: '13:00',
    horasTrabalhadas: 4,
    status: 'incompleto'
  },
  {
    id: '5',
    funcionario: 'Pedro Oliveira',
    data: '2024-02-20',
    horasTrabalhadas: 0,
    status: 'ausente',
    observacoes: 'Falta justificada'
  },
  {
    id: '6',
    funcionario: 'António Silva',
    data: '2024-02-19',
    entrada: '08:00',
    saidaAlmoco: '12:00',
    voltaAlmoco: '13:00',
    saida: '17:00',
    horasTrabalhadas: 8,
    status: 'presente'
  },
  {
    id: '7',
    funcionario: 'Maria Santos',
    data: '2024-02-19',
    entrada: '08:00',
    saidaAlmoco: '12:00',
    voltaAlmoco: '13:00',
    saida: '17:00',
    horasTrabalhadas: 8,
    status: 'presente'
  }
];

export default function PontoPage() {
  const [registros, setRegistros] = useState<RegistroPonto[]>(registrosPonto);
  const [showModal, setShowModal] = useState(false);
  const [selectedRegistro, setSelectedRegistro] = useState<RegistroPonto | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterData, setFilterData] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  const hoje = new Date().toISOString().split('T')[0];
  const registrosHoje = registros.filter(r => r.data === hoje);
  const presentes = registrosHoje.filter(r => r.status === 'presente' || r.status === 'atrasado').length;
  const atrasados = registrosHoje.filter(r => r.status === 'atrasado').length;
  const ausentes = registrosHoje.filter(r => r.status === 'ausente').length;
  const mediaHoras = registrosHoje.length > 0 ? 
    registrosHoje.reduce((sum, r) => sum + r.horasTrabalhadas, 0) / registrosHoje.length : 0;

  const handleEdit = (registro: RegistroPonto) => {
    setSelectedRegistro(registro);
    setShowModal(true);
  };

  const handleSave = (registroData: any) => {
    if (selectedRegistro) {
      setRegistros(prev => prev.map(r => 
        r.id === selectedRegistro.id ? { ...r, ...registroData } : r
      ));
    } else {
      const newRegistro: RegistroPonto = {
        id: Date.now().toString(),
        ...registroData
      };
      setRegistros(prev => [...prev, newRegistro]);
    }
    setShowModal(false);
    setSelectedRegistro(null);
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Ponto Eletrônico</h2>
          <p className="text-muted mb-0">Controle de entrada e saída dos funcionários</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setSelectedRegistro(null);
            setShowModal(true);
          }}
        >
          <i className="fa fa-plus me-2"></i>
          Registrar Ponto
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Presentes Hoje</h6>
                  <h3 className="mb-0">{presentes}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-user-check fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Atrasados</h6>
                  <h3 className="mb-0">{atrasados}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-clock fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Ausentes</h6>
                  <h3 className="mb-0">{ausentes}</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-user-times fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title">Média de Horas</h6>
                  <h3 className="mb-0">{mediaHoras.toFixed(1)}h</h3>
                </div>
                <div className="align-self-center">
                  <i className="fa fa-chart-line fa-2x opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PontoTable 
        registros={registros}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterData={filterData}
        setFilterData={setFilterData}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onEdit={handleEdit}
      />

      {showModal && (
        <PontoModal
          registro={selectedRegistro}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setSelectedRegistro(null);
          }}
        />
      )}
    </div>
  );
}