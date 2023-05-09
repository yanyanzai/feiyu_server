import {Request, Response, NextFunction} from 'express';
import Skill, {SkillFields} from '../models/skill-model';
import {normalizeData, normalizeFields} from '../utils/normalize-utils';

const getAllSkills = (req: Request, res: Response, next: NextFunction) => {
  let fields: string[] = [];
  if (req.query.fields != null && typeof req.query.fields === 'string') {
    const maybeFields = req.query.fields.split(',');
    fields = normalizeFields(maybeFields, SkillFields);
  }

  let skillsQuery = Skill.find();
  if (fields.length !== 0) {
    skillsQuery = skillsQuery.select(fields);
  }

  skillsQuery
    .then((skills) => {
      res.status(200).json(skills);
    })
    .catch((err) => {
      next(err);
    });
};

const getSkillById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  let fields: string[] = [];
  if (req.query.fields != null && typeof req.query.fields === 'string') {
    const maybeFields = req.query.fields.split(',');
    fields = normalizeFields(maybeFields, SkillFields);
  }

  let skillQuery = Skill.findById(id);
  if (fields.length !== 0) {
    skillQuery = skillQuery.select(fields);
  }

  skillQuery
    .then((skill) => {
      res.status(200).json(skill);
    })
    .catch((err) => {
      next(err);
    });
};

const createSkill = (req: Request, res: Response, next: NextFunction) => {
  const skillData = normalizeData(req.body, SkillFields);
  const skill = new Skill(skillData);
  skill
    .save()
    .then(() => {
      res.status(201).json({message: 'Skill created successfully'});
    })
    .catch((err) => {
      next(err);
    });
};

const updateSkill = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const skillData = normalizeData(req.body, SkillFields);
  Skill.findByIdAndUpdate(id, skillData, {new: true})
    .then(() => {
      res.status(200).json({message: 'Skill updated successfully'});
    })
    .catch((err) => {
      next(err);
    });
};

const deleteSkill = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  Skill.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({message: 'Skill deleted successfully'});
    })
    .catch((err) => {
      next(err);
    });
};

export default {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};
