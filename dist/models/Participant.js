import { DataType } from "sequelize-typescript";
import connect from "../database/connect.js";
import User from "./User.js";
import Conversation from "./Conversation.js";
const Participant = connect.define('participant', {
    id: {
        type: DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataType.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    conversationId: {
        type: DataType.INTEGER,
        references: {
            model: Conversation,
            key: 'id'
        }
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    timestamps: false
});
export default Participant;
