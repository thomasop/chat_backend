var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Conversation } from "../models/Association.js";
const AddConversationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let content = req.body.content;
    let date = req.body.date;
    let userId = req.body.userId;
    const addConversation = yield Conversation.create({ last_message_id: null, userOneId: userId, userTwoId: userId });
    console.log(addConversation);
    console.log("addConversation");
    /* connect.query("SELECT max(id) FROM conversation", {
        type: QueryTypes.SELECT
    })
    .then((result) => {
        let e: any[] = []
        Object.entries(result[0]).map((p) => e.push(p));
        //const addMessage = async () => {await Message.create({userId: userId, content: content, conversationId: e[0][1], new: true})}
        connect.query("INSERT INTO message (userId, content, conversationId, new) VALUES(:userId, :content, :conversationId, :new)", {
            type: QueryTypes.INSERT,
            replacements: {
                userId: userId,
                content: content,
                conversationId: e[0][1],
                new: true,
            }
        })
        
        .then((results) => {
            connect.query("SELECT id, conversationId FROM message WHERE userId = :id ORDER BY id DESC LIMIT 1", {
                type: QueryTypes.SELECT,
                replacements: { id: userId }
            })
            .then((result: any) => {
                console.log(result)
                connect.query("UPDATE conversation SET last_message_id = :message WHERE id = :id", {
                    type: QueryTypes.UPDATE,
                    replacements: {
                        message: result[0].id,
                        id: result[0].conversationId
                    },
                    mapToModel: true,
                    model: Conversation
                })
                res.json(result[0].conversationId)
            })
            .catch((error) => console.log(error))
        })
        .catch((error) => res.json(error))
    })
    .catch((error) => res.json(error)) */
});
export default AddConversationController;
