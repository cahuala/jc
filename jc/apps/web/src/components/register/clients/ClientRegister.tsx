'use client'
import { User, Phone, Mail, MapPin, Lock, Calendar, Shield, CheckCircle, Star, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export function ClientRegister() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    bi: '',
    endereco: '',
    cidade: '',
    provincia: '',
    senha: '',
    confirmarSenha: '',
    profissao: '',
    genero: ''
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    console.log('Form submitted:', formData);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-[#9fc031] text-white px-4 py-2 rounded-full">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">100% Seguro</span>
            </div>
            <div className="flex items-center gap-2 bg-[#005b52] text-white px-4 py-2 rounded-full">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Cadastro Gratuito</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">Acesso Completo</span>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#005b52] to-[#007066] text-white px-8 py-4 rounded-2xl mb-6 shadow-lg">
            <User className="w-8 h-8" />
            <span className="text-xl font-bold">Crie sua Conta</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-[#005b52] mb-4">
            Cadastre-se na FlxMotor
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Junte-se à maior plataforma automotiva de Angola. Venda seu carro, encontre oficinas e acompanhe seu histórico.
          </p>
        </div>

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
                {currentStep === 1 && 'Informações Pessoais'}
                {currentStep === 2 && 'Contato e Endereço'}
                {currentStep === 3 && 'Segurança e Finalização'}
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {currentStep === 1 && (
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#005b52] p-3 rounded-xl">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#005b52]">Informações Pessoais</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-4">
                    Foto de Perfil (Opcional)
                  </label>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-slate-100 rounded-full overflow-hidden flex items-center justify-center border-4 border-white shadow-lg">
                      {selectedImage ? (
                        <Image src={selectedImage} alt="Preview" width={96} height={96} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-12 h-12 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="client-photo-upload"
                      />
                      <label
                        htmlFor="client-photo-upload"
                        className="inline-block bg-gradient-to-r from-[#005b52] to-[#007066] text-white px-6 py-3 rounded-xl cursor-pointer hover:shadow-lg transition-all font-medium"
                      >
                        Escolher Foto
                      </label>
                      <p className="text-sm text-slate-500 mt-2">
                        JPG, PNG (máx. 5MB)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
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
                  <label htmlFor="bi" className="block text-sm font-semibold text-slate-700 mb-2">
                    Bilhete de Identidade *
                  </label>
                  <input
                    id="bi"
                    type="text"
                    required
                    value={formData.bi}
                    onChange={(e) => setFormData({ ...formData, bi: e.target.value })}
                    className="w-full px-4 py-4 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                    placeholder="000000000XX00"
                  />
                </div>

                <div>
                  <label htmlFor="dataNascimento" className="block text-sm font-semibold text-slate-700 mb-2">
                    Data de Nascimento *
                  </label>
                  <div className="relative">
                    <input
                      id="dataNascimento"
                      type="date"
                      required
                      value={formData.dataNascimento}
                      onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                      className="w-full px-4 py-4 pl-12 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                    />
                    <Calendar className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  </div>
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

          {currentStep === 2 && (
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#9fc031] p-3 rounded-xl">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#005b52]">Contato e Endereço</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                    E-mail *
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-4 pl-12 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                      placeholder="seu@email.com"
                    />
                    <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-sm font-semibold text-slate-700 mb-2">
                    Telefone/WhatsApp *
                  </label>
                  <div className="relative">
                    <input
                      id="telefone"
                      type="tel"
                      required
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
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
                  <label htmlFor="provincia" className="block text-sm font-semibold text-slate-700 mb-2">
                    Província *
                  </label>
                  <select
                    id="provincia"
                    required
                    value={formData.provincia}
                    onChange={(e) => setFormData({ ...formData, provincia: e.target.value })}
                    className="w-full px-4 py-4 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                  >
                    <option value="">Selecione a província</option>
                    <option value="Luanda">Luanda</option>
                    <option value="Benguela">Benguela</option>
                    <option value="Huambo">Huambo</option>
                    <option value="Huíla">Huíla</option>
                    <option value="Cabinda">Cabinda</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between mt-8">
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

          {currentStep === 3 && (
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#005b52] p-3 rounded-xl">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#005b52]">Segurança da Conta</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="senha" className="block text-sm font-semibold text-slate-700 mb-2">
                    Senha *
                  </label>
                  <div className="relative">
                    <input
                      id="senha"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.senha}
                      onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                      className="w-full px-4 py-4 pl-12 pr-12 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                      placeholder="Mínimo 8 caracteres"
                      minLength={8}
                    />
                    <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmarSenha" className="block text-sm font-semibold text-slate-700 mb-2">
                    Confirmar Senha *
                  </label>
                  <div className="relative">
                    <input
                      id="confirmarSenha"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmarSenha}
                      onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                      className="w-full px-4 py-4 pl-12 pr-12 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                      placeholder="Digite a senha novamente"
                      minLength={8}
                    />
                    <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="bg-white border-2 border-slate-200 rounded-xl p-6 mt-8">
                  <h4 className="font-semibold text-[#005b52] mb-4">Termos e Condições</h4>
                  <div className="space-y-3 text-sm text-slate-600">
                    <label className="flex items-start gap-3">
                      <input type="checkbox" required className="mt-1 w-4 h-4 text-[#9fc031] border-slate-300 rounded focus:ring-[#9fc031]" />
                      <span>Li e aceito os Termos de Uso e Política de Privacidade da FlxMotor.</span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input type="checkbox" required className="mt-1 w-4 h-4 text-[#9fc031] border-slate-300 rounded focus:ring-[#9fc031]" />
                      <span>Confirmo que tenho mais de 18 anos e que todas as informações fornecidas são verdadeiras.</span>
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
                  Criar Conta
                </button>
              </div>

              <p className="text-sm text-slate-500 text-center mt-6">
                Já tem uma conta? <a href="#" className="text-[#005b52] font-semibold hover:underline">Fazer Login</a>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}