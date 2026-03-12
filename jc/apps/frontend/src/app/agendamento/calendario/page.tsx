'use client';
import { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import AgendamentoEditModal from '@/components/agendamento/AgendamentoEditModal';
import React from 'react';

interface AgendamentoCalendario {
  id: number;
  cliente: string;
  servico: string;
  data: string;
  hora: string;
  status: string;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
}

export default function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState<AgendamentoCalendario[]>([]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [prefilledDate, setPrefilledDate] = useState<string>('');

  const agendamentos: AgendamentoCalendario[] = [
    { id: 1, cliente: 'João Silva', servico: 'Revisão', data: '2024-01-20', hora: '09:00', status: 'confirmado' },
    { id: 2, cliente: 'Maria Santos', servico: 'Troca de Pneus', data: '2024-01-20', hora: '14:00', status: 'pendente' },
    { id: 3, cliente: 'Pedro Costa', servico: 'Diagnóstico', data: '2024-01-21', hora: '10:30', status: 'em_andamento' },
    { id: 4, cliente: 'Ana Costa', servico: 'Alinhamento', data: new Date().toISOString().split('T')[0], hora: '11:00', status: 'confirmado' },
    { id: 5, cliente: 'Carlos Lima', servico: 'Balanceamento', data: new Date().toISOString().split('T')[0], hora: '15:30', status: 'pendente' }
  ];

  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Dias do mês anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({ date, isCurrentMonth: true });
    }
    
    // Completar com dias do próximo mês
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const getAgendamentosForDate = (date: Date): AgendamentoCalendario[] => {
    const dateStr = date.toISOString().split('T')[0];
    return agendamentos.filter(ag => ag.data === dateStr);
  };

  const navigateMonth = (direction: number): void => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'confirmado': return 'bg-success';
      case 'pendente': return 'bg-warning';
      case 'em_andamento': return 'bg-info';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Calendário de Agendamentos</h2>
          <p className="text-muted mb-0">Visualize os agendamentos por data</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowNewModal(true)}>
          <i className="fa fa-plus me-2"></i>
          Novo Agendamento
        </button>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <Panel>
            <PanelHeader>
              <div className="d-flex justify-content-between align-items-center w-100">
                <button 
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigateMonth(-1)}
                >
                  <i className="fa fa-chevron-left"></i>
                </button>
                <h5 className="mb-0">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h5>
                <button 
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigateMonth(1)}
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
            </PanelHeader>
            <PanelBody>
              <div className="calendar-grid">
                <div className="row text-center fw-bold border-bottom pb-2 mb-2">
                  <div className="col">Dom</div>
                  <div className="col">Seg</div>
                  <div className="col">Ter</div>
                  <div className="col">Qua</div>
                  <div className="col">Qui</div>
                  <div className="col">Sex</div>
                  <div className="col">Sáb</div>
                </div>
                
                {Array.from({ length: Math.ceil(days.length / 7) }, (_, weekIndex) => (
                  <div key={weekIndex} className="row mb-2">
                    {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => {
                      const dayAgendamentos = getAgendamentosForDate(day.date);
                      const isToday = day.date.toDateString() === new Date().toDateString();
                      
                      return (
                        <div key={dayIndex} className="col p-1">
                          <div 
                            className={`calendar-day border rounded p-2 ${
                              !day.isCurrentMonth ? 'text-muted bg-light' : 'bg-white'
                            } ${isToday ? 'border-primary bg-primary bg-opacity-10' : ''} ${
                              selectedDate?.toDateString() === day.date.toDateString() ? 'border-success border-2 bg-success bg-opacity-10' : ''
                            }`}
                            style={{ minHeight: '80px', cursor: 'pointer' }}
                            onClick={() => {
                              setSelectedDate(day.date);
                              const dayEvents = getAgendamentosForDate(day.date);
                              setSelectedDayEvents(dayEvents);
                              if (dayEvents.length > 0) {
                                setShowEventModal(true);
                              } else {
                                const year = day.date.getFullYear();
                                const month = String(day.date.getMonth() + 1).padStart(2, '0');
                                const dayNum = String(day.date.getDate()).padStart(2, '0');
                                setPrefilledDate(`${year}-${month}-${dayNum}`);
                                setShowNewModal(true);
                              }
                            }}
                          >
                            <div className="fw-bold mb-1">{day.date.getDate()}</div>
                            {dayAgendamentos.map((ag, index) => (
                              <div 
                                key={ag.id}
                                className={`badge ${getStatusColor(ag.status)} text-white d-block mb-1 text-truncate`}
                                style={{ fontSize: '0.7rem' }}
                                title={`${ag.hora} - ${ag.cliente}`}
                              >
                                {ag.hora} {ag.cliente}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </PanelBody>
          </Panel>
        </div>

        <div className="col-lg-4">
          <Panel>
            <PanelHeader>
              Agendamentos de Hoje
            </PanelHeader>
            <PanelBody>
              {getAgendamentosForDate(new Date()).length > 0 ? (
                <div className="list-group list-group-flush">
                  {getAgendamentosForDate(new Date()).map((ag) => (
                    <div key={ag.id} className="list-group-item px-0">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{ag.cliente}</h6>
                          <p className="mb-1 text-muted">{ag.servico}</p>
                          <small className="text-muted">{ag.hora}</small>
                        </div>
                        <span className={`badge ${getStatusColor(ag.status)}`}>
                          {ag.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted py-4">
                  <i className="fa fa-calendar-times fa-3x mb-3"></i>
                  <p>Nenhum agendamento para hoje</p>
                </div>
              )}
            </PanelBody>
          </Panel>

          <Panel className="mt-4">
            <PanelHeader>
              Resumo do Mês
            </PanelHeader>
            <PanelBody>
              <div className="row text-center">
                <div className="col-6 mb-3">
                  <div className="card bg-primary text-white">
                    <div className="card-body py-2">
                      <h5 className="mb-0">12</h5>
                      <small>Total</small>
                    </div>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="card bg-success text-white">
                    <div className="card-body py-2">
                      <h5 className="mb-0">8</h5>
                      <small>Confirmados</small>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card bg-warning text-white">
                    <div className="card-body py-2">
                      <h5 className="mb-0">3</h5>
                      <small>Pendentes</small>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card bg-info text-white">
                    <div className="card-body py-2">
                      <h5 className="mb-0">1</h5>
                      <small>Em Andamento</small>
                    </div>
                  </div>
                </div>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>

      {showEventModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="fa fa-calendar-day me-2"></i>
                  Agendamentos - {selectedDate?.toLocaleDateString('pt-AO')}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowEventModal(false)}></button>
              </div>
              <div className="modal-body">
                {selectedDayEvents.map((ag) => (
                  <div key={ag.id} className="border-bottom pb-2 mb-2">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="mb-1">{ag.cliente}</h6>
                        <p className="mb-1 text-muted">{ag.servico}</p>
                        <small className="text-muted">
                          <i className="fa fa-clock me-1"></i>
                          {ag.hora}
                        </small>
                      </div>
                      <span className={`badge ${getStatusColor(ag.status)}`}>
                        {ag.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEventModal(false)}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNewModal && (
        <AgendamentoEditModal
          agendamento={prefilledDate ? {
            id: 0,
            cliente: '',
            veiculo: '',
            servico: '',
            data: prefilledDate,
            hora: '09:00',
            mecanico: '',
            status: 'pendente',
            observacoes: ''
          } : null}
          onSave={(agendamento) => {
            console.log('Novo agendamento:', agendamento);
            setShowNewModal(false);
            setPrefilledDate('');
          }}
          onClose={() => {
            setShowNewModal(false);
            setPrefilledDate('');
          }}
        />
      )}
    </div>
  );
}