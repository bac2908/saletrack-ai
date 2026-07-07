import { agenciesService } from '../services/agencies.service';
import { asyncHandler } from '../utils/asyncHandler';
import { sendCreated, sendSuccess } from '../utils/response';

export const getAgencies = asyncHandler(async (_req, res) => {
  sendSuccess(res, await agenciesService.findAll(), 'Agencies retrieved successfully');
});

export const createAgency = asyncHandler(async (req, res) => {
  sendCreated(res, await agenciesService.create(req.body), 'Agency created successfully');
});
