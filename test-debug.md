# Debug - Clientes não aparecem

## Checklist de Verificação

### 1. Verificar se há clientes no banco
```sql
-- Execute no banco de dados
SELECT id, nome, oficinaId, deleted FROM Cliente WHERE deleted = false;
```

### 2. Verificar logs do backend
Ao fazer a requisição GET /cliente, você deve ver:
```
=== DEBUG Cliente List ===
User recebido: SIM
User completo: { id: "...", oficinaId: "...", ... }
User oficinaId: <uuid>
Buscando clientes para oficinaId: <uuid>
Resultado completo: { clientes: [...], total: X }
Total de clientes: X
Array de clientes: X
```

### 3. Verificar logs do frontend (Console do navegador)
```
Clientes recebidos: { clientes: [...], total: X }
```

### 4. Verificar token JWT
No console do navegador:
```javascript
const token = localStorage.getItem('flxmotor_token');
console.log('Token:', token);

// Decodificar token (copie e cole em jwt.io)
```

### 5. Verificar se middleware está ativo
No terminal do backend, deve aparecer logs quando fizer requisição.

## Possíveis Problemas

### Problema 1: User não está sendo injetado
**Sintoma:** Log mostra "User recebido: NÃO"
**Solução:** Middleware não está configurado
- Verificar se ClienteModule tem `implements NestModule`
- Verificar se `configure()` aplica AuthMiddleware

### Problema 2: User sem oficinaId
**Sintoma:** Log mostra "User oficinaId: null" ou "undefined"
**Solução:** Usuário no banco não tem oficinaId
```sql
-- Verificar usuário
SELECT id, nome, email, oficinaId FROM User WHERE email = 'seu@email.com';

-- Atualizar se necessário
UPDATE User SET oficinaId = '<uuid-da-oficina>' WHERE email = 'seu@email.com';
```

### Problema 3: Não há clientes no banco
**Sintoma:** Log mostra "Total de clientes: 0"
**Solução:** Criar clientes de teste
```sql
INSERT INTO Cliente (id, nome, email, telefone, nif, oficinaId, status, deleted)
VALUES (
  gen_random_uuid(),
  'Cliente Teste',
  'teste@email.com',
  '123456789',
  '123456789',
  '<uuid-da-oficina>',
  'ATIVO',
  false
);
```

### Problema 4: oficinaId não corresponde
**Sintoma:** Log mostra clientes mas frontend não recebe
**Solução:** Verificar se oficinaId do usuário = oficinaId dos clientes
```sql
SELECT 
  u.email as usuario,
  u.oficinaId as oficinaUsuario,
  c.nome as cliente,
  c.oficinaId as oficinaCliente
FROM User u
CROSS JOIN Cliente c
WHERE u.email = 'seu@email.com'
  AND c.deleted = false;
```

## Teste Manual

1. Abra o console do navegador (F12)
2. Execute:
```javascript
fetch('http://localhost:3001/cliente', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('flxmotor_token')}`
  }
})
.then(r => r.json())
.then(data => console.log('Resposta:', data))
.catch(err => console.error('Erro:', err));
```

3. Verifique a resposta
