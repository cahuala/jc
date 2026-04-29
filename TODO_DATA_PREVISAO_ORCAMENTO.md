# TODO: Implement dataPrevisao Calculation from Mão de Obra (Orcamento → OS)

## Status: 🚀 IN PROGRESS

### 📋 Implementation Steps (4/4 remaining)

- [ ] **1. Frontend OrcamentoModal.tsx** - Add dataPrevisao field + auto-calculation
- [ ] **2. Backend orcamento.controller.ts** - Enhance /gerar-os endpoint  
- [ ] **3. Backend orcamento.service.ts** - Calculate total tempoEstimado → dataPrevisao
- [ ] **4. Test full flow + UI updates**

### Expected Result:
```
Orcamento (3 serviços: 30+60+45min) 
↓ salvar/gerar-os 
OrdemServico.dataPrevisao = Hoje + 2h15min + 2d buffer
```

### Test Commands:
```bash
# Backend restart
cd siv-platform/apps/backend && npm run start:dev

# Frontend dev
cd siv-platform/apps/frontend && npm run dev
```

