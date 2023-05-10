import {Request, Response, NextFunction} from 'express';
import Position, {PositionFields} from '../models/position-model';
import {normalizeData, normalizeFields} from '../utils/normalize-utils';

const getAllPositions = (req: Request, res: Response, next: NextFunction) => {
  let fields: string[] = [];
  if (req.query.fields != null && typeof req.query.fields === 'string') {
    const maybeFields = req.query.fields.split(',');
    fields = normalizeFields(maybeFields, PositionFields);
  }

  let positionsQuery = Position.find();
  if (fields.length !== 0) {
    positionsQuery = positionsQuery.select(fields);
  }

  positionsQuery
    .then((positions) => {
      res.status(200).json(positions);
    })
    .catch((err) => {
      next(err);
    });
};

const getPositionById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  let fields: string[] = [];
  if (req.query.fields != null && typeof req.query.fields === 'string') {
    const maybeFields = req.query.fields.split(',');
    fields = normalizeFields(maybeFields, PositionFields);
  }

  let positionQuery = Position.findById(id);
  if (fields.length !== 0) {
    positionQuery = positionQuery.select(fields);
  }

  positionQuery
    .then((position) => {
      res.status(200).json(position);
    })
    .catch((err) => {
      next(err);
    });
};

const createPosition = (req: Request, res: Response, next: NextFunction) => {
  const positionData = normalizeData(req.body, PositionFields);
  const position = new Position(positionData);
  position
    .save()
    .then(() => {
      res.status(201).json({message: 'Position created successfully'});
    })
    .catch((err) => {
      next(err);
    });
};

const updatePosition = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const positionData = normalizeData(req.body, PositionFields);
  Position.findByIdAndUpdate(id, positionData, {new: true})
    .then(() => {
      res.status(200).json({message: 'Position updated successfully'});
    })
    .catch((err) => {
      next(err);
    });
};

const deletePosition = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  Position.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({message: 'Position deleted successfully'});
    })
    .catch((err) => {
      next(err);
    });
};

export default {
  getAllPositions,
  getPositionById,
  createPosition,
  updatePosition,
  deletePosition,
};
