# TODO - Correção Campo Imagem Produto e Formatação de Valores

## Objetivo
Corrigir a inconsistência de nomenclatura do campo de imagem no frontend e adicionar a coluna `imagem` ao banco de dados. Implementar formatação de valores para o padrão angolano.

## Tarefas
- [x] 1. Analisar arquivos relevantes
- [x] 2. Verificar se a coluna existe no banco de dados
- [x] 3. Corrigir ProdutoModal.tsx - alterar `imagemUrl` para `imagem`
- [x] 4. Corrigir page.tsx (estoque/produtos) - alterar `imagemUrl` para `imagem`
- [x] 5. Sincronizar banco de dados com schema Prisma (`npx prisma db push`)
- [x] 6. Implementar formatação de valores para padrão angolano

## Arquivos Editados
1. `siv-platform/apps/frontend/src/components/estoque/ProdutoModal.tsx`
2. `siv-platform/apps/frontend/src/app/estoque/produtos/page.tsx`

## Alterações Realizadas
- Frontend: Uniformização naming `imagem` (em vez de `imagemUrl`)
- Banco: Coluna `imagem` adicionada à tabela `produtos`
- **NOVO**: Campos de preço agora aceitam formato angolano (ex: "64 647,69") e salvam como número (64647.69)

## Status: CONCLUÍDO ✅

