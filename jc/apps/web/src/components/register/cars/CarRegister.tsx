'use client'
import { Car, Upload, FileText, DollarSign, Calendar, Gauge, Fuel, Palette, Shield, CheckCircle, Star, Award, Camera, Eye } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export function CarRegister() {
  const [formData, setFormData] = useState({
    placa: '',
    marca: '',
    modelo: '',
    ano: '',
    cor: '',
    quilometragem: '',
    combustivel: '',
    cambio: '',
    preco: '',
    descricao: '',
    chassis: '',
    motor: '',
    portas: '',
    proprietarios: '1',
    cidade: '',
    telefone: '',
    nome: ''
  });

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setSelectedImages(prev => [...prev, ...newImages].slice(0, 8));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header com badges de confiança */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-[#9fc031] text-white px-4 py-2 rounded-full">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">100% Seguro</span>
            </div>
            <div className="flex items-center gap-2 bg-[#005b52] text-white px-4 py-2 rounded-full">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Verificação Gratuita</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">Venda Rápida</span>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#005b52] to-[#007066] text-white px-8 py-4 rounded-2xl mb-6 shadow-lg">
            <Car className="w-8 h-8" />
            <span className="text-xl font-bold">Venda seu Carro</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-[#005b52] mb-4">
            Cadastre seu Veículo
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Processo simples e seguro. Seu carro será verificado e promovido para milhares de compradores.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  currentStep >= step 
                    ? 'bg-[#9fc031] text-white' 
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {currentStep > step ? <CheckCircle className="w-6 h-6" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-20 h-1 mx-2 ${
                    currentStep > step ? 'bg-[#9fc031]' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="text-center">
              <div className="text-sm font-medium text-[#005b52]">
                {currentStep === 1 && 'Informações Básicas'}
                {currentStep === 2 && 'Fotos e Detalhes'}
                {currentStep === 3 && 'Contato e Finalização'}
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Step 1: Informações Básicas */}
          {currentStep === 1 && (
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#005b52] p-3 rounded-xl">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#005b52]">Informações do Veículo</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Eye className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-900">Dica Profissional</h3>
                    </div>
                    <p className="text-blue-800 text-sm">
                      Preencha todas as informações com precisão. Dados completos aumentam em até 40% as chances de venda rápida.
                    </p>
                  </div>
                </div>

                <div>
                  <label htmlFor="placa" className="block text-sm font-semibold text-slate-700 mb-2">
                    Placa do Veículo *
                  </label>
                  <input
                    id="placa"
                    type="text"
                    required
                    value={formData.placa}
                    onChange={(e) => setFormData({ ...formData, placa: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-4 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                    placeholder="LD-123-AB"
                  />
                </div>

                <div>
                  <label htmlFor="marca" className="block text-sm font-semibold text-slate-700 mb-2">
                    Marca *
                  </label>
                  <select
                    id="marca"
                    required
                    value={formData.marca}
                    onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                    className="w-full px-4 py-4 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                  >
                    <option value="">Selecione a marca</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="Ford">Ford</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Nissan">Nissan</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="BMW">BMW</option>
                    <option value="Audi">Audi</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="modelo" className="block text-sm font-semibold text-slate-700 mb-2">
                    Modelo *
                  </label>
                  <input
                    id="modelo"
                    type="text"
                    required
                    value={formData.modelo}
                    onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                    className="w-full px-4 py-4 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                    placeholder="Ex: Corolla XEi"
                  />
                </div>

                <div>
                  <label htmlFor="ano" className="block text-sm font-semibold text-slate-700 mb-2">
                    Ano de Fabricação *
                  </label>
                  <div className="relative">
                    <input
                      id="ano"
                      type="number"
                      required
                      value={formData.ano}
                      onChange={(e) => setFormData({ ...formData, ano: e.target.value })}
                      className="w-full px-4 py-4 pl-12 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                      placeholder="2023"
                      min="1980"
                      max="2026"
                    />
                    <Calendar className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="cor" className="block text-sm font-semibold text-slate-700 mb-2">
                    Cor *
                  </label>
                  <div className="relative">
                    <input
                      id="cor"
                      type="text"
                      required
                      value={formData.cor}
                      onChange={(e) => setFormData({ ...formData, cor: e.target.value })}
                      className="w-full px-4 py-4 pl-12 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                      placeholder="Ex: Prata Metálico"
                    />
                    <Palette className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="quilometragem" className="block text-sm font-semibold text-slate-700 mb-2">
                    Quilometragem *
                  </label>
                  <div className="relative">
                    <input
                      id="quilometragem"
                      type="text"
                      required
                      value={formData.quilometragem}
                      onChange={(e) => setFormData({ ...formData, quilometragem: e.target.value })}
                      className="w-full px-4 py-4 pl-12 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                      placeholder="50.000 km"
                    />
                    <Gauge className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="combustivel" className="block text-sm font-semibold text-slate-700 mb-2">
                    Combustível *
                  </label>
                  <div className="relative">
                    <select
                      id="combustivel"
                      required
                      value={formData.combustivel}
                      onChange={(e) => setFormData({ ...formData, combustivel: e.target.value })}
                      className="w-full px-4 py-4 pl-12 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                    >
                      <option value="">Selecione</option>
                      <option value="Gasolina">Gasolina</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Flex">Flex (Gasolina/Etanol)</option>
                      <option value="Elétrico">Elétrico</option>
                      <option value="Híbrido">Híbrido</option>
                    </select>
                    <Fuel className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="cambio" className="block text-sm font-semibold text-slate-700 mb-2">
                    Transmissão *
                  </label>
                  <select
                    id="cambio"
                    required
                    value={formData.cambio}
                    onChange={(e) => setFormData({ ...formData, cambio: e.target.value })}
                    className="w-full px-4 py-4 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                  >
                    <option value="">Selecione</option>
                    <option value="Manual">Manual</option>
                    <option value="Automático">Automático</option>
                    <option value="Automático CVT">Automático CVT</option>
                    <option value="Semiautomático">Semiautomático</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="portas" className="block text-sm font-semibold text-slate-700 mb-2">
                    Número de Portas
                  </label>
                  <select
                    id="portas"
                    value={formData.portas}
                    onChange={(e) => setFormData({ ...formData, portas: e.target.value })}
                    className="w-full px-4 py-4 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                  >
                    <option value="">Selecione</option>
                    <option value="2">2 portas</option>
                    <option value="4">4 portas</option>
                    <option value="5">5 portas</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-[#9fc031] to-[#8ab028] text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all font-semibold text-lg"
                >
                  Próximo Passo →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Fotos e Detalhes */}
          {currentStep === 2 && (
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#9fc031] p-3 rounded-xl">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#005b52]">Fotos e Detalhes Técnicos</h2>
              </div>

              {/* Upload de Fotos */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Camera className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold text-amber-900">Fotos Profissionais = Venda Rápida</h3>
                  </div>
                  <p className="text-amber-800 text-sm">
                    Anúncios com 6+ fotos de qualidade vendem 3x mais rápido. Inclua: frente, traseira, laterais, interior, painel e motor.
                  </p>
                </div>

                <label className="block text-sm font-semibold text-slate-700 mb-4">
                  Fotos do Veículo * (Máximo 8 fotos)
                </label>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-xl overflow-hidden border-2 border-slate-200">
                        <Image 
                          src={image} 
                          alt={`Foto ${index + 1}`} 
                          width={200}
                          height={200}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold hover:bg-red-600"
                      >
                        ×
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        Foto {index + 1}
                      </div>
                    </div>
                  ))}
                  
                  {selectedImages.length < 8 && (
                    <label className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#9fc031] hover:bg-[#9fc031]/5 transition-all group">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <Upload className="w-8 h-8 text-slate-400 group-hover:text-[#9fc031] mb-2" />
                      <span className="text-sm text-slate-500 group-hover:text-[#9fc031] font-medium">Adicionar Foto</span>
                    </label>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Fotos nítidas e bem iluminadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Múltiplos ângulos do veículo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Interior e painel visíveis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Detalhes importantes destacados</span>
                  </div>
                </div>
              </div>

              {/* Detalhes Técnicos */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#005b52] mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Detalhes Técnicos e Preço
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="chassis" className="block text-sm font-semibold text-slate-700 mb-2">
                      Número do Chassis
                    </label>
                    <input
                      id="chassis"
                      type="text"
                      value={formData.chassis}
                      onChange={(e) => setFormData({ ...formData, chassis: e.target.value })}
                      className="w-full px-4 py-4 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                      placeholder="17 caracteres do chassi"
                    />
                  </div>

                  <div>
                    <label htmlFor="motor" className="block text-sm font-semibold text-slate-700 mb-2">
                      Número do Motor
                    </label>
                    <input
                      id="motor"
                      type="text"
                      value={formData.motor}
                      onChange={(e) => setFormData({ ...formData, motor: e.target.value })}
                      className="w-full px-4 py-4 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                      placeholder="Número do motor"
                    />
                  </div>

                  <div>
                    <label htmlFor="proprietarios" className="block text-sm font-semibold text-slate-700 mb-2">
                      Número de Proprietários
                    </label>
                    <select
                      id="proprietarios"
                      value={formData.proprietarios}
                      onChange={(e) => setFormData({ ...formData, proprietarios: e.target.value })}
                      className="w-full px-4 py-4 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                    >
                      <option value="1">1º Dono (Mais valorizado)</option>
                      <option value="2">2º Dono</option>
                      <option value="3">3º Dono</option>
                      <option value="4">4+ Donos</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="preco" className="block text-sm font-semibold text-slate-700 mb-2">
                      Preço de Venda * (Kz)
                    </label>
                    <div className="relative">
                      <input
                        id="preco"
                        type="text"
                        required
                        value={formData.preco}
                        onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                        className="w-full px-4 py-4 pl-12 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all text-lg font-semibold"
                        placeholder="2.500.000"
                      />
                      <DollarSign className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Preços justos atraem mais compradores</p>
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <div className="mb-8">
                <label htmlFor="descricao" className="block text-sm font-semibold text-slate-700 mb-2">
                  Descrição Detalhada *
                </label>
                <textarea
                  id="descricao"
                  required
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-4 border-2 border-slate-200 text-black rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none resize-none transition-all"
                  placeholder="Descreva detalhadamente: estado de conservação, histórico de manutenção, opcionais, motivo da venda, etc. Quanto mais informações, maior a confiança do comprador."
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-slate-500">Mínimo 100 caracteres para melhor visibilidade</p>
                  <span className="text-sm text-slate-400">{formData.descricao.length} caracteres</span>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-semibold"
                >
                  ← Voltar
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-[#9fc031] to-[#8ab028] text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all font-semibold text-lg"
                >
                  Próximo Passo →
                </button>
              </div>
            </div>
          )}
          {/* Step 3: Contato e Finalização */}
          {currentStep === 3 && (
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#005b52] p-3 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#005b52]">Informações de Contato</h2>
              </div>

              <div className="mb-8">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-green-900">Seus dados estão seguros</h3>
                  </div>
                  <p className="text-green-800 text-sm">
                    Utilizamos criptografia avançada para proteger suas informações.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-semibold text-slate-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      id="nome"
                      type="text"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-4 py-4 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="telefone" className="block text-sm font-semibold text-slate-700 mb-2">
                      Telefone/WhatsApp *
                    </label>
                    <input
                      id="telefone"
                      type="tel"
                      required
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      className="w-full px-4 py-4 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                      placeholder="+244 xxx xxx xxx"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="cidade" className="block text-sm font-semibold text-slate-700 mb-2">
                      Cidade onde o veículo se encontra *
                    </label>
                    <select
                      id="cidade"
                      required
                      value={formData.cidade}
                      onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                      className="w-full px-4 py-4 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                    >
                      <option value="">Selecione a cidade</option>
                      <option value="Luanda">Luanda</option>
                      <option value="Benguela">Benguela</option>
                      <option value="Cabinda">Cabinda</option>
                      <option value="Huambo">Huambo</option>
                      <option value="Lubango">Lubango</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#005b52] mb-6">Resumo do seu Anúncio</h3>
                <div className="bg-slate-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Veículo:</span>
                      <span className="font-semibold">{formData.marca} {formData.modelo} {formData.ano}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Preço:</span>
                      <span className="font-semibold text-[#9fc031]">{formData.preco ? `${formData.preco} Kz` : 'Não informado'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Fotos:</span>
                      <span className="font-semibold">{selectedImages.length} foto(s)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Localização:</span>
                      <span className="font-semibold">{formData.cidade || 'Não informado'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="bg-white border-2 border-slate-200 rounded-xl p-6">
                  <h4 className="font-semibold text-[#005b52] mb-4">Termos e Condições</h4>
                  <div className="space-y-3 text-sm text-slate-600">
                    <label className="flex items-start gap-3">
                      <input type="checkbox" required className="mt-1 w-4 h-4 text-[#9fc031] border-slate-300 rounded focus:ring-[#9fc031]" />
                      <span>Declaro que todas as informações fornecidas são verdadeiras.</span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="checkbox" required className="mt-1 w-4 h-4 text-[#9fc031] border-slate-300 rounded focus:ring-[#9fc031]" />
                      <span>Concordo com os Termos de Uso e Política de Privacidade da FlxMotor.</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-semibold"
                >
                  ← Voltar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#9fc031] to-[#8ab028] text-white py-4 px-8 rounded-xl hover:shadow-xl transition-all font-bold text-lg flex items-center justify-center gap-3"
                >
                  <CheckCircle className="w-6 h-6" />
                  Publicar Veículo
                </button>
              </div>

              <div className="mt-8 text-center">
                <div className="bg-gradient-to-r from-[#005b52]/10 to-[#9fc031]/10 rounded-xl p-6">
                  <h4 className="font-semibold text-[#005b52] mb-2">O que acontece agora?</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                    <div className="flex flex-col items-center">
                      <div className="bg-[#9fc031] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2">1</div>
                      <span>Análise em até 24h</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-[#9fc031] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2">2</div>
                      <span>Publicação no site</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-[#9fc031] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2">3</div>
                      <span>Receba contatos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}