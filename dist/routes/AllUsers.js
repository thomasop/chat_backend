import auth from '../middleware/auth.js';
import AllUsersController from '../controllers/AllUsersController.js';
const AllUsers = (app) => {
    app.get("/allUsers", auth, (req, res) => {
        AllUsersController(req, res);
    });
};
export default AllUsers;
