# Correção: 'useContratoContext' unused declaration

## Status: ✅ COMPLETED

**Problema identificado:**
- Import `useContratoContext` em `contratos/page.tsx` não usado
- Erro: `useContrato()` incorreto (deve ser `useContratoContext()` conforme export do context)

**Correções aplicadas:**
1. Removido import não usado
2. Corrigido hook para `useContratoContext()`
3. Mantida toda lógica existente (table, modal, stats, CRUD)

**Verificação:**
- TS warning resolvido
- Funcionalidade restaurada (loading, error, fetchContratos, etc.)
- Compatível com ContratoContext.tsx existente

**Próximos passos:** Testar página após `yarn turbo dev`

