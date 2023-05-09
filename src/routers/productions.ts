import express from 'express';
import productionController from '../controllers/production-controller';

const router = express.Router();

router.get('/', productionController.getAllProductions);
router.get('/:id', productionController.getProductionById);
router.post('/', productionController.createProduction);
router.put('/:id', productionController.updateProduction);
router.delete('/:id', productionController.deleteProduction);

export default router;
