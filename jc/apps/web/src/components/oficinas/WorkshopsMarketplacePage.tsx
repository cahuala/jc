/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import { MapPin, Star, Clock, Phone, CheckCircle, Search, SlidersHorizontal, Award, Shield } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PageLoading } from '../shared/page-loading';
import { AppDownload } from '../app-download/AppDownload';

const workshops = [
  {
    id: 1,
    name: 'AutoCenter Premium',
    rating: 4.9,
    reviews: 342,
    distance: '2.5 km',
    address: 'Av. 21 de Janeiro, 1000 - Luanda, Angola',
    phone: '+244 222 123 456',
    specialties: ['Inspeção Completa', 'Diagnóstico Eletrônico', 'Motor e Câmbio'],
    price: '45.000 Kz',
    availability: 'Disponível hoje',
    image: 'https://images.unsplash.com/photo-1633059170547-43b7d8de1fb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYmxhY2slMjBtYW4lMjBtZWNoYW5pYyUyMGF1dG9tb3RpdmV8ZW58MXx8fHwxNzY5ODY3NTgwfDA&ixlib=rb-4.1.0&q=80&w=400&h=300',
    certified: true,
    openHours: '08:00 - 18:00',
    city: 'Luanda'
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
    image: 'https://images.unsplash.com/photo-1735423491073-650296b69330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWVjaGFuaWMlMjBjYXIlMjBpbnNwZWN0aW9ufGVufDF8fHx8MTc2OTg2NzU4MXww&ixlib=rb-4.1.0&q=80&w=400&h=300',
    certified: true,
    openHours: '07:30 - 17:30',
    city: 'Luanda'
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
    image: 'https://images.unsplash.com/photo-1678814554347-e58c8aae8a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWFuJTIwYXV0b21vdGl2ZSUyMHNlcnZpY2V8ZW58MXx8fHwxNzY5ODY3NTgyfDA&ixlib=rb-4.1.0&q=80&w=400&h=300',
    certified: false,
    openHours: '08:00 - 17:00',
    city: 'Luanda'
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
    image: 'https://images.unsplash.com/photo-1616804827035-f4aa814c14ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHByb2Zlc3Npb25hbCUyMG1hbiUyMGNhciUyMGRlYWxlcnxlbnwxfHx8fDE3Njk4Njc1ODJ8MA&ixlib=rb-4.1.0&q=80&w=400&h=300',
    certified: true,
    openHours: '08:00 - 18:00',
    city: 'Luanda'
  },
  {
    id: 5,
    name: 'Garage Master',
    rating: 4.6,
    reviews: 167,
    distance: '6.3 km',
    address: 'Av. Industrial, 1500 - Benguela, Angola',
    phone: '+244 222 567 890',
    specialties: ['Pintura', 'Funilaria', 'Polimento'],
    price: '40.000 Kz',
    availability: 'Disponível em 2 dias',
    image: 'https://images.unsplash.com/photo-1633059170547-43b7d8de1fb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYmxhY2slMjBtYW4lMjBtZWNoYW5pYyUyMGF1dG9tb3RpdmV8ZW58MXx8fHwxNzY5ODY3NTgwfDA&ixlib=rb-4.1.0&q=80&w=400&h=300',
    certified: false,
    openHours: '07:00 - 16:00',
    city: 'Benguela'
  },
  {
    id: 6,
    name: 'Auto Reparo Expresso',
    rating: 4.8,
    reviews: 289,
    distance: '7.0 km',
    address: 'Rua das Oficinas, 2200 - Cabinda, Angola',
    phone: '+244 222 678 901',
    specialties: ['Troca de Óleo', 'Revisão Completa', 'Sistema de Freios'],
    price: '36.000 Kz',
    availability: 'Disponível hoje',
    image: 'https://images.unsplash.com/photo-1735423491073-650296b69330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWVjaGFuaWMlMjBjYXIlMjBpbnNwZWN0aW9ufGVufDF8fHx8MTc2OTg2NzU4MXww&ixlib=rb-4.1.0&q=80&w=400&h=300',
    certified: true,
    openHours: '06:00 - 18:00',
    city: 'Cabinda'
  }
];

export function WorkshopsMarketplacePage() {
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    specialty: '',
    priceRange: '',
    rating: '',
    availability: '',
    certified: false
  });
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('relevancia');
  const router = useRouter();
  const pathname = usePathname();

  function handleNavigate(path: string) {
    if (path === pathname) return;
    setLoading(true);
    router.push(path);
  }

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  const clearFilters = () => {
    setFilters({
      search: '',
      city: '',
      specialty: '',
      priceRange: '',
      rating: '',
      availability: '',
      certified: false
    });
  };

  return (
    <>
      <PageLoading visible={loading} />
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[#005b52]">Oficinas Parceiras</h1>
                <p className="text-slate-600 mt-1">Encontre a oficina ideal para seu veículo</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-[#9fc031]/10 px-4 py-2 rounded-lg">
                  <Shield className="w-5 h-5 text-[#9fc031]" />
                  <span className="text-sm font-medium text-[#005b52]">Oficinas Verificadas</span>
                </div>
                <div className="flex items-center gap-2 bg-[#005b52]/10 px-4 py-2 rounded-lg">
                  <Award className="w-5 h-5 text-[#005b52]" />
                  <span className="text-sm font-medium text-[#005b52]">Qualidade Garantida</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-80 w-full flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-8">
                <div className="flex items-center gap-2 mb-6">
                  <SlidersHorizontal className="w-5 h-5 text-[#005b52]" />
                  <h2 className="text-lg font-semibold text-[#005b52]">Filtros de Busca</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Buscar Oficina</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Nome ou especialidade"
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        className="w-full px-3 py-2 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none text-black"
                      />
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Cidade</label>
                    <select
                      value={filters.city}
                      onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none bg-white text-black"
                    >
                      <option value="">Todas as cidades</option>
                      <option value="luanda">Luanda</option>
                      <option value="benguela">Benguela</option>
                      <option value="cabinda">Cabinda</option>
                      <option value="huambo">Huambo</option>
                      <option value="lubango">Lubango</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Especialidade</label>
                    <select
                      value={filters.specialty}
                      onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none bg-white text-black"
                    >
                      <option value="">Todas as especialidades</option>
                      <option value="diagnostico">Diagnóstico Eletrônico</option>
                      <option value="motor">Motor e Câmbio</option>
                      <option value="freios">Freios e Suspensão</option>
                      <option value="eletrica">Sistema Elétrico</option>
                      <option value="ar-condicionado">Ar Condicionado</option>
                      <option value="pintura">Pintura e Funilaria</option>
                      <option value="revisao">Revisão Completa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Faixa de Preço</label>
                    <select
                      value={filters.priceRange}
                      onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none bg-white text-black"
                    >
                      <option value="">Todas as faixas</option>
                      <option value="baixo">Até 40.000 Kz</option>
                      <option value="medio">40.000 - 50.000 Kz</option>
                      <option value="alto">Acima de 50.000 Kz</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Avaliação Mínima</label>
                    <select
                      value={filters.rating}
                      onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none bg-white text-black"
                    >
                      <option value="">Qualquer avaliação</option>
                      <option value="4.5">4.5+ estrelas</option>
                      <option value="4.0">4.0+ estrelas</option>
                      <option value="3.5">3.5+ estrelas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Disponibilidade</label>
                    <select
                      value={filters.availability}
                      onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none bg-white text-black"
                    >
                      <option value="">Qualquer horário</option>
                      <option value="hoje">Disponível hoje</option>
                      <option value="amanha">Disponível amanhã</option>
                      <option value="semana">Esta semana</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.certified}
                        onChange={(e) => setFilters({ ...filters, certified: e.target.checked })}
                        className="w-4 h-4 text-[#9fc031] border-slate-300 rounded focus:ring-[#9fc031]"
                      />
                      <span className="text-sm text-slate-700">Apenas oficinas certificadas</span>
                    </label>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <button className="w-full bg-[#005b52] text-white py-2 px-4 rounded-lg hover:bg-[#004a42] transition-colors font-medium">
                      Aplicar Filtros
                    </button>
                    <button 
                      onClick={clearFilters}
                      className="w-full border border-slate-300 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Limpar Filtros
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-slate-600">{workshops.length} oficinas encontradas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-600">Ordenar por:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none bg-white text-black"
                    >
                      <option value="relevancia">Relevância</option>
                      <option value="avaliacao">Maior Avaliação</option>
                      <option value="distancia">Mais Próximas</option>
                      <option value="preco-menor">Menor Preço</option>
                      <option value="preco-maior">Maior Preço</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {workshops.map((workshop) => (
                  <div 
                    key={workshop.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 w-full h-48 md:h-auto relative overflow-hidden">
                        <img 
                          src={workshop.image} 
                          alt={workshop.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-[#005b52]">
                          {workshop.price}
                        </div>
                        {workshop.certified && (
                          <div className="absolute top-3 left-3 bg-[#9fc031] text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Certificada
                          </div>
                        )}
                      </div>

                      <div className="p-4 sm:p-6 md:w-2/3 w-full">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-[#005b52] mb-2">
                              {workshop.name}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-[#9fc031] text-[#9fc031]" />
                                <span className="font-semibold">{workshop.rating}</span>
                                <span>({workshop.reviews} avaliações)</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-[#005b52]" />
                                <span>{workshop.distance}</span>
                              </div>
                            </div>
                            <p className="text-sm text-slate-600 mb-3">{workshop.address}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-slate-700 mb-2">Especialidades:</h4>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {workshop.specialties.map((specialty, index) => (
                              <span
                                key={index}
                                className="bg-[#005b52]/10 text-[#005b52] px-2 py-1 rounded text-xs font-medium"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-[#005b52]" />
                              <span>{workshop.openHours}</span>
                            </div>
                            <span className={`font-medium ${
                              workshop.availability.includes('hoje') ? 'text-green-600' : 'text-slate-600'
                            }`}>
                              {workshop.availability}
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <button className="flex items-center justify-center gap-1 px-3 py-2 border border-[#005b52] text-[#005b52] rounded-lg hover:bg-slate-50 transition-colors text-sm">
                              <Phone className="w-4 h-4" />
                              Ligar
                            </button>
                            <button 
                              onClick={() => handleNavigate("/workshop-details")}
                              className="px-4 py-2 bg-[#005b52] text-white rounded-lg hover:bg-[#004a42] transition-colors text-sm font-medium"
                            >
                              Ver Detalhes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button className="bg-white border-2 border-[#005b52] text-[#005b52] px-8 py-3 rounded-lg hover:bg-[#005b52] hover:text-white transition-all font-semibold">
                  Carregar Mais Oficinas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download do App */}
      <AppDownload />
    </>
  );
}