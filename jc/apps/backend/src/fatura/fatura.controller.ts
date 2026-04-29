import { Controller, Get, Param } from '@nestjs/common';
import { FaturaPrisma } from './fatura.prisma';

@Controller('faturas')
export class FaturaController {
  constructor(private readonly repo: FaturaPrisma) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.repo.findById(id);
  }
}

