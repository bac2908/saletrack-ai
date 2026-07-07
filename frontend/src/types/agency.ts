export interface AgencySale {
  id: number;
  name: string;
  phone?: string | null;
  email?: string | null;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Agency {
  id: number;
  name: string;
  address: string;
  area: string;
  saleId: number;
  sale?: AgencySale;
  createdAt: string;
  updatedAt: string;
}
