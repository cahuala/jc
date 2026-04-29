/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { OficinaPrisma } from './oficina.prisma';
import {
  DeleteOficina,
  FindByIdOficina,
  ListOficina,
  OficinaSchemas,
  SaveOficina,
  UpdateLogoOficinaForNif,
  type Oficina,
} from '@fixmotor/core';
import { ZodError } from 'zod';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

@Controller('oficina')
export class OficinaController {
  constructor(private readonly repo: OficinaPrisma) {}
  @Post('')
  async save(@Body() oficina: Oficina) {
    try {
      let input: Oficina | any;

      if (!oficina.id) {
        input = OficinaSchemas.CriarOficinaSchema.parse(oficina);
      } else {
        input = oficina;
      }

      const caseOfUse = new SaveOficina(this.repo);
      return await caseOfUse.execute(input);
    } catch (error: any) {
      // ✅ Checagem baseada na estrutura do erro
      if (error && Array.isArray(error.issues)) {
        const friendlyErrors = error.issues.map(
          (e: any) => `${e.path.join('.')} → ${e.message}`,
        );

        throw new BadRequestException({
          message: 'Erro de validação nos dados enviados',
          errors: friendlyErrors,
        });
      }

      // Qualquer outro erro
      throw error;
    }
  }
  @Post(':nif/upload-foto')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const nifParam = req.params.nif;
          const nif = Array.isArray(nifParam) ? nifParam[0] : nifParam; // agora é string garantida
          const dir = join(__dirname, '..', '..', 'upload', 'oficinas', nif);

          if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
          cb(null, dir);
        },
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          // nome único: foto_20251019_1697718392.jpg
          const uniqueName = `foto_${new Date()
            .toISOString()
            .replace(/[:.]/g, '-')}${ext}`;
          cb(null, uniqueName);
        },
      }),
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(
            new BadRequestException('Formato de imagem inválido'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadFoto(
    @Param('nif') nif: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Nenhum ficheiro enviado');

    const relativePath = `upload/oficinas/${nif}/${file.filename}`;
    const oficina = { nif, imageUrl: relativePath };
    // Atualiza a foto atual da pessoa (mas não apaga as antigas)
    const caseOfUse = new UpdateLogoOficinaForNif(this.repo);
    await caseOfUse.execute(oficina);
    return {
      message: 'Foto carregada com sucesso',
      nome: file.originalname,
      caminho: relativePath,
      tipo: file.mimetype,
      tamanho: `${(file.size / 1024).toFixed(1)} KB`,
    };
  }
  @Get('')
  async list() {
    const useCase = new ListOficina(this.repo);
    return await useCase.execute();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    const useCase = new FindByIdOficina(this.repo);
    return useCase.execute(id);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    const useCase = new DeleteOficina(this.repo);
    return useCase.execute({ id });
  }
}
