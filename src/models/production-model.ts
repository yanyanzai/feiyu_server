import mongoose, {Types} from 'mongoose';

const Schema = mongoose.Schema;

export type Production = {
  name: string;
  description?: string;
  date: Date;
  cast: Types.ObjectId[];
  crew: Types.ObjectId[];
};
export const ProductionFields = ['name', 'description', 'date', 'cast', 'crew'];

const productionSchema = new Schema({
  name: {type: String, required: true},
  description: String,
  date: {type: Date, required: true},
  cast: [{type: Schema.Types.ObjectId, ref: 'Position'}],
  crew: [{type: Schema.Types.ObjectId, ref: 'Position'}],
});

const Production = mongoose.model('Production', productionSchema);

export default Production;
