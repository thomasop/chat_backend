import GetAllMessageController from '../controllers/GetAllMessageController.js';
import auth from '../middleware/auth.js';
const GetAllMessage = (app) => {
    app.get("/GetAllMessages/:id", auth, (req, res) => {
        GetAllMessageController(req, res);
    });
};
export default GetAllMessage;
