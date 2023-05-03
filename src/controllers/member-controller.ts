import { Request, Response, NextFunction } from "express";
import Member from "../models/member-model";

exports.getAllMembers = (req: Request, res: Response, next: NextFunction) => {
  Member.find()
    .then((members) => {
      res.status(200).json(members);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getMemberById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  Member.findById(id)
    .then((member) => {
      res.status(200).json(member);
    })
    .catch((err) => {
      next(err);
    });
};

exports.createMember = (req: Request, res: Response, next: NextFunction) => {
  const { preferredName, legalName, email, phone, birthday } = req.body;
  const member = new Member({
    preferredName,
    legalName,
    email,
    phone,
    birthday,
  });
  member
    .save()
    .then(() => {
      res.status(201).json({ message: "Member created successfully" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateMember = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { preferredName, legalName, email, phone, birthday } = req.body;
  Member.findByIdAndUpdate(
    id,
    {
      preferredName,
      legalName,
      email,
      phone,
      birthday,
    },
    { new: true }
  )
    .then(() => {
      res.status(200).json({ message: "Member updated successfully" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteMember = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  Member.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: "Member deleted successfully" });
    })
    .catch((err) => {
      next(err);
    });
};
