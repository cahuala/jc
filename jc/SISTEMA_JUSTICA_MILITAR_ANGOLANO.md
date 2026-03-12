# Plano: Sistema de Justiça Militar Angolano (SJMA)

## 📋 Estrutura dos Tribunais Militares de Angola

### Tribunais

1. **Tribunal Militar Supremo** - Última instância
2. **Tribunais Militares Regionais** - 1ª e 2ª Regiões
3. **Tribunais Militares de Guarnição** - Primeira instância

### Hierarquia Militar Angolana (FAS - Forças Armadas Angolanas)

**Oficiais Generais:**

- Marechal (5 estrelas)
- General de Army (4 estrelas)
- Tenente General (3 estrelas)
- Major General (2 estrelas)

**Oficiais Superiores:**

- Coronel
- Tenente Coronel
- Major

**Oficiais:**

- Capitão
- Tenente
- Subtenente

**Praças:**

- Sargento Chefe
- Sargento Adjunto
- Primeiro Sargento
- Segundo Sargento
- Cabo
- Soldado

---

## 📁 Estrutura de Pastas Proposta

```
jc/apps/frontend/src/app/
├── dashboard/
│   └── v1/page.tsx ✅ Feito
├── unidades-militares/
│   ├── lista/page.tsx
│   ├── detalhe/[id]/page.tsx
│   └── novo/page.tsx
├── pessoal/
│   ├── oficiais/
│   │   ├── lista/page.tsx
│   │   └── detalhe/[id]/page.tsx
│   ├── pracas/
│   │   ├── lista/page.tsx
│   │   └── detalhe/[id]/page.tsx
│   ├── magistrados/
│   │   ├── lista/page.tsx
│   │   └── detalhe/[id]/page.tsx
│   └── postos-graduacoes/page.tsx
├── processos/
│   ├── lista/page.tsx
│   ├── auto-prisao/
│   │   ├── lista/page.tsx
│   │   └── novo/page.tsx
│   ├── inqueritos/
│   │   ├── lista/page.tsx
│   │   └── novo/page.tsx
│   ├── processos-crimes/
│   │   ├── lista/page.tsx
│   │   └── detalhe/[id]/page.tsx
│   └── conselho-disciplina/
│       ├── lista/page.tsx
│       └── novo/page.tsx
├── audiencias/
│   ├── agenda/page.tsx
│   ├── pauta/page.tsx
│   └── atas/page.tsx
├── documentos/
│   ├── decisoes/page.tsx
│   ├── sentencas/page.tsx
│   ├── despachos/page.tsx
│   └── portarias/page.tsx
└── configuracoes/
    └── sistema/page.tsx
```

---

## 🔧 Campos Específicos Angolanos

### Militar

- NIP (Número de Identificação do Pessoal)
- BI/CC (Bilhete de Identidade)
- Unidade atual
- Posto/Graduação
- Situação (Serviço, Reserva, Reforma)

### Processo

- Número do processo (formato: ANO/NÚMERO/TM)
- Tipo (APF, IPM, CD, PC)
- Fase (Instrução, Julgamento, Recurso)
- Resultado (Absolvição, Condenação, Arquivamento)

---

## 📊 Métricas do Dashboard

- Processos em tramitação
- Audiências marcadas
- Sentenças proferidas
- Prisões preventivas
- Conselhos de disciplina
- Tempo médio de tramitação

---

## ✅ Tarefas a Executar

- [ ] Atualizar menu com termos angolanos
- [ ] Criar página de Unidades Militares
- [ ] Criar páginas de Pessoal (Oficiais, Praças, Magistrados)
- [ ] Criar páginas de Processos
- [ ] Criar página de Audiências
- [ ] Criar páginas de Documentos
- [ ] Atualizar backend com modelos angolanos
