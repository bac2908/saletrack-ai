import { z } from 'zod';

const saleStatusSchema = z.enum(['ACTIVE', 'INACTIVE']);

export const idParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

export const createSaleSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1),
    phone: z.string().trim().optional(),
    email: z.string().trim().email().optional(),
    status: saleStatusSchema.optional(),
  }),
});

export const updateSaleSchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(1).optional(),
      phone: z.string().trim().optional(),
      email: z.string().trim().email().optional(),
      status: saleStatusSchema.optional(),
    })
    .refine((value) => Object.keys(value).length > 0, {
      message: 'At least one field is required',
    }),
  params: idParamSchema.shape.params,
});
