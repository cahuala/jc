# Plano de Correção - Detalhes do Veículo

## Problema

O detalhe do veículo no módulo cliente/veículo não está a mostrar:

1. Informações do cliente corretamente (clienteNome)
2. Todos os dados do veículo (numeroMotor, numeroChassis, observacao)

## Causa Raiz

- O `VeiculoDetailsModal` espera `clienteId` como `number` e `clienteNome` como string separada
- A API retorna `clienteId` como `string` (UUID) e `cliente` como objeto `{ id: string, nome: string }`
- Faltam campos: numeroMotor, numeroChassis, observacao

## Etapas de Correção

### 1. Atualizar interface Veiculo no VeiculoDetailsModal.tsx

- [x] Corrigir tipos: clienteId de number para string
- [x] Adicionar campo cliente como objeto com id e nome
- [x] Adicionar campos faltantes: numeroMotor, numeroChassis, observacao

### 2. Atualizar componente de exibição no VeiculoDetailsModal.tsx

- [x] Extrair clienteNome do objeto cliente
- [x] Exibir numeroMotor, numeroChassis, observacao

### 3. Atualizar VeiculosTable.tsx

- [x] Corrigir tipos para consistente com API

### 4. Atualizar VeiculoEditModal.tsx

- [x] Adicionar campos numeroMotor, numeroChassis, observacao

### 5. Atualizar NovoServicoModal.tsx

- [x] Corrigir interface e exibição de cliente

### 6. Atualizar VeiculoHistoryModal.tsx

- [x] Corrigir interface e exibição de cliente

## Arquivos Editados

- `siv-platform/apps/frontend/src/components/veiculos/VeiculoDetailsModal.tsx`
- `siv-platform/apps/frontend/src/components/veiculos/VeiculosTable.tsx`
- `siv-platform/apps/frontend/src/components/veiculos/VeiculoEditModal.tsx`
- `siv-platform/apps/frontend/src/components/veiculos/NovoServicoModal.tsx`
- `siv-platform/apps/frontend/src/components/veiculos/VeiculoHistoryModal.tsx`

## Status: ✅ CONCLUÍDO
