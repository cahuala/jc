/* eslint-disable @next/next/no-img-element */
"use client";
import { formatKwanza } from "@/src/utils/formatMoney";
import {
  Calendar,
  Gauge,
  Fuel,
  Cog,
  MapPin,
  CheckCircle,
  Heart,
  Search,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PageLoading } from "../../shared/page-loading";
import Image from "next/image";

const cars = [
  {
    id: 1,
    brand: "Toyota",
    model: "Corolla XEi",
    year: 2022,
    price: 125900,
    km: "32.000",
    fuel: "Flex",
    transmission: "Automático",
    location: "Benguela, BL",
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop",
    verified: true,
    color: "Prata",
  },
  {
    id: 2,
    brand: "Honda",
    model: "Civic EXL",
    year: 2023,
    price: 159900,
    km: "18.500",
    fuel: "Gasolina",
    transmission: "Automático CVT",
    location: "Cabinda, CA",
    image:
      "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=600&h=400&fit=crop",
    verified: true,
    color: "Preto",
  },
  {
    id: 3,
    brand: "Volkswagen",
    model: "T-Cross Highline",
    year: 2021,
    price: 98500,
    km: "45.000",
    fuel: "Flex",
    transmission: "Automático",
    location: "Luanda, LA",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop",
    verified: true,
    color: "Branco",
  },
  {
    id: 4,
    brand: "Chevrolet",
    model: "Onix Plus Premier",
    year: 2023,
    price: 89900,
    km: "12.000",
    fuel: "Flex",
    transmission: "Automático",
    location: "Uige, UE",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
    verified: true,
    color: "Vermelho",
  },
  {
    id: 5,
    brand: "Hyundai",
    model: "HB20S Diamond",
    year: 2022,
    price: 76500,
    km: "28.000",
    fuel: "Flex",
    transmission: "Automático",
    location: "Huila, HA",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop",
    verified: true,
    color: "Azul",
  },
  {
    id: 6,
    brand: "Jeep",
    model: "Compass Limited",
    year: 2021,
    price: 139900,
    km: "38.500",
    fuel: "Flex",
    transmission: "Automático",
    location: "Namibe, NE",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=400&fit=crop",
    verified: true,
    color: "Cinza",
  },
];

export function CarsForSale() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    marca: "",
    modelo: "",
    anoMin: "",
    anoMax: "",
    precoMin: "",
    precoMax: "",
    cidade: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  function handleNavigate(path: string) {
    if (path === pathname) return;

    setLoading(true);
    router.push(path);
  }

  // 🔥 Isto resolve o problema
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);
  }, [pathname]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    );
  };

  return (
    <>
      <PageLoading visible={loading} />
      <section
        className="py-10 bg-white"
        aria-label="Carros disponíveis para venda"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#005b52] mb-4">
              Carros Disponíveis para Venda
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Todos os veículos com histórico completo e vistoria certificada
            </p>
          
          {/* Search Filters */}
          <div
            className="bg-slate-50 rounded-2xl p-6 mb-8"
            role="search"
            aria-label="Filtros de busca de carros"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="marca-select"
                  className="block text-sm font-medium text-slate-700 mb-2 text-left"
                >
                  Marca
                </label>
                <select
                  id="marca-select"
                  value={filters.marca}
                  onChange={(e) =>
                    setFilters({ ...filters, marca: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none bg-white text-black"
                  aria-describedby="marca-help"
                >
                  <option value="">Todas</option>
                  <option value="toyota">Toyota</option>
                  <option value="honda">Honda</option>
                  <option value="volkswagen">Volkswagen</option>
                  <option value="chevrolet">Chevrolet</option>
                  <option value="ford">Ford</option>
                </select>
                <div id="marca-help" className="sr-only">
                  Selecione a marca do veículo
                </div>
              </div>

              <div>
                <label
                  htmlFor="modelo-input"
                  className="block text-sm font-medium text-slate-700 mb-2 text-left"
                >
                  Modelo
                </label>
                <input
                  id="modelo-input"
                  type="text"
                  placeholder="Ex: Corolla"
                  value={filters.modelo}
                  onChange={(e) =>
                    setFilters({ ...filters, modelo: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none text-black"
                  aria-label="Digite o modelo do veículo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 text-left">
                  Faixa de Preço
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Min"
                    value={filters.precoMin}
                    onChange={(e) =>
                      setFilters({ ...filters, precoMin: e.target.value })
                    }
                    className="w-1/2 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none text-black"
                  />
                  <input
                    type="text"
                    placeholder="Max"
                    value={filters.precoMax}
                    onChange={(e) =>
                      setFilters({ ...filters, precoMax: e.target.value })
                    }
                    className="w-1/2 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none text-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 text-left">
                  Cidade
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="São Paulo, SP"
                    value={filters.cidade}
                    onChange={(e) =>
                      setFilters({ ...filters, cidade: e.target.value })
                    }
                    className="w-full px-4 py-3 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#9fc031] focus:border-transparent outline-none text-black"
                  />
                  <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button className="flex-1 bg-gradient-to-r from-[#9fc031] to-[#8ab028] text-white py-3 rounded-lg hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Buscar
              </button>
              <button className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-all font-medium">
                Limpar
              </button>
            </div>
          </div>
          </header>
        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  priority={car.id <= 3}
                />
                {car.verified && (
                  <div className="absolute top-3 left-3 bg-[#9fc031] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Verificado
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(car.id)}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(car.id)
                        ? "fill-red-500 text-red-500"
                        : "text-slate-600"
                    }`}
                  />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <div className="text-sm text-slate-500 mb-1">{car.brand}</div>
                  <h3 className="text-xl font-bold text-[#005b52] mb-2">
                    {car.model}
                  </h3>
                  <div className="text-2xl font-bold text-[#9fc031]">
                    {formatKwanza(car.price)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4 text-[#005b52]" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Gauge className="w-4 h-4 text-[#005b52]" />
                    <span>{car.km} km</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Fuel className="w-4 h-4 text-[#005b52]" />
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Cog className="w-4 h-4 text-[#005b52]" />
                    <span>{car.transmission}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600 mb-4 pb-4 border-b border-slate-200">
                  <MapPin className="w-4 h-4 text-[#005b52]" />
                  <span>{car.location}</span>
                </div>

                <button
                  onClick={() => handleNavigate("/see")}
                  className="w-full cursor-pointer bg-gradient-to-r from-[#005b52] to-[#007066] text-white py-3 rounded-lg hover:shadow-lg transition-all font-semibold"
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => handleNavigate("/allcars")}
            className="bg-white cursor-pointer border-2 border-[#005b52] text-[#005b52] px-8 py-3 rounded-lg hover:bg-[#005b52] hover:text-white transition-all font-semibold"
          >
            Ver Todos os Veículos
          </button>
        </div>
        </div>
      </section>
    </>
  );
}
