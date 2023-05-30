import express from "express";
import { body } from "express-validator";
import LoginController from "../controllers/LoginController.js";
const loginRouter = express.Router();
//const Login = (app: express.Application) => {
loginRouter.post('/', body('email').notEmpty().isEmail().escape().withMessage("Email : need to be have this format 'mail@mail.com'"), body('password').notEmpty().escape().isLength({ min: 4 }).withMessage("Password : min length need to be 4"), (req, res) => {
    LoginController(req, res);
});
export default loginRouter;
