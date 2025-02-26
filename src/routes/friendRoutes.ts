import { Router } from "express";
import { addFriend, removeFriend, getFriend, getAllFriends } from "../controllers/friendController.js";

const router: Router = Router();

// ✅ Retrieve all friends (global list)
router.get("/", getAllFriends);

// ✅ Retrieve a specific friend from a user's friend list
router.get("/get", getFriend);

// ✅ Add a friend without requiring userId
router.post("/add", addFriend);

// ✅ Remove a friend without requiring userId
router.delete("/remove", removeFriend);

export default router;
