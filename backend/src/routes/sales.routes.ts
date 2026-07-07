import { Router } from 'express';
import { createSale, getSales } from '../controllers/sales.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { createSaleSchema } from '../validators/sales.validator';

const router = Router();

router.get('/', getSales);
router.post('/', validateRequest(createSaleSchema), createSale);

export default router;
