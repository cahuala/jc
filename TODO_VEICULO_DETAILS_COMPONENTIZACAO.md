# Plano de Componentização - VeiculoDetailsModal

## Informação Coletada

### Arquivo Original

- `siv-platform/apps/frontend/src/components/veiculos/VeiculoDetailsModal.tsx`
- Contém interfaces inline (Cliente, Veiculo, VeiculoStats)
- Contém funções helper inline
- UI toda em um único arquivo

### Tipos Disponíveis no Core

- `ViaturaTable` de `@fixmotor/core` (já usado em VeiculoEditModal)
- `ClienteTable` de `@fixmotor/core`

---

## Plano de Componentização

### 1. Extrair Tipos para Arquivo Próprio

**Arquivo:** `siv-platform/apps/frontend/src/components/veiculos/types.ts`

- Criar interface `VeiculoStats`
- Re-exportar tipos necessários de `@fixmotor/core`

### 2. Extrair Funções Helper

**Arquivo:** `siv-platform/apps/frontend/src/components/veiculos/veiculoUtils.ts`

- `getCombustivelBadgeClass(combustivel: string): string`
- `getStatusBadgeClass(status?: string): string`
- `formatarValor(valor: number): string`

### 3. Criar Sub-Componentes

**Arquivos a criar:**

| Componente             | Arquivo                    | Descrição                              |
| ---------------------- | -------------------------- | -------------------------------------- |
| `VeiculoHeader`        | `VeiculoDetailsHeader.tsx` | Header com ícone, marca/modelo, badges |
| `VeiculoInfoCard`      | `VeiculoInfoCard.tsx`      | Card com dados do veículo              |
| `VeiculoOwnerCard`     | `VeiculoOwnerCard.tsx`     | Card com informações do proprietário   |
| `VeiculoStatsCard`     | `VeiculoStatsCard.tsx`     | Card com estatísticas                  |
| `VeiculoDetailsFooter` | `VeiculoDetailsFooter.tsx` | Botões de ação do footer               |

### 4. Criar Hook Personalizado

**Arquivo:** `siv-platform/apps/frontend/src/hooks/useVeiculoDetails.ts`

- Estado e funções para o modal de detalhes
- Funções helper relacionadas

### 5. Criar Componente Principal

**Arquivo:** `VeiculoDetailsModal.tsx` (atualizar)

- Importar tipos, utils e sub-componentes
- Componente principal que compila os sub-componentes

---

## Arquivos a Editar/Criar

### Novos Arquivos:

1. `siv-platform/apps/frontend/src/components/veiculos/types.ts`
2. `siv-platform/apps/frontend/src/components/veiculos/veiculoUtils.ts`
3. `siv-platform/apps/frontend/src/components/veiculos/VeiculoDetailsHeader.tsx`
4. `siv-platform/apps/frontend/src/components/veiculos/VeiculoInfoCard.tsx`
5. `siv-platform/apps/frontend/src/components/veiculos/VeiculoOwnerCard.tsx`
6. `siv-platform/apps/frontend/src/components/veiculos/VeiculoStatsCard.tsx`
7. `siv-platform/apps/frontend/src/components/veiculos/VeiculoDetailsFooter.tsx`
8. `siv-platform/apps/frontend/src/hooks/useVeiculoDetails.ts`

### Arquivos a Editar:

1. `siv-platform/apps/frontend/src/components/veiculos/VeiculoDetailsModal.tsx`

---

## Passos para Implementação

1. ✅ Análise do código existente
2. ✅ Criar arquivo de tipos (`types.ts`)
3. ✅ Criar arquivo de utilitários (`veiculoUtils.ts`)
4. ✅ Criar sub-componentes (Header, InfoCard, OwnerCard, StatsCard, Footer)
5. ✅ Criar hook personalizado (`useVeiculoDetails.ts`)
6. ✅ Atualizar componente principal (`VeiculoDetailsModal.tsx`)
7. ✅ Testar se compila corretamente
