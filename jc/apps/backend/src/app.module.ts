import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { OficinaModule } from './oficina/oficina.module';
import { FaturaModule } from './fatura/fatura.module';

@Module({
  imports: [DbModule, AuthModule, FuncionarioModule, OficinaModule, FaturaModule],
  controllers: [AppController],
})
export class AppModule {}
