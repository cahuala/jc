import React from 'react';
import { Panel, PanelBody } from '@/components/panel/panel';

interface Peca {
  nome: string;
  quantidade: number;
  valor: number;
}

interface ServicoHistorico {
  id: number;
  valor: number;
  status: string;
  tempoServico: number;
  satisfacao: number;
  custoTotal: number;
  lucro: number;
  pecasUsadas: Peca[];
}

interface ServicoHistoricoStatsProps {
  servicos: ServicoHistorico[];
}

export default function ServicoHistoricoStats({ servicos }: ServicoHistoricoStatsProps) {
  const stats = {
    totalServicos: servicos.length,
    faturamentoTotal: servicos.reduce((sum, s) => sum + s.valor, 0),
    custoTotal: servicos.reduce((sum, s) => sum + s.custoTotal, 0),
    lucroTotal: servicos.reduce((sum, s) => sum + s.lucro, 0),
    tempoMedio: servicos.length > 0 
      ? Math.round(servicos.reduce((sum, s) => sum + s.tempoServico, 0) / servicos.length)
      : 0,
    satisfacaoMedia: servicos.length > 0 
      ? (servicos.reduce((sum, s) => sum + s.satisfacao, 0) / servicos.length).toFixed(1)
      : '0',
    ticketMedio: servicos.length > 0 
      ? servicos.reduce((sum, s) => sum + s.valor, 0) / servicos.length
      : 0,
    margemLucro: servicos.reduce((sum, s) => sum + s.valor, 0) > 0
      ? ((servicos.reduce((sum, s) => sum + s.lucro, 0) / servicos.reduce((sum, s) => sum + s.valor, 0)) * 100).toFixed(1)
      : '0'
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  return (
    <div className="row mb-4">
      <div className="col-xl-3 col-md-6">
        <Panel className="mb-3">
          <PanelBody>
            <div className="d-flex align-items-center">
              <div className="flex-fill">
                <div className="d-flex align-items-center mb-1">
                  <h4 className="mb-0">{stats.totalServicos}</h4>
                  <span className="badge bg-success ms-2 fs-10px">
                    <i className="fa fa-arrow-up"></i>
                  </span>
                </div>
                <div className="text-muted fs-13px">Total de Serviços</div>
              </div>
              <div className="w-50px h-50px bg-primary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center">
                <i className="fa fa-wrench text-primary"></i>
              </div>
            </div>
          </PanelBody>
        </Panel>
      </div>
      
      <div className="col-xl-3 col-md-6">
        <Panel className="mb-3">
          <PanelBody>
            <div className="d-flex align-items-center">
              <div className="flex-fill">
                <div className="d-flex align-items-center mb-1">
                  <h4 className="mb-0 text-success">R$ {stats.faturamentoTotal.toLocaleString()}</h4>
                </div>
                <div className="text-muted fs-13px">Faturamento Total</div>
                <div className="progress mt-2" style={{height: '4px'}}>
                  <div className="progress-bar bg-success" style={{width: '85%'}}></div>
                </div>
              </div>
              <div className="w-50px h-50px bg-success bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center">
                <i className="fa fa-dollar-sign text-success"></i>
              </div>
            </div>
          </PanelBody>
        </Panel>
      </div>
      
      <div className="col-xl-3 col-md-6">
        <Panel className="mb-3">
          <PanelBody>
            <div className="d-flex align-items-center">
              <div className="flex-fill">
                <div className="d-flex align-items-center mb-1">
                  <h4 className="mb-0 text-warning">R$ {stats.lucroTotal.toLocaleString()}</h4>
                  <span className="badge bg-warning ms-2 fs-10px">
                    {stats.margemLucro}%
                  </span>
                </div>
                <div className="text-muted fs-13px">Lucro Total</div>
                <div className="progress mt-2" style={{height: '4px'}}>
                  <div className="progress-bar bg-warning" style={{width: `${stats.margemLucro}%`}}></div>
                </div>
              </div>
              <div className="w-50px h-50px bg-warning bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center">
                <i className="fa fa-chart-line text-warning"></i>
              </div>
            </div>
          </PanelBody>
        </Panel>
      </div>
      
      <div className="col-xl-3 col-md-6">
        <Panel className="mb-3">
          <PanelBody>
            <div className="d-flex align-items-center">
              <div className="flex-fill">
                <div className="d-flex align-items-center mb-1">
                  <h4 className="mb-0 text-info">{formatTime(stats.tempoMedio)}</h4>
                  <span className="badge bg-info ms-2 fs-10px">
                    <i className="fa fa-star"></i> {stats.satisfacaoMedia}
                  </span>
                </div>
                <div className="text-muted fs-13px">Tempo Médio</div>
                <div className="progress mt-2" style={{height: '4px'}}>
                  <div className="progress-bar bg-info" style={{width: '70%'}}></div>
                </div>
              </div>
              <div className="w-50px h-50px bg-info bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center">
                <i className="fa fa-clock text-info"></i>
              </div>
            </div>
          </PanelBody>
        </Panel>
      </div>
    </div>
  );
}