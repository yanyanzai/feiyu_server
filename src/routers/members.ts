import express, {Request, Response, NextFunction} from 'express';
import memberController from '../controllers/member-controller';
import {MemberFields} from '../models/member-model';
import {normalizeData, normalizeFields} from '../utils/normalize-utils';
import {processQuery, processCreateQuery} from '../utils/router-utils';

const router = express.Router();

router.get('/', getAllMembers);
router.get('/:id', getMemberById);
router.post('/', createMember);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

function getAllMembers(req: Request, res: Response, next: NextFunction): void {
  let fields: string[] = [];
  if (req.query.fields != null && typeof req.query.fields === 'string') {
    const maybeFields = req.query.fields.split(',');
    fields = normalizeFields(maybeFields, MemberFields);
  }

  const membersQuery = memberController.getAllMembers(fields);
  processQuery(membersQuery, res, next);
}

function getMemberById(req: Request, res: Response, next: NextFunction): void {
  const id = req.params.id;

  let fields: string[] = [];
  if (req.query.fields != null && typeof req.query.fields === 'string') {
    const maybeFields = req.query.fields.split(',');
    fields = normalizeFields(maybeFields, MemberFields);
  }

  const memberQuery = memberController.getMemberById(id, fields);
  processQuery(memberQuery, res, next);
}

function createMember(req: Request, res: Response, next: NextFunction): void {
  const memberData = normalizeData(req.body, MemberFields);
  const query = memberController.createMember(memberData);
  processCreateQuery(query, res, next);
}

function updateMember(req: Request, res: Response, next: NextFunction): void {
  const id = req.params.id;
  const memberData = normalizeData(req.body, MemberFields);
  const query = memberController.updateMember(id, memberData);
  processQuery(query, res, next);
}

function deleteMember(req: Request, res: Response, next: NextFunction): void {
  const id = req.params.id;
  const query = memberController.deleteMember(id);
  processQuery(query, res, next);
}

export default router;
