import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import { useState } from 'react';
import ActionButtons from '@/components/ui/ActionButtons';

interface Veiculo {
	id: number;
	marca: string;
	modelo: string;
	ano: number;
	placa: string;
	cor: string;
	combustivel: string;
	clienteId: number;
	clienteNome: string;
}

interface VeiculosTableProps {
	veiculos: Veiculo[];
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	onEdit?: (veiculo: Veiculo) => void;
	onView?: (veiculo: Veiculo) => void;
	onHistory?: (veiculo: Veiculo) => void;
	onNewService?: (veiculo: Veiculo) => void;
}

export default function VeiculosTable({ 
	veiculos, 
	searchTerm, 
	setSearchTerm, 
	onEdit, 
	onView, 
	onHistory, 
	onNewService 
}: VeiculosTableProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;

	const totalPages = Math.ceil(veiculos.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedVeiculos = veiculos.slice(startIndex, startIndex + itemsPerPage);

	return (
		<Panel>
			<PanelHeader>
				<div className="d-flex justify-content-between align-items-center w-100">
					<span>Lista de Veículos</span>
					<div className="d-flex gap-2">
						<input
							type="text"
							className="form-control form-control-sm"
							placeholder="Buscar veículo ou cliente..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							style={{width: '250px'}}
						/>
					</div>
				</div>
			</PanelHeader>
			<PanelBody className="p-0">
				<div className="table-responsive">
					<table className="table table-hover mb-0">
						<thead className="table-light">
							<tr>
								<th>Proprietário</th>
								<th>Veículo</th>
								<th>Matrícula</th>
								<th>Ano</th>
								<th>Cor</th>
								<th>Combustível</th>
								<th>Ações</th>
							</tr>
						</thead>
						<tbody>
							{paginatedVeiculos.map((veiculo) => (
								<tr key={veiculo.id}>
									<td>
										<div className="fw-bold">{veiculo.clienteNome}</div>
									</td>
									<td>
										<div>
											<div className="fw-bold">{veiculo.marca} {veiculo.modelo}</div>
											<small className="text-muted">{veiculo.marca}</small>
										</div>
									</td>
									<td>
										<span className="badge bg-dark">{veiculo.placa}</span>
									</td>
									<td>{veiculo.ano}</td>
									<td>
										<span className="badge bg-secondary">{veiculo.cor}</span>
									</td>
									<td>
										<span className={`badge ${veiculo.combustivel === 'Gasolina' ? 'bg-danger' : veiculo.combustivel === 'Diesel' ? 'bg-warning' : 'bg-success'}`}>
											{veiculo.combustivel}
										</span>
									</td>
									<td>
										<div className="btn-group btn-group-sm">
											<button 
												className="btn btn-outline-primary" 
												title="Ver Detalhes"
												onClick={() => onView?.(veiculo)}
											>
												<i className="fa fa-eye"></i>
											</button>
											<button 
												className="btn btn-outline-success" 
												title="Novo Serviço"
												onClick={() => onNewService?.(veiculo)}
											>
												<i className="fa fa-wrench"></i>
											</button>
											<button 
												className="btn btn-outline-info" 
												title="Histórico"
												onClick={() => onHistory?.(veiculo)}
											>
												<i className="fa fa-history"></i>
											</button>
											<button 
												className="btn btn-outline-warning" 
												title="Editar"
												onClick={() => onEdit?.(veiculo)}
											>
												<i className="fa fa-edit"></i>
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
							Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, veiculos.length)} de {veiculos.length} registros
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
		</Panel>
	);
}