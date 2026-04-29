# Correção PDV - Provider Scope Fix

## Status: 🔄 Em Progresso

**Problema Identificado:** `usePDV must be used within PDVProvider`

**Passos:**
- [x] 1. Criar TODO.md
- [x] 2. Reorganizar providers em layout.tsx (mover PDVProvider para topo)
- [ ] 3. Testar /estoque/pdv (sem crash) - Execute `yarn turbo dev` e teste
- [ ] 4. Verificar dados produtos/clientes (fix hooks se vazio)
- [ ] 5. Implementar backend /venda POST
- [ ] 6. Seed dados teste
- [ ] 7. Teste fluxo completo venda
- [ ] 8. Finalizar

**Comandos pós-correção:**
```
yarn turbo dev
# Acessar http://localhost:3000/estoque/pdv
```

