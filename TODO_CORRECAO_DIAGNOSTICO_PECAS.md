# TODO - Correção DiagnosticoPecasForm

## Problemas Identificados:
1. Tipo `Produto` não definido/importado no componente
2. Type casting problem com `PecaNecessariaFormData`
3. Componente não está integrado no DiagnosticoModal
4. Interfaces redundantes (PecaSelecionada e PecaNecessaria)

## Plano de Correção:

### 1. Corrigir DiagnosticoPecasForm.tsx
- [x] Importar `ProdutoTable` de `@fixmotor/core`
- [x] Importar `PecaNecessariaFormData` de `@fixmotor/core`
- [x] Remover interfaces redundantes
- [x] Corrigir o type casting

### 2. Integrar no DiagnosticoModal.tsx
- [x] Importar DiagnosticoPecasForm
- [x] Adicionar estado para peças (já existe no DiagnosticoFormData)
- [x] Adicionar nova aba "Peças" no modal
- [x] Renderizar o componente na aba

## Arquivos a editar:
- siv-platform/apps/frontend/src/components/servicos/DiagnosticoPecasForm.tsx
- siv-platform/apps/frontend/src/components/servicos/DiagnosticoModal.tsx

## Status: ✅ CONCLUÍDO
A aba "Peças" foi adicionada ao DiagnosticoModal e o componente DiagnosticoPecasForm está sendo renderizado corretamente.

