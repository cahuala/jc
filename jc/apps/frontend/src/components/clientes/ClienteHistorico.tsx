import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';

interface Servico {
	id: number;
	data: string;
	veiculo: string;
	placa: string;
	servicos: string[];
	valor: number;
	status: 'concluido' | 'pendente' | 'cancelado';
	observacoes?: string;
}

interface Cliente {
	id: number;
	nome: string;
	historico?: Servico[];
}

interface ClienteHistoricoProps {
	cliente: Cliente;
	isOpen: boolean;
	onClose: () => void;
}

export default function ClienteHistorico({ cliente, isOpen, onClose }: ClienteHistoricoProps) {
	const historico = cliente.historico || [];
	console.log('ClienteHistorico - cliente:', cliente);
	console.log('ClienteHistorico - historico:', historico);

	const getStatusBadge = (status: string) => {
		switch(status) {
			case 'concluido': return 'bg-success';
			case 'pendente': return 'bg-warning';
			case 'cancelado': return 'bg-danger';
			default: return 'bg-secondary';
		}
	};

	const getStatusText = (status: string) => {
		switch(status) {
			case 'concluido': return 'Concluído';
			case 'pendente': return 'Pendente';
			case 'cancelado': return 'Cancelado';
			default: return 'Indefinido';
		}
	};

	if (!isOpen) return null;

	return (
		<div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<div className="modal-dialog modal-xl">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">
							<i className="fa fa-history me-2"></i>
							Histórico de Serviços - {cliente.nome}
						</h5>
						<button type="button" className="btn-close" onClick={onClose}></button>
					</div>
					<div className="modal-body p-0">
						<Panel>
							<PanelHeader>
								<div className="d-flex justify-content-between align-items-center w-100">
									<span>Serviços Realizados</span>
									{historico.length > 0 ? (
										<div className="text-muted">
											Total: {historico.length} serviços | 
											Valor Total: R$ {historico.reduce((acc, s) => acc + s.valor, 0).toLocaleString()}
										</div>
									) : (
										<div className="text-muted">Nenhum serviço encontrado</div>
									)}
								</div>
							</PanelHeader>
							<PanelBody className="p-0">
								{historico.length > 0 ? (
									<div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
										<table className="table table-hover mb-0">
											<thead className="table-light">
												<tr>
													<th>Data</th>
													<th>Veículo</th>
													<th>Serviços</th>
													<th>Valor</th>
													<th>Status</th>
													<th>Observações</th>
												</tr>
											</thead>
											<tbody>
												{historico.map((servico) => (
													<tr key={servico.id}>
														<td className="fw-bold">{servico.data}</td>
														<td>
															<div>
																<div className="fw-bold">{servico.veiculo}</div>
																<small className="text-muted">{servico.placa}</small>
															</div>
														</td>
														<td>
															<div>
																{servico.servicos.map((s, index) => (
																	<div key={index} className="badge bg-light text-dark me-1 mb-1">
																		{s}
																	</div>
																))}
															</div>
														</td>
														<td className="fw-bold text-success">R$ {servico.valor.toLocaleString()}</td>
														<td>
															<span className={`badge ${getStatusBadge(servico.status)}`}>
																{getStatusText(servico.status)}
															</span>
														</td>
														<td>
															<small className="text-muted">
																{servico.observacoes || '-'}
															</small>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								) : (
									<div className="text-center py-5">
										<i className="fa fa-history fa-3x text-muted mb-3"></i>
										<h5 className="text-muted">Nenhum serviço encontrado</h5>
										<p className="text-muted">Este cliente ainda não possui histórico de serviços.</p>
									</div>
								)}
							</PanelBody>
						</Panel>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" onClick={onClose}>
							Fechar
						</button>
						<button type="button" className="btn btn-primary">
							<i className="fa fa-print me-2"></i>
							Imprimir Histórico
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}