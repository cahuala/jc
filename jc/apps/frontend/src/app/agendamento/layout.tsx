'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AgendamentoLayoutProps {
  children: React.ReactNode;
}

export default function AgendamentoLayout({ children }: AgendamentoLayoutProps) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/agendamento/listar', label: 'Listar Agendamentos', icon: 'fa-list' },
    { href: '/agendamento/calendario', label: 'Calendário', icon: 'fa-calendar' },
    { href: '/agendamento/novo', label: 'Novo Agendamento', icon: 'fa-plus' }
  ];

  return (
    <div className="d-flex vh-100 bg-light">
      <div className="bg-white shadow-sm border-end" style={{width: '250px'}}>
        <div className="p-3 border-bottom">
          <h5 className="mb-1">Agendamentos</h5>
          <small className="text-muted">Gerencie os agendamentos da oficina</small>
        </div>
        
        <nav className="p-2">
          <ul className="nav flex-column">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href} className="nav-item">
                  <Link
                    href={item.href}
                    className={`nav-link d-flex align-items-center py-2 px-3 rounded ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-dark'
                    }`}
                  >
                    <i className={`fa ${item.icon} me-2`}></i>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="flex-fill overflow-auto">
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}