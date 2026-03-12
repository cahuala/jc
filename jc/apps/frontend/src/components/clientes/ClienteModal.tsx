export default function ClienteModal() {
	return (
		<div className="modal fade" id="modalNovoCliente" tabIndex={-1}>
			<div className="modal-dialog modal-xl">
				<div className="modal-content border-0 shadow-lg">
					<div className="modal-header bg-primary text-white">
						<div className="d-flex align-items-center">
							<i className="fa fa-user-plus me-3 fs-4"></i>
							<div>
								<h4 className="modal-title mb-0">Registar Novo Cliente</h4>
								<small className="opacity-75">Preencha os dados do cliente e do seu veículo</small>
							</div>
						</div>
						<button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
					</div>
					<div className="modal-body p-4">
						<form>
							{/* Dados Pessoais */}
							<div className="card border-0 bg-light mb-4">
								<div className="card-header bg-transparent border-0 pb-0">
									<h6 className="text-primary mb-3">
										<i className="fa fa-user me-2"></i>
										Dados Pessoais
									</h6>
								</div>
								<div className="card-body pt-0">
									<div className="row">
										<div className="col-md-6 mb-3">
											<label className="form-label fw-semibold">
												<i className="fa fa-user text-muted me-2"></i>
												Nome Completo *
											</label>
											<input 
												type="text" 
												className="form-control form-control-lg" 
												placeholder="Ex: João Manuel Silva"
												required 
											/>
										</div>
										<div className="col-md-6 mb-3">
											<label className="form-label fw-semibold">
												<i className="fa fa-id-card text-muted me-2"></i>
												Bilhete de Identidade *
											</label>
											<input 
												type="text" 
												className="form-control form-control-lg" 
												placeholder="Ex: 123456789LA041"
												required 
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6 mb-3">
											<label className="form-label fw-semibold">
												<i className="fa fa-phone text-muted me-2"></i>
												Telefone *
											</label>
											<input 
												type="tel" 
												className="form-control form-control-lg" 
												placeholder="Ex: +244 923 456 789"
												required 
											/>
										</div>
										<div className="col-md-6 mb-3">
											<label className="form-label fw-semibold">
												<i className="fa fa-envelope text-muted me-2"></i>
												Email
											</label>
											<input 
												type="email" 
												className="form-control form-control-lg" 
												placeholder="Ex: joao@email.com"
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-md-4 mb-3">
											<label className="form-label fw-semibold">
												<i className="fa fa-map-marker-alt text-muted me-2"></i>
												Província
											</label>
											<select className="form-select form-select-lg">
												<option value="">Seleccione...</option>
												<option value="luanda">Luanda</option>
												<option value="benguela">Benguela</option>
												<option value="huambo">Huambo</option>
												<option value="lobito">Lobito</option>
												<option value="lubango">Lubango</option>
												<option value="malanje">Malanje</option>
											</select>
										</div>
										<div className="col-md-4 mb-3">
											<label className="form-label fw-semibold">
												<i className="fa fa-city text-muted me-2"></i>
												Município
											</label>
											<input 
												type="text" 
												className="form-control form-control-lg" 
												placeholder="Ex: Maianga"
											/>
										</div>
										<div className="col-md-4 mb-3">
											<label className="form-label fw-semibold">
												<i className="fa fa-home text-muted me-2"></i>
												Bairro
											</label>
											<input 
												type="text" 
												className="form-control form-control-lg" 
												placeholder="Ex: Alvalade"
											/>
										</div>
									</div>
									<div className="mb-3">
										<label className="form-label fw-semibold">
											<i className="fa fa-map text-muted me-2"></i>
											Endereço Completo
										</label>
										<input 
											type="text" 
											className="form-control form-control-lg" 
											placeholder="Ex: Rua Comandante Gika, nº 123, 2º andar"
										/>
									</div>
								</div>
							</div>

							{/* Dados do Veículo */}
							<div className="card border-0 bg-light mb-4">
								<div className="card-header bg-transparent border-0 pb-0">
									<h6 className="text-primary mb-3">
										<i className="fa fa-car me-2"></i>
										Dados do Veículo
									</h6>
								</div>
								<div className="card-body pt-0">
									<div className="row">
										<div className="col-md-4 mb-3">
											<label className="form-label fw-semibold">
												<i className="fa fa-industry text-muted me-2"></i>
												Marca *
											</label>
											<select className="form-select form-select-lg" required>
												<option value="">Seleccione a marca...</option>
												<option value="toyota">Toyota</option>
												<option value="honda">Honda</option>
												<option value="hyundai">Hyundai</option>
												<option value="kia">Kia</option>
												<option value="nissan">Nissan</option>
												<option value="mitsubishi">Mitsubishi</option>
												<option value="mercedes">Mercedes-Benz</option>
												<option value="bmw">BMW</option>
												<option value="audi">Audi</option>
												<option value="volkswagen">Volkswagen</option>
											</select>
										</div>
										<div className="col-md-4 mb-3">
											<label className="form-label fw-semibold">
												<i className="fa fa-car-side text-muted me-2"></i>
												Modelo *
											</label>
											<input 
												type="text" 
												className="form-control form-control-lg" 
												placeholder="Ex: Corolla, Civic, Elantra"
												required 
											/>
										</div>
										<div className="col-md-4 mb-3">
											<label className="form-label fw-semibold">
												<i className="fa fa-calendar text-muted me-2"></i>
												Ano *
											</label>
											<input 
												type="number" 
												className="form-control form-control-lg" 
												min="1990" 
												max="2025" 
												placeholder="Ex: 2020"
												required 
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-md-4 mb-3">
											<label className="form-label fw-semibold">
												<i className="fa fa-hashtag text-muted me-2"></i>
												Matrícula *
											</label>
											<input 
												type="text" 
												className="form-control form-control-lg" 
												placeholder="Ex: LD-12-34-AB"
												required 
											/>
										</div>
										<div className="col-md-4 mb-3">
											<label className="form-label fw-semibold">
												<i className="fa fa-palette text-muted me-2"></i>
												Cor
											</label>
											<select className="form-select form-select-lg">
												<option value="">Seleccione a cor...</option>
												<option value="branco">Branco</option>
												<option value="preto">Preto</option>
												<option value="prata">Prata</option>
												<option value="cinza">Cinza</option>
												<option value="azul">Azul</option>
												<option value="vermelho">Vermelho</option>
												<option value="verde">Verde</option>
												<option value="amarelo">Amarelo</option>
											</select>
										</div>
										<div className="col-md-4 mb-3">
											<label className="form-label fw-semibold">
												<i className="fa fa-gas-pump text-muted me-2"></i>
												Combustível
											</label>
											<select className="form-select form-select-lg">
												<option value="">Seleccione...</option>
												<option value="gasolina">Gasolina</option>
												<option value="diesel">Diesel</option>
												<option value="hibrido">Híbrido</option>
												<option value="electrico">Eléctrico</option>
											</select>
										</div>
									</div>
								</div>
							</div>

							{/* Observações */}
							<div className="card border-0 bg-light">
								<div className="card-header bg-transparent border-0 pb-0">
									<h6 className="text-primary mb-3">
										<i className="fa fa-sticky-note me-2"></i>
										Observações Adicionais
									</h6>
								</div>
								<div className="card-body pt-0">
									<textarea 
										className="form-control form-control-lg" 
										rows={4} 
										placeholder="Informações adicionais sobre o cliente, preferências de horário, histórico de problemas do veículo, etc..."
									></textarea>
								</div>
							</div>
						</form>
					</div>
					<div className="modal-footer bg-light border-0 p-4">
						<button type="button" className="btn btn-light btn-lg px-4" data-bs-dismiss="modal">
							<i className="fa fa-times me-2"></i>
							Cancelar
						</button>
						<button type="button" className="btn btn-primary btn-lg px-4 ms-2">
							<i className="fa fa-save me-2"></i>
							Registar Cliente
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}