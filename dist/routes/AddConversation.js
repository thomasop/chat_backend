import AddConversationController from '../controllers/AddConversationController.js';
import auth from '../middleware/auth.js';
const AddConversation = (app) => {
    app.post('/addConversation', auth, (req, res) => {
        AddConversationController(req, res);
    });
};
export default AddConversation;
