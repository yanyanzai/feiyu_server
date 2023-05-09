import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type Skill = {
  name: string;
  description?: string;
};
export const SkillFields = ['name', 'description'];

const skillSchema = new Schema({
  name: {type: String, required: true},
  description: String,
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
