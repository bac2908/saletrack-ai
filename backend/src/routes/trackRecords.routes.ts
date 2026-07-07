import { Router } from 'express';
import { createTrackRecord, getTrackRecords } from '../controllers/trackRecords.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { createTrackRecordSchema } from '../validators/trackRecords.validator';

const router = Router();

router.get('/', getTrackRecords);
router.post('/', validateRequest(createTrackRecordSchema), createTrackRecord);

export default router;
