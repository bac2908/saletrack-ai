import type { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';
import { badRequest, notFound } from '../utils/errors';
import { createPaginatedResult, getPaginationParams, type PaginationQuery } from '../utils/pagination';

const trackRecordInclude = {
  agency: {
    include: { sale: true },
  },
} satisfies Prisma.TrackRecordInclude;

export const trackRecordsService = {
  async findAll(query: PaginationQuery = {}) {
    const pagination = getPaginationParams(query);
    const where: Prisma.TrackRecordWhereInput = pagination.search
      ? {
          OR: [
            { customerName: { contains: pagination.search } },
            { note: { contains: pagination.search } },
            { agency: { name: { contains: pagination.search } } },
            { agency: { sale: { name: { contains: pagination.search } } } },
          ],
        }
      : {};

    const [items, total] = await prisma.$transaction([
      prisma.trackRecord.findMany({
        include: trackRecordInclude,
        orderBy: { id: 'desc' },
        skip: pagination.skip,
        take: pagination.limit,
        where,
      }),
      prisma.trackRecord.count({ where }),
    ]);

    return createPaginatedResult(items, total, pagination);
  },

  async create(data: Prisma.TrackRecordUncheckedCreateInput) {
    const agency = await prisma.agency.findUnique({
      where: { id: data.agencyId },
    });

    if (!agency) {
      throw badRequest('agencyId does not exist');
    }

    return prisma.trackRecord.create({
      data,
      include: trackRecordInclude,
    });
  },

  async findById(id: number) {
    const trackRecord = await prisma.trackRecord.findUnique({
      include: trackRecordInclude,
      where: { id },
    });

    if (!trackRecord) {
      throw notFound('Track record not found');
    }

    return trackRecord;
  },

  async update(id: number, data: Prisma.TrackRecordUncheckedUpdateInput) {
    await this.findById(id);

    if (data.agencyId !== undefined) {
      const agencyId = Number(data.agencyId);
      const agency = await prisma.agency.findUnique({
        where: { id: agencyId },
      });

      if (!agency) {
        throw badRequest('agencyId does not exist');
      }
    }

    return prisma.trackRecord.update({
      data,
      include: trackRecordInclude,
      where: { id },
    });
  },

  async remove(id: number) {
    await this.findById(id);

    return prisma.trackRecord.delete({
      where: { id },
    });
  },
};
