var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User, Message } from "../models/Association.js";
const GetAllMessageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id || !req.params) {
        return res.status(400).json({ errors: "No id param find" });
    }
    if (/[0-9]+/.test(req.params.id)) {
        const message = yield Message.findAll({ where: { conversationId: req.params.id },
            include: {
                model: User
            }
        });
        if (message == null) {
            return res.status(400).json({ errors: "No message find" });
        }
        else {
            res.status(200).json({ result: message });
        }
    }
});
export default GetAllMessageController;
