import { Router } from 'express';
const router = Router();
import { getUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:id/friends/:friendId
router.route('/:id/friends/:friendId').post(addFriend).delete(removeFriend);

export default router;