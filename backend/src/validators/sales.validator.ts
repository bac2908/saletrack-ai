import { z } from 'zod';

const saleStatusSchema = z.enum(['ACTIVE', 'INACTIVE']);

export const createSaleSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1),
    phone: z.string().trim().optional(),
    email: z.string().trim().email().optional(),
    status: saleStatusSchema.optional(),
  }),
});
