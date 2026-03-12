/*
  Warnings:

  - You are about to drop the column `endereco` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `funcao` on the `funcionarios` table. All the data in the column will be lost.
  - You are about to drop the column `salarioBase` on the `funcionarios` table. All the data in the column will be lost.
  - You are about to drop the column `salarioBase` on the `processamentos_salariais` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bairro` to the `funcionarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataEmissao` to the `funcionarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estadoCivil` to the `funcionarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genero` to the `funcionarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgUrl` to the `funcionarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipio` to the `funcionarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `naturalidade` to the `funcionarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeMae` to the `funcionarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomePai` to the `funcionarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provincia` to the `funcionarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `funcionarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleted` to the `oficinas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgUrl` to the `oficinas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."clientes" DROP COLUMN "endereco",
ADD COLUMN     "bairro" TEXT,
ADD COLUMN     "bi" TEXT,
ADD COLUMN     "dataEmissao" TIMESTAMP(3),
ADD COLUMN     "dataNascimento" TIMESTAMP(3),
ADD COLUMN     "estadoCivil" TEXT,
ADD COLUMN     "genero" TEXT,
ADD COLUMN     "municipio" TEXT,
ADD COLUMN     "naturalidade" TEXT,
ADD COLUMN     "nomeMae" TEXT,
ADD COLUMN     "nomePai" TEXT,
ADD COLUMN     "provincia" TEXT;

-- AlterTable
ALTER TABLE "public"."funcionarios" DROP COLUMN "funcao",
DROP COLUMN "salarioBase",
ADD COLUMN     "bairro" TEXT NOT NULL,
ADD COLUMN     "dataEmissao" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "estadoCivil" TEXT NOT NULL,
ADD COLUMN     "genero" TEXT NOT NULL,
ADD COLUMN     "imgUrl" TEXT NOT NULL,
ADD COLUMN     "municipio" TEXT NOT NULL,
ADD COLUMN     "naturalidade" TEXT NOT NULL,
ADD COLUMN     "nomeMae" TEXT NOT NULL,
ADD COLUMN     "nomePai" TEXT NOT NULL,
ADD COLUMN     "provincia" TEXT NOT NULL,
ADD COLUMN     "telefone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."oficinas" ADD COLUMN     "deleted" BOOLEAN NOT NULL,
ADD COLUMN     "imgUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."processamentos_salariais" DROP COLUMN "salarioBase";

-- CreateTable
CREATE TABLE "public"."cargos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT,
    "salarioBase" DECIMAL(65,30) NOT NULL,
    "chefeId" TEXT,
    "deleted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cargos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "public"."clientes"("email");

-- AddForeignKey
ALTER TABLE "public"."cargos" ADD CONSTRAINT "cargos_chefeId_fkey" FOREIGN KEY ("chefeId") REFERENCES "public"."cargos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
