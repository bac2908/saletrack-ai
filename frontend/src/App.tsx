import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AgenciesPage from './pages/AgenciesPage';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import SalesPage from './pages/SalesPage';
import TrackRecordsPage from './pages/TrackRecordsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="agencies" element={<AgenciesPage />} />
          <Route path="track-records" element={<TrackRecordsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
