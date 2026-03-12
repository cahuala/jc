# TODO - Correção Erro TS4053 AusenciaTableResponse

## Problema
TypeScript error TS4053 - Return type of public method from exported class has or is using name 'AusenciaTableResponse' from external module but cannot be named.

## Arquivos Afetados
- `siv-platform/packages/core/src/index.ts` - Faltando exportação explícita

## Solução
Adicionar exportação explícita de `AusenciaTableResponse` no arquivo `index.ts`

## Passos
- [x] 1. Analisar arquivos relevantes (ausencia.controller.ts, index.ts, ausencia/index.ts, TableList.ts)
- [ ] 2. Adicionar exportação explícita de AusenciaTableResponse no index.ts
- [ ] 3. Verificar se há outros tipos que precisam ser exportados

## Tipos a Exportar
- `AusenciaTableResponse` - Interface de resposta para tabela de ausências

