interface HistoricoStatsProps {
	totalServicos: number;
	totalReceita: number;
	servicosConcluidos: number;
	tempoMedio: string;
}

export default function HistoricoStats({ totalServicos, totalReceita, servicosConcluidos, tempoMedio }: HistoricoStatsProps) {
	return (
		<div className="row mb-3">
			<div className="col-xl-3 col-md-6">
				<div className="widget widget-stats bg-primary">
					<div className="stats-icon"><i className="fa fa-list"></i></div>
					<div className="stats-info">
						<h4>TOTAL SERVIÇOS</h4>
						<p>{totalServicos}</p>
					</div>
				</div>
			</div>
			<div className="col-xl-3 col-md-6">
				<div className="widget widget-stats bg-success">
					<div className="stats-icon"><i className="fa fa-dollar-sign"></i></div>
					<div className="stats-info">
						<h4>RECEITA PERÍODO</h4>
						<p>R$ {totalReceita.toLocaleString()}</p>
					</div>
				</div>
			</div>
			<div className="col-xl-3 col-md-6">
				<div className="widget widget-stats bg-info">
					<div className="stats-icon"><i className="fa fa-check-circle"></i></div>
					<div className="stats-info">
						<h4>CONCLUÍDOS</h4>
						<p>{servicosConcluidos}</p>
					</div>
				</div>
			</div>
			<div className="col-xl-3 col-md-6">
				<div className="widget widget-stats bg-warning">
					<div className="stats-icon"><i className="fa fa-clock"></i></div>
					<div className="stats-info">
						<h4>TEMPO MÉDIO</h4>
						<p>{tempoMedio}h</p>
					</div>
				</div>
			</div>
		</div>
	);
}