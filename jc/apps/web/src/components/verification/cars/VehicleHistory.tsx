import { Calendar, FileText, Wrench, AlertCircle, CheckCircle, TrendingDown, DollarSign } from 'lucide-react';
import { useState } from 'react';

const mockHistory = [
  {
    id: 1,
    date: '15/01/2025',
    type: 'Manutenção Preventiva',
    workshop: 'AutoCenter Premium',
    description: 'Troca de óleo e filtros, revisão dos 10.000 km',
    parts: [
      { name: 'Óleo sintético 5W30', price: 'R$ 180' },
      { name: 'Filtro de óleo', price: 'R$ 45' },
      { name: 'Filtro de ar', price: 'R$ 80' }
    ],
    total: 'R$ 485',
    status: 'completed',
    severity: 'low'
  },
  {
    id: 2,
    date: '03/12/2024',
    type: 'Reparo',
    workshop: 'Mecânica Silva & Filhos',
    description: 'Substituição de pastilhas e discos de freio dianteiros',
    parts: [
      { name: 'Pastilhas de freio (jogo)', price: 'R$ 280' },
      { name: 'Discos de freio (par)', price: 'R$ 520' },
      { name: 'Fluido de freio DOT 4', price: 'R$ 65' }
    ],
    total: 'R$ 1.145',
    status: 'completed',
    severity: 'medium'
  },
  {
    id: 3,
    date: '20/10/2024',
    type: 'Diagnóstico',
    workshop: 'CarCheck Diagnósticos',
    description: 'Vistoria completa pré-compra com laudo técnico',
    parts: [],
    total: 'R$ 450',
    status: 'completed',
    severity: 'low',
    notes: 'Veículo aprovado com pequenos desgastes normais para o ano/km'
  },
  {
    id: 4,
    date: '15/08/2024',
    type: 'Manutenção Preventiva',
    workshop: 'Auto Reparo Expresso',
    description: 'Alinhamento e balanceamento, rotação de pneus',
    parts: [
      { name: 'Alinhamento', price: 'R$ 120' },
      { name: 'Balanceamento (4 rodas)', price: 'R$ 100' }
    ],
    total: 'R$ 220',
    status: 'completed',
    severity: 'low'
  },
  {
    id: 5,
    date: '10/06/2024',
    type: 'Reparo',
    workshop: 'Oficina Técnica Automotiva',
    description: 'Troca de bateria e correias do motor',
    parts: [
      { name: 'Bateria 60Ah', price: 'R$ 480' },
      { name: 'Correia dentada', price: 'R$ 280' },
      { name: 'Correia do alternador', price: 'R$ 90' },
      { name: 'Tensor automático', price: 'R$ 180' }
    ],
    total: 'R$ 1.210',
    status: 'completed',
    severity: 'medium'
  }
];

export function VehicleHistory() {
  const [selectedPlate, setSelectedPlate] = useState('ABC-1234');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const totalSpent = mockHistory.reduce((acc, item) => {
    const value = parseFloat(item.total.replace('R$ ', '').replace('.', '').replace(',', '.'));
    return acc + value;
  }, 0);

  return (
    <section id="historico" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#005b52] mb-4">
            Histórico do Veículo
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Acompanhe todo o histórico de manutenções e reparos
          </p>

          {/* Vehicle Selector */}
          <div className="max-w-md mx-auto mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-2 text-left">
              Placa do Veículo
            </label>
            <input
              type="text"
              value={selectedPlate}
              onChange={(e) => setSelectedPlate(e.target.value)}
              placeholder="ABC-1234"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#005b52] to-[#007066] rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-6 h-6" />
              <span className="text-sm font-medium">Total de Serviços</span>
            </div>
            <div className="text-3xl font-bold">{mockHistory.length}</div>
          </div>

          <div className="bg-gradient-to-br from-[#9fc031] to-[#8ab028] rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-6 h-6" />
              <span className="text-sm font-medium">Total Investido</span>
            </div>
            <div className="text-3xl font-bold">
              R$ {totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#005b52] to-[#007066] rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-6 h-6" />
              <span className="text-sm font-medium">Última Revisão</span>
            </div>
            <div className="text-3xl font-bold">{mockHistory[0].date}</div>
          </div>
        </div>

        {/* History Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {mockHistory.map((item, index) => (
              <div 
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      item.type === 'Reparo' ? 'bg-orange-100' :
                      item.type === 'Diagnóstico' ? 'bg-[#005b52]/10' :
                      'bg-[#9fc031]/10'
                    }`}>
                      {item.type === 'Reparo' ? (
                        <Wrench className="w-6 h-6 text-orange-600" />
                      ) : item.type === 'Diagnóstico' ? (
                        <FileText className="w-6 h-6 text-[#005b52]" />
                      ) : (
                        <CheckCircle className="w-6 h-6 text-[#9fc031]" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-[#005b52] mb-1">
                            {item.type}
                          </h3>
                          <p className="text-slate-600">{item.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-[#005b52]">{item.total}</div>
                          <div className="text-sm text-slate-500">{item.date}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Wrench className="w-4 h-4" />
                          {item.workshop}
                        </span>
                        {item.severity === 'medium' && (
                          <span className="flex items-center gap-1 text-orange-600">
                            <AlertCircle className="w-4 h-4" />
                            Reparo Importante
                          </span>
                        )}
                        {item.status === 'completed' && (
                          <span className="flex items-center gap-1 text-[#9fc031]">
                            <CheckCircle className="w-4 h-4" />
                            Concluído
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedId === item.id && (
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      {item.parts.length > 0 && (
                        <>
                          <h4 className="font-semibold text-[#005b52] mb-3">Peças Substituídas:</h4>
                          <div className="space-y-2 mb-4">
                            {item.parts.map((part, idx) => (
                              <div key={idx} className="flex justify-between items-center bg-slate-50 px-4 py-2 rounded-lg">
                                <span className="text-slate-700">{part.name}</span>
                                <span className="font-semibold text-[#005b52]">{part.price}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                      {item.notes && (
                        <div className="bg-[#9fc031]/10 border border-[#9fc031]/30 rounded-lg p-4">
                          <p className="text-sm text-[#005b52]">
                            <strong>Observações:</strong> {item.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="bg-gradient-to-r from-[#9fc031] to-[#8ab028] text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all font-semibold">
              Ver Relatório Completo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}