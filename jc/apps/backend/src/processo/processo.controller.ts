/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ProcessoPrismaRepository } from './processo.prisma';

@Controller('processo')
export class ProcessoController {
  constructor(private readonly repo: ProcessoPrismaRepository) {}

  @Get('table')
  async table(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('sortBy') sortBy: string = 'dataAbertura',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'desc',
    @Query('search') search?: string,
    @Query('tipo') tipo?: string,
    @Query('status') status?: string,
  ): Promise<any> {
    return this.repo.findAll({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sortBy: sortBy || 'dataAbertura',
      sortOrder: sortOrder || 'desc',
      search,
      tipo,
      status,
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.repo.findById(id);
  }

  @Post('')
  async create(@Body() data: any) {
    try {
      return await this.repo.create(data);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'issues' in error) {
        const zodError = error as {
          issues: Array<{ path: string[]; message: string }>;
        };
        const friendlyErrors = zodError.issues.map(
          (e) => `${e.path.join('.')} → ${e.message}`,
        );

        console.log('Erros amigáveis:', friendlyErrors);

        throw new BadRequestException({
          message: 'Erro de validação nos dados enviados',
          errors: friendlyErrors,
        });
      }

      throw error;
    }
  }

  @Post(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.repo.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.repo.delete(id);
  }
}
