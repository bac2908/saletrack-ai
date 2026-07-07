import { dashboardService } from '../services/dashboard.service';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/response';

export const getDashboardStats = asyncHandler(async (_req, res) => {
  sendSuccess(res, await dashboardService.getStats(), 'Dashboard stats retrieved successfully');
});
