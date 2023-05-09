import {Request, Response, NextFunction} from 'express';
import Production, {ProductionFields} from '../models/production-model';
import {normalizeData, normalizeFields} from '../utils/normalize-utils';

const getAllProductions = (req: Request, res: Response, next: NextFunction) => {
  let fields: string[] = [];
  if (req.query.fields != null && typeof req.query.fields === 'string') {
    const maybeFields = req.query.fields.split(',');
    fields = normalizeFields(maybeFields, ProductionFields);
  }

  let productionsQuery = Production.find();
  if (fields.length !== 0) {
    productionsQuery = productionsQuery.select(fields);
  }

  productionsQuery
    .then((productions) => {
      res.status(200).json(productions);
    })
    .catch((err) => {
      next(err);
    });
};

const getProductionById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  let fields: string[] = [];
  if (req.query.fields != null && typeof req.query.fields === 'string') {
    const maybeFields = req.query.fields.split(',');
    fields = normalizeFields(maybeFields, ProductionFields);
  }

  let productionQuery = Production.findById(id);
  if (fields.length !== 0) {
    productionQuery = productionQuery.select(fields);
  }

  productionQuery
    .then((production) => {
      res.status(200).json(production);
    })
    .catch((err) => {
      next(err);
    });
};

const createProduction = (req: Request, res: Response, next: NextFunction) => {
  const productionData = normalizeData(req.body, ProductionFields);
  const production = new Production(productionData);
  production
    .save()
    .then(() => {
      res.status(201).json({message: 'Production created successfully'});
    })
    .catch((err) => {
      next(err);
    });
};

const updateProduction = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const productionData = normalizeData(req.body, ProductionFields);
  Production.findByIdAndUpdate(id, productionData, {new: true})
    .then(() => {
      res.status(200).json({message: 'Production updated successfully'});
    })
    .catch((err) => {
      next(err);
    });
};

const deleteProduction = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  Production.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({message: 'Production deleted successfully'});
    })
    .catch((err) => {
      next(err);
    });
};

export default {
  getAllProductions,
  getProductionById,
  createProduction,
  updateProduction,
  deleteProduction,
};
