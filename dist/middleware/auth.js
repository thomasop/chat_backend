import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const { verify } = Jwt;
        const decodeToken = verify(token, process.env.SECRET_TOKEN);
        req.auth = { user: decodeToken.user };
        next();
    }
    catch (error) {
        res.status(401).json({ status: 400, errors: error });
    }
};
