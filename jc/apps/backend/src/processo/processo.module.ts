import { Module } from '@nestjs/common';
import { ProcessoController } from './processo.controller';
import { ProcessoPrismaRepository } from './processo.prisma';

@Module({
  controllers: [ProcessoController],
  providers: [ProcessoPrismaRepository],
  exports: [ProcessoPrismaRepository],
})
export class ProcessoModule {}
