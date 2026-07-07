import { Router } from 'express';
import { createSale, deleteSale, getSaleById, getSales, updateSale } from '../controllers/sales.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { createSaleSchema, idParamSchema, updateSaleSchema } from '../validators/sales.validator';

const router = Router();

router.get('/', getSales);
router.post('/', validateRequest(createSaleSchema), createSale);
router.get('/:id', validateRequest(idParamSchema), getSaleById);
router.put('/:id', validateRequest(updateSaleSchema), updateSale);
router.delete('/:id', validateRequest(idParamSchema), deleteSale);

export default router;
