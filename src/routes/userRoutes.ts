import {Router} from 'express';
import { getUser,
         getAllUsers,
         createUser,
         updateUser,
         deleteUser,
         deleteAllUsers} from '../controllers/userController.js';

const router: Router = Router();

router.get('/', getAllUsers);

router.get('/:id', getUser);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.delete('/', deleteAllUsers);

export default router;