'use client'
import { MapPin, Star, Clock, Phone, CheckCircle, Search } from 'lucide-react';
import { useState } from 'react';

const workshops = [
  {
    id: 1,
    name: 'AutoCenter Premium',
    rating: 4.9,
    reviews: 342,
    distance: '2.5 km',
    address: 'Av. 21 de Janeeiro, 1000 - Luanda, Angola',
    phone: '+244 222 123 456',
    specialties: ['Inspeção Completa', 'Diagnóstico Eletrônico', 'Motor e Câmbio'],
    price: '45.000 Kz',
    availability: 'Disponível hoje',
    image: 'https://images.unsplash.com/photo-1633059170547-43b7d8de1fb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYmxhY2slMjBtYW4lMjBtZWNoYW5pYyUyMGF1dG9tb3RpdmV8ZW58MXx8fHwxNzY5ODY3NTgwfDA&ixlib=rb-4.1.0&q=80&w=400&h=300'
  },
  {
    id: 2,
    name: 'Mecânica Silva & Filhos',
    rating: 4.8,
    reviews: 228,
    distance: '3.8 km',
    address: 'Rua dos Automóveis, 450 - Luanda, Angola',
    phone: '+244 222 234 567',
    specialties: ['Freios e Suspensão', 'Ar Condicionado', 'Elétrica'],
    price: '38.000 Kz',
    availability: 'Disponível amanhã',
    image: 'https://images.unsplash.com/photo-1735423491073-650296b69330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWVjaGFuaWMlMjBjYXIlMjBpbnNwZWN0aW9ufGVufDF8fHx8MTc2OTg2NzU4MXww&ixlib=rb-4.1.0&q=80&w=400&h=300'
  },
  {
    id: 3,
    name: 'Oficina Técnica Automotiva',
    rating: 4.7,
    reviews: 195,
    distance: '4.2 km',
    address: 'Av. Brasil, 2340 - Luanda, Angola',
    phone: '+244 222 345 678',
    specialties: ['Injeção Eletrônica', 'Alinhamento', 'Balanceamento'],
    price: '42.000 Kz',
    availability: 'Disponível hoje',
    image: 'https://images.unsplash.com/photo-1678814554347-e58c8aae8a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWFuJTIwYXV0b21vdGl2ZSUyMHNlcnZpY2V8ZW58MXx8fHwxNzY5ODY3NTgyfDA&ixlib=rb-4.1.0&q=80&w=400&h=300'
  },
  {
    id: 4,
    name: 'CarCheck Diagnósticos',
    rating: 4.9,
    reviews: 412,
    distance: '5.1 km',
    address: 'Rua dos Mecânicos, 890 - Luanda, Angola',
    phone: '+244 222 456 789',
    specialties: ['Vistoria Pré-Compra', 'Laudo Técnico', 'Perícia Automotiva'],
    price: '55.000 Kz',
    availability: 'Disponível hoje',
    image: 'https://images.unsplash.com/photo-1616804827035-f4aa814c14ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHByb2Zlc3Npb25hbCUyMG1hbiUyMGNhciUyMGRlYWxlcnxlbnwxfHx8fDE3Njk4Njc1ODJ8MA&ixlib=rb-4.1.0&q=80&w=400&h=300'
  },
  {
    id: 5,
    name: 'Garage Master',
    rating: 4.6,
    reviews: 167,
    distance: '6.3 km',
    address: 'Av. Industrial, 1500 - Luanda, Angola',
    phone: '+244 222 567 890',
    specialties: ['Pintura', 'Funilaria', 'Polimento'],
    price: '40.000 Kz',
    availability: 'Disponível em 2 dias',
    image: 'https://images.unsplash.com/photo-1633059170547-43b7d8de1fb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYmxhY2slMjBtYW4lMjBtZWNoYW5pYyUyMGF1dG9tb3RpdmV8ZW58MXx8fHwxNzY5ODY3NTgwfDA&ixlib=rb-4.1.0&q=80&w=400&h=300'
  },
  {
    id: 6,
    name: 'Auto Reparo Expresso',
    rating: 4.8,
    reviews: 289,
    distance: '7.0 km',
    address: 'Rua das Oficinas, 2200 - Luanda, Angola',
    phone: '+244 222 678 901',
    specialties: ['Troca de Óleo', 'Revisão Completa', 'Sistema de Freios'],
    price: '36.000 Kz',
    availability: 'Disponível hoje',
    image: 'https://images.unsplash.com/photo-1735423491073-650296b69330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWVjaGFuaWMlMjBjYXIlMjBpbnNwZWN0aW9ufGVufDF8fHx8MTc2OTg2NzU4MXww&ixlib=rb-4.1.0&q=80&w=400&h=300'
  }
];

export function WorkshopList() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  return (
    <section id="oficinas" className="py-5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#005b52] mb-4">
            Oficinas Disponíveis 
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Escolha a oficina mais próxima e agende sua vistoria
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Buscar por nome ou especialidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none text-black"
                />
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              </div>
              <div className="w-64 relative">
                <input
                  type="text"
                  placeholder="Cidade"
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none text-black"
                />
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button 
              onClick={() => setSelectedFilter('all')}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedFilter === 'all' 
                  ? 'bg-[#005b52] text-white shadow-lg' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Todas
            </button>
            <button 
              onClick={() => setSelectedFilter('available')}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedFilter === 'available' 
                  ? 'bg-[#005b52] text-white shadow-lg' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Disponível Hoje
            </button>
            <button 
              onClick={() => setSelectedFilter('nearby')}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedFilter === 'nearby' 
                  ? 'bg-[#005b52] text-white shadow-lg' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Mais Próximas
            </button>
            <button 
              onClick={() => setSelectedFilter('rated')}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedFilter === 'rated' 
                  ? 'bg-[#005b52] text-white shadow-lg' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Mais Avaliadas
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {workshops.map((workshop) => (
            <div 
              key={workshop.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-slate-200"
            >
              <div className="md:flex">
                <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                  <img 
                    src={workshop.image} 
                    alt={workshop.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-[#005b52]">
                    {workshop.price}
                  </div>
                </div>

                <div className="p-6 md:w-2/3">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-[#005b52] mb-2">
                        {workshop.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-[#9fc031] text-[#9fc031]" />
                          <span className="font-semibold">{workshop.rating}</span>
                          <span>({workshop.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{workshop.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{workshop.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>{workshop.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 flex-shrink-0 text-green-600" />
                      <span className="text-green-600 font-semibold">{workshop.availability}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {workshop.specialties.map((specialty, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center gap-1 bg-[#9fc031]/10 text-[#005b52] px-3 py-1 rounded-full text-xs font-medium"
                      >
                        <CheckCircle className="w-3 h-3" />
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <button className="w-full bg-gradient-to-r from-[#9fc031] to-[#8ab028] text-white py-3 rounded-lg hover:shadow-lg transition-all font-semibold">
                    Agendar Vistoria
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}