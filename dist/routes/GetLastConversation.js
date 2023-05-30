import { QueryTypes } from "sequelize";
const GetLastConversation = (app, connect) => {
    app.get("/lastConversation", (req, res) => {
        connect.query('SELECT max(id) FROM conversation', {
            type: QueryTypes.SELECT
        })
            .then((results) => res.json({ result: JSON.stringify(results[0]) }))
            .then((error) => res.json(error));
    });
};
export default GetLastConversation;
