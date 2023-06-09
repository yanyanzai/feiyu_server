import express, {Request, Response, NextFunction} from 'express';
import productionController from '../controllers/production-controller';
import {ProductionFields} from '../models/production-model';
import {normalizeData, normalizeFields} from '../utils/normalize-utils';
import {processQuery, processCreateQuery} from '../utils/router-utils';

const router = express.Router();

router.get('/', getAllProductions);
router.get('/:id', getProductionById);
router.post('/', createProduction);
router.put('/:id', updateProduction);
router.delete('/:id', deleteProduction);

function getAllProductions(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let fields: string[] = [];
  if (req.query.fields != null && typeof req.query.fields === 'string') {
    const maybeFields = req.query.fields.split(',');
    fields = normalizeFields(maybeFields, ProductionFields);
  }

  const productionsQuery = productionController.getAllProductions(fields);
  processQuery(productionsQuery, res, next);
}

function getProductionById(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const id = req.params.id;

  let fields: string[] = [];
  if (req.query.fields != null && typeof req.query.fields === 'string') {
    const maybeFields = req.query.fields.split(',');
    fields = normalizeFields(maybeFields, ProductionFields);
  }

  const productionQuery = productionController.getProductionById(id, fields);
  processQuery(productionQuery, res, next);
}

function createProduction(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const productionData = normalizeData(req.body, ProductionFields);
  const query = productionController.createProduction(productionData);
  processCreateQuery(query, res, next);
}

function updateProduction(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const id = req.params.id;
  const productionData = normalizeData(req.body, ProductionFields);
  const query = productionController.updateProduction(id, productionData);
  processQuery(query, res, next);
}

function deleteProduction(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const id = req.params.id;
  const query = productionController.deleteProduction(id);
  processQuery(query, res, next);
}

export default router;
