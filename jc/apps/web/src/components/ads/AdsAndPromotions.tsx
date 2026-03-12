'use client'
import { ExternalLink, Tag, Clock, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const ads = [
  {
    id: 1,
    type: 'external',
    company: 'Banco BAI',
    title: 'Financiamento Automóvel',
    description: 'Realize o sonho do seu carro com taxas especiais',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop',
    cta: 'Simular Financiamento',
    link: '#',
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 2,
    type: 'external',
    company: 'Seguros ENSA',
    title: 'Seguro Auto Completo',
    description: 'Proteja seu veículo com cobertura total',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
    cta: 'Fazer Cotação',
    link: '#',
    color: 'from-red-600 to-red-800'
  }
];

const promotions = [
  {
    id: 1,
    type: 'platform',
    title: 'Primeira Inspeção Grátis',
    description: 'Cadastre seu carro e ganhe uma inspeção completa',
    discount: '100% OFF',
    validUntil: '2024-02-29',
    image: 'https://images.unsplash.com/photo-1633059170547-43b7d8de1fb1?w=400&h=200&fit=crop',
    cta: 'Cadastrar Agora'
  },
  {
    id: 2,
    type: 'platform',
    title: 'Plano Premium com Desconto',
    description: 'Acesso ao histórico completo por 30 dias',
    discount: '50% OFF',
    originalPrice: '10.000 Kz',
    promoPrice: '5.000 Kz',
    validUntil: '2024-02-15',
    image: 'https://images.unsplash.com/photo-1616804827035-f4aa814c14ac?w=400&h=200&fit=crop',
    cta: 'Aproveitar Oferta'
  }
];

export function AdsAndPromotions() {
  return (
    <div className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Promoções da Plataforma */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#005b52] mb-2">Promoções Especiais</h2>
            <p className="text-slate-600">Aproveite nossas ofertas exclusivas</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promotions.map((promo) => (
              <div key={promo.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#9fc031] text-white px-3 py-1 rounded-full font-bold text-sm">
                    {promo.discount}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#005b52] mb-2">{promo.title}</h3>
                  <p className="text-slate-600 mb-4">{promo.description}</p>
                  
                  {promo.promoPrice && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-[#9fc031]">{promo.promoPrice}</span>
                      <span className="text-slate-500 line-through">{promo.originalPrice}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span>Válido até {promo.validUntil}</span>
                    </div>
                    <button className="bg-[#005b52] text-white px-4 py-2 rounded-lg hover:bg-[#004a42] transition-colors flex items-center gap-2">
                      {promo.cta}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Publicidades Externas */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#005b52] mb-2">Parceiros Recomendados</h2>
            <p className="text-slate-600">Serviços que complementam sua experiência automotiva</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ads.map((ad) => (
              <div key={ad.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <Image
                    src={ad.image}
                    alt={ad.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${ad.color} opacity-80`}></div>
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-slate-700">{ad.company}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#005b52] mb-2">{ad.title}</h3>
                  <p className="text-slate-600 mb-4">{ad.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-slate-600">Parceiro Verificado</span>
                    </div>
                    <button className="bg-gradient-to-r from-[#9fc031] to-[#8ab028] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
                      {ad.cta}
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}