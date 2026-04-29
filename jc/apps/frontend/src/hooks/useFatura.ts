"use client"

import { useState, useEffect } from 'react';

export interface ItemFatura {
  id: string;
  descricao: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export interface FaturaData {
  id: string;
  numero: string;
  data: string;
  status: string;
  subtotal: number;
  totalIva: number;
  total: number;
  cliente: {
    nome: string;
    nif?: string;
    endereco?: string;
    telefone?: string;
  };
  itens: ItemFatura[];
}

export const useFatura = (faturaId: string | null) => {
  const [data, setData] = useState<FaturaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!faturaId) {
      setData(null);
      setLoading(false);
      return;
    }

    const fetchFatura = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/faturas/${faturaId}`);
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const result: FaturaData = await response.json();
        setData(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar fatura';
        setError(errorMessage);
        console.error('Erro useFatura:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFatura();
  }, [faturaId]);

  return { data, loading, error, refetch: () => faturaId && fetch(`/api/faturas/${faturaId}`).then(r => r.json()).then(setData) };
};

