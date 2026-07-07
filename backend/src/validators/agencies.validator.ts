import { z } from 'zod';

export const idParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

export const createAgencySchema = z.object({
  body: z.object({
    name: z.string().trim().min(1),
    address: z.string().trim().min(1),
    area: z.string().trim().min(1),
    saleId: z.coerce.number().int().positive(),
  }),
});

export const updateAgencySchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(1).optional(),
      address: z.string().trim().min(1).optional(),
      area: z.string().trim().min(1).optional(),
      saleId: z.coerce.number().int().positive().optional(),
    })
    .refine((value) => Object.keys(value).length > 0, {
      message: 'At least one field is required',
    }),
  params: idParamSchema.shape.params,
});
