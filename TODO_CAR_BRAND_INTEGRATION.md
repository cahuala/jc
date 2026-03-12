# TODO - Integração de Carros do Backend

## Tarefas:

- [x] 1. Corrigir erro de sintaxe "REPLACE" no VeiculoModal.tsx
- [x] 2. Melhorar useCarBrands para buscar anos e combustível por modelo
- [x] 3. Atualizar VeiculoModal para preencher ano e combustível automaticamente
- [x] 4. Adicionar veículos no formulário de registo de cliente
- [x] 5. Atualizar backend para criar veículos ao registar cliente
- [ ] 6. Testar a integração

## Endpoints do Backend:

- GET /car-brands - Todas as marcas
- GET /car-brands/models/:brand - Modelos com ano, trim e fuelTypes
- GET /car-brands/fuel-types - Tipos de combustível
- GET /car-brands/models/:brand/details - Detalhes do modelo (anos e combustível)

## Alterações Realizadas:

1. useCarBrands.ts - Adicionadas novas funções:
   - fetchYearsByModel - Buscar anos por modelo
   - fetchFuelTypesByBrand - Buscar tipos de combustível por marca
   - fetchModelDetails - Buscar detalhes do modelo (anos e combustível)

2. VeiculoModal.tsx:
   - Corrigido erro de sintaxe "REPLACE"
   - Adicionados estados availableYears e availableFuelTypes
   - Campo de ano agora usa select com anos do backend
   - Campo de combustível agora usa select com tipos do backend
   - Dados são carregados automaticamente ao selecionar a marca

3. RegisterContext.tsx:
   - Adicionados estados e funções para gerenciar veículos (veiculos, addVeiculo, removeVeiculo, updateVeiculo)
   - handleRegisterCliente agora envia os veículos junto com os dados do cliente

4. RegisterClienteForm.tsx:
   - Adicionado formulário para adicionar veículos durante o registo
   - Integração com API de marcas/modelos do backend
   - Seleção de marca carrega modelos e anos automaticamente
   - Suporte a múltiplos veículos por cliente

5. auth.controller.ts (Backend):
   - Endpoint register-cliente agora aceita array de veículos
   - Criação automática de viaturas associadas ao cliente criado
