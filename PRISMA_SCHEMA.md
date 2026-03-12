# 📦 Schema Prisma Completo - Sistema FixMotor

## Visão Geral

Schema completo do banco de dados PostgreSQL para o sistema de gestão de oficinas mecânicas FixMotor.

---

## 📊 Estrutura do Schema

### **Módulos Principais**

1. **🔐 Autenticação** - Usuários e autenticação
2. **👥 Clientes** - Gestão de clientes e viaturas
3. **📋 Ordens de Serviço** - Gestão de OS
4. **👷 Funcionários** - RH e folha de pagamento
5. **📦 Estoque** - Produtos e movimentações
6. **📅 Agendamentos** - Agenda de serviços
7. **💾 Backup** - Sistema de backup
8. **💰 Financeiro** - Faturas, contas e pagamentos
9. **📝 Auditoria** - Logs de auditoria

---

## 1. ⚙️ Enums Definidos

```prisma
// Roles de Usuário
enum UserRole {
  ADMIN
  GESTOR
  MECANICO
  RECECIONISTA
  CAIXA
}

// Status Gerais
enum StatusGeral {
  ATIVO
  INATIVO
  SUSPENSO
}

// Status Ordem de Serviço
enum StatusOrdemServico {
  AGUARDANDO
  EM_ANDAMENTO
  CONCLUIDA
  CANCELADA
}

// Status Pagamento
enum StatusPagamento {
  PENDENTE
  PAGO
  CANCELADO
}

// Status Funcionário
enum StatusFuncionario {
  ATIVO
  INATIVO
  FERIAS
  LICENCA
}

// Prioridade
enum Prioridade {
  BAIXA
  MEDIA
  ALTA
  URGENTE
}

// Status Serviço
enum StatusServico {
  PENDENTE
  EM_ANDAMENTO
  CONCLUIDO
  CANCELADO
}

// Status Produto
enum StatusProduto {
  ATIVO
  INATIVO
  DESCONTINUADO
  ESGOTADO
}

// Tipo Movimentação Estoque
enum TipoMovimentacao {
  ENTRADA
  SAIDA
  AJUSTE
  DEVOLUCAO
  TRANSFERENCIA
}

// Tipo Combustível
enum TipoCombustivel {
  GASOLINA
  DIESEL
  FLEX
  ELETRICO
  HIBRIDO
  GAS
}

// Gênero
enum Genero {
  MASCULINO
  FEMININO
  OUTRO
}

// Estado Civil
enum EstadoCivil {
  SOLTEIRO
  CASADO
  DIVORCIADO
  VIUVO
  UNIAO_ESTAVEL
}

// Status Agendamento
enum StatusAgendamento {
  PENDENTE
  CONFIRMADO
  EM_ANDAMENTO
  CONCLUIDO
  CANCELADO
  NAO_COMPARECEU
}

// Tipo Agendamento
enum TipoAgendamento {
  CONSULTA
  SERVICO
  REVISAO
  DIAGNOSTICO
  ORCAMENTO
}

// Tipo Backup
enum TipoBackup {
  AUTOMATICO
  MANUAL
}

// Status Backup
enum StatusBackup {
  CONCLUIDO
  FALHO
  EM_ANDAMENTO
  PENDENTE
}

// Status Fatura
enum StatusFatura {
  PENDENTE
  PAGA
  VENCIDA
  CANCELADA
}

// Status Conta
enum StatusConta {
  PENDENTE
  VENCIDA
  PAGA
  CANCELADA
}

// Forma Pagamento
enum FormaPagamento {
  DINHEIRO
  MULTICAIXA
  TRANSFERENCIA
  CHEQUE
  DEPOSITO
  CREDITO
  DEBITO
}

// Tipo Movimento Financeiro
enum TipoMovimentoFinanceiro {
  ENTRADA
  SAIDA
  TRANSFERENCIA
}
```

---

## 2. 🔐 Módulo de Autenticação

### Model: Usuario

```prisma
model Usuario {
  id           String   @id @default(uuid())
  nome         String
  email        String   @unique
  password     String
  role         UserRole @default(MECANICO)
  status       StatusGeral @default(ATIVO)
  deleted      Boolean  @default(false)
  deletedAt    DateTime?

  // Relacionamentos
  funcionario    Funcionario?
  refreshToken   String?
  lastLogin      DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("usuarios")
}
```

---

## 3. 👥 Módulo de Clientes

### Model: Cliente

```prisma
model Cliente {
  id              String    @id @default(uuid())
  nome            String
  email           String    @unique
  telefone        String
  nif             String?   @unique
  bi              String?   @unique
  dataEmissao     DateTime?
  nomePai         String?
  nomeMae         String?
  dataNascimento  DateTime?
  naturalidade    String?
  genero          Genero?
  estadoCivil     EstadoCivil?
  endereco        String?
  bairro          String?
  provincia       String?
  municipio       String?
  observacoes     String?
  status          StatusGeral @default(ATIVO)
  deleted         Boolean   @default(false)
  deletedAt       DateTime?

  // Campos calculados
  totalGasto      Decimal   @default(0)
  totalServicos   Int       @default(0)
  ultimoServico   DateTime?
  proximaRevisao  DateTime?

  // Relacionamentos
  viaturas        Viatura[]
  ordensServico   OrdemServico[]
  permissoes      PermissaoAcesso[]
  historicos      HistoricoServico[]
  faturas         Fatura[]
  contasReceber   ContaReceber[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@index([telefone])
  @@index([nif])
  @@map("clientes")
}
```

### Model: Viatura

```prisma
model Viatura {
  id            String         @id @default(uuid())
  placa         String         @unique
  marca         String
  modelo        String
  ano           Int
  cor           String
  combustivel   TipoCombustivel
  numeroMotor   String?
  numeroChassis String?
  observacoes   String?
  deleted       Boolean        @default(false)
  deletedAt     DateTime?

  // Campos calculados
  ultimaManutencao DateTime?
  proximaManutencao DateTime?
  valorTotalServicos Decimal @default(0)
  statusManutencao  String?

  // Relacionamentos
  cliente   Cliente   @relation(fields: [clienteId], references: [id])
  clienteId String

  ordensServico   OrdemServico[]
  permissoes      PermissaoAcesso[]
  manutencoes     Manutencao[]
  agendamentos     Agendamento[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([placa])
  @@index([clienteId])
  @@map("viaturas")
}
```

---

## 4. 📋 Módulo de Ordens de Serviço

### Model: OrdemServico

```prisma
model OrdemServico {
  id            String              @id @default(uuid())
  numero        String              @unique
  status        StatusOrdemServico  @default(AGUARDANDO)
  prioridade    Prioridade          @default(MEDIA)
  observacoes   String?
  deleted       Boolean             @default(false)
  deletedAt     DateTime?

  // Datas
  dataAbertura  DateTime            @default(now())
  dataPrevisao  DateTime?
  dataFecho     DateTime?

  // Valores
  valorTotal    Decimal            @default(0)
  valorServicos Decimal            @default(0)
  valorPecas    Decimal            @default(0)

  // Relacionamentos
  cliente   Cliente   @relation(fields: [clienteId], references: [id])
  clienteId String

  viatura   Viatura   @relation(fields: [viaturaId], references: [id])
  viaturaId String

  mecanico   Funcionario? @relation(fields: [mecanicoId], references: [id])
  mecanicoId String?

  servicos     Servico[]
  pecas        PecaOS[]
  manutencao   Manutencao?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([numero])
  @@index([clienteId])
  @@index([viaturaId])
  @@index([status])
  @@map("ordens_servico")
}
```

### Model: Servico

```prisma
model Servico {
  id             String          @id @default(uuid())
  nome           String
  preco          Decimal
  status         StatusServico   @default(PENDENTE)
  observacoes    String?
  deleted        Boolean         @default(false)
  deletedAt      DateTime?

  ordemServico   OrdemServico    @relation(fields: [ordemServicoId], references: [id], onDelete: Cascade)
  ordemServicoId String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("servicos")
}
```

### Model: PecaOS

```prisma
model PecaOS {
  id             String      @id @default(uuid())
  nome           String
  quantidade     Int
  precoUnitario  Decimal
  precoTotal     Decimal
  deleted        Boolean     @default(false)
  deletedAt      DateTime?

  ordemServico   OrdemServico @relation(fields: [ordemServicoId], references: [id], onDelete: Cascade)
  ordemServicoId String

  produto   Produto?  @relation(fields: [produtoId], references: [id])
  produtoId String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("pecas_os")
}
```

---

## 5. 👷 Módulo de Funcionários

### Model: Funcionario

```prisma
model Funcionario {
  id             String         @id @default(uuid())
  nome           String
  nif            String         @unique
  telefone       String
  email          String         @unique
  cargo          String
  departamento   String
  salario        Decimal
  dataAdmissao   DateTime
  status         StatusFuncionario @default(ATIVO)
  deleted        Boolean        @default(false)
  deletedAt      DateTime?

  // Dados pessoais
  bi             String?        @unique
  dataEmissaoBI  DateTime?
  nomePai        String?
  nomeMae        String?
  dataNascimento DateTime?
  naturalidade   String?
  genero         Genero?
  estadoCivil    EstadoCivil?
  endereco       String?
  bairro         String?
  provincia      String?
  municipio      String?
  foto           String?

  // Relacionamentos
  usuario        Usuario?
  ordensServico  OrdemServico[]
  salarios       PagamentoSalario[]
  faltas         Falta[]
  ferias         Ferias[]
  agendamentos   Agendamento[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@index([nif])
  @@index([cargo])
  @@map("funcionarios")
}
```

### Model: PagamentoSalario

```prisma
model PagamentoSalario {
  id             String        @id @default(uuid())
  mes            Int
  ano            Int
  salarioBase     Decimal
  descontos      Decimal       @default(0)
  bonus          Decimal       @default(0)
  salarioLiquido Decimal
  status         StatusPagamento @default(PENDENTE)
  observacao     String?
  deleted        Boolean       @default(false)
  deletedAt      DateTime?

  funcionario   Funcionario @relation(fields: [funcionarioId], references: [id])
  funcionarioId String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([funcionarioId, mes, ano])
  @@map("pagamentos_salario")
}
```

### Model: Falta

```prisma
model Falta {
  id            String      @id @default(uuid())
  data          DateTime
  tipo          String
  observacao    String?
  deleted       Boolean     @default(false)
  deletedAt     DateTime?

  funcionario   Funcionario @relation(fields: [funcionarioId], references: [id])
  funcionarioId String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("faltas")
}
```

### Model: Ferias

```prisma
model Ferias {
  id            String      @id @default(uuid())
  dataInicio    DateTime
  dataFim       DateTime
  dias          Int
  observacao    String?
  status        String
  deleted       Boolean     @default(false)
  deletedAt     DateTime?

  funcionario   Funcionario @relation(fields: [funcionarioId], references: [id])
  funcionarioId String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("ferias")
}
```

---

## 6. 📦 Módulo de Estoque

### Model: Categoria

```prisma
model Categoria {
  id          String    @id @default(uuid())
  nome        String
  descricao   String?
  ativa       Boolean   @default(true)
  deleted     Boolean   @default(false)
  deletedAt   DateTime?

  parentId    String?
  parent      Categoria?  @relation("CatPai", fields: [parentId], references: [id])
  filhos      Categoria[] @relation("CatPai")

  produtos    Produto[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("categorias")
}
```

### Model: Fornecedor

```prisma
model Fornecedor {
  id          String    @id @default(uuid())
  nome        String
  email       String?
  telefone    String?
  endereco    String?
  nif         String?
  pessoaContato String?
  observacoes String?
  ativo       Boolean   @default(true)
  deleted     Boolean   @default(false)
  deletedAt   DateTime?

  compras     Compra[]
  produtos    Produto[]
  contasPagar ContaPagar[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("fornecedores")
}
```

### Model: Produto

```prisma
model Produto {
  id              String        @id @default(uuid())
  codigo          String        @unique
  nome            String
  descricao       String?
  marca           String?
  modelo          String?
  precoCompra     Decimal
  precoVenda      Decimal
  estoque         Int           @default(0)
  estoqueMinimo   Int           @default(0)
  unidade         String        @default("UN")
  localizacao     String?
  status          StatusProduto @default(ATIVO)
  deleted         Boolean       @default(false)
  deletedAt       DateTime?

  dataUltimaCompra DateTime?
  dataUltimaVenda  DateTime?
  margemLucro     Decimal?

  categoria   Categoria?  @relation(fields: [categoriaId], references: [id])
  categoriaId String?

  fornecedor   Fornecedor? @relation(fields: [fornecedorId], references: [id])
  fornecedorId String?

  pecasOS      PecaOS[]
  movimentacoes MovimentacaoEstoque[]
  compras       CompraItem[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([codigo])
  @@index([categoriaId])
  @@map("produtos")
}
```

### Model: MovimentacaoEstoque

```prisma
model MovimentacaoEstoque {
  id            String           @id @default(uuid())
  tipo          TipoMovimentacao
  quantidade    Int
  observacao    String?
  data          DateTime         @default(now())
  deleted       Boolean          @default(false)
  deletedAt     DateTime?

  precoUnitario  Decimal?
  precoTotal     Decimal?

  produto   Produto @relation(fields: [produtoId], references: [id])
  produtoId String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([produtoId])
  @@index([data])
  @@map("movimentacoes_estoque")
}
```

### Model: Compra

```prisma
model Compra {
  id            String      @id @default(uuid())
  numero        String      @unique
  data          DateTime    @default(now())
  observacao    String?
  deleted       Boolean     @default(false)
  deletedAt     DateTime?

  subtotal      Decimal
  desconto      Decimal     @default(0)
  total        Decimal

  fornecedor   Fornecedor   @relation(fields: [fornecedorId], references: [id])
  fornecedorId String

  itens        CompraItem[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([numero])
  @@index([fornecedorId])
  @@map("compras")
}
```

### Model: CompraItem

```prisma
model CompraItem {
  id            String   @id @default(uuid())
  quantidade    Int
  precoUnitario Decimal
  precoTotal    Decimal
  deleted       Boolean  @default(false)
  deletedAt     DateTime?

  compra   Compra   @relation(fields: [compraId], references: [id], onDelete: Cascade)
  compraId String

  produto   Produto @relation(fields: [produtoId], references: [id])
  produtoId String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("compra_itens")
}
```

---

## 7. 📅 Módulo de Agendamentos

### Model: Agendamento

```prisma
model Agendamento {
  id          String          @id @default(uuid())
  data        DateTime
  hora        String
  status      StatusAgendamento @default(PENDENTE)
  tipo        TipoAgendamento  @default(SERVICO)
  observacoes String?
  deleted     Boolean         @default(false)
  deletedAt   DateTime?

  veiculoInfo String?

  cliente   Cliente     @relation(fields: [clienteId], references: [id])
  clienteId String

  viatura   Viatura?    @relation(fields: [viaturaId], references: [id])
  viaturaId String?

  servico   TipoServico? @relation(fields: [servicoId], references: [id])
  servicoId String?

  mecanico  Funcionario? @relation(fields: [mecanicoId], references: [id])
  mecanicoId String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([data])
  @@index([hora])
  @@index([status])
  @@index([clienteId])
  @@index([mecanicoId])
  @@map("agendamentos")
}
```

### Model: TipoServico

```prisma
model TipoServico {
  id          String   @id @default(uuid())
  nome        String
  descricao   String?
  preco       Decimal?
  duracao     Int      @default(60)
  ativo       Boolean  @default(true)
  deleted     Boolean  @default(false)
  deletedAt   DateTime?

  agendamentos Agendamento[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("tipos_servico")
}
```

### Model: HorarioTrabalho

```prisma
model HorarioTrabalho {
  id          String   @id @default(uuid())
  diaSemana   Int
  horaInicio  String
  horaFim     String
  ativo       Boolean  @default(true)
  deleted     Boolean  @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([diaSemana])
  @@map("horarios_trabalho")
}
```

---

## 8. 💾 Módulo de Backup

### Model: Backup

```prisma
model Backup {
  id          String      @id @default(uuid())
  nome        String
  tipo        TipoBackup
  status      StatusBackup @default(PENDENTE)
  tamanho     String?
  caminho     String?
  observacoes String?
  deleted     Boolean     @default(false)
  deletedAt   DateTime?

  logs        LogBackup[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([tipo])
  @@index([status])
  @@map("backups")
}
```

### Model: ConfiguracaoBackup

```prisma
model ConfiguracaoBackup {
  id              String   @id @default(uuid())
  backupAutomatico Boolean  @default(true)
  horarioBackup   String   @default("02:00")
  frequencia      String   @default("DIARIO")
  manterBackups   Int      @default(30)
  comprimido      Boolean  @default(true)
  criptografado   Boolean  @default(false)
  ativo           Boolean  @default(true)
  deleted         Boolean  @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("configuracoes_backup")
}
```

### Model: LogBackup

```prisma
model LogBackup {
  id          String   @id @default(uuid())
  acao        String
  mensagem    String
  detalhes    String?
  sucesso     Boolean  @default(true)
  deleted     Boolean  @default(false)

  backup   Backup? @relation(fields: [backupId], references: [id])
  backupId String?

  createdAt DateTime @default(now())

  @@index([acao])
  @@index([backupId])
  @@map("logs_backup")
}
```

---

## 9. 💰 Módulo Financeiro

### Model: Fatura

```prisma
model Fatura {
  id              String        @id @default(uuid())
  numero          String        @unique
  status          StatusFatura  @default(PENDENTE)
  data            DateTime      @default(now())
  dataVencimento  DateTime
  observacoes     String?
  deleted         Boolean       @default(false)
  deletedAt       DateTime?

  subtotal        Decimal
  totalIva        Decimal
  total           Decimal

  cliente   Cliente @relation(fields: [clienteId], references: [id])
  clienteId String

  itens      ItemFatura[]
  pagamentos Pagamento[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([numero])
  @@index([clienteId])
  @@index([status])
  @@map("faturas")
}
```

### Model: ItemFatura

```prisma
model ItemFatura {
  id          String   @id @default(uuid())
  descricao   String
  quantidade  Int
  precoUnitario Decimal
  iva         Decimal
  subtotal    Decimal
  deleted     Boolean  @default(false)

  fatura   Fatura  @relation(fields: [faturaId], references: [id], onDelete: Cascade)
  faturaId String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("itens_fatura")
}
```

### Model: ContaReceber

```prisma
model ContaReceber {
  id              String      @id @default(uuid())
  documento       String      @unique
  descricao       String
  valor           Decimal
  dataVencimento  DateTime
  status          StatusConta  @default(PENDENTE)
  observacoes     String?
  deleted         Boolean     @default(false)
  deletedAt       DateTime?

  cliente   Cliente @relation(fields: [clienteId], references: [id])
  clienteId String

  pagamentos Pagamento[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([documento])
  @@index([clienteId])
  @@index([status])
  @@map("contas_receber")
}
```

### Model: ContaPagar

```prisma
model ContaPagar {
  id              String      @id @default(uuid())
  documento       String      @unique
  nomeFornecedor  String
  nifFornecedor   String?
  descricao       String
  valor           Decimal
  dataVencimento  DateTime
  status          StatusConta  @default(PENDENTE)
  observacoes     String?
  deleted         Boolean     @default(false)
  deletedAt       DateTime?

  fornecedorObj   Fornecedor? @relation(fields: [fornecedorId], references: [id])
  fornecedorId    String?

  pagamentos Pagamento[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([documento])
  @@index([fornecedorId])
  @@index([status])
  @@map("contas_pagar")
}
```

### Model: Pagamento

```prisma
model Pagamento {
  id              String        @id @default(uuid())
  valor           Decimal
  formaPagamento  FormaPagamento
  referencia      String?
  observacoes     String?
  data            DateTime      @default(now())
  deleted         Boolean       @default(false)

  fatura   Fatura?    @relation(fields: [faturaId], references: [id])
  faturaId String?

  contaReceber   ContaReceber? @relation(fields: [contaReceberId], references: [id])
  contaReceberId String?

  contaPagar   ContaPagar?  @relation(fields: [contaPagarId], references: [id])
  contaPagarId String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([faturaId])
  @@index([contaReceberId])
  @@index([contaPagarId])
  @@map("pagamentos")
}
```

### Model: MovimentacaoFinanceira

```prisma
model MovimentacaoFinanceira {
  id              String                  @id @default(uuid())
  tipoMovimento   TipoMovimentoFinanceiro
  valor           Decimal
  descricao       String
  formaPagamento  FormaPagamento
  referencia      String?
  categoria       String?
  data            DateTime                @default(now())
  deleted         Boolean                 @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([data])
  @@index([categoria])
  @@map("movimentacoes_financeiras")
}
```

### Model: RelatorioFinanceiro

```prisma
model RelatorioFinanceiro {
  id          String   @id @default(uuid())
  tipo        String
  periodo     String
  dataGeracao DateTime @default(now())
  dados       String
  generatedBy String?

  createdAt DateTime @default(now())

  @@index([tipo])
  @@index([periodo])
  @@map("relatorios_financeiros")
}
```

### Model: CategoriaGasto

```prisma
model CategoriaGasto {
  id          String   @id @default(uuid())
  nome        String
  tipo        String
  parentId    String?
  parent      CategoriaGasto? @relation("CatGastoPai", fields: [parentId], references: [id])
  filhos      CategoriaGasto[] @relation("CatGastoPai")

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("categorias_gastos")
}
```

---

## 10. 📝 Módulos Adicionais

### Model: Manutencao

```prisma
model Manutencao {
  id              String    @id @default(uuid())
  tipo            String
  dataProgramada   DateTime
  dataRealizada   DateTime?
  quilometragem   Int?
  status          String
  observacao      String?
  deleted         Boolean   @default(false)
  deletedAt       DateTime?

  viatura   Viatura   @relation(fields: [viaturaId], references: [id])
  viaturaId String

  ordemServico   OrdemServico? @relation(fields: [ordemServicoId], references: [id])
  ordemServicoId String?        @unique

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([viaturaId])
  @@map("manutencoes")
}
```

### Model: PermissaoAcesso

```prisma
model PermissaoAcesso {
  id            String    @id @default(uuid())
  tipo          String
  status        String    @default("ATIVA")
  dataInicio    DateTime  @default(now())
  dataExpiracao DateTime?
  preco         Decimal?
  deleted       Boolean   @default(false)
  deletedAt     DateTime?

  cliente   Cliente @relation(fields: [clienteId], references: [id])
  clienteId String

  viatura   Viatura @relation(fields: [viaturaId], references: [id])
  viaturaId String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([clienteId])
  @@index([viaturaId])
  @@map("permissoes_acesso")
}
```

### Model: HistoricoServico

```prisma
model HistoricoServico {
  id          String   @id @default(uuid())
  data        DateTime @default(now())
  veiculo     String
  placa       String
  servicos    String[]
  valor       Decimal
  status      String
  observacoes String?
  deleted     Boolean  @default(false)
  deletedAt   DateTime?

  cliente   Cliente @relation(fields: [clienteId], references: [id])
  clienteId String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([clienteId])
  @@map("historicos_servico")
}
```

### Model: Configuracao

```prisma
model Configuracao {
  id        String   @id @default(uuid())
  chave     String   @unique
  valor     String
  descricao String?
  deleted   Boolean  @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("configuracoes")
}
```

### Model: IntervaloAgendamento

```prisma
model IntervaloAgendamento {
  id              String   @id @default(uuid())
  duracaoMinima   Int      @default(30)
  duracaoMaxima   Int      @default(120)
  intervaloSlot   Int      @default(30)
  ativo           Boolean  @default(true)
  deleted         Boolean  @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("intervalos_agendamento")
}
```

---

## 11. 📋 Logs de Auditoria

### Model: LogAuditoria

```prisma
model LogAuditoria {
  id          String   @id @default(uuid())
  acao        String
  entidade    String
  registroId  String
  dadosAntigos String?
  dadosNovos   String?
  ip          String?
  userAgent   String?
  deleted     Boolean  @default(false)

  usuario   Usuario? @relation(fields: [usuarioId], references: [id])
  usuarioId String?

  createdAt DateTime @default(now())

  @@index([entidade])
  @@index([registroId])
  @@index([acao])
  @@map("logs_auditoria")
}
```

---

## 🔗 Relacionamentos Principais

```
CLIENTE (1) ───────> (N) VIATURA
CLIENTE (1) ───────> (N) ORDENS_SERVICO
CLIENTE (1) ───────> (N) FATURAS
CLIENTE (1) ───────> (N) CONTAS_RECEBER
CLIENTE (1) ───────> (N) HISTORICOS_SERVICO

VIATURA (1) ───────> (N) ORDENS_SERVICO
VIATURA (1) ───────> (N) MANUTENCOES
VIATURA (1) ───────> (N) AGENDAMENTOS
VIATURA (1) ───────> (N) PERMISSOES_ACESSO

ORDEM_SERVICO (1) ───────> (N) SERVICOS
ORDEM_SERVICO (1) ───────> (N) PECAS_OS

FUNCIONARIO (1) ───────> (N) ORDENS_SERVICO
FUNCIONARIO (1) ───────> (N) PAGAMENTOS_SALARIO
FUNCIONARIO (1) ───────> (N) FALTAS
FUNCIONARIO (1) ───────> (N) FERIAS
FUNCIONARIO (1) ───────> (N) AGENDAMENTOS

PRODUTO (1) ───────> (N) MOVIMENTACOES_ESTOQUE
PRODUTO (1) ───────> (N) PECAS_OS
PRODUTO (1) ───────> (N) COMPRA_ITENS

FORNECEDOR (1) ───────> (N) COMPRAS
FORNECEDOR (1) ───────> (N) CONTAS_PAGAR

CATEGORIA (1) ───────> (N) PRODUTOS
CATEGORIA (1) ───────> (N) SUBCATEGORIAS

FATURA (1) ───────> (N) ITENS_FATURA
FATURA (1) ───────> (N) PAGAMENTOS

CONTA_RECEBER (1) ───────> (N) PAGAMENTOS
CONTA_PAGAR (1) ───────> (N) PAGAMENTOS
```

---

## 📌 Convenções de Nomenclatura

### Tabelas (map)
- snake_case minúsculas
- Exemplos: `usuarios`, `ordens_servico`, `logs_auditoria`

### Campos
- snake_case minúsculas
- `createdAt`, `updatedAt` em todas as tabelas
- `deleted` (soft delete) em todas as tabelas
- `deletedAt` para rastrear exclusão

### Relacionamentos
- `tabelaId` para chaves estrangeiras
- `tabela` para campos de enum

### Índices
- `@unique` para campos únicos
- Campos pesquisados frequentemente indexados

---

## 🚀 Comandos Prisma

```bash
# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev

# Verificar schema
npx prisma validate

# Visualizar banco
npx prisma studio

# Gerar documentação
npx prisma docs
```

---

## ✅ Boas Práticas Implementadas

1. **Soft Delete** - Campo `deleted` em todas as tabelas
2. **Timestamps** - `createdAt` e `updatedAt` sempre presentes
3. **Auditoria** - Logs de todas as operações
4. **Validação** - Enums para valores válidos
5. **Relacionamentos** - Integridade referencial
6. **Índices** - Para otimização de queries

---

**Documento gerado em:** 2024
**Versão do Prisma:** 6.x
**Banco de Dados:** PostgreSQL
**Localização:** `siv-platform/apps/backend/prisma/schema.prisma`
