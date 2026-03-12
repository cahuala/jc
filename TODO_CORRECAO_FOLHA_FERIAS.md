# Plano de Correção - Folha de Pagamento com Férias

## Tarefas Concluídas:

### Backend:

- [x] 1. Modificar `calculo-folha.service.ts` para verificar automaticamente as férias na tabela "Ferias"
- [x] 2. Adicionar lógica de suspensão de salário durante férias no cálculo
- [x] 3. Atualizar o serviço para retornar informações sobre férias quando aplicável

### Core (Cálculos Angola):

- [x] 4. Adicionar parâmetro `diasFerias` na interface ConfiguracaoCalculo
- [x] 5. Adicionar campo `descontoFerias` na interface CalculoFolhaResult
- [x] 6. Criar função `calcularDescontoFerias` para dedução proporcional
- [x] 7. Atualizar função `calcularFolha` para considerar dias de férias

### Frontend:

- [x] 8. Melhorar `FolhaPagamentoModal.tsx` com verificação de férias
- [x] 9. Adicionar verificação e exibição de informações de férias no modal
- [x] 10. Exibir alerta quando funcionário estiver de férias no período
- [x] 11. Adicionar coluna de férias na tabela de resultados

### Padrões Angolanos:

- [x] 12. Usar formatação de moeda Kz (Kwanza)
- [x] 13. Usar locale pt-AO para datas
- [x] 14. Melhorar UI com cores e estilos profissionais

## Resumo das Alterações:

1. **Backend - calculo-folha.service.ts**:
   - Adicionado método `verificarFeriasFuncionario` para buscar férias do funcionário no período
   - Adicionado método `calcularDiasFeriasNoPeriodo` para calcular dias de férias no mês
   - Integração automática com a tabela de férias

2. **Core - CalculosAngola.ts**:
   - Adicionado suporte a `diasFerias` na configuração
   - Nova função `calcularDescontoFerias` que calcula dedução proporcional
   - Cálculo de IRS e Segurança Social sobre salário ajustado após descontos

3. **Frontend - FolhaPagamentoModal.tsx**:
   - Busca automática de informações de férias via API
   - Alerta visual quando funcionário está de férias
   - Campo mostra dias de férias detectados automaticamente

4. **Frontend - FolhaPagamentoTable.tsx**:
   - Nova coluna "Férias" na tabela
   - Badge mostra status de férias (dias ou "Normal")

## Como Testar:

1. Criar registro de férias para um funcionário
2. Processar folha de pagamento para o período das férias
3. Verificar se:
   - O alerta de férias aparece no modal
   - O desconto de férias é calculado proporcionalmente
   - A coluna de férias na tabela mostra os dias
