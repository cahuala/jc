'use client';
import { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import React from 'react';

interface FormData {
  cliente: string;
  veiculo: string;
  servico: string;
  data: string;
  hora: string;
  mecanico: string;
  observacoes: string;
}

interface Cliente {
  id: number;
  nome: string;
  veiculos: string[];
}

export default function NovoAgendamentoPage() {
  const [formData, setFormData] = useState<FormData>({
    cliente: '',
    veiculo: '',
    servico: '',
    data: '',
    hora: '',
    mecanico: '',
    observacoes: ''
  });

  const clientes: Cliente[] = [
    { id: 1, nome: 'João Silva', veiculos: ['Toyota Corolla - ABC-1234', 'Honda Civic - XYZ-5678'] },
    { id: 2, nome: 'Maria Santos', veiculos: ['Nissan Sentra - DEF-9012'] },
    { id: 3, nome: 'Pedro Costa', veiculos: ['Ford Focus - GHI-3456'] }
  ];

  const servicos = [
    'Revisão Completa',
    'Troca de Óleo',
    'Alinhamento e Balanceamento',
    'Troca de Pneus',
    'Diagnóstico Elétrico',
    'Reparo de Freios',
    'Troca de Filtros',
    'Inspeção Geral'
  ];

  const mecanicos = [
    'António Mendes',
    'Manuel Costa',
    'José Ferreira',
    'Carlos Silva'
  ];

  const horariosDisponiveis = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log('Agendamento criado:', formData);
    alert('Agendamento criado com sucesso!');
  };

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clienteSelecionado = clientes.find(c => c.nome === formData.cliente);

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Novo Agendamento</h2>
          <p className="text-muted mb-0">Crie um novo agendamento para a oficina</p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <Panel>
            <PanelHeader>Dados do Agendamento</PanelHeader>
            <PanelBody>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Cliente *</label>
                    <select 
                      className="form-select"
                      value={formData.cliente}
                      onChange={(e) => handleInputChange('cliente', e.target.value)}
                      required
                    >
                      <option value="">Selecione o cliente</option>
                      {clientes.map(cliente => (
                        <option key={cliente.id} value={cliente.nome}>
                          {cliente.nome}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Veículo *</label>
                    <select 
                      className="form-select"
                      value={formData.veiculo}
                      onChange={(e) => handleInputChange('veiculo', e.target.value)}
                      disabled={!clienteSelecionado}
                      required
                    >
                      <option value="">Selecione o veículo</option>
                      {clienteSelecionado?.veiculos.map((veiculo, index) => (
                        <option key={index} value={veiculo}>
                          {veiculo}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Serviço *</label>
                    <select 
                      className="form-select"
                      value={formData.servico}
                      onChange={(e) => handleInputChange('servico', e.target.value)}
                      required
                    >
                      <option value="">Selecione o serviço</option>
                      {servicos.map(servico => (
                        <option key={servico} value={servico}>
                          {servico}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Mecânico *</label>
                    <select 
                      className="form-select"
                      value={formData.mecanico}
                      onChange={(e) => handleInputChange('mecanico', e.target.value)}
                      required
                    >
                      <option value="">Selecione o mecânico</option>
                      {mecanicos.map(mecanico => (
                        <option key={mecanico} value={mecanico}>
                          {mecanico}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Data *</label>
                    <input 
                      type="date"
                      className="form-control"
                      value={formData.data}
                      onChange={(e) => handleInputChange('data', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Horário *</label>
                    <select 
                      className="form-select"
                      value={formData.hora}
                      onChange={(e) => handleInputChange('hora', e.target.value)}
                      required
                    >
                      <option value="">Selecione o horário</option>
                      {horariosDisponiveis.map(hora => (
                        <option key={hora} value={hora}>
                          {hora}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label">Observações</label>
                    <textarea 
                      className="form-control"
                      rows={3}
                      value={formData.observacoes}
                      onChange={(e) => handleInputChange('observacoes', e.target.value)}
                      placeholder="Observações adicionais sobre o agendamento..."
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-secondary">
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="fa fa-save me-2"></i>
                    Criar Agendamento
                  </button>
                </div>
              </form>
            </PanelBody>
          </Panel>
        </div>

        <div className="col-lg-4">
          <Panel>
            <PanelHeader>Preview do Agendamento</PanelHeader>
            <PanelBody>
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">
                    <i className="fa fa-calendar me-2 text-primary"></i>
                    Resumo do Agendamento
                  </h6>
                  
                  <div className="mb-2">
                    <strong>Cliente:</strong>
                    <div className="text-muted">{formData.cliente || 'Não selecionado'}</div>
                  </div>
                  
                  <div className="mb-2">
                    <strong>Veículo:</strong>
                    <div className="text-muted">{formData.veiculo || 'Não selecionado'}</div>
                  </div>
                  
                  <div className="mb-2">
                    <strong>Serviço:</strong>
                    <div className="text-muted">{formData.servico || 'Não selecionado'}</div>
                  </div>
                  
                  <div className="mb-2">
                    <strong>Mecânico:</strong>
                    <div className="text-muted">{formData.mecanico || 'Não selecionado'}</div>
                  </div>
                  
                  <div className="mb-2">
                    <strong>Data e Hora:</strong>
                    <div className="text-muted">
                      {formData.data && formData.hora 
                        ? `${new Date(formData.data).toLocaleDateString('pt-AO')} às ${formData.hora}`
                        : 'Não definido'
                      }
                    </div>
                  </div>
                  
                  {formData.observacoes && (
                    <div className="mb-2">
                      <strong>Observações:</strong>
                      <div className="text-muted">{formData.observacoes}</div>
                    </div>
                  )}
                </div>
              </div>
            </PanelBody>
          </Panel>

          <Panel className="mt-4">
            <PanelHeader>Horários Disponíveis</PanelHeader>
            <PanelBody>
              <div className="text-center text-muted">
                <i className="fa fa-clock fa-2x mb-2"></i>
                <p className="mb-0">Selecione uma data para ver os horários disponíveis</p>
              </div>
            </PanelBody>
          </Panel>
        </div>
      </div>
    </div>
  );
}