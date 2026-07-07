import cors from 'cors';
import express from 'express';
import agenciesRoutes from './routes/agencies.routes';
import dashboardRoutes from './routes/dashboard.routes';
import salesRoutes from './routes/sales.routes';
import trackRecordsRoutes from './routes/trackRecords.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'SaleTrack AI backend is running',
  });
});

app.use('/api/sales', salesRoutes);
app.use('/api/agencies', agenciesRoutes);
app.use('/api/track-records', trackRecordsRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use(errorHandler);

export default app;
