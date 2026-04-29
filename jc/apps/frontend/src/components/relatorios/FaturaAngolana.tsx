import React from 'react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useFatura } from '@/hooks/useFatura';
import type { OficinaData } from '@/hooks/useOficina';

const defaultOficina: OficinaData = {
  nomeEmpresa: 'FLXMOTOR - OFICINA MECÂNICA',
  nif: '5417123456',
  endereco: 'Rua da Independência, 123',
  bairro: 'Ingombota',
  cidade: 'Luanda',
  provincia: 'Luanda',
  telefone: '+244 923 456 789',
  email: 'geral@flxmotor.ao',
  website: 'www.flxmotor.ao',
};

interface FaturaAngolanaProps {
  faturaId: string;
  onClose: () => void;
};

export default function FaturaAngolana({ faturaId, onClose }: FaturaAngolanaProps) {
  const hoje = new Date();
  const dataFormatada = new Date().toLocaleDateString('pt-AO');

  const { user } = useCurrentUser();
  const oficina = user.oficina || defaultOficina;

  const { data: dadosFatura, loading, error } = useFatura(faturaId);

  if (loading) return <div>Carregando fatura...</div>;
  if (error || !dadosFatura) return <div>Erro ao carregar fatura: {error}</div>;

  const subtotal = dadosFatura.subtotal;
  const iva = dadosFatura.totalIva;
  const total = dadosFatura.total;

  const handlePrint = () => {
    const printContent = document.getElementById('fatura-print');
    const originalContent = document.body.innerHTML;
    
    if (printContent) {
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  return (
    <>
      <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999}}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content shadow-lg">
            <div className="modal-header bg-dark text-white border-0">
              <h5 className="modal-title">
                <i className="fa fa-file-invoice me-2"></i>
                Fatura Comercial - {dadosFatura.numero}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            
            <div className="modal-body p-0 bg-light">
              <div className="d-flex justify-content-end p-3 border-bottom">
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-primary btn-sm" onClick={handlePrint}>
                    <i className="fa fa-print me-1"></i>
                    Imprimir
                  </button>
                  <button className="btn btn-success btn-sm" onClick={() => {
                    const link = document.createElement('a');
                    link.href = '#';
                    link.download = `fatura_${dadosFatura.numero}_${new Date().getTime()}.pdf`;
                    link.click();
                  }}>
                    <i className="fa fa-download me-1"></i>
                    Download PDF
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div id="fatura-print" style={{backgroundColor: 'white', padding: '40px', fontFamily: 'Times New Roman, serif', fontSize: '12px'}}>
                  
                  {/* Cabeçalho Oficial */}
                  <div style={{borderBottom: '3px solid #0066cc', paddingBottom: '20px', marginBottom: '30px'}}>
                    <table style={{width: '100%', borderCollapse: 'collapse'}}>
                      <tr>
                        <td style={{width: '60%', verticalAlign: 'top'}}>
                          <h1 style={{color: '#0066cc', fontSize: '28px', fontWeight: 'bold', margin: '0 0 10px 0'}}>
                            {oficina.nomeEmpresa.split(' - ')[0] || 'FLXMOTOR'}
                          </h1>
                          <h2 style={{color: '#333', fontSize: '18px', margin: '0 0 15px 0'}}>
                            OFICINA MECÂNICA E SERVIÇOS AUTOMÓVEIS
                          </h2>
                          <div style={{fontSize: '14px', lineHeight: '1.6', color: '#555'}}>
                            <div><strong>Endereço:</strong> {oficina.endereco}, {oficina.bairro || ''} - {oficina.cidade}, {oficina.provincia}</div>
                            <div><strong>NIF:</strong> {oficina.nif} | <strong>Telefone:</strong> {oficina.telefone}</div>
                            <div><strong>Email:</strong> {oficina.email} | <strong>Web:</strong> {oficina.website || ''}</div>
                          </div>
                        </td>
                        <td style={{width: '40%', textAlign: 'right', verticalAlign: 'top'}}>
                          <div style={{border: '2px solid #0066cc', padding: '15px', display: 'inline-block', minWidth: '200px'}}>
                            <h3 style={{color: '#0066cc', fontSize: '24px', margin: '0 0 10px 0', textAlign: 'center'}}>FATURA</h3>
                            <div style={{fontSize: '16px', fontWeight: 'bold', textAlign: 'center'}}>Nº {dadosFatura.numero}</div>
                            <div style={{fontSize: '14px', marginTop: '5px', textAlign: 'center'}}>Data: {dataFormatada}</div>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>

                  {/* Dados do Cliente */}
                  <div style={{marginBottom: '30px'}}>
                    <div style={{backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', padding: '20px'}}>
                      <h4 style={{color: '#0066cc', fontSize: '16px', margin: '0 0 15px 0', borderBottom: '1px solid #0066cc', paddingBottom: '5px'}}>
                        FATURAR A:
                      </h4>
                      <div style={{fontSize: '14px', lineHeight: '1.8'}}>
                        <div><strong>Nome:</strong> {dadosFatura.cliente.nome}</div>
                        <div><strong>NIF:</strong> {dadosFatura.cliente.nif || '---'}</div>
                        <div><strong>Endereço:</strong> {dadosFatura.cliente.endereco || '---'}</div>
                        <div><strong>Telefone:</strong> {dadosFatura.cliente.telefone || '---'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Tabela de Itens */}
                  <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '30px', fontSize: '10px'}}>
                    <thead>
                      <tr style={{backgroundColor: '#0066cc', color: 'white'}}>
                        <th style={{padding: '12px', textAlign: 'left', border: '1px solid #0066cc'}}>DESCRIÇÃO</th>
                        <th style={{padding: '12px', textAlign: 'center', border: '1px solid #0066cc', width: '80px'}}>QTD</th>
                        <th style={{padding: '12px', textAlign: 'right', border: '1px solid #0066cc', width: '120px'}}>PREÇO UNIT. (Kz)</th>
                        <th style={{padding: '12px', textAlign: 'right', border: '1px solid #0066cc', width: '120px'}}>TOTAL (Kz)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dadosFatura.itens.map((item, index) => (
                        <tr key={item.id || index} style={{backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white'}}>
                          <td style={{padding: '10px', border: '1px solid #dee2e6'}}>{item.descricao}</td>
                          <td style={{padding: '10px', textAlign: 'center', border: '1px solid #dee2e6'}}>{item.quantidade}</td>
                          <td style={{padding: '10px', textAlign: 'right', border: '1px solid #dee2e6'}}>{item.precoUnitario.toLocaleString()}</td>
                          <td style={{padding: '10px', textAlign: 'right', border: '1px solid #dee2e6', fontWeight: 'bold'}}>{item.subtotal.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Totais */}
                  <table style={{width: '100%', marginBottom: '30px'}}>
                    <tr>
                      <td style={{width: '60%'}}></td>
                      <td style={{width: '40%'}}>
                        <table style={{width: '100%', fontSize: '10px'}}>
                          <tr>
                            <td style={{padding: '8px', textAlign: 'right', borderBottom: '1px solid #dee2e6'}}>
                              <strong>Subtotal:</strong>
                            </td>
                            <td style={{padding: '8px', textAlign: 'right', borderBottom: '1px solid #dee2e6', width: '120px'}}>
                              Kz {subtotal.toLocaleString()}
                            </td>
                          </tr>
                          <tr>
                            <td style={{padding: '8px', textAlign: 'right', borderBottom: '1px solid #dee2e6'}}>
                              <strong>IVA (14%):</strong>
                            </td>
                            <td style={{padding: '8px', textAlign: 'right', borderBottom: '1px solid #dee2e6'}}>
                              Kz {iva.toLocaleString()}
                            </td>
                          </tr>
                          <tr style={{backgroundColor: '#0066cc', color: 'white'}}>
                            <td style={{padding: '12px', textAlign: 'right', fontSize: '16px'}}>
                              <strong>TOTAL A PAGAR:</strong>
                            </td>
                            <td style={{padding: '12px', textAlign: 'right', fontSize: '18px', fontWeight: 'bold'}}>
                              Kz {total.toLocaleString()}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  {/* Informações de Pagamento */}
                  <div style={{display: 'flex', gap: '30px', marginBottom: '30px'}}>
                    <div style={{flex: 1}}>
                      <h4 style={{color: '#0066cc', fontSize: '14px', margin: '0 0 10px 0'}}>FORMAS DE PAGAMENTO ACEITES:</h4>
                      <div style={{fontSize: '13px', lineHeight: '1.6'}}>
                        <div>☐ Numerário (Dinheiro)</div>
                        <div>☐ Multicaixa Express</div>
                        <div>☐ Transferência Bancária</div>
                        <div>☐ Cartão de Crédito/Débito</div>
                      </div>
                    </div>
                    <div style={{flex: 1}}>
                      <h4 style={{color: '#0066cc', fontSize: '14px', margin: '0 0 10px 0'}}>CONDIÇÕES:</h4>
                      <div style={{fontSize: '13px', lineHeight: '1.6'}}>
                        <div>• Garantia de 30 dias para serviços</div>
                        <div>• Peças com garantia do fabricante</div>
                        <div>• Pagamento à vista ou conforme acordo</div>
                      </div>
                    </div>
                  </div>

                  {/* Rodapé Legal */}
                  <div style={{borderTop: '2px solid #0066cc', paddingTop: '20px', textAlign: 'center'}}>
                    <div style={{fontSize: '12px', color: '#666', lineHeight: '1.5'}}>
                      <div style={{marginBottom: '10px'}}>
                        <strong>Processado por computador - Documento válido sem assinatura</strong>
                      </div>
                      <div>
                        Regime Geral do IVA - Artigo 36º do Código do IVA | Lei nº 7/19 de 14 de Maio
                      </div>
                      <div style={{marginTop: '10px', fontSize: '11px'}}>
                        Documento emitido em {hoje.toLocaleString('pt-AO')} | Sistema FlxMotor v1.0
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}