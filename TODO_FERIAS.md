# Plano de Implementação - Módulo de Férias

## 📋 Estado Atual

- Frontend com dados mock (precisa integração API)
- Backend com schema Prisma e controller básicos
- Componentes funcionais mas sem conexão com backend

## ✅ Tarefas Concluídas

### 1. Hook useFerias ✅

- [x] Criado hook para gerenciar estado e chamadas API
- [x] Implementado: fetchFerias, createFerias, updateFerias, approveFerias, rejectFerias, deleteFerias
- [x] Implementado helpers: calcularDias, isEmAndamento, hasSobreposicao

### 2. Página de Férias ✅

- [x] Substituir dados mock por chamadas API reais
- [x] Adicionar estados de loading
- [x] Adicionar toast notifications para operações

### 3. Componentes Atualizados ✅

- [x] FeriasTable: Tipos atualizados, suporte a loading, botão eliminar
- [x] FeriasModal: Tipos atualizados, validações, loading state

## 🔄 Tarefas em Andamento/Próximas

### 1. Backend - Melhorias no Schema e Controller

- [ ] Adicionar endpoint para buscar funcionários com dias disponíveis
- [ ] Adicionar endpoint para calcular dias de férias disponíveis por funcionário
- [ ] Implementar validações de negócio (dias disponíveis, sobreposição de períodos)

### 2. Frontend - Integração com API de Funcionários

- [ ] Buscar lista de funcionários da API real
- [ ] Exibir dados reais do funcionário nas férias

### 3. Funcionalidades Extras

- [ ] Implementar cálculo automático de dias disponíveis baseado em data de admissão
- [ ] Adicionar histórico de férias por funcionário
- [ ] Implementar relatório de férias por período

## 📁 Arquivos Modificados

### Frontend

- `siv-platform/apps/frontend/src/hooks/useFerias.ts` (NOVO)
- `siv-platform/apps/frontend/src/app/funcionarios/ferias/page.tsx` (ATUALIZADO)
- `siv-platform/apps/frontend/src/components/funcionarios/FeriasTable.tsx` (ATUALIZADO)
- `siv-platform/apps/frontend/src/components/funcionarios/FeriasModal.tsx` (ATUALIZADO)
