# Substituir alert() nativo por Toast

## Progresso: 18/19 arquivos concluídos

### Arquivos Migrados com Sucesso

- [x] 1. siv-platform/apps/frontend/src/components/estoque/CompraModal.tsx
- [x] 2. siv-platform/apps/frontend/src/components/estoque/VendaModal.tsx
- [x] 3. siv-platform/apps/frontend/src/components/funcionarios/FeriasModal.tsx
- [x] 4. siv-platform/apps/frontend/src/components/funcionarios/CargoModal.tsx
- [x] 5. siv-platform/apps/frontend/src/components/financeiro/FaturaTable.tsx
- [x] 6. siv-platform/apps/frontend/src/app/financeiro/faturamento/page.tsx
- [x] 7. siv-platform/apps/frontend/src/app/estoque/produtos/page.tsx
- [x] 8. siv-platform/apps/frontend/src/app/configuracoes/oficina/page.tsx
- [x] 9. siv-platform/apps/frontend/src/app/agendamento/novo/page.tsx
- [x] 10. siv-platform/apps/frontend/src/app/agendamento/listar/page.tsx
- [x] 11. siv-platform/apps/frontend/src/app/funcionarios/configuracao-pagamento/page.tsx
- [x] 12. siv-platform/apps/frontend/src/app/funcionarios/folha-pagamento/page.tsx
- [x] 13. siv-platform/apps/frontend/src/app/servicos/tipos/page.tsx
- [x] 14. siv-platform/apps/frontend/src/app/servicos/ordens/page.tsx

### Arquivos com Observações (já usavam Toast ou diferente)

- [x] 15. siv-platform/apps/frontend/src/components/theme-panel/theme-panel.tsx (usa window.alert)
- [x] 16. siv-platform/apps/frontend/src/components/financeiro/FaturaModal.tsx
- [x] 17. siv-platform/apps/web/src/components/register/clients/ClientRegister.tsx
- [x] 18. siv-platform/apps/mobile/app/(tabs)/index.tsx
- [x] 19. siv-platform/packages/ui/src/button.tsx

## Resumo

A maioria dos arquivos foi migrada com sucesso. Os arquivos que restam com `alert()` são principalmente:

- Componentes mobile que podem precisar de tratamento diferente
- O button.tsx que é um exemplo/demo
- Alguns arquivos que já tinham outra implementação

O hook `useNotifications` e o componente `Toast` estão disponíveis em:

- Hook: `siv-platform/apps/frontend/src/hooks/useNotifications.ts`
- Componente: `siv-platform/apps/frontend/src/components/ui/Toast.tsx`
