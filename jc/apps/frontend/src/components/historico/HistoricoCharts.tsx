import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import dynamic from 'next/dynamic';

interface HistoricoChartsProps {
	filteredServicos: any[];
	totalReceita: number;
	servicosConcluidos: number;
}

export default function HistoricoCharts({ filteredServicos, totalReceita, servicosConcluidos }: HistoricoChartsProps) {
	const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

	const chartOptions = {
		chart: { type: 'bar' as const, height: 300 },
		xaxis: { categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'] },
		colors: ['#0d6efd', '#198754', '#ffc107'],
		legend: { position: 'top' as const }
	};

	const chartSeries = [
		{ name: 'Serviços', data: [45, 52, 38, 48, 42, 55] },
		{ name: 'Receita (x100)', data: [385, 423, 398, 452, 412, 439] }
	];

	return (
		<div className="row mb-4">
			<div className="col-xl-8">
				<Panel>
					<PanelHeader>Análise de Serviços por Período</PanelHeader>
					<PanelBody>
						<ApexChart 
							type="bar" 
							height={300} 
							options={chartOptions} 
							series={chartSeries} 
						/>
					</PanelBody>
				</Panel>
			</div>
			<div className="col-xl-4">
				<Panel>
					<PanelHeader>Serviços Mais Realizados</PanelHeader>
					<PanelBody>
						<div className="mb-3">
							<div className="d-flex justify-content-between">
								<span>Troca de Óleo</span>
								<span className="fw-bold">45x</span>
							</div>
							<div className="progress mt-1">
								<div className="progress-bar bg-success" style={{width: '90%'}}></div>
							</div>
						</div>
						<div className="mb-3">
							<div className="d-flex justify-content-between">
								<span>Alinhamento</span>
								<span className="fw-bold">28x</span>
							</div>
							<div className="progress mt-1">
								<div className="progress-bar bg-info" style={{width: '70%'}}></div>
							</div>
						</div>
						<div className="mb-3">
							<div className="d-flex justify-content-between">
								<span>Freios</span>
								<span className="fw-bold">22x</span>
							</div>
							<div className="progress mt-1">
								<div className="progress-bar bg-warning" style={{width: '55%'}}></div>
							</div>
						</div>
						<div className="mb-3">
							<div className="d-flex justify-content-between">
								<span>Revisão</span>
								<span className="fw-bold">18x</span>
							</div>
							<div className="progress mt-1">
								<div className="progress-bar bg-primary" style={{width: '45%'}}></div>
							</div>
						</div>
					</PanelBody>
				</Panel>
			</div>
		</div>
	);
}