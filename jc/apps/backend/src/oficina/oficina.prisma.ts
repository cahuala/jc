/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { DateUltils, Oficina, RepositoryOficina } from '@fixmotor/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
@Injectable()
export class OficinaPrisma implements RepositoryOficina {
  constructor(private readonly prisma: PrismaService) {}
  async updatePhoto(photo: any): Promise<any | null> {
    const { nif, imageUrl } = photo;
    const oficina = await this.prisma.oficina.findUnique({
      where: { nif }
    });

    if (!oficina) {
      throw new NotFoundException(`Oficina com o ${nif} não encontrado`);
    }

    // Atualiza o campo fotoUrl na tabela pessoa
    await this.prisma.oficina.update({
      where: { id: oficina.id },
      data: { imgUrl: imageUrl, updatedAt: new Date() },
    });

    return true;
  }
  // Helper: converte string | Date → Date, fallback é obrigatório para create
  private parseDateOrDefault(value: any, fallback: Date = new Date()): Date {
    return value ? DateUltils.parseFlexibleDate(value) : fallback;
  }

  // Helper para update: retorna Date ou undefined
  private parseDateOrUndefined(value: any): Date | undefined {
    return value ? DateUltils.parseFlexibleDate(value) : undefined;
  }

  async save(oficina: Oficina): Promise<string> {
    let existing: Oficina | null = null;
    if (oficina.id) {
      existing = await this.prisma.oficina.findUnique({
        where: { id: oficina.id },
      });
    }
    let result: Oficina;
    if (existing) {
      result = await this.prisma.oficina.update({
        where: { id: existing.id },
        data: {
          nome: oficina.nome ?? existing.nome,
          nif: oficina.nif ?? existing.nif,
          endereco: oficina.endereco ?? existing.endereco,
          provincia: oficina.provincia ?? existing.provincia,
          email: oficina.email ?? existing.email,
          telefone: oficina.telefone ?? existing.telefone,
          status: oficina.status ?? existing.status,
          imgUrl: oficina.imgUrl ?? existing.imgUrl,
          deleted: oficina.deleted ?? existing.deleted,
          updatedAt: new Date(),
        },
      });
    } else {
      result = await this.prisma.oficina.create({
        data: {
          nome: oficina.nome,
          nif: oficina.nif,
          endereco: oficina.endereco,
          provincia: oficina.provincia,
          email: oficina.email,
          telefone: oficina.telefone,
          status: oficina.status ?? 'PENDENTE',
          imgUrl: oficina?.imgUrl ?? '',
          deleted: oficina.deleted ?? false,
        },
      });
    }

    return result as any;
  }
  async list(): Promise<Oficina[]> {
    const oficinas = await this.prisma.oficina.findMany({
      where: { deleted: false },
      orderBy: { createdAt: 'desc' },
    });

    return oficinas.map((p) => ({
      id: p.id,
      nome: p.nome,
      nif: p.nif,
      endereco: p.endereco,
      provincia: p.provincia,
      email: p.email,
      telefone: p.telefone,
      status: p.status,
      imgUrl: p.imgUrl,
      deleted: p.deleted,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));
  }
  async findById(id: string): Promise<Oficina | null> {
    const o = await this.prisma.oficina.findUnique({ where: { id } });
    if (!o) return null;

    return {
      id: o.id,
      nome: o.nome,
      nif: o.nif,
      endereco: o.endereco,
      provincia: o.provincia,
      email: o.email,
      telefone: o.telefone,
      status: o.status,
      imgUrl: o.imgUrl,
      deleted: o.deleted,
      createdAt: o.createdAt,
      updatedAt: o.updatedAt,
    };
     
  }
  async delete(id: string): Promise<void> {
    await this.prisma.oficina.delete({ where: { id } });
  }

}
