import type {MemberFields} from '../models/member-model';

import {Request, Response, NextFunction} from 'express';
import Member from '../models/member-model';

const getAllMembers = (req: Request, res: Response, next: NextFunction) => {
  if (req.query.fields != null) {
    console.log(req.query.fields);
    // if (typeof req.query.fields )
  }
  Member.find()
    .then((members) => {
      res.status(200).json(members);
    })
    .catch((err) => {
      next(err);
    });
};

const getMemberById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  Member.findById(id)
    .then((member) => {
      res.status(200).json(member);
    })
    .catch((err) => {
      next(err);
    });
};

const createMember = (req: Request, res: Response, next: NextFunction) => {
  //const {preferredName, legalName, email, phone, birthday} = req.body;
  //Object.entries(req.body).filter(([key, value]) => {return key is MemberFields;});
  //const data = 0;
  console.log(req.body);
  const member = new Member(req.body);
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
  // const {preferredName, legalName, email, phone, birthday} = req.body;
  Member.findByIdAndUpdate(id, req.body, {new: true})
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
