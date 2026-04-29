# TODO: Implementação Assinatura Digital - FlxMotor/SIV-Platform

## Status: ✅ Viável | ⏳ Planejado | 🔄 Em Desenvolvimento | ✅ Concluído

## Objetivo
Implementar assinatura digital em:
- [ ] Orçamentos (aprovação cliente)
- [ ] Faturas (antes envio)
- [ ] Ordens de Serviço (OS)

## Regulamentação
- ✅ Decreto Presidencial 208/20 (Angola)
- ✅ PAdES/PKCS#7 (PDF/A-3)
- ✅ SHA-256 + Timestamp

## Arquitetura Planejada

### Backend (NestJS)
```
siv-platform/apps/backend/src/signature/
├── signature.service.ts     (node-forge/pdf-lib)
├── signature.controller.ts  (POST /sign/:docId)
├── signature.prisma.ts      (hash, signature, cert_info)
└── signature.module.ts
```

### Frontend (NextJS)
```
siv-platform/apps/frontend/src/components/signature/
├── SignatureCanvas.tsx      (assinatura manual)
├── CertificateUpload.tsx    (certificado .p12)
└── SignatureModal.tsx       (preview + assinar)
```

## Dependências
```
yarn workspace backend add node-forge pdf-lib crypto-js
yarn workspace backend add -D @types/node-forge
```

## Passos de Implementação

### Fase 1: Backend (3 dias)
```
[ ] 1. Criar SignatureService + Prisma model
[ ] 2. Endpoint POST /orcamento/:id/assinar-pdf
[ ] 3. Integrar DocumentoPdfService
[ ] 4. Teste unitário assinatura/verificação
```

### Fase 2: Frontend (2 dias)
```
[ ] 1. SignatureCanvas component (react-signature-canvas)
[ ] 2. Modal em FaturaModal/orcamento
[ ] 3. Upload certificado + preview PDF
[ ] 4. Download PDF assinado
```

### Fase 3: Integração (2 dias)
```
[ ] OrcamentoController: + rota assinatura
[ ] Faturamento: + botão & workflow
[ ] Email: enviar PDF assinado
[ ] Dashboard: status assinatura
```

## Testes Obrigatórios
```
[ ] ✅ Verificar assinatura (openssl/Adobe Reader)
[ ] ✅ Timestamp válido
[ ] ✅ Mobile responsive (canvas touch)
[ ] ✅ Certificados Angola (.p12)
```

## MVP Deliverables
1. PDF orçamento assinado digitalmente
2. Frontend modal funcional
3. Backend API + verificação
4. Integração faturamento/orcamento

## Responsável: BLACKBOXAI
## Prazo Estimado: 7 dias úteis

---

**Próximo passo: Implementar protótipo?**

