import { Car } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#005b52] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Topo */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-2 text-xl font-semibold">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-[#005b52] to-[#007066] p-2 rounded-lg">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-semibold text-white">
                  Fix Motor
                </span>
              </div>
            </div>

            <p className="mt-4 text-sm text-white/80">
              Plataforma profissional para diagnóstico automóvel, compra e venda
              de veículos com total segurança.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Navegação
            </h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <Link href="/">Início</Link>
              </li>
              <li>
                <Link href="/oficinas">Oficinas</Link>
              </li>
              <li>
                <Link href="/vender-carro">Vender Carro</Link>
              </li>
              <li>
                <Link href="/diagnostico">Diagnóstico</Link>
              </li>
            </ul>
          </div>

          {/* Plataforma */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Plataforma
            </h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <Link href="/cadastrar-oficina">Cadastrar Oficina</Link>
              </li>
              <li>
                <Link href="/cadastrar-cliente">Cadastrar Cliente</Link>
              </li>
              <li>
                <Link href="/login">Entrar</Link>
              </li>
            </ul>
          </div>

          {/* Contactos */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Contactos
            </h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li>📍 Luanda, Angola</li>
              <li>📞 +244 9XX XXX XXX</li>
              <li>✉️ suporte@autocheckpro.co.ao</li>
            </ul>
          </div>
        </div>

        {/* Linha inferior */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/70 md:flex-row">
          <span>
            © {new Date().getFullYear()}  Fix Motor System. Todos os direitos
            reservados.
          </span>

          <div className="flex gap-6">
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/termos">Termos</Link>
            <Link href="/contactos">Contactos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
