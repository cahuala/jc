import React from 'react';

interface Movimentacao {
  id: number;
  data: string;
  tipo: 'entrada' | 'saida';
  categoria: string;
  descricao: string;
  valor: number;
  origem: string;
  documento: string;
  saldoAnterior: number;
  saldoAtual: number;
}

interface ComprovanteModalProps {
  movimentacao: Movimentacao;
  onClose: () => void;
}

export default function ComprovanteModal({ movimentacao, onClose }: ComprovanteModalProps) {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('pt-AO'),
      time: date.toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const dateTime = formatDateTime(movimentacao.data);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fa fa-receipt me-2"></i>
              Comprovante de Movimentação
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div id="comprovante-content" className="p-4" style={{ fontFamily: 'Times New Roman, serif' }}>
              <div className="text-center mb-4">
                <h3 className="fw-bold">OFICINA MECÂNICA FLXMOTOR</h3>
                <p className="mb-1">Rua da Maianga, Bairro Maianga, Luanda - Angola</p>
                <p className="mb-1">Telefone: +244 923 456 789 | Email: contato@flxmotor.ao</p>
                <p className="mb-1">NIF: 5000123456</p>
                <hr className="my-3" />
                <h4 className="text-uppercase">COMPROVANTE DE MOVIMENTAÇÃO FINANCEIRA</h4>
              </div>

              <div className="row mb-4">
                <div className="col-6">
                  <p><strong>Comprovante Nº:</strong> COMP-{movimentacao.id.toString().padStart(6, '0')}</p>
                  <p><strong>Data/Hora:</strong> {dateTime.date} às {dateTime.time}</p>
                  <p><strong>Documento:</strong> {movimentacao.documento}</p>
                </div>
                <div className="col-6 text-end">
                  <p><strong>Tipo:</strong> 
                    <span className={`badge ms-2 ${movimentacao.tipo === 'entrada' ? 'bg-success' : 'bg-danger'}`}>
                      {movimentacao.tipo === 'entrada' ? 'ENTRADA' : 'SAÍDA'}
                    </span>
                  </p>
                  <p><strong>Categoria:</strong> {movimentacao.categoria}</p>
                  <p><strong>Origem:</strong> {movimentacao.origem}</p>
                </div>
              </div>

              <div className="mb-4">
                <h5>Descrição da Movimentação:</h5>
                <div className="border p-3 bg-light">
                  {movimentacao.descricao}
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-12">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td><strong>Saldo Anterior:</strong></td>
                        <td className="text-end">Kz {movimentacao.saldoAnterior.toFixed(2)}</td>
                      </tr>
                      <tr className={movimentacao.tipo === 'entrada' ? 'table-success' : 'table-danger'}>
                        <td><strong>Valor da Movimentação:</strong></td>
                        <td className="text-end fw-bold">
                          {movimentacao.tipo === 'entrada' ? '+' : '-'} Kz {movimentacao.valor.toFixed(2)}
                        </td>
                      </tr>
                      <tr className="table-primary">
                        <td><strong>Saldo Atual:</strong></td>
                        <td className="text-end fw-bold fs-5">Kz {movimentacao.saldoAtual.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-muted">
                  <small>
                    <strong>Observações:</strong> Este comprovante é válido como documento de movimentação financeira interna.
                    Emitido automaticamente pelo sistema em {new Date().toLocaleDateString('pt-AO')} às {new Date().toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' })}.
                  </small>
                </p>
              </div>

              <div className="text-center mt-5">
                <hr />
                <p className="mb-1"><strong>OFICINA MECÂNICA FLXMOTOR</strong></p>
                <p className="text-muted"><small>Sistema de Gestão Integrada - Versão 1.0</small></p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Fechar
            </button>
            <button type="button" className="btn btn-outline-primary">
              <i className="fa fa-download me-2"></i>
              Baixar PDF
            </button>
            <button type="button" className="btn btn-primary" onClick={handlePrint}>
              <i className="fa fa-print me-2"></i>
              Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}