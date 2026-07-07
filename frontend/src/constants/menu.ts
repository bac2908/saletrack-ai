import { BarChart3, Building2, LayoutDashboard, ListChecks } from 'lucide-react';
import { ROUTES } from './routes';

export const MENU_ITEMS = [
  {
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    label: 'Sales Team',
    path: ROUTES.SALES,
    icon: BarChart3,
  },
  {
    label: 'Agencies',
    path: ROUTES.AGENCIES,
    icon: Building2,
  },
  {
    label: 'Track Records',
    path: ROUTES.TRACK_RECORDS,
    icon: ListChecks,
  },
] as const;
