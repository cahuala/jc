# Implementação do Fluxo: Diagnóstico → Orçamento → OS → Fatura

## Objetivo
Implementar o fluxo completo de serviços da oficina mecânica:
- Diagnóstico → Orçamento → Cliente Aprova → Ordem de Serviço → Fatura

## Tarefas

### 1. ✅ Modelo Diagnóstico (COMPLETO - Já existia)
- [x] Interface ServicoRecomendado no modelo Diagnostico (core)
- [x] Campo servicosRecomendados no Diagnostico (core)
- [x] Modelo ServicoRecomendado no schema.prisma

### 2. ✅ Entidade Orçamento no Prisma (COMPLETO)
- [x] Modelo Orcamento no schema.prisma
- [x] Modelo MaoDeObraOrcamento
- [x] Modelo PecaOrcamento
- [x] Modelo PecaClienteOrcamento
- [x] Enum StatusOrcamento
- [x] Campo orcamentoId na OrdemServico
- [x] Campo orcamentos na Oficina

### 3. ✅ Entidade Orçamento no Core (COMPLETO)
- [x] `orcamento/model/Orcamento.ts` - Tipos do Orçamento
- [x] `orcamento/provider/RepositoryOrcamento.ts` - Interface do repositório
- [x] `orcamento/service/Save.ts` - Criar/Atualizar orçamento
- [x] `orcamento/service/List.ts` - Listar orçamentos
- [x] `orcamento/service/FindById.ts` - Buscar orçamento
- [x] `orcamento/service/Delete.ts` - Excluir orçamento
- [x] `orcamento/service/Approve.ts` - Aprovar orçamento
- [x] `orcamento/service/GenerateOS.ts` - Gerar OS a partir do orçamento aprovado
- [x] `orcamento/index.ts` - Exports do módulo

### 4. ✅ Backend - Módulo Orçamento (COMPLETO)
- [x] Criar `orcamento/orcamento.module.ts`
- [x] Criar `orcamento/orcamento.controller.ts`
- [x] Criar `orcamento/orcamento.prisma.ts`
- [x] Registrar módulo no app.module.ts

### 5. ✅ Frontend - Componentes (COMPLETO)
- [x] Criar `OrcamentoTable.tsx`
- [x] Criar `OrcamentoModal.tsx`
- [x] Criar página de Orçamentos (`/servicos/orcamentos`)
- [x] Vincular Diagnóstico → Orçamento
- [x] Adicionar botão "Gerar Orçamento" no Diagnóstico
- [ ] Adicionar botão "Aprovar e Gerar OS" no Orçamento

## Modelo de Dados (Prisma)

### Orcamento
```
- id
- numero
- data
- dataValidade
- valorMaoDeObra
- valorPecas
- valorPecasCliente (não cobra)
- desconto
- valorTotal
- status (PENDENTE/APROVADO/REJEITADO/CANCELADO)
- diagnosticoId
- clienteId
- viaturaId
- oficinaId
```

### MaoDeObraOrcamento
```
- id
- servico
- preco
- tempoEstimado
- observacoes
- orcamentoId
```

### PecaOrcamento (Peças da Oficina)
```
- id
- produtoId
- nome
- quantidade
- precoUnitario
- precoTotal
- orcamentoId
```

### PecaClienteOrcamento (Peças do Cliente)
```
- id
- nome
- quantidade
- observacao
- orcamentoId
```

### ServicoRecomendado (no Diagnóstico)
```
- id
- servicoId
- nomeServico
- descricao
- precoEstimado
- tempoEstimado
- prioridade
- status (PENDENTE/APROVADO/REJEITADO)
- diagnosticoId
```

## Fluxo Implementado

```
┌─────────────┐     ┌─────────────┐     ┌──────────────────┐     ┌─────────────┐     ┌─────────┐
│ Diagnóstico │ ──► │  Orçamento  │ ──► │ Aprovação Cliente│ ──► │     OS      │ ──► │  Fatura │
└─────────────┘     └─────────────┘     └──────────────────┘     └─────────────┘     └─────────┘
      │                    │                                            │
      │                    │                                            │
 Servicos            Gera serviços                               Gera fatura
 Recomendados        do diagnóstico                              após conclusão
```

## Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/orcamento` | Listar todos os orçamentos |
| GET | `/orcamento/:id` | Buscar orçamento por ID |
| GET | `/orcamento/status/:status` | Listar por status |
| GET | `/orcamento/cliente/:clienteId` | Listar por cliente |
| GET | `/orcamento/viatura/:viaturaId` | Listar por viatura |
| GET | `/orcamento/diagnostico/:diagnosticoId` | Listar por diagnóstico |
| POST | `/orcamento` | Criar orçamento |
| PUT | `/orcamento/:id` | Atualizar orçamento |
| POST | `/orcamento/:id/aprovar` | Aprovar orçamento |
| POST | `/orcamento/:id/rejeitar` | Rejeitar orçamento |
| POST | `/orcamento/:id/cancelar` | Cancelar orçamento |
| DELETE | `/orcamento/:id` | Excluir orçamento |

