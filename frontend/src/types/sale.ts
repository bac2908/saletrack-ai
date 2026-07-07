export type SaleStatus = 'ACTIVE' | 'INACTIVE';

export interface SaleAgencySummary {
  area: string;
  id: number;
  name: string;
}

export interface Sale {
  _count?: {
    agencies: number;
  };
  agencies?: SaleAgencySummary[];
  createdAt: string;
  email?: string | null;
  id: number;
  name: string;
  phone?: string | null;
  status: SaleStatus;
  updatedAt: string;
}
