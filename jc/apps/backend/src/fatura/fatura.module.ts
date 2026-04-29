import { Module } from '@nestjs/common';
import { FaturaController } from './fatura.controller';
import { FaturaPrisma } from './fatura.prisma';
import { DbModule } from '../../db/db.module';

@Module({
  imports: [DbModule],

  controllers: [FaturaController],
  providers: [FaturaPrisma],
  exports: [FaturaPrisma],
})
export class FaturaModule {}

