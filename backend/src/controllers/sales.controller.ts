import { asyncHandler } from '../utils/asyncHandler';
import { sendCreated, sendSuccess } from '../utils/response';
import { salesService } from '../services/sales.service';

export const getSales = asyncHandler(async (_req, res) => {
  sendSuccess(res, await salesService.findAll(), 'Sales retrieved successfully');
});

export const createSale = asyncHandler(async (req, res) => {
  sendCreated(res, await salesService.create(req.body), 'Sale created successfully');
});
