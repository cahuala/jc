interface Cliente {
	id: number;
	nome: string;
}

interface VeiculoModalProps {
	clientes: Cliente[];
	selectedCliente: string;
	setSelectedCliente: (cliente: string) => void;
}

export default function VeiculoModal({ clientes, selectedCliente, setSelectedCliente }: VeiculoModalProps) {
	return (
		<div className="modal fade" id="modalNovoVeiculo" tabIndex={-1}>
			<div className="modal-dialog modal-lg">
				<div className="modal-content border-0 shadow-lg">
					<div className="modal-header bg-success text-white">
						<div className="d-flex align-items-center">
							<i className="fa fa-car me-3 fs-4"></i>
							<div>
								<h4 className="modal-title mb-0">Adicionar Veículo</h4>
								<small className="opacity-75">Seleccione o cliente e preencha os dados do veículo</small>
							</div>
						</div>
						<button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
					</div>
					<div className="modal-body p-4">
						<form>
							<div className="card border-0 bg-light mb-4">
								<div className="card-header bg-transparent border-0 pb-0">
									<h6 className="text-success mb-3">
										<i className="fa fa-user me-2"></i>
										Seleccionar Cliente
									</h6>
								</div>
								<div className="card-body pt-0">
									<div className="mb-3">
										<label className="form-label fw-semibold">
											<i className="fa fa-users text-muted me-2"></i>
											Cliente *
										</label>
										<select 
											className="form-select form-select-lg" 
											value={selectedCliente}
											onChange={(e) => setSelectedCliente(e.target.value)}
											required
										>
											<option value="">Seleccione o cliente...</option>
											{clientes.map(cliente => (
												<option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
											))}
										</select>
									</div>
								</div>
							</div>

							<div className="card border-0 bg-light">
								<div className="card-header bg-transparent border-0 pb-0">
									<h6 className="text-success mb-3">
										<i className="fa fa-car me-2"></i>
										Dados do Veículo
									</h6>
								</div>
								<div className="card-body pt-0">
									<div className="row">
										<div className="col-md-6 mb-3">
											<label className="form-label fw-semibold">Marca *</label>
											<input type="text" className="form-control" placeholder="Ex: Toyota" required />
										</div>
										<div className="col-md-6 mb-3">
											<label className="form-label fw-semibold">Modelo *</label>
											<input type="text" className="form-control" placeholder="Ex: Corolla" required />
										</div>
									</div>
									<div className="row">
										<div className="col-md-4 mb-3">
											<label className="form-label fw-semibold">Ano *</label>
											<input type="number" className="form-control" placeholder="2023" min="1990" max="2024" required />
										</div>
										<div className="col-md-4 mb-3">
											<label className="form-label fw-semibold">Matrícula *</label>
											<input type="text" className="form-control" placeholder="ABC-1234" required />
										</div>
										<div className="col-md-4 mb-3">
											<label className="form-label fw-semibold">Cor</label>
											<select className="form-select">
												<option value="">Seleccione...</option>
												<option value="Branco">Branco</option>
												<option value="Preto">Preto</option>
												<option value="Prata">Prata</option>
												<option value="Azul">Azul</option>
												<option value="Vermelho">Vermelho</option>
												<option value="Cinza">Cinza</option>
											</select>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6 mb-3">
											<label className="form-label fw-semibold">Combustível</label>
											<select className="form-select">
												<option value="">Seleccione...</option>
												<option value="Gasolina">Gasolina</option>
												<option value="Diesel">Diesel</option>
												<option value="Flex">Flex</option>
												<option value="Elétrico">Elétrico</option>
												<option value="Híbrido">Híbrido</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
					<div className="modal-footer bg-light">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
							<i className="fa fa-times me-2"></i>
							Cancelar
						</button>
						<button type="button" className="btn btn-success">
							<i className="fa fa-save me-2"></i>
							Guardar Veículo
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}