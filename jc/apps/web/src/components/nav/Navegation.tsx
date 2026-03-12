"use client";
import { Car, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState,useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PageLoading } from "../shared/page-loading";
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  function handleNavigate(path: string) {
    if (path === pathname) return;

    setLoading(true);
    setIsOpen(false);
    router.push(path);
  }

  // 🔥 Isto resolve o problema
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);
  }, [pathname]);
  return (
    <>
      <PageLoading visible={loading} />
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#005b52] to-[#007066] p-2 rounded-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-[#005b52]">
                Fix Motor
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => handleNavigate("/")}
                className="text-slate-700 hover:text-[#005b52] transition-colors cursor-pointer"
              >
                Início
              </button>
              <button
               onClick={() => handleNavigate("/oficinas")}
                className="text-slate-700 hover:text-[#005b52] transition-colors"
              >
                Oficinas
              </button>
              <button
                onClick={() => handleNavigate("/in/oficina")}
                className="text-slate-700 hover:text-[#005b52] transition-colors"
              >
                Cadastrar Oficina
              </button>
              <button
                onClick={() => handleNavigate("/in/client")}
                className="text-slate-700 hover:text-[#005b52] transition-colors"
              >
                Cadastrar Cliente
              </button>
              <button
                onClick={() => handleNavigate("/shop")}
                className="text-slate-700 hover:text-[#005b52] transition-colors"
              >
                Vender Carro
              </button>
              <button onClick={() => handleNavigate("/auth")} className="bg-gradient-to-r from-[#9fc031] to-[#8ab028] text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                Entrar
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden py-4 space-y-3">
              <a
                href="#home"
                className="block text-slate-700 hover:text-[#005b52] transition-colors py-2"
              >
                Início
              </a>
              <Link
                href="/oficinas"
                className="block text-slate-700 hover:text-[#005b52] transition-colors py-2"
              >
                Oficinas
              </Link>
              <a
                href="#cadastro"
                className="block text-slate-700 hover:text-[#005b52] transition-colors py-2"
              >
                Cadastrar Oficina
              </a>
              <a
                href="#cadastro-cliente"
                className="block text-slate-700 hover:text-[#005b52] transition-colors py-2"
              >
                Cadastrar Cliente
              </a>
              <a
                href="#cadastro-carro"
                className="block text-slate-700 hover:text-[#005b52] transition-colors py-2"
              >
                Vender Carro
              </a>
              <button className="w-full bg-gradient-to-r from-[#9fc031] to-[#8ab028] text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                Entrar
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}


