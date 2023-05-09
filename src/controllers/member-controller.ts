import {Request, Response, NextFunction} from 'express';
import Member, {normalizeFields, normalizeData} from '../models/member-model';

const getAllMembers = (req: Request, res: Response, next: NextFunction) => {
  let fields: string[] = [];
  if (req.query.fields != null && typeof req.query.fields === 'string') {
    const maybeFields = req.query.fields.split(',');
    fields = normalizeFields(maybeFields);
  }

  let membersQuery = Member.find();
  if (fields.length !== 0) {
    membersQuery = membersQuery.select(fields);
  }

  membersQuery
    .then((members) => {
      res.status(200).json(members);
    })
    .catch((err) => {
      next(err);
    });
};

const getMemberById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  let fields: string[] = [];
  if (req.query.fields != null && typeof req.query.fields === 'string') {
    const maybeFields = req.query.fields.split(',');
    fields = normalizeFields(maybeFields);
  }

  let memberQuery = Member.findById(id);
  if (fields.length !== 0) {
    memberQuery = memberQuery.select(fields);
  }

  memberQuery
    .then((member) => {
      res.status(200).json(member);
    })
    .catch((err) => {
      next(err);
    });
};

const createMember = (req: Request, res: Response, next: NextFunction) => {
  const memberData = normalizeData(req.body);
  const member = new Member(memberData);
  member
    .save()
    .then(() => {
      res.status(201).json({message: 'Member created successfully'});
    })
    .catch((err) => {
      next(err);
    });
};

const updateMember = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const memberData = normalizeData(req.body);
  Member.findByIdAndUpdate(id, memberData, {new: true})
    .then(() => {
      res.status(200).json({message: 'Member updated successfully'});
    })
    .catch((err) => {
      next(err);
    });
};

const deleteMember = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  Member.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({message: 'Member deleted successfully'});
    })
    .catch((err) => {
      next(err);
    });
};

export default {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
