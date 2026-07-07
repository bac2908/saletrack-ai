import { Router } from 'express';
import {
  createTrackRecord,
  deleteTrackRecord,
  getTrackRecordById,
  getTrackRecords,
  updateTrackRecord,
} from '../controllers/trackRecords.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { createTrackRecordSchema, idParamSchema, updateTrackRecordSchema } from '../validators/trackRecords.validator';

const router = Router();

router.get('/', getTrackRecords);
router.post('/', validateRequest(createTrackRecordSchema), createTrackRecord);
router.get('/:id', validateRequest(idParamSchema), getTrackRecordById);
router.put('/:id', validateRequest(updateTrackRecordSchema), updateTrackRecord);
router.delete('/:id', validateRequest(idParamSchema), deleteTrackRecord);

export default router;
