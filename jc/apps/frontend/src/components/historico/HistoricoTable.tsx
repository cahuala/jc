import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import { useState } from 'react';
import Toast from '@/components/ui/Toast';
import ServicoDetailsModal from './ServicoDetailsModal';

interface Servico {
	id: number;
	clienteId: number;
	clienteNome: string;
	veiculo: string;
	placa: string;
	tipoServico: string;
	descricao: string;
	mecanico: string;
	dataEntrada: string;
	dataSaida: string;
	valor: number;
	status: 'concluido' | 'em_andamento' | 'cancelado' | 'aguardando';
	tempoServico: number;
}

interface HistoricoTableProps {
	servicos: Servico[];
	clientes: any[];
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	filterStatus: string;
	setFilterStatus: (status: string) => void;
	selectedCliente: string;
	setSelectedCliente: (cliente: string) => void;
}

export default function HistoricoTable({ 
	servicos, 
	clientes, 
	searchTerm, 
	setSearchTerm, 
	filterStatus, 
	setFilterStatus,
	selectedCliente,
	setSelectedCliente
}: HistoricoTableProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
	const [showDetailsModal, setShowDetailsModal] = useState(false);
	const [selectedServico, setSelectedServico] = useState<Servico | null>(null);
	const itemsPerPage = 10;

	const totalPages = Math.ceil(servicos.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedServicos = servicos.slice(startIndex, startIndex + itemsPerPage);
	const getStatusBadge = (status: string) => {
		switch(status) {
			case 'concluido': return 'bg-success';
			case 'em_andamento': return 'bg-warning';
			case 'cancelado': return 'bg-danger';
			case 'aguardando': return 'bg-info';
			default: return 'bg-secondary';
		}
	};

	const getStatusText = (status: string) => {
		switch(status) {
			case 'concluido': return 'Concluído';
			case 'em_andamento': return 'Em Andamento';
			case 'cancelado': return 'Cancelado';
			case 'aguardando': return 'Aguardando';
			default: return 'Indefinido';
		}
	};

	const handleViewDetails = (servico: Servico) => {
		setSelectedServico(servico);
		setShowDetailsModal(true);
	};

	const handlePrintService = (servico: Servico) => {
		setSelectedServico(servico);
		setShowDetailsModal(true);
	};

	const handleCopyService = (servico: Servico) => {
		const serviceText = `Serviço #${servico.id}\nCliente: ${servico.clienteNome}\nVeículo: ${servico.veiculo} (${servico.placa})\nTipo: ${servico.tipoServico}\nDescrição: ${servico.descricao}\nMecânico: ${servico.mecanico}\nData Entrada: ${servico.dataEntrada}\nData Saída: ${servico.dataSaida}\nTempo: ${servico.tempoServico}h\nValor: Kz ${servico.valor.toLocaleString()}\nStatus: ${getStatusText(servico.status)}`;
		
		navigator.clipboard.writeText(serviceText).then(() => {
			setToastMessage('Dados do serviço copiados para a área de transferência!');
			setToastType('success');
			setShowToast(true);
		}).catch(() => {
			setToastMessage('Erro ao copiar dados do serviço');
			setToastType('error');
			setShowToast(true);
		});
	};

	return (
		<Panel>
			<PanelHeader>
				<div className="d-flex justify-content-between align-items-center w-100">
					<span>Histórico de Serviços</span>
					<div className="d-flex gap-2">
						<select 
							className="form-select form-select-sm" 
							value={selectedCliente}
							onChange={(e) => setSelectedCliente(e.target.value)}
							style={{width: '150px'}}
						>
							<option value="">Todos Clientes</option>
							{clientes.map(cliente => (
								<option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
							))}
						</select>
						<select 
							className="form-select form-select-sm" 
							value={filterStatus}
							onChange={(e) => setFilterStatus(e.target.value)}
							style={{width: '130px'}}
						>
							<option value="todos">Todos Status</option>
							<option value="concluido">Concluído</option>
							<option value="em_andamento">Em Andamento</option>
							<option value="cancelado">Cancelado</option>
							<option value="aguardando">Aguardando</option>
						</select>
						<input
							type="text"
							className="form-control form-control-sm"
							placeholder="Buscar..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							style={{width: '200px'}}
						/>
					</div>
				</div>
			</PanelHeader>
			<PanelBody className="p-0">
				<div className="table-responsive">
					<table className="table table-hover mb-0">
						<thead className="table-light">
							<tr>
								<th>Data</th>
								<th>Cliente</th>
								<th>Veículo</th>
								<th>Serviço</th>
								<th>Mecânico</th>
								<th>Tempo</th>
								<th>Valor</th>
								<th>Status</th>
								<th>Ações</th>
							</tr>
						</thead>
						<tbody>
							{paginatedServicos.map((servico) => (
								<tr key={servico.id}>
									<td>
										<div>
											<div className="fw-bold">{servico.dataEntrada}</div>
											{servico.dataSaida && (
												<small className="text-muted">Saída: {servico.dataSaida}</small>
											)}
										</div>
									</td>
									<td>
										<div className="fw-bold">{servico.clienteNome}</div>
									</td>
									<td>
										<div>
											<div className="fw-bold">{servico.veiculo}</div>
											<small className="text-muted">{servico.placa}</small>
										</div>
									</td>
									<td>
										<div>
											<div className="fw-bold">{servico.tipoServico}</div>
											<small className="text-muted">{servico.descricao}</small>
										</div>
									</td>
									<td>{servico.mecanico}</td>
									<td>
										<span className="badge bg-info">{servico.tempoServico}h</span>
									</td>
									<td className="fw-bold text-success">R$ {servico.valor.toLocaleString()}</td>
									<td>
										<span className={`badge ${getStatusBadge(servico.status)}`}>
											{getStatusText(servico.status)}
										</span>
									</td>
									<td>
										<div className="btn-group btn-group-sm">
											<button 
												className="btn btn-outline-primary" 
												title="Ver Detalhes"
												onClick={() => handleViewDetails(servico)}
											>
												<i className="fa fa-eye"></i>
											</button>
											<button 
												className="btn btn-outline-info" 
												title="Imprimir OS"
												onClick={() => handlePrintService(servico)}
											>
												<i className="fa fa-print"></i>
											</button>
											<button 
												className="btn btn-outline-success" 
												title="Copiar Dados"
												onClick={() => handleCopyService(servico)}
											>
												<i className="fa fa-copy"></i>
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{totalPages > 1 && (
					<div className="d-flex justify-content-between align-items-center p-3">
						<div className="text-muted">
							Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, servicos.length)} de {servicos.length} registros
						</div>
						<nav>
							<ul className="pagination pagination-sm mb-0">
								<li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
									<button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
										Anterior
									</button>
								</li>
								{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
									<li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
										<button className="page-link" onClick={() => setCurrentPage(page)}>
											{page}
										</button>
									</li>
								))}
								<li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
									<button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
										Próximo
									</button>
								</li>
							</ul>
						</nav>
					</div>
				)}
			</PanelBody>

			<Toast
				isOpen={showToast}
				message={toastMessage}
				type={toastType}
				onClose={() => setShowToast(false)}
			/>

			<ServicoDetailsModal
				isOpen={showDetailsModal}
				servico={selectedServico}
				onClose={() => {
					setShowDetailsModal(false);
					setSelectedServico(null);
				}}
			/>
		</Panel>
	);
}