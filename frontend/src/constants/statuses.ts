export const SALE_STATUSES = ['NEW', 'CONTACTED', 'NEGOTIATING', 'WON', 'LOST'] as const;

export const TRACK_STATUSES = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as const;

export const AGENCY_STATUSES = ['ACTIVE', 'INACTIVE'] as const;

export const STATUS_LABELS: Record<string, string> = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  NEW: 'New',
  CONTACTED: 'Contacted',
  NEGOTIATING: 'Negotiating',
  WON: 'Won',
  LOST: 'Lost',
  PENDING: 'Pending',
  IN_PROGRESS: 'In progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};
