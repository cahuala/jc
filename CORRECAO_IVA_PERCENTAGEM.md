# Correção: IVA Salvo como Percentagem

## Problema
O sistema estava salvando o IVA como **valor absoluto** (ex: 1500 Kz), mas deveria estar salvando como **percentagem** (ex: 15%).

## Solução Implementada

### 1. Frontend (FaturaModal.tsx)
**Mudança**: No `handleSubmit()`, adiciona a propriedade `taxaIVA` com o valor 15 antes de salvar:

```typescript
const faturaComIVAPercentagem = {
  ...formData,
  itens: formData.itens.map((item) => ({
    ...item,
    taxaIVA: 15, // IVA 15% em Angola
  })),
};

onSave(faturaComIVAPercentagem);
```

### 2. Tipo TypeScript (types.ts)
**Mudança**: Adicionada propriedade `taxaIVA` ao `ItemFatura`:

```typescript
export interface ItemFatura {
  tipo: 'SERVICO' | 'PRODUTO';
  descricao: string;
  quantidade: number;
  precoUnitario: number;
  iva: number;
  taxaIVA?: number; // Percentagem de IVA (ex: 15 para 15%)
  subtotal: number;
  produtoId?: string | null;
}
```

## Como Funciona

### Antes (Errado)
```
Usuário cria fatura
  ↓
Item: Preço 1000 Kz
  ↓
Frontend calcula: iva = 1000 * 0.15 = 150 (valor absoluto)
  ↓
Salva: { iva: 150 }
  ↓
Backend espera: taxaIVA: 15 (percentagem)
  ↓
❌ Mismatch
```

### Depois (Correto)
```
Usuário cria fatura
  ↓
Item: Preço 1000 Kz
  ↓
Frontend calcula: iva = 1000 * 0.15 = 150 (para exibição)
  ↓
Antes de salvar, transforma para percentagem
  ↓
Salva: { taxaIVA: 15 }
  ↓
Backend processa com normalizeIVA()
  ↓
✅ Correto
```

## Backend (factura-pdf.service.ts)

O backend já estava preparado para isso com a função `normalizeIVA()`:

```typescript
private normalizeIVA(iva: any): number {
  const n = Number(iva || 0);

  // já é percentagem (ex: 14)
  if (n > 0 && n <= 100) return n;

  // se vier como decimal (0.14)
  if (n > 0 && n < 1) return n * 100;

  // se vier como valor monetário (ex: 1000)
  // NÃO dá para converter corretamente sem base
  return 0;
}
```

E usa assim no PDF:
```typescript
taxaIVA: this.normalizeIVA(item.iva), // Agora será 15
```

## Frontend Continua Exibindo Corretamente

O `item.iva` no frontend continua sendo usado para:
- ✅ Exibição de valores monetários (Kz 150)
- ✅ Cálculos locais de subtotal

O novo `item.taxaIVA` é usado para:
- ✅ Envio para backend (percentagem)
- ✅ Armazenamento em base de dados

## Resultado

Agora ao salvar uma fatura:
1. ✅ Frontend calcula IVA corretamente (15% de subtotal)
2. ✅ Exibe valor monetário na UI (ex: Kz 150)
3. ✅ Envia percentagem para backend (15)
4. ✅ Backend recebe e processa corretamente
5. ✅ PDF gerado com layout correto

