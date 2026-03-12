# TODO - Corrigir TipoServico para obter oficinaId do backend

## Objetivo
O backend deve obter o ID da oficina automaticamente a partir do token JWT (como está implementado para Cliente), e o frontend deve deixar de usar o localStorage.

## Passos

- [x] 1. Editar tipo-servico.module.ts - Adicionar AuthMiddleware
- [x] 2. Editar tipo-servico.controller.ts - Adicionar @userLogado() e usar user.oficinaId
- [x] 3. Editar List.ts - Adicionar oficinaId aos ListParams
- [x] 4. Editar tipo-servico.prisma.ts - Modificar findAll, findAtivos e search para aceitar oficinaId
- [x] 5. Editar TipoServicoContext.tsx - Remover localStorage e officeId manual
- [x] 6. Verificar endpoint search - Adicionar @userLogado()

