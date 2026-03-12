import React from 'react';

interface Servico {
  nome: string;
  preco: number;
  status: string;
}

interface Peca {
  nome: string;
  quantidade: number;
  preco: number;
}

interface OrdemServico {
  id: number;
  numero: string;
  cliente: string;
  veiculo: string;
  placa: string;
  dataAbertura: string;
  dataPrevisao: string;
  status: string;
  prioridade: string;
  mecanico: string | null;
  servicos: Servico[];
  pecas: Peca[];
  valorTotal: number;
  observacoes: string;
}

interface OrdemServicoPrintProps {
  ordem: OrdemServico;
  onClose: () => void;
}

export default function OrdemServicoPrint({ ordem, onClose }: OrdemServicoPrintProps) {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Ordem de Serviço ${ordem.numero}</title>
          <style>
            body { font-family: 'Times New Roman', serif; font-size: 14px; line-height: 1.4; margin: 20px; }
            table { border-collapse: collapse; }
            .header { text-align: center; border-bottom: 3px solid #000; padding-bottom: 20px; margin-bottom: 25px; }
            .title { font-size: 28px; font-weight: bold; margin: 0 0 10px 0; letter-spacing: 2px; }
            .info { font-size: 16px; line-height: 1.6; }
            .doc-title { text-align: center; margin-bottom: 30px; }
            .doc-number { font-size: 18px; font-weight: bold; color: #d32f2f; border: 2px solid #d32f2f; padding: 8px 15px; display: inline-block; }
            .table-full { width: 100%; border: 2px solid #000; }
            .table-full td, .table-full th { border: 1px solid #000; padding: 12px; }
            .table-full th { background-color: #d0d0d0; font-weight: bold; }
            .label { font-weight: bold; background-color: #e8e8e8; width: 25%; }
            .total-row { background-color: #000; color: #fff; }
            .signatures { margin-top: 40px; }
            .signature { text-align: center; border-top: 1px solid #000; margin-top: 60px; padding-top: 5px; }
            .footer { margin-top: 30px; text-align: center; font-size: 10px; border-top: 1px solid #000; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">FLXMOTOR - OFICINA MECÂNICA</h1>
            <div class="info">
              <strong>Endereço:</strong> Rua da Maianga, Nº 123 - Luanda, Angola<br/>
              <strong>Telefone:</strong> +244 923 456 789 | <strong>Email:</strong> contato@flxmotor.ao<br/>
              <strong>NIF:</strong> 5417038144 | <strong>Alvará:</strong> 12345/2023
            </div>
          </div>
          
          <div class="doc-title">
            <h2 style="font-size: 22px; font-weight: bold; margin: 0 0 15px 0; text-decoration: underline; letter-spacing: 1px;">ORDEM DE SERVIÇO</h2>
            <div class="doc-number">Nº ${ordem.numero}</div>
          </div>
          
          <table class="table-full" style="margin-bottom: 25px;">
            <tr><td class="label">CLIENTE:</td><td style="font-size: 16px;">${ordem.cliente}</td></tr>
            <tr><td class="label">VEÍCULO:</td><td style="font-size: 16px;">${ordem.veiculo} - <strong>Placa:</strong> ${ordem.placa}</td></tr>
            <tr><td class="label">DATA ABERTURA:</td><td>${formatDateTime(ordem.dataAbertura).date} às ${formatDateTime(ordem.dataAbertura).time}</td></tr>
            <tr><td class="label">PREVISÃO:</td><td>${formatDateTime(ordem.dataPrevisao).date} às ${formatDateTime(ordem.dataPrevisao).time}</td></tr>
            <tr><td class="label">MECÂNICO:</td><td>${ordem.mecanico || 'Não atribuído'}</td></tr>
          </table>
          
          <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 15px; text-decoration: underline;">SERVIÇOS SOLICITADOS:</h3>
          <table class="table-full" style="margin-bottom: 25px;">
            <thead>
              <tr><th>DESCRIÇÃO DO SERVIÇO</th><th style="width: 15%;">VALOR (Kz)</th><th style="width: 15%;">STATUS</th></tr>
            </thead>
            <tbody>
              ${ordem.servicos.map(servico => `
                <tr>
                  <td>${servico.nome}</td>
                  <td style="text-align: right; font-weight: bold;">${servico.preco.toFixed(2)}</td>
                  <td style="text-align: center;">${servico.status === 'pendente' ? 'Pendente' : servico.status === 'em_andamento' ? 'Em Andamento' : servico.status === 'concluido' ? 'Concluído' : 'Cancelado'}</td>
                </tr>
              `).join('')}
              <tr style="background-color: #e8e8e8;">
                <td style="font-weight: bold; font-size: 16px;">SUBTOTAL SERVIÇOS:</td>
                <td style="text-align: right; font-weight: bold; font-size: 16px;">${ordem.servicos.reduce((sum, s) => sum + s.preco, 0).toFixed(2)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          
          ${ordem.pecas.length > 0 ? `
            <h3 style="font-size: 14px; font-weight: bold; margin-bottom: 10px; text-decoration: underline;">PEÇAS UTILIZADAS:</h3>
            <table class="table-full" style="margin-bottom: 20px;">
              <thead>
                <tr style="background-color: #f5f5f5;"><th>DESCRIÇÃO DA PEÇA</th><th style="width: 10%;">QTD</th><th style="width: 15%;">VALOR UNIT. (Kz)</th><th style="width: 15%;">TOTAL (Kz)</th></tr>
              </thead>
              <tbody>
                ${ordem.pecas.map(peca => `
                  <tr>
                    <td>${peca.nome}</td>
                    <td style="text-align: center;">${peca.quantidade}</td>
                    <td style="text-align: right;">${(peca.preco / peca.quantidade).toFixed(2)}</td>
                    <td style="text-align: right;">${peca.preco.toFixed(2)}</td>
                  </tr>
                `).join('')}
                <tr style="background-color: #f5f5f5;">
                  <td colspan="3" style="font-weight: bold;">SUBTOTAL PEÇAS:</td>
                  <td style="text-align: right; font-weight: bold;">${ordem.pecas.reduce((sum, p) => sum + p.preco, 0).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          ` : ''}
          
          <table class="table-full" style="margin-bottom: 20px;">
            <tr class="total-row">
              <td style="font-weight: bold; font-size: 16px;">VALOR TOTAL DA ORDEM DE SERVIÇO:</td>
              <td style="text-align: right; font-weight: bold; font-size: 16px; width: 20%;">Kz ${ordem.valorTotal.toFixed(2)}</td>
            </tr>
          </table>
          
          ${ordem.observacoes ? `
            <h3 style="font-size: 14px; font-weight: bold; margin-bottom: 10px; text-decoration: underline;">OBSERVAÇÕES:</h3>
            <div style="border: 1px solid #000; padding: 10px; min-height: 60px; margin-bottom: 20px;">${ordem.observacoes}</div>
          ` : ''}
          
          <div class="signatures">
            <table style="width: 100%;">
              <tr>
                <td style="width: 50%; padding-right: 20px;"><div class="signature"><strong>CLIENTE</strong><br/>${ordem.cliente}</div></td>
                <td style="width: 50%; padding-left: 20px;"><div class="signature"><strong>RESPONSÁVEL TÉCNICO</strong><br/>${ordem.mecanico || 'FLXMOTOR'}</div></td>
              </tr>
            </table>
          </div>
          
          <div class="footer">
            Este documento foi gerado automaticamente pelo sistema FLXMOTOR em ${new Date().toLocaleDateString('pt-AO')} às ${new Date().toLocaleTimeString('pt-AO')}
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('pt-AO'),
      time: date.toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header d-print-none">
            <h5 className="modal-title">
              <i className="fa fa-print me-2"></i>
              Imprimir Ordem de Serviço
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body p-0">

            <div id="ordem-print" style={{ fontFamily: 'Times New Roman, serif', fontSize: '14px', lineHeight: '1.4', padding: '20px', backgroundColor: '#fff' }}>
              {/* Cabeçalho da Empresa */}
              <div style={{ textAlign: 'center', borderBottom: '3px solid #000', paddingBottom: '20px', marginBottom: '25px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 10px 0', color: '#000', letterSpacing: '2px' }}>
                  FLXMOTOR - OFICINA MECÂNICA
                </h1>
                <div style={{ fontSize: '16px', lineHeight: '1.6', color: '#333' }}>
                  <strong>Endereço:</strong> Rua da Maianga, Nº 123 - Luanda, Angola<br/>
                  <strong>Telefone:</strong> +244 923 456 789 | <strong>Email:</strong> contato@flxmotor.ao<br/>
                  <strong>NIF:</strong> 5417038144 | <strong>Alvará:</strong> 12345/2023
                </div>
              </div>

              {/* Título do Documento */}
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 15px 0', textDecoration: 'underline', letterSpacing: '1px' }}>
                  ORDEM DE SERVIÇO
                </h2>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#d32f2f', border: '2px solid #d32f2f', padding: '8px 15px', display: 'inline-block' }}>
                  Nº {ordem.numero}
                </div>
              </div>

              {/* Informações do Cliente e Veículo */}
              <div style={{ marginBottom: '25px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #000', fontSize: '14px' }}>
                  <tbody>
                    <tr>
                      <td style={{ border: '1px solid #000', padding: '12px', fontWeight: 'bold', backgroundColor: '#e8e8e8', width: '25%' }}>
                        CLIENTE:
                      </td>
                      <td style={{ border: '1px solid #000', padding: '12px', width: '75%', fontSize: '16px' }}>
                        {ordem.cliente}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid #000', padding: '12px', fontWeight: 'bold', backgroundColor: '#e8e8e8' }}>
                        VEÍCULO:
                      </td>
                      <td style={{ border: '1px solid #000', padding: '12px', fontSize: '16px' }}>
                        {ordem.veiculo} - <strong>Placa:</strong> {ordem.placa}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid #000', padding: '12px', fontWeight: 'bold', backgroundColor: '#e8e8e8' }}>
                        DATA ABERTURA:
                      </td>
                      <td style={{ border: '1px solid #000', padding: '12px' }}>
                        {formatDateTime(ordem.dataAbertura).date} às {formatDateTime(ordem.dataAbertura).time}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid #000', padding: '12px', fontWeight: 'bold', backgroundColor: '#e8e8e8' }}>
                        PREVISÃO:
                      </td>
                      <td style={{ border: '1px solid #000', padding: '12px' }}>
                        {formatDateTime(ordem.dataPrevisao).date} às {formatDateTime(ordem.dataPrevisao).time}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid #000', padding: '12px', fontWeight: 'bold', backgroundColor: '#e8e8e8' }}>
                        MECÂNICO:
                      </td>
                      <td style={{ border: '1px solid #000', padding: '12px' }}>
                        {ordem.mecanico || 'Não atribuído'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Serviços */}
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', textDecoration: 'underline', color: '#333' }}>
                  SERVIÇOS SOLICITADOS:
                </h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #000', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#d0d0d0' }}>
                      <th style={{ border: '1px solid #000', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>
                        DESCRIÇÃO DO SERVIÇO
                      </th>
                      <th style={{ border: '1px solid #000', padding: '12px', textAlign: 'center', fontWeight: 'bold', width: '15%' }}>
                        VALOR (Kz)
                      </th>
                      <th style={{ border: '1px solid #000', padding: '12px', textAlign: 'center', fontWeight: 'bold', width: '15%' }}>
                        STATUS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordem.servicos.map((servico, index) => (
                      <tr key={index}>
                        <td style={{ border: '1px solid #000', padding: '10px' }}>
                          {servico.nome}
                        </td>
                        <td style={{ border: '1px solid #000', padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
                          {servico.preco.toFixed(2)}
                        </td>
                        <td style={{ border: '1px solid #000', padding: '10px', textAlign: 'center' }}>
                          {servico.status === 'pendente' ? 'Pendente' :
                           servico.status === 'em_andamento' ? 'Em Andamento' :
                           servico.status === 'concluido' ? 'Concluído' : 'Cancelado'}
                        </td>
                      </tr>
                    ))}
                    <tr style={{ backgroundColor: '#e8e8e8' }}>
                      <td style={{ border: '1px solid #000', padding: '12px', fontWeight: 'bold', fontSize: '16px' }}>
                        SUBTOTAL SERVIÇOS:
                      </td>
                      <td style={{ border: '1px solid #000', padding: '12px', textAlign: 'right', fontWeight: 'bold', fontSize: '16px' }}>
                        {ordem.servicos.reduce((sum, s) => sum + s.preco, 0).toFixed(2)}
                      </td>
                      <td style={{ border: '1px solid #000', padding: '12px' }}></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Peças */}
              {ordem.pecas.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', textDecoration: 'underline' }}>
                    PEÇAS UTILIZADAS:
                  </h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f5f5f5' }}>
                        <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>
                          DESCRIÇÃO DA PEÇA
                        </th>
                        <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', fontWeight: 'bold', width: '10%' }}>
                          QTD
                        </th>
                        <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', fontWeight: 'bold', width: '15%' }}>
                          VALOR UNIT. (Kz)
                        </th>
                        <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', fontWeight: 'bold', width: '15%' }}>
                          TOTAL (Kz)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordem.pecas.map((peca, index) => (
                        <tr key={index}>
                          <td style={{ border: '1px solid #000', padding: '8px' }}>
                            {peca.nome}
                          </td>
                          <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>
                            {peca.quantidade}
                          </td>
                          <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'right' }}>
                            {(peca.preco / peca.quantidade).toFixed(2)}
                          </td>
                          <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'right' }}>
                            {peca.preco.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      <tr style={{ backgroundColor: '#f5f5f5' }}>
                        <td colSpan={3} style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>
                          SUBTOTAL PEÇAS:
                        </td>
                        <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>
                          {ordem.pecas.reduce((sum, p) => sum + p.preco, 0).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Total Geral */}
              <div style={{ marginBottom: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #000' }}>
                  <tbody>
                    <tr style={{ backgroundColor: '#000', color: '#fff' }}>
                      <td style={{ border: '1px solid #000', padding: '12px', fontWeight: 'bold', fontSize: '16px' }}>
                        VALOR TOTAL DA ORDEM DE SERVIÇO:
                      </td>
                      <td style={{ border: '1px solid #000', padding: '12px', textAlign: 'right', fontWeight: 'bold', fontSize: '16px', width: '20%' }}>
                        Kz {ordem.valorTotal.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Observações */}
              {ordem.observacoes && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', textDecoration: 'underline' }}>
                    OBSERVAÇÕES:
                  </h3>
                  <div style={{ border: '1px solid #000', padding: '10px', minHeight: '60px' }}>
                    {ordem.observacoes}
                  </div>
                </div>
              )}

              {/* Assinaturas */}
              <div style={{ marginTop: '40px', pageBreakInside: 'avoid' }}>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '50%', textAlign: 'center', paddingRight: '20px' }}>
                        <div style={{ borderTop: '1px solid #000', marginTop: '60px', paddingTop: '5px' }}>
                          <strong>CLIENTE</strong><br/>
                          {ordem.cliente}
                        </div>
                      </td>
                      <td style={{ width: '50%', textAlign: 'center', paddingLeft: '20px' }}>
                        <div style={{ borderTop: '1px solid #000', marginTop: '60px', paddingTop: '5px' }}>
                          <strong>RESPONSÁVEL TÉCNICO</strong><br/>
                          {ordem.mecanico || 'FLXMOTOR'}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Rodapé */}
              <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '10px', borderTop: '1px solid #000', paddingTop: '10px' }}>
                <p style={{ margin: '0' }}>
                  Este documento foi gerado automaticamente pelo sistema FLXMOTOR em {new Date().toLocaleDateString('pt-AO')} às {new Date().toLocaleTimeString('pt-AO')}
                </p>
              </div>
            </div>
          </div>
          <div className="modal-footer d-print-none">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              <i className="fa fa-times me-2"></i>
              Fechar
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