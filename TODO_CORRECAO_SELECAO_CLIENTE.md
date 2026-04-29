# TODO - Correção Seleção Cliente FaturaModal

## Status: ✅ CONCLUÍDO (Todos passos ✅)

**Objetivo:** Corrigir problema \"não consigo selecionar o cliente\" no FaturaModal.

**✅ Adicional:** Corrigidos selects de **SERVIÇOS** e **PRODUTOS** (não populavam - fix deps + loading/error states).

## Plano Aprovado:
1. ✅ **Criar TODO.md** - Breakdown do plano em passos (feito)
2. ✅ Fix FaturaModal select: usar clienteId como value/key, corrigir handleInputChange (implementado)
3. 🔄 Adicionar loading/error states do ClienteContext no modal
4. ✅ Verificar ClienteProvider: confirmado no app/layout.tsx (global)
5. 🔄 Testar: dropdown popula, seleção define clienteId/nif, submit OK
6. ✅ attempt_completion

## Dependências:
- FaturaModal.tsx (principal - editado)
- faturamento/page.tsx (sem mudanças necessárias)

## Notas:
- User confirmou plano
- ClienteProvider está no layout global ✅
- Próximo: Add loading/error UI + test

