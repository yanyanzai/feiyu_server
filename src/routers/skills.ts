import express from 'express';
import skillController from '../controllers/skill-controller';

const router = express.Router();

router.get('/', skillController.getAllSkills);
router.get('/:id', skillController.getSkillById);
router.post('/', skillController.createSkill);
router.put('/:id', skillController.updateSkill);
router.delete('/:id', skillController.deleteSkill);

export default router;
