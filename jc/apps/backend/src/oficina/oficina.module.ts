import { Module } from '@nestjs/common';
import { OficinaController } from './oficina.controller';
import { DbModule } from 'src/db/db.module';
import { OficinaPrisma } from './oficina.prisma';

@Module({
  imports: [DbModule],
  exports: [OficinaPrisma],
  providers: [OficinaPrisma],
  controllers: [OficinaController],
})
export class OficinaModule {}
