'use client'
import { Car, Calendar, Wrench, FileText, Plus, Eye, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const userCars = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Corolla XEi',
    year: 2020,
    plate: 'LD-123-AB',
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop',
    maintenanceCount: 8,
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-04-15'
  },
  {
    id: 2,
    make: 'Honda',
    model: 'Civic EX',
    year: 2019,
    plate: 'LD-456-CD',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
    maintenanceCount: 12,
    lastMaintenance: '2024-01-20',
    nextMaintenance: '2024-04-20'
  }
];

const maintenanceHistory = [
  {
    id: 1,
    carId: 1,
    date: '2024-01-15',
    type: 'Manutenção Preventiva',
    workshop: 'AutoCenter Premium',
    cost: 25000,
    status: 'Concluído'
  },
  {
    id: 2,
    carId: 1,
    date: '2023-12-10',
    type: 'Troca de Pneus',
    workshop: 'Pneus & Cia',
    cost: 45000,
    status: 'Concluído'
  },
  {
    id: 3,
    carId: 2,
    date: '2024-01-20',
    type: 'Revisão Completa',
    workshop: 'Honda Autorizada',
    cost: 35000,
    status: 'Concluído'
  }
];

export function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('cars');
  const [selectedCar, setSelectedCar] = useState<number | null>(null);

  const getCarMaintenances = (carId: number) => {
    return maintenanceHistory.filter(m => m.carId === carId);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#005b52]">Minha Garagem</h1>
              <p className="text-slate-600">Gerencie seus veículos e manutenções</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-[#9fc031] text-white px-4 py-2 rounded-lg hover:bg-[#8ab028] transition-colors">
                <Plus className="w-4 h-4" />
                Adicionar Carro
              </button>
              <button className="text-slate-600 hover:text-slate-800">
                <Settings className="w-6 h-6" />
              </button>
              <button className="text-slate-600 hover:text-slate-800">
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('cars')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'cars' ? 'bg-[#005b52] text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Car className="w-5 h-5" />
                  Meus Carros
                </button>
                <button
                  onClick={() => setActiveTab('maintenance')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'maintenance' ? 'bg-[#005b52] text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Wrench className="w-5 h-5" />
                  Manutenções
                </button>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'schedule' ? 'bg-[#005b52] text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  Agendamentos
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'reports' ? 'bg-[#005b52] text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  Relatórios
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'cars' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userCars.map((car) => (
                    <div key={car.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                      <div className="aspect-video relative">
                        <Image
                          src={car.image}
                          alt={`${car.make} ${car.model}`}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-[#005b52] mb-2">
                          {car.make} {car.model} {car.year}
                        </h3>
                        <p className="text-slate-600 mb-4">Placa: {car.plate}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-3 bg-slate-50 rounded-lg">
                            <div className="text-2xl font-bold text-[#9fc031]">{car.maintenanceCount}</div>
                            <div className="text-sm text-slate-600">Manutenções</div>
                          </div>
                          <div className="text-center p-3 bg-slate-50 rounded-lg">
                            <div className="text-sm font-semibold text-[#005b52]">Próxima</div>
                            <div className="text-sm text-slate-600">{car.nextMaintenance}</div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setSelectedCar(car.id)}
                            className="flex-1 bg-[#005b52] text-white py-2 px-4 rounded-lg hover:bg-[#004a42] transition-colors flex items-center justify-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Ver Detalhes
                          </button>
                          <button className="bg-[#9fc031] text-white py-2 px-4 rounded-lg hover:bg-[#8ab028] transition-colors">
                            <Calendar className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'maintenance' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-[#005b52] mb-6">Histórico de Manutenções</h2>
                <div className="space-y-4">
                  {maintenanceHistory.map((maintenance) => {
                    const car = userCars.find(c => c.id === maintenance.carId);
                    return (
                      <div key={maintenance.id} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#005b52] rounded-lg flex items-center justify-center">
                              <Wrench className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-[#005b52]">{maintenance.type}</h3>
                              <p className="text-sm text-slate-600">{car?.make} {car?.model} - {car?.plate}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-[#9fc031]">{maintenance.cost.toLocaleString('pt-AO')} Kz</div>
                            <div className="text-sm text-slate-600">{maintenance.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">{maintenance.workshop}</span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                            {maintenance.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedCar && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#005b52]">Detalhes do Veículo</h2>
                  <button 
                    onClick={() => setSelectedCar(null)}
                    className="text-slate-600 hover:text-slate-800"
                  >
                    ✕
                  </button>
                </div>
                
                {(() => {
                  const car = userCars.find(c => c.id === selectedCar);
                  const carMaintenances = getCarMaintenances(selectedCar);
                  
                  return (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Image
                            src={car?.image || ''}
                            alt={`${car?.make} ${car?.model}`}
                            width={400}
                            height={300}
                            className="w-full rounded-lg"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#005b52] mb-4">
                            {car?.make} {car?.model} {car?.year}
                          </h3>
                          <div className="space-y-2">
                            <p><span className="font-medium">Placa:</span> {car?.plate}</p>
                            <p><span className="font-medium">Última Manutenção:</span> {car?.lastMaintenance}</p>
                            <p><span className="font-medium">Próxima Manutenção:</span> {car?.nextMaintenance}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-[#005b52] mb-4">Histórico de Manutenções</h4>
                        <div className="space-y-3">
                          {carMaintenances.map((maintenance) => (
                            <div key={maintenance.id} className="border border-slate-200 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="font-medium text-[#005b52]">{maintenance.type}</h5>
                                  <p className="text-sm text-slate-600">{maintenance.workshop}</p>
                                  <p className="text-sm text-slate-500">{maintenance.date}</p>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-[#9fc031]">{maintenance.cost.toLocaleString('pt-AO')} Kz</div>
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                                    {maintenance.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}