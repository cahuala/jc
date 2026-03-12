/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import ClienteStats from '@/components/clientes/ClienteStats';
import ClienteTable from '@/components/clientes/ClienteTable';
import ClienteEditModal from '@/components/clientes/ClienteEditModal';
import ClienteAnalytics from '@/components/clientes/ClienteAnalytics';
import ExportButtons from '@/components/ui/ExportButtons';

export default function ClientesPage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [filterStatus, setFilterStatus] = useState('todos');
	const [showModal, setShowModal] = useState(false);

	const handleDeleteCliente = (cliente: any) => {
		// Função será chamada após confirmação no modal
		console.log('Cliente excluído:', cliente);
	};

	const handleSaveNovoCliente = (cliente: any, veiculo?: any) => {
		if (veiculo) {
			console.log('Novo cliente salvo com veículo:', cliente, veiculo);
		} else {
			console.log('Novo cliente salvo:', cliente);
		}
		setShowModal(false);
	};

	const clientes = [
		{
			id: 1,
			nome: 'João Silva',
			telefone: '+244 923 456 789',
			email: 'joao@email.com',
			nif: '123456789',
			endereco: 'Rua da Maianga, Luanda, Angola',
			veiculos: [
				{ id: 1, marca: 'Honda', modelo: 'Civic', ano: 2020, placa: 'ABC-1234', cor: 'Branco', combustivel: 'Gasolina' },
				{ id: 2, marca: 'Toyota', modelo: 'Corolla', ano: 2018, placa: 'DEF-5678', cor: 'Prata', combustivel: 'Flex' }
			],
			ultimoServico: '15/01/2024',
			proximaRevisao: '15/07/2024',
			totalGasto: 2850,
			servicos: 8,
			status: 'ativo',
			observacoes: 'Cliente fiel, sempre pontual',
			historico: [
				{ id: 1, data: '15/01/2024', veiculo: 'Honda Civic 2020', placa: 'ABC-1234', servicos: ['Troca de óleo', 'Filtro de ar'], valor: 450, status: 'concluido' },
				{ id: 2, data: '10/12/2023', veiculo: 'Toyota Corolla 2018', placa: 'DEF-5678', servicos: ['Alinhamento'], valor: 180, status: 'concluido' }
			]
		},
		{
			id: 2,
			nome: 'Maria Santos',
			telefone: '+244 924 567 890',
			email: 'maria@email.com',
			nif: '987654321',
			endereco: 'Bairro Alvalade, Luanda, Angola',
			veiculos: [
				{ id: 3, marca: 'Toyota', modelo: 'Corolla', ano: 2019, placa: 'XYZ-5678', cor: 'Azul', combustivel: 'Flex' }
			],
			ultimoServico: '20/01/2024',
			proximaRevisao: '20/04/2024',
			totalGasto: 1950,
			servicos: 5,
			status: 'ativo',
			observacoes: 'Prefere agendamentos pela manhã',
			historico: [
				{ id: 3, data: '20/01/2024', veiculo: 'Toyota Corolla 2019', placa: 'XYZ-5678', servicos: ['Revisão geral', 'Troca de óleo'], valor: 380, status: 'concluido' },
				{ id: 4, data: '15/11/2023', veiculo: 'Toyota Corolla 2019', placa: 'XYZ-5678', servicos: ['Balanceamento'], valor: 120, status: 'concluido' }
			]
		},
		{
			id: 3,
			nome: 'Carlos Lima',
			telefone: '(11) 77777-9012',
			email: 'carlos@email.com',
			veiculos: [
				{ id: 4, marca: 'Ford', modelo: 'Focus', ano: 2018, placa: 'DEF-9012', cor: 'Preto', combustivel: 'Gasolina' },
				{ id: 5, marca: 'Hyundai', modelo: 'HB20', ano: 2021, placa: 'GHI-1234', cor: 'Vermelho', combustivel: 'Flex' },
				{ id: 6, marca: 'Volkswagen', modelo: 'Gol', ano: 2019, placa: 'JKL-5678', cor: 'Branco', combustivel: 'Flex' }
			],
			ultimoServico: '10/01/2024',
			proximaRevisao: '10/03/2024',
			totalGasto: 3200,
			servicos: 12,
			status: 'atencao',
			observacoes: 'Carro com problemas recorrentes no freio',
			historico: [
				{ id: 5, data: '10/01/2024', veiculo: 'Ford Focus 2018', placa: 'DEF-9012', servicos: ['Reparo freios', 'Pastilhas'], valor: 520, status: 'concluido' },
				{ id: 6, data: '05/12/2023', veiculo: 'Hyundai HB20 2021', placa: 'GHI-1234', servicos: ['Troca de óleo'], valor: 180, status: 'concluido' },
				{ id: 7, data: '20/11/2023', veiculo: 'Ford Focus 2018', placa: 'DEF-9012', servicos: ['Revisão freios'], valor: 280, status: 'concluido' }
			]
		},
		{
			id: 4,
			nome: 'Ana Costa',
			telefone: '(11) 66666-3456',
			email: 'ana@email.com',
			veiculos: [
				{ id: 7, marca: 'Volkswagen', modelo: 'Golf', ano: 2021, placa: 'GHI-3456', cor: 'Cinza', combustivel: 'Gasolina' }
			],
			ultimoServico: '05/12/2023',
			proximaRevisao: '05/06/2024',
			totalGasto: 850,
			servicos: 3,
			status: 'inativo',
			observacoes: 'Não comparece há 2 meses',
			historico: [
				{ id: 8, data: '05/12/2023', veiculo: 'Volkswagen Golf 2021', placa: 'GHI-3456', servicos: ['Revisão'], valor: 350, status: 'concluido' },
				{ id: 9, data: '10/09/2023', veiculo: 'Volkswagen Golf 2021', placa: 'GHI-3456', servicos: ['Troca de óleo'], valor: 200, status: 'concluido' }
			]
		},
		{
			id: 5,
			nome: 'Pedro Oliveira',
			telefone: '(11) 55555-7890',
			email: 'pedro@email.com',
			veiculos: [
				{ id: 8, marca: 'Chevrolet', modelo: 'Onix', ano: 2022, placa: 'JKL-7890', cor: 'Prata', combustivel: 'Flex' }
			],
			ultimoServico: '22/01/2024',
			proximaRevisao: '22/07/2024',
			totalGasto: 1200,
			servicos: 4,
			status: 'ativo',
			observacoes: 'Cliente novo, muito satisfeito',
			historico: [
				{ id: 10, data: '22/01/2024', veiculo: 'Chevrolet Onix 2022', placa: 'JKL-7890', servicos: ['Primeira revisão'], valor: 300, status: 'concluido' },
				{ id: 11, data: '15/12/2023', veiculo: 'Chevrolet Onix 2022', placa: 'JKL-7890', servicos: ['Troca de óleo'], valor: 150, status: 'concluido' }
			]
		},
		{
			id: 6,
			nome: 'Fernanda Rocha',
			telefone: '(11) 44444-2468',
			email: 'fernanda@email.com',
			veiculos: [
				{ id: 9, marca: 'Hyundai', modelo: 'HB20', ano: 2020, placa: 'MNO-2468', cor: 'Azul', combustivel: 'Flex' },
				{ id: 10, marca: 'Nissan', modelo: 'March', ano: 2017, placa: 'PQR-1357', cor: 'Branco', combustivel: 'Flex' }
			],
			ultimoServico: '18/01/2024',
			proximaRevisao: '18/04/2024',
			totalGasto: 2100,
			servicos: 7,
			status: 'ativo',
			observacoes: 'Sempre traz indicações',
			historico: [
				{ id: 12, data: '18/01/2024', veiculo: 'Hyundai HB20 2020', placa: 'MNO-2468', servicos: ['Alinhamento', 'Balanceamento'], valor: 250, status: 'concluido' },
				{ id: 13, data: '10/12/2023', veiculo: 'Nissan March 2017', placa: 'PQR-1357', servicos: ['Troca de óleo', 'Filtros'], valor: 220, status: 'concluido' },
				{ id: 14, data: '25/10/2023', veiculo: 'Hyundai HB20 2020', placa: 'MNO-2468', servicos: ['Revisão geral'], valor: 400, status: 'concluido' }
			]
		}
	];

	return (
		<>
			<ol className="breadcrumb float-xl-end">
				<li className="breadcrumb-item"><Link href="/dashboard/v1">Home</Link></li>
				<li className="breadcrumb-item active">Clientes</li>
			</ol>
			<h1 className="page-header">Gestão de Clientes <small>controle completo da carteira</small></h1>
			
			<div className="d-flex justify-content-between align-items-center mb-4">
				<div className="d-flex gap-2">
					<ExportButtons 
						data={clientes} 
						filename="clientes"
					/>
				</div>
				<button 
					type="button" 
					className="btn btn-primary"
					onClick={() => setShowModal(true)}
				>
					<i className="fa fa-plus me-2"></i>
					Novo Cliente
				</button>
			</div>
			
			<ClienteStats clientes={clientes} />
			
			<ClienteTable 
				clientes={clientes}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				filterStatus={filterStatus}
				setFilterStatus={setFilterStatus}
				onDelete={handleDeleteCliente}
			/>

			<ClienteAnalytics clientes={clientes} />
			
			{showModal && (
				<ClienteEditModal 
					isOpen={showModal}
					cliente={null}
					onSave={handleSaveNovoCliente}
					onClose={() => setShowModal(false)}
				/>
			)}
		</>
	);
}