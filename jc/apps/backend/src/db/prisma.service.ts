/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import {
  Global,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Global()
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  onModuleInit() {
    this.$connect().catch((e) => {
      console.error('Prisma connection error', e);
    });
  }

  onModuleDestroy() {
    this.$disconnect().catch((e) => {
      console.error('Prisma disconnection error', e);
    });
  }
}
