import { BarChart3, Building2, LayoutDashboard, ListChecks } from 'lucide-react';
import { ROUTES } from './routes';

export const MENU_ITEMS = [
  {
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    label: 'Đội ngũ Sale',
    path: ROUTES.SALES,
    icon: BarChart3,
  },
  {
    label: 'Đại lý',
    path: ROUTES.AGENCIES,
    icon: Building2,
  },
  {
    label: 'Track Record',
    path: ROUTES.TRACK_RECORDS,
    icon: ListChecks,
  },
] as const;
