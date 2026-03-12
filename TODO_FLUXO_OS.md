# Fluxo de Ordens de Serviço - Implementação

## ✅ Concluído

### 1. Context e Hook
- [x] `OrdemServicoContext.tsx` - Criado com estado e operações CRUD
- [x] `useOrdemServico.ts` - Hook wrapper para usar o context

### 2. Providers
- [x] Adicionado `OrdemServicoProvider` ao `layout.tsx` (corrigido: {children} dentro do provider)

### 3. Página de Ordens de Serviço
- [x] Criado `siv-platform/apps/frontend/src/app/servicos/ordens/page.tsx`

### 4. Integração com Aprovações
- [x] Página de aprovações agora cria OS automaticamente quando cliente aprova
- [x] Corrigido mapeamento de peças (removido campo precoTotal que não existe no schema)

## 📋 Fluxo Completo

```
1. RECEPCIONISTA → /servicos/recepcao
   - Regista cliente + veículo + sintomas
   - Cria diagnóstico com status "AGUARDANDO"

2. RESPONSÁVEL → /servicos/atribuicao
   - Atribui um ou mais mecânicos ao diagnóstico
   - Status muda para "EM_ANALISE"

3. MECÂNICO → /servicos/diagnosticos-mecanicos
   - Identifica problemas
   - Adiciona peças necessárias
   - Finaliza diagnóstico → Status "ANALISE_CONCLUIDA"

4. CLIENTE/GESTOR → /servicos/aprovacoes
   - Vê orçamento (problemas + peças + serviços)
   - Aprova → Cria OS automaticamente + muda status para "EM_ANDAMENTO"
   - Rejeita → Retorna para "AGUARDANDO"

5. OFICINA → /servicos/ordens
   - Lista todas as Ordens de Serviço
   - Pode editar, imprimir, finalizar, excluir
   - Imprimir OS para colar no carro
```

## 📁 Ficheiros Principais

- `siv-platform/apps/frontend/src/contexts/OrdemServicoContext.tsx`
- `siv-platform/apps/frontend/src/hooks/useOrdemServico.ts`
- `siv-platform/apps/frontend/src/app/servicos/ordens/page.tsx`
- `siv-platform/apps/frontend/src/app/servicos/aprovacoes/page.tsx`
- `siv-platform/apps/frontend/src/app/layout.tsx`

## 🔄 Correções Feitas

1. **layout.tsx** - O `{children}` estava fora do `OrdemServicoProvider`, causando erro "useOrdemServicoContext must be used within OrdemServicoProvider". Corrigido colocando o children dentro do provider.

## 🔄 Próximos Passos (se necessário)

1. Testar o fluxo completo
2. Adicionar funcionalidade de imprimir OS (já existe componente)
3. Adicionar notificação ao cliente quando OS for criada
4. Melhorar o cálculo de valores na criação da OS

