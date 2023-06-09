import type {Member as MemberType} from '../models/member-model';
import Member from '../models/member-model';

function getAllMembers(fields: string[]): Promise<MemberType[]> {
  let membersQuery = Member.find();
  if (fields.length !== 0) {
    membersQuery = membersQuery.select(fields);
  }
  return membersQuery;
}

function getMemberById(
  id: string,
  fields: string[]
): Promise<MemberType | null> {
  let memberQuery = Member.findById(id);
  if (fields.length !== 0) {
    memberQuery = memberQuery.select(fields);
  }
  return memberQuery;
}

function createMember(memberData: {[key: string]: any}): Promise<MemberType> {
  const member = new Member(memberData);
  return member.save();
}

function updateMember(
  id: string,
  memberData: {[key: string]: any}
): Promise<MemberType | null> {
  return Member.findByIdAndUpdate(id, memberData, {new: true});
}

function deleteMember(id: string): Promise<null> {
  return Member.findByIdAndDelete(id);
}

export default {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
