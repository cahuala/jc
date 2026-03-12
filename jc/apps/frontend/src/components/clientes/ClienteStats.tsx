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

interface ClienteStatsProps {
	clientes: Cliente[];
}

export default function ClienteStats({ clientes }: ClienteStatsProps) {
	const totalVeiculos = clientes.reduce((sum, cliente) => sum + cliente.veiculos.length, 0);
	
	return (
		<div className="row mb-3">
			<div className="col-xl-3 col-md-6">
				<div className="widget widget-stats bg-success">
					<div className="stats-icon"><i className="fa fa-users"></i></div>
					<div className="stats-info">
						<h4>CLIENTES ATIVOS</h4>
						<p>{clientes.filter(c => c.status === 'ativo').length}</p>
					</div>
				</div>
			</div>
			<div className="col-xl-3 col-md-6">
				<div className="widget widget-stats bg-primary">
					<div className="stats-icon"><i className="fa fa-car"></i></div>
					<div className="stats-info">
						<h4>TOTAL VEÍCULOS</h4>
						<p>{totalVeiculos}</p>
					</div>
				</div>
			</div>
			<div className="col-xl-3 col-md-6">
				<div className="widget widget-stats bg-info">
					<div className="stats-icon"><i className="fa fa-dollar-sign"></i></div>
					<div className="stats-info">
						<h4>RECEITA TOTAL</h4>
						<p>R$ {clientes.reduce((sum, c) => sum + c.totalGasto, 0).toLocaleString()}</p>
					</div>
				</div>
			</div>
			<div className="col-xl-3 col-md-6">
				<div className="widget widget-stats bg-warning">
					<div className="stats-icon"><i className="fa fa-exclamation-triangle"></i></div>
					<div className="stats-info">
						<h4>PRECISAM ATENÇÃO</h4>
						<p>{clientes.filter(c => c.status === 'atencao').length}</p>
					</div>
				</div>
			</div>
		</div>
	);
}