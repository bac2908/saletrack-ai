import { z } from 'zod';

export const createAgencySchema = z.object({
  body: z.object({
    name: z.string().trim().min(1),
    address: z.string().trim().min(1),
    area: z.string().trim().min(1),
    saleId: z.coerce.number().int().positive(),
  }),
});
