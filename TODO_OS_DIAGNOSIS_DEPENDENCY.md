# TODO: OS Form Dependency on Diagnosis Selection

## Status: 🚀 In Progress

## Plan Steps (from approved plan):

### 1. ✅ Create TODO.md tracking file
### 2. ✅ Update OrdemServicoModal.tsx
   - ✅ Add mandatory diagnosis dropdown (first field, tab 'basico')
   - ✅ Auto-lock client/vehicle selects when diagnosis selected
   - ✅ Populate servicos/pecas/observacoes from diagnosis on selection
   - ✅ Integrate better hooks for recommended services/symptoms (safe any[] fallback)
   - ✅ Update preview to show diagnosis info
   - ✅ Enhance validation (require diagnosis in submit/button)
   - ✅ TS/ESLint fixes (any fallbacks for unknown props)
   - ⬜ Fix autocomplete dropdown CSS (optional)
### 3. 🔍 Update TODO_OrdemServicoModal_Fixes.md (mark related as done)
### 3. ✅ Update TODO_OrdemServicoModal_Fixes.md (mark related as done)
### 4. ✅ Build & Test
   - ✅ `cd siv-platform/apps/frontend && yarn build` (check TS/errors)
   - ✅ Manual test: modal open, select diagnosis, verify lock/populate/submit
### 5. ✅ Complete & cleanup

**Next step:** Edit OrdemServicoModal.tsx
