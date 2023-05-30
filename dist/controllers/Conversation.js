var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Conversation, Message, User } from "../models/Association.js";
import { Op } from "sequelize";
import { validationResult } from "express-validator";
const Add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: "probleme" });
    }
    let content = req.body.content;
    let userId = req.body.userId;
    let userIdAdd = req.body.userIdAdd;
    const addConversation = yield Conversation.create({
        last_message_id: null,
        userOneId: userId,
        userTwoId: userIdAdd,
    });
    if (addConversation === null) {
        return res.status(400).json({ error: "La conversation n'a pas été créé" });
    }
    else {
        const addMessage = yield Message.create({
            content: content,
            conversationId: addConversation.dataValues.id,
            userId: userId,
        });
        if (addMessage === null) {
            return res.status(400).json({ error: "Le message n'a pas été créé" });
        }
        else {
            const editConversation = yield Conversation.update({ last_message_id: addMessage.dataValues.id }, {
                where: {
                    id: addConversation.dataValues.id,
                },
                returning: true,
            });
            if (editConversation === null) {
                return res
                    .status(400)
                    .json({ error: "La conversation n'a pas été modifié" });
            }
            else {
                const oneConversation = yield Conversation.findOne({
                    where: {
                        id: addConversation.dataValues.id,
                    },
                    include: [
                        {
                            model: User,
                            as: "userOneAsId",
                        },
                        {
                            model: User,
                            as: "userTwoAsId",
                        },
                        {
                            model: Message,
                            include: [
                                {
                                    model: User,
                                },
                            ],
                        },
                    ],
                });
                if (oneConversation === null) {
                    return res
                        .status(400)
                        .json({ error: "La conversation n'a pas été trouvé" });
                }
                else {
                    res.status(200).json({ result: oneConversation });
                }
            }
        }
    }
});
const All = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params || !req.params.id) {
        return res.status(400).send("no id");
    }
    if (/[0-9]+/.test(req.params.id)) {
        const getAllConversation = yield Conversation.findAll({
            where: {
                [Op.or]: [{ userOneId: req.params.id }, { userTwoId: req.params.id }],
            },
            include: [
                {
                    model: User,
                    as: "userOneAsId",
                },
                {
                    model: User,
                    as: "userTwoAsId",
                },
                {
                    model: Message,
                    include: [
                        {
                            model: User,
                        },
                    ],
                },
            ],
        });
        if (getAllConversation === null) {
            return res.status(400).json({ error: "error" });
        }
        else {
            res.status(200).json({ result: getAllConversation });
        }
    }
});
export { All, Add };
