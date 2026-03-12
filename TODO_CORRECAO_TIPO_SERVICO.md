# TODO - Correção TipoServico

## Objetivo
Corrigir os componentes de TipoServico para usar corretamente a interface do core, sem definições locais.

## Arquivos editados:
- [x] 1. Analisar arquivos existentes
- [x] 2. TipoServicoModal.tsx - Remover interface local e usar a do core
- [x] 3. TipoServicoTable.tsx - Corrigir campos (tempoEstimado -> duracao, remover materiais)
- [x] 4. page.tsx - Corrigir dados enviados (tempoEstimado -> duracao, status -> ativo)

## Problemas identificados e corrigidos:
1. ✅ TipoServicoModal.tsx - Removida interface local incompatível com o core
2. ✅ Campo `tempoEstimado` alterado para `duracao`
3. ✅ Campo `materiais` removido (não existe no core)
4. ✅ Campo `status` como string alterado para `ativo` como boolean
5. ✅ Tipos de id tratados para lidar com `string | undefined`

