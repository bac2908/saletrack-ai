import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function MainLayout() {
  const location = useLocation();
  const routesWithOwnHeader = ['/agencies', '/sales', '/track-records'];
  const showHeader = !routesWithOwnHeader.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background text-text-strong">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="min-w-0 flex-1">
          {showHeader ? <Header /> : null}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
