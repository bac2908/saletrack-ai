import { prisma } from '../config/prisma';

const trackStatuses = ['NEW', 'CONTACTED', 'POTENTIAL', 'CLOSED', 'LOST'] as const;

export const dashboardService = {
  async getStats() {
    const [activeSalesCount, totalAgencies, totalTrackRecords, revenueAggregate, groupedTrackRecords] =
      await Promise.all([
        prisma.sale.count({
          where: { status: 'ACTIVE' },
        }),
        prisma.agency.count(),
        prisma.trackRecord.count(),
        prisma.trackRecord.aggregate({
          _sum: { expectedRevenue: true },
        }),
        prisma.trackRecord.groupBy({
          by: ['status'],
          _count: { status: true },
        }),
      ]);

    const trackRecordsByStatus = trackStatuses.reduce<Record<(typeof trackStatuses)[number], number>>(
      (result, status) => {
        result[status] = 0;
        return result;
      },
      {
        NEW: 0,
        CONTACTED: 0,
        POTENTIAL: 0,
        CLOSED: 0,
        LOST: 0,
      },
    );

    groupedTrackRecords.forEach((item) => {
      trackRecordsByStatus[item.status] = item._count.status;
    });

    return {
      activeSalesCount,
      totalAgencies,
      totalTrackRecords,
      totalExpectedRevenue: Number(revenueAggregate._sum.expectedRevenue ?? 0),
      trackRecordsByStatus,
    };
  },
};
