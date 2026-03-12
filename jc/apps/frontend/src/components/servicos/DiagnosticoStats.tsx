import React from 'react';
import { Panel, PanelBody } from '@/components/panel/panel';

interface Diagnostico {
  id: number;
  status: string;
  prioridade: string;
  custoEstimado: number;
}

interface DiagnosticoStatsProps {
  diagnosticos: Diagnostico[];
}

export default function DiagnosticoStats({ diagnosticos }: DiagnosticoStatsProps) {
  const stats = {
    total: diagnosticos.length,
    emAndamento: diagnosticos.filter(d => d.status === 'em_andamento').length,
    concluidos: diagnosticos.filter(d => d.status === 'concluido').length,
    aguardando: diagnosticos.filter(d => d.status === 'aguardando').length,
    altaPrioridade: diagnosticos.filter(d => d.prioridade === 'alta').length,
    custoTotal: diagnosticos.reduce((sum, d) => sum + d.custoEstimado, 0)
  };

  return (
    <div className="row mb-4">
      <div className="col-xl-2 col-md-4 col-6">
        <Panel className="mb-3">
          <PanelBody className="text-center">
            <div className="display-6 text-primary fw-bold">{stats.total}</div>
            <div className="text-muted small">Total</div>
          </PanelBody>
        </Panel>
      </div>
      <div className="col-xl-2 col-md-4 col-6">
        <Panel className="mb-3">
          <PanelBody className="text-center">
            <div className="display-6 text-warning fw-bold">{stats.emAndamento}</div>
            <div className="text-muted small">Em Andamento</div>
          </PanelBody>
        </Panel>
      </div>
      <div className="col-xl-2 col-md-4 col-6">
        <Panel className="mb-3">
          <PanelBody className="text-center">
            <div className="display-6 text-success fw-bold">{stats.concluidos}</div>
            <div className="text-muted small">Concluídos</div>
          </PanelBody>
        </Panel>
      </div>
      <div className="col-xl-2 col-md-4 col-6">
        <Panel className="mb-3">
          <PanelBody className="text-center">
            <div className="display-6 text-secondary fw-bold">{stats.aguardando}</div>
            <div className="text-muted small">Aguardando</div>
          </PanelBody>
        </Panel>
      </div>
      <div className="col-xl-2 col-md-4 col-6">
        <Panel className="mb-3">
          <PanelBody className="text-center">
            <div className="display-6 text-danger fw-bold">{stats.altaPrioridade}</div>
            <div className="text-muted small">Alta Prioridade</div>
          </PanelBody>
        </Panel>
      </div>
      <div className="col-xl-2 col-md-4 col-6">
        <Panel className="mb-3">
          <PanelBody className="text-center">
            <div className="display-6 text-success fw-bold">
              R$ {stats.custoTotal.toLocaleString()}
            </div>
            <div className="text-muted small">Valor Total</div>
          </PanelBody>
        </Panel>
      </div>
    </div>
  );
}