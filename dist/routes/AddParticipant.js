import { QueryTypes } from "sequelize";
const AddParticipant = (app, connect) => {
    app.post("/AddParticipant", (req, res) => {
        let user = req.body.user;
        let conversation = req.body.conversation;
        connect.query("INSERT INTO participant (userId, conversationId) VALUES (:user, :conversation)", {
            type: QueryTypes.INSERT,
            replacements: {
                user: user,
                conversation: conversation
            }
        })
            .then((result) => { console.log(result); })
            .catch((error) => { console.log(error); });
    });
};
export default AddParticipant;
