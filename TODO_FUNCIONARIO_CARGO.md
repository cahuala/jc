# TODO - Adicionar cargoId ao retorno do funcionário

## Problema

O retorno do funcionário não tem o cargoId e assim não aparece os funcionários dos cargos no modal de cargo.

## Solução

### 1. Adicionar cargoId à interface FuncionarioTable

- Arquivo: `siv-platform/packages/core/src/funcionarios/model/Funcionario.ts`
- Adicionar `cargoId?: string` à interface `FuncionarioTable`

### 2. Adicionar cargoId à conversão no backend

- Arquivo: `siv-platform/apps/backend/src/funcionarios/funcionario.prisma.ts`
- Adicionar `cargoId: funcionario.cargoId ?? undefined` ao retorno do método `toFuncionarioTable`

## Progresso

- [x] Adicionar cargoId à interface FuncionarioTable
- [x] Adicionar cargoId à conversão no backend (já existia)
