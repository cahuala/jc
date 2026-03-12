# Plano de Implementação - Fornecedor Context e Integração

## Objetivo
Criar contexto e hook para fornecedores no frontend, conectar os componentes à API do backend.

## Etapas de Implementação

### 1. Criar FornecedorContext.tsx ✅
- [x] Criar arquivo `FornecedorContext.tsx` em `/contexts`
- [x] Implementar provider com estados: fornecedores, loading, error
- [x] Implementar funções: fetchFornecedores, createFornecedor, updateFornecedor, deleteFornecedor, toggleStatus
- [x] Exportar hook `useFornecedor`
- [x] Exportar hook `useFornecedorAtivos`

### 2. Atualizar FornecedorTable.tsx ✅
- [x] Importar e usar FornecedorContext
- [x] Corrigir tipos: id: string (UUID) em vez de number
- [x] Adicionar campos: email, endereco, pessoaContato, observacoes
- [x] Adicionar ordenação por coluna
- [x] Melhorar filtros de busca
- [x] Adicionar botão de atualizar lista

### 3. Atualizar FornecedorModal.tsx ✅
- [x] Usar tipos corretos do backend (FornecedorTable)
- [x] Adicionar campos: email, endereco, observacoes
- [x] Atualizar preview com novos campos
- [x] Usar toggle switch para status

### 4. Atualizar page.tsx de fornecedores ✅
- [x] Conectar ao FornecedorContext
- [x] Remover dados de exemplo hardcoded
- [x] Integrar com save e delete do Context

### 5. Adicionar FornecedorProvider ao app ✅
- [x] Adicionar FornecedorProvider no layout.tsx

### 6. Limpeza ✅
- [x] Remover useFornecedorAtivos duplicado do CompraContext

## Dependências
- Endpoint API: `/fornecedor` (GET, POST)
- Endpoint API: `/fornecedor/:id` (GET, PUT, DELETE)
- Endpoint API: `/fornecedor/list` (POST - paginação)

## Tipos (do backend)
```typescript
interface FornecedorTable {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  nif: string;
  pessoaContato: string;
  observacoes: string;
  ativo: boolean;
}
```

## Arquivos Criados/Modificados
- `siv-platform/apps/frontend/src/contexts/FornecedorContext.tsx` (criado)
- `siv-platform/apps/frontend/src/components/estoque/FornecedorTable.tsx` (modificado)
- `siv-platform/apps/frontend/src/components/estoque/FornecedorModal.tsx` (modificado)
- `siv-platform/apps/frontend/src/app/estoque/fornecedores/page.tsx` (modificado)
- `siv-platform/apps/frontend/src/app/layout.tsx` (modificado)
- `siv-platform/apps/frontend/src/contexts/CompraContext.tsx` (limpeza)

