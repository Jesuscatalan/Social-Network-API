import {Router} from "express";
import userRoutes from "./userRoutes.js";
import thoughtRoutes from "./thoughtRoutes.js";
import reactionRoutes from "./reactionRoutes.js";
import friendRoutes from "./friendRoutes.js";

const router: Router = Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/reactions', reactionRoutes);
router.use('/friends', friendRoutes);

export default router;