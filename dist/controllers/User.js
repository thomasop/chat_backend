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
import dotenv from "dotenv";
dotenv.config();
const generateAccessToken = (user) => {
    return jwt.sign({ mail: user }, process.env.SECRET_TOKEN);
};
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                return res
                    .status(400)
                    .json({ errors: "Mauvaise combinaison email/password" });
            }
            else {
                const updateUser = yield User.update({ status: true }, {
                    where: {
                        id: user.dataValues.id,
                    },
                });
                const accessToken = generateAccessToken(req.body.email);
                const userLogin = {
                    id: user.dataValues.id,
                    firstname: user.dataValues.firstname,
                    lastname: user.dataValues.lastname,
                    mail: user.dataValues.mail,
                };
                var expiryDate = new Date();
                expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                res.cookie("userId", user.dataValues.id, {
                    expires: expiryDate,
                    secure: false,
                    httpOnly: false,
                    path: "/",
                });
                res.cookie("token", accessToken, {
                    expires: expiryDate,
                    secure: false,
                    httpOnly: false,
                    path: "/",
                });
                return res.status(200).json({
                    user: userLogin,
                    accessToken: accessToken,
                });
            }
        });
        compare();
    }
});
const All = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const AllUsers = yield User.findAll({});
    if (AllUsers == null) {
        return res.status(400).json({ error: "No user find" });
    }
    else {
        res.status(200).json({ results: AllUsers });
    }
});
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.body.userId;
    const updateUser = yield User.update({ status: false }, {
        where: {
            id: userId,
        },
    });
    res.clearCookie("userId", {
        maxAge: 0,
        secure: false,
        httpOnly: false,
        path: "/",
        expires: new Date(0),
    });
    res.clearCookie("token", {
        maxAge: 0,
        secure: false,
        httpOnly: false,
        path: "/",
        expires: new Date(0),
    });
    res.json({ result: "test" });
});
export { Login, All, Logout };
