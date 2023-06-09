import express, {Request, Response, NextFunction} from 'express';
import positionController from '../controllers/position-controller';
import {PositionFields} from '../models/position-model';
import {normalizeData, normalizeFields} from '../utils/normalize-utils';
import {processQuery, processCreateQuery} from '../utils/router-utils';

const router = express.Router();

router.get('/', getAllPositions);
router.get('/:id', getPositionById);
router.post('/', createPosition);
router.put('/:id', updatePosition);
router.delete('/:id', deletePosition);

function getAllPositions(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let fields: string[] = [];
  if (req.query.fields != null && typeof req.query.fields === 'string') {
    const maybeFields = req.query.fields.split(',');
    fields = normalizeFields(maybeFields, PositionFields);
  }

  const positionsQuery = positionController.getAllPositions(fields);
  processQuery(positionsQuery, res, next);
}

function getPositionById(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const id = req.params.id;

  let fields: string[] = [];
  if (req.query.fields != null && typeof req.query.fields === 'string') {
    const maybeFields = req.query.fields.split(',');
    fields = normalizeFields(maybeFields, PositionFields);
  }

  const positionQuery = positionController.getPositionById(id, fields);
  processQuery(positionQuery, res, next);
}

function createPosition(req: Request, res: Response, next: NextFunction): void {
  const positionData = normalizeData(req.body, PositionFields);
  const query = positionController.createPosition(positionData);
  processCreateQuery(query, res, next);
}

function updatePosition(req: Request, res: Response, next: NextFunction): void {
  const id = req.params.id;
  const positionData = normalizeData(req.body, PositionFields);
  const query = positionController.updatePosition(id, positionData);
  processQuery(query, res, next);
}

function deletePosition(req: Request, res: Response, next: NextFunction): void {
  const id = req.params.id;
  const query = positionController.deletePosition(id);
  processQuery(query, res, next);
}

export default router;
