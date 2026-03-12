# TODO - Correção Diagnóstico: Sintomas e Problemas

## Problema
A função `toDiagnosticoTable` no backend não está retornando os sintomas e problemas do diagnóstico.

## Solução

### Arquivo: siv-platform/apps/backend/src/diagnostico/diagnostico.prisma.ts

1. **Adicionar include no findAll** - Buscar sintomas e problemas junto com os diagnósticos
2. **Atualizar função toDiagnosticoTable** - Mapear sintomas e problemas retornados pelo Prisma

### Passos:
- [x] Identificar o problema
- [x] Implementar correção no backend
- [ ] Testar a correção

## Alterações Realizadas

### 1. Função toDiagnosticoTable
Adicionado mapeamento de:
- `sintomas`: Array de { id, descricao, diagnosticoId, createdAt }
- `problemas`: Array de { id, sistema, descricao, severidade, diagnosticoId, createdAt }
- `cliente`: Nome do cliente para display

### 2. Método findAll
Adicionado include para:
- `problemas: { where: { deletedAt: null } }`
- `sintomas: { where: { deletedAt: null } }`

