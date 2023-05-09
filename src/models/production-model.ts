import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type Production = {
  name: string;
  description?: string;
  date: Date;
  // cast: {character: string, members: string[]}[];
  // crew: {role: string, members: string[]}[];
};
export const ProductionFields = ['name', 'description', 'date', 'cast', 'crew'];

const productionSchema = new Schema({
  name: {type: String, required: true},
  description: String,
  date: {type: Date, required: true},
  // cast: [{character: String, members: [String]}],
  // crew: [{role: String, members: [String]}],
});

const Production = mongoose.model('Production', productionSchema);

export default Production;
