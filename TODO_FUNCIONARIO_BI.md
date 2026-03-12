# Plan: Adicionar campos BI e filiação ao formulário de funcionário

## Objetivo

Adicionar os campos `nomePai`, `nomeMae`, `bi`, `dataEmissaoBI` e `dataCaducacaoBI` ao formulário de funcionário no frontend, que já existem no backend (Prisma).

## Ficheiros editados

### 1. Core Types ✅

**Ficheiro:** `siv-platform/packages/core/src/funcionarios/model/Funcionario.ts`

- Adicionados campos à interface `FuncionarioTable`:
  - `bi?: string`
  - `dataEmissaoBI?: string`
  - `dataCaducacaoBI?: string`
  - `nomePai?: string`
  - `nomeMae?: string`

- Adicionados campos à interface `FuncionarioModalFormData`:
  - `bi?: string`
  - `dataEmissaoBI?: string`
  - `dataCaducacaoBI?: string`
  - `nomePai?: string`
  - `nomeMae?: string`

- Adicionados campos ao tipo `CreateFuncionarioInput`:
  - `bi?: string`
  - `dataEmissaoBI?: string`
  - `dataCaducacaoBI?: string`
  - `nomePai?: string`
  - `nomeMae?: string`

### 2. FuncionarioModal.tsx ✅

**Ficheiro:** `siv-platform/apps/frontend/src/components/funcionarios/FuncionarioModal.tsx`

- Adicionados campos ao estado inicial `formData`
- Adicionados campos no formulário (tab "Dados Pessoais"):
  - Campo BI
  - Campo Data Emissão BI
  - Campo Data Caducação BI
  - Campo Nome do Pai
  - Campo Nome da Mãe

### 3. Backend Service ✅

**Ficheiro:** `siv-platform/apps/backend/src/funcionarios/funcionario.prisma.ts`

- Atualizada função `toFuncionarioTable` para mapear os novos campos com conversão de datas

### 4. lista/page.tsx ✅

**Ficheiro:** `siv-platform/apps/frontend/src/app/funcionarios/lista/page.tsx`

- Atualizado `handleSave` para incluir os novos campos no `apiData`

## Estado: CONCLUÍDO ✅
