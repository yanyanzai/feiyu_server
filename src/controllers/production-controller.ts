import type {Production as ProductionType} from '../models/production-model';
import Production, {ProductionFields} from '../models/production-model';

function getAllProductions(fields: string[]): Promise<ProductionType[]> {
  let productionsQuery = Production.find();
  if (fields.length !== 0) {
    productionsQuery = productionsQuery.select(fields);
  }
  return productionsQuery;
}

function getProductionById(
  id: string,
  fields: string[]
): Promise<ProductionType | null> {
  let productionQuery = Production.findById(id);
  if (fields.length !== 0) {
    productionQuery = productionQuery.select(fields);
  }
  return productionQuery;
}

function createProduction(productionData: {
  [key: string]: any;
}): Promise<ProductionType> {
  const production = new Production(productionData);
  return production.save();
}

function updateProduction(
  id: string,
  productionData: {[key: string]: any}
): Promise<ProductionType | null> {
  return Production.findByIdAndUpdate(id, productionData, {new: true});
}

function deleteProduction(id: string): Promise<null> {
  return Production.findByIdAndDelete(id);
}

export default {
  getAllProductions,
  getProductionById,
  createProduction,
  updateProduction,
  deleteProduction,
};
