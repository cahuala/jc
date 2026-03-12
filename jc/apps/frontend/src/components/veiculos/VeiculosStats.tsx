interface VeiculosStatsProps {
	totalVeiculos: number;
	clientesComVeiculos: number;
	clientesMultiplosVeiculos: number;
	veiculosFlexGasolina: number;
}

export default function VeiculosStats({ 
	totalVeiculos, 
	clientesComVeiculos, 
	clientesMultiplosVeiculos, 
	veiculosFlexGasolina 
}: VeiculosStatsProps) {
	return (
		<div className="row mb-3">
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
					<div className="stats-icon"><i className="fa fa-users"></i></div>
					<div className="stats-info">
						<h4>CLIENTES COM VEÍCULOS</h4>
						<p>{clientesComVeiculos}</p>
					</div>
				</div>
			</div>
			<div className="col-xl-3 col-md-6">
				<div className="widget widget-stats bg-warning">
					<div className="stats-icon"><i className="fa fa-layer-group"></i></div>
					<div className="stats-info">
						<h4>MÚLTIPLOS VEÍCULOS</h4>
						<p>{clientesMultiplosVeiculos}</p>
					</div>
				</div>
			</div>
			<div className="col-xl-3 col-md-6">
				<div className="widget widget-stats bg-success">
					<div className="stats-icon"><i className="fa fa-gas-pump"></i></div>
					<div className="stats-info">
						<h4>FLEX/GASOLINA</h4>
						<p>{veiculosFlexGasolina}</p>
					</div>
				</div>
			</div>
		</div>
	);
}