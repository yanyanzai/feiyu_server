import mongoose, {Types} from 'mongoose';

const Schema = mongoose.Schema;

export type Position = {
  name: string;
  production: Types.ObjectId;
  skill?: Types.ObjectId;
  members?: Types.ObjectId[];
};
export const PositionFields = ['name', 'production', 'skill', 'members'];

const positionSchema = new Schema({
  name: {type: String, required: true},
  production: {type: Schema.Types.ObjectId, ref: 'Production', required: true},
  skill: {type: Schema.Types.ObjectId, ref: 'Skill'},
  members: [{type: Schema.Types.ObjectId, ref: 'Member'}],
});

const Position = mongoose.model('Position', positionSchema);

export default Position;
