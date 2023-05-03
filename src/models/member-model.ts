import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IMember {
  preferredName: string;
  legalName?: string;
  email?: string;
  phone?: string;
  birthday?: Date;
}

const memberSchema = new Schema({
  preferredName: { type: String, required: true },
  legalName: String,
  email: String,
  phone: String,
  birthday: Date,
});

const Member = mongoose.model("Member", memberSchema);

export default Member;
