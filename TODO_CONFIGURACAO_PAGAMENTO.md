# TODO - Sistema de Configuração de Regras de Pagamento (RH Angola)

## Objetivo

Permitir que o utilizador defina as regras de pagamento (IRS, Segurança Social, Subsídios, Descontos) através de UI.

## Tarefas

### 1. Modelo de Dados (Prisma)

- [x] 1.1 Adicionar modelo `ConfiguracaoPagamento` ao schema.prisma
- [x] 1.2 Definir campos: oficinaId, escaloesIRS (JSON), taxaSegurancaSocial, valorSubsidioAlimentacao, valorSubsidioTransporte, tipoDescontoFalta, valorDescontoFalta

### 2. Core Package - Interface e Tipos

- [x] 2.1 Criar diretório `configuracao-pagamento/`
- [x] 2.2 Criar modelo `ConfiguracaoPagamento.ts` com interfaces
- [x] 2.3 Criar provider RepositoryConfiguracaoPagamento.ts
- [x] 2.4 Criar serviços (Save, List, FindById)
- [x] 2.5 Exportar no index.ts principal
- [x] 2.6 Adicionar campos de desconto por falta (tipoDescontoFalta, valorDescontoFalta)

### 3. Backend - API

- [x] 3.1 Criar módulo configuracao-pagamento/
- [x] 3.2 Criar controller com CRUD
- [x] 3.3 Criar prisma service
- [x] 3.4 Registrar no app.module.ts

### 4. Frontend - UI de Configuração

- [x] 4.1 Criar página `/funcionarios/configuracao-pagamento/page.tsx`
- [x] 4.2 Criar componente de edição de escalões IRS (tabela dinâmica)
- [x] 4.3 Criar componente de configuração de valores
- [x] 4.4 Adicionar ao menu lateral

### 5. Integração com Cálculo

- [x] 5.1 Atualizar serviço de cálculo para buscar configuração
- [x] 5.2 Se não existir config, usar valores padrão
- [x] 5.3 Passar configuração para função calcularFolha
- [x] 5.4 Adicionar cálculo de desconto por falta

### 6. Página de Folha de Pagamento

- [x] 6.1 Atualizar para buscar configuração ao carregar
- [x] 6.2 Usar valores da configuração nos cálculos
- [x] 6.3 Permitir inserir número de faltas por funcionário

## Status: CONCLUÍDO ✅

O sistema de RH angolano agora permite:

- Configurar regras de pagamento (IRS, Segurança Social, Subsídios, Descontos por falta)
- Editar escalões de IRS de forma dinâmica
- Integração automática com a folha de pagamento
- Campo para inserir quantidade de faltas por funcionário
