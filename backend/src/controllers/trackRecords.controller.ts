import { trackRecordsService } from '../services/trackRecords.service';
import { asyncHandler } from '../utils/asyncHandler';
import { sendCreated, sendSuccess } from '../utils/response';

export const getTrackRecords = asyncHandler(async (req, res) => {
  sendSuccess(res, await trackRecordsService.findAll(req.query), 'Track records retrieved successfully');
});

export const createTrackRecord = asyncHandler(async (req, res) => {
  sendCreated(res, await trackRecordsService.create(req.body), 'Track record created successfully');
});

export const getTrackRecordById = asyncHandler(async (req, res) => {
  sendSuccess(res, await trackRecordsService.findById(Number(req.params.id)), 'Track record retrieved successfully');
});

export const updateTrackRecord = asyncHandler(async (req, res) => {
  sendSuccess(
    res,
    await trackRecordsService.update(Number(req.params.id), req.body),
    'Track record updated successfully',
  );
});

export const deleteTrackRecord = asyncHandler(async (req, res) => {
  sendSuccess(res, await trackRecordsService.remove(Number(req.params.id)), 'Track record deleted successfully');
});
