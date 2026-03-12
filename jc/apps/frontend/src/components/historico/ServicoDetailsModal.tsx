import React from 'react';

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
  observacoes?: string;
  pecasUsadas?: string[];
}

interface ServicoDetailsModalProps {
  isOpen: boolean;
  servico: Servico | null;
  onClose: () => void;
}

export default function ServicoDetailsModal({ isOpen, servico, onClose }: ServicoDetailsModalProps) {
  if (!isOpen || !servico) return null;

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'concluido': return { class: 'bg-success', text: 'Concluído' };
      case 'em_andamento': return { class: 'bg-warning', text: 'Em Andamento' };
      case 'cancelado': return { class: 'bg-danger', text: 'Cancelado' };
      case 'aguardando': return { class: 'bg-info', text: 'Aguardando' };
      default: return { class: 'bg-secondary', text: 'Indefinido' };
    }
  };

  const statusInfo = getStatusBadge(servico.status);

  return (
    <>
      <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                <i className="fa fa-file-alt me-2"></i>
                Detalhes do Serviço #{servico.id}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <div className="modal-body p-0">
              {/* Conteúdo para visualização na tela */}
              <div className="screen-only">
                <div className="row g-0">
                  <div className="col-md-8">
                    <div className="p-4">
                      <div className="card mb-4">
                        <div className="card-header bg-light">
                          <h6 className="mb-0">
                            <i className="fa fa-info-circle me-2"></i>
                            Informações do Serviço
                          </h6>
                        </div>
                        <div className="card-body">
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label className="form-label fw-bold text-muted">Tipo de Serviço</label>
                              <div className="fs-6">{servico.tipoServico}</div>
                            </div>
                            <div className="col-md-6">
                              <label className="form-label fw-bold text-muted">Mecânico Responsável</label>
                              <div className="fs-6">{servico.mecanico}</div>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label className="form-label fw-bold text-muted">Data de Entrada</label>
                              <div className="fs-6">{servico.dataEntrada}</div>
                            </div>
                            <div className="col-md-6">
                              <label className="form-label fw-bold text-muted">Data de Saída</label>
                              <div className="fs-6">{servico.dataSaida}</div>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label className="form-label fw-bold text-muted">Tempo de Serviço</label>
                              <div className="fs-6">{servico.tempoServico}h</div>
                            </div>
                            <div className="col-md-6">
                              <label className="form-label fw-bold text-muted">Status</label>
                              <div>
                                <span className={`badge ${statusInfo.class}`}>
                                  {statusInfo.text}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label fw-bold text-muted">Descrição dos Serviços</label>
                            <div className="border rounded p-3 bg-light">
                              {servico.descricao}
                            </div>
                          </div>
                          {servico.observacoes && (
                            <div className="mb-3">
                              <label className="form-label fw-bold text-muted">Observações</label>
                              <div className="border rounded p-3 bg-light">
                                {servico.observacoes}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 bg-light">
                    <div className="p-4">
                      <div className="card">
                        <div className="card-header bg-primary text-white">
                          <h6 className="mb-0">
                            <i className="fa fa-user me-2"></i>
                            Cliente & Veículo
                          </h6>
                        </div>
                        <div className="card-body">
                          <div className="mb-3">
                            <label className="form-label fw-bold text-muted">Cliente</label>
                            <div className="fs-5 fw-bold">{servico.clienteNome}</div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label fw-bold text-muted">Veículo</label>
                            <div className="fs-6">{servico.veiculo}</div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label fw-bold text-muted">Matrícula</label>
                            <div>
                              <span className="badge bg-dark fs-6 p-2">{servico.placa}</span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label fw-bold text-muted">Valor Total</label>
                            <div className="fs-3 fw-bold text-success">
                              Kz {servico.valor.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conteúdo para impressão - Documento Institucional */}
              <div className="print-only" style={{ display: 'none' }}>
                <div className="print-document">
                  {/* Cabeçalho Institucional */}
                  <div className="print-header">
                    <div className="row align-items-center mb-4">
                      <div className="col-3">
                        <div className="company-logo">
                          <i className="fa fa-wrench"></i>
                        </div>
                      </div>
                      <div className="col-6 text-center">
                        <h2 className="mb-1">FLXMOTOR - OFICINA MECÂNICA</h2>
                        <p className="mb-0">Rua da Maianga, Nº 123 - Bairro Maianga</p>
                        <p className="mb-0">Luanda - República de Angola</p>
                        <p className="mb-0">Telefone: +244 923 456 789</p>
                        <p className="mb-0">Email: geral@flxmotor.ao</p>
                        <p className="mb-0 fw-bold">NIF: 5417189658</p>
                      </div>
                      <div className="col-3 text-end">
                        <div className="service-number">
                          <h4 className="mb-0">ORDEM DE SERVIÇO</h4>
                          <h3 className="mb-0">Nº {servico.id.toString().padStart(6, '0')}</h3>
                          <small>Data: {new Date().toLocaleDateString('pt-AO')}</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Informações do Cliente e Veículo */}
                  <div className="print-section mb-4">
                    <h5 className="section-title mb-3">
                      DADOS DO CLIENTE E VEÍCULO
                    </h5>
                    <div className="row">
                      <div className="col-6">
                        <table className="table table-borderless table-sm">
                          <tbody>
                            <tr>
                              <td className="fw-bold" style={{width: '40%'}}>CLIENTE:</td>
                              <td>{servico.clienteNome}</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">VEÍCULO:</td>
                              <td>{servico.veiculo}</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">MATRÍCULA:</td>
                              <td>{servico.placa}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-6">
                        <table className="table table-borderless table-sm">
                          <tbody>
                            <tr>
                              <td className="fw-bold" style={{width: '40%'}}>DATA ENTRADA:</td>
                              <td>{servico.dataEntrada}</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">DATA SAÍDA:</td>
                              <td>{servico.dataSaida}</td>
                            </tr>
                            <tr>
                              <td className="fw-bold">MECÂNICO:</td>
                              <td>{servico.mecanico}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Serviços Realizados */}
                  <div className="print-section mb-4">
                    <h5 className="section-title mb-3">
                      SERVIÇOS EXECUTADOS
                    </h5>
                    <div className="service-details">
                      <div className="row mb-2">
                        <div className="col-6">
                          <strong>TIPO DE SERVIÇO:</strong> {servico.tipoServico}
                        </div>
                        <div className="col-6">
                          <strong>TEMPO DE EXECUÇÃO:</strong> {servico.tempoServico} horas
                        </div>
                      </div>
                      <div className="mb-3">
                        <strong>DESCRIÇÃO DOS SERVIÇOS:</strong>
                        <div className="mt-2 p-2 bg-light">
                          {servico.descricao}
                        </div>
                      </div>
                      {servico.observacoes && (
                        <div className="mb-3">
                          <strong>OBSERVAÇÕES TÉCNICAS:</strong>
                          <div className="mt-2 p-2 bg-light">
                            {servico.observacoes}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Resumo Financeiro */}
                  <div className="print-section mb-4">
                    <h5 className="section-title mb-3">
                      RESUMO FINANCEIRO
                    </h5>
                    <div className="row">
                      <div className="col-8">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>DESCRIÇÃO DO SERVIÇO</th>
                              <th className="text-end">VALOR (Kz)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{servico.tipoServico}</td>
                              <td className="text-end">{servico.valor.toLocaleString('pt-AO')} Kz</td>
                            </tr>
                            <tr className="fw-bold">
                              <td>TOTAL GERAL</td>
                              <td className="text-end">{servico.valor.toLocaleString('pt-AO')} Kz</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-4">
                        <div className="status-box">
                          <div className="mb-2">
                            <strong>STATUS DO SERVIÇO</strong>
                          </div>
                          <div className="badge fs-6 p-2">
                            {statusInfo.text.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Assinaturas */}
                  <div className="signature-section">
                    <div className="row mt-5">
                      <div className="col-4 text-center">
                        <div className="signature-line">
                          <hr />
                          <small><strong>ASSINATURA DO CLIENTE</strong></small>
                        </div>
                      </div>
                      <div className="col-4 text-center">
                        <div className="signature-line">
                          <hr />
                          <small><strong>MECÂNICO RESPONSÁVEL</strong></small>
                        </div>
                      </div>
                      <div className="col-4 text-center">
                        <div className="signature-line">
                          <hr />
                          <small><strong>RESPONSÁVEL TÉCNICO</strong></small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rodapé */}
                  <div className="print-footer">
                    <div className="row">
                      <div className="col-6">
                        <small>
                          Documento gerado em: {new Date().toLocaleDateString('pt-AO')} às {new Date().toLocaleTimeString('pt-AO')}
                        </small>
                      </div>
                      <div className="col-6 text-end">
                        <small>
                          <strong>FlxMotor - Sistema de Gestão de Oficina</strong>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer screen-only">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                <i className="fa fa-times me-2"></i>
                Fechar
              </button>
              <button type="button" className="btn btn-primary" onClick={handlePrint}>
                <i className="fa fa-print me-2"></i>
                Imprimir OS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos para impressão */}
      <style jsx global>{`
        @media print {
          .screen-only {
            display: none !important;
          }
          
          .print-only {
            display: block !important;
          }
          
          .print-document {
            font-family: 'Times New Roman', serif;
            font-size: 12pt;
            line-height: 1.5;
            color: #000;
            margin: 0;
            padding: 0;
          }
          
          .print-header h2 {
            font-size: 16pt;
            font-weight: bold;
            margin: 10pt 0;
          }
          
          .section-title {
            font-size: 14pt;
            font-weight: bold;
            margin: 15pt 0 8pt 0;
            border-bottom: 1pt solid #000;
            padding-bottom: 3pt;
          }
          
          .table {
            font-size: 11pt;
            border-collapse: collapse;
            width: 100%;
            margin: 8pt 0;
          }
          
          .table th, .table td {
            padding: 6pt;
            border: 1pt solid #000;
          }
          
          .signature-line hr {
            border-top: 1pt solid #000;
            width: 120pt;
            margin: 25pt auto 5pt auto;
          }
          
          @page {
            size: A4;
            margin: 20mm;
          }
        }
      `}</style>
    </>
  );
}