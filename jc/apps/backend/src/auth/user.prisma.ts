/* eslint-disable @typescript-eslint/no-redundant-type-constituents */ /* eslint-disable @typescript-eslint/no-unsafe-member-access */ /* eslint-disable @typescript-eslint/no-unsafe-assignment */ /* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */ /* eslint-disable @typescript-eslint/no-unsafe-return */ /* eslint-disable prettier/prettier */
import { RepositoryUser, User } from '@fixmotor/core';
import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from '../db/prisma.service';
@Injectable()
export class UserPrisma implements RepositoryUser {
  constructor(private readonly prisma: PrismaService) {}
  async save(user: User): Promise<string> {
    let userId: any;
    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });
    if (existingUser) {
      userId = await this.prisma.user.update({
        where: { email: user.email },
        data: {
          nome: user.nome ?? existingUser.nome,
          email: user.email ?? existingUser.email,
          password: user.password ?? existingUser.password,
          oficinaId: user.oficinaId ?? existingUser.oficinaId,
          role: (user.role ?? existingUser.role) as UserRole,
        },
      });
    } else {
      userId = await this.prisma.user.create({
        data: {
          nome: user.nome,
          email: user.email,
          oficinaId: user.oficinaId ?? null,
          password: user.password ?? '', // pode ser vazio para sociais
          role: (user.role ?? 'TECNICO') as UserRole,
        },
      });
    }
    return userId;
  }
  async searchToEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user as User | null;
  }
}
