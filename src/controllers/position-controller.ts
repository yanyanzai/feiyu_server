import type {Position as PositionType} from '../models/position-model';
import Position, {PositionFields} from '../models/position-model';

function getAllPositions(fields: string[]): Promise<PositionType[]> {
  let positionsQuery = Position.find();
  if (fields.length !== 0) {
    positionsQuery = positionsQuery.select(fields);
  }
  return positionsQuery;
}

function getPositionById(
  id: string,
  fields: string[]
): Promise<PositionType | null> {
  let positionQuery = Position.findById(id);
  if (fields.length !== 0) {
    positionQuery = positionQuery.select(fields);
  }
  return positionQuery;
}

function createPosition(positionData: {
  [key: string]: any;
}): Promise<PositionType> {
  const position = new Position(positionData);
  return position.save();
}

function updatePosition(
  id: string,
  positionData: {[key: string]: any}
): Promise<PositionType | null> {
  return Position.findByIdAndUpdate(id, positionData, {new: true});
}

function deletePosition(id: string): Promise<null> {
  return Position.findByIdAndDelete(id);
}

export default {
  getAllPositions,
  getPositionById,
  createPosition,
  updatePosition,
  deletePosition,
};
