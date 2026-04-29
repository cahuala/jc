# Integração de Impressão de Faturas - Frontend

## Como Aceder aos Diferentes Tipos de Faturas

Agora a tabela de faturas suporta todos os 5 tipos de faturas com um sistema integrado de impressão:

### 📋 Tipos Disponíveis

1. **Rascunho** - Versão preliminar da fatura
2. **Angolana** - Formato oficial Angolano com validação NIF
3. **Recibo** - Comprovante de recebimento
4. **Nota Fiscal** - Documento fiscal formal
5. **Guia de Remessa** - Para envio de mercadorias

### 🖥️ Interface no FaturaTable

Na **lista de faturas**, você verá:

```tsx
┌─────────────────────────────────────────────┐
│ Todos | [Tipo de Fatura ▼] | Buscar...     │
│ ────────────────────────────────────────────│
│       ┌─────────────────────┐              │
│       │ - Rascunho          │              │
│       │ - Angolana          │              │
│       │ - Recibo            │              │
│       │ - Nota Fiscal       │              │
│       │ - Guia de Remessa   │              │
│       └─────────────────────┘              │
└─────────────────────────────────────────────┘
```

### 🖨️ Como Imprimir

1. **Selecione o tipo de fatura** no dropdown do header
2. **Clique no botão de impressão** (ícone 🖨️) na linha da fatura
3. O PDF será **gerado automaticamente** e baixado

### 💾 Arquivos Modificados

#### Frontend (`/apps/frontend/src/`)

**`lib/api.ts`**
- Adicionado tipo `TipoFatura` com os 5 valores
- Atualizada função `generateFaturaPdf(id, tipo)` para aceitar parâmetro de tipo
- URL agora inclui `?tipo=${tipo}`

**`components/financeiro/FaturaTable.tsx`**
- Expandido dropdown de templates para incluir todos os 5 tipos
- Novo handler `handlePrint(fatura, tipo)` que:
  - Chama a API com o tipo selecionado
  - Baixa o PDF automaticamente
  - Mostra mensagens de sucesso/erro
- Estados atualizados:
  - `printTemplate: TipoFatura` (antes era apenas 'rascunho' | 'angolana')
  - `isPrinting: boolean` para controlar estado do botão durante geração

#### Backend (`/apps/backend/src/factura/`)

**`factura-pdf.service.ts`**
- `TipoFatura enum` com 5 valores
- Método `generatePdf(faturaId, userOficinaId?, tipoFatura)` agora roteia para geradores específicos
- 4 novos geradores HTML com layout padronizado

**`factura.controller.ts`**
- Endpoint `GET /factura/:id/pdf?tipo={tipo}` com validação de tipo
- Erro automático se tipo inválido

### 🔄 Fluxo de Requisição

```
Frontend (FaturaTable)
    ↓
Seleciona tipo + clica imprimir
    ↓
handlePrint() → generateFaturaPdf(id, tipo)
    ↓
GET /api/factura/{id}/pdf?tipo=recibo
    ↓
Backend: factura.controller.getPdf()
    ↓
Roteia → factura-pdf.service.generatePdf(id, tipo)
    ↓
Switch case → generateReciboHtml() | generateNotaFiscalHtml() etc
    ↓
Puppeteer renderiza HTML → PDF
    ↓
Retorna Blob
    ↓
Frontend: Download automático
```

### ✅ Exemplos de Uso

#### No Componente (TypeScript)

```typescript
// Imprimir fatura como Recibo
await handlePrint(fatura, 'recibo');

// Imprimir como Nota Fiscal
await handlePrint(fatura, 'nota_fiscal');

// Usar tipo selecionado no dropdown
await handlePrint(fatura, printTemplate); // printTemplate = 'angolana'
```

#### HTTP Request

```bash
# Obter PDF como Rascunho
GET /api/factura/123/pdf?tipo=rascunho

# Obter PDF como Recibo
GET /api/factura/123/pdf?tipo=recibo

# Obter PDF como Guia de Remessa
GET /api/factura/123/pdf?tipo=guia_remessa
```

### 🎨 Características da Implementação

- ✅ **Seleção dinâmica** de tipo no dropdown
- ✅ **Download automático** do PDF com nome apropriado
- ✅ **Feedback visual** durante geração (botão com spinner)
- ✅ **Tratamento de erros** com notificações
- ✅ **Backward compatible** (tipo padrão = rascunho)
- ✅ **Validação** de tipo no backend

### 🚀 Próximos Passos

1. Testar geração de PDF para cada tipo
2. Validar layouts em impressoras reais
3. Adicionar pré-visualização antes de imprimir
4. Implementar histórico de impressões

### 📝 Notas

- Os PDFs são gerados **server-side** com Puppeteer
- Layout está **padronizado** para todos os tipos
- Suporta **impressão direta** do navegador
- Os dados da fatura são **mapeados dinamicamente** para cada template
