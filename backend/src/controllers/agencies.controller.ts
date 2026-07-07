import { agenciesService } from '../services/agencies.service';
import { asyncHandler } from '../utils/asyncHandler';
import { sendCreated, sendSuccess } from '../utils/response';

export const getAgencies = asyncHandler(async (req, res) => {
  sendSuccess(res, await agenciesService.findAll(req.query), 'Agencies retrieved successfully');
});

export const createAgency = asyncHandler(async (req, res) => {
  sendCreated(res, await agenciesService.create(req.body), 'Agency created successfully');
});

export const getAgencyById = asyncHandler(async (req, res) => {
  sendSuccess(res, await agenciesService.findById(Number(req.params.id)), 'Agency retrieved successfully');
});

export const updateAgency = asyncHandler(async (req, res) => {
  sendSuccess(res, await agenciesService.update(Number(req.params.id), req.body), 'Agency updated successfully');
});

export const deleteAgency = asyncHandler(async (req, res) => {
  sendSuccess(res, await agenciesService.remove(Number(req.params.id)), 'Agency deleted successfully');
});
