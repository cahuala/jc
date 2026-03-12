'use client'
import { Car, Calendar, Wrench, Users, BarChart3, Settings, Bell, Plus, Eye, CheckCircle, FileText, Package, CreditCard, UserCheck, Clock, Shield, Award, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const menuItems = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: BarChart3,
    path: '/dashboard'
  },
  {
    id: 'agendamentos',
    name: 'Agendamentos',
    icon: Calendar,
    path: '/agendamentos',
    badge: '5'
  },
  {
    id: 'servicos',
    name: 'Serviços',
    icon: Wrench,
    path: '/servicos',
    submenu: [
      { name: 'Ordens de Serviço', path: '/servicos/ordens', icon: FileText },
      { name: 'Diagnósticos', path: '/servicos/diagnosticos', icon: CheckCircle },
      { name: 'Histórico', path: '/servicos/historico', icon: Clock }
    ]
  },
  {
    id: 'clientes',
    name: 'Clientes',
    icon: Users,
    path: '/clientes',
    submenu: [
      { name: 'Lista de Clientes', path: '/clientes/lista', icon: Users },
      { name: 'Veículos', path: '/clientes/veiculos', icon: Car },
      { name: 'Histórico de Serviços', path: '/clientes/historico', icon: FileText }
    ]
  },
  {
    id: 'estoque',
    name: 'Estoque',
    icon: Package,
    path: '/estoque',
    submenu: [
      { name: 'Produtos', path: '/estoque/produtos', icon: Package },
      { name: 'Categorias', path: '/estoque/categorias', icon: FileText },
      { name: 'Fornecedores', path: '/estoque/fornecedores', icon: Users },
      { name: 'Movimentações', path: '/estoque/movimentacoes', icon: BarChart3 }
    ]
  },
  {
    id: 'financeiro',
    name: 'Financeiro',
    icon: CreditCard,
    path: '/financeiro',
    submenu: [
      { name: 'Faturamento', path: '/financeiro/faturamento', icon: CreditCard },
      { name: 'Contas a Receber', path: '/financeiro/receber', icon: BarChart3 },
      { name: 'Contas a Pagar', path: '/financeiro/pagar', icon: FileText },
      { name: 'Relatórios', path: '/financeiro/relatorios', icon: BarChart3 }
    ]
  },
  {
    id: 'funcionarios',
    name: 'Funcionários',
    icon: UserCheck,
    path: '/funcionarios',
    submenu: [
      { name: 'Lista de Funcionários', path: '/funcionarios/lista', icon: Users },
      { name: 'Cargos', path: '/funcionarios/cargos', icon: Award },
      { name: 'Folha de Pagamento', path: '/funcionarios/folha', icon: CreditCard },
      { name: 'Ponto Eletrônico', path: '/funcionarios/ponto', icon: Clock }
    ]
  },
  {
    id: 'relatorios',
    name: 'Relatórios',
    icon: BarChart3,
    path: '/relatorios',
    submenu: [
      { name: 'Vendas', path: '/relatorios/vendas', icon: BarChart3 },
      { name: 'Serviços', path: '/relatorios/servicos', icon: Wrench },
      { name: 'Clientes', path: '/relatorios/clientes', icon: Users },
      { name: 'Financeiro', path: '/relatorios/financeiro', icon: CreditCard }
    ]
  },
  {
    id: 'configuracoes',
    name: 'Configurações',
    icon: Settings,
    path: '/configuracoes',
    submenu: [
      { name: 'Dados da Oficina', path: '/configuracoes/oficina', icon: MapPin },
      { name: 'Usuários', path: '/configuracoes/usuarios', icon: Users },
      { name: 'Permissões', path: '/configuracoes/permissoes', icon: Shield },
      { name: 'Backup', path: '/configuracoes/backup', icon: FileText }
    ]
  }
];

export function WorkshopSidebar() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#005b52] rounded-lg flex items-center justify-center">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-[#005b52]">AutoCenter Premium</h2>
            <p className="text-xs text-slate-600">Gestão de Oficina</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeMenu === item.id;
            const isExpanded = expandedMenus.includes(item.id);
            const hasSubmenu = item.submenu && item.submenu.length > 0;

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    setActiveMenu(item.id);
                    if (hasSubmenu) {
                      toggleSubmenu(item.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-[#005b52] text-white' 
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {hasSubmenu && (
                      <div className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                        ▶
                      </div>
                    )}
                  </div>
                </button>

                {/* Submenu */}
                {hasSubmenu && isExpanded && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.submenu?.map((subItem) => {
                      const SubIconComponent = subItem.icon;
                      return (
                        <button
                          key={subItem.path}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <SubIconComponent className="w-4 h-4" />
                          <span>{subItem.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 mt-auto">
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
          <div className="w-8 h-8 bg-[#005b52] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">JS</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-slate-800">João Silva</div>
            <div className="text-xs text-slate-600">Gestor</div>
          </div>
        </div>
      </div>
    </div>
  );
}