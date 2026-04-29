# Sistema de Múltiplos Tipos de Faturas ✅

## Implementação Completa

O serviço `FacturaPdfService` agora suporta **5 tipos de faturas diferentes** em Angola:

### Tipos de Faturas Suportados

| Tipo | Enum | Descrição |
|------|------|-----------|
| **Rascunho** | `rascunho` | Fatura preliminar/não oficial (padrão) |
| **Angolana** | `angolana` | Fatura oficial angolana completa |
| **Recibo** | `recibo` | Recibo de pagamento simples |
| **Nota Fiscal** | `notaFiscal` | Nota fiscal de serviços |
| **Guia de Remessa** | `guiaRemessa` | Guia de remessa de bens |

## Como Usar

### Frontend - Chamadas HTTP

```typescript
// Fatura Rascunho (padrão)
fetch('/api/factura/{id}/pdf')

// Fatura Angolana
fetch('/api/factura/{id}/pdf?tipo=angolana')

// Recibo
fetch('/api/factura/{id}/pdf?tipo=recibo')

// Nota Fiscal
fetch('/api/factura/{id}/pdf?tipo=notaFiscal')

// Guia de Remessa
fetch('/api/factura/{id}/pdf?tipo=guiaRemessa')
```

### Backend - Uso do Serviço

```typescript
// Injetar o serviço
constructor(private pdfService: FacturaPdfService) {}

// Gerar PDF com tipo
const pdfBuffer = await this.pdfService.generatePdf(
  faturaId,
  userOficinaId,
  TipoFatura.ANGOLANA  // ou qualquer outro tipo
);
```

### Tipos Disponíveis

```typescript
import { TipoFatura } from './factura-pdf.service';

enum TipoFatura {
  RASCUNHO = 'rascunho',
  ANGOLANA = 'angolana',
  RECIBO = 'recibo',
  NOTA_FISCAL = 'notaFiscal',
  GUIA_REMESSA = 'guiaRemessa',
}
```

## Características Cada Tipo

### 1️⃣ Rascunho (rascunho)
- Fatura preliminar
- Inclui: Regime de IVA, dados bancários, sumário completo
- Marca d'água "ANGOLANA"
- Para uso interno

### 2️⃣ Factura Angolana (angolana)
- Fatura oficial
- Conformidade regulatória completa
- Assinatura de emissor
- Para clientes finais

### 3️⃣ Recibo (recibo)
- Recibo de pagamento
- Campos de assinatura (cliente + oficina)
- Valor por extenso
- Para arquivamento

### 4️⃣ Nota Fiscal (notaFiscal)
- Nota de serviços realizados
- Sem IVA explícito (estrutura simplificada)
- Ideal para serviços

### 5️⃣ Guia de Remessa (guiaRemessa)
- Guia de entrega de bens
- 3 assinadores (remetente, transportador, destinatário)
- Campo de observações
- Para logística

## Arquivos Modificados

### Backend
- ✅ `siv-platform/apps/backend/src/factura/factura-pdf.service.ts`
  - Enum `TipoFatura`
  - Parâmetro `tipoFatura` em `generatePdf()`
  - 4 novos métodos HTML (Recibo, Nota Fiscal, Guia Remessa)
  
- ✅ `siv-platform/apps/backend/src/factura/factura.controller.ts`
  - Query parameter `?tipo=` no endpoint GET `:id/pdf`
  - Validação de tipo
  - Tratamento de erros

## Exemplo de Request

```bash
# Obter Factura Angolana
curl -X GET "http://localhost:3000/api/factura/123/pdf?tipo=angolana" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  --output factura.pdf

# Obter Recibo
curl -X GET "http://localhost:3000/api/factura/123/pdf?tipo=recibo" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  --output recibo.pdf

# Obter Nota Fiscal
curl -X GET "http://localhost:3000/api/factura/123/pdf?tipo=notaFiscal" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  --output notafiscal.pdf
```

## Frontend Integration

```typescript
// Hook para gerar PDF
const generatePdf = async (faturaId: string, tipo: TipoFatura = 'rascunho') => {
  try {
    const response = await fetch(`/api/factura/${faturaId}/pdf?tipo=${tipo}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fatura-${tipo}-${faturaId}.pdf`;
    a.click();
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
  }
};

// Uso
generatePdf('fatura-id', 'angolana');
generatePdf('fatura-id', 'recibo');
```

## Validação e Tratamento de Erros

```typescript
// Controller valida:
if (!Object.values(TipoFatura).includes(tipoFatura)) {
  throw new BadRequestException(
    `Tipo de fatura inválido. Tipos suportados: ${Object.values(TipoFatura).join(', ')}`
  );
}

// Serviço valida:
if (!Object.values(TipoFatura).includes(tipoFatura)) {
  throw new Error(`Tipo de fatura inválido: ${tipoFatura}`);
}
```

## Próximos Passos (Opcional)

- [ ] Adicionar opção de impressão térmica para recibos
- [ ] Suporte para código QR em faturas
- [ ] Template customizável por oficina
- [ ] Histórico de PDFs gerados
- [ ] Assinatura digital de faturas

---

**Status**: ✅ Implementação Completa
**Data**: 29 de março de 2026
**Tipos Suportados**: 5 (Rascunho, Angolana, Recibo, Nota Fiscal, Guia Remessa)
