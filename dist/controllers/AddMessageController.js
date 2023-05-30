var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Conversation, Message } from "../models/Association.js";
import { validationResult } from "express-validator";
const AddMessageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error });
    }
    let content = req.body.content;
    let user = req.body.user;
    let conversation = req.body.conversation;
    const addMessage = yield Message.create({ content: content, userId: user, conversationId: conversation });
    const editConversation = yield Conversation.update({ last_message_id: addMessage.dataValues.id }, { where: { id: conversation } });
    if (addMessage === null && editConversation === null) {
        return res.status(400).json({ error: "Error message" });
    }
    else {
        res.status(200).json({ result: 'le message a était créé' });
    }
});
export default AddMessageController;
