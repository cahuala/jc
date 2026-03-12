# Plano: Remover envio manual do oficinaId do Frontend

## Problema
O backend já extrai `oficinaId` do JWT via decorador `userLogado()`, mas o frontend ainda envia manualmente em alguns lugares.

## Arquivos para modificar

### 1. ClienteModal.tsx
- Remover extração do `oficinaId` do localStorage
- Remover envio do `oficinaId` nos dados do cliente
- O backend já extrai do JWT

### 2. DiagnosticoModal.tsx
- Remover envio do `oficinaId` quando cria TipoServico novo

### 3. Verificar outros componentes se necessário

## Padrão a seguir
O backend usa o decorador `@userLogado()` que extrai o `oficinaId` do token JWT automaticamente. O frontend deve apenas enviar o token no header Authorization e o backend faz o resto.

## Como funciona atualmente
- Frontend: `Authorization: Bearer ${token}` + envia `oficinaId` manualmente
- Backend: Extrai `oficinaId` do `req.user` via `userLogado()`

## Mudança necessária
- Frontend: `Authorization: Bearer ${token}` apenas
- Backend: Continua extraindo `oficinaId` do JWT (já funciona)

## Status
- [x] ClienteModal.tsx - Remover oficinaId manual
- [x] DiagnosticoModal.tsx - Remover oficinaId manual
- [x] Produto - Implementar filtro por oficinaId via JWT

