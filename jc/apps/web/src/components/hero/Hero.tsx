/* eslint-disable @next/next/no-img-element */
import { Gauge, Car, Shield, CheckCircle } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const services = [
  {
    title: 'Compre e Venda seu Carro com Total Segurança',
    subtitle: 'Vistoria Completa',
    description: 'Inspeção detalhada de todos os sistemas do veículo com laudo técnico profissional',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1633059170547-43b7d8de1fb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYmxhY2slMjBtYW4lMjBtZWNoYW5pYyUyMGF1dG9tb3RpdmV8ZW58MXx8fHwxNzY5ODY3NTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Mais de 150 pontos verificados', 'Laudo em 24 horas', 'Certificado digital']
  },
  {
    title: 'Compre e Venda seu Carro com Total Segurança',
    subtitle: 'Diagnóstico Eletrônico',
    description: 'Análise computadorizada de todos os sistemas eletrônicos do veículo',
    icon: Gauge,
    image: 'https://images.unsplash.com/photo-1735423491073-650296b69330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWVjaGFuaWMlMjBjYXIlMjBpbnNwZWN0aW9ufGVufDF8fHx8MTc2OTg2NzU4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Scanner profissional', 'Detecção de falhas ocultas', 'Relatório completo']
  },
  {
    title: 'Compre e Venda seu Carro com Total Segurança',
    subtitle: 'Histórico Completo',
    description: 'Acesse todo o histórico de manutenções e reparos do veículo',
    icon: Car,
    image: 'https://images.unsplash.com/photo-1678814554347-e58c8aae8a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbWFuJTIwYXV0b21vdGl2ZSUyMHNlcnZpY2V8ZW58MXx8fHwxNzY5ODY3NTgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    features: ['Todas as revisões registradas', 'Peças trocadas', 'Nota fiscal dos serviços']
  }
];

export function Hero() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true
  };

  return (
    <section id="home" className="relative">
      {/* Full Width Carousel */}
      <div className="w-full">
        <Slider {...sliderSettings}>
          {services.map((service, index) => (
            <div key={index} className="outline-none">
              <div className="relative h-[400px] md:h-[450px] lg:h-[500px]">
                <img
                  src={service.image}
                  alt={service.subtitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#005b52]/95 via-[#005b52]/80 to-transparent"></div>
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-3xl text-white">
                      <div className="inline-flex items-center gap-3 bg-[#9fc031] px-6 py-3 rounded-full mb-6">
                        <service.icon className="w-6 h-6" />
                        <span className="font-semibold">{service.subtitle}</span>
                      </div>
                      
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                        {service.title}
                      </h1>
                      
                      <p className="text-lg sm:text-xl text-white/90 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <button className="bg-gradient-to-r from-[#9fc031] to-[#8ab028] text-white px-8 py-4 rounded-lg hover:shadow-2xl transition-all font-semibold text-lg">
                          Agendar Vistoria
                        </button>
                        <button className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-all font-semibold text-lg">
                          Ver Oficinas
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-[#9fc031] flex-shrink-0" />
                            <span className="text-sm sm:text-base">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#005b52] mb-2">250+</div>
              <div className="text-slate-600">Oficinas Certificadas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#005b52] mb-2">15.000+</div>
              <div className="text-slate-600">Vistorias Realizadas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#005b52] mb-2">98%</div>
              <div className="text-slate-600">Satisfação dos Clientes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}