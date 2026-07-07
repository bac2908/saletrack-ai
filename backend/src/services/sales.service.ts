import type { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';
import { notFound } from '../utils/errors';
import { createPaginatedResult, getPaginationParams, type PaginationQuery } from '../utils/pagination';

const saleInclude = {
  agencies: true,
  _count: {
    select: { agencies: true },
  },
} satisfies Prisma.SaleInclude;

export const salesService = {
  async findAll(query: PaginationQuery = {}) {
    const pagination = getPaginationParams(query);
    const where: Prisma.SaleWhereInput = pagination.search
      ? {
          OR: [
            { name: { contains: pagination.search } },
            { phone: { contains: pagination.search } },
            { email: { contains: pagination.search } },
          ],
        }
      : {};

    const [items, total] = await prisma.$transaction([
      prisma.sale.findMany({
        include: saleInclude,
        orderBy: { id: 'desc' },
        skip: pagination.skip,
        take: pagination.limit,
        where,
      }),
      prisma.sale.count({ where }),
    ]);

    return createPaginatedResult(items, total, pagination);
  },

  create: (data: Prisma.SaleUncheckedCreateInput) =>
    prisma.sale.create({
      data,
      include: saleInclude,
    }),

  async findById(id: number) {
    const sale = await prisma.sale.findUnique({
      include: saleInclude,
      where: { id },
    });

    if (!sale) {
      throw notFound('Sale not found');
    }

    return sale;
  },

  async update(id: number, data: Prisma.SaleUncheckedUpdateInput) {
    await this.findById(id);

    return prisma.sale.update({
      data,
      include: saleInclude,
      where: { id },
    });
  },

  async remove(id: number) {
    await this.findById(id);

    return prisma.$transaction(async (tx) => {
      const agencies = await tx.agency.findMany({
        select: { id: true },
        where: { saleId: id },
      });
      const agencyIds = agencies.map((agency) => agency.id);

      if (agencyIds.length > 0) {
        await tx.trackRecord.deleteMany({
          where: { agencyId: { in: agencyIds } },
        });
      }

      await tx.agency.deleteMany({
        where: { saleId: id },
      });

      return tx.sale.delete({
        where: { id },
      });
    });
  },
};
