var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Op } from 'sequelize';
import { Conversation, Message, User } from "../models/Association.js";
const GetAllConversationByUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params || !req.params.id) {
        return res.status(400).send("no id");
    }
    if (/[0-9]+/.test(req.params.id)) {
        const getAllConversation = yield Conversation.findAll({
            where: {
                [Op.or]: [
                    { userOneId: req.params.id },
                    { userTwoId: req.params.id },
                ]
            },
            include: [{
                    model: User,
                    as: 'userOneAsId'
                },
                {
                    model: User,
                    as: 'userTwoAsId'
                },
                {
                    model: Message,
                    include: [{
                            model: User
                        }]
                }
            ]
        });
        if (getAllConversation === null) {
            return res.status(400).json({ error: "error" });
        }
        else {
            res.status(200).json({ result: getAllConversation });
        }
    }
});
export default GetAllConversationByUserController;
