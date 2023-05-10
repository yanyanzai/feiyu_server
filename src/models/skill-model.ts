import mongoose, {Types} from 'mongoose';

const Schema = mongoose.Schema;

export type Skill = {
  name: string;
  description?: string;
  positions?: Types.ObjectId[];
};
export const SkillFields = ['name', 'description'];

const skillSchema = new Schema({
  name: {type: String, required: true},
  description: String,
  positions: [{type: Schema.Types.ObjectId, ref: 'Position'}],
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
