import type { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';

function badRequest(message: string) {
  const error = new Error(message) as Error & { statusCode: number };
  error.statusCode = 400;
  return error;
}

export const agenciesService = {
  findAll: () =>
    prisma.agency.findMany({
      include: { sale: true },
      orderBy: { createdAt: 'desc' },
    }),

  async create(data: Prisma.AgencyUncheckedCreateInput) {
    const sale = await prisma.sale.findUnique({
      where: { id: data.saleId },
    });

    if (!sale) {
      throw badRequest('saleId does not exist');
    }

    return prisma.agency.create({
      data,
      include: { sale: true },
    });
  },
};
