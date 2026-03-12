import { Module } from '@nestjs/common';
import { FuncionarioController } from './funcionario.controller';

@Module({
  controllers: [FuncionarioController],
})
export class FuncionarioModule {}
