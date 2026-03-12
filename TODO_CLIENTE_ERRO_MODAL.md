# TODO - Mostrar Erro no ClienteEditModal

## Problema

O componente ClienteEditModal não está a mostrar erros quando existem falhas na API ao salvar um cliente.

## Solução

1. Adicionar prop `error` ao ClienteEditModal
2. Exibir o erro no topo do formulário do modal
3. Atualizar ClientesPage para passar o erro para o modal

## Arquivos editados

- siv-platform/apps/frontend/src/components/clientes/ClienteEditModal.tsx
- siv-platform/apps/frontend/src/app/clientes/page.tsx
- siv-platform/apps/frontend/src/components/clientes/ClienteTable.tsx

## Passos

- [x] 1. Analisar o código existente
- [x] 2. Adicionar prop error ao ClienteEditModal
- [x] 3. Exibir erro no componente ClienteEditModal
- [x] 4. Atualizar ClientesPage para passar erro e limpar ao fechar
- [x] 5. Atualizar ClienteTable para passar erro e limpar ao fechar
