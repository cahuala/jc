"use client"

import { useState, useEffect } from 'react';

import type { OficinaData } from './useOficina';

export interface CurrentUser {
  nome: string;
  cargo?: string;
  oficina?: OficinaData;
}

const defaultUser: CurrentUser = {
  nome: 'Admin Sistema',
  cargo: 'Administrador',
};

export const useCurrentUser = () => {
  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('currentUser');
      const savedOficina = localStorage.getItem('currentUserOficina');
      
      const userData: CurrentUser = {
        nome: 'Admin Sistema',
        cargo: 'Administrador'
      };

      if (savedUser) {
        Object.assign(userData, JSON.parse(savedUser));
      }

      if (savedOficina) {
        userData.oficina = JSON.parse(savedOficina);
      }

      setUser(userData);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, loading };
};

