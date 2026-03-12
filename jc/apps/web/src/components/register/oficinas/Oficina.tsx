'use client'
import { Building2, Phone, MapPin, Upload, FileText, Mail, User, Shield, CheckCircle, Star, Award, Camera, Eye, Wrench } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export function WorkshopRegister() {
  const [formData, setFormData] = useState({
    nome: '',
    nif: '',
    email: '',
    telefone: '',
    celular: '',
    responsavel: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    especialidades: [] as string[],
    descricao: '',
    horarioFuncionamento: '',
    experiencia: '',
    certificacoes: [] as string[]
  });

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const especialidadesOptions = [
    'Inspeção Completa',
    'Diagnóstico Eletrônico',
    'Motor e Câmbio',
    'Freios e Suspensão',
    'Ar Condicionado',
    'Elétrica',
    'Injeção Eletrônica',
    'Alinhamento e Balanceamento',
    'Vistoria Pré-Compra',
    'Laudo Técnico',
    'Pintura e Funilaria',
    'Troca de Óleo'
  ];

  const certificacoesOptions = [
    'ISO 9001',
    'Certificação Bosch',
    'Certificação Denso',
    'Certificação NGK',
    'Certificação Mahle',
    'Certificação Continental'
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setSelectedImages(prev => [...prev, ...newImages].slice(0, 6));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleEspecialidade = (esp: string) => {
    setFormData(prev => ({
      ...prev,
      especialidades: prev.especialidades.includes(esp)
        ? prev.especialidades.filter(e => e !== esp)
        : [...prev.especialidades, esp]
    }));
  };

  const toggleCertificacao = (cert: string) => {
    setFormData(prev => ({
      ...prev,
      certificacoes: prev.certificacoes.includes(cert)
        ? prev.certificacoes.filter(c => c !== cert)
        : [...prev.certificacoes, cert]
    }));
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
              <span className="text-sm font-medium">Rede Confiável</span>
            </div>
            <div className="flex items-center gap-2 bg-[#005b52] text-white px-4 py-2 rounded-full">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Verificação Gratuita</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">Mais Clientes</span>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#005b52] to-[#007066] text-white px-8 py-4 rounded-2xl mb-6 shadow-lg">
            <Building2 className="w-8 h-8" />
            <span className="text-xl font-bold">Cadastre sua Oficina</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-[#005b52] mb-4">
            Faça Parte da Nossa Rede
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Junte-se à maior plataforma de oficinas de Angola e receba mais clientes todos os dias.
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
                {currentStep === 2 && 'Especialidades e Fotos'}
                {currentStep === 3 && 'Finalização'}
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
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#005b52]">Informações da Oficina</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Eye className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-900">Dica Profissional</h3>
                    </div>
                    <p className="text-blue-800 text-sm">
                      Oficinas com perfil completo recebem 60% mais solicitações. Preencha todos os dados com cuidado.
                    </p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="nome" className="block text-sm font-semibold text-slate-700 mb-2">
                    Nome da Oficina *
                  </label>
                  <input
                    id="nome"
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-4 py-4 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                    placeholder="Ex: AutoCenter Premium"
                  />
                </div>

                <div>
                  <label htmlFor="nif" className="block text-sm font-semibold text-slate-700 mb-2">
                    NIF (Número de Identificação Fiscal) *
                  </label>
                  <input
                    id="nif"
                    type="text"
                    required
                    value={formData.nif}
                    onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                    className="w-full px-4 py-4 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                    placeholder="000000000"
                  />
                </div>

                <div>
                  <label htmlFor="responsavel" className="block text-sm font-semibold text-slate-700 mb-2">
                    Responsável Técnico *
                  </label>
                  <div className="relative">
                    <input
                      id="responsavel"
                      type="text"
                      required
                      value={formData.responsavel}
                      onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                      className="w-full px-4 py-4 pl-12 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                      placeholder="Nome completo do responsável"
                    />
                    <User className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                    E-mail Comercial *
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-4 pl-12 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                      placeholder="contato@oficina.com"
                    />
                    <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="celular" className="block text-sm font-semibold text-slate-700 mb-2">
                    Celular/WhatsApp *
                  </label>
                  <div className="relative">
                    <input
                      id="celular"
                      type="tel"
                      required
                      value={formData.celular}
                      onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                      className="w-full px-4 py-4 pl-12 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                      placeholder="+244 xxx xxx xxx"
                    />
                    <Phone className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="endereco" className="block text-sm font-semibold text-slate-700 mb-2">
                    Endereço Completo *
                  </label>
                  <div className="relative">
                    <input
                      id="endereco"
                      type="text"
                      required
                      value={formData.endereco}
                      onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                      className="w-full px-4 py-4 pl-12 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                      placeholder="Rua, Número, Bairro"
                    />
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="cidade" className="block text-sm font-semibold text-slate-700 mb-2">
                    Cidade *
                  </label>
                  <input
                    id="cidade"
                    type="text"
                    required
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                    className="w-full px-4 py-4 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                    placeholder="Luanda"
                  />
                </div>

                <div>
                  <label htmlFor="estado" className="block text-sm font-semibold text-slate-700 mb-2">
                    Província *
                  </label>
                  <select
                    id="estado"
                    required
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                    className="w-full px-4 py-4 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                  >
                    <option value="">Selecione a província</option>
                    <option value="Luanda">Luanda</option>
                    <option value="Benguela">Benguela</option>
                    <option value="Cabinda">Cabinda</option>
                    <option value="Huambo">Huambo</option>
                    <option value="Huila">Huíla</option>
                    <option value="Malanje">Malanje</option>
                    <option value="Namibe">Namibe</option>
                    <option value="Uige">Uíge</option>
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
          {/* Step 2: Especialidades e Fotos */}
          {currentStep === 2 && (
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#9fc031] p-3 rounded-xl">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#005b52]">Especialidades e Fotos</h2>
              </div>

              {/* Especialidades */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Wrench className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold text-amber-900">Destaque suas Especialidades</h3>
                  </div>
                  <p className="text-amber-800 text-sm">
                    Oficinas especializadas recebem 50% mais solicitações. Selecione todos os serviços que oferece.
                  </p>
                </div>

                <label className="block text-sm font-semibold text-slate-700 mb-4">
                  Serviços Oferecidos * (Selecione pelo menos 3)
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {especialidadesOptions.map((esp) => (
                    <label
                      key={esp}
                      className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                        formData.especialidades.includes(esp)
                          ? 'border-[#9fc031] bg-[#9fc031]/10 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.especialidades.includes(esp)}
                        onChange={() => toggleEspecialidade(esp)}
                        className="w-5 h-5 text-[#9fc031] focus:ring-[#9fc031] rounded"
                      />
                      <span className="text-sm font-medium text-slate-700">{esp}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Certificações */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-4">
                  Certificações (Opcional)
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {certificacoesOptions.map((cert) => (
                    <label
                      key={cert}
                      className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                        formData.certificacoes.includes(cert)
                          ? 'border-blue-300 bg-blue-50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.certificacoes.includes(cert)}
                        onChange={() => toggleCertificacao(cert)}
                        className="w-5 h-5 text-blue-600 focus:ring-blue-500 rounded"
                      />
                      <span className="text-sm font-medium text-slate-700">{cert}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Upload de Fotos */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-4">
                  Fotos da Oficina (Máximo 6 fotos)
                </label>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
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
                    </div>
                  ))}
                  
                  {selectedImages.length < 6 && (
                    <label className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#9fc031] hover:bg-[#9fc031]/5 transition-all group">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <Camera className="w-8 h-8 text-slate-400 group-hover:text-[#9fc031] mb-2" />
                      <span className="text-sm text-slate-500 group-hover:text-[#9fc031] font-medium">Adicionar Foto</span>
                    </label>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Fachada da oficina</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Área de trabalho</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Equipamentos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Equipe trabalhando</span>
                  </div>
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

          {/* Step 3: Finalização */}
          {currentStep === 3 && (
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#005b52] p-3 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#005b52]">Informações Finais</h2>
              </div>

              <div className="mb-8">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-green-900">Quase pronto!</h3>
                  </div>
                  <p className="text-green-800 text-sm">
                    Complete as informações finais para ativar seu perfil na plataforma.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="horarioFuncionamento" className="block text-sm font-semibold text-slate-700 mb-2">
                      Horário de Funcionamento *
                    </label>
                    <input
                      id="horarioFuncionamento"
                      type="text"
                      required
                      value={formData.horarioFuncionamento}
                      onChange={(e) => setFormData({ ...formData, horarioFuncionamento: e.target.value })}
                      className="w-full px-4 py-4 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                      placeholder="Ex: Segunda a Sexta: 8h às 18h"
                    />
                  </div>

                  <div>
                    <label htmlFor="experiencia" className="block text-sm font-semibold text-slate-700 mb-2">
                      Anos de Experiência *
                    </label>
                    <select
                      id="experiencia"
                      required
                      value={formData.experiencia}
                      onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })}
                      className="w-full px-4 py-4 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                    >
                      <option value="">Selecione</option>
                      <option value="1-3">1 a 3 anos</option>
                      <option value="4-7">4 a 7 anos</option>
                      <option value="8-15">8 a 15 anos</option>
                      <option value="15+">Mais de 15 anos</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="descricao" className="block text-sm font-semibold text-slate-700 mb-2">
                      Descrição da Oficina *
                    </label>
                    <textarea
                      id="descricao"
                      required
                      value={formData.descricao}
                      onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-4 border-2 border-slate-200 text-black rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none resize-none transition-all"
                      placeholder="Conte sobre sua oficina, experiência, diferenciais, equipamentos, equipe..."
                    />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-slate-500">Mínimo 50 caracteres</p>
                      <span className="text-sm text-slate-400">{formData.descricao.length} caracteres</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#005b52] mb-6">Resumo do Cadastro</h3>
                <div className="bg-slate-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Oficina:</span>
                      <span className="font-semibold">{formData.nome || 'Não informado'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Localização:</span>
                      <span className="font-semibold">{formData.cidade}, {formData.estado}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Especialidades:</span>
                      <span className="font-semibold">{formData.especialidades.length} serviços</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Fotos:</span>
                      <span className="font-semibold">{selectedImages.length} foto(s)</span>
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
                      <span>Declaro que todas as informações fornecidas são verdadeiras e que possuo autorização para operar.</span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="checkbox" required className="mt-1 w-4 h-4 text-[#9fc031] border-slate-300 rounded focus:ring-[#9fc031]" />
                      <span>Concordo com os Termos de Uso e Política de Privacidade da FlxMotor.</span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 w-4 h-4 text-[#9fc031] border-slate-300 rounded focus:ring-[#9fc031]" />
                      <span>Aceito receber solicitações de serviços e comunicações da plataforma.</span>
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
                  Cadastrar Oficina
                </button>
              </div>

              <div className="mt-8 text-center">
                <div className="bg-gradient-to-r from-[#005b52]/10 to-[#9fc031]/10 rounded-xl p-6">
                  <h4 className="font-semibold text-[#005b52] mb-2">Próximos Passos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                    <div className="flex flex-col items-center">
                      <div className="bg-[#9fc031] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2">1</div>
                      <span>Análise em até 48h</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-[#9fc031] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2">2</div>
                      <span>Ativação do perfil</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-[#9fc031] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2">3</div>
                      <span>Receba solicitações</span>
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