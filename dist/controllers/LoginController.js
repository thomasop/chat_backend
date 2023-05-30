var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const generateAccessToken = (user) => {
    return jwt.sign({ mail: user }, process.env.SECRET_TOKEN);
};
const LoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    let email = req.body.email;
    const user = yield User.findOne({ where: { mail: email } });
    if (user === null) {
        res.status(400).json({ errors: "Mauvaise combinaison email/password" });
    }
    else {
        const compare = () => __awaiter(void 0, void 0, void 0, function* () {
            const comp = yield bcrypt.compare(req.body.password, user === null || user === void 0 ? void 0 : user.dataValues.password);
            if (comp == false) {
                return res.status(400).json({ errors: "Mauvaise combinaison email/password" });
            }
            else {
                const accessToken = generateAccessToken(req.body.email);
                const userLogin = { id: user.dataValues.id, firstname: user.dataValues.firstname, lastname: user.dataValues.lastname, mail: user.dataValues.mail };
                res.cookie('userId', user.dataValues.id, { secure: false, httpOnly: false });
                res.cookie('token', accessToken, { secure: false, httpOnly: false });
                return res.status(200).json({
                    user: userLogin,
                    accessToken: accessToken,
                });
            }
        });
        compare();
    }
});
export default LoginController;
