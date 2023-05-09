import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type Member = {
  preferredName: string;
  isActive: boolean;
  memberSince: Date;
  legalName?: string;
  email?: string;
  phone?: string;
  birthday?: Date;
};

export type MemberFields = keyof Member;

// export normalizeMemberData()

const memberSchema = new Schema({
  preferredName: {type: String, required: true},
  isActive: {type: Boolean, required: true},
  memberSince: {type: Date, required: true},
  legalName: String,
  email: String,
  phone: String,
  birthday: Date,
});

const Member = mongoose.model('Member', memberSchema);

export default Member;
