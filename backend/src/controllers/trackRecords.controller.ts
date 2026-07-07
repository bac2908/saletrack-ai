import { trackRecordsService } from '../services/trackRecords.service';
import { asyncHandler } from '../utils/asyncHandler';
import { sendCreated, sendSuccess } from '../utils/response';

export const getTrackRecords = asyncHandler(async (_req, res) => {
  sendSuccess(res, await trackRecordsService.findAll(), 'Track records retrieved successfully');
});

export const createTrackRecord = asyncHandler(async (req, res) => {
  sendCreated(res, await trackRecordsService.create(req.body), 'Track record created successfully');
});
