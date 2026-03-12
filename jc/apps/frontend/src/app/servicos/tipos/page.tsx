'use client';

import { useState } from 'react';
import { Panel, PanelHeader, PanelBody } from '@/components/panel/panel';
import TipoServicoTable from '@/components/servicos/TipoServicoTable';
import TipoServicoModal from '@/components/servicos/TipoServicoModal';

export default function TiposServicoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [modalAberto, setModalAberto] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState(null);

  const tiposServico = [
    {
      id: 1,
      nome: 'Troca de Óleo',
      categoria: 'Manutenção Preventiva',
      descricao: 'Troca de óleo do motor e filtro',
      preco: 150.00,
      tempoEstimado: 30,
      status: 'ativo',
      materiais: ['Óleo 5W30', 'Filtro de óleo'],
      frequencia: 'A cada 10.000 km'
    },
    {
      id: 2,
      nome: 'Alinhamento e Balanceamento',
      categoria: 'Suspensão',
      descricao: 'Alinhamento das rodas e balanceamento',
      preco: 80.00,
      tempoEstimado: 60,
      status: 'ativo',
      materiais: ['Chumbo para balanceamento'],
      frequencia: 'A cada 20.000 km'
    },
    {
      id: 3,
      nome: 'Revisão Completa',
      categoria: 'Manutenção Preventiva',
      descricao: 'Revisão geral do veículo',
      preco: 350.00,
      tempoEstimado: 180,
      status: 'ativo',
      materiais: ['Diversos filtros', 'Fluidos'],
      frequencia: 'A cada 6 meses'
    }
  ];

  const abrirModal = (tipo = null) => {
    setTipoSelecionado(tipo);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setTipoSelecionado(null);
  };

  const handleDeleteTipo = (tipo: any) => {
    alert(`Tipo de serviço "${tipo.nome}" foi excluído com sucesso!`);
    // Aqui implementaria a lógica real de exclusão
  };

  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <div>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
            <li className="breadcrumb-item"><a href="/servicos">Serviços</a></li>
            <li className="breadcrumb-item active">Tipos de Serviço</li>
          </ol>
          <h1 className="page-header mb-0">Tipos de Serviço</h1>
        </div>
        <div className="ms-auto">
          <button 
            className="btn btn-success"
            onClick={() => abrirModal()}
          >
            <i className="fa fa-plus me-2"></i>
            Novo Tipo de Serviço
          </button>
        </div>
      </div>

      <TipoServicoTable 
        tiposServico={tiposServico}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onEdit={abrirModal}
        onDelete={handleDeleteTipo}
      />

      {modalAberto && (
        <TipoServicoModal 
          tipo={tipoSelecionado}
          isOpen={modalAberto}
          onClose={fecharModal}
        />
      )}
    </>
  );
}