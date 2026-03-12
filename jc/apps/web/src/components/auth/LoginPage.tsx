import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Car, Shield, CheckCircle } from 'lucide-react';

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header com badges de confiança */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-[#9fc031] text-white px-4 py-2 rounded-full">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">100% Seguro</span>
            </div>
            <div className="flex items-center gap-2 bg-[#005b52] text-white px-4 py-2 rounded-full">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Acesso Rápido</span>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#005b52] to-[#007066] text-white px-8 py-4 rounded-2xl mb-6 shadow-lg">
            <Car className="w-8 h-8" />
            <span className="text-xl font-bold">FlxMotor</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-[#005b52] mb-4">
            Bem-vindo de Volta
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Acesse sua conta e continue aproveitando todos os recursos da plataforma.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-4 pl-12 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                    placeholder="seu@email.com"
                    required
                  />
                  <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-4 pl-12 pr-12 border-2 text-black border-slate-200 rounded-xl focus:ring-2 focus:ring-[#9fc031] focus:border-[#9fc031] outline-none transition-all"
                    placeholder="••••••••"
                    required
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

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#9fc031] border-slate-300 rounded focus:ring-[#9fc031]"
                  />
                  <span className="ml-2 text-sm text-slate-600">Lembrar-me</span>
                </label>
                <a href="#" className="text-sm text-[#005b52] hover:text-[#9fc031] font-medium">
                  Esqueceu a senha?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#9fc031] to-[#8ab028] text-white py-4 px-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
              >
                Entrar
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-slate-300"></div>
              <span className="px-4 text-sm text-slate-500">ou</span>
              <div className="flex-1 border-t border-slate-300"></div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-slate-600">
                Não tem uma conta?{' '}
                <a href="#" className="text-[#005b52] hover:text-[#9fc031] font-semibold">
                  Cadastre-se
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}