# Backend - Sistema de Justiça Militar Angolano

## 📁 Estrutura de Módulos Proposta

```
jc/apps/backend/src/
├── app.module.ts (atualizar)
├── militar/
│   ├── militar.module.ts
│   ├── militar.controller.ts
│   ├── militar.prisma.ts
│   └── militar.service.ts
├── processo/
│   ├── processo.module.ts
│   ├── processo.controller.ts
│   ├── processo.prisma.ts
│   └── processo.service.ts
├── audiencia/
│   ├── audiencia.module.ts
│   ├── audiencia.controller.ts
│   ├── audiencia.prisma.ts
│   └── audiencia.service.ts
├── documento/
│   ├── documento.module.ts
│   ├── documento.controller.ts
│   ├── documento.prisma.ts
│   └── documento.service.ts
└── unidade/
    ├── unidade.module.ts
    ├── unidade.controller.ts
    ├── unidade.prisma.ts
    └── unidade.service.ts
```

---

## 📊 Models do Prisma (jc/apps/backend/prisma/schema.prisma)

```prisma
// === ENUMS ===

enum PostoOficial {
  MARECHAL
  GENERAL_EXERCITO
  TENENTE_GENERAL
  MAJOR_GENERAL
  CORONEL
  TENENTE_CORONEL
  MAJOR
  CAPITAO
  TENENTE
  SUBTENENTE
}

enum GraduacaoPraca {
  SARGENTO_CHEFE
  SARGENTO_ADJUNTO
  PRIMEIRO_SARGENTO
  SEGUNDO_SARGENTO
  CABO
  SOLDADO
}

enum TipoProcesso {
  APF  // Auto de Prisão em Flagrante
  IPM  // Inquérito Policial Militar
  CD   // Conselho de Disciplina
  PC   // Processo Crime
}

enum FaseProcesso {
  AUTO_PRISAO
  INVESTIGACAO
  INSTRUCAO
  AUDIENCIA
  JULGAMENTO
  SENTENCA
  RECURSO
  CUMPRIMENTO_PENA
  ARQUIVADO
}

enum StatusAudiencia {
  AGENDADA
  CONFIRMADA
  EM_ANDAMENTO
  CONCLUIDA
  CANCELADA
  ADIADA
}

enum StatusAudiencia {
  AGENDADA
  CONFIRMADA
  EM_ANDAMENTO
  CONCLUIDA
  CANCELADA
  ADIADA
}

enum TipoAudiencia {
  INSTRUCAO
  DEPOIMENTO
  oitiva
  JULGAMENTO
  SENTENCA
}

// === MODELS ===

model Militar {
  id             String   @id @default(uuid())
  nip            String   @unique
  bi             String?  @unique
  nome           String
  nomePai        String?
  nomeMae        String?
  dataNascimento DateTime?
  naturalidade   String?
  genero         Genero?

  // Hierarquia
  tipoHierarquia String   // OFICIAL ou PRACA
  postoOficial   PostoOficial?
  graduacaoPraca GraduacaoPraca?

  // Profissional
  arma           String?  // Infantaria, Artilharia, etc.
  especialidade  String?
  unidadeId      String?
  situacao       String   @default("SERVICO") // SERVICO, RESERVA, REFORMA, etc.

  // Contato
  telefone       String?
  email          String?
  endereco      String?

  // Dados do processo (se envolver)
  processoId     String?

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@map("militares")
}

model UnidadeMilitar {
  id         String   @id @default(uuid())
  nome       String
  sigla      String   @unique
  tipo       String   // QUARTEL, BATALHAO, REGIAO, BASE, etc.
  regiao     String
  comandante String?
  telefone   String?
  email      String?
  endereco   String?
  estado     String   @default("ATIVO")

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("unidades_militares")
}

model Processo {
  id              String      @id @default(uuid())
  numero          String      @unique // 2024/0156
  tipo            TipoProcesso
  dataAbertura     DateTime    @default(now())
  crime           String
  descricao       String?
  fase            FaseProcesso @default(AUTO_PRISAO)
  status          String      @default("ATIVO")

  // Réu
  militarId       String?
  nomeReu         String
  posto           String
  unidade         String

  // Processo
  juiz            String?
  promotor        String?
  defensor        String?

  // Dados adicionais
  penaPedida      String?
  penaAplicada    String?
  dataSentenca    DateTime?

  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  @@map("processos")
}

model Audiencia {
  id            String         @id @default(uuid())
  data          DateTime
  hora          String
  tipo          TipoAudiencia
  status        StatusAudiencia @default(AGENDADA)

  // Relacionamento
  processoId    String
  sala          String?

  // Participantes
  juiz          String?
  promotor       String?
  defensor      String?
  reu           String?

  // Ata
  ata           String?
  ataHomologada Boolean        @default(false)

  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  @@map("audiencias")
}

model Documento {
  id          String   @id @default(uuid())
  tipo        String   // DECISAO, SENTENCA, DESPACHO, PORTARIA, OFICIO
  numero      String
  titulo      String?
  conteudo    String?

  // Relacionamento
  processoId  String?

  // Metadados
  data        DateTime @default(now())
  emissor     String?
  destinatario String?

  // Arquivo
  arquivoUrl  String?

  createdAt   DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("documentos")
}
```

---

## ✅ Tarefas do Backend

- [ ] Criar módulos: militar, processo, audiencia, documento, unidade
- [ ] Criar controllers com endpoints REST
- [ ] Criar prisma repositories
- [ ] Atualizar schema.prisma com novos models
- [ ] Configurar rotas no app.module.ts
- [ ] Testar endpoints

---

## 🔗 Endpoints REST Propostos

### Militar

- `GET /militar` - Lista paginada
- `GET /militar/:id` - Por ID
- `POST /militar` - Criar
- `PUT /militar/:id` - Atualizar
- `DELETE /militar/:id` - Excluir
- `GET /militar/busca?q=` - Busca

### Processo

- `GET /processo` - Lista paginada
- `GET /processo/:id` - Por ID
- `POST /processo` - Criar
- `PUT /processo/:id` - Atualizar
- `GET /processo/tipo/:tipo` - Por tipo (APF, IPM, CD, PC)
- `GET /processo/status/:status` - Por status

### Audiencia

- `GET /audiencia` - Lista
- `POST /audiencia` - Agendar
- `PUT /audiencia/:id/status` - Atualizar status
- `GET /audiencia/processo/:id` - Por processo

### Documento

- `GET /documento` - Lista
- `POST /documento` - Criar
- `GET /documento/processo/:id` - Por processo
- `GET /documento/tipo/:tipo` - Por tipo

### Unidade

- `GET /unidade` - Lista
- `POST /unidade` - Criar
- `GET /unidade/regiao/:regiao` - Por região
