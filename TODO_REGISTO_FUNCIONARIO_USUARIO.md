# TODO - Registrar Funcionário com Utilizador

## Task

No backend ao registar o funcionário, regista também o usuário e depois actualiza o funcionário com o id do utilizador.

## Steps

- [x] 1. Analyze codebase structure
- [x] 2. Modify `siv-platform/packages/core/src/funcionarios/model/Funcionario.ts` - Add user fields to CreateFuncionarioInput
- [x] 3. Modify `siv-platform/packages/core/src/funcionarios/service/Save.ts` - Add user fields to validation schema
- [x] 4. Modify `siv-platform/apps/backend/src/funcionarios/funcionario.controller.ts` - Handle user creation in save method
- [x] 5. Modify `siv-platform/apps/frontend/src/app/funcionarios/lista/page.tsx` - Pass user credentials to API
- [x] 6. Add `updateFuncionarioId` method to UserPrisma service
- [x] 7. Update RepositoryUser interface in core package
- [ ] 8. Test the implementation
