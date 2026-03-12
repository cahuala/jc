// core/oficina/schema/criar-oficina.schema.ts
import { z } from 'zod';

export const CriarOficinaSchema = z.object({
  nome: z
    .string({
      required_error: 'O nome da oficina é obrigatório',
      invalid_type_error: 'O nome deve ser um texto',
    })
    .min(3, 'O nome deve ter no mínimo 3 caracteres'),

  nif: z
    .string({
      required_error: 'O NIF é obrigatório',
      invalid_type_error: 'O NIF deve ser um texto',
    })
    .length(10, 'O NIF deve conter exatamente 10 dígitos'),

  endereco: z
    .string({
      required_error: 'O endereço é obrigatório',
      invalid_type_error: 'O endereço deve ser um texto',
    })
    .min(5, 'O endereço é muito curto'),

  provincia: z
    .string({
      required_error: 'A província é obrigatória',
      invalid_type_error: 'A província deve ser um texto',
    })
    .min(2, 'A província é muito curta'),

  email: z
    .string({
      required_error: 'O email é obrigatório',
      invalid_type_error: 'O email deve ser um texto',
    })
    .email('Email inválido'),

  telefone: z
    .string({
      required_error: 'O telefone é obrigatório',
      invalid_type_error: 'O telefone deve ser um texto',
    })
    .min(7, 'O telefone é muito curto'),

  status: z
    .enum(['PENDENTE', 'CREDENCIADA', 'SUSPENSA'], {
      required_error: 'O status é obrigatório',
      invalid_type_error: 'Status inválido',
    })
    .optional()
    .default('PENDENTE'),


});

export type CriarOficinaInput = z.infer<typeof CriarOficinaSchema>;
