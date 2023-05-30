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
import { validationResult } from "express-validator";
const Add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error });
    }
    let content = req.body.content;
    let user = req.body.user;
    let conversation = req.body.conversation;
    const addMessage = yield Message.create({
        content: content,
        userId: user,
        conversationId: conversation,
    });
    const editConversation = yield Conversation.update({ last_message_id: addMessage.dataValues.id }, { where: { id: conversation } });
    if (addMessage === null && editConversation === null) {
        return res.status(400).json({ error: "Error message" });
    }
    else {
        const findOne = yield Message.findOne({
            where: { id: addMessage.dataValues.id },
            include: {
                model: User,
            },
        });
        if (findOne === null) {
            return res.status(400).json({ error: "Error message" });
        }
        else {
            res.status(200).json({ result: findOne });
        }
    }
});
const All = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id || !req.params) {
        return res.status(400).json({ errors: "No id param find" });
    }
    if (/[0-9]+/.test(req.params.id)) {
        const message = yield Message.findAll({
            where: { conversationId: req.params.id },
            include: {
                model: User,
            },
        });
        if (message == null) {
            return res.status(400).json({ errors: "No message find" });
        }
        else {
            res.status(200).json({ result: message });
        }
    }
});
const Edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("eeeee");
    if (!req.params.conversationId || !req.params.otherIdUser || !req.params) {
        return res.status(400).json({ errors: "No id param find" });
    }
    if (/[0-9]+/.test(req.params.conversationId) &&
        /[0-9]+/.test(req.params.otherIdUser)) {
        const selectAllNewMessages = yield Message.findAll({
            where: {
                userId: req.params.otherIdUser,
                conversationId: req.params.conversationId,
                new: true,
            },
        });
        if (selectAllNewMessages === null) {
            return res
                .status(400)
                .json({ error: "Aucun nouveau message n'a pas été trouvé" });
        }
        else {
            const editMessage = yield Message.update({ new: false }, {
                where: {
                    userId: req.params.otherIdUser,
                    conversationId: req.params.conversationId,
                },
            });
            res.status(200).json({ result: selectAllNewMessages });
        }
    }
});
export { Add, All, Edit };
