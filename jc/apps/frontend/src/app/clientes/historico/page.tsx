'use client';

import { useState } from 'react';
import Link from 'next/link';
import HistoricoStats from '@/components/historico/HistoricoStats';
import HistoricoCharts from '@/components/historico/HistoricoCharts';
import HistoricoTable from '@/components/historico/HistoricoTable';
import HistoricoAnalytics from '@/components/historico/HistoricoAnalytics';

interface Servico {
	id: number;
	clienteId: number;
	clienteNome: string;
	veiculoId: number;
	veiculo: string;
	placa: string;
	tipoServico: string;
	descricao: string;
	mecanico: string;
	dataEntrada: string;
	dataSaida: string;
	valor: number;
	status: 'concluido' | 'em_andamento' | 'cancelado' | 'aguardando';
	observacoes: string;
	pecasUsadas: string[];
	tempoServico: number;
}

export default function HistoricoServicosPage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [filterStatus, setFilterStatus] = useState('todos');
	const [selectedCliente, setSelectedCliente] = useState('');

	const clientes = [
		{
			id: 1,
			nome: 'João Silva',
			historico: [
				{ id: 1, data: '15/01/2024', veiculo: 'Honda Civic 2020', placa: 'ABC-1234', servicos: ['Troca de óleo', 'Filtro de ar'], valor: 450, status: 'concluido' },
				{ id: 2, data: '10/12/2023', veiculo: 'Toyota Corolla 2018', placa: 'DEF-5678', servicos: ['Alinhamento'], valor: 180, status: 'concluido' }
			]
		},
		{
			id: 2,
			nome: 'Maria Santos',
			historico: [
				{ id: 3, data: '20/01/2024', veiculo: 'Toyota Corolla 2019', placa: 'XYZ-5678', servicos: ['Revisão geral', 'Troca de óleo'], valor: 380, status: 'concluido' },
				{ id: 4, data: '15/11/2023', veiculo: 'Toyota Corolla 2019', placa: 'XYZ-5678', servicos: ['Balanceamento'], valor: 120, status: 'concluido' }
			]
		},
		{
			id: 3,
			nome: 'Carlos Lima',
			historico: [
				{ id: 5, data: '10/01/2024', veiculo: 'Ford Focus 2018', placa: 'DEF-9012', servicos: ['Reparo freios', 'Pastilhas'], valor: 520, status: 'concluido' },
				{ id: 6, data: '05/12/2023', veiculo: 'Hyundai HB20 2021', placa: 'GHI-1234', servicos: ['Troca de óleo'], valor: 180, status: 'concluido' },
				{ id: 7, data: '20/11/2023', veiculo: 'Ford Focus 2018', placa: 'DEF-9012', servicos: ['Revisão freios'], valor: 280, status: 'concluido' }
			]
		},
		{
			id: 4,
			nome: 'Ana Costa',
			historico: [
				{ id: 8, data: '05/12/2023', veiculo: 'Volkswagen Golf 2021', placa: 'GHI-3456', servicos: ['Revisão'], valor: 350, status: 'concluido' },
				{ id: 9, data: '10/09/2023', veiculo: 'Volkswagen Golf 2021', placa: 'GHI-3456', servicos: ['Troca de óleo'], valor: 200, status: 'concluido' }
			]
		},
		{
			id: 5,
			nome: 'Pedro Oliveira',
			historico: [
				{ id: 10, data: '22/01/2024', veiculo: 'Chevrolet Onix 2022', placa: 'JKL-7890', servicos: ['Primeira revisão'], valor: 300, status: 'concluido' },
				{ id: 11, data: '15/12/2023', veiculo: 'Chevrolet Onix 2022', placa: 'JKL-7890', servicos: ['Troca de óleo'], valor: 150, status: 'concluido' }
			]
		},
		{
			id: 6,
			nome: 'Fernanda Rocha',
			historico: [
				{ id: 12, data: '18/01/2024', veiculo: 'Hyundai HB20 2020', placa: 'MNO-2468', servicos: ['Alinhamento', 'Balanceamento'], valor: 250, status: 'concluido' },
				{ id: 13, data: '10/12/2023', veiculo: 'Nissan March 2017', placa: 'PQR-1357', servicos: ['Troca de óleo', 'Filtros'], valor: 220, status: 'concluido' },
				{ id: 14, data: '25/10/2023', veiculo: 'Hyundai HB20 2020', placa: 'MNO-2468', servicos: ['Revisão geral'], valor: 400, status: 'concluido' }
			]
		}
	];

	const servicos: Servico[] = clientes.flatMap(cliente => 
		cliente.historico?.map(hist => ({
			id: hist.id,
			clienteId: cliente.id,
			clienteNome: cliente.nome,
			veiculoId: hist.id,
			veiculo: hist.veiculo,
			placa: hist.placa,
			tipoServico: hist.servicos[0] || 'Serviço',
			descricao: hist.servicos.join(', '),
			mecanico: ['António Mendes', 'Manuel Costa', 'José Ferreira'][Math.floor(Math.random() * 3)],
			dataEntrada: hist.data,
			dataSaida: hist.data,
			valor: hist.valor,
			status: hist.status as 'concluido' | 'em_andamento' | 'cancelado' | 'aguardando',
			observacoes: 'Serviço realizado conforme solicitado',
			pecasUsadas: hist.servicos,
			tempoServico: Math.round(hist.valor / 100)
		})) || []
	);

	const filteredServicos = servicos.filter(servico => {
		const matchesSearch = servico.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 servico.veiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 servico.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 servico.tipoServico.toLowerCase().includes(searchTerm.toLowerCase());
		
		const matchesStatus = filterStatus === 'todos' || servico.status === filterStatus;
		const matchesCliente = selectedCliente === '' || servico.clienteId.toString() === selectedCliente;
		
		return matchesSearch && matchesStatus && matchesCliente;
	});

	const totalReceita = filteredServicos.reduce((sum, s) => sum + s.valor, 0);
	const servicosConcluidos = filteredServicos.filter(s => s.status === 'concluido').length;
	const tempoMedio = filteredServicos.length > 0 
		? (filteredServicos.reduce((sum, s) => sum + s.tempoServico, 0) / filteredServicos.length).toFixed(1)
		: '0';

	return (
		<>
			<ol className="breadcrumb float-xl-end">
				<li className="breadcrumb-item"><Link href="/dashboard/v1">Home</Link></li>
				<li className="breadcrumb-item"><Link href="/clientes">Clientes</Link></li>
				<li className="breadcrumb-item active">Histórico de Serviços</li>
			</ol>
			<h1 className="page-header">Histórico de Serviços <small>análise completa dos atendimentos</small></h1>

			<HistoricoStats 
				totalServicos={filteredServicos.length}
				totalReceita={totalReceita}
				servicosConcluidos={servicosConcluidos}
				tempoMedio={tempoMedio}
			/>

			<HistoricoCharts 
				filteredServicos={filteredServicos}
				totalReceita={totalReceita}
				servicosConcluidos={servicosConcluidos}
			/>

			<HistoricoTable 
				servicos={filteredServicos}
				clientes={clientes}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				filterStatus={filterStatus}
				setFilterStatus={setFilterStatus}
				selectedCliente={selectedCliente}
				setSelectedCliente={setSelectedCliente}
			/>

			<HistoricoAnalytics 
				filteredServicos={filteredServicos}
				totalReceita={totalReceita}
				servicosConcluidos={servicosConcluidos}
			/>
		</>
	);
}