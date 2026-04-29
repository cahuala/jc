# Correção Erro 429 Preflight - Status
## Passos do Plano

### 1. [x] Analisar código (concluído)
- Identificado: Rate limiter conta OPTIONS preflights
- Frontend: porta 5000 → Backend: 3001 ✅

### 2. [✅] Editar main.ts
- ✅ Adicionado `skip: (req) => req.method === 'OPTIONS'` no limiter geral

### 3. [ ] Testar Backend
```
cd siv-platform/apps/backend && yarn dev
```
Network tab: OPTIONS 200 ✅
```
cd siv-platform/apps/backend && yarn dev
```
- Browser Network: OPTIONS status 200 (não 429)
- Faturamento page sem perda conexão

### 4. [ ] Frontend .env.local
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 5. [ ] Backend .env
```
FRONTEND_URL=http://localhost:5000
```

**Após ✅: `attempt_completion`**
