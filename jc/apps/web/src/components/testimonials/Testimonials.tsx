import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Carlos Mendes',
    role: 'Empresário',
    city: 'Luanda',
    rating: 5,
    comment: 'Excelente plataforma! Consegui vender meu carro em apenas 3 dias. O processo de vistoria foi muito profissional e transparente.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Ana Cristina',
    role: 'Professora',
    city: 'Benguela',
    rating: 5,
    comment: 'Encontrei a oficina perfeita para meu carro através da FlxMotor. Serviço de qualidade e preço justo. Recomendo!',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'João Santos',
    role: 'Engenheiro',
    city: 'Huambo',
    rating: 5,
    comment: 'A vistoria pré-compra me salvou de um grande problema. Descobriram defeitos que o vendedor não havia mencionado.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'Maria Silva',
    role: 'Médica',
    city: 'Cabinda',
    rating: 5,
    comment: 'Plataforma muito confiável. Comprei meu carro com total segurança sabendo que tinha histórico completo de manutenção.',
    image: 'https://images.unsplash.com/photo-1559941707-71e7bb5744b9?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'Pedro Oliveira',
    role: 'Comerciante',
    city: 'Lubango',
    rating: 5,
    comment: 'Cadastrei minha oficina na FlxMotor e o número de clientes aumentou significativamente. Excelente para os negócios!',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 6,
    name: 'Luísa Fernandes',
    role: 'Advogada',
    city: 'Malanje',
    rating: 5,
    comment: 'Atendimento excepcional e processo muito transparente. Me senti segura durante toda a negociação do meu veículo.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#005b52] mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Mais de 10.000 clientes satisfeitos confiam na FlxMotor para suas necessidades automotivas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-slate-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
            >
              <div className="absolute top-6 right-6">
                <Quote className="w-8 h-8 text-[#9fc031] opacity-20" />
              </div>
              
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-[#005b52] text-lg">
                    {testimonial.name}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {testimonial.role} • {testimonial.city}
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#9fc031] text-[#9fc031]" />
                ))}
              </div>

              <p className="text-slate-700 leading-relaxed italic">
                "{testimonial.comment}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#005b52] to-[#007066] rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#9fc031] mb-2">10.000+</div>
              <div className="text-slate-200">Clientes Satisfeitos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#9fc031] mb-2">500+</div>
              <div className="text-slate-200">Oficinas Parceiras</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#9fc031] mb-2">25.000+</div>
              <div className="text-slate-200">Carros Vistoriados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#9fc031] mb-2">4.9/5</div>
              <div className="text-slate-200">Avaliação Média</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}