-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'GESTOR_OFICINA', 'TECNICO', 'RH', 'CLIENTE');

-- CreateEnum
CREATE TYPE "public"."StatusGeral" AS ENUM ('ATIVO', 'INATIVO', 'SUSPENSO');

-- CreateEnum
CREATE TYPE "public"."StatusOficina" AS ENUM ('PENDENTE', 'CREDENCIADA', 'SUSPENSA');

-- CreateEnum
CREATE TYPE "public"."TipoFalta" AS ENUM ('JUSTIFICADA', 'INJUSTIFICADA');

-- CreateEnum
CREATE TYPE "public"."StatusDiagnostico" AS ENUM ('PENDENTE', 'APROVADO', 'REJEITADO');

-- CreateEnum
CREATE TYPE "public"."StatusOrdemServico" AS ENUM ('ABERTA', 'EM_EXECUCAO', 'CONCLUIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "public"."StatusPagamento" AS ENUM ('PENDENTE', 'PAGO');

-- CreateEnum
CREATE TYPE "public"."StatusVendaViatura" AS ENUM ('EM_VERIFICACAO', 'APROVADA', 'REPROVADA', 'VENDIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "public"."TipoPermissaoAcesso" AS ENUM ('HISTORICO', 'DIAGNOSTICO', 'COMPLETO');

-- CreateEnum
CREATE TYPE "public"."StatusPermissao" AS ENUM ('ATIVA', 'REVOGADA', 'EXPIRADA');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL,
    "status" "public"."StatusGeral" NOT NULL DEFAULT 'ATIVO',
    "oficinaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."oficinas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "status" "public"."StatusOficina" NOT NULL DEFAULT 'PENDENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "oficinas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."funcionarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "bi" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "funcao" TEXT NOT NULL,
    "salarioBase" DECIMAL(65,30) NOT NULL,
    "oficinaId" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "funcionarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."faltas" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "tipo" "public"."TipoFalta" NOT NULL,
    "observacao" TEXT,
    "funcionarioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faltas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."processamentos_salariais" (
    "id" TEXT NOT NULL,
    "mes" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,
    "salarioBase" DECIMAL(65,30) NOT NULL,
    "descontos" DECIMAL(65,30) NOT NULL,
    "bonus" DECIMAL(65,30) NOT NULL,
    "salarioLiquido" DECIMAL(65,30) NOT NULL,
    "status" "public"."StatusPagamento" NOT NULL,
    "funcionarioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "processamentos_salariais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."clientes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."viaturas" (
    "id" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "clienteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "viaturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."diagnosticos" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observacoes" TEXT NOT NULL,
    "status" "public"."StatusDiagnostico" NOT NULL,
    "viaturaId" TEXT NOT NULL,
    "tecnicoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diagnosticos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."itens_diagnostico" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "gravidade" TEXT NOT NULL,
    "custoEstimado" DECIMAL(65,30) NOT NULL,
    "diagnosticoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "itens_diagnostico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ordens_servico" (
    "id" TEXT NOT NULL,
    "status" "public"."StatusOrdemServico" NOT NULL,
    "dataAbertura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFecho" TIMESTAMP(3),
    "viaturaId" TEXT NOT NULL,
    "diagnosticoId" TEXT NOT NULL,
    "oficinaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ordens_servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."servicos" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "precoMaoObra" DECIMAL(65,30) NOT NULL,
    "ordemServicoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "servicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."itens_servico" (
    "id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "precoUnitario" DECIMAL(65,30) NOT NULL,
    "servicoId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "itens_servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categorias" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."produtos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DECIMAL(65,30) NOT NULL,
    "stock" INTEGER NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."vendas_viatura" (
    "id" TEXT NOT NULL,
    "precoPedido" DECIMAL(65,30) NOT NULL,
    "status" "public"."StatusVendaViatura" NOT NULL DEFAULT 'EM_VERIFICACAO',
    "dataPedido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFecho" TIMESTAMP(3),
    "viaturaId" TEXT NOT NULL,
    "oficinaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendas_viatura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verificacoes_venda" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resultado" BOOLEAN NOT NULL,
    "observacoes" TEXT NOT NULL,
    "vendaId" TEXT NOT NULL,
    "oficinaId" TEXT NOT NULL,
    "tecnicoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verificacoes_venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."permissoes_acesso_viatura" (
    "id" TEXT NOT NULL,
    "tipo" "public"."TipoPermissaoAcesso" NOT NULL,
    "status" "public"."StatusPermissao" NOT NULL DEFAULT 'ATIVA',
    "dataInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFim" TIMESTAMP(3),
    "viaturaId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "oficinaId" TEXT NOT NULL,
    "funcionarioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissoes_acesso_viatura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."historico_viatura" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataRegisto" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visivelPublico" BOOLEAN NOT NULL DEFAULT false,
    "viaturaId" TEXT NOT NULL,
    "ordemServicoId" TEXT,
    "vendaViaturaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "historico_viatura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."logs_auditoria" (
    "id" TEXT NOT NULL,
    "acao" TEXT NOT NULL,
    "entidade" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logs_auditoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "oficinas_nif_key" ON "public"."oficinas"("nif");

-- CreateIndex
CREATE UNIQUE INDEX "funcionarios_bi_key" ON "public"."funcionarios"("bi");

-- CreateIndex
CREATE UNIQUE INDEX "viaturas_matricula_key" ON "public"."viaturas"("matricula");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_oficinaId_fkey" FOREIGN KEY ("oficinaId") REFERENCES "public"."oficinas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."funcionarios" ADD CONSTRAINT "funcionarios_oficinaId_fkey" FOREIGN KEY ("oficinaId") REFERENCES "public"."oficinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."funcionarios" ADD CONSTRAINT "funcionarios_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."faltas" ADD CONSTRAINT "faltas_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "public"."funcionarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."processamentos_salariais" ADD CONSTRAINT "processamentos_salariais_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "public"."funcionarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."viaturas" ADD CONSTRAINT "viaturas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "public"."clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."diagnosticos" ADD CONSTRAINT "diagnosticos_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "public"."viaturas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."diagnosticos" ADD CONSTRAINT "diagnosticos_tecnicoId_fkey" FOREIGN KEY ("tecnicoId") REFERENCES "public"."funcionarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."itens_diagnostico" ADD CONSTRAINT "itens_diagnostico_diagnosticoId_fkey" FOREIGN KEY ("diagnosticoId") REFERENCES "public"."diagnosticos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ordens_servico" ADD CONSTRAINT "ordens_servico_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "public"."viaturas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ordens_servico" ADD CONSTRAINT "ordens_servico_diagnosticoId_fkey" FOREIGN KEY ("diagnosticoId") REFERENCES "public"."diagnosticos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ordens_servico" ADD CONSTRAINT "ordens_servico_oficinaId_fkey" FOREIGN KEY ("oficinaId") REFERENCES "public"."oficinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."servicos" ADD CONSTRAINT "servicos_ordemServicoId_fkey" FOREIGN KEY ("ordemServicoId") REFERENCES "public"."ordens_servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."itens_servico" ADD CONSTRAINT "itens_servico_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "public"."servicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."itens_servico" ADD CONSTRAINT "itens_servico_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "public"."produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."categorias" ADD CONSTRAINT "categorias_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."produtos" ADD CONSTRAINT "produtos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."vendas_viatura" ADD CONSTRAINT "vendas_viatura_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "public"."viaturas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."vendas_viatura" ADD CONSTRAINT "vendas_viatura_oficinaId_fkey" FOREIGN KEY ("oficinaId") REFERENCES "public"."oficinas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."verificacoes_venda" ADD CONSTRAINT "verificacoes_venda_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "public"."vendas_viatura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."verificacoes_venda" ADD CONSTRAINT "verificacoes_venda_oficinaId_fkey" FOREIGN KEY ("oficinaId") REFERENCES "public"."oficinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."verificacoes_venda" ADD CONSTRAINT "verificacoes_venda_tecnicoId_fkey" FOREIGN KEY ("tecnicoId") REFERENCES "public"."funcionarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."permissoes_acesso_viatura" ADD CONSTRAINT "permissoes_acesso_viatura_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "public"."viaturas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."permissoes_acesso_viatura" ADD CONSTRAINT "permissoes_acesso_viatura_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "public"."clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."permissoes_acesso_viatura" ADD CONSTRAINT "permissoes_acesso_viatura_oficinaId_fkey" FOREIGN KEY ("oficinaId") REFERENCES "public"."oficinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."permissoes_acesso_viatura" ADD CONSTRAINT "permissoes_acesso_viatura_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "public"."funcionarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."historico_viatura" ADD CONSTRAINT "historico_viatura_viaturaId_fkey" FOREIGN KEY ("viaturaId") REFERENCES "public"."viaturas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."historico_viatura" ADD CONSTRAINT "historico_viatura_ordemServicoId_fkey" FOREIGN KEY ("ordemServicoId") REFERENCES "public"."ordens_servico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."historico_viatura" ADD CONSTRAINT "historico_viatura_vendaViaturaId_fkey" FOREIGN KEY ("vendaViaturaId") REFERENCES "public"."vendas_viatura"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."logs_auditoria" ADD CONSTRAINT "logs_auditoria_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
