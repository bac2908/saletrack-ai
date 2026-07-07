import { Router } from 'express';
import { createAgency, deleteAgency, getAgencies, getAgencyById, updateAgency } from '../controllers/agencies.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { createAgencySchema, idParamSchema, updateAgencySchema } from '../validators/agencies.validator';

const router = Router();

router.get('/', getAgencies);
router.post('/', validateRequest(createAgencySchema), createAgency);
router.get('/:id', validateRequest(idParamSchema), getAgencyById);
router.put('/:id', validateRequest(updateAgencySchema), updateAgency);
router.delete('/:id', validateRequest(idParamSchema), deleteAgency);

export default router;
