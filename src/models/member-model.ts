import mongoose, {Types} from 'mongoose';

const Schema = mongoose.Schema;

export type Member = {
  preferredName: string;
  isActive: boolean;
  memberSince: Date;
  legalName?: string;
  email?: string;
  phone?: string;
  birthday?: Date;
  hobbies?: string;
  positions?: Types.ObjectId[];
};
export const MemberFields = [
  'preferredName',
  'isActive',
  'memberSince',
  'legalName',
  'email',
  'phone',
  'birthday',
  'hobbies',
  'positions',
];

const memberSchema = new Schema({
  preferredName: {type: String, required: true},
  isActive: {type: Boolean, required: true},
  memberSince: {type: Date, required: true},
  legalName: String,
  email: String,
  phone: String,
  birthday: Date,
  hobbies: String,
  positions: [{type: Schema.Types.ObjectId, ref: 'Position'}],
});

const Member = mongoose.model('Member', memberSchema);

export default Member;
