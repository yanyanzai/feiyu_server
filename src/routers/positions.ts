import express from 'express';
import positionController from '../controllers/position-controller';

const router = express.Router();

router.get('/', positionController.getAllPositions);
router.get('/:id', positionController.getPositionById);
router.post('/', positionController.createPosition);
router.put('/:id', positionController.updatePosition);
router.delete('/:id', positionController.deletePosition);

export default router;
