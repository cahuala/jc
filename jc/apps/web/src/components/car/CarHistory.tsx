'use client'
import { Calendar, MapPin, Wrench, Droplets, Shield, Lock, Crown, CheckCircle, Star, Clock, User } from 'lucide-react';
import { useState } from 'react';

interface HistoryRecord {
  id: number;
  date: string;
  type: 'manutencao' | 'lavagem' | 'inspecao' | 'reparo';
  workshop: string;
  workshopRating: number;
  description: string;
  cost: number;
  parts?: string[];
  technician: string;
  photos?: string[];
  warranty?: string;
  status: 'concluido' | 'pendente' | 'cancelado';
}

const mockHistory: HistoryRecord[] = [
  {
    id: 1,
    date: '2024-01-15',
    type: 'manutencao',
    workshop: 'AutoCenter Premium',
    workshopRating: 4.9,
    description: 'Manutenção preventiva completa - Troca de óleo, filtros e revisão geral do motor',
    cost: 25000,
    parts: ['Óleo 5W30 - 4L', 'Filtro de óleo', 'Filtro de ar', 'Filtro de combustível'],
    technician: 'João Santos',
    warranty: '6 meses ou 10.000 km',
    status: 'concluido'
  },
  {
    id: 2,
    date: '2024-01-10',
    type: 'lavagem',
    workshop: 'Clean Car Express',
    workshopRating: 4.7,
    description: 'Lavagem completa com enceramento e limpeza interna detalhada',
    cost: 8000,
    technician: 'Maria Silva',
    status: 'concluido'
  },
  {
    id: 3,
    date: '2023-12-20',
    type: 'reparo',
    workshop: 'Mecânica Silva & Filhos',
    workshopRating: 4.8,
    description: 'Substituição de pastilhas e discos de freio dianteiros',
    cost: 45000,
    parts: ['Pastilhas de freio dianteiras', 'Discos de freio dianteiros', 'Fluido de freio'],
    technician: 'Carlos Silva',
    warranty: '12 meses ou 20.000 km',
    status: 'concluido'
  },
  {
    id: 4,
    date: '2023-11-15',
    type: 'inspecao',
    workshop: 'CarCheck Diagnósticos',
    workshopRating: 4.9,
    description: 'Inspeção pré-compra completa com laudo técnico detalhado',
    cost: 35000,
    technician: 'Dr. Pedro Costa',
    status: 'concluido'
  },
  {
    id: 5,
    date: '2023-10-30',
    type: 'manutencao',
    workshop: 'Auto Reparo Expresso',
    workshopRating: 4.6,
    description: 'Troca de correia dentada e tensor',
    cost: 65000,
    parts: ['Correia dentada', 'Tensor da correia', 'Bomba d\'água'],
    technician: 'Roberto Lima',
    warranty: '24 meses ou 40.000 km',
    status: 'concluido'
  }
];

interface CarHistoryProps {
  carId: string;
  hasAccess?: boolean;
}

export function CarHistory({ carId, hasAccess = false }: CarHistoryProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'manutencao': return Wrench;
      case 'lavagem': return Droplets;
      case 'inspecao': return Shield;
      case 'reparo': return Wrench;
      default: return Wrench;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'manutencao': return 'bg-blue-100 text-blue-800';
      case 'lavagem': return 'bg-cyan-100 text-cyan-800';
      case 'inspecao': return 'bg-green-100 text-green-800';
      case 'reparo': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'manutencao': return 'Manutenção';
      case 'lavagem': return 'Lavagem';
      case 'inspecao': return 'Inspeção';
      case 'reparo': return 'Reparo';
      default: return 'Serviço';
    }
  };

  if (!hasAccess) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#005b52] mb-4">Histórico Completo do Veículo</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>15 Manutenções registradas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>8 Lavagens documentadas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>3 Inspeções completas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Todas as peças trocadas</span>
              </div>
            </div>
            
            <p className="text-slate-600 mb-6">
              Acesse o histórico completo deste veículo e veja todos os serviços realizados, 
              peças trocadas, oficinas visitadas e muito mais.
            </p>
            
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-[#005b52]">Plano Premium</span>
                <div className="flex items-center gap-1">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-600 font-medium">Recomendado</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-[#9fc031] mb-2">5.000 Kz</div>
              <div className="text-sm text-slate-600">Acesso completo por 30 dias</div>
            </div>
            
            <button 
              onClick={() => setShowPaymentModal(true)}
              className="bg-gradient-to-r from-[#9fc031] to-[#8ab028] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Desbloquear Histórico
            </button>
          </div>
          
          {/* Preview dos últimos registros */}
          <div className="text-left">
            <h3 className="font-semibold text-[#005b52] mb-3">Últimos Registros (Preview)</h3>
            <div className="space-y-3">
              {mockHistory.slice(0, 2).map((record) => {
                const IconComponent = getTypeIcon(record.type);
                return (
                  <div key={record.id} className="relative">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg opacity-60">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(record.type)}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-[#005b52]">{getTypeName(record.type)}</div>
                        <div className="text-sm text-slate-600">{record.workshop}</div>
                        <div className="text-xs text-slate-500">{record.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-[#9fc031]">{record.cost.toLocaleString()} Kz</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-white/50 rounded-lg flex items-center justify-center">
                      <Lock className="w-6 h-6 text-slate-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Modal de Pagamento */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-[#005b52] mb-4">Desbloquear Histórico</h3>
              <div className="space-y-4">
                <div className="bg-[#005b52]/5 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span>Plano Premium</span>
                    <span className="font-bold text-[#9fc031]">5.000 Kz</span>
                  </div>
                  <div className="text-sm text-slate-600">Acesso por 30 dias</div>
                </div>
                <div className="space-y-2">
                  <button className="w-full bg-[#9fc031] text-white py-3 rounded-lg font-semibold">
                    Pagar com Multicaixa
                  </button>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
                    Pagar com Cartão
                  </button>
                </div>
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full border border-slate-300 text-slate-700 py-2 rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#005b52]">Histórico Completo do Veículo</h2>
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg">
          <Crown className="w-4 h-4" />
          <span className="text-sm font-medium">Premium Ativo</span>
        </div>
      </div>

      <div className="space-y-4">
        {mockHistory.map((record, index) => {
          const IconComponent = getTypeIcon(record.type);
          return (
            <div key={record.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(record.type)}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-[#005b52]">{getTypeName(record.type)}</h3>
                      <span className="text-sm text-slate-500">{record.date}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#9fc031]">{record.cost.toLocaleString()} Kz</div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-700">{record.workshop}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-slate-600">{record.workshopRating}</span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm">{record.description}</p>
                  </div>
                  
                  {record.parts && (
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-slate-700 mb-1">Peças utilizadas:</h4>
                      <div className="flex flex-wrap gap-1">
                        {record.parts.map((part, partIndex) => (
                          <span key={partIndex} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">
                            {part}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{record.technician}</span>
                      </div>
                      {record.warranty && (
                        <div className="flex items-center gap-1">
                          <Shield className="w-4 h-4" />
                          <span>Garantia: {record.warranty}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 font-medium">Concluído</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-[#005b52]/5 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-[#9fc031]" />
          <span className="font-semibold text-[#005b52]">Histórico Verificado</span>
        </div>
        <p className="text-sm text-slate-600">
          Todos os registros foram verificados e validados pelas oficinas parceiras da plataforma.
        </p>
      </div>
    </div>
  );
}