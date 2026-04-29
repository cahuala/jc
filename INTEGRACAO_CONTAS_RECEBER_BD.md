# Integração de Contas a Receber com BD

## Resumo
As **Contas a Receber** agora estão conectadas à base de dados através do endpoint do backend em `/conta-receber`.

## Arquivos Criados/Modificados

### 1. Hook useContasReceber (NOVO)
**Arquivo:** `/apps/frontend/src/hooks/useContasReceber.ts`

Fornece todas as operações CRUD para contas a receber:

```typescript
export function useContasReceber() {
  const [contas, setContas] = useState<ContaReceber[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Métodos disponíveis:
  // - fetchContas(params?) - Buscar com filtros
  // - fetchContasVencidas() - Contas vencidas
  // - fetchContasPorVencer(dias) - Próximas a vencer
  // - salvarConta(conta) - Criar nova
  // - atualizarConta(id, conta) - Atualizar
  // - deletarConta(id) - Deletar
}
```

### 2. Página Contas a Receber (ATUALIZADA)
**Arquivo:** `/apps/frontend/src/app/financeiro/receber/page.tsx`

Mudanças:
- ✅ Importa e usa o hook `useContasReceber`
- ✅ Sincroniza dados com a API
- ✅ Método `handleSave()` agora atualiza via API
- ✅ Método `handleReceber()` marca como paga na BD
- ✅ Novo método `handleDelete()` para deletar da BD
- ✅ Adiciona indicador de carregamento

### 3. Componente ContasReceberTable (ATUALIZADO)
**Arquivo:** `/apps/frontend/src/components/financeiro/ContasReceberTable.tsx`

- ✅ Usa o tipo `ContaReceber` do hook em vez de interface local
- ✅ IDs agora são strings (consistente com BD)

## Endpoints Utilizados

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/conta-receber/list` | Listar com filtros |
| GET | `/conta-receber/vencidas` | Contas vencidas |
| GET | `/conta-receber/vencimento-proximo?dias=7` | Por vencer em N dias |
| GET | `/conta-receber/:id` | Buscar por ID |
| POST | `/conta-receber` | Criar nova |
| PUT | `/conta-receber/:id` | Atualizar |
| DELETE | `/conta-receber/:id` | Deletar |

## Fluxo de Dados

```
1. Página carrega
    ↓
2. useContasReceber() inicializa
    ↓
3. useEffect dispara fetchContas()
    ↓
4. API é chamada: POST /conta-receber/list
    ↓
5. Dados retornam e são sincronizados
    ↓
6. ContasReceberTable exibe dados
    ↓
7. Usuário interage (editar, receber, deletar)
    ↓
8. Ação é enviada para API via hooks
    ↓
9. Estado local é atualizado
    ↓
10. UI re-renderiza com dados novos
```

## Fallback para Dados de Exemplo

Se a API retornar vazia ou erro, a página exibe dados de exemplo para não ficar em branco:

```typescript
if (contasAPI && contasAPI.length > 0) {
  setContas(contasAPI);
} else {
  setContas(contasExemplo); // Fallback
}
```

## Tratamento de Erros

Todos os métodos possuem try-catch:
- ✅ Erros da API mostram toast com mensagem
- ✅ Loading states controlados
- ✅ Validação de autenticação (Bearer token)

## Próximos Passos

1. Testar integração completa com base de dados real
2. Verificar paginação (se necessário)
3. Adicionar busca/filtros avançados
4. Implementar export para Excel/PDF
5. Dashboard com métricas (dias em atraso, etc)

## Exemplo de Uso

```typescript
// No componente, usar o hook:
const { 
  contas, 
  loading, 
  fetchContas,
  atualizarConta,
  deletarConta 
} = useContasReceber();

// Ao salvar:
await atualizarConta(conta.id, { status: 'paga' });

// Ao deletar:
await deletarConta(conta.id);

// Refrescar dados:
await fetchContas({ status: 'vencida' });
```

