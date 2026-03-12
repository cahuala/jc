# TODO - Adicionar Imagens ao Diagnóstico

## Objetivo
Permitir que o usuário adicione múltiplas imagens durante o diagnóstico do veículo.

## Arquitetura

### 1. Schema do Prisma
- Criar modelo `ImagemDiagnostico` no schema.prisma
- Adicionar relação com `Diagnostico`

### 2. Backend (NestJS)
- Criar módulo `imagem-diagnostico`
- Criar controller, service, prisma service
- Endpoint para upload de imagens
- Endpoints CRUD para imagens

### 3. Core (@fixmotor/core)
- Adicionar tipo `ImagemDiagnostico`
- Adicionar campo `imagens` ao tipo `Diagnostico`

### 4. Frontend (Next.js)
- Componente de upload de imagens
- Galeria de imagens no DiagnosticoModal
- Exibir thumbnails na DiagnosticoTable

## Passos:
- [ ] 1. Criar modelo ImagemDiagnostico no Prisma
- [ ] 2. Criar estrutura de backend para imagens
- [ ] 3. Atualizar tipos no Core
- [ ] 4. Criar componente de upload no Frontend
- [ ] 5. Integrar no DiagnosticoModal

