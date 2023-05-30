import express from "express";
import { body } from "express-validator";
import { auth } from "../middleware/auth.js";
import AddMessageController from "../controllers/AddMessageController.js";
import GetAllMessageController from "../controllers/GetAllMessageController.js";
const messageRouter = express.Router();
messageRouter.get('/GetAllMessages/:id', auth, GetAllMessageController);
messageRouter.post('/addMessage', auth, body('content').notEmpty().escape(), AddMessageController);
export default messageRouter;
