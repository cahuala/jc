"use client"

import { useState, useEffect } from 'react';

export interface OficinaData {
  nomeEmpresa: string;
  nif: string;
  endereco: string;
  bairro: string;
  cidade: string;
  provincia: string;
  telefone: string;
  email: string;
  website?: string;
  horarioFuncionamento?: string;
  diasFuncionamento?: string;
  regimeIVA?: string;
  numeroAlvara?: string;
  dataConstituicao?: string;
}

const defaultOficina: OficinaData = {
  nomeEmpresa: 'FLXMOTOR - OFICINA MECÂNICA',
  nif: '5417123456',
  endereco: 'Rua da Independência, 123',
  bairro: 'Ingombota',
  cidade: 'Luanda',
  provincia: 'Luanda',
  telefone: '+244 923 456 789',
  email: 'geral@flxmotor.ao',
  website: 'www.flxmotor.ao',
  horarioFuncionamento: '08:00 - 17:00',
  diasFuncionamento: 'Segunda a Sexta',
  regimeIVA: 'Regime Geral',
  numeroAlvara: 'ALV-2023/001',
  dataConstituicao: '2020-01-15',
};

export const useOficina = () => {
  const [oficina, setOficina] = useState(defaultOficina);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('oficinaData');
      if (saved) {
        setOficina(JSON.parse(saved));
      }
    } catch {
      // fallback default
    } finally {
      setLoading(false);
    }
  }, []);

  const saveOficina = (data: OficinaData) => {
    localStorage.setItem('oficinaData', JSON.stringify(data));
    setOficina(data);
  };

  return { oficina, loading, saveOficina };
};

