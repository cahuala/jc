# TODO - Histórico e Próxima Revisão do Cliente

## Status: ✅ Concluído

### Fase 1: Base de Dados (Prisma)

- [x] Adicionar campos `ultimoServico` e `proximaRevisao` ao modelo Cliente
- [x] Executar migração do Prisma (db push realizado com sucesso)

### Fase 2: Backend

- [x] Atualizar ClientePrisma para calcular ultimoServico e proximaRevisao
- [x] Formatar datas como strings no formato dd/mm/yyyy
- [x] Hook useHistoricoServico atualizado para usar endpoint correto (/ordem-servico/cliente/:clienteId)

### Fase 3: Frontend

- [x] ClienteTable.tsx exibe campos proximaRevisao com badges coloridos (verde/vermelho)
- [x] ClienteDetailsModal.tsx exibe proximaRevisao
- [x] ClienteAnalytics.tsx exibe clientes com revisões próximas
- [x] ClienteHistorico.tsx exibe histórico de serviços

---

## Implementação Confirmada pelo Usuário:

- Cálculo da próxima revisão: 3 meses após o último serviço
- Campos exibidos na tabela de clientes: ultimoServico e proximaRevisao
- Badges coloridos: verde (revisão em dia), vermelho (revisão atrasada)
