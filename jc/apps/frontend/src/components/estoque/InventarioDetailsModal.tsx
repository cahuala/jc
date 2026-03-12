import React from 'react';

interface ItemInventario {
  id: number;
  produto: string;
  categoria: string;
  estoqueAtual: number;
  estoqueContado: number;
  diferenca: number;
  valorUnitario: number;
  valorDiferenca: number;
  status: string;
  usuario: string;
  dataContagem: string;
}

interface InventarioDetailsModalProps {
  item: ItemInventario;
  onClose: () => void;
}

export default function InventarioDetailsModal({ item, onClose }: InventarioDetailsModalProps) {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'conferido': return 'bg-success';
      case 'pendente': return 'bg-warning';
      case 'ajustado': return 'bg-info';
      default: return 'bg-secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'conferido': return 'Conferido';
      case 'pendente': return 'Pendente';
      case 'ajustado': return 'Ajustado';
      default: return 'Indefinido';
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
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fa fa-clipboard-list me-2"></i>
              Detalhes do Inventário
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Informações do Produto</h6>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Produto:</strong>
                      </div>
                      <div className="col-sm-8">
                        {item.produto}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Categoria:</strong>
                      </div>
                      <div className="col-sm-8">
                        <span className="badge bg-info">{item.categoria}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Valor Unitário:</strong>
                      </div>
                      <div className="col-sm-8">
                        <span className="fw-bold">Kz {item.valorUnitario.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Status:</strong>
                      </div>
                      <div className="col-sm-8">
                        <span className={`badge ${getStatusBadge(item.status)}`}>
                          {getStatusText(item.status)}
                        </span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <strong>Usuário:</strong>
                      </div>
                      <div className="col-sm-8">
                        {item.usuario}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <strong>Data/Hora:</strong>
                      </div>
                      <div className="col-sm-8">
                        {formatDateTime(item.dataContagem).date} às {formatDateTime(item.dataContagem).time}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Resumo da Contagem</h6>
                  </div>
                  <div className="card-body">
                    <div className="text-center mb-3">
                      <div className="h4 mb-1">{item.estoqueAtual}</div>
                      <small className="text-muted">Estoque Atual</small>
                    </div>
                    <div className="text-center mb-3">
                      <div className="h4 mb-1">{item.estoqueContado}</div>
                      <small className="text-muted">Estoque Contado</small>
                    </div>
                    <hr />
                    <div className="text-center mb-3">
                      <div className={`h4 mb-1 ${item.diferenca > 0 ? 'text-success' : item.diferenca < 0 ? 'text-danger' : 'text-muted'}`}>
                        {item.diferenca > 0 ? '+' : ''}{item.diferenca}
                      </div>
                      <small className="text-muted">Diferença</small>
                    </div>
                    <div className="text-center">
                      <div className={`h5 mb-1 ${item.valorDiferenca > 0 ? 'text-success' : item.valorDiferenca < 0 ? 'text-danger' : 'text-muted'}`}>
                        Kz {item.valorDiferenca.toFixed(2)}
                      </div>
                      <small className="text-muted">Impacto Financeiro</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Fechar
            </button>
            <button type="button" className="btn btn-primary">
              <i className="fa fa-print me-2"></i>
              Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}