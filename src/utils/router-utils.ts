import {Request, Response, NextFunction} from 'express';

export function processQuery<T>(
  query: Promise<T>,
  res: Response,
  next: NextFunction
): void {
  query
    .then((results: T) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      next(err);
    });
}

export function processCreateQuery<T>(
  query: Promise<T>,
  res: Response,
  next: NextFunction
): void {
  query
    .then((results: T) => {
      res.status(201).json(results);
    })
    .catch((err) => {
      next(err);
    });
}
