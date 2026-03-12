'use client'
import { Calendar, Phone, CheckCircle, User, Car as CarIcon, Heart, Share2, Star, Shield, Award, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { CarHistory } from './CarHistory';
import { AppDownload } from '../app-download/AppDownload';
import { TopBanner } from '../shared/TopBanner';

const carData = {
  id: 1,
  make: 'Toyota',
  model: 'Corolla XEi',
  year: 2020,
  plate: 'LD-123-AB',
  vin: '1HGBH41JXMN109186',
  color: 'Branco Pérola',
  mileage: 45000,
  price: 2850000,
  owner: 'João Silva',
  phone: '+244 222 123 456',
  condition: 'Excelente',
  fuel: 'Flex',
  transmission: 'Automático',
  doors: 4,
  images: [
    'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop'
  ],
  features: [
    'Ar Condicionado Digital',
    'Direção Elétrica',
    'Vidros Elétricos',
    'Trava Elétrica',
    'Airbags Duplos',
    'ABS + EBD',
    'Controle de Estabilidade',
    'Sensor de Estacionamento'
  ],
  maintenanceHistory: [
    {
      id: 1,
      date: '2024-01-15',
      type: 'Manutenção Preventiva',
      workshop: 'AutoCenter Premium',
      description: 'Troca de óleo e filtros',
      cost: 25000,
      status: 'Concluído',
      parts: ['Óleo 5W30', 'Filtro de óleo', 'Filtro de ar']
    },
    {
      id: 2,
      date: '2023-11-20',
      type: 'Reparo',
      workshop: 'Mecânica Silva & Filhos',
      description: 'Substituição de pastilhas de freio',
      cost: 45000,
      status: 'Concluído',
      parts: ['Pastilhas de freio dianteiras', 'Discos de freio']
    }
  ]
};

export function CarDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const openModal = (index: number) => {
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Banner Publicitário */}
      <TopBanner />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-16">
        {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CarIcon className="w-8 h-8 text-[#005b52]" />
              <div>
                <h1 className="text-3xl font-bold text-[#005b52]">
                  {carData.make} {carData.model} {carData.year}
                </h1>
                <p className="text-slate-600">{carData.color} • {carData.mileage.toLocaleString('pt-AO')} km</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[#9fc031]/10 px-4 py-2 rounded-lg">
                <Shield className="w-5 h-5 text-[#9fc031]" />
                <span className="text-sm font-medium text-[#005b52]">Verificado</span>
              </div>
              <div className="flex items-center gap-2 bg-[#005b52]/10 px-4 py-2 rounded-lg">
                <Award className="w-5 h-5 text-[#005b52]" />
                <span className="text-sm font-medium text-[#005b52]">Garantia</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Galeria de Fotos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Imagem Principal */}
              <div className="relative">
                <div 
                  className="aspect-video cursor-pointer"
                  onClick={() => openModal(selectedImage)}
                >
                  <Image
                    src={carData.images[selectedImage]}
                    alt={`${carData.make} ${carData.model}`}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all shadow-lg"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
                  </button>
                  <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all shadow-lg">
                    <Share2 className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>

              {/* Miniaturas */}
              <div className="p-4">
                <div className="grid grid-cols-6 gap-2">
                  {carData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-[#9fc031] ring-2 ring-[#9fc031]/20' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Foto ${index + 1}`}
                        width={120}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Histórico Completo */}
            <div className="mt-6">
              <CarHistory carId={carData.id.toString()} hasAccess={false} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preço e Ações */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-[#9fc031] mb-2">
                  {carData.price.toLocaleString('pt-AO')} Kz
                </div>
                <div className="flex items-center justify-center gap-2 text-slate-600">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">Preço justo de mercado</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-[#9fc031] to-[#8ab028] text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl transition-all">
                  Entrar em Contato
                </button>
                <button className="w-full bg-[#005b52] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#004a42] transition-colors">
                  Agendar Test Drive
                </button>
                <button className="w-full border-2 border-[#005b52] text-[#005b52] py-3 px-6 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                  Solicitar Financiamento
                </button>
              </div>
            </div>

            {/* Informações Técnicas */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#005b52] mb-4">Especificações</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Marca</span>
                  <span className="font-semibold">{carData.make}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Modelo</span>
                  <span className="font-semibold">{carData.model}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Ano</span>
                  <span className="font-semibold">{carData.year}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Combustível</span>
                  <span className="font-semibold">{carData.fuel}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Câmbio</span>
                  <span className="font-semibold">{carData.transmission}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Portas</span>
                  <span className="font-semibold">{carData.doors}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-600">Estado</span>
                  <span className="font-semibold text-[#9fc031]">{carData.condition}</span>
                </div>
              </div>
            </div>

            {/* Vendedor */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#005b52] mb-4">Vendedor</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#005b52] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{carData.owner}</div>
                  <div className="text-sm text-slate-600">Vendedor verificado</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-600 mb-4">
                <Phone className="w-4 h-4" />
                <span>{carData.phone}</span>
              </div>
              <button className="w-full bg-green-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-600 transition-colors">
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Download do App */}
      <AppDownload />

      {/* Modal de Imagem */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-slate-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <Image
              src={carData.images[selectedImage]}
              alt={`${carData.make} ${carData.model}`}
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
            <div className="flex justify-center gap-2 mt-4">
              {carData.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    selectedImage === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
             </div>
          </div>
        </div>
      )}      
    </div>
    </>
  );
}