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
const FIELDS = [
  'preferredName',
  'isActive',
  'memberSince',
  'legalName',
  'email',
  'phone',
  'birthday',
];

export function normalizeFields(maybeFields: string[]): string[] {
  return maybeFields.filter((maybeField) => FIELDS.includes(maybeField));
}

export function normalizeData(maybeData: {[key: string]: any}): {
  [key: string]: any;
} {
  const entries = Object.entries(maybeData).filter(([maybeField, _]) =>
    FIELDS.includes(maybeField)
  );
  return Object.fromEntries(entries);
}

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
