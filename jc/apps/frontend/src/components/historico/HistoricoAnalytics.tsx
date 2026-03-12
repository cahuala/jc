import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

interface HistoricoAnalyticsProps {
	filteredServicos: any[];
	totalReceita: number;
	servicosConcluidos: number;
}

export default function HistoricoAnalytics({ filteredServicos, totalReceita, servicosConcluidos }: HistoricoAnalyticsProps) {
	return (
		<div className="row mt-4">
			<div className="col-xl-4">
				<Panel>
					<PanelHeader>Mecânicos Performance</PanelHeader>
					<PanelBody>
						<div className="mb-3">
							<div className="d-flex justify-content-between">
								<span>António Mendes</span>
								<span className="fw-bold">12 serviços</span>
							</div>
							<div className="progress mt-1">
								<div className="progress-bar bg-success" style={{width: '85%'}}></div>
							</div>
							<small className="text-muted">R$ 2.450 gerados</small>
						</div>
						<div className="mb-3">
							<div className="d-flex justify-content-between">
								<span>Manuel Costa</span>
								<span className="fw-bold">8 serviços</span>
							</div>
							<div className="progress mt-1">
								<div className="progress-bar bg-info" style={{width: '60%'}}></div>
							</div>
							<small className="text-muted">R$ 1.850 gerados</small>
						</div>
						<div className="mb-3">
							<div className="d-flex justify-content-between">
								<span>José Ferreira</span>
								<span className="fw-bold">6 serviços</span>
							</div>
							<div className="progress mt-1">
								<div className="progress-bar bg-warning" style={{width: '45%'}}></div>
							</div>
							<small className="text-muted">R$ 1.200 gerados</small>
						</div>
					</PanelBody>
				</Panel>
			</div>
			<div className="col-xl-4">
				<Panel>
					<PanelHeader>Análise Financeira</PanelHeader>
					<PanelBody>
						<div className="text-center mb-3">
							<div className="display-6 text-success">R$ {totalReceita.toLocaleString()}</div>
							<small className="text-muted">Receita no Período</small>
						</div>
						<div className="mb-2">
							<div className="d-flex justify-content-between">
								<span>Ticket Médio</span>
								<span className="fw-bold">R$ {filteredServicos.length > 0 ? Math.round(totalReceita / filteredServicos.length) : 0}</span>
							</div>
						</div>
						<div className="mb-2">
							<div className="d-flex justify-content-between">
								<span>Maior Serviço</span>
								<span className="fw-bold text-success">R$ {filteredServicos.length > 0 ? Math.max(...filteredServicos.map(s => s.valor)) : 0}</span>
							</div>
						</div>
						<div className="mb-2">
							<div className="d-flex justify-content-between">
								<span>Menor Serviço</span>
								<span className="fw-bold text-warning">R$ {filteredServicos.length > 0 ? Math.min(...filteredServicos.map(s => s.valor)) : 0}</span>
							</div>
						</div>
						<div className="alert alert-info mt-3">
							<i className="fa fa-info-circle me-2"></i>
							<strong>{servicosConcluidos}</strong> serviços concluídos de <strong>{filteredServicos.length}</strong> total
						</div>
					</PanelBody>
				</Panel>
			</div>
			<div className="col-xl-4">
				<Panel>
					<PanelHeader>Clientes Mais Atendidos</PanelHeader>
					<PanelBody>
						{Object.entries(
							filteredServicos.reduce((acc, servico) => {
								acc[servico.clienteNome] = (acc[servico.clienteNome] || 0) + 1;
								return acc;
							}, {} as Record<string, number>)
						)
						.sort(([,a], [,b]) => b - a)
						.slice(0, 5)
						.map(([cliente, quantidade], index) => (
							<div key={cliente} className="d-flex align-items-center mb-3">
								<div className="me-3">
									<span className="badge bg-primary rounded-pill">{index + 1}</span>
								</div>
								<div className="flex-fill">
									<div className="fw-bold">{cliente}</div>
								</div>
								<div className="text-end">
									<div className="fw-bold text-primary">{quantidade} serviços</div>
								</div>
							</div>
						))}
					</PanelBody>
				</Panel>
			</div>
		</div>
	);
}