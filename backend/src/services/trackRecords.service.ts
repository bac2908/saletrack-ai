import type { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';

function badRequest(message: string) {
  const error = new Error(message) as Error & { statusCode: number };
  error.statusCode = 400;
  return error;
}

export const trackRecordsService = {
  findAll: () =>
    prisma.trackRecord.findMany({
      include: {
        agency: {
          include: { sale: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),

  async create(data: Prisma.TrackRecordUncheckedCreateInput) {
    const agency = await prisma.agency.findUnique({
      where: { id: data.agencyId },
    });

    if (!agency) {
      throw badRequest('agencyId does not exist');
    }

    return prisma.trackRecord.create({
      data,
      include: {
        agency: {
          include: { sale: true },
        },
      },
    });
  },
};
