import { FileText, Wrench, Clock, Shield, BarChart3, CheckCircle } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: FileText,
      title: 'Histórico Completo',
      description: 'Acesse todos os diagnósticos, reparações e peças trocadas do seu veículo.',
      color: 'from-[#005b52] to-[#007066]'
    },
    {
      icon: Wrench,
      title: 'Oficinas Certificadas',
      description: 'Rede de oficinas especializadas e verificadas para seu carro.',
      color: 'from-[#9fc031] to-[#8ab028]'
    },
    {
      icon: Clock,
      title: 'Agendamento Rápido',
      description: 'Agende sua vistoria em poucos cliques com data e hora flexíveis.',
      color: 'from-[#005b52] to-[#007066]'
    },
    {
      icon: Shield,
      title: 'Garantia de Qualidade',
      description: 'Todas as inspeções seguem rigorosos padrões de qualidade.',
      color: 'from-[#9fc031] to-[#8ab028]'
    },
    {
      icon: BarChart3,
      title: 'Relatórios Detalhados',
      description: 'Receba relatórios profissionais com fotos e avaliação técnica completa.',
      color: 'from-[#005b52] to-[#007066]'
    },
    {
      icon: CheckCircle,
      title: 'Certificado Digital',
      description: 'Certificado de vistoria digital para aumentar a confiança na venda.',
      color: 'from-[#9fc031] to-[#8ab028]'
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#005b52] mb-4">
            Por que escolher a Fix Motor?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A plataforma mais completa para vistoria e histórico de veículos em Angola
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#005b52] mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}