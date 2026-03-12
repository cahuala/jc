/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';

export interface Processo {
  id?: string;
  numero: string;
  tipo: string;
  dataAbertura?: Date;
  crime: string;
  descricao?: string;
  fase?: string;
  status?: string;
  nomeReu: string;
  posto: string;
  unidade: string;
  juiz?: string;
  promotor?: string;
  defensor?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable()
export class ProcessoPrismaRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    search?: string;
    tipo?: string;
    status?: string;
  }) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'dataAbertura',
      sortOrder = 'desc',
      search,
      tipo,
      status,
    } = params;

    const where: any = {};

    if (search) {
      where.OR = [
        { numero: { contains: search, mode: 'insensitive' } },
        { nomeReu: { contains: search, mode: 'insensitive' } },
        { crime: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (tipo && tipo !== 'todos') {
      where.tipo = tipo;
    }

    if (status && status !== 'todos') {
      where.status = status;
    }

    const [data, total] = await Promise.all([
      this.prisma.processos.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.processos.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string) {
    return this.prisma.processos.findUnique({ where: { id } });
  }

  async create(data: Processo) {
    return await this.prisma.processos.create({ data });
  }

  async update(id: string, data: Partial<Processo>) {
    return this.prisma.processos.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.processos.delete({ where: { id } });
  }
}
