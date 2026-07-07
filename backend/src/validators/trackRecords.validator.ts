import { z } from 'zod';

const trackStatusSchema = z.enum(['NEW', 'CONTACTED', 'POTENTIAL', 'CLOSED', 'LOST']);

export const createTrackRecordSchema = z.object({
  body: z.object({
    customerName: z.string().trim().min(1),
    expectedRevenue: z.coerce.number().nonnegative(),
    status: trackStatusSchema.optional(),
    note: z.string().trim().optional(),
    agencyId: z.coerce.number().int().positive(),
  }),
});
