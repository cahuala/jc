import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';


@Injectable()
export class FaturaPrisma {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const fatura = await this.prisma.fatura.findUnique({
      where: { id },
      include: {
        cliente: true,
        itens: true,
      },
    });

    if (!fatura) {
      throw new NotFoundException(`Fatura ${id} não encontrada`);
    }

    return {
      id: fatura.id,
      numero: fatura.numero,
      data: fatura.data.toISOString(),
      status: fatura.status,
      subtotal: Number(fatura.subtotal),
      totalIva: Number(fatura.totalIva),
      total: Number(fatura.total),
      cliente: {
        nome: fatura.cliente.nome,
        nif: fatura.cliente.nif,
        endereco: fatura.cliente.endereco,
        telefone: fatura.cliente.telefone,
      },
      itens: fatura.itens.map((item: any) => ({
        id: item.id,
        descricao: item.descricao,
        quantidade: item.quantidade,
        precoUnitario: Number(item.precoUnitario),
        subtotal: Number(item.subtotal),
      })),
    };
  }
}

