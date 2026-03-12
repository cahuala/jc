# Plano de Atualização - Cliente Save

## Objetivo

Atualizar o formulário de cliente para suportar o formato correto de dados conforme especificado pelo utilizador.

## Campos do Formulário Atual

- nome (obrigatório)
- telefone (obrigatório) - formato +244 934 903 730
- email (obrigatório)
- nif (obrigatório) - padrão 007136459UE045
- bi (opcional) - novo campo adicionado
- provincia (opcional) - novo campo adicionado
- municipio (opcional) - novo campo adicionado
- endereco (obrigatório)
- status
- observacoes

## Alterações Implementadas

### 1. ClienteEditModal.tsx

- [x] Adicionar campos bi, provincia, municipio ao formulário
- [x] Atualizar validação de telefone para formato +244 934 903 730
- [x] Atualizar validação de NIF para padrão 007136459UE045 (9 dígitos + 3 letras)
- [x] Adicionar formatação automática do telefone com +244
- [x] Adicionar listas de províncias e municípios de Angola
- [x] Adicionar dropdowns para provincia e municipio

### 2. create-cliente.schema.ts

- [x] Atualizar validação de NIF para permitir o padrão alfanumérico
- [x] Atualizar validação de telefone

### 3. update-cliente.schema.ts

- [x] Atualizar validação de NIF para permitir o padrão alfanumérico
- [x] Atualizar validação de telefone

### 4. ClienteTable type (core)

- [x]确保所有字段正确导出

## Padrões de Validação

- **NIF**: 9 dígitos + 3 letras (ex: 007136459UE045) - Regex: `/^[0-9]{9}[A-Z]{3}$/`
- **Telefone**: +244 934 903 730 - Regex: `/^\+244\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}$/`

## Campos Obrigatórios

- nome
- email
- telefone
- nif
- endereco
