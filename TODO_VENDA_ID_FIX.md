# TODO - Correção Type Mismatch em Venda

## Objetivo
Corrigir o erro de tipos no venda.controller.ts onde os IDs são string (UUID) mas as interfaces esperam number.

## Tarefas
- [x] 1. Analisar os arquivos relevantes
- [ ] 2. Atualizar VendaTable.ts - Mudar id de number para string
- [ ] 3. Atualizar RepositoryVendaTable.ts - Mudar assinaturas dos métodos para usar string
- [ ] 4. Atualizar venda.prisma.ts - Consistência nos métodos
- [ ] 5. Atualizar venda.controller.ts - Remover conversão manual de UUID para número
- [ ] 6. Verificar build/testes

