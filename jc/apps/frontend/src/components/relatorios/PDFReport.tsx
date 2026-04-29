/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useOficina } from '@/hooks/useOficina';
import { useCurrentUser } from '@/hooks/useCurrentUser';

interface PDFReportProps {
  tipo: 'vendas' | 'servicos' | 'clientes' | 'financeiro' | 'performance';
  dados: any;
  periodo: string;
  onClose: () => void;
}

export default function PDFReport({ tipo, dados, periodo, onClose }: PDFReportProps) {
  const hoje = new Date();
  const dataFormatada = hoje.toLocaleDateString('pt-AO', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });

  const { oficina } = useOficina();
  const { user } = useCurrentUser();

  const getTitulo = () => {
    switch (tipo) {
      case 'vendas': return 'RELATÓRIO DE VENDAS';
      case 'servicos': return 'RELATÓRIO DE SERVIÇOS';
      case 'clientes': return 'RELATÓRIO DE CLIENTES';
      case 'financeiro': return 'RELATÓRIO FINANCEIRO';
      case 'performance': return 'RELATÓRIO DE PERFORMANCE';
      default: return 'RELATÓRIO';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Simular download do PDF
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${tipo}_${periodo}_${hoje.getTime()}.pdf`;
    link.click();
  };

  return (
    <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.8)'}}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fa fa-file-pdf me-2"></i>
              Visualização do Relatório PDF
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          
          <div className="modal-body p-0">
            <div className="d-flex justify-content-end p-3 border-bottom bg-light">
              <div className="d-flex gap-2">
                <button className="btn btn-outline-primary btn-sm" onClick={handlePrint}>
                  <i className="fa fa-print me-1"></i>
                  Imprimir
                </button>
                <button className="btn btn-success btn-sm" onClick={handleDownload}>
                  <i className="fa fa-download me-1"></i>
                  Download
                </button>
              </div>
            </div>
            <div id="pdf-content" className="p-4" style={{backgroundColor: 'white', minHeight: '800px', fontFamily: 'Times New Roman, serif', fontSize: '12px'}}>
              {/* Cabeçalho Oficial Angolano */}
              <div className="text-center mb-4 border-bottom pb-3">
                <div className="row align-items-center">
                  <div className="col-2">
                    <div className="bg-primary text-white p-3 rounded">
                      <i className="fa fa-car fa-2x"></i>
                    </div>
                  </div>
                  <div className="col-8">
                    <h3 className="mb-1 text-primary fw-bold">{oficina.nomeEmpresa}</h3>
                    <p className="mb-1">{oficina.endereco}, {oficina.bairro || ''} - {oficina.cidade}, {oficina.provincia}</p>
                    <p className="mb-1">NIF: {oficina.nif} | Telefone: {oficina.telefone}</p>
                    <p className="mb-0">Email: {oficina.email} | {oficina.website || ''}</p>
                  </div>
                  <div className="col-2 text-end">
                    <div className="border p-2">
                      <small className="text-muted">Data:</small><br/>
                      <strong>{dataFormatada}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Título do Relatório */}
              <div className="text-center mb-4">
                <h2 className="text-primary fw-bold">{getTitulo()}</h2>
                <p className="text-muted">Período: {periodo}</p>
              </div>

              {/* Conteúdo específico por tipo */}
              {tipo === 'vendas' && (
                <div>
                  <div className="row mb-4">
                    <div className="col-md-3">
                      <div className="card bg-light">
                        <div className="card-body text-center">
                          <h4 className="text-primary">Kz {dados?.totalVendas?.toLocaleString() || '0'}</h4>
                          <p className="mb-0">Total de Vendas</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card bg-light">
                        <div className="card-body text-center">
                          <h4 className="text-success">{dados?.totalPedidos || '0'}</h4>
                          <p className="mb-0">Total de Pedidos</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card bg-light">
                        <div className="card-body text-center">
                          <h4 className="text-info">Kz {dados?.ticketMedio?.toLocaleString() || '0'}</h4>
                          <p className="mb-0">Ticket Médio</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card bg-light">
                        <div className="card-body text-center">
                          <h4 className="text-warning">+{dados?.crescimento || '0'}%</h4>
                          <p className="mb-0">Crescimento</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <table className="table table-bordered" style={{fontSize: '10px'}}>
                    <thead className="table-primary">
                      <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Valor (Kz)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dados?.produtosMaisVendidos?.map((produto: any, index: number) => (
                        <tr key={index}>
                          <td>{produto.produto}</td>
                          <td>{produto.quantidade}</td>
                          <td>Kz {produto.valor.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {tipo === 'financeiro' && (
                <div>
                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="card bg-success text-white">
                        <div className="card-body text-center">
                          <h4>Kz {dados?.receitaTotal?.toLocaleString() || '0'}</h4>
                          <p className="mb-0">Receita Total</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card bg-danger text-white">
                        <div className="card-body text-center">
                          <h4>Kz {dados?.despesaTotal?.toLocaleString() || '0'}</h4>
                          <p className="mb-0">Despesa Total</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card bg-primary text-white">
                        <div className="card-body text-center">
                          <h4>Kz {dados?.lucroLiquido?.toLocaleString() || '0'}</h4>
                          <p className="mb-0">Lucro Líquido</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h5 className="text-primary mb-3">Despesas por Categoria</h5>
                  <table className="table table-bordered" style={{fontSize: '10px'}}>
                    <thead className="table-primary">
                      <tr>
                        <th>Categoria</th>
                        <th>Valor (Kz)</th>
                        <th>Percentual</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dados?.categoriasDespesas?.map((categoria: any, index: number) => (
                        <tr key={index}>
                          <td>{categoria.categoria}</td>
                          <td>Kz {categoria.valor.toLocaleString()}</td>
                          <td>{categoria.percentual}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Rodapé Oficial */}
              <div className="mt-5 pt-4 border-top">
                <div className="row">
                  <div className="col-md-6">
                    <p className="mb-1"><strong>Responsável pelo Relatório:</strong></p>
                    <p className="mb-1">{user.nome}</p>
                    <p className="mb-0">Data de Geração: {dataFormatada}</p>
                  </div>
                  <div className="col-md-6 text-end">
                    <div className="border-top pt-3" style={{marginTop: '60px'}}>
                      <p className="mb-0">_________________________</p>
                      <p className="mb-0"><strong>Assinatura e Carimbo</strong></p>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <small className="text-muted">
                    Este documento foi gerado automaticamente pelo sistema FlxMotor em {hoje.toLocaleString('pt-AO')}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #pdf-content, #pdf-content * {
            visibility: visible;
          }
          #pdf-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .modal {
            position: static !important;
            display: block !important;
          }
          .modal-dialog {
            max-width: 100% !important;
            margin: 0 !important;
          }
          .modal-header {
            display: none !important;
          }
          .modal-content {
            border: none !important;
            box-shadow: none !important;
          }
          .modal-body {
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}