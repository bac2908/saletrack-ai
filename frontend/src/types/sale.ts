export type SaleStatus = 'NEW' | 'CONTACTED' | 'NEGOTIATING' | 'WON' | 'LOST';

export interface Sale {
  id: string;
  customerName: string;
  amount: number;
  status: SaleStatus;
  agencyId?: string;
  createdAt: string;
  updatedAt: string;
}
