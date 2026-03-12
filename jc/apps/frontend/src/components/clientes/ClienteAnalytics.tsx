import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

interface Veiculo {
	id: number;
	marca: string;
	modelo: string;
	ano: number;
	placa: string;
	cor: string;
	combustivel: string;
}

interface Cliente {
	id: number;
	nome: string;
	telefone: string;
	email: string;
	veiculos: Veiculo[];
	ultimoServico: string;
	proximaRevisao: string;
	totalGasto: number;
	servicos: number;
	status: string;
	observacoes: string;
}

interface ClienteAnalyticsProps {
	clientes: Cliente[];
}

export default function ClienteAnalytics({ clientes }: ClienteAnalyticsProps) {
	return (
		<div className="row mt-4">
			<div className="col-xl-6">
				<Panel>
					<PanelHeader>Top 5 Clientes por Valor</PanelHeader>
					<PanelBody>
						{clientes
							.sort((a, b) => b.totalGasto - a.totalGasto)
							.slice(0, 5)
							.map((cliente, index) => (
								<div key={cliente.id} className="d-flex align-items-center mb-3">
									<div className="me-3">
										<span className="badge bg-primary rounded-pill">{index + 1}</span>
									</div>
									<div className="flex-fill">
										<div className="fw-bold">{cliente.nome}</div>
										<small className="text-muted">
											{cliente.veiculos.length > 1 
												? `${cliente.veiculos.length} veículos` 
												: `${cliente.veiculos[0]?.marca} ${cliente.veiculos[0]?.modelo}`
											}
										</small>
									</div>
									<div className="text-end">
										<div className="fw-bold text-success">R$ {cliente.totalGasto.toLocaleString()}</div>
										<small className="text-muted">{cliente.servicos} serviços</small>
									</div>
								</div>
							))
						}
					</PanelBody>
				</Panel>
			</div>
			<div className="col-xl-6">
				<Panel>
					<PanelHeader>Revisões Próximas</PanelHeader>
					<PanelBody>
						{clientes
							.filter(c => new Date(c.proximaRevisao.split('/').reverse().join('-')) <= new Date(Date.now() + 30*24*60*60*1000))
							.sort((a, b) => new Date(a.proximaRevisao.split('/').reverse().join('-')).getTime() - new Date(b.proximaRevisao.split('/').reverse().join('-')).getTime())
							.map((cliente) => (
								<div key={cliente.id} className="d-flex align-items-center mb-3">
									<div className="me-3">
										<i className={`fa fa-calendar ${new Date(cliente.proximaRevisao.split('/').reverse().join('-')) < new Date() ? 'text-danger' : 'text-warning'}`}></i>
									</div>
									<div className="flex-fill">
										<div className="fw-bold">{cliente.nome}</div>
										<small className="text-muted">
											{cliente.veiculos.length > 1 
												? `${cliente.veiculos.length} veículos` 
												: `${cliente.veiculos[0]?.marca} ${cliente.veiculos[0]?.modelo} - ${cliente.veiculos[0]?.placa}`
											}
										</small>
									</div>
									<div className="text-end">
										<div className={`fw-bold ${new Date(cliente.proximaRevisao.split('/').reverse().join('-')) < new Date() ? 'text-danger' : 'text-warning'}`}>
											{cliente.proximaRevisao}
										</div>
										<small className="text-muted">{cliente.telefone}</small>
									</div>
								</div>
							))
						}
					</PanelBody>
				</Panel>
			</div>
		</div>
	);
}