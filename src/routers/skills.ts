import express, {Request, Response, NextFunction} from 'express';
import skillController from '../controllers/skill-controller';
import {SkillFields} from '../models/skill-model';
import {normalizeData, normalizeFields} from '../utils/normalize-utils';
import {processQuery, processCreateQuery} from '../utils/router-utils';

const router = express.Router();

router.get('/', getAllSkills);
router.get('/:id', getSkillById);
router.post('/', createSkill);
router.put('/:id', updateSkill);
router.delete('/:id', deleteSkill);

function getAllSkills(req: Request, res: Response, next: NextFunction): void {
  let fields: string[] = [];
  if (req.query.fields != null && typeof req.query.fields === 'string') {
    const maybeFields = req.query.fields.split(',');
    fields = normalizeFields(maybeFields, SkillFields);
  }

  const skillsQuery = skillController.getAllSkills(fields);
  processQuery(skillsQuery, res, next);
}

function getSkillById(req: Request, res: Response, next: NextFunction): void {
  const id = req.params.id;

  let fields: string[] = [];
  if (req.query.fields != null && typeof req.query.fields === 'string') {
    const maybeFields = req.query.fields.split(',');
    fields = normalizeFields(maybeFields, SkillFields);
  }

  const skillQuery = skillController.getSkillById(id, fields);
  processQuery(skillQuery, res, next);
}

function createSkill(req: Request, res: Response, next: NextFunction): void {
  const skillData = normalizeData(req.body, SkillFields);
  const query = skillController.createSkill(skillData);
  processCreateQuery(query, res, next);
}

function updateSkill(req: Request, res: Response, next: NextFunction): void {
  const id = req.params.id;
  const skillData = normalizeData(req.body, SkillFields);
  const query = skillController.updateSkill(id, skillData);
  processQuery(query, res, next);
}

function deleteSkill(req: Request, res: Response, next: NextFunction): void {
  const id = req.params.id;
  const query = skillController.deleteSkill(id);
  processQuery(query, res, next);
}

export default router;
