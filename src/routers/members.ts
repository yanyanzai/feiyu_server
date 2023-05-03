import express from 'express';
import memberController from '../controllers/member-controller';

const router = express.Router();

router.get(
  '/',
  (req, res) => {
    res.send('getAllMembers');
  }
  //memberController.getAllMembers
);
router.get(
  '/:id',
  (req, res) => {
    const id = req.params.id;
    res.send('getMemberById:' + id);
  }
  //memberController.getMemberById
);
router.post('/', memberController.createMember);
router.put('/:id', memberController.updateMember);
router.delete('/:id', memberController.deleteMember);

export default router;
