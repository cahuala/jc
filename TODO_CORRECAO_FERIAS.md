# Plano de Correção - FeriasTable

## ✅ Tarefas Concluídas

- [x] 1. Criar FeriasContext.tsx com estado e ações CRUD
- [x] 2. Corrigir FeriasTable.tsx (erro de sintaxe + import do context)
- [x] 3. Atualizar page.tsx para usar useFerias hook
- [x] 4. Adicionar FeriasProvider ao layout.tsx global
- [x] 5. Atualizar useFerias.ts para wrapper do context (padrão Cargo)

## 📁 Ficheiros Modificados/Criados

- CRIADO: siv-platform/apps/frontend/src/contexts/FeriasContext.tsx
- EDITADO: siv-platform/apps/frontend/src/components/funcionarios/FeriasTable.tsx
- EDITADO: siv-platform/apps/frontend/src/app/funcionarios/ferias/page.tsx
- EDITADO: siv-platform/apps/frontend/src/hooks/useFerias.ts
- EDITADO: siv-platform/apps/frontend/src/app/layout.tsx

## Padrão Implementado

- FeriasContext: Tem a lógica real (igual CargoContext)
- useFerias: É um wrapper que chama useFeriasContext (igual useCargo)
- FeriasProvider: Adicionado ao layout global

## Notas

- FeriasModal.tsx mantém interface local (funciona como standalone)
- Interfaces do core (Ferias) não são usadas diretamente no frontend (diferentes tipos)
- O Context fornece FeriasDisplay para display no frontend
