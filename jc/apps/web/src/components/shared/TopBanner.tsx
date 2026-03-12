'use client'
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const ads = [
  {
    id: 1,
    company: 'Unitel',
    message: 'Conecte-se ao melhor da internet móvel',
    cta: 'Saiba Mais',
    bgColor: 'from-red-600 to-red-800',
    logo: 'U'
  },
  {
    id: 2,
    company: 'FlxMotor App',
    message: 'Baixe o app e tenha tudo na palma da mão',
    cta: 'Baixar App',
    bgColor: 'from-[#005b52] to-[#004a42]',
    logo: 'F'
  },
  {
    id: 3,
    company: 'Banco BAI',
    message: 'Financie seu carro com as melhores condições',
    cta: 'Simular',
    bgColor: 'from-blue-600 to-blue-800',
    logo: 'B'
  }
];

export function TopBanner() {
  const [currentAd, setCurrentAd] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const ad = ads[currentAd];

  return (
    <div className={`bg-gradient-to-r ${ad.bgColor} text-white py-3 relative fixed top-0 left-0 right-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentAd((prev) => (prev - 1 + ads.length) % ads.length)}
            className="text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 flex-1 justify-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className={`font-bold text-sm ${ad.bgColor.includes('red') ? 'text-red-600' : ad.bgColor.includes('blue') ? 'text-blue-600' : 'text-[#005b52]'}`}>
                {ad.logo}
              </span>
            </div>
            <div className="text-center">
              <span className="font-semibold">{ad.company}</span>
              <span className="ml-2 text-white/90">{ad.message}</span>
            </div>
            <button className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-white/30 transition-colors">
              {ad.cta}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentAd((prev) => (prev + 1) % ads.length)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-white/70 hover:text-white transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-2">
          {ads.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentAd(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentAd ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}