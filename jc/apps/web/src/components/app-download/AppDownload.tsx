'use client'
import { Smartphone, Download, Star, Shield } from 'lucide-react';
import Image from 'next/image';

export function AppDownload() {
  return (
    <div className="bg-gradient-to-r from-[#005b52] to-[#004a42] text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-8 h-8 text-[#9fc031]" />
              <span className="text-[#9fc031] font-semibold">Baixe o App</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              FlxMotor na palma da sua mão
            </h2>
            <p className="text-xl text-slate-200 mb-6">
              Acesse carros, oficinas e históricos completos direto do seu celular. 
              Mais praticidade e segurança para suas transações.
            </p>
            
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#9fc031] rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm text-slate-300">Avaliação</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#9fc031] rounded-full flex items-center justify-center mx-auto mb-2">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-slate-300">Downloads</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#9fc031] rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-slate-300">Seguro</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-xs">▶</span>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-300">Disponível no</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </button>
              
              <button className="flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-xs">🍎</span>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-300">Baixar na</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <Image
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=600&fit=crop"
                alt="FlxMotor App"
                width={300}
                height={600}
                className="mx-auto rounded-3xl shadow-2xl"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#9fc031]/20 to-transparent rounded-3xl blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}