'use client'
import { Wrench, Droplets, Car, Settings, Shield, Clock, CheckCircle, Star } from 'lucide-react';
import { useState } from 'react';

const services = [
  {
    id: 1,
    name: 'Manutenção Preventiva',
    icon: Wrench,
    description: 'Troca de óleo, filtros e revisão geral',
    price: 25000,
    duration: '2-3 horas',
    category: 'manutencao'
  },
  {
    id: 2,
    name: 'Lavagem Completa',
    icon: Droplets,
    description: 'Lavagem externa, interna e enceramento',
    price: 8000,
    duration: '1-2 horas',
    category: 'lavagem'
  },
  {
    id: 3,
    name: 'Diagnóstico Eletrônico',
    icon: Settings,
    description: 'Análise completa dos sistemas eletrônicos',
    price: 15000,
    duration: '1 hora',
    category: 'diagnostico'
  },
  {
    id: 4,
    name: 'Inspeção Pré-Compra',
    icon: Shield,
    description: 'Vistoria completa para compra de veículo',
    price: 35000,
    duration: '2-4 horas',
    category: 'inspecao'
  },
  {
    id: 5,
    name: 'Troca de Pneus',
    icon: Car,
    description: 'Montagem, balanceamento e alinhamento',
    price: 12000,
    duration: '1 hora',
    category: 'pneus'
  },
  {
    id: 6,
    name: 'Revisão de Freios',
    icon: Wrench,
    description: 'Verificação e troca de pastilhas/discos',
    price: 45000,
    duration: '2-3 horas',
    category: 'freios'
  }
];

interface WorkshopServicesProps {
  workshopId?: number;
}

export function WorkshopServices({ workshopId }: WorkshopServicesProps) {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const categories = [
    { id: 'todos', name: 'Todos os Serviços' },
    { id: 'manutencao', name: 'Manutenção' },
    { id: 'lavagem', name: 'Lavagem' },
    { id: 'diagnostico', name: 'Diagnóstico' },
    { id: 'inspecao', name: 'Inspeção' },
    { id: 'pneus', name: 'Pneus' },
    { id: 'freios', name: 'Freios' }
  ];

  const filteredServices = selectedCategory === 'todos' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#005b52] mb-2">Serviços Disponíveis</h2>
        <p className="text-slate-600">Escolha o serviço ideal para seu veículo</p>
      </div>

      {/* Filtros de Categoria */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#005b52] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Serviços */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((service) => {
          const IconComponent = service.icon;
          return (
            <div
              key={service.id}
              className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                selectedService === service.id
                  ? 'border-[#9fc031] bg-[#9fc031]/5'
                  : 'border-slate-200 hover:border-[#005b52]/30'
              }`}
              onClick={() => setSelectedService(service.id)}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-[#005b52] rounded-lg flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#005b52] mb-1">{service.name}</h3>
                  <p className="text-sm text-slate-600 mb-3">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-bold text-[#9fc031]">
                        {service.price.toLocaleString()} Kz
                      </span>
                      <div className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                    {selectedService === service.id && (
                      <CheckCircle className="w-5 h-5 text-[#9fc031]" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botão de Agendamento */}
      {selectedService && (
        <div className="mt-6 p-4 bg-[#005b52]/5 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-[#005b52]">Serviço Selecionado</h4>
              <p className="text-sm text-slate-600">
                {services.find(s => s.id === selectedService)?.name}
              </p>
            </div>
            <button className="bg-[#9fc031] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8ab028] transition-colors">
              Agendar Serviço
            </button>
          </div>
        </div>
      )}

      {/* Avaliações da Oficina */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 fill-[#9fc031] text-[#9fc031]" />
          <span className="font-semibold text-[#005b52]">4.8</span>
          <span className="text-slate-600">(234 avaliações)</span>
        </div>
        <div className="text-sm text-slate-600">
          <p>"Excelente atendimento e serviços de qualidade. Recomendo!"</p>
          <p className="mt-1 font-medium">- Cliente verificado</p>
        </div>
      </div>
    </div>
  );
}