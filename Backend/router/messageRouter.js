import express from "express"
import { deliverMessage, getAllMessages } from "../controller/messageController.js";
import { adminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", deliverMessage);
router.get("/admin/get-all-messages",adminAuthenticated,getAllMessages)

export default router;