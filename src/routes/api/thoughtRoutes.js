import { Router } from 'express';
const router = Router();
import { getThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, deleteReaction } from '../../controllers/thoughtController.js';
import { add } from 'date-fns/fp';

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

router.route('/:id/reactions').post(addReaction);

router.route('/:id/reactions/:reactionId').delete(deleteReaction);

export default router;