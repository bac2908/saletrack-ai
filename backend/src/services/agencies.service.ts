import type { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';
import { badRequest, notFound } from '../utils/errors';
import { createPaginatedResult, getPaginationParams, type PaginationQuery } from '../utils/pagination';

const agencyInclude = {
  sale: true,
  _count: {
    select: { trackRecords: true },
  },
} satisfies Prisma.AgencyInclude;

export const agenciesService = {
  async findAll(query: PaginationQuery = {}) {
    const pagination = getPaginationParams(query);
    const where: Prisma.AgencyWhereInput = pagination.search
      ? {
          OR: [
            { name: { contains: pagination.search } },
            { address: { contains: pagination.search } },
            { area: { contains: pagination.search } },
            { sale: { name: { contains: pagination.search } } },
          ],
        }
      : {};

    const [items, total] = await prisma.$transaction([
      prisma.agency.findMany({
        include: agencyInclude,
        orderBy: { id: 'desc' },
        skip: pagination.skip,
        take: pagination.limit,
        where,
      }),
      prisma.agency.count({ where }),
    ]);

    return createPaginatedResult(items, total, pagination);
  },

  async create(data: Prisma.AgencyUncheckedCreateInput) {
    const sale = await prisma.sale.findUnique({
      where: { id: data.saleId },
    });

    if (!sale) {
      throw badRequest('saleId does not exist');
    }

    return prisma.agency.create({
      data,
      include: agencyInclude,
    });
  },

  async findById(id: number) {
    const agency = await prisma.agency.findUnique({
      include: agencyInclude,
      where: { id },
    });

    if (!agency) {
      throw notFound('Agency not found');
    }

    return agency;
  },

  async update(id: number, data: Prisma.AgencyUncheckedUpdateInput) {
    await this.findById(id);

    if (data.saleId !== undefined) {
      const saleId = Number(data.saleId);
      const sale = await prisma.sale.findUnique({
        where: { id: saleId },
      });

      if (!sale) {
        throw badRequest('saleId does not exist');
      }
    }

    return prisma.agency.update({
      data,
      include: agencyInclude,
      where: { id },
    });
  },

  async remove(id: number) {
    await this.findById(id);

    return prisma.$transaction(async (tx) => {
      await tx.trackRecord.deleteMany({
        where: { agencyId: id },
      });

      return tx.agency.delete({
        where: { id },
      });
    });
  },
};
