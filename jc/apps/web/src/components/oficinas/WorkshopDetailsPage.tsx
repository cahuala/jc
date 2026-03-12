'use client'
import { MapPin, Star, Clock, Phone, CheckCircle, Award, Shield, Users, Calendar } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { WorkshopServices } from './WorkshopServices';
import { AppDownload } from '../app-download/AppDownload';

const workshopData = {
  id: 1,
  name: 'AutoCenter Premium',
  rating: 4.9,
  reviews: 342,
  address: 'Av. 21 de Janeiro, 1000 - Luanda, Angola',
  phone: '+244 222 123 456',
  email: 'contato@autocenterpremium.ao',
  openHours: '08:00 - 18:00',
  description: 'Oficina especializada em diagnóstico eletrônico e manutenção preventiva com mais de 15 anos de experiência no mercado angolano.',
  specialties: ['Diagnóstico Eletrônico', 'Motor e Câmbio', 'Sistema Elétrico', 'Ar Condicionado'],
  certifications: ['ISO 9001', 'Certificação Toyota', 'Certificação Bosch'],
  images: [
    'https://images.unsplash.com/photo-1633059170547-43b7d8de1fb1?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1678814554347-e58c8aae8a6d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1616804827035-f4aa814c14ac?w=800&h=600&fit=crop'
  ],
  team: [
    { name: 'João Santos', role: 'Mecânico Chefe', experience: '12 anos' },
    { name: 'Maria Silva', role: 'Diagnóstico Eletrônico', experience: '8 anos' },
    { name: 'Carlos Lima', role: 'Especialista em Motor', experience: '10 anos' }
  ],
  recentReviews: [
    {
      id: 1,
      customer: 'Pedro Costa',
      rating: 5,
      date: '2024-01-20',
      comment: 'Excelente atendimento! Resolveram o problema do meu carro rapidamente e com preço justo.'
    },
    {
      id: 2,
      customer: 'Ana Ferreira',
      rating: 5,
      date: '2024-01-18',
      comment: 'Profissionais muito competentes. Recomendo para qualquer tipo de serviço automotivo.'
    }
  ]
};

export function WorkshopDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('servicos');

  const tabs = [
    { id: 'servicos', name: 'Serviços', icon: Award },
    { id: 'sobre', name: 'Sobre', icon: Shield },
    { id: 'avaliacoes', name: 'Avaliações', icon: Star },
    { id: 'equipe', name: 'Equipe', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#005b52] rounded-xl flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#005b52]">{workshopData.name}</h1>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#9fc031] text-[#9fc031]" />
                    <span className="font-semibold">{workshopData.rating}</span>
                    <span className="text-slate-600">({workshopData.reviews} avaliações)</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>Luanda</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[#9fc031]/10 px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-[#9fc031]" />
                <span className="text-sm font-medium text-[#005b52]">Verificada</span>
              </div>
              <div className="flex items-center gap-2 bg-[#005b52]/10 px-4 py-2 rounded-lg">
                <Shield className="w-5 h-5 text-[#005b52]" />
                <span className="text-sm font-medium text-[#005b52]">Certificada</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2">
            {/* Galeria de Fotos */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
              <div className="aspect-video">
                <Image
                  src={workshopData.images[selectedImage]}
                  alt={workshopData.name}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex gap-2">
                  {workshopData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-video w-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-[#9fc031] ring-2 ring-[#9fc031]/20' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Foto ${index + 1}`}
                        width={80}
                        height={45}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs de Navegação */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="border-b border-slate-200">
                <div className="flex">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                          activeTab === tab.id
                            ? 'text-[#005b52] border-b-2 border-[#9fc031] bg-[#9fc031]/5'
                            : 'text-slate-600 hover:text-[#005b52] hover:bg-slate-50'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        {tab.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'servicos' && (
                  <WorkshopServices workshopId={workshopData.id} />
                )}

                {activeTab === 'sobre' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#005b52] mb-3">Sobre a Oficina</h3>
                      <p className="text-slate-600 leading-relaxed">{workshopData.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#005b52] mb-3">Especialidades</h4>
                      <div className="flex flex-wrap gap-2">
                        {workshopData.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-[#005b52]/10 text-[#005b52] px-3 py-1 rounded-lg text-sm font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#005b52] mb-3">Certificações</h4>
                      <div className="flex flex-wrap gap-2">
                        {workshopData.certifications.map((cert, index) => (
                          <span
                            key={index}
                            className="bg-[#9fc031]/10 text-[#9fc031] px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1"
                          >
                            <Award className="w-3 h-3" />
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'avaliacoes' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-[#9fc031]">{workshopData.rating}</div>
                        <div className="flex items-center gap-1 justify-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-4 h-4 fill-[#9fc031] text-[#9fc031]" />
                          ))}
                        </div>
                        <div className="text-sm text-slate-600">{workshopData.reviews} avaliações</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {workshopData.recentReviews.map((review) => (
                        <div key={review.id} className="border border-slate-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-[#005b52] rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-semibold">
                                  {review.customer.charAt(0)}
                                </span>
                              </div>
                              <span className="font-medium">{review.customer}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`w-4 h-4 ${
                                    star <= review.rating 
                                      ? 'fill-[#9fc031] text-[#9fc031]' 
                                      : 'text-slate-300'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-slate-600 text-sm">{review.comment}</p>
                          <div className="text-xs text-slate-500 mt-2">{review.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'equipe' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-[#005b52] mb-4">Nossa Equipe</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {workshopData.team.map((member, index) => (
                        <div key={index} className="border border-slate-200 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#005b52] rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {member.name.split(' ').map(n => n.charAt(0)).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="font-semibold text-[#005b52]">{member.name}</div>
                              <div className="text-sm text-slate-600">{member.role}</div>
                              <div className="text-xs text-slate-500">{member.experience} de experiência</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informações de Contato */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#005b52] mb-4">Informações de Contato</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#005b52]" />
                  <div>
                    <div className="font-medium">Endereço</div>
                    <div className="text-sm text-slate-600">{workshopData.address}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#005b52]" />
                  <div>
                    <div className="font-medium">Telefone</div>
                    <div className="text-sm text-slate-600">{workshopData.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#005b52]" />
                  <div>
                    <div className="font-medium">Horário</div>
                    <div className="text-sm text-slate-600">{workshopData.openHours}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mt-6">
                <button className="w-full bg-[#9fc031] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#8ab028] transition-colors">
                  Ligar Agora
                </button>
                <button className="w-full bg-green-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-600 transition-colors">
                  WhatsApp
                </button>
                <button className="w-full border-2 border-[#005b52] text-[#005b52] py-3 px-4 rounded-xl font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Agendar Visita
                </button>
              </div>
            </div>

            {/* Localização */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#005b52] mb-4">Localização</h3>
              <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center">
                <MapPin className="w-8 h-8 text-slate-400" />
              </div>
              <button className="w-full mt-4 border border-[#005b52] text-[#005b52] py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors text-sm">
                Ver no Mapa
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Download do App */}
      <AppDownload />
    </div>
  );
}