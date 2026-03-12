'use client';

import { useState } from 'react';
import Link from 'next/link';
import VeiculosStats from '@/components/veiculos/VeiculosStats';
import VeiculosTable from '@/components/veiculos/VeiculosTable';
import VeiculoModal from '@/components/veiculos/VeiculoModal';
import VeiculoDetailsModal from '@/components/veiculos/VeiculoDetailsModal';
import VeiculoEditModal from '@/components/veiculos/VeiculoEditModal';
import VeiculoHistoryModal from '@/components/veiculos/VeiculoHistoryModal';
import NovoServicoModal from '@/components/veiculos/NovoServicoModal';
import Toast from '@/components/ui/Toast';

interface Veiculo {
	id: number;
	marca: string;
	modelo: string;
	ano: number;
	placa: string;
	cor: string;
	combustivel: string;
	clienteId: number;
	clienteNome: string;
}

export default function VeiculosPage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCliente, setSelectedCliente] = useState('');
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
	
	// Modal states
	const [showDetailsModal, setShowDetailsModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showHistoryModal, setShowHistoryModal] = useState(false);
	const [showServiceModal, setShowServiceModal] = useState(false);
	const [selectedVeiculo, setSelectedVeiculo] = useState<Veiculo | null>(null);

	const clientes = [
		{ id: 1, nome: 'João Silva' },
		{ id: 2, nome: 'Maria Santos' },
		{ id: 3, nome: 'Carlos Lima' },
		{ id: 4, nome: 'Ana Costa' },
		{ id: 5, nome: 'Pedro Oliveira' },
		{ id: 6, nome: 'Fernanda Rocha' }
	];

	const veiculos: Veiculo[] = [
		{ id: 1, marca: 'Honda', modelo: 'Civic', ano: 2020, placa: 'ABC-1234', cor: 'Branco', combustivel: 'Gasolina', clienteId: 1, clienteNome: 'João Silva' },
		{ id: 2, marca: 'Toyota', modelo: 'Corolla', ano: 2018, placa: 'DEF-5678', cor: 'Prata', combustivel: 'Flex', clienteId: 1, clienteNome: 'João Silva' },
		{ id: 3, marca: 'Toyota', modelo: 'Corolla', ano: 2019, placa: 'XYZ-5678', cor: 'Azul', combustivel: 'Flex', clienteId: 2, clienteNome: 'Maria Santos' },
		{ id: 4, marca: 'Ford', modelo: 'Focus', ano: 2018, placa: 'DEF-9012', cor: 'Preto', combustivel: 'Gasolina', clienteId: 3, clienteNome: 'Carlos Lima' },
		{ id: 5, marca: 'Hyundai', modelo: 'HB20', ano: 2021, placa: 'GHI-1234', cor: 'Vermelho', combustivel: 'Flex', clienteId: 3, clienteNome: 'Carlos Lima' },
		{ id: 6, marca: 'Volkswagen', modelo: 'Gol', ano: 2019, placa: 'JKL-5678', cor: 'Branco', combustivel: 'Flex', clienteId: 3, clienteNome: 'Carlos Lima' },
		{ id: 7, marca: 'Volkswagen', modelo: 'Golf', ano: 2021, placa: 'GHI-3456', cor: 'Cinza', combustivel: 'Gasolina', clienteId: 4, clienteNome: 'Ana Costa' },
		{ id: 8, marca: 'Chevrolet', modelo: 'Onix', ano: 2022, placa: 'JKL-7890', cor: 'Prata', combustivel: 'Flex', clienteId: 5, clienteNome: 'Pedro Oliveira' },
		{ id: 9, marca: 'Hyundai', modelo: 'HB20', ano: 2020, placa: 'MNO-2468', cor: 'Azul', combustivel: 'Flex', clienteId: 6, clienteNome: 'Fernanda Rocha' },
		{ id: 10, marca: 'Nissan', modelo: 'March', ano: 2017, placa: 'PQR-1357', cor: 'Branco', combustivel: 'Flex', clienteId: 6, clienteNome: 'Fernanda Rocha' }
	];

	const filteredVeiculos = veiculos.filter(veiculo => {
		const matchesSearch = veiculo.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 veiculo.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 `${veiculo.marca} ${veiculo.modelo}`.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesSearch;
	});

	const veiculosPorCliente = clientes.map(cliente => ({
		...cliente,
		veiculos: veiculos.filter(v => v.clienteId === cliente.id)
	}));

	const handleEditVeiculo = (veiculo: Veiculo) => {
		setSelectedVeiculo(veiculo);
		setShowEditModal(true);
	};

	const handleViewVeiculo = (veiculo: Veiculo) => {
		setSelectedVeiculo(veiculo);
		setShowDetailsModal(true);
	};

	const handleHistoryVeiculo = (veiculo: Veiculo) => {
		setSelectedVeiculo(veiculo);
		setShowHistoryModal(true);
	};

	const handleNewServiceVeiculo = (veiculo: Veiculo) => {
		setSelectedVeiculo(veiculo);
		setShowServiceModal(true);
	};

	const handleSaveVeiculo = (veiculoData: Partial<Veiculo>) => {
		setToastMessage('Veículo salvo com sucesso!');
		setToastType('success');
		setShowToast(true);
		setShowEditModal(false);
		setSelectedVeiculo(null);
	};

	const handleSaveServico = (servicoData: any) => {
		setToastMessage('Serviço agendado com sucesso!');
		setToastType('success');
		setShowToast(true);
		setShowServiceModal(false);
		setSelectedVeiculo(null);
	};

	return (
		<>
			<ol className="breadcrumb float-xl-end">
				<li className="breadcrumb-item"><Link href="/dashboard/v1">Home</Link></li>
				<li className="breadcrumb-item"><Link href="/clientes">Clientes</Link></li>
				<li className="breadcrumb-item active">Veículos</li>
			</ol>
			<h1 className="page-header">Veículos dos Clientes <small>gestão da frota</small></h1>
			
			<div className="d-flex justify-content-between align-items-center mb-3">
				<div></div>
				<button 
					type="button" 
					className="btn btn-success"
					data-bs-toggle="modal" 
					data-bs-target="#modalNovoVeiculo"
				>
					<i className="fa fa-car me-2"></i>
					Adicionar Veículo
				</button>
			</div>

			<VeiculosStats 
				totalVeiculos={veiculos.length}
				clientesComVeiculos={veiculosPorCliente.filter(c => c.veiculos.length > 0).length}
				clientesMultiplosVeiculos={veiculosPorCliente.filter(c => c.veiculos.length > 1).length}
				veiculosFlexGasolina={veiculos.filter(v => v.combustivel === 'Flex' || v.combustivel === 'Gasolina').length}
			/>

			<VeiculosTable 
				veiculos={filteredVeiculos}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				onEdit={handleEditVeiculo}
				onView={handleViewVeiculo}
				onHistory={handleHistoryVeiculo}
				onNewService={handleNewServiceVeiculo}
			/>

			<VeiculoModal 
				clientes={clientes}
				selectedCliente={selectedCliente}
				setSelectedCliente={setSelectedCliente}
			/>

			<VeiculoDetailsModal
				isOpen={showDetailsModal}
				veiculo={selectedVeiculo}
				onClose={() => {
					setShowDetailsModal(false);
					setSelectedVeiculo(null);
				}}
			/>

			<VeiculoEditModal
				isOpen={showEditModal}
				veiculo={selectedVeiculo}
				clientes={clientes}
				onSave={handleSaveVeiculo}
				onClose={() => {
					setShowEditModal(false);
					setSelectedVeiculo(null);
				}}
			/>

			<VeiculoHistoryModal
				isOpen={showHistoryModal}
				veiculo={selectedVeiculo}
				onClose={() => {
					setShowHistoryModal(false);
					setSelectedVeiculo(null);
				}}
			/>

			<NovoServicoModal
				isOpen={showServiceModal}
				veiculo={selectedVeiculo}
				onSave={handleSaveServico}
				onClose={() => {
					setShowServiceModal(false);
					setSelectedVeiculo(null);
				}}
			/>

			<Toast
				isOpen={showToast}
				message={toastMessage}
				type={toastType}
				onClose={() => setShowToast(false)}
			/>
		</>
	);
}