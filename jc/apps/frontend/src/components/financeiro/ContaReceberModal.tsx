import React, { useState, useEffect } from 'react';

interface ContaReceber {
  id: number;
  cliente: string;
  nifCliente: string;
  documento: string;
  descricao: string;
  valor: number;
  dataVencimento: string;
  status: 'pendente' | 'vencida' | 'paga';
  observacoes: string;
}

interface ContaReceberModalProps {
  conta: ContaReceber | null;
  onSave: (conta: ContaReceber) => void;
  onClose: () => void;
}

const clientesDisponiveis = [
  { nome: 'João Silva', nif: '123456789' },
  { nome: 'Maria Santos', nif: '987654321' },
  { nome: 'Carlos Mendes', nif: '456789123' },
  { nome: 'Ana Costa', nif: '789123456' },
  { nome: 'Pedro Oliveira', nif: '321654987' }
];

export default function ContaReceberModal({ conta, onSave, onClose }: ContaReceberModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ContaReceber>({
    id: 0,
    cliente: '',
    nifCliente: '',
    documento: '',
    descricao: '',
    valor: 0,
    dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    status: 'pendente',
    observacoes: ''
  });

  useEffect(() => {
    if (conta) {
      setFormData(conta);
    }
  }, [conta]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cliente') {
      const cliente = clientesDisponiveis.find(c => c.nome === value);
      setFormData(prev => ({
        ...prev,
        cliente: value,
        nifCliente: cliente?.nif || ''
      }));
    } else if (name === 'valor') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setTimeout(() => {
      onSave(formData);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fa fa-file-invoice me-2"></i>
              {conta ? 'Editar Conta a Receber' : 'Nova Conta a Receber'}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-8">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label fw-bold">Cliente *</label>
                      <select
                        className="form-select"
                        name="cliente"
                        value={formData.cliente}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Selecione o cliente...</option>
                        {clientesDisponiveis.map(cliente => (
                          <option key={cliente.nif} value={cliente.nome}>{cliente.nome}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">NIF do Cliente</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.nifCliente}
                        readOnly
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Documento de Referência</label>
                      <input
                        type="text"
                        className="form-control"
                        name="documento"
                        value={formData.documento}
                        onChange={handleInputChange}
                        placeholder="Ex: FT-2024/001"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Data de Vencimento *</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dataVencimento"
                        value={formData.dataVencimento}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">Descrição *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleInputChange}
                        placeholder="Descrição do serviço ou produto"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Valor (Kz) *</label>
                      <div className="input-group">
                        <span className="input-group-text">Kz</span>
                        <input
                          type="number"
                          className="form-control"
                          name="valor"
                          value={formData.valor}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Status</label>
                      <select
                        className="form-select"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="pendente">Pendente</option>
                        <option value="paga">Paga</option>
                        <option value="vencida">Vencida</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">Observações</label>
                      <textarea
                        className="form-control"
                        name="observacoes"
                        value={formData.observacoes}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Observações sobre a conta..."
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card bg-light">
                    <div className="card-header">
                      <h6 className="card-title mb-0">
                        <i className="fa fa-info-circle me-2"></i>
                        Resumo da Conta
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="mb-2">
                        <strong>Cliente:</strong><br/>
                        <span className="text-primary">{formData.cliente || 'Não selecionado'}</span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>NIF:</strong><br/>
                        <span className="text-muted">{formData.nifCliente || 'N/A'}</span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Documento:</strong><br/>
                        <span className="text-info">{formData.documento || 'N/A'}</span>
                      </div>
                      
                      <hr/>
                      
                      <div className="mb-2">
                        <strong>Valor:</strong><br/>
                        <span className="h4 text-success">Kz {formData.valor.toFixed(2)}</span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Vencimento:</strong><br/>
                        <span className="text-warning">
                          {formData.dataVencimento ? 
                            new Date(formData.dataVencimento).toLocaleDateString('pt-AO') : 
                            'N/A'
                          }
                        </span>
                      </div>
                      
                      <div className="mb-0">
                        <strong>Status:</strong><br/>
                        <span className={`badge ${
                          formData.status === 'paga' ? 'bg-success' :
                          formData.status === 'vencida' ? 'bg-danger' : 'bg-primary'
                        }`}>
                          {formData.status === 'paga' ? 'Paga' :
                           formData.status === 'vencida' ? 'Vencida' : 'Pendente'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer bg-light">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                <i className="fa fa-times me-2"></i>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Salvando...
                  </>
                ) : (
                  <>
                    <i className="fa fa-save me-2"></i>
                    {conta ? 'Atualizar' : 'Salvar'} Conta
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}