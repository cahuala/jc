import React, { useState, useEffect } from 'react';

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

interface MovimentacaoModalProps {
  movimentacao: Movimentacao | null;
  onSave: (movimentacao: Movimentacao) => void;
  onClose: () => void;
}

const categoriasEntrada = [
  'Faturamento',
  'Vendas à Vista',
  'Recebimento de Clientes',
  'Empréstimos',
  'Investimentos',
  'Outros Recebimentos'
];

const categoriasSaida = [
  'Fornecedores',
  'Operacional',
  'Salários',
  'Impostos',
  'Aluguel',
  'Utilities',
  'Marketing',
  'Manutenção',
  'Outros Pagamentos'
];

const formasPagamento = [
  'Dinheiro',
  'Multicaixa',
  'Transferência',
  'Cheque',
  'Cartão de Débito',
  'Cartão de Crédito'
];

export default function MovimentacaoModal({ movimentacao, onSave, onClose }: MovimentacaoModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Movimentacao>({
    id: 0,
    data: new Date().toISOString().slice(0, 16),
    tipo: 'entrada',
    categoria: '',
    descricao: '',
    valor: 0,
    origem: 'Dinheiro',
    documento: '',
    saldoAnterior: 1335000, // Mock do saldo atual
    saldoAtual: 1335000
  });

  useEffect(() => {
    if (movimentacao) {
      setFormData(movimentacao);
    }
  }, [movimentacao]);

  useEffect(() => {
    // Calcular saldo atual baseado no tipo e valor
    const novoSaldo = formData.tipo === 'entrada' ? 
      formData.saldoAnterior + formData.valor : 
      formData.saldoAnterior - formData.valor;
    
    setFormData(prev => ({ ...prev, saldoAtual: novoSaldo }));
  }, [formData.tipo, formData.valor, formData.saldoAnterior]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'valor') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else if (name === 'tipo') {
      // Limpar categoria quando mudar o tipo
      setFormData(prev => ({ ...prev, [name]: value, categoria: '' }));
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

  const categorias = formData.tipo === 'entrada' ? categoriasEntrada : categoriasSaida;

  return (
    <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className={`modal-header ${formData.tipo === 'entrada' ? 'bg-success' : 'bg-danger'} text-white`}>
            <h5 className="modal-title">
              <i className={`fa ${formData.tipo === 'entrada' ? 'fa-arrow-up' : 'fa-arrow-down'} me-2`}></i>
              {movimentacao ? 'Editar Movimentação' : `Nova ${formData.tipo === 'entrada' ? 'Entrada' : 'Saída'}`}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-8">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Tipo de Movimentação *</label>
                      <select
                        className="form-select"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="entrada">Entrada</option>
                        <option value="saida">Saída</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Data e Hora *</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="data"
                        value={formData.data}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Categoria *</label>
                      <select
                        className="form-select"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Selecione a categoria...</option>
                        {categorias.map(categoria => (
                          <option key={categoria} value={categoria}>{categoria}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Forma de Pagamento *</label>
                      <select
                        className="form-select"
                        name="origem"
                        value={formData.origem}
                        onChange={handleInputChange}
                        required
                      >
                        {formasPagamento.map(forma => (
                          <option key={forma} value={forma}>{forma}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">Descrição *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleInputChange}
                        placeholder="Descrição detalhada da movimentação"
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
                      <label className="form-label fw-bold">Documento de Referência</label>
                      <input
                        type="text"
                        className="form-control"
                        name="documento"
                        value={formData.documento}
                        onChange={handleInputChange}
                        placeholder="Ex: FT-2024/001, REC-001"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card bg-light">
                    <div className="card-header">
                      <h6 className="card-title mb-0">
                        <i className="fa fa-calculator me-2"></i>
                        Resumo da Movimentação
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="mb-2">
                        <strong>Tipo:</strong><br/>
                        <span className={`badge ${formData.tipo === 'entrada' ? 'bg-success' : 'bg-danger'}`}>
                          {formData.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                        </span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Categoria:</strong><br/>
                        <span className="text-info">{formData.categoria || 'Não selecionada'}</span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Forma:</strong><br/>
                        <span className="text-muted">{formData.origem}</span>
                      </div>
                      
                      <hr/>
                      
                      <div className="mb-2">
                        <strong>Saldo Anterior:</strong><br/>
                        <span className="h6">Kz {formData.saldoAnterior.toFixed(2)}</span>
                      </div>
                      
                      <div className="mb-2">
                        <strong>Valor da Movimentação:</strong><br/>
                        <span className={`h5 ${formData.tipo === 'entrada' ? 'text-success' : 'text-danger'}`}>
                          {formData.tipo === 'entrada' ? '+' : '-'} Kz {formData.valor.toFixed(2)}
                        </span>
                      </div>
                      
                      <hr/>
                      
                      <div className="mb-0">
                        <strong>Saldo Resultante:</strong><br/>
                        <span className="h4 text-primary">Kz {formData.saldoAtual.toFixed(2)}</span>
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
              <button 
                type="submit" 
                className={`btn ${formData.tipo === 'entrada' ? 'btn-success' : 'btn-danger'}`} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Salvando...
                  </>
                ) : (
                  <>
                    <i className="fa fa-save me-2"></i>
                    {movimentacao ? 'Atualizar' : 'Registrar'} Movimentação
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