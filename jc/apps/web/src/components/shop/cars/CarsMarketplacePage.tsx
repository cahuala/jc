'use client'
import { formatKwanza } from '@/src/utils/formatMoney';
import { Calendar, Gauge, Fuel, Cog, MapPin, CheckCircle, Heart, Search, Filter, SlidersHorizontal, Star, Shield, Award } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PageLoading } from '../../shared/page-loading';

const cars = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Corolla XEi',
    year: 2022,
    price: 125900,
    km: '32.000',
    fuel: 'Flex',
    transmission: 'Automático',
    location: 'Benguela, BL',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop',
    verified: true,
    color: 'Prata',
    rating: 4.8,
    inspectionDate: '2024-01-15'
  },
  {
    id: 2,
    brand: 'Honda',
    model: 'Civic EXL',
    year: 2023,
    price: 159900,
    km: '18.500',
    fuel: 'Gasolina',
    transmission: 'Automático CVT',
    location: 'Cabinda, CA',
    image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=600&h=400&fit=crop',
    verified: true,
    color: 'Preto',
    rating: 4.9,
    inspectionDate: '2024-01-20'
  },
  {
    id: 3,
    brand: 'Volkswagen',
    model: 'T-Cross Highline',
    year: 2021,
    price: 98500,
    km: '45.000',
    fuel: 'Flex',
    transmission: 'Automático',
    location: 'Luanda, LA',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop',
    verified: true,
    color: 'Branco',
    rating: 4.7,
    inspectionDate: '2024-01-10'
  },
  {
    id: 4,
    brand: 'Chevrolet',
    model: 'Onix Plus Premier',
    year: 2023,
    price: 89900,
    km: '12.000',
    fuel: 'Flex',
    transmission: 'Automático',
    location: 'Uige, UE',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
    verified: true,
    color: 'Vermelho',
    rating: 4.6,
    inspectionDate: '2024-01-25'
  },
  {
    id: 5,
    brand: 'Hyundai',
    model: 'HB20S Diamond',
    year: 2022,
    price: 76500,
    km: '28.000',
    fuel: 'Flex',
    transmission: 'Automático',
    location: 'Huila, HA',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop',
    verified: true,
    color: 'Azul',
    rating: 4.5,
    inspectionDate: '2024-01-12'
  },
  {
    id: 6,
    brand: 'Jeep',
    model: 'Compass Limited',
    year: 2021,
    price: 139900,
    km: '38.500',
    fuel: 'Flex',
    transmission: 'Automático',
    location: 'Namibe, NE',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=400&fit=crop',
    verified: true,
    color: 'Cinza',
    rating: 4.8,
    inspectionDate: '2024-01-18'
  }
];

export function CarsMarketplacePage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    marca: '',
    modelo: '',
    anoMin: '',
    anoMax: '',
    precoMin: '',
    precoMax: '',
    cidade: '',
    combustivel: '',
    cambio: ''
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);
  }, [pathname]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setFilters({
      marca: '',
      modelo: '',
      anoMin: '',
      anoMax: '',
      precoMin: '',
      precoMax: '',
      cidade: '',
      combustivel: '',
      cambio: ''
    });
  };

  return (
    <>
      <PageLoading visible={loading} />
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[#005b52]">Carros à Venda</h1>
                <p className="text-slate-600 mt-1">Veículos verificados com histórico completo</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-[#9fc031]/10 px-4 py-2 rounded-lg">
                  <Shield className="w-5 h-5 text-[#9fc031]" />
                  <span className="text-sm font-medium text-[#005b52]">100% Verificados</span>
                </div>
                <div className="flex items-center gap-2 bg-[#005b52]/10 px-4 py-2 rounded-lg">
                  <Award className="w-5 h-5 text-[#005b52]" />
                  <span className="text-sm font-medium text-[#005b52]">Garantia FlxMotor</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-80 w-full flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-8">
                <div className="flex items-center gap-2 mb-6">
                  <SlidersHorizontal className="w-5 h-5 text-[#005b52]" />
                  <h2 className="text-lg font-semibold text-[#005b52]">Filtros</h2>
                </div>

                <div className="space-y-6">
                  {/* Marca */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Marca</label>
                    <select
                      value={filters.marca}
                      onChange={(e) => setFilters({ ...filters, marca: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none bg-white text-black"
                    >
                      <option value="">Todas as marcas</option>
                      <option value="toyota">Toyota</option>
                      <option value="honda">Honda</option>
                      <option value="volkswagen">Volkswagen</option>
                      <option value="chevrolet">Chevrolet</option>
                      <option value="hyundai">Hyundai</option>
                      <option value="jeep">Jeep</option>
                    </select>
                  </div>

                  {/* Modelo */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Modelo</label>
                    <input
                      type="text"
                      placeholder="Digite o modelo"
                      value={filters.modelo}
                      onChange={(e) => setFilters({ ...filters, modelo: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none text-black"
                    />
                  </div>

                  {/* Ano */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Ano</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="De"
                        value={filters.anoMin}
                        onChange={(e) => setFilters({ ...filters, anoMin: e.target.value })}
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none text-black"
                      />
                      <input
                        type="number"
                        placeholder="Até"
                        value={filters.anoMax}
                        onChange={(e) => setFilters({ ...filters, anoMax: e.target.value })}
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none text-black"
                      />
                    </div>
                  </div>

                  {/* Preço */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Preço (Kz)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Mínimo"
                        value={filters.precoMin}
                        onChange={(e) => setFilters({ ...filters, precoMin: e.target.value })}
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none text-black"
                      />
                      <input
                        type="text"
                        placeholder="Máximo"
                        value={filters.precoMax}
                        onChange={(e) => setFilters({ ...filters, precoMax: e.target.value })}
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none text-black"
                      />
                    </div>
                  </div>

                  {/* Combustível */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Combustível</label>
                    <select
                      value={filters.combustivel}
                      onChange={(e) => setFilters({ ...filters, combustivel: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none bg-white text-black"
                    >
                      <option value="">Todos</option>
                      <option value="flex">Flex</option>
                      <option value="gasolina">Gasolina</option>
                      <option value="diesel">Diesel</option>
                      <option value="eletrico">Elétrico</option>
                    </select>
                  </div>

                  {/* Câmbio */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Câmbio</label>
                    <select
                      value={filters.cambio}
                      onChange={(e) => setFilters({ ...filters, cambio: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none bg-white text-black"
                    >
                      <option value="">Todos</option>
                      <option value="manual">Manual</option>
                      <option value="automatico">Automático</option>
                      <option value="cvt">CVT</option>
                    </select>
                  </div>

                  {/* Localização */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Localização</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Cidade, Estado"
                        value={filters.cidade}
                        onChange={(e) => setFilters({ ...filters, cidade: e.target.value })}
                        className="w-full px-3 py-2 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none text-black"
                      />
                      <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    </div>
                  </div>

                  {/* Buttons */}
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

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-slate-600">{cars.length} veículos encontrados</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-600">Ordenar por:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none bg-white text-black"
                    >
                      <option value="relevancia">Relevância</option>
                      <option value="preco-menor">Menor Preço</option>
                      <option value="preco-maior">Maior Preço</option>
                      <option value="ano-novo">Mais Novo</option>
                      <option value="km-menor">Menor KM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Cars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {cars.map((car) => (
                  <div 
                    key={car.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-slate-200"
                  >
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <img
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-[#9fc031] text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verificado
                      </div>
                      <button
                        onClick={() => toggleFavorite(car.id)}
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all"
                      >
                        <Heart 
                          className={`w-4 h-4 ${
                            favorites.includes(car.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-slate-600'
                          }`}
                        />
                      </button>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{car.rating}</span>
                      </div>
                    </div>

                    <div className="p-3 sm:p-4">
                      <div className="mb-3">
                        <div className="text-xs text-slate-500 mb-1">{car.brand}</div>
                        <h3 className="text-lg font-bold text-[#005b52] mb-1">
                          {car.model}
                        </h3>
                        <div className="text-xl font-bold text-[#9fc031]">
                          {formatKwanza(car.price)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-3 text-xs">
                        <div className="flex items-center gap-1 text-slate-600">
                          <Calendar className="w-3 h-3 text-[#005b52]" />
                          <span>{car.year}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-600">
                          <Gauge className="w-3 h-3 text-[#005b52]" />
                          <span>{car.km} km</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-600">
                          <Fuel className="w-3 h-3 text-[#005b52]" />
                          <span>{car.fuel}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-600">
                          <Cog className="w-3 h-3 text-[#005b52]" />
                          <span>{car.transmission}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-slate-600 mb-3 pb-3 border-b border-slate-200">
                        <MapPin className="w-3 h-3 text-[#005b52]" />
                        <span>{car.location}</span>
                      </div>

                      <button 
                        onClick={() => handleNavigate("/car-details")} 
                        className="w-full bg-gradient-to-r from-[#005b52] to-[#007066] text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all font-medium text-xs sm:text-sm"
                      >
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-8">
                <button className="bg-white border-2 border-[#005b52] text-[#005b52] px-8 py-3 rounded-lg hover:bg-[#005b52] hover:text-white transition-all font-semibold">
                  Carregar Mais Veículos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}