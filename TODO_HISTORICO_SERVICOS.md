# TODO: Implementar Histórico de Serviços do BD
Status: ✅ Em andamento

## Plano Aprovado (Resumo):
1. **Backend**: Criar módulo `historico-servico` com endpoint `/historico-servicos` (JOIN OrdemServico + related tables).
2. **Frontend**: Hook `useHistoricoServicos` + integrar na página de serviços.
3. **Fixes**: Real totals em cliente.prisma.ts; derivar tempo/lucro do DB.

## Passos Detalhados:

### 1. ✅ Backend - Criar estrutura módulo `historico-servico`
   - ✅ `historico-servico.module.ts`
   - ✅ `historico-servico.controller.ts` (GET /historico-servicos com filters)
   - ✅ `historico-servico.prisma.ts` (queries JOIN + aggregate totals)
   - ✅ `historico-servico.dto.ts` (filters: search, status, periodo, mecanico)

### 2. ✅ Atualizar app.module.ts (importar módulo)

### 3. ✅ Backend - Fix cliente.prisma.ts (calcular totalGasto/totalServicos reais)

### 4. ✅ Frontend - Criar useHistoricoServicos.ts hook

### 5. ✅ Frontend - Atualizar ServicoHistoricoTable.tsx (se necessário para real data)

**✅ Completo! Teste em /servicos/historico**

### 4. ✅ Frontend - Criar useHistoricoServicos.ts hook

### 5. ✅ Frontend - Atualizar ServicoHistoricoTable.tsx (se necessário para real data)

### 6. ✅ Integrar na página de serviços (procurar/criar servicos/page.tsx)

### 7. ✅ Testes:
   - [ ] Backend: Testar API `/historico-servicos`
   - [ ] Frontend: Tabela carrega dados reais
   - [ ] `prisma generate`

### 8. ✅ Finalizar & limpar mocks

**Próximo passo atual: 1 (Backend módulo)**

