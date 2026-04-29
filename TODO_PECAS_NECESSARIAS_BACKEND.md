# TODO: Implement Core & Backend - Peças Necessárias ✅ IN PROGRESS

## Approved Plan Steps (Turborepo: siv-platform)

### 1. Prisma Schema [✅ DONE]
- Add `PecaNecessaria` model + relations to `Diagnostico`/`Produto`
- Files: `siv-platform/apps/backend/prisma/schema.prisma`

### 2a. Core Repo Interface [✅ DONE]
- RepositoryPecaNecessaria.ts created

### 2. Core Repo & Services [✅ DONE]
- RepositoryPecaNecessaria interface + services + exports
- `siv-platform/packages/core/src/diagnostico/service/ListPecaNecessaria.ts`

### 3. Backend Prisma Service [✅ DONE]
- PecaNecessariaPrismaService created

- `PecaNecessariaPrismaService` impl
- File: `siv-platform/apps/backend/src/diagnostico/peca-necessaria.prisma.ts`

### 4. Update Diagnostico Service [PENDING]
- Nested save/update for `pecasNecessarias`
- File: `siv-platform/apps/backend/src/diagnostico/diagnostico.prisma.ts`

### 5. Controller Endpoints [✅ DONE]
- CRUD `/pecas-necessaria` (dedicated module mirroring diagnostico)

- File: `siv-platform/apps/backend/src/diagnostico/diagnostico.controller.ts`

### 6. Exports & Module [✅ DONE]
- Core index exports
- Backend module register

### 7. Database & Test [PENDING]
- `npx prisma db push`
- `yarn turbo build`
- Test CRUD via Postman/frontend

**Status**: Awaiting first implementation step.
**Test Command**: `cd siv-platform && yarn turbo dev`

