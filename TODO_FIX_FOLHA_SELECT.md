# Fix: Payroll Employee Select Not Showing

## Plan Steps
- [x] 1. ✅ Debugging added to FolhaPagamentoModal.tsx (logs, error display, empty state, fallback fetch)
- [ ] 2. Test: User - open /funcionarios/folha-pagamento → New → check console F12 + select population
- [ ] 3. If /funcionarios-com-salario empty: Add fallback fetch from /funcionario endpoint
- [ ] 4. Add empty state UI: "Configure salaries in employee list" with link
- [ ] 5. Polish UI/UX, remove debug logs if not needed
- [ ] 6. Test full flow: create payroll sheet
- [ ] 7. Complete task

**Current step:** 2/7 - AWAITING USER TEST
Run: http://localhost:3000/funcionarios/folha-pagamento → Processar Folha → Check F12 console logs + if employees now show in select

