# Debug: Recepção Não Cadastra Sintomas/Serviço

## 1. Verificar Ambiente
```bash
# Frontend
cd siv-platform/apps/frontend
yarn install
yarn dev

# Backend  
cd siv-platform/apps/backend
yarn install
yarn prisma generate
yarn prisma db push  # ou yarn prisma migrate deploy
yarn start:dev
```

## 2. Teste Manual Completo
1. Crie cliente em /clientes
2. Crie viatura para cliente  
3. Vá /servicos/recepcao
4. Complete 4 passos com sintomas
5. Verifique /servicos/diagnosticos

## 3. Verificar Dados
```
- Tem clientes cadastrados?
- Tem viaturas associadas? 
- Token auth válido?
```

## 4. Debug Console (F12)
```
- Erros network /diagnostico POST?
- Response da API?
- Console.log no handleSubmit?
```

## Status: [ ] Em progresso
