import React from 'react';
import { Panel, PanelBody } from '@/components/panel/panel';

interface OrdemServico {
  id: number;
  status: string;
  prioridade: string;
  valorTotal: number;
  dataAbertura: string;
}

interface OrdemServicoStatsProps {
  ordens: OrdemServico[];
}

export default function OrdemServicoStats({ ordens }: OrdemServicoStatsProps) {
  const stats = {
    total: ordens.length,
    aguardando: ordens.filter(o => o.status === 'aguardando').length,
    emAndamento: ordens.filter(o => o.status === 'em_andamento').length,
    concluidas: ordens.filter(o => o.status === 'concluido').length,
    canceladas: ordens.filter(o => o.status === 'cancelado').length,
    altaPrioridade: ordens.filter(o => o.prioridade === 'alta').length,
    valorTotal: ordens.filter(o => o.status !== 'cancelado').reduce((sum, o) => sum + o.valorTotal, 0),
    hoje: ordens.filter(o => {
      const hoje = new Date().toDateString();
      const dataOrdem = new Date(o.dataAbertura).toDateString();
      return hoje === dataOrdem;
    }).length
  };

  return (
    <div className="row mb-4">
      <div className="col-xl-3 col-md-6">
        <Panel className="mb-3">
          <PanelBody>
            <div className="d-flex align-items-center">
              <div className="flex-fill">
                <div className="d-flex align-items-center mb-1">
                  <h4 className="mb-0">{stats.total}</h4>
                  <span className="badge bg-primary ms-2 fs-10px">
                    Total
                  </span>
                </div>
                <div className="text-muted fs-13px">Ordens de Serviço</div>
                <div className="progress mt-2" style={{height: '4px'}}>
                  <div className="progress-bar bg-primary" style={{width: '100%'}}></div>
                </div>
              </div>
              <div className="w-50px h-50px bg-primary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center">
                <i className="fa fa-clipboard-list text-primary"></i>
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
                  <h4 className="mb-0 text-warning">{stats.emAndamento}</h4>
                  <span className="badge bg-warning ms-2 fs-10px">
                    Ativas
                  </span>
                </div>
                <div className="text-muted fs-13px">Em Andamento</div>
                <div className="progress mt-2" style={{height: '4px'}}>
                  <div className="progress-bar bg-warning" style={{width: `${(stats.emAndamento / stats.total) * 100}%`}}></div>
                </div>
              </div>
              <div className="w-50px h-50px bg-warning bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center">
                <i className="fa fa-cog fa-spin text-warning"></i>
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
                  <h4 className="mb-0 text-success">{stats.concluidas}</h4>
                  <span className="badge bg-success ms-2 fs-10px">
                    Finalizadas
                  </span>
                </div>
                <div className="text-muted fs-13px">Concluídas</div>
                <div className="progress mt-2" style={{height: '4px'}}>
                  <div className="progress-bar bg-success" style={{width: `${(stats.concluidas / stats.total) * 100}%`}}></div>
                </div>
              </div>
              <div className="w-50px h-50px bg-success bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center">
                <i className="fa fa-check-circle text-success"></i>
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
                  <h4 className="mb-0 text-info">R$ {stats.valorTotal.toLocaleString()}</h4>
                  <span className="badge bg-info ms-2 fs-10px">
                    {stats.hoje} hoje
                  </span>
                </div>
                <div className="text-muted fs-13px">Valor Total</div>
                <div className="progress mt-2" style={{height: '4px'}}>
                  <div className="progress-bar bg-info" style={{width: '85%'}}></div>
                </div>
              </div>
              <div className="w-50px h-50px bg-info bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center">
                <i className="fa fa-dollar-sign text-info"></i>
              </div>
            </div>
          </PanelBody>
        </Panel>
      </div>
    </div>
  );
}