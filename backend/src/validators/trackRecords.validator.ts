import { z } from 'zod';

const trackStatusSchema = z.enum(['NEW', 'CONTACTED', 'POTENTIAL', 'CLOSED', 'LOST']);

export const idParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

export const createTrackRecordSchema = z.object({
  body: z.object({
    customerName: z.string().trim().min(1),
    expectedRevenue: z.coerce.number().nonnegative(),
    status: trackStatusSchema.optional(),
    note: z.string().trim().optional(),
    agencyId: z.coerce.number().int().positive(),
  }),
});

export const updateTrackRecordSchema = z.object({
  body: z
    .object({
      customerName: z.string().trim().min(1).optional(),
      expectedRevenue: z.coerce.number().nonnegative().optional(),
      status: trackStatusSchema.optional(),
      note: z.string().trim().optional(),
      agencyId: z.coerce.number().int().positive().optional(),
    })
    .refine((value) => Object.keys(value).length > 0, {
      message: 'At least one field is required',
    }),
  params: idParamSchema.shape.params,
});
