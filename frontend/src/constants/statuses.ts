export const SALE_STATUSES = ['ACTIVE', 'INACTIVE'] as const;

export const TRACK_STATUSES = ['NEW', 'CONTACTED', 'POTENTIAL', 'CLOSED', 'LOST'] as const;

export const AGENCY_STATUSES = ['ACTIVE', 'INACTIVE'] as const;

export const STATUS_LABELS: Record<string, string> = {
  ACTIVE: 'Đang hoạt động',
  INACTIVE: 'Tạm ngưng',
  NEW: 'Mới',
  CONTACTED: 'Đã liên hệ',
  POTENTIAL: 'Tiềm năng',
  CLOSED: 'Đã chốt',
  LOST: 'Thất bại',
};
