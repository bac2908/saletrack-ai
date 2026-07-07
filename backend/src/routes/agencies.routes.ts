import { Router } from 'express';
import { createAgency, getAgencies } from '../controllers/agencies.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { createAgencySchema } from '../validators/agencies.validator';

const router = Router();

router.get('/', getAgencies);
router.post('/', validateRequest(createAgencySchema), createAgency);

export default router;
