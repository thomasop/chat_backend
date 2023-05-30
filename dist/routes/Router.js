import express from "express";
import auth from '../middleware/auth.js';
const router = express.Router();
router.use((req, res, next) => {
    auth(req, res, next);
    next();
});
export default router;
