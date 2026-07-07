import { asyncHandler } from '../utils/asyncHandler';
import { sendCreated, sendSuccess } from '../utils/response';
import { salesService } from '../services/sales.service';

export const getSales = asyncHandler(async (req, res) => {
  sendSuccess(res, await salesService.findAll(req.query), 'Sales retrieved successfully');
});

export const createSale = asyncHandler(async (req, res) => {
  sendCreated(res, await salesService.create(req.body), 'Sale created successfully');
});

export const getSaleById = asyncHandler(async (req, res) => {
  sendSuccess(res, await salesService.findById(Number(req.params.id)), 'Sale retrieved successfully');
});

export const updateSale = asyncHandler(async (req, res) => {
  sendSuccess(res, await salesService.update(Number(req.params.id), req.body), 'Sale updated successfully');
});

export const deleteSale = asyncHandler(async (req, res) => {
  sendSuccess(res, await salesService.remove(Number(req.params.id)), 'Sale deleted successfully');
});
