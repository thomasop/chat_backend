import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import conversationRouter from "./routes/Conversation.js";
import messageRouter from "./routes/Message.js";
import userRouter from "./routes/User.js";
import compression from 'compression';
import helmet from "helmet";
import RateLimit from 'express-rate-limit';
dotenv.config();
let app = express();
export const server = createServer(app);
const io = new Server(server, {
    cors: {
        methods: ["GET", "POST"],
    },
});
let users = {};
io.on("connection", (socket) => {
    console.log("user connection");
    socket.on("send-msg", (data) => {
        io.sockets.emit("get-msg", data.result);
    });
    socket.on("send-log", function (data) {
        users[socket.id] = data.userId;
    });
    socket.on("del-log", function (data) {
        delete users[socket.id];
    });
    socket.broadcast.emit("get-log", users);
    socket.on("send-conv", (data) => {
        io.sockets.emit("get-conv", data.result);
    });
    socket.on("send-writing", (data) => {
        socket.broadcast.emit('get-writing', data);
    });
    socket.on("disconnect", () => {
        console.log("user disconnect");
    });
});
const limiter = RateLimit({
    windowMs: 1 * 60 * 1000,
    max: 20,
});
app.use(limiter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(cors({ credentials: true }));
app.use(cookieParser(process.env.SECRET_COOKIE));
app.use("/user", userRouter);
app.use("/conversation", conversationRouter);
app.use("/message", messageRouter);
export default app;
