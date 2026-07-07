import type { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';

export const salesService = {
  findAll: () =>
    prisma.sale.findMany({
      include: { agencies: true },
      orderBy: { createdAt: 'desc' },
    }),

  create: (data: Prisma.SaleUncheckedCreateInput) =>
    prisma.sale.create({
      data,
      include: { agencies: true },
    }),
};
